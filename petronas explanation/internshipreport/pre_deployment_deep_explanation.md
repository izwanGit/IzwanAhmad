# 🚀 Pre-Deployment Manager — Complete Deep-Dive Explanation

> **Main File:** `pages/3_Pre_Deployment.py` (830 lines)  
> **Browser Engine:** `utils/mygenie_browser.py` (1,342 lines)  
> **Launcher:** `utils/browser_launcher.py` (125 lines)  
> **Config:** `utils/config.py` (130 lines)  
> **UI Library:** `utils/ui_components.py` (372 lines)  
> **API Server:** `utils/api_server.py` (77 lines)  
> **Protocol:** `utils/protocol_handler.py` (63 lines)

---

## 1. What Problem This Solves

Before every production deployment on myCareerX/HCSM, an analyst had to:
1. Manually open myGenie+ (BMC SmartIT ITSM portal)
2. Create a **Change Request (RFC)** — fill ~15 fields
3. Submit RFC, note the RFC number (e.g. `ICT_RFC00001805`)
4. Create a **Release (RDM)** — fill ~12 fields, link to RFC
5. Submit RDM, note the RDM number
6. Manually write a Teams channel summary

This module **automates steps 1–5** (except final submission, which is intentionally manual for compliance) and **generates the Teams summary** automatically.

---

## 2. Architecture Overview

```
┌──────────────────────────────────────────────────────────────┐
│                   DATA ENTRY POINT                           │
│  hcsm://deploy?ticket=...  (protocol URL from Power Automate)│
│    OR  ?ticket=...  (Streamlit URL query params)             │
│    OR  Manual paste in Step 1 UI                             │
└─────────────────────┬────────────────────────────────────────┘
                      │
                      ▼
┌──────────────────────────────────────────────────────────────┐
│           SESSION STATE MACHINE (6 steps)                    │
│  Step 1: Overview & ticket verification                      │
│  Step 2: Configure RFC → write rfc_fields.json               │
│  Step 3: Confirm RFC   → analyst enters RFC number           │
│  Step 4: Configure RDM → write rdm_fields.json               │
│  Step 5: Confirm RDM   → analyst enters RDM number           │
│  Step 6: Summary       → Teams copy-paste block              │
└──────────┬───────────────────┬───────────────────────────────┘
           │ "Open & Autofill" │ button click
           ▼                   ▼
┌─────────────────┐   ┌────────────────────────────────────────┐
│  rfc_fields.json│   │  subprocess.Popen(browser_launcher.py) │
│  rdm_fields.json│   │  → MyGenieBrowser (Playwright)         │
│  (local disk)   │   │  → Opens Chrome/Edge (visible)         │
│                 │   │  → Navigates to myGenie+ SmartIT        │
│  API Server     │◄──│  → Auto-fills all fields               │
│  port 18501     │   │  → Opens attachment modal              │
│  /rfc  /rdm     │   │  → STOPS. Never submits.               │
└─────────────────┘   └────────────────────────────────────────┘
```

---

## 3. Ticket Parameter Injection — 3 Sources

When the page loads, it tries to find ticket context from 3 sources in priority order:

### Source 1: URL Query Params (Primary — Power Automate)
```python
_url_params = _read_query_params()
if _url_params:
    st.session_state.ticket_params = _url_params
```
Power Automate or another system navigates to:
```
http://localhost:8501/3_Pre_Deployment?ticket=EPIC0010160&description=STA+Stories&system=MyCareerX&analyst=Ahmad+Izwan&...
```
All parameters are read directly from `st.query_params`.

### Source 2: hcsm:// Protocol URL (sys.argv fallback)
```python
# In utils/protocol_handler.py
hcsm://deploy?ticket=EPIC0010160&description=STA+Stories...
```
If the app was launched as a registered protocol handler (e.g. from a Teams link click), the URL is passed as `sys.argv[1]`. The `parse_protocol_url()` function parses it.

### Source 3: Manual Paste (Step 1 UI)
If no parameters are detected, Step 1 shows a text input where the user can paste the full URL and click "Parse URL". Uses `urllib.parse.parse_qs` to extract the query string.

### Parameters Carried Through the Entire Session

| Parameter | Used For |
|---|---|
| `ticket` | RFC summary, RDM summary, Teams message, banner subtitle |
| `description` | RFC/RDM detailed description, Teams message |
| `system` | Looks up `SYSTEM_MAPPINGS` → auto-sets CI, Coordinator Group, Risk Level |
| `analyst` | RFC Change Coordinator, RDM Release Coordinator |
| `analyst_login` | Internal login reference |
| `tester` | Shown in ticket table |
| `approver` | Shown in ticket table |
| `approver_designation` | Shown in ticket table |
| `functional_area` | Shown in ticket table |
| `division` / `department` | Shown in ticket table |

---

## 4. System Mappings — Auto-Populating Fields

`utils/config.py` defines `SYSTEM_MAPPINGS`:

```python
SYSTEM_MAPPINGS = {
    "MyCareerX": {
        "ci":          "myCareerX",
        "coord_group": "MYCAREERX SUPPORT",
        "risk":        "Risk Level 1",
    },
    "SAP HR": {
        "ci":          "SAP HR",
        "coord_group": "SAP HR",
        "risk":        "Risk Level 1",
    },
    "ServiceNow": {
        "ci":          "HRSM",
        "coord_group": "MYCAREERX SUPPORT",
        "risk":        "Risk Level 1",
    },
    "Other": { "ci": "", "coord_group": "", "risk": "Risk Level 1" },
}
```

When the page loads, it looks up the `system` parameter:
```python
sys_map = SYSTEM_MAPPINGS.get(params.get("system",""), SYSTEM_MAPPINGS.get("Other",{}))
```

This auto-populates **CI/Configuration Item**, **Coordinator Group**, and **Risk Level** in both the RFC and RDM forms — the analyst never has to look these up.

---

## 5. Step Navigation System

### URL-Based State Machine
The current step is stored in **both** `st.session_state` AND the URL `?step=` query param. This means:
- The user can bookmark a step
- The browser back button works
- Refreshing the page restores the correct step

```python
st.query_params["step"] = str(st.session_state.current_step)
st.query_params["furthest"] = str(st.session_state.furthest_step)
```

### Furthest-Step Guard
`furthest_step` tracks the highest step the user has ever reached. Steps beyond `furthest_step` are **rendered as disabled** (greyed out, `cursor: not-allowed`) in the progress indicator. A user cannot jump to Step 4 without having gone through Steps 1–3.

```python
if 1 <= req_step <= 6 and req_step <= st.session_state.furthest_step:
    st.session_state.current_step = req_step
```

### Step Progress Indicator (`render_steps`)
Rendered by `utils/ui_components.py`. A horizontal row of 6 circles connected by lines:
- **Completed** steps (< current): Green circle with ✓ checkmark
- **Active** step (== current): Teal circle with pulsing animation (`@keyframes step-pulse`)
- **Pending** steps (> current): Grey circle

Each visited step circle is a clickable `<a href="?step=N&furthest=M">` link — no Streamlit button needed. This enables **free navigation** between previously visited steps.

---

## 6. Step-by-Step Walkthrough

### Step 1 — Overview & Login
- If no ticket params found: shows warning + manual URL paste input
- If params found: shows "SSO Authenticated" info box — confirms the PETRONAS SSO session stored in `browser_profile/` will be used automatically when Chrome opens
- Shows a "Workflow Overview" panel with numbered steps
- "Begin Workflow" button advances to Step 2

### Step 2 — Configure RFC
**Left column (9 fields):**
- Summary (pre-filled with ticket ID)
- Change Type, Change Timing, Impact, Urgency, Risk Level (from `sys_map`), Reason For Change, Priority, Downtime

**Right column (9 fields):**
- Detailed Description (`"To deploy changes on {description}"`)
- Company (`"PETRONAS ICT"`), Site, Coordinator Group (from `sys_map`), Change Manager Group (`"CAC SECRETARIAT"`), Support Organization, CI (from `sys_map`), Start Date (+7 days), End Date (+35 days)

**Expandable "Categories & Risk Questions":**
- 6 category tier fields
- Checkbox: "Auto-answer Risk Questions with 'No'" (checked by default)

**On every render**, all field values are immediately saved:
1. To `st.session_state.rfc_fields` (for use in Step 3/4)
2. To `rfc_fields.json` on local disk (for the API server and browser launcher)

**"Open and Auto-Fill RFC" button:**
1. Writes `rfc_fields` to a temp JSON file
2. Spawns `browser_launcher.py rfc <json_path>` as a detached subprocess
3. Advances to Step 3

### Step 3 — Confirm RFC
- Shows info card: "myGenie+ should now be open with all fields pre-filled"
- Analyst reviews the browser, makes corrections, and submits in myGenie+
- Text input for the RFC number (e.g. `ICT_RFC00001805`)
- "Confirm RFC Created" button (disabled until RFC number entered) → saves to `st.session_state.rfc_id` and advances to Step 4

### Step 4 — Configure RDM
Same layout as Step 2. Notable differences:
- RDM Summary: `"Release for {ticket} — {description}"` (truncated to 100 chars)
- Detailed Description: `"Release of changes from RFC {rfc_id} for {description}."`
- Fields that cascade from RFC fields: Company, Coordinator Group, Coordinator, Service
- Priority mapping: If RFC was S1 → Critical, S2 → High, else → Medium

Saved to `st.session_state.rdm_fields` and `rdm_fields.json`.

**"Open and Auto-Fill RDM" button:**
Same subprocess pattern → `browser_launcher.py rdm <json_path>` → advances to Step 5

### Step 5 — Confirm RDM
- Text input for the RDM number (e.g. `ICT_RDM00001234`)
- "Confirm RDM Created" → saves `rdm_id`, advances to Step 6

### Step 6 — Deployment Summary
- Displays a styled summary card with all deployment info: Ticket, Description, System, RFC Number (in teal), RDM Number (in purple), with "RFC Created" and "RDM Created" green badges
- Generates and shows the **Teams Summary** (copyable text area)
- "Start New Deployment" → clears all session state (`del st.session_state[k]` for all keys)
- "Back to Hub" → `st.switch_page("Report_Hub.py")`

---

## 7. The Teams Summary (`teams_summary_block`)

Generated by `utils/ui_components.py`:
```
Pre-Deployment Completed — EPIC0010160

Change Details:
  Ticket      : EPIC0010160
  Description : STA Stories in ServiceNow
  System      : MyCareerX
  Analyst     : Ahmad Izwan

RFC Created : ICT_RFC00001805
RDM Created : ICT_RDM00001234

[Done] OAT document attached manually to RFC & RDM
[Done] UAT test scripts attached manually to RFC
[Done] Ready for CAB review

Please proceed with CAB scheduling. Thank you.
```
This is placed in a plain `st.text_area` so the analyst can select all and copy with Ctrl+A, Ctrl+C.

---

## 8. The Background API Server (`utils/api_server.py`)

**Why it exists:** The browser automation subprocess (`browser_launcher.py`) runs separately from Streamlit. It needs access to the latest field data. The API server provides this.

**How it works:**
- A `HTTPServer` is started on `127.0.0.1:18501` in a **daemon thread** when the page first loads:
  ```python
  utils.api_server.ensure_started()
  ```
- `ensure_started()` attempts to bind to port 18501 first. If the bind fails (port already in use), it means the server is already running — it does nothing. This is idempotent and safe across Streamlit reruns.
- The server exposes two endpoints:
  - `GET /rfc` → reads and returns `rfc_fields.json` as JSON
  - `GET /rdm` → reads and returns `rdm_fields.json` as JSON
- Both have `Access-Control-Allow-Origin: *` headers (CORS-enabled)
- All request logging is silenced (`log_message` is a no-op)

---

## 9. The Browser Launcher (`utils/browser_launcher.py`)

**Why a subprocess (not a thread)?** Playwright's synchronous API blocks the calling thread. If it ran inside Streamlit's main thread, every page rerun would hang. By spawning it as a **fully detached subprocess**, the browser stays open even if Streamlit reruns.

**Startup sequence:**
1. Read `mode` (`"rfc"` or `"rdm"`) and JSON path from `sys.argv`
2. Call `kill_other_launchers()` — checks `browser_launcher.pid` file, kills the old process if different PID, also kills any Chrome/Edge processes using the `browser_profile` directory (prevents stale tabs)
3. Write own PID to `browser_launcher.pid`
4. Load JSON data from the temp file
5. Create `MyGenieBrowser(slow_mo=300)` and call `b.start()`
6. Call `b.prefill_rfc(data)` or `b.prefill_rdm(data)`
7. Enter a `while True: time.sleep(2)` loop — polls `b.page.url` every 2 seconds to detect if the browser was closed
8. On browser close → removes PID file and exits

**Windows-specific flags:**
```python
_flags = subprocess.CREATE_NO_WINDOW | subprocess.CREATE_NEW_PROCESS_GROUP
```
`CREATE_NO_WINDOW` prevents a black console window flashing. `CREATE_NEW_PROCESS_GROUP` allows the subprocess to survive if the parent Streamlit process is terminated.

---

## 10. The Browser Automation Engine (`utils/mygenie_browser.py`)

The most complex component — 1,342 lines. Uses **Playwright (synchronous API)**.

### 10.1 Browser Launch Strategy

```python
user_data_dir = ".../browser_profile"  # Persistent Chrome profile
```

The browser is launched with a **persistent user data directory** (`browser_profile/`). This stores the PETRONAS SSO session cookies. Once the analyst logs into myGenie+ the first time, subsequent launches automatically restore the session — no username/password needed.

Browser detection priority:
1. Chrome at `C:\Program Files\Google\Chrome\...`
2. Chrome at `%LOCALAPPDATA%\Google\Chrome\...`
3. Edge at `C:\Program Files (x86)\Microsoft\Edge\...`
4. Edge at `%LOCALAPPDATA%\Microsoft\Edge\...`
5. Playwright channel `"chrome"` (installed Playwright browsers)
6. Playwright channel `"msedge"`
7. Bundled Chromium (fallback)

Always launched with:
- `headless=False` — browser is ALWAYS visible (ITSM compliance + user review)
- `slow_mo=300` — 300ms delay between actions (improves reliability on slow Angular apps)
- `--start-maximized` — full-screen for usability

### 10.2 Form Context Detection (Main Page vs iframe)

myGenie+ SmartIT uses an Angular app that sometimes renders the form on the main page and sometimes inside an iframe, depending on the route. The code handles both:

```python
for attempt in range(240):   # up to ~2 minutes, polls every 0.5s
    # Check main page
    main_count = self.page.locator("input:visible, textarea:visible, select:visible").count()
    if main_count > 3:
        form_ctx = self.page
        break

    # Check each frame
    for frame in self.page.frames:
        fc = frame.locator("input, textarea, select").count()
        if fc > 3:
            form_ctx = frame
            break
```

Detects session timeout pages (`"logout"` or `"rsso"` in URL) and automatically re-navigates to the form URL.

### 10.3 Field-Filling Helpers

**`ctx_fill(field_name, value)`** — Text inputs and textareas:
1. Try CSS selector by `placeholder*='field_name'` or `name*='fieldname'`
2. Fallback: find `<label>` with matching text, get its parent's `input`/`textarea`

**`ctx_dropdown_custom(testid_prefix, label_text, value)`** — Angular-style custom dropdowns (not native `<select>`):
1. Find and click the dropdown trigger button by `data-testid` or `id`
2. Wait for the popup container (`adapt-dropdown-window`, `[role='listbox']`, `.dropdown-menu`, etc.)
3. Try **exact match** → word boundary match → substring match
4. Fallback: select first option in the popup
5. Last resort: press the first character of the value then `Enter`

**`ctx_autocomplete(id_suffix, label_text, value)`** — Typeahead fields:
1. Find input by `id` (`ar1000000001` etc. — BMC internal field IDs)
2. Fill the value (triggers API lookup)
3. Wait for suggestion popup
4. Same 3-tier matching: exact → word boundary → substring → first option → Enter

### 10.4 RFC Pre-Fill Sequence (`prefill_rfc`)

Navigates to: `https://mygenieplus-smartit.onbmc.com/smartit/app/#/create/changePV`

Order of field filling (order matters — autocompletes trigger cascading resets):
1. **Summary** (text)
2. **Detailed Description** — tries CKEditor JS API first (`window.CKEDITOR.instances[keys[0]].setData(text)`), falls back to iframe `body.fill()`
3. **Autocompletes first** (trigger company/org resets):
   - Company → field `ar1000000001`
   - Coordinator Group → field `ar1000003229`
   - Change Coordinator → field `ar1000003230`
   - Change Manager Group → field `ar1000000015`
4. **Dropdowns after autocompletes**:
   - Change Type (`rx-select-28`)
   - Impact (`rx-select-30`)
   - Urgency (`rx-select-31`)
   - Risk Level (`rx-select-60`)
   - Reason (`rx-select-29`)
   - Priority (`rx-select-32`)
   - Downtime (`rx-select-54`)
5. **Dates**: Start date, End date
6. **Risk Questions**: If `auto_answer_risks=True`, finds all `adapt-rx-radiobutton:has-text('No')` labels and clicks each one
7. **Attachment Modal**: Clicks "Add reference documents" button, waits for the docked panel, fills Description with `"UAT ONLINE"`, selects `"Business justification"` from the Document type dropdown, then **stops** — user must attach the actual file
8. **NEVER clicks Submit** — returns `True, "RFC form pre-filled. Please review and submit."`

### 10.5 RDM Pre-Fill Sequence (`prefill_rdm`)

Navigates to: `https://mygenieplus-smartit.onbmc.com/smartit/app/#/create/releasePV`

Same form-detection pattern. Field filling order:
1. **Autocompletes first**:
   - Company → `ar1000000001`
   - Template → `ar488604501` (if specified)
   - Release Coordinator Group → `ar1000000015`
   - Release Coordinator → `ar1000000403`
   - Service → `ar303497300`
2. **Summary** (text)
3. **Detailed Description** — tries simple `textarea` first (RDM usually has a plain textarea), falls back to CKEditor
4. **Dropdowns**:
   - Release Type (`rx-select-45`)
   - Business Justification (`rx-select-46`)
   - Impact (`rx-select-47`)
   - Urgency (`rx-select-48`)
   - Priority (`rx-select-49`)
   - Risk Level (`rx-select-65`)
5. **Dates** — uses direct ID selectors first (`#1000000350`, `#1000000362`) then falls back to label-based fill
6. **Attachment Modal** — same as RFC: opens modal, fills Description with `"UAT ONLINE"`, selects `"Business justification"` document type, stops
7. **NEVER clicks Submit**

---

## 11. Diagnostics Built Into the Engine

On every form load, the browser automation dumps two debug artifacts to the project root:

**`mygenie_dom_dump.html`** — the full `document.documentElement.outerHTML` of the form page. Used to inspect the exact field IDs and names when selectors break.

**Field inventory log** — prints every `<input>`, `<textarea>`, `<select>` on the page to console:
```
[VIS] <INPUT type='text' name='ar1000000001' id='ar1000000001' placeholder='Company' ...>
[hid] <INPUT type='hidden' name='ar304450411' ...>
```

**Screenshots** — `b.take_screenshot("form_loaded")` and `b.take_screenshot("rfc_prefill_error")` are saved as `hcsm_form_loaded_<timestamp>.png` for debugging failed prefills.

**`browser_launcher.log`** — every subprocess launch is timestamped and appended. All stdout/stderr from `browser_launcher.py` goes here. File opened in append mode so history is preserved.

---

## 12. All Dropdown Options (from `utils/config.py`)

### RFC Dropdowns
| Field | Options |
|---|---|
| Change Type | Normal, Standard, Emergency, Expedited, Latent, No Impact |
| Change Timing | Normal, Expedited, Emergency, Latent |
| Impact | 6 options (Downtime/No Downtime × scope) |
| Urgency | 8 options (Critical/Non-Critical × Business Hours) |
| Risk Level | Risk Level 1–5 |
| Reason For Change | Maintenance, Fix/Repair, New Functionality, Upgrade, Other |
| Priority | S3, S2, S1 |
| Downtime | No, Yes |

### RDM Dropdowns
| Field | Options |
|---|---|
| Release Type | Operation, Project |
| Business Justification | Maintenance, Defect, Upgrade, Rollout/Enhancement, Corporate Strategic, Regulatory Requirement, Audit/Compliance |
| Priority | Medium, High, Critical |
| Impact | Same 6 as RFC |
| Urgency | Same 8 as RFC |
| Risk Level | Risk Level 1–5 |

---

## 13. Session State — Full List

Defined in `utils/config.py` as `SESSION_DEFAULTS`:

| Key | Default | Purpose |
|---|---|---|
| `current_step` | `1` | Which step is displayed |
| `furthest_step` | `1` | Maximum step ever reached (navigation guard) |
| `rfc_id` | `None` | RFC number entered by analyst in Step 3 |
| `rdm_id` | `None` | RDM number entered by analyst in Step 5 |
| `rfc_confirmed` | `False` | Whether RFC step was completed |
| `rdm_confirmed` | `False` | Whether RDM step was completed |
| `browser_open` | `False` | Whether browser subprocess was launched |
| `ticket_params` | `{}` | All 11 ticket fields from URL/protocol |
| `rfc_fields` | `{}` | All RFC form field values |
| `rdm_fields` | `{}` | All RDM form field values |
| `api_token` | `None` | (Reserved for future API mode) |
| `mode` | `"browser"` | `"browser"` or `"api"` |
| `authenticated` | `False` | (Reserved) |
| `username` / `password` | `None` | (Reserved, never written to disk) |

---

## 14. Key Design Decisions

| Decision | Why |
|---|---|
| **Never auto-submit** | ITSM compliance — analyst must review every field before submitting to BMC SmartIT |
| **Persistent browser profile** | SSO session is preserved across launches — no re-login needed each time |
| **Subprocess (not thread)** for browser | Playwright's sync API blocks; detached subprocess survives Streamlit reruns |
| **Kill old launchers on start** | Prevents multiple stale Chrome windows accumulating |
| **URL query params for state** | Enables bookmarking, browser back button, and step navigation without full-page rebuilds |
| **Furthest-step guard** | Prevents skipping to summary without completing the process |
| **Fill autocompletes before dropdowns** | Angular form cascades (Company → Coordinator Group → Coordinator) reset child fields on parent change |
| **3-tier match for dropdowns** | Angular dropdowns use partial text rendering; exact → word boundary → substring handles label format differences |
| **Local API server** | Decoupled architecture — browser subprocess can fetch latest fields even if JSON path changes |
| **Dump DOM + screenshots on load** | Debugging tool for when BMC SmartIT updates its UI and selectors break |

---

## 15. Files Summary

| File | Lines | Role |
|---|---|---|
| `pages/3_Pre_Deployment.py` | 830 | Main wizard UI — all 6 steps |
| `utils/mygenie_browser.py` | 1,342 | Playwright browser engine |
| `utils/browser_launcher.py` | 125 | Standalone subprocess that runs Playwright |
| `utils/config.py` | 130 | All dropdown options, system mappings, session defaults |
| `utils/ui_components.py` | 372 | Step indicator, info cards, Teams summary generator |
| `utils/api_server.py` | 77 | Background HTTP server serving JSON fields on port 18501 |
| `utils/protocol_handler.py` | 63 | hcsm:// protocol URL parser |
| `utils/mygenie_api.py` | — | (Reserved — API-mode client, not yet used in UI) |
| `browser_profile/` | dir | Persistent Chrome SSO session storage |
| `rfc_fields.json` | — | Written on Step 2, read by API server |
| `rdm_fields.json` | — | Written on Step 4, read by API server |
| `browser_launcher.log` | — | Append-only debug log for all subprocess launches |
| `mygenie_dom_dump.html` | — | Last browser form's full HTML (debugging) |
