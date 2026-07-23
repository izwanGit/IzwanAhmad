# Weekly Report — Power Automate Automation: Complete Documentation

> **Flow Name:** Weekly Report - Auto Generate & Send  
> **Author:** mizwan.ahmad@petronas.com  
> **Created:** 23 June 2026  
> **Platform:** Microsoft Power Automate (Cloud Flow)  
> **Tenant:** PETRONAS (`3b2e8941-7948-4131-978a-b2dfc7295091`)  
> **SharePoint Site:** `https://petronas.sharepoint.com/sites/SAPServices/HR`

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Directory Structure](#2-project-directory-structure)
3. [What Problem Does This Solve?](#3-what-problem-does-this-solve)
4. [High-Level Architecture](#4-high-level-architecture)
5. [Connectors & API Connections](#5-connectors--api-connections)
6. [Package Manifest (`manifest.json`)](#6-package-manifest-manifestjson)
7. [Flow Definition Deep Dive](#7-flow-definition-deep-dive)
   - 7.1 [Trigger — Weekly Recurrence](#71-trigger--weekly-recurrence)
   - 7.2 [Phase 1 — Variable Initialization](#72-phase-1--variable-initialization)
   - 7.3 [Phase 2 — File Preparation (Copy Source → Working Files)](#73-phase-2--file-preparation-copy-source--working-files)
   - 7.4 [Phase 3 — Office Script Execution (Data Processing)](#74-phase-3--office-script-execution-data-processing)
   - 7.5 [Phase 4 — SharePoint Monthly Snapshot (Upsert)](#75-phase-4--sharepoint-monthly-snapshot-upsert)
   - 7.6 [Phase 5 — History JSON (Trend Tracking)](#76-phase-5--history-json-trend-tracking)
   - 7.7 [Phase 6 — Build HTML Tables for Email](#77-phase-6--build-html-tables-for-email)
   - 7.8 [Phase 7 — Build Email Recipient List (Dynamic Assignee Lookup)](#78-phase-7--build-email-recipient-list-dynamic-assignee-lookup)
   - 7.9 [Phase 8 — Compose & Send Email](#79-phase-8--compose--send-email)
   - 7.10 [Phase 9 — Teams Adaptive Card Reminder](#710-phase-9--teams-adaptive-card-reminder)
   - 7.11 [Test Mode Branching](#711-test-mode-branching)
8. [Office Scripts — Complete Breakdown](#8-office-scripts--complete-breakdown)
   - 8.1 [`processOpenSRWO.osts`](#81-processopensrwoosts)
   - 8.2 [`processOpenINC.osts`](#82-processopenincosts)
   - 8.3 [`processSRAgeingBuckets.osts`](#83-processsrageingbucketsosts)
   - 8.4 [`processINCAgeingBuckets.osts`](#84-processincageingbucketsosts)
   - 8.5 [`prepareSRAgeingAttachment.osts`](#85-preparesrageingattachmentosts)
   - 8.6 [`prepareINCAgeingAttachment.osts`](#86-prepareincageingattachmentosts)
9. [Data Flow Diagram](#9-data-flow-diagram)
10. [Email Output Structure](#10-email-output-structure)
11. [Teams Adaptive Card Structure](#11-teams-adaptive-card-structure)
12. [SharePoint Locations & Data Sources](#12-sharepoint-locations--data-sources)
13. [Support Files (apisMap.json, connectionsMap.json, manifest2.json)](#13-support-files-apismapjson-connectionsmapjson-manifest2json)
14. [Error Handling & Edge Cases](#14-error-handling--edge-cases)
15. [How to Import / Deploy This Flow](#15-how-to-import--deploy-this-flow)
16. [Summary of the Complete Execution Timeline](#16-summary-of-the-complete-execution-timeline)

---

## 1. Project Overview

This project is a **fully automated weekly reporting system** built with Microsoft Power Automate and Office Scripts. It runs every **Monday at 7:00 AM (Singapore Time)** and performs the following end-to-end workflow:

1. **Copies** the latest Service Request (SR) and Incident (INC) raw data Excel files from a central SharePoint document library into a date-stamped folder.
2. **Executes 6 Office Scripts** on the copied Excel files to count open tickets, compute ageing buckets, calculate percentages, filter data, and prepare formatted attachment workbooks.
3. **Updates a history JSON file** on SharePoint for week-over-week trend tracking.
4. **Upserts a SharePoint list item** for a monthly snapshot dashboard.
5. **Composes a rich HTML email** with inline ageing trend tables and detailed ticket-level breakdowns, then sends it via Outlook.
6. **Posts an Adaptive Card to a Microsoft Teams group chat** mentioning (with @-mentions) all assignees who have tickets ageing > 30 days, with a direct link to the attachment file.

**Target Group:** `MYCAREERX SUPPORT` (an HR support team within PETRONAS).

---

## 2. Project Directory Structure

```
WeeklyReport-Automation/
│
├── manifest.json                          # Power Automate package manifest (root)
│
├── Microsoft.Flow/
│   └── flows/
│       ├── manifest2.json                 # Flow assets package index
│       └── af501bd2-.../                  # Flow GUID directory
│           ├── definition.json            # Full flow definition (55 KB)
│           ├── apisMap.json               # API connector → resource ID mapping
│           └── connectionsMap.json        # Connection → resource ID mapping
│
└── office script/
    ├── processOpenSRWO.osts               # Count open SR/WO tickets
    ├── processOpenINC.osts                # Count open INC tickets
    ├── processSRAgeingBuckets.osts         # SR ageing bucket analysis
    ├── processINCAgeingBuckets.osts        # INC ageing bucket analysis
    ├── prepareSRAgeingAttachment.osts      # Prepare SR attachment workbook
    └── prepareINCAgeingAttachment.osts     # Prepare INC attachment workbook
```

### File Sizes

| File | Size |
|------|------|
| `manifest.json` | 5,059 bytes |
| `definition.json` | 55,584 bytes |
| `apisMap.json` | 309 bytes |
| `connectionsMap.json` | 309 bytes |
| `manifest2.json` | 99 bytes |
| `processOpenSRWO.osts` | 3,257 bytes |
| `processOpenINC.osts` | 2,973 bytes |
| `processSRAgeingBuckets.osts` | 12,201 bytes |
| `processINCAgeingBuckets.osts` | 5,742 bytes |
| `prepareSRAgeingAttachment.osts` | 9,277 bytes |
| `prepareINCAgeingAttachment.osts` | 6,703 bytes |

---

## 3. What Problem Does This Solve?

Previously, the HCSM (HR Cloud Service Management) team had to **manually**:

1. Open source data Excel files on SharePoint.
2. Filter for the `MYCAREERX SUPPORT` group.
3. Count open tickets and calculate ageing percentages.
4. Copy the data into a formatted email.
5. Send the email to all relevant stakeholders.
6. Notify assignees on Teams with ticket links.

This was **time-consuming, error-prone, and inconsistent**. The automation eliminates all manual steps and ensures the report is generated and distributed every Monday at 7:00 AM without human intervention.

---

## 4. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    POWER AUTOMATE CLOUD FLOW                           │
│                                                                        │
│  [Recurrence Trigger] ──→ Every Monday 7 AM SGT                       │
│           │                                                            │
│           ▼                                                            │
│  [Initialize Variables] ──→ Date formats, test mode, email lists       │
│           │                                                            │
│           ▼                                                            │
│  [Create Folder] ──→ SharePoint: /Weekly Report/{dd MMMM yyyy}/       │
│           │                                                            │
│           ▼                                                            │
│  [Copy 4 Source Files] ──→ SR Daily, INC Daily, SR Ageing, INC Ageing │
│           │                                                            │
│           ▼                                                            │
│  [Run 6 Office Scripts] ──→ Count, Bucket, Prepare Attachments        │
│           │                                                            │
│           ▼                                                            │
│  [Update SharePoint List] ──→ Monthly snapshot upsert                  │
│           │                                                            │
│           ▼                                                            │
│  [Update history.json] ──→ Week-over-week trend data                  │
│           │                                                            │
│           ▼                                                            │
│  [Build HTML Email] ──→ Trend tables + ticket detail tables           │
│           │                                                            │
│           ▼                                                            │
│  [Send Outlook Email] ──→ To/Cc stakeholders with 2 attachments       │
│           │                                                            │
│           ▼                                                            │
│  [Post Teams Card] ──→ @-mention assignees with file link             │
│                                                                        │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Connectors & API Connections

The flow uses **5 Microsoft connectors**, all authenticated under `mizwan.ahmad@petronas.com`:

| # | Connector | API Name | Purpose |
|---|-----------|----------|---------|
| 1 | **SharePoint** | `shared_sharepointonline` | Read/write files, create folders, get/update list items, read/update `history.json` |
| 2 | **Excel Online (Business)** | `shared_excelonlinebusiness` | Run Office Scripts on Excel workbooks stored in SharePoint |
| 3 | **Microsoft Teams** | `shared_teams` | Post Adaptive Cards to group chats, add members to chats |
| 4 | **Office 365 Users** | `shared_office365users` | Search users by name to resolve email addresses and user IDs for @-mentions |
| 5 | **Office 365 Outlook** | `shared_office365` | Send the weekly report email with attachments |

---

## 6. Package Manifest (`manifest.json`)

The root `manifest.json` is the **Power Automate solution package descriptor**. It defines:

### Schema & Package Info

- **Schema version:** `1.0`
- **Display name:** `"Weekly Report - Auto Generate & Send"`
- **Created:** `2026-06-23T07:39:41.318482Z`
- **Telemetry ID:** `95dbd974-d0be-4686-be94-6c89fc5e2a9d`

### Resource Hierarchy

The manifest declares **11 resources** organized in a parent-child hierarchy:

```
ROOT (Flow)
├── SharePoint API
│   └── SharePoint Connection (mizwan.ahmad@petronas.com)
├── Excel Online API
│   └── Excel Connection (mizwan.ahmad@petronas.com)
├── Microsoft Teams API
│   └── Teams Connection (mizwan.ahmad@petronas.com)
├── Office 365 Users API
│   └── O365 Users Connection (mizwan.ahmad@petronas.com)
└── Office 365 Outlook API
    └── Outlook Connection (mizwan.ahmad@petronas.com)
```

Each resource has:
- A unique GUID as its resource ID.
- A `type` (e.g., `Microsoft.Flow/flows`, `Microsoft.PowerApps/apis`, `Microsoft.PowerApps/apis/connections`).
- A `suggestedCreationType` (`Existing`, `New`, or `Update`) indicating how the resource should be handled on import.
- A `dependsOn` array showing its parent resources.

---

## 7. Flow Definition Deep Dive

The flow definition (`definition.json`) is 55 KB and contains every single action, condition, loop, and expression. Below is a complete walk-through of every step in execution order.

---

### 7.1 Trigger — Weekly Recurrence

| Property | Value |
|----------|-------|
| **Type** | `Recurrence` |
| **Frequency** | `Week` |
| **Interval** | `1` (every week) |
| **Time Zone** | `Singapore Standard Time` (UTC+8) |
| **Start Time** | `2026-05-31T23:00:00.000Z` |
| **Day** | `Monday` |
| **Time** | `07:00` |

The flow fires once per week on Monday at 7:00 AM Malaysia/Singapore time.

---

### 7.2 Phase 1 — Variable Initialization

The flow initializes **20 variables** sequentially. These are executed in strict dependency order (each `runAfter` the previous):

#### Core Date/Configuration Variables

| # | Variable Name | Type | Value / Expression | Purpose |
|---|---------------|------|--------------------|---------|
| 1 | `IsTestMode` | boolean | `false` | Controls whether email/Teams goes to real recipients or test channel |
| 2 | `ReportDate` | string | `formatDateTime(convertTimeZone(utcNow(), 'UTC', 'Singapore Standard Time'), 'dd-MMM-yyyy')` | e.g., `"30-Jun-2026"` — used as key in history.json |
| 3 | `ReportDateDisplay` | string | `formatDateTime(convertTimeZone(utcNow(), 'UTC', 'Singapore Standard Time'), 'd MMMM yyyy')` | e.g., `"30 June 2026"` — used in email body text |
| 4 | `DateFolder` | string | `formatDateTime(convertTimeZone(utcNow(), 'UTC', 'Singapore Standard Time'), 'dd MMMM yyyy')` | e.g., `"30 June 2026"` — SharePoint folder name |
| 5 | `DateSuffix` | string | `formatDateTime(convertTimeZone(utcNow(), 'UTC', 'Singapore Standard Time'), 'ddMMM')` | e.g., `"30Jun"` — file name suffix |
| 6 | `UpdateAsOf` | string | `formatDateTime(convertTimeZone(utcNow(), 'UTC', 'Singapore Standard Time'), 'dd MMM')` | e.g., `"30 Jun"` — used in attachment "Update Details" sheet header |

#### Email Recipient Variables

| # | Variable Name | Type | Value |
|---|---------------|------|-------|
| 7 | `EmailTo` | string | `"mizwan.ahmad@petronas.com; msuhail.roslan@petronas.com"` |
| 8 | `EmailCc` | string | `"yusrinah.mohamed@petronas.com.my; norhaiza.awang@petronas.com.my; aisyoul.zainon@petronas.com.my; prashant.k.singh@oracle.com; manesh.kallil@oracle.com; rozaire@petronas.com.my; jayanthan.sankar@petronas.com.my; msuhail.roslan@petronas.com"` |

#### HTML Builder Variables (All Initialized Empty)

| # | Variable Name | Purpose |
|---|---------------|---------|
| 9 | `SrGt30HtmlRows` | HTML rows for SR tickets ageing > 30 days |
| 10 | `Sr1530HtmlRows` | HTML rows for SR tickets ageing 15–30 days |
| 11 | `SRTrendDatesHtml` | Date header cells for the SR/INC trend table |
| 12 | `SRTrendGt30Html` | SR > 30 day trend cells |
| 13 | `SRTrend1530Html` | SR 15–30 day trend cells |
| 14 | `SRTrend114Html` | SR 1–14 day trend cells |
| 15 | `INCTrendGt90Html` | INC > 90 day trend cells |
| 16 | `INCTrend6190Html` | INC 61–90 day trend cells |
| 17 | `INCTrend3160Html` | INC 31–60 day trend cells |
| 18 | `INCTrend1530Html` | INC 15–30 day trend cells |
| 19 | `INCTrend814Html` | INC 8–14 day trend cells |
| 20 | `INCTrend37Html` | INC 3–7 day trend cells |

#### Teams Mention Variables

| # | Variable Name | Type | Purpose |
|---|---------------|------|---------|
| 21 | `TeamsMentionsJson` | string | Accumulates JSON `mention` entity objects for the Teams card |
| 22 | `TeamsMentionText` | string | Accumulates `<at>DisplayName</at>` tokens for the card body |
| 23 | `EmailToAssignees` | string | Dynamically built email recipient list for assignees |

---

### 7.3 Phase 2 — File Preparation (Copy Source → Working Files)

The flow creates a **date-stamped folder** on SharePoint and copies **4 source Excel files** into it:

#### Step 1: Create Folder

```
SharePoint: Create New Folder
Site:   https://petronas.sharepoint.com/sites/SAPServices/HR
List:   Shared Documents (ID: bd95e7aa-0b79-464a-a291-c7b5de2b6d48)
Path:   /Weekly Report/{DateFolder}
```

Example folder: `/Weekly Report/30 June 2026/`

#### Steps 2–5: Copy 4 Source Files

| # | Action | Source Path | Destination File Name |
|---|--------|-------------|----------------------|
| 1 | `Get_Source_SR_Daily_File` → `Create_SR_Daily_Working_File` | `/Shared Documents/ERP Dashboard/HCSM Ticket Monitoring Dashboard/Ticketing Data/Service Request/Service Request (Daily) [MYCAREERX SUPPORT & SAP HR].xlsx` | `SR Daily Working_{DateSuffix}.xlsx` |
| 2 | `Get_Source_INC_Daily_File` → `Create_INC_Daily_Working_File` | `/Shared Documents/ERP Dashboard/HCSM Ticket Monitoring Dashboard/Ticketing Data/Incident/Incident Raw Data (Daily) [MYCAREERX SUPPORT & SAP HR].xlsx` | `INC Daily Working_{DateSuffix}.xlsx` |
| 3 | `Get_Source_SR_Ageing_File` → `Create_SR_Attachment_File` | `/Shared Documents/ERP Dashboard/HCSM Ticket Monitoring Dashboard/Ticketing Data/Ageing Service Request/Service Request Ageing Raw Data [Daily].xlsx` | `Service Request & Work Order Ageing Raw Data Preview_{DateSuffix}.xlsx` |
| 4 | `Get_Source_INC_Ageing_File` → `Create_INC_Attachment_File` | `/Shared Documents/ERP Dashboard/HCSM Ticket Monitoring Dashboard/Ticketing Data/Ageing Incident/Incident Ageing Raw Data (Daily).xlsx` | `Incident Ageing Raw Data Preview_{DateSuffix}.xlsx` |

All files are copied using **chunked transfer mode** (`transferMode: "Chunked"`) for large file support.

**Why copy instead of reading directly?**
- The working files are modified by Office Scripts (filtering data, adding cover sheets).
- Source files remain untouched for other consumers.
- The date-stamped folder serves as an archive.

---

### 7.4 Phase 3 — Office Script Execution (Data Processing)

The flow runs **6 Office Scripts** sequentially. Each script is executed via the **Excel Online (Business) "Run Script" action** (`RunScriptProd`).

All scripts target the same SharePoint site/drive:
```
Site:  sites/petronas.sharepoint.com,49ae8be5-...,67d7c9c9-...
Drive: b!5YuuSeiza0iJa3eJxw25rcnJ12c_FSpLj-q5wkELsKGq55W9eQtKRqKRx7XeK21I
```

#### Execution Order & Data Dependencies

```
1. processOpenSRWO    → runs on: SR Daily Working file
                        → output: openCount (distinct open SR IDs)
                        
2. processOpenINC     → runs on: INC Daily Working file
                        → output: openCount (distinct open INC IDs)
                        
3. processSRAgeingBuckets → runs on: SR Ageing Attachment file
                            → input:  openCount from step 1
                            → output: bucket counts, percentages, ticket arrays, assignee lists
                            
4. processINCAgeingBuckets → runs on: INC Ageing Attachment file
                             → input:  openCount from step 2
                             → output: bucket counts, percentage
                             
5. prepareSRAgeingAttachment → runs on: SR Ageing Attachment file
                               → input:  updateAsOf string
                               → output: filtered workbook ready for email attachment
                               
6. prepareINCAgeingAttachment → runs on: INC Ageing Attachment file
                                → input:  updateAsOf string
                                → output: filtered workbook ready for email attachment
```

---

### 7.5 Phase 4 — SharePoint Monthly Snapshot (Upsert)

The flow maintains a **SharePoint list** (ID: `87f3bcc9-f1dc-4513-8333-ec4fa88314ee`) for monthly dashboard snapshots.

#### Logic: `Get_MonthlySnapshot` → `Condition_SRSnapshotUpsert`

1. **Query:** Get list items where `SortOrder` equals the current month (e.g., `"202606"`).
2. **If a record exists** (current month already has data): **Update** the existing item with latest ageing counts.
3. **If no record exists**: **Create** a new list item for this month.

#### Data Written to the SharePoint List:

| Column | Value |
|--------|-------|
| `Title` | `"Jun 2026"` (formatted `MMM yyyy`) |
| `MonthYear` | `"Jun 2026"` |
| `SnapshotDate` | Current timestamp |
| `AgeingOver30` | SR > 30 days count |
| `SortOrder` | `"202606"` |

A similar `Condition_INCSnapshotUpsert` action does the same for Incident data.

---

### 7.6 Phase 5 — History JSON (Trend Tracking)

The flow reads, updates, and writes back a **JSON file** stored on SharePoint:

```
Path: /Shared Documents/ERP Dashboard/HCSM Ticket Monitoring Dashboard/
      Ticketing Data/Report Hub Config/MYCAREERX SUPPORT/history.json
```

#### Steps:

1. **`Get_HistoryJson`** — Read the file content (binary).
2. **`Get_HistoryJson_Metadata`** — Get the file ID for later update.
3. **`Parse_history_json`** — Decode from base64, parse as JSON array.

#### History JSON Schema:

Each entry in the array has this structure:

```json
{
  "date": "30-Jun-2026",
  "sr_count_gt_30": 5,
  "sr_count_15_30": 8,
  "sr_count_1_14": 12,
  "inc_count_gt_90": 2,
  "inc_count_61_90": 3,
  "inc_count_31_60": 7,
  "inc_count_15_30": 4,
  "inc_count_8_14": 6,
  "inc_count_3_7": 10
}
```

4. **`Compose_NewHistoryRecord`** — Build a new JSON object with today's counts from the Office Script results.
5. **`Filter_RemoveExistingReportDate`** — Remove any existing entry with today's `ReportDate` (to handle re-runs / idempotency).
6. **`Compose_UpdatedHistoryFull`** — Union the filtered history with the new record.
7. **`Compose_HistoryFinal`** — Final composition for writing.
8. **`Update_HistoryJson`** — Write back to SharePoint (only in non-test mode).

---

### 7.7 Phase 6 — Build HTML Tables for Email

#### 6a: Build Ticket Detail Rows

**`Loop_BuildGt30Rows`** — Iterates over `sr_gt_30_tickets` array (returned by `processSRAgeingBuckets`):
- For each ticket, appends an HTML `<tr>` row to `SrGt30HtmlRows` with columns:
  - SR Ageing (days), Work Order No., Summary, User/TSG, WO Status, WO Status Reason, Assignee

**`Loop_Build1530Rows`** — Same pattern for `sr_15_30_tickets` → appends to `Sr1530HtmlRows`.

#### 6b: Build Trend Table Cells

**`Loop_BuildTrendHtml`** — Iterates over the **last 4 entries** of the updated history:
- Uses `take(skip(...), 4)` to get only the most recent 4 weeks.
- For each historical entry, appends HTML `<th>` / `<td>` cells to **11 variables**:
  - `SRTrendDatesHtml` — date headers
  - `SRTrendGt30Html`, `SRTrend1530Html`, `SRTrend114Html` — SR bucket trend cells
  - `INCTrendGt90Html`, `INCTrend6190Html`, `INCTrend3160Html`, `INCTrend1530Html`, `INCTrend814Html`, `INCTrend37Html` — INC bucket trend cells

---

### 7.8 Phase 7 — Build Email Recipient List (Dynamic Assignee Lookup)

**`Loop_BuildEmailTo`** — Iterates over `assignee_search_names` (from `processSRAgeingBuckets`):
1. **Deduplication check:** Skip if name already in `EmailToAssignees`.
2. **`Search_UserEmail`** — Uses the **Office 365 Users** connector to search for the user by name (top 1 result).
3. **If found:** Append their email to `EmailToAssignees` (semicolon-separated).

**`Compose_DebugEmailRecipients`** — Outputs the final recipient list for debugging.

---

### 7.9 Phase 8 — Compose & Send Email

**`Compose_FinalEmailHTML`** — Builds the complete HTML email body. The email includes:

1. **Opening paragraph** — Asks the team to follow up and close aging tickets.
2. **Service Request section:**
   - Open ticket count & ageing percentages
   - 4-week trend table (> 30 days, 15–30 days, 1–14 days)
   - Detailed ticket table for > 30 days (columns: SR Ageing, Work Order No., Summary, User/TSG, WO Status, WO Status Reason, Assignee)
   - Detailed ticket table for 15–30 days (same columns)
3. **Incident section:**
   - Open INC count & ageing percentage
   - 4-week trend table (> 90 days, 61–90, 31–60, 15–30, 8–14, 3–7 days)
4. **Closing paragraph**

**Styling:** All tables use a **teal color scheme** (`#00B1A9` background, white text for headers, white background with black text for data cells).

**`Get_SR_Attachment_Content`** & **`Get_INC_Attachment_Content`** — Download the processed attachment files.

**`Send_Weekly_Email`** — Sends via Office 365 Outlook with:
- **To:** `EmailTo` variable (the main recipients) + dynamically resolved `EmailToAssignees`
- **Cc:** `EmailCc` variable (management & stakeholders)
- **Subject:** Contains the report date
- **Body:** The composed HTML
- **Attachments:** 2 Excel files (SR Ageing + INC Ageing)
- **Importance:** High

---

### 7.10 Phase 9 — Teams Adaptive Card Reminder

**`Loop_BuildTeamsMentions`** — Iterates over `teams_names` (assignees from SR tickets > 30 days):

1. **`Compose_TrimmedName`** — Strips any bracket suffix from the name (e.g., `"John Doe (Oracle)"` → `"John Doe"`).
2. **Deduplication check** — Skip if already mentioned.
3. **`Search_User`** — Look up the user via Office 365 Users connector.
4. **If found:**
   - **`Add_UserToGroupChat`** — Ensures the user is a member of the Teams group chat (so the @-mention works). Runs with `["Succeeded", "TimedOut", "Skipped", "Failed"]` — failures don't block the flow.
   - **`Append_MentionText`** — Adds `<at>DisplayName</at>` to the body text.
   - **`Append_MentionJson`** — Adds a `mention` entity object for the Adaptive Card.

**`Compose_MentionsClean`** — Removes trailing comma from the mentions JSON.

**`Compose_TeamsCard`** — Builds an **Adaptive Card v1.4** with:
- Title: "Weekly Ageing Ticket Reminder"
- Personalized greeting with @-mentions
- Message asking to update ageing tickets
- Action button: `📂 Update SR & WO Ageing Status` → links to the SharePoint file

**`Post_Teams_AgeingReminder`** — Posts the card to the Teams group chat:
```
Chat ID: 19:c98db27b5e83429aa1496968c901185a@thread.v2
Poster: Flow bot
```

---

### 7.11 Test Mode Branching

The `Condition_UpdateHistory` action checks `IsTestMode`:

- **If `IsTestMode = false` (Production):**
  - Updates `history.json` on SharePoint.
  - Posts to the **real** Teams group chat.
  
- **If `IsTestMode = true` (Test):**
  - Skips history update.
  - Posts to a **test** Teams meeting chat: `19:meeting_NmU4MTg5NjAtZmJmZC00MGJkLWJlMzAtODEwNTBmNzlmMzcy@thread.v2`
  - Uses slightly different bot message ("Ticketing Bot" instead of "HCSM Report Bot").

---

## 8. Office Scripts — Complete Breakdown

All scripts are stored as `.osts` files (Office Script TypeScript format, version `0.3.0`). They execute synchronously (`variant: "synchronous"`) in the Excel Online runtime.

---

### 8.1 `processOpenSRWO.osts`

**Purpose:** Count the number of **distinct open Service Request IDs** for the MYCAREERX SUPPORT group.

**Input:** The SR Daily Working Excel file (first worksheet).

**Logic:**

1. Reads all values from the first worksheet.
2. Finds columns: `Work Order Assignee Group`, `Work Order Status`, `Service Request ID`.
3. Iterates through all rows:
   - **Filters by group:** Only rows where `Work Order Assignee Group = "MYCAREERX SUPPORT"`.
   - **Excludes cancelled/closed:** Skips rows with `Work Order Status` of `CANCELLED`, `CANCELED`, or `CLOSED`.
   - **Counts distinct SR IDs:** Maintains an array of unique Service Request IDs.

**Output (returned to Power Automate):**

```typescript
{
  openCount: number;       // Distinct open SR IDs
  matchedGroupRows: number; // Total rows matching MYCAREERX SUPPORT
  skippedCancelledRows: number; // Rows skipped due to cancellation
  scannedRows: number;     // Total data rows scanned
}
```

---

### 8.2 `processOpenINC.osts`

**Purpose:** Count the number of **distinct open Incident IDs** for the MYCAREERX SUPPORT group.

**Input:** The INC Daily Working Excel file (first worksheet).

**Logic:**

1. Same pattern as `processOpenSRWO` but looks for:
   - Column: `Assignee Group` (instead of `Work Order Assignee Group`)
   - Column: `Status` (instead of `Work Order Status`)
   - Column: `Incident ID` (instead of `Service Request ID`)
2. Excludes rows with status: `CANCELLED`, `CANCELED`, `CLOSED`, or `RESOLVED`.

**Output:**

```typescript
{
  openCount: number;
  matchedGroupRows: number;
  skippedInactiveRows: number;
  scannedRows: number;
}
```

---

### 8.3 `processSRAgeingBuckets.osts`

**Purpose:** The **most complex script** — analyzes SR ageing data, computes buckets, percentages, extracts ticket details, and collects assignee names.

**Input:**
- The SR Ageing Attachment Excel file.
- `openCount` parameter (from `processOpenSRWO`).

**Target Sheet:** `"4-Work Order Ageing Raw Data"` (falls back to keyword search for `"work order"` + `"ageing"`).

**Key Columns Used:**
- `Work Order Assignee Group` — filter for MYCAREERX SUPPORT
- `Service Request Ageing Days` — the ageing value
- `Work Order ID`, `Work Order Summary`, `Customer Full Name (Service Request)`, `Work Order Status`, `Work Order Status Reason`, `Work Order Assignee` — ticket details

**Logic:**

1. **Filter:** Only rows for `MYCAREERX SUPPORT`, excluding inactive statuses (`CANCELLED`, `CANCELED`, `CLOSED`, `RESOLVED`).
2. **Bucket Counting:**
   - `sr_gt_30`: ageing > 30 days
   - `sr_15_30`: ageing 15–30 days
   - `sr_1_14`: ageing 1–14 days
3. **Percentage Calculation:**
   - `sr_ageing_1day_pct` = (tickets aged ≥ 1 day) ÷ `openCount` × 100, **rounded** (no decimals)
   - `sr_ageing_30day_pct` = (tickets aged > 30 days) ÷ (tickets aged ≥ 1 day) × 100, **rounded**
4. **Ticket Detail Arrays:** Builds arrays of ticket objects for > 30 and 15–30 day buckets, sorted by ageing descending.
5. **Assignee Name Extraction:**
   - `assignee_names`: Unique assignee names from > 30 and 15–30 day tickets.
   - `assignee_search_names`: Same but with bracket suffixes stripped (e.g., `"John Doe (Oracle)"` → `"John Doe"`).
   - `teams_names`: Unique assignee names from > 30 day tickets only (for Teams @-mentions).

**Output (comprehensive):**

```typescript
{
  sr_gt_30_count: number;
  sr_15_30_count: number;
  sr_1_14_count: number;
  sr_ageing_1day_pct: number;
  sr_ageing_30day_pct: number;
  total_open: number;
  sr_gt_30_tickets: TicketObject[];
  sr_15_30_tickets: TicketObject[];
  assignee_names: string[];
  assignee_search_names: string[];
  teams_names: string[];
  teams_names_text: string;
  scannedRows: number;
}
```

---

### 8.4 `processINCAgeingBuckets.osts`

**Purpose:** Analyze Incident ageing data and compute **6 ageing buckets**.

**Input:**
- The INC Ageing Attachment Excel file.
- `openCount` parameter (from `processOpenINC`).

**Target Sheet:** `"3-Incident Ageing Raw Data"` (falls back to keyword search for `"incident"` + `"ageing"`).

**Key Columns:**
- `Assignee Group` / `Assigned Group` — filter column
- `Incident Ageing Days` — ageing value
- `Status` — to exclude inactive tickets

**Buckets (finer granularity than SR):**

| Bucket | Range |
|--------|-------|
| `inc_gt_90` | > 90 days |
| `inc_61_90` | 61–90 days |
| `inc_31_60` | 31–60 days |
| `inc_15_30` | 15–30 days |
| `inc_8_14` | 8–14 days |
| `inc_3_7` | 3–7 days |

**Percentage:**
- `inc_ageing_1day_pct` = (tickets aged ≥ 1 day) ÷ `openCount` × 100, **rounded UP** (`Math.ceil`)

**Output:**

```typescript
{
  inc_gt_90: number;
  inc_61_90: number;
  inc_31_60: number;
  inc_15_30: number;
  inc_8_14: number;
  inc_3_7: number;
  inc_ageing_1day_pct: number;
  total_open: number;
  scannedRows: number;
}
```

---

### 8.5 `prepareSRAgeingAttachment.osts`

**Purpose:** Transform the SR Ageing Excel file into a clean, formatted **email attachment**.

**Input:**
- The SR Ageing Attachment Excel file (already copied to the date folder).
- `updateAsOf` string (e.g., `"30 Jun"`).

**Operations Performed:**

1. **Filter the main "Work Order Ageing" sheet:** Keep only rows for `MYCAREERX SUPPORT`. Rewrite the sheet with only those rows + original headers.
2. **Filter all other sheets by Service Request ID:** For every other worksheet in the workbook, keep only rows whose `Service Request ID` exists in the surviving set from step 1.
3. **Build Cover Sheets:**
   - **Sheet 1:** Title = `"Total Service Request"`, Big number = total count (merged cells, teal styling `#00B1A9`).
   - **Sheet 2:** Title = `"Service Request Ageing > 30 Days"`, Big number = count of tickets > 30 days.
4. **Create "Update Details" worksheet:**
   - New sheet named `"Update Details"`.
   - Selects only relevant columns: `Service Request Ageing Days`, `Work Order ID`, `Work Order Summary`, `Customer Full Name`, `Work Order Status`, `Work Order Status Reason`, `Work Order Assignee`, plus any `"Status as of..."` columns.
   - First column header: `"Update as of 30 Jun"`.
   - Styled with teal header row.

**Output:**

```typescript
{ totalSr: number; srGt30: number }
```

---

### 8.6 `prepareINCAgeingAttachment.osts`

**Purpose:** Transform the INC Ageing Excel file into a clean, formatted **email attachment**.

**Input:**
- The INC Ageing Attachment Excel file.
- `updateAsOf` string.

**Operations Performed:**

1. **Find the incident ageing raw data sheet** (keyword search: `"incident"` + `"ageing"` + `"raw"`).
2. **Filter:** Keep only rows for `MYCAREERX SUPPORT` (checks both `"Assignee Group"` and `"Assigned Group"` column names).
3. **Rewrite** the sheet with filtered data.
4. **Filter all other sheets** by the same `Assignee Group`/`Assigned Group` filter.
5. **Build Cover Sheets:**
   - **Sheet 1:** `"Total Ageing Incident"` + count.
   - **Sheet 2:** `"Total Ageing Incident > 30 Days"` + count.

**Output:**

```typescript
{ totalInc: number; incGt30: number }
```

**Note:** Unlike the SR version, this script does **not** create an "Update Details" sheet.

---

## 9. Data Flow Diagram

```
SOURCE FILES (SharePoint)                   WORKING FILES (Date Folder)
═══════════════════════                     ═══════════════════════════
                                            
SR (Daily).xlsx  ──────copy──────►  SR Daily Working_{date}.xlsx
                                            │
                                            ▼
                                    processOpenSRWO ──► openCount: N
                                            │
INC (Daily).xlsx ──────copy──────►  INC Daily Working_{date}.xlsx
                                            │
                                            ▼
                                    processOpenINC ──► openCount: M
                                            │
SR Ageing.xlsx ────────copy──────►  SR & WO Ageing Preview_{date}.xlsx
                                            │
                                            ├──► processSRAgeingBuckets(openCount=N)
                                            │       ├── bucket counts & %
                                            │       ├── ticket detail arrays
                                            │       └── assignee name lists
                                            │
                                            └──► prepareSRAgeingAttachment(updateAsOf)
                                                    ├── filtered & formatted workbook
                                                    ├── cover sheets
                                                    └── "Update Details" sheet
                                            
INC Ageing.xlsx ───────copy──────►  INC Ageing Preview_{date}.xlsx
                                            │
                                            ├──► processINCAgeingBuckets(openCount=M)
                                            │       ├── bucket counts & %
                                            │       └── 6 ageing buckets
                                            │
                                            └──► prepareINCAgeingAttachment(updateAsOf)
                                                    ├── filtered workbook
                                                    └── cover sheets

                    ▼ ▼ ▼ ▼ ▼
          ┌──────────────────────────────┐
          │  history.json (updated)       │
          │  SharePoint List (upserted)   │
          │  HTML Email (composed & sent) │
          │  Teams Card (posted)          │
          └──────────────────────────────┘
```

---

## 10. Email Output Structure

The email is a full HTML document with this layout:

```
┌─────────────────────────────────────────────────────────────────┐
│ Dear team,                                                      │
│                                                                 │
│ Append herewith the SRs and Incidents aging status...           │
│ Please be informed that for ticket cancellation due to ageing,  │
│ please create a new ticket on behalf.                           │
│ Close tickets <30 days aging.                                   │
│                                                                 │
│ ─── Service Request ──────────────────────────────────────────  │
│ SR Ageing Percentage                                            │
│ Open tickets as of {date}: {N} WO tickets.                     │
│ Ageing SR >1 day: {X}%                                         │
│ Ageing SR >30 days: {Y}%                                       │
│                                                                 │
│ ┌──────────────────────────────────────────────────────┐       │
│ │ Trend Table (last 4 weeks)                           │       │
│ │ Date       | Week1  | Week2  | Week3  | Week4        │       │
│ │ Ageing >30 |   5    |   4    |   6    |   5          │       │
│ │ Ageing 15-30|  8    |   7    |   9    |   8          │       │
│ │ Ageing 1-14|  12    |  10    |  11    |  12          │       │
│ └──────────────────────────────────────────────────────┘       │
│                                                                 │
│ ┌──────────────────────────────────────────────────────┐       │
│ │ Ageing > 30 days (Detail Table)                      │       │
│ │ SR Ageing | WO No | Summary | User | Status | Reason│       │
│ │    45     | WO001 | Issue.. | ...  | Open   | ...   │       │
│ └──────────────────────────────────────────────────────┘       │
│                                                                 │
│ ┌──────────────────────────────────────────────────────┐       │
│ │ Ageing 15-30 days (Detail Table)                     │       │
│ │ Same columns as above                                │       │
│ └──────────────────────────────────────────────────────┘       │
│                                                                 │
│ ─── Incident ─────────────────────────────────────────────────  │
│ Open INC as of {date}: {M} INC tickets.                        │
│ Ageing INC >1 day: {Z}%                                       │
│                                                                 │
│ ┌──────────────────────────────────────────────────────┐       │
│ │ Trend Table (last 4 weeks)                           │       │
│ │ Date       | Week1  | Week2  | Week3  | Week4        │       │
│ │ Ageing >90 |   2    |   1    |   2    |   2          │       │
│ │ Ageing 61-90|  3    |   4    |   3    |   3          │       │
│ │ Ageing 31-60|  7    |   6    |   8    |   7          │       │
│ │ Ageing 15-30|  4    |   5    |   4    |   4          │       │
│ │ Ageing 8-14|   6    |   5    |   7    |   6          │       │
│ │ Ageing 3-7 |  10    |   9    |  11    |  10          │       │
│ └──────────────────────────────────────────────────────┘       │
│                                                                 │
│ Do let your leads know if you have any challenges.             │
└─────────────────────────────────────────────────────────────────┘

Attachments:
  📎 Service Request & Work Order Ageing Raw Data Preview_{date}.xlsx
  📎 Incident Ageing Raw Data Preview_{date}.xlsx
```

---

## 11. Teams Adaptive Card Structure

```json
{
  "type": "AdaptiveCard",
  "version": "1.4",
  "body": [
    {
      "type": "Container",
      "style": "emphasis",
      "items": [
        { "type": "TextBlock", "text": "Weekly Ageing Ticket Reminder", "weight": "bolder", "size": "large", "color": "accent" }
      ]
    },
    {
      "type": "Container",
      "items": [
        { "type": "TextBlock", "text": "Hi @PersonA @PersonB," },
        { "type": "TextBlock", "text": "Please kindly update the statuses of your **ageing tickets**..." },
        {
          "type": "ActionSet",
          "actions": [
            { "type": "Action.OpenUrl", "title": "📂 Update SR & WO Ageing Status", "url": "<SharePoint file link>", "style": "positive" }
          ]
        },
        { "type": "TextBlock", "text": "_This is an automated reminder from the HCSM Report Bot._", "isSubtle": true }
      ]
    }
  ],
  "msteams": {
    "entities": [
      { "type": "mention", "text": "<at>PersonA</at>", "mentioned": { "id": "user-guid", "name": "PersonA" } }
    ]
  }
}
```

---

## 12. SharePoint Locations & Data Sources

### Source Files (Read-Only)

| File | Path |
|------|------|
| SR Daily | `/Shared Documents/ERP Dashboard/HCSM Ticket Monitoring Dashboard/Ticketing Data/Service Request/Service Request (Daily) [MYCAREERX SUPPORT & SAP HR].xlsx` |
| INC Daily | `/Shared Documents/ERP Dashboard/HCSM Ticket Monitoring Dashboard/Ticketing Data/Incident/Incident Raw Data (Daily) [MYCAREERX SUPPORT & SAP HR].xlsx` |
| SR Ageing | `/Shared Documents/ERP Dashboard/HCSM Ticket Monitoring Dashboard/Ticketing Data/Ageing Service Request/Service Request Ageing Raw Data [Daily].xlsx` |
| INC Ageing | `/Shared Documents/ERP Dashboard/HCSM Ticket Monitoring Dashboard/Ticketing Data/Ageing Incident/Incident Ageing Raw Data (Daily).xlsx` |

### Working / Output Files

| File | Path |
|------|------|
| Weekly Report Folder | `/Shared Documents/Weekly Report/{dd MMMM yyyy}/` |
| History JSON | `/Shared Documents/ERP Dashboard/HCSM Ticket Monitoring Dashboard/Ticketing Data/Report Hub Config/MYCAREERX SUPPORT/history.json` |

### SharePoint List

| List | Purpose |
|------|---------|
| Monthly Snapshot List (ID: `87f3bcc9-...`) | Stores monthly ageing statistics for dashboard |

---

## 13. Support Files (apisMap.json, connectionsMap.json, manifest2.json)

### `apisMap.json`

Maps connector API names to their resource GUIDs in the package:

```json
{
  "shared_sharepointonline":      "5455acac-c164-47ff-986b-2486780fdbc3",
  "shared_excelonlinebusiness":   "5be63783-2ea6-46c3-868d-e5938029426a",
  "shared_teams":                 "74ad05b1-ded9-4ee2-9f63-9c94e52a424e",
  "shared_office365users":        "280da416-91bc-460b-8d74-6684a524f855",
  "shared_office365":             "69255db6-7dd1-4d0f-996d-f5a6b5942656"
}
```

### `connectionsMap.json`

Maps connector API names to their connection resource GUIDs:

```json
{
  "shared_sharepointonline":      "37feb7c4-0295-44df-a0de-9a9565a82639",
  "shared_excelonlinebusiness":   "85a37e8f-5d48-4a1c-9e27-6762251599df",
  "shared_teams":                 "3785f2d0-6af8-4a10-98be-d48bec599d69",
  "shared_office365users":        "0681ace9-0b62-421d-bbb7-aee80f5c3cd0",
  "shared_office365":             "f43806f1-dbd8-48a4-8068-3c49c38fd12c"
}
```

### `manifest2.json`

Minimal index pointing to the flow asset folder:

```json
{
  "packageSchemaVersion": "1.0",
  "flowAssets": {
    "assetPaths": ["af501bd2-054e-475e-8a7c-cebd0c347e0c"]
  }
}
```

---

## 14. Error Handling & Edge Cases

| Scenario | Handling |
|----------|----------|
| **Source file is empty (≤ 1 row)** | All Office Scripts return zero-count results gracefully |
| **Missing expected column** | Scripts throw specific errors (e.g., `"Missing column: Work Order Assignee Group"`) |
| **Column name variations** | Scripts check multiple names (e.g., `"Assignee Group"` OR `"Assigned Group"`) |
| **Sheet name not found** | Scripts fall back to keyword-based search (e.g., `"work order"` + `"ageing"`) |
| **Re-run on same day** | `Filter_RemoveExistingReportDate` removes the existing entry before adding the new one (idempotent) |
| **SharePoint monthly snapshot exists** | Uses conditional upsert (update if exists, create if not) |
| **User not found in O365** | `Search_User` returns empty → skipped (no @-mention, no email added) |
| **Failed to add user to Teams chat** | `Add_UserToGroupChat` configured to continue on `Succeeded`, `TimedOut`, `Skipped`, or `Failed` |
| **Test mode** | `IsTestMode = true` redirects Teams card to test chat and skips history update |
| **Blank rows in Excel** | Scripts detect and skip fully blank rows |
| **No ageing tickets** | Empty `sr_gt_30_tickets` / `sr_15_30_tickets` arrays → empty HTML tables in email |

---

## 15. How to Import / Deploy This Flow

1. **Export:** This project is already an exported Power Automate package (the root `manifest.json` + `Microsoft.Flow/` directory).

2. **Import into Power Automate:**
   - Go to [https://make.powerautomate.com](https://make.powerautomate.com)
   - Navigate to **My flows** → **Import** → **Import Package (Legacy)**
   - Upload a `.zip` of this project folder
   - Map each connection to an existing connection in your environment
   - Choose **Create as new** or **Update** for the flow resource

3. **Post-Import Setup:**
   - Verify all 5 connections are authenticated
   - Update the `EmailTo` and `EmailCc` variables if recipients change
   - Update SharePoint site URLs if deploying to a different tenant
   - Update Teams group chat IDs
   - Set `IsTestMode = true` for initial testing
   - Re-register the Office Scripts (the `.osts` files) in the target SharePoint site's Excel workbooks

4. **Office Scripts Deployment:**
   - Open any Excel file in SharePoint Online
   - Go to **Automate** → **Office Scripts**
   - Upload each `.osts` file or paste the script body
   - Note the new script IDs and update the flow definition's `scriptId` parameters

---

## 16. Summary of the Complete Execution Timeline

| Step | Action | Duration (est.) |
|------|--------|-----------------|
| 0 | **Trigger** fires at 7:00 AM Monday SGT | — |
| 1 | Initialize 23 variables | ~5 sec |
| 2 | Create date folder on SharePoint | ~3 sec |
| 3 | Copy SR Daily file (Get + Create) | ~10 sec |
| 4 | Copy INC Daily file (Get + Create) | ~10 sec |
| 5 | Copy SR Ageing file (Get + Create) | ~10 sec |
| 6 | Copy INC Ageing file (Get + Create) | ~10 sec |
| 7 | Run `processOpenSRWO` | ~15 sec |
| 8 | Run `processOpenINC` | ~15 sec |
| 9 | Run `processSRAgeingBuckets` | ~20 sec |
| 10 | Run `processINCAgeingBuckets` | ~20 sec |
| 11 | Run `prepareSRAgeingAttachment` | ~30 sec |
| 12 | Run `prepareINCAgeingAttachment` | ~30 sec |
| 13 | Upsert SR monthly snapshot | ~5 sec |
| 14 | Upsert INC monthly snapshot | ~5 sec |
| 15 | Read & parse history.json | ~5 sec |
| 16 | Build new history record, filter, union | ~2 sec |
| 17 | Build SR detail HTML rows (loop) | ~5–30 sec |
| 18 | Build trend HTML cells (loop, 4 iterations) | ~5 sec |
| 19 | Build email recipient list (loop + user search) | ~10–60 sec |
| 20 | Compose final HTML email | ~2 sec |
| 21 | Get attachment file contents | ~10 sec |
| 22 | **Send email** via Outlook | ~5 sec |
| 23 | Build Teams mentions (loop + user search + add to chat) | ~10–60 sec |
| 24 | Update history.json on SharePoint | ~3 sec |
| 25 | Compose & **post Teams card** | ~5 sec |
| **Total** | | **~3–6 minutes** |

---

> **This document covers every file, every action, every script, every variable, every connector, and every data transformation in the Weekly Report Power Automate automation project.**
