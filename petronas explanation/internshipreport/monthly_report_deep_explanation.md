# 📊 Monthly Report Module — Complete Deep-Dive Explanation

> **File:** `pages/2_Monthly_Report.py` (1,860 lines)  
> **Template:** `template.pptx` (corporate PowerPoint deck, bundled with the app)  
> **Libraries:** PyMuPDF (`fitz`), `python-pptx`, `Pillow`  
> **Purpose:** Take a Power BI PDF export and automatically produce a finished, branded PowerPoint presentation — zero manual copy-paste.

---

## 1. What Problem This Solves

Every month, someone had to:
1. Export the HCSM dashboard from Power BI as a PDF
2. Open the corporate PowerPoint template
3. **Manually screenshot or copy each chart/table** from the PDF into the correct slide
4. Update all dates throughout the deck
5. Manually write the summary bullets based on the numbers

This module **eliminates all of that**. You upload the PDF, click one button, and download a finished `.pptx`.

---

## 2. Overall Architecture

```
┌─────────────────────────────────────────────────────────┐
│              INPUT                                       │
│  Power BI PDF Export (14 pages)                          │
│  template.pptx  (corporate deck, 10+ slides)            │
│  Report Month + Year (sidebar selectors)                │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│         process_monthly_report()  — 8 PHASES             │
│                                                          │
│  Phase 1 │ PDF → PNG images  (300 DPI via PyMuPDF)      │
│  Phase 2 │ PDF → Chart data  (spatial text extraction)   │
│  Phase 3 │ Auto-crop module list pages                   │
│  Phase 4 │ Open template.pptx                            │
│  Phase 5 │ Replace images on slides (11 swaps)           │
│  Phase 5b│ Fill Root Cause tables (2 tables)             │
│  Phase 6 │ Update dates across all slides                │
│  Phase 7 │ Generate smart summary bullets (slides 4 & 8) │
│  Phase 8 │ Save → return bytes                           │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│              OUTPUT                                      │
│  Monthly_Report_{Month}_{Year}.pptx  (download button)  │
└─────────────────────────────────────────────────────────┘
```

---

## 3. Required Libraries

| Library | Version | Purpose |
|---|---|---|
| `PyMuPDF` (`fitz`) | ≥1.23.0 | Render PDF pages to PNG; extract text with spatial coordinates |
| `python-pptx` | ≥0.6.21 | Read/write PowerPoint files; replace images; fill tables; edit text |
| `Pillow` (PIL) | ≥10.0.0 | Auto-crop blank whitespace from bottom of images |
| `streamlit` | ≥1.35.0 | UI framework |

At startup, the app tries to import `fitz` and `pptx`. If either is missing, it shows an error and calls `st.stop()` — the page becomes non-functional until `pip install -r requirements.txt` is run.

---

## 4. Sidebar Controls

### 4.1 Report Month & Year

Two dropdowns:
- **Report Month** — all 12 months; defaults to current month
- **Report Year** — range from (current year − 1) to (current year + 2); defaults to current year

These values are used in **3 places**:
1. Date replacement across all slides (`update_dates_in_pptx`)
2. Summary bullet text generation (`sel_month`, `sel_year` variables)
3. The output file name: `Monthly_Report_June_2026.pptx`

### 4.2 Power BI PDF Upload

A single file uploader accepts `.pdf`. A direct clickable link (`Power BI PDF Export ↗`) opens the exact Power BI report page in a new tab so the user can export from there without hunting for it.

### 4.3 PPTX Template

The app looks for `template.pptx` **bundled in the app directory** (`BASE_DIR`). If found → shows a green "template.pptx detected" alert and uses it automatically. If not found → shows a warning and shows a second file uploader to let the user supply it manually.

---

## 5. The PDF → PPTX Mapping Table

This is the **heart of the module**. There are 14 PDF pages and 10 PPTX slides. The mapping is hardcoded as a list of tuples called `MAP`:

| PDF Page | Content | PPTX Slide | Strategy | Notes |
|:---:|---|:---:|---|---|
| 1 | Landing / cover | *Skip* | — | Not used |
| **2** | SR SLA Performance | **3** | BBOX match | Left picture on slide |
| **3** | SR Ticket Trend chart | **3** | BBOX match | Right picture on slide |
| **4** | SR Ageing Trend chart | **4** | CHART replace | Replaces native PowerPoint chart object |
| **5** | SR Root Cause table | **5** | Native Table | Reads data from PDF, writes into PPTX table cells |
| **6** | SR Category Distribution | **6** | BBOX match | Left picture |
| **7** | SR Module Ticket List | **6** | BBOX_LIST | Right picture, **auto-cropped** |
| **8** | INC Response SLA | **7** | BBOX match | Top-left picture |
| **9** | INC Resolution SLA | **7** | BBOX match | Bottom-left picture |
| **10** | INC Ticket Trend chart | **7** | BBOX match | Right picture |
| **11** | INC Ageing Trend chart | **8** | CHART replace | Replaces native PowerPoint chart object |
| **12** | INC Root Cause table | **9** | Native Table | Reads data from PDF, writes into PPTX table cells |
| **13** | INC Category Distribution | **10** | BBOX match | Left picture |
| **14** | INC Module Ticket List | **10** | BBOX_LIST | Right picture, **auto-cropped** |

> Pages 5 and 12 are **NOT replaced as images** — they are **read as data** (text extracted, parsed into rows) and written **natively into the PowerPoint table cells**, preserving all existing table formatting/styling.

---

## 6. Phase 1: PDF → PNG Images (300 DPI)

```python
pdf = fitz.open(stream=pdf_bytes, filetype="pdf")
for pn in range(len(pdf)):
    page = pdf.load_page(pn)
    pix = page.get_pixmap(matrix=fitz.Matrix(4, 4))  # 4x = ~300 DPI
    pdf_images[pn + 1] = pix.tobytes("png")
```

`fitz.Matrix(4, 4)` means 4× scale factor. At 72 dpi native, 4× = 288 dpi ≈ 300 DPI. This produces high-resolution PNG images of each page, stored in a dictionary (`pdf_images`) keyed by 1-indexed page number. All 14 pages are rendered at once and held in memory.

---

## 7. Phase 2: Chart Data Extraction

For 4 specific pages (3, 4, 10, 11), the app **reads the actual numbers from the PDF charts** to use in:
- Smart summary bullet generation (Slides 4 & 8)
- Trend analysis (direction, percentage change, streak count)

This is non-trivial because Power BI PDFs don't expose chart data directly — the app reconstructs it from the **raw text with spatial coordinates**.

### 7.1 Two Extraction Strategies (with fallback)

**Strategy 1 — Spatial Extraction** (`_extract_month_values_spatial`):

This is the primary and most accurate method. Steps:
1. Extract all text spans from the PDF page as a dictionary with bounding boxes (`page.get_text("dict")`)
2. Find all spans that match a date pattern like `Feb 2026`, `Feb 26`, `Feb '26` using a regex: `^(Jan|Feb|Mar|...)\\s+(?:\\d{4}|\\'?\\d{2}\\'?)$`
3. Group these month labels by their Y coordinate (within a 14px tolerance) to identify the X-axis row
4. Take the row with the **most month labels** (in case there are multi-row axes or noise)
5. Sort month labels left → right by their X center (`cx`)
6. For each month label, scan all nearby numeric spans that are **above** it and within an X tolerance window
7. The X tolerance is dynamically computed from the average gap between month labels: `x_tol = max(28, min(90, avg_gap * 0.45))`
8. Pick the number closest vertically above the month label (but not more than 220px above, to avoid axis tick noise)
9. Return `[(month_label, value), ...]` in left-to-right order

**Strategy 2 — Text Fallback** (`_extract_month_values_text`):

Used only if spatial extraction returns nothing. Reads raw text line by line, finds month labels, then looks for a number in the lines immediately after (or before) the label.

### 7.2 Normalization (`_normalize_chart_order`)

After extraction, the results are **sorted chronologically** (year, then month number). This ensures:
- `values[-1]` = the **latest** (rightmost) month
- `values[-2]` = the **previous** month

This is critical because PDF text extraction doesn't guarantee left-to-right order.

Handles 2-digit years: `"26"` → `2026` via `if y < 100: y += 2000`.

### 7.3 What Data Is Extracted

| Page | Variable | Used For |
|:---:|---|---|
| 3 | `sr_trend` | SR ticket count trend (total tickets per month) |
| 4 | `sr_ageing` | SR ageing ticket count trend |
| 10 | `inc_trend` | INC ticket count trend |
| 11 | `inc_ageing` | INC ageing ticket count trend |

---

## 8. Phase 3: Auto-Crop Module List Pages

Pages 7 and 14 show "modules with tickets" — a variable-length list. Some months have 5 modules, some have 20. Power BI always exports a fixed-height page, so there's often a large blank whitespace at the bottom.

`_auto_crop_bottom()` trims this:
1. Open PNG with Pillow, convert to RGB
2. Scan rows from the **bottom upwards**, sampling every 5 pixels
3. A row is "blank" if all sampled pixels have R, G, B > 245 (near-white)
4. Stop at the last non-blank row; add a 20-pixel margin below it
5. Crop and save back as PNG

This ensures the module list image in the slide fits tightly to its content and doesn't leave awkward empty space.

---

## 9. Phase 4: Open PPTX + Logo Protection

```python
prs = Presentation(io.BytesIO(pptx_bytes))
LOGO_TOP = 0.5   # inches
LOGO_H   = 0.6   # inches
```

The PETRONAS logo appears in the top-left of each slide (within the first 0.5 inches from the top, shorter than 0.6 inches). This threshold is used throughout to **skip the logo** when looking for chart/image shapes to replace. Every shape-finding loop checks:

```python
if _emu_to_inches(sh.top) < LOGO_TOP and _emu_to_inches(sh.height) < LOGO_H:
    continue  # Don't touch the logo
```

EMU = English Metric Units. PowerPoint uses this internally. `1 inch = 914400 EMU`. `_emu_to_inches(emu)` converts for readability.

---

## 10. Phase 5: Shape Replacement — Three Strategies

For each entry in the `MAP`, the app finds the correct shape on the slide and replaces it with the PDF page image. There are three strategies:

### 10.1 BBOX Strategy (Standard Image Replacement)

Used for: SR SLA, SR Trend, SR Category, INC Response SLA, INC Resolution SLA, INC Trend, INC Category.

The `hint` is a tuple of `(left_inches, top_inches, width_inches, height_inches)` representing the **expected position** of the target image placeholder in the template.

The app finds the closest-matching PICTURE shape on the slide using Euclidean distance across all 4 dimensions:

```python
d = sqrt((left - tl)² + (top - tt)² + (width - tw)² + (height - th)²)
```

If the closest shape is within `3.0` distance units, it's selected. The old shape is deleted, and the PDF page PNG is inserted at **exactly the same position and size** (pixel-perfect replacement).

### 10.2 BBOX_LIST Strategy (Width-Constrained, Variable Height)

Used for: SR Module List (page 7), INC Module List (page 14).

Same shape-finding logic, but the image is placed using `_calc_list_rect()`:
- **Width is fixed** to the bounding box width
- **Height is computed proportionally** from the actual (already auto-cropped) image height
- This means a short list stays short; a long list grows naturally — no stretching

### 10.3 CHART Strategy (Native Chart Object Replacement)

Used for: SR Ageing (page 4 → Slide 4), INC Ageing (page 11 → Slide 8).

These slides contain **native PowerPoint chart objects** (histogram bars), not image placeholders. The app:
1. Finds the shape where `sh.shape_type == MSO_SHAPE_TYPE.CHART`
2. If not found, falls back to the **largest non-logo, non-text shape** on the slide
3. Records its position and size
4. Deletes the chart shape
5. Inserts the PDF PNG using `_calc_fit_rect()` — fits the image **inside the bounding box preserving aspect ratio, centered**

This is what makes the histogram-style ageing charts get replaced cleanly.

### 10.4 Deletion-then-Insertion Pattern

All replacements follow a strict **two-pass pattern**:
```
Pass 1: Delete ALL old shapes that need to be replaced (on a slide)
Pass 2: Insert ALL new images
```

This prevents z-order issues where a new image gets inserted underneath an existing old shape.

Deletion uses the raw XML element API:
```python
sh._element.getparent().remove(sh._element)
```

---

## 11. Phase 5b: Native Table Population

For pages 5 (SR Root Cause) and 12 (INC Root Cause), the app **reads data from the PDF table** and writes it into the **existing PowerPoint table cells**, preserving all cell formatting, borders, and colors.

### 11.1 PDF Table Extraction (`_extract_root_cause_table`)

The expected table layout in the PDF:
```
| Month | [Product Tier 3] | Root Cause | Action Plans | Total Tickets |
```

Steps:
1. Extract all text spans with bounding boxes from the page
2. Group spans into rows by Y coordinate (8px tolerance)
3. Find the **header row** by looking for a row containing "root cause", "action", and "total"
4. Map column boundaries (as fractions of page width) from the header span positions
5. Default boundaries if header columns can't be detected: month_end=0.12, root_start=0.26, action_start=0.62, total_start=0.88
6. For each row below the header: assign each span to a column based on its center X position
7. Find the **rightmost integer** in each row as the "Total Tickets" value
8. Filter rows using `_row_has_real_content()` — must have a category, root cause, OR numeric ticket count
9. Keep only the **top 3 rows** (sorted by Y position = top of table first)
10. Default action plan to `"To identify action plan to reduce tickets"` if empty

### 11.2 Writing into PPTX Table (`_fill_pptx_table`)

```
Column 0: Month label (e.g. "June 2026") — written only on the first row
Column 1: Product Categorization Tier 3 (category name)
Column 2: Root Cause (prefixed with "- " if not already)
Column 3: Action Plans
Column 4: Total Tickets
```

The function:
- Clears all body rows first (rows 1-3, leaves header row 0 untouched)
- Writes up to 3 data rows
- For each cell: empties all runs except the first, sets `runs[0].text = new_value`
- This preserves existing font, size, color, and paragraph formatting

---

## 12. Phase 6: Date Replacement Across All Slides

`update_dates_in_pptx()` scans **every text shape on every slide** and replaces month/year references.

Two regex patterns are applied:
1. `(Jan|January|Feb|February|...|Dec|December)\s+(20\d{2})` → replaced with `{new_month} {new_year}`
2. `\b(20\d{2})\b` → replaced with `{new_year}` (catches standalone year references)

**Critical safety guard:** The function detects the "Summary" textbox on each slide and **skips it entirely** during date replacement. This prevents the auto-generated summary bullets from being overwritten by the date pass.

The summary title shape is detected by `_find_summary_title_shape()`:
- Exact match: shape text == "summary"
- Fuzzy match: shape text contains "summary" and is ≤30 characters

The summary body is found by `_find_summary_body_shape()`:
- Must be **below** the Summary title shape
- Within 3 inches horizontally (roughly left-aligned)
- Within 4 inches vertically below
- Nearest candidate wins

---

## 13. Phase 7: Smart Summary Bullet Generation

This is the most sophisticated part. The app generates **two summary bullets per report section** (SR and INC), placed on slides 4 and 8.

### 13.1 Trend Analysis (`_analyze_trend`)

Takes the chronologically sorted `[(month, value), ...]` list.

**Strict Rule:** Only compares the **last two points** (`values[-2]` and `values[-1]`), and only if they are **exactly 1 month apart** (adjacent months). If there is a gap (e.g., Mar → May), it returns `None` and no bullet is generated.

```python
gap = _month_diff(prev_label, curr_label)
if gap != 1:
    return None
```

From the two adjacent data points, it computes:
- `direction`: "increased" / "decreased" / "unchanged"
- `diff`: absolute difference between current and previous
- `pct`: percentage change
- `streak`: how many consecutive months in the same direction (looks back through all values)
- `is_peak`: current value is the maximum of all observed values
- `is_trough`: current value is the minimum of all observed values

### 13.2 Ticket Volume Bullet (`_make_smart_ticket_bullet`)

Generates sentences like:

> *"Ticket logged increased by 23 (12%) in June 2026, from 187 to 210. continuing the increasing trend from last month"*

or, for a peak:

> *"Ticket logged increased by 45 (24%) in June 2026, from 187 to 232, reaching the highest level in the observed period"*

Logic:
- Core: `"Ticket logged {verb} by {diff} ({pct}%) in {Month} {Year}, from {prev} to {curr}"`
- + streak context if `streak >= 2`
- + peak/trough context if applicable

### 13.3 Ageing Bullet (`_make_smart_ageing_bullet`)

Handles special cases:
- If `curr == 0 and prev > 0`: `"All ageing tickets resolved - count dropped from {prev} to 0"`
- If unchanged and zero: `"No ageing tickets recorded, maintaining zero backlog"`
- Standard: `"Ageing ticket {verb} from {prev} to {curr} ({sign}{diff}, {pct}%)"`
- + significant change note if `pct >= 50 and diff >= 3`
- + streak note if `streak >= 3`

### 13.4 Writing Bullets into Slides

For slides 4 (SR) and 8 (INC):
1. Find the Summary title shape
2. Find the Summary body textbox below it
3. Get all non-empty, non-"Summary" paragraphs from the body (`_get_meaningful_paragraphs`)
4. If fewer than 2 paragraphs exist, add new ones
5. Replace paragraph text using `_set_paragraph_text()` — clears all runs except first, sets `runs[0].text`
6. Clear any extra old paragraphs beyond the first 2

---

## 14. Image Placement Detail (EMU Calculations)

### Standard BBOX placement
```python
ins_l, ins_t, ins_w, ins_h = left, top, width, height
```
Exactly replicates the deleted shape's position. Pixel-perfect.

### CHART placement — `_calc_fit_rect()`
```python
scale = min(box_w / img_w, box_h / img_h)  # fit inside box
new_w = int(img_w * scale)
new_h = int(img_h * scale)
offset_x = (box_w - new_w) // 2  # center horizontally
offset_y = (box_h - new_h) // 2  # center vertically
```
The image is scaled to fit inside the chart bounding box while preserving aspect ratio, then centered within it.

### BBOX_LIST placement — `_calc_list_rect()`
```python
scale = box_w / img_w        # lock to full width
new_h = int(img_h * scale)   # height follows image ratio
```
Width is fixed; height grows or shrinks with actual content.

---

## 15. The UI Flow (What the User Sees)

### Step 1 — Upload
Sidebar: select month/year, upload PDF. (PPTX template is auto-detected.)

### Step 2 — Validation
When PDF is uploaded, 3 metric cards appear:
- **PDF Pages Detected** — actual page count
- **Target Slides** — "8 (Slides 3-10)" — fixed
- **Image Swaps** — "11" — fixed

An expandable **PDF to PPT Mapping** table shows the exact mapping for the user's reference.

If the PDF has fewer than 14 pages, a warning is shown.

### Step 3 — Generate
Click **"Generate Monthly Report"** button. A spinner runs while all 8 phases execute.

**On success (11/11 images):** Green success alert.  
**On partial success:** Yellow warning, build log auto-expands.  
**On failure (0 images):** Red error alert.

### Step 4 — Preview
Expandable sections per slide group show the **actual PDF page images** that were placed, so the user can visually verify each one before downloading.

### Step 5 — Download
A **"Download Final Report (.pptx)"** button saves the processed file as:
```
Monthly_Report_June_2026.pptx
```

### Step 6 — Build Log
An expandable "Build Log" shows every action taken:
- `INFO` lines = informational (rendered as teal info alerts)
- `WARN` lines = something failed (rendered as yellow warning alerts)
- `OK` lines = successful image replacement with exact dimensions
- `DATE` lines = each date that was updated
- `SUMM` lines = each summary bullet that was written
- `TABLE` lines = each table row that was populated

---

## 16. Error Handling

| Situation | Behavior |
|---|---|
| `fitz` or `pptx` not installed | Error shown, `st.stop()` — page is blocked |
| `template.pptx` not found locally | Warning + manual upload prompt |
| PDF has < 14 pages | Warning shown before generate button |
| A PDF page is missing in the map | `WARN` in log, that slot is skipped |
| A target PPTX shape not found (BBOX) | `WARN` in log, that image is skipped |
| Chart months are not adjacent | Summary bullet is skipped (not generated) |
| Root cause table header not found | `WARN` in log, table stays as-is |
| Table row has no real content | Row is filtered out (phantom row guard) |
| Any unhandled exception | Full Python traceback shown via `st.code()` |

---

## 17. Key Design Decisions

| Decision | Why |
|---|---|
| 300 DPI rendering (4× scale) | Charts look crisp at any presentation zoom level |
| Spatial extraction primary, text fallback secondary | Spatial is more accurate for bar/line charts where label positions matter |
| `values[-1]` / `values[-2]` always = latest/previous | Ensures summary logic is consistent regardless of how many months of data exist |
| Adjacent-month-only rule for trend analysis | Prevents misleading "trend" statements when months are missing |
| Skip logo by position (top < 0.5in, height < 0.6in) | Protects PETRONAS brand asset across all slides without hardcoding shape names |
| Delete-then-insert (not in-place replace) | python-pptx has no native "replace image" API; deletion + re-insert is the only reliable method |
| Native table fill (not image replacement for root cause) | Preserves cell formatting, fonts, borders; much cleaner than an image of a table |
| Skip summary body during date pass | Prevents the auto-generated intelligent bullets from being overwritten |
| Auto-crop module list pages | Variable-length lists leave blank space; cropping prevents ugly white gaps in slides |

---

## 18. Key Files Summary

| File | Role |
|---|---|
| `pages/2_Monthly_Report.py` | Entire module — 1,860 lines |
| `template.pptx` | Corporate PowerPoint template (bundled) |
| `requirements.txt` | `pymupdf`, `python-pptx`, `Pillow` are the critical dependencies |
