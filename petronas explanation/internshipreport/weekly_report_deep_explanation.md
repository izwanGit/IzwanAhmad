# 📊 Weekly Report Module — Complete Deep-Dive Explanation

> **File:** `pages/1_Weekly_Report.py` (1,732 lines)  
> **Template:** `template.html` (189 lines)  
> **Purpose:** Turns raw MyGenie/HCSM Excel exports into a production-ready HTML email report, processed Excel attachments, and Outlook draft — in one click.

---

## 1. Where It Fits in the Application

The **PETRONAS HCSM Operations Hub** (`Report_Hub.py`) is the main landing page. It shows three clickable cards:

| Card | Route | What It Does |
|---|---|---|
| **Weekly Report** | `/Weekly_Report` | This module — HTML email + Excel automation |
| **Monthly Report** | `/Monthly_Report` | PowerPoint automation from Power BI |
| **Pre-Deployment Manager** | `/Pre_Deployment` | RFC/RDM browser pre-fill automation |

When you click the **Weekly Report** card, Streamlit routes you to `1_Weekly_Report.py`.

---

## 2. Overall Architecture & Data Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                        DATA SOURCES                                  │
│  OneDrive (auto-sync)  ──OR──  Manual File Upload (sidebar)          │
│                                                                       │
│  SR Ageing Excel   + Incident Ageing Excel                           │
│  SR Daily Excel    + Incident Daily Excel                            │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    PYTHON / PANDAS PROCESSING                         │
│  1. Sheet Detection  → find correct sheet in each workbook           │
│  2. Group Filter     → keep only "MYCAREERX SUPPORT" rows            │
│  3. Active Filter    → drop Closed / Resolved / Cancelled tickets    │
│  4. Metric Counts    → SR buckets (>30d, 15-30d, 1-14d)             │
│                      → INC buckets (>90d, 61-90d, 31-60d, 15-30d…)  │
│  5. Ticket Detail    → extract per-ticket rows for email tables      │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
                     ┌──────────┴──────────┐
                     ▼                     ▼
         ┌─────────────────┐   ┌────────────────────────┐
         │  Jinja2 Template │   │  openpyxl Excel Engine  │
         │  template.html   │   │  (SR/WO + INC workbooks)│
         │  → HTML Email    │   │  → Filtered, cover-      │
         │    body          │   │    updated .xlsx files   │
         └────────┬────────┘   └───────────┬────────────┘
                  │                         │
                  ▼                         ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         EXPORT OPTIONS (4 tabs)                       │
│  Tab 1: Email Preview   — live iframe of rendered HTML               │
│  Tab 2: HTML Source     — raw copyable HTML                          │
│  Tab 3: Export Options  — Copy Formatted / Push to Outlook / Teams   │
│  Tab 4: Manage History  — view/delete saved weekly snapshots          │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. Configuration & File Paths

### 3.1 OneDrive Folder Structure

The app is designed to run on a PETRONAS corporate laptop where OneDrive is syncing. All file paths are constructed dynamically using `%USERPROFILE%`:

```
%USERPROFILE%\OneDrive - PETRONAS\
    SAP HR - HCSM Ticket Monitoring Dashboard\
        Ticketing Data\
            Service Request\
                Service Request (Daily) [MYCAREERX SUPPORT & SAP HR].xlsx  ← Open WO count
            Incident\
                Incident Raw Data (Daily) [MYCAREERX SUPPORT & SAP HR].xlsx ← Open INC count
            Ageing Service Request\
                Service Request Ageing Raw Data [Daily].xlsx                ← Email tables
            Ageing Incident\
                Incident Ageing Raw Data (Daily).xlsx                       ← Email tables

    Weekly Report\
        {DD Month}\                         ← auto-created per report date
            Service Request & Work Order Ageing Raw Data Preview_{DDMon}.xlsx
            Incident Ageing Raw Data Preview_{DDMon}.xlsx

Report Hub Config\
    MYCAREERX SUPPORT\
        history.json      ← weekly snapshot history (up to 4 weeks)
        contacts.json     ← name → email mapping for Outlook TO field
```

### 3.2 Department Filter

The app is hard-coded for **`MYCAREERX SUPPORT`** as the department filter. (The group selection dropdown exists in commented-out code, indicating it was previously multi-group but simplified.) Every filtering step compares Excel data against this value using case-insensitive `.upper()` matching.

---

## 4. Data Sources: Priority Chain

The app uses a **3-tier priority chain** for each Excel file:

```
Priority 1 (Highest): Manual upload via Streamlit file uploader
       ↓ (if nothing uploaded)
Priority 2: Bytes already in st.session_state (from "Sync Live Data" button)
       ↓ (if not clicked yet)
Priority 3: Direct file path from local OneDrive sync (auto-detected)
       ↓ (if none found)
Blocked: Shows "Data Feed Required" placeholder screen
```

This means the tool works offline (from an upload) or online (from OneDrive sync) without any code change.

---

## 5. The Sidebar — Controls & Sync Panel

### 5.1 "Sync Live Data" Button

When clicked, the button:
1. Checks all 4 OneDrive paths exist
2. Reads all 4 Excel files into **bytes in memory** (not parsed yet)
3. Calls `_count_open_wo()` on SR Daily bytes → stores count in `st.session_state.auto_wo`
4. Calls `_count_open_inc()` on INC Daily bytes → stores count in `st.session_state.auto_inc`
5. Also stores SR Ageing bytes and INC Ageing bytes in session state
6. Triggers `st.rerun()` to refresh UI with the new data

**Auto-Sync on Page Load:** The same sync logic runs automatically on first load or group change (`last_synced_group` tracker). This means if OneDrive is synced, the ticket counts are already pre-filled when you open the page.

### 5.2 Open Ticket Count Fields

Two number inputs in the sidebar display the auto-synced counts:
- **Open WO** (`sr_open_wo`) → used as the denominator for `SR >1 day %` percentage
- **Open INC** (`inc_open_input`) → used as the denominator for `INC >1 day %` percentage

Both are editable — you can override the auto-detected value manually. Direct links to the MyGenie+ dashboards are shown as clickable `↗` links next to each label.

### 5.3 Report Date

A date picker defaults to today (`datetime.date.today()`). This is used:
- In the email subject line
- In the email body (`as of DD Month YYYY`)
- As the folder name for saved Excel files
- As the snapshot date key in `history.json`

### 5.4 Data Upload

Two file uploaders accept `.xlsx` / `.xls`:
- **SR & WO Excel** — the Service Request Ageing workbook from MyGenie+
- **Incident Excel** — the Incident Ageing workbook from MyGenie+

Direct links to the MyGenie+ export pages are provided as `↗` clickable labels next to each uploader.

---

## 6. Sheet Detection Logic

Because MyGenie+ Excel exports don't always have consistent sheet names, the app uses **content-based sheet detection** rather than assuming a fixed sheet name:

```python
def detect_valid_sheet(xl, required_columns, ageing_col_name):
    for sheet_name in xl.sheet_names:
        df = pd.read_excel(xl, sheet_name=sheet_name)
        if df.empty: continue
        if not _has_required_columns(df, required_columns): continue
        if _count_numeric_rows(df, ageing_col_name) < 1: continue
        return sheet_name, df
    return None, None
```

**For SR/WO workbook**, it looks for sheets containing all of:
- `Service Request Ageing Days`
- `Service Request ID`
- `Service Request Status`
- `Work Order Assignee Group`

**For INC workbook**, it looks for:
- `Incident Ageing Days`
- `Incident ID`
- `Status`
- `Assignee Group`

**WO Detail Detection:** After finding the SR sheet, the app checks if it also contains Work Order columns (`Work Order ID`, `Work Order Status`). If not, it scans the other sheets for a separate WO sheet. This handles both single-sheet and multi-sheet export formats.

---

## 7. Metric Calculation Logic

### 7.1 Service Request (SR) Metrics

After filtering to `MYCAREERX SUPPORT` and removing inactive statuses (Closed/Resolved/Cancelled/Canceled):

| Variable | Formula | Purpose |
|---|---|---|
| `sr_total` | `len(df_sr)` | Total active SR tickets |
| `sr_gt_30_count` | `(ageing > 30).sum()` | Tickets ageing more than 30 days |
| `sr_15_30_count` | `(ageing >= 15 & <= 30).sum()` | Tickets at warning zone |
| `sr_1_14_count` | `(ageing >= 1 & <= 14).sum()` | Tickets at normal zone |
| `sr_gt_1_count` | `(ageing >= 1).sum()` | All tickets with at least 1 day age |
| `sr_gt_1_pct` | `sr_gt_1_count / sr_open_wo * 100` | % of open WO that have aged |
| `sr_gt_30_pct` | `sr_gt_30_count / sr_gt_1_count * 100` | % of aged that are >30d |

> **Important design decision:** `sr_gt_1_count` uses `>= 1` (not `> 1`) to match the count shown in the summary table — a deliberate choice to ensure the percentages are consistent.

### 7.2 Incident (INC) Metrics

After filtering to `MYCAREERX SUPPORT`, removing inactive statuses, and also filtering where `Active Incident == "yes"` (if that column exists):

| Variable | Formula | Purpose |
|---|---|---|
| `inc_total` | `len(df_inc)` | Total active INC tickets |
| `inc_gt_90_count` | `(ageing > 90).sum()` | Critical ageing |
| `inc_61_90_count` | `(ageing 61-90).sum()` | Severe ageing |
| `inc_31_60_count` | `(ageing 31-60).sum()` | High ageing |
| `inc_15_30_count` | `(ageing 15-30).sum()` | Warning zone |
| `inc_8_14_count` | `(ageing 8-14).sum()` | Caution zone |
| `inc_3_7_count` | `(ageing 3-7).sum()` | Early zone |
| `inc_gt_1_count` | `(ageing >= 1).sum()` | All aged tickets |
| `inc_gt_1_pct` | `inc_gt_1_count / inc_open_input * 100` | % of open INC that have aged |

> **Note on INC column encoding:** The app has a special guard (`_inc_rename`) that renames the actual Excel column names to clean ASCII aliases (`__inc_age__`, `__inc_st__`, `__inc_ac__`). This prevents crashes caused by invisible Unicode characters that sometimes appear in Excel column headers exported from MyGenie+.

---

## 8. Ticket Detail Extraction (for Email Tables)

For the SR tables in the email, the app extracts individual ticket records from the WO sheet:

```python
def extract_wo_records(subset):
    records = []
    for _, row in subset.iterrows():
        records.append({
            'SR Ageing':        int(row[wo_ageing_col]),
            'Work Order No.':   _safe(row, wo_id_col),
            'Summary':          _safe(row, wo_summary_col),
            'User/TSG':         _safe(row, wo_customer_col),
            'WO Status':        _safe(row, wo_status_col),
            'WO Status Reason': _safe(row, wo_reason_col),
            'Assignee':         _safe(row, wo_assignee_col),
        })
    return records
```

Two lists are produced:
- **`sr_ageing_gt_30_tickets`** — tickets > 30 days (shown in the "critical" table in the email)
- **`sr_ageing_15_30_tickets`** — tickets 15–30 days (shown in the "warning" table)

Both lists are **sorted descending by ageing days** so the most critical tickets appear first.

The `_safe()` helper returns an empty string for `None`/`NaN` values, preventing `"nan"` text in the email.

---

## 9. History & Snapshot System

### 9.1 What Gets Saved

Each weekly snapshot saves **10 metric values** keyed by date:

```json
{
  "date": "23-Jun-2026",
  "sr_count_gt_30": 12,
  "sr_count_15_30": 8,
  "sr_count_1_14": 35,
  "inc_count_gt_90": 2,
  "inc_count_61_90": 1,
  "inc_count_31_60": 3,
  "inc_count_15_30": 5,
  "inc_count_8_14": 4,
  "inc_count_3_7": 7
}
```

Saved to: `%USERPROFILE%\OneDrive - PETRONAS\...\Report Hub Config\MYCAREERX SUPPORT\history.json`

### 9.2 Trend Table Logic

The history is used to build the **weekly trend tables** in the email:

1. Load `history.json` (persisted snapshots)
2. Insert the **current session's data** as a temporary entry (not yet saved)
3. Sort all entries by date (oldest → newest)
4. Keep only the **most recent 4 entries** — creates a 4-column trend table
5. Feed the 4 dates + 4 sets of counts into the Jinja2 template

This means even before you click "Save Snapshot", the current week is shown in the email trend table, allowing you to preview how it looks.

### 9.3 Save / Update Logic

- If the current report date **already exists** in history → shows an **"Update Saved Snapshot"** button
- If it **doesn't exist** → shows a **"Save Snapshot to History"** button
- Clicking **"Push to Outlook Draft"** automatically saves/updates the snapshot — you don't need to do it separately
- In the **Manage History** tab, you can view all saved entries and delete individual ones or clear all

---

## 10. The HTML Email Template (`template.html`)

The template uses **Jinja2** templating syntax. Variables injected by Python are wrapped in `{{ }}`.

### 10.1 Email Structure

```
Dear team,

[Introductory paragraph — fixed text about SR/INC ageing policy]

Service Request:
  SR Ageing Percentage
  [KPI line: Open tickets = {sr_open_wo} WO tickets]
  [KPI line: Ageing >1 day = {sr_gt_1_pct}%]
  [KPI line: Ageing >30 days = {sr_gt_30_pct}%]

  [SR SUMMARY TABLE: 3 rows × N date columns]
    Row 1: Ageing > 30 days   → sr_trend_gt_30
    Row 2: Ageing 15-30 days  → sr_trend_15_30
    Row 3: Ageing 1-14 days   → sr_trend_1_14

  [SR > 30 DAYS DETAIL TABLE — only shown if tickets exist]
    Columns: SR Ageing | Work Order No. | Summary | User/TSG | WO Status | WO Status Reason | Assignee

  [SR 15-30 DAYS DETAIL TABLE — only shown if tickets exist]
    Same 7 columns

Incident:
  Incident Ageing Percentage
  [KPI line: Open INC = {inc_open_input} INC tickets]
  [KPI line: Ageing >1 day = {inc_gt_1_pct}%]

  [INC SUMMARY TABLE: 6 rows × N date columns]
    Row 1: Ageing > 90 days   → inc_trend_gt_90
    Row 2: Ageing 61-90 days  → inc_trend_61_90
    Row 3: Ageing 31-60 days  → inc_trend_31_60
    Row 4: Ageing 15-30 days  → inc_trend_15_30
    Row 5: Ageing 8-14 days   → inc_trend_8_14
    Row 6: Ageing 3-7 days    → inc_trend_3_7

[Closing paragraph — fixed text]
```

### 10.2 Outlook Compatibility

The template uses **inline CSS with `bgcolor` attributes** (not just `style=`) because Outlook strips many CSS properties. Key choices:
- Tables use `border-collapse: collapse` with explicit `border="1"`
- All header cells use both `bgcolor="#00B1A9"` and `style="background-color:#00B1A9"` for redundancy
- Spacers between sections use `<table>` with `height` attribute (not CSS margin)
- Font is `Calibri, Arial, sans-serif` — safe Outlook fonts

### 10.3 Email Subject Line (auto-generated)

```
MyCareerX BAU Support Ticket - Ageing Service Request and Incident as {day} {Month}
```
Example: `MyCareerX BAU Support Ticket - Ageing Service Request and Incident as 23 June`

---

## 11. The Excel Processor (openpyxl Engine)

When "Push to Outlook Draft" is clicked, the raw Excel files are also processed and saved to OneDrive with filtered, formatted data. This is handled by two functions:

### 11.1 `process_sr_wo_workbook()`

Works on the SR & WO ageing workbook:

1. **Auto-detect the WO data sheet** (looks for "work order" + "ageing" in name, or uses last sheet)
2. **Fast-filter the WO data sheet** → keeps only `MYCAREERX SUPPORT` rows, sorted by ageing days descending
3. **Collect surviving SR IDs** → builds a set of all SR IDs in the filtered rows
4. **Filter all other data sheets** → removes rows whose SR ID is not in the surviving set (cascading filter)
5. **Count metrics** from the already-filtered in-memory rows (reuses the same data, no second pass)
6. **Update cover sheets** → Sheet 1 gets "Total Service Request" + count number, Sheet 2 gets "Service Request Ageing > 30 Days" + count
7. **Build "Update Details" sheet** → fresh sheet with a curated column subset, Calibri/teal header styling, dated as `"Update as of {DD Mon}"`

### 11.2 `process_inc_workbook()`

Works on the Incident ageing workbook:

1. **Fast-filter the INC data sheet** by `Assignee Group == MYCAREERX SUPPORT`
2. **Filter other data sheets** the same way
3. **Count total INC and INC >30 days**
4. **Update cover sheets** → Sheet 1 "Total Ageing Incident", Sheet 2 "Total Ageing Incident > 30 Days"

### 11.3 The "Fast Filter" Pattern (`_fast_filter_by_col`)

This is a key performance optimization. Instead of deleting Excel rows one by one (which is O(n²) due to row-shifting):

```
1. Read ALL rows into a Python list (one pass, RAM-only)
2. Filter the list in Python (very fast)
3. Sort by ageing days descending (while still in RAM)
4. Delete ALL data rows at once → ONE ws.delete_rows() call
5. Write survivors back with ws.append() (sequential, fast)
```

This is described as "10-50x faster" in the code comments for large files.

### 11.4 `_update_cover_number()`

Transforms Excel cover sheets:
- Removes all images/drawings (clears `ws._images` and `ws._drawing`)
- Unmerges all existing merged cells
- Writes title text in A2:J4 — Calibri Bold 28pt, white on teal (`#00B1A9`)
- Writes the count number in A5:J5 — Calibri Bold 96pt, teal color — visually large and prominent
- Row heights adjusted for readability (30pt for title, 100pt for number)

### 11.5 Output File Naming

Files are saved to:
```
%USERPROFILE%\OneDrive - PETRONAS\Weekly Report\{DD Month}\
    Service Request & Work Order Ageing Raw Data Preview_{DDMon}.xlsx
    Incident Ageing Raw Data Preview_{DDMon}.xlsx
```

Example for June 23: `Weekly Report\23 June\..._23Jun.xlsx`

---

## 12. Export Options — The 4-Tab Interface

### Tab 1: Email Preview

- Shows a styled header with the email subject line
- Renders the full HTML email in a **scrollable iframe** (`st.components.v1.html`, height 900px)
- Surrounded by a white card with subtle shadow

### Tab 2: HTML Source

- Raw HTML shown in a `st.code()` block with HTML syntax highlighting
- User can copy the entire HTML manually from here if needed

### Tab 3: Export Options

Three action buttons in a 3-column layout:

#### Button 1: "Copy Formatted"
- Uses the **Clipboard API** (`navigator.clipboard.write`) with `ClipboardItem` using `text/html` MIME type
- The HTML is Base64-encoded in a hidden `<div>` and decoded at click time
- This copies the **rich-text formatted email** (with colors and tables) ready to paste directly into Outlook New Email body
- Works entirely in the browser — no server round-trip

#### Button 2: "Push to Outlook Draft"
- **Windows only** — disabled/hidden on non-Windows
- Checks if the target weekly folder already exists → shows a **confirmation dialog** if overwriting
- On confirm, runs these steps sequentially:
  1. Saves and processes both Excel files to OneDrive (`save_excels_to_onedrive()`)
  2. Resolves **TO: recipients** from contacts — extracts unique assignee names from the `>30d` and `15-30d` ticket lists, looks them up in `contacts.json`
  3. **Blocks if any assignee is missing an email** — shows which names are missing, prompts to add them in Manage Contacts
  4. Calls `push_to_outlook()` using `win32com.client` (pywin32) to open an Outlook draft
  5. **Auto-saves the history snapshot** on success
- The Outlook draft is opened with:
  - `mail.Subject` = generated subject
  - `mail.HTMLBody` = rendered HTML
  - `mail.To` = semicolon-joined assignee emails
  - `mail.CC` = fixed CC list (or overridden from `contacts.json` `_CC` key)
  - `mail.Attachments` = the two saved `.xlsx` files

> **Important:** `mail.Display(True)` is called — this opens the draft for **review**, not direct send. The user still sees the email before sending.

#### Button 3: "Copy for Teams"
- Generates a Teams @mention message: `"Hi team, good morning. please kindly update..."`
- Appends the **unique assignee names** from the `>30 days` tickets (space-separated, ready for @mention)
- Base64-encodes the message, decodes at click time, copies as plain text
- User pastes this into the Teams channel chat

### Tab 4: Manage History

- Lists all saved historical snapshots from `history.json`
- Each entry shows: date | SR >30d count | INC >90d count
- Individual **Delete** button per entry
- **Clear All History** button at the bottom

---

## 13. Contacts Manager

Located inside an **expandable panel** in the Export Options tab.

### How It Works

`contacts.json` is a simple name → email dictionary:
```json
{
  "Ahmad Faris": "ahmad.faris@petronas.com.my",
  "Nurul Ain": "nurul.ain@petronas.com.my",
  "_CC": "manager1@petronas.com.my; manager2@petronas.com.my"
}
```

- Keys starting with `_` are special (e.g., `_CC` overrides the CC list)
- All other keys are assignee names matched against the `Assignee` column from the WO data

### Missing Contact Workflow

When "Push to Outlook Draft" is clicked and an assignee isn't in contacts.json:
1. The push is **blocked** — not attempted
2. The **Contacts expander auto-opens**
3. Each missing name is shown with a text input to paste their email
4. After filling, click **Save to Contacts** → updates `contacts.json`
5. Try Push to Outlook Draft again — now it will succeed

### Fixed CC List

Hardcoded in the file as a fallback:
```
yusrinah.mohamed@petronas.com.my
norhaiza.awang@petronas.com.my
aisyoul.zainon@petronas.com.my
prashant.k.singh@oracle.com
manesh.kallil@oracle.com
rozaire@petronas.com.my
jayanthan.sankar@petronas.com.my
```

Can be overridden per-group by setting `"_CC"` in `contacts.json`.

---

## 14. KPI Metric Cards

Five metric cards are displayed across the top of the main area (before the tabs):

| Card | Value |
|---|---|
| Total SR Tickets (Active) | `sr_total` |
| SR Ageing >30d | `sr_gt_30_count` |
| SR >1 day % | `sr_gt_1_pct%` |
| Total INC Tickets (Active) | `inc_total` |
| INC >1 day % | `inc_gt_1_pct%` |

These use Streamlit's `st.metric()` styled with PETRONAS teal borders and left accent bars.

---

## 15. UI & Branding

### PETRONAS Color Palette (defined as constants)
| Name | Hex | Usage |
|---|---|---|
| `PETRONAS_TEAL` | `#00B1A9` | Primary — buttons, borders, headers |
| `PETRONAS_PURPLE` | `#763F98` | Error alerts |
| `PETRONAS_BLUE` | `#20419A` | Blue info alerts |
| `PETRONAS_YELLOW` | `#FDB924` | Warning alerts |
| `PETRONAS_LIME_GREEN` | `#BFD730` | Success alerts |

### Alert System (`petronas_alert()`)
Custom HTML alert boxes replace Streamlit's default `st.warning()` etc. They render as:
- A left-colored border bar
- An inline SVG icon (check, alert, info, x-circle, folder, mail, shield)
- A semi-transparent background matching the color type
- 0.82rem font, light and compact

### Logo Handling
Both logos are read from disk and converted to Base64 `data:` URIs. This ensures they render in iframes, in email previews, and in packaged `.exe` builds without needing external file access.

### Font
`Inter` from Google Fonts — loaded via `@import url(...)` in the CSS block at the top of the page.

---

## 16. End-to-End Workflow (What a User Actually Does)

```
1. Open app → auto-syncs OneDrive files, pre-fills Open WO and Open INC counts
2. Verify/adjust the Open WO and Open INC numbers in the sidebar
3. Confirm the Report Date (defaults to today)
4. Check if Excel files were auto-loaded (green success alert) or upload manually
5. The app immediately processes the data and shows:
   → KPI metric cards
   → Snapshot management buttons
6. Click "Email Preview" tab → review the formatted HTML email
7. Click "Export Options" tab → choose action:
   a) "Copy Formatted" → paste directly into Outlook compose body
   b) "Push to Outlook Draft" → one-click: saves Excel files to OneDrive,
      opens a pre-filled Outlook draft with attachments and TO/CC filled
   c) "Copy for Teams" → paste Teams @mention message
8. The history snapshot is auto-saved when you push to Outlook
```

---

## 17. Error Handling & Edge Cases

| Situation | Behavior |
|---|---|
| OneDrive files not found | Shows "Sync Failed" alert with missing file names |
| Excel file locked by another app | `PermissionError` caught, shows specific "close Excel" instructions |
| Sheet not found with required columns | `st.stop()` with descriptive error |
| WO sheet missing (but SR found) | Warning shown, detail tables will be empty — report still generates |
| Assignee name has no email mapped | Outlook push blocked, contacts panel auto-opens |
| Non-Windows platform | Outlook button disabled, Teams/Copy buttons still work |
| Column with invisible Unicode chars | Renamed to clean aliases via `_inc_rename` dict before processing |
| History date already exists | Update button instead of Save button |

---

## 18. Key Files Summary

| File | Role |
|---|---|
| `pages/1_Weekly_Report.py` | Main module — all UI, data processing, export logic |
| `template.html` | Jinja2 HTML email template |
| `contacts.json` | OneDrive-synced name→email mapping (per group) |
| `history.json` | OneDrive-synced weekly snapshots (up to 4) |
| `Report_Hub.py` | Landing page — links to this and other modules |
| `requirements.txt` | Dependencies: streamlit, pandas, openpyxl, jinja2, pywin32 |
