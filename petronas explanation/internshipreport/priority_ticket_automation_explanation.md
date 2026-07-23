# 🤖 Priority Ticket Automation System — Technical Deep-Dive

This document provides a comprehensive technical breakdown of the **Priority Ticket Automation System** implemented for the PETRONAS ERP HCM Support (MyCareerX) team. The system consists of three integrated Microsoft Power Automate flows, six Office Scripts (TypeScript), and Microsoft Teams/SharePoint connectors.

---

## 1. System Architecture Overview

The system automates the logging, enrichment, tracking, and weekly review lifecycle of priority IT support tickets. The three distinct Power Automate flows operate in a closed-loop ecosystem:

```
                  +----------------------------------------------+
                  |  Teams Support Chat (REQ0... or ICT_WO0...)  |
                  +----------------------+-----------------------+
                                         |
                                         ▼ [Trigger: Mention]
+---------------------------------------------------------------------------------+
| FLOW 1: Auto-Logger                                                             |
| 1. Intercepts REQ / ICT_WO ticket numbers in real time                          |
| 2. Performs a duplicate check on the SharePoint Excel tracking list             |
| 3. Creates placeholder Excel row with metadata (Raised By, Date)                |
| 4. Queries daily ticket dump using Office Script (processOpenSRWO)              |
| 5. Backfills ticket metadata (Module, Description, Assignee)                    |
| 6. Posts green confirmation card with assignee and ticket details to Teams      |
+----------------------------------------+----------------------------------------+
                                         |
                                         ▼
                     +---------------------------------------+
                     |      Excel Priority Ticket List       |
                     |  (myCareerX_Urgent_High_Priority...)  |
                     +-------------------+-------------------+
                                         |
                                         ▲
+----------------------------------------+----------------------------------------+
| FLOW 2: HCSM Data Sourcing             | FLOW 3: Weekly Reminder Flow           |
| [Trigger: Daily BMC Helix Email]       | [Trigger: Thursday 3:00 PM Recurrence] |
| 1. Parses email Excel attachments      | 1. Creates new weekly status column    |
| 2. Updates SharePoint daily files      | 2. Filters active/open priority rows   |
| 3. Backfills incomplete logger rows    | 3. Resolves Azure AD assignee emails   |
| 4. Refreshes data for Power BI         | 4. Sends Teams Adaptive Card reminder  |
|                                        |    with real user @mentions            |
|                                        | 5. Creates Friday review Teams meeting |
+----------------------------------------+----------------------------------------+
```

---

## 2. Flow 1: Auto-Logger — Urgent/Priority Support Tickets

This flow provides 24/7 real-time monitoring of the Teams support group chat to intercept and log priority ticket requests.

### 2.1 Trigger & Validation Criteria
* **Trigger:** Microsoft Teams connector — `When keywords are mentioned`.
  * **Keywords Monitored:** `REQ` and `ICT_WO`
  * **Scope:** Teams channel / group chat ID: `19:meeting_NmRlNDA...@thread.v2`
* **Validation Conditions:**
  * **Bot Prevention:** Verifies `from/user/id` is not null to ignore system messages and other bots.
  * **Time Window:** Filters for messages created within the **last 1 hour** (prevents processing backlogs on flow restart).

### 2.2 Substring-Based Extraction Logic (Regex-Free)
To parse out standard 15-character ticket IDs without consuming premium regex actions, the flow uses native Power Automate string functions:
1. **Delimiting:** Replace `REQ0` with `|REQ0` and `ICT_WO0` with `|ICT_WO0`.
2. **Splitting:** Split the message text by the `|` character.
3. **Filtering:** Loop through segments and select strings starting with `REQ0` or `ICT_WO0`.
4. **Trimming:** Apply `substring(item(), 0, 15)` to isolate the 15-character identifier (e.g., `REQ000000123456` or `ICT_WO0000098765`).

### 2.3 Duplicate Validation
1. Executes `Get rows` from the SharePoint tracking file:
   `/Shared Documents/Priority Tickets/myCareerX_Urgent_High_Priority_Ticket_List_Petronas.xlsx`
2. Applies a filter query checking if `REQ_Number` or `Work Order` matches the extracted ID.
3. **If Match Found:** Posts a message to the Teams chat ("Ticket ID already exists in the queue") and terminates.
4. **If No Match:** Adds a new row with basic metadata (`Date Raised`, `Raised By`, `Remarks = "In Progress"`).

### 2.4 Data Enrichment Process
1. Executes the **Office Script** `processOpenSRWO` on the live data file `Service Request (Daily) [MYCAREERX SUPPORT & SAP HR].xlsx`.
2. Filters the script’s output array in Power Automate by the extracted ticket ID.
3. **If Match is Found in Daily Dump:** Updates the tracking spreadsheet row:
   * **Module:** Set to the ticket's Product Categorization Tier 3.
   * **Issue Description:** Set to the ticket summary.
   * **PDSB/AMS:** Set to the assigned developer.
   * **Raised By:** Appends the reporter name from the ticket.
4. **If No Match is Found (Helix Delay):** Leaves columns blank; they will be filled later by Flow 2's backfill job.

### 2.5 Teams Feedback Card
Posts a teal-accented confirmation card back to the Teams chat:
```
NEW PRIORITY TICKET LOGGED
A priority request has been intercepted and added to the Excel queue.
• WORK ORDER ID: ICT_WO0...
• REQUEST ID: REQ0...
• ASSIGNEE: [Name] / Pending Update
```

---

## 3. Flow 2: HCSM Data Sourcing (Daily Sync & Backfill)

This flow updates the upstream data files and handles backfilling for tickets logged before the daily BMC Helix dump arrived.

### 3.1 Trigger
* **Trigger:** `When a new email arrives (V3)` from `noreply-bmchelix@onbmc.com`.
* **Filters:** Subject contains `"daily"`, must have attachments.

### 3.2 File Processing Matrix
The flow loops through the email attachments, identifies their content using string matching, and updates the SharePoint paths:

| Attachment Name Keyword | Destination File Path | Write Operation |
|---|---|---|
| `Service Request (Daily)` | `Service Request (Daily) [MYCAREERX SUPPORT & SAP HR].xlsx` | In-place update |
| `Incident Raw Data (Daily)` | `Incident Raw Data (Daily) [MYCAREERX SUPPORT & SAP HR].xlsx` | In-place update |
| `Service Request Ageing Raw Data` | `Service Request & Work Order Ageing Raw Data Preview.xlsx` | Delete & upload new |
| `Incident Ageing Raw Data` | `Incident Ageing Raw Data Preview.xlsx` | Delete & upload new |

* For the daily tracking files, the flow performs an **in-place update** (retaining existing file sharing links, metadata, and Power BI connectors).
* For the ageing reports, the flow deletes the old file and uploads the new file to ensure no outdated sheets remain cached.
* Logs progress timestamps inside `Dashboard_Update_Log.xlsx`.

### 3.3 Priority Ticket Backfill Job
Since tickets can be logged in Teams before the daily BMC Helix email arrives, some details may be initially missing.
1. The flow runs a SharePoint `Get items` query against the priority list, filtering for rows where `Module` is null.
2. For each empty row, it executes the `processOpenSRWO` Office Script against the newly updated daily Excel.
3. It updates the empty fields (Module, PDSB/AMS, Issue) on the priority list.

---

## 4. Flow 3: Weekly Priority Ticket Reminder

Runs every Thursday afternoon to prepare the team and the spreadsheet for the Friday morning review call.

### 4.1 Trigger
* **Trigger:** `Recurrence` — Every **Thursday at 3:00 PM SGT**.

### 4.2 Step-by-Step Execution
1. **Spreadsheet Structuring:** Runs the `Add_Weekly_Column` Office Script on the priority Excel file. The script dynamically inserts a new status column named `"Update as of DD/MM (PDSB/AMS)"` where `DD/MM` is tomorrow's Friday date.
2. **Active Ticket Filter:** Retrieves all rows from the tracking spreadsheet, filtering for tickets where `Remarks` equals `In Progress`, `Pending`, or `Initiated`.
3. **Assignee Extraction & Cleanup:**
   * Loops through active rows and reads the `PDSB/AMS` column.
   * Splits names separated by `/` (e.g., `Ahmad/Suresh`).
   * Strips corporate division suffix brackets (e.g., `Ahmad (EXT/DIGITAL)` → `Ahmad`).
   * Deduplicates names to prevent multiple alerts for the same person.
4. **M365 User Resolution:** For each clean name, the flow calls the **Office 365 Users Connector** to retrieve their Azure AD `ObjectId`, email, and display name.
5. **Teams Reminder Posting:** Constructs and posts an Adaptive Card to the Teams support channel. The card uses Azure AD object IDs to generate **real Teams @mentions**, triggering push alerts for the engineers:
   ```
   Weekly Priority Ticket Reminder
   Hi @Ahmad, @Suresh,
   Please update the progress of your priority tickets and target completion dates in the Excel file below before our Friday review call.
   [Button: Open Priority Ticket List]
   ```
6. **Automatic Meeting Invitation:** Calls the Teams Calendar API to create a meeting:
   * **Title:** `Weekly Priority Ticket Review — DD/MM`
   * **Time:** Friday, 11:00 AM – 12:00 PM SGT.
   * **Required Attendees:** Dynamically resolved email list of active ticket assignees.
   * **Cc Attendees:** Supervisors and leads.

---

## 5. Summary of Cloud-Based Office Scripts (TypeScript)

These TypeScript scripts run directly within Microsoft's cloud Excel engine when called by the Power Automate flows:

```typescript
// Example: Header Column Match & Data Extraction Pattern
function main(workbook: ExcelScript.Workbook) {
    let sheet = workbook.getActiveWorksheet();
    let range = sheet.getUsedRange();
    let values = range.getValues();
    let rowCount = values.length;
    
    // Find column indexes
    let headers = values[0];
    let srIdx = headers.indexOf("Service Request ID");
    let statusIdx = headers.indexOf("Work Order Status");
    let groupIdx = headers.indexOf("Work Order Assignee Group");
    
    let openCount = 0;
    // Process rows
    for (let r = 1; r < rowCount; r++) {
        let group = values[r][groupIdx];
        let status = values[r][statusIdx];
        if (group === "MYCAREERX SUPPORT" && status !== "Closed" && status !== "Cancelled") {
            openCount++;
        }
    }
    return { openCount: openCount };
}
```

### Script Inventory
* **`processOpenSRWO` / `processOpenINC`**: Scans the daily raw dumps, counts open tickets, and returns structured JSON datasets.
* **`processSRAgeingBuckets` / `processINCAgeingBuckets`**: Computes ageing metrics (`>30`, `15-30`, etc.) and returns unique assignee arrays.
* **`prepareSRAgeingAttachment` / `prepareINCAgeingAttachment`**: Formats raw tables, applies borders, and adds header dates before they are emailed to stakeholders.
* **`Add_Weekly_Column`**: Modifies the priority tracking Excel sheet to append a new column for the current week's update cycle.

---

## 6. Business Impact & Process Improvements

| Metric / Aspect | Prior Manual Process | Automated System |
|---|---|---|
| **Logging Effort** | 5–15 minutes per ticket | **0 seconds (real-time extraction)** |
| **Data Completeness** | Frequently missing descriptions/assignees | **100% complete** (auto-enriched from Helix) |
| **Supervisor Overhead** | Must monitor chat constantly to log tickets | **Zero overhead** (runs 24/7 in the background) |
| **Duplicates** | Frequent duplicate spreadsheet rows | **Prevented** (real-time duplicate checks) |
| **Weekly Follow-up** | Manual emails and Teams messages | **Automated Thursday 3PM @mention cards** |
| **Meeting Scheduling** | Manual invite setup and list checks | **Auto-scheduled** with only active owners |
| **Data Synchronization** | Manual copy-pasting of daily exports | **Automated daily sync via email triggers** |

---

> [!WARNING]
> **Active Directory / Group Membership Dependency:** 
> When new members join the ERP HCM support team, they must be added to the Microsoft 365 Outlook directory with correct display names. If an assignee's name in BMC Helix does not match their display name in Azure Active Directory (e.g., due to different naming formats), the Office 365 Users Connector lookup will fail. It is recommended to maintain standardized display names across Helix and M365.
