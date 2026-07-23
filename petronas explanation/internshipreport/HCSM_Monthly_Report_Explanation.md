# HCSM Monthly Report — Power BI Complete Documentation

> **File:** `HCSM Monthly Report.pbix`  
> **Classification:** For Internal Distribution Only (PETRONAS)  
> **Connection Type:** Power BI Service Live Connection (`pbiServiceLive`)  
> **Target Semantic Model ID:** `189d534b-fa21-4e2f-b0c9-01da1a5f4832`  
> **Target Workspace ID:** `81a248dd-b149-45b3-9af2-2f0206f1df7b`  
> **Power BI Desktop Version:** `2.99.621.0`  
> **Schema Version:** Fabric Report Definition v3.2.0  
> **Date Label Applied:** 2026-06-29  

---

## Table of Contents

1. [Dashboard Overview](#1-dashboard-overview)
2. [PBIX File Architecture](#2-pbix-file-architecture)
3. [Data Connection & Architecture](#3-data-connection--architecture)
4. [Data Model & Schema Structure](#4-data-model--schema-structure)
5. [Report-Level Dynamic Measures (DAX)](#5-report-level-dynamic-measures-dax)
6. [Design Strategy: PPT Slide Background Overlay](#6-design-strategy-ppt-slide-background-overlay)
7. [Report Pages Deep Dive (12 Pages)](#7-report-pages-deep-dive-12-pages)
   - [Page 0: Input (Landing Page)](#page-0-input-landing-page)
   - [Page 1: Slide 1 (Dashboard Cover Page)](#page-1-slide-1-dashboard-cover-page)
   - [Page 2: Slide 2 (Slicers & Filters Sync)](#page-2-slide-2-slicers--filters-sync)
   - [Page 3: Slide 3 (SR SLA & Volume Performance)](#page-3-slide-3-sr-sla--volume-performance)
   - [Page 4: Slide 4 (SR Ageing Trend & Summaries)](#page-4-slide-4-sr-ageing-trend--summaries)
   - [Page 5: Slide 5 (SR Issue Mapping Table)](#page-5-slide-5-sr-issue-mapping-table)
   - [Page 6: Slide 6 (SR Product Category Distribution)](#page-6-slide-6-sr-product-category-distribution)
   - [Page 7: Slide 7 (Incident SLA & Volume Performance)](#page-7-slide-7-incident-sla--volume-performance)
   - [Page 8: Slide 8 (Incident Ageing Trend & Summaries)](#page-8-slide-8-incident-ageing-trend--summaries)
   - [Page 9: Slide 9 (Incident Issue Mapping Table)](#page-9-slide-9-incident-issue-mapping-table)
   - [Page 10: Slide 10 (Incident Product Category Distribution)](#page-10-slide-10-incident-product-category-distribution)
   - [Page 11: Slide 11 (Concluding Slicers & Sync)](#page-11-slide-11-concluding-slicers--sync)
8. [Filters, Slicers & Sync Groups](#8-filters-slicers--sync-groups)
9. [Report Settings & Theme](#9-report-settings--theme)

---

## 1. Dashboard Overview

The **HCSM Monthly Report** is a specialized interactive dashboard created for PETRONAS's **Human Capital Solutions Management (HCSM)** division. The dashboard focuses on tracking support tickets (Service Requests and Incidents) across multiple key application systems, providing IT Service Management (ITSM) analysts and management with:

- **Service Request (SR) Metrics:** Volume trends, SLA performance against a 95% target, ageing analysis, issue mapping, and module-specific distribution.
- **Incident (INC) Metrics:** Volume trends, SLA performance for both response and resolution times, ageing analysis, root cause mapping, and categorization.
- **Dynamic Text Generation:** Automatic dynamic narrative generation explaining ticket volume changes and ageing ticket drops or increases relative to the previous month.

### Support Groups Covered
Filters applied throughout the report isolate data to core HCSM groups, including:
1. **ELEARNING SUPPORT**
2. **HOSPITALITY SYSTEM SUPPORT**
3. **MYCAMPUSX SUPPORT**
4. **MYCAREERX SUPPORT**
5. **SAP HR**

---

## 2. PBIX File Architecture

The `.pbix` file is structured as a ZIP package containing the report definition metadata. Since it connects live to a semantic model, it does not package binary database files (like `DataModel`):

```
HCSM Monthly Report.pbix (ZIP Extraction)
├── [Content_Types].xml         — XML Schema definition listing parts and content types
├── _rels/
│   └── .rels                   — Package relationship linkages
├── docProps/
│   └── custom.xml              — Properties including security and sensitivity tags
├── Connections                 — Core server/database connection string & cloud workspace pointers
├── DiagramLayout               — Unicode UTF-16 definition of table visual placement in model view
├── Metadata                    — PBIX layout metadata format identifier
├── Settings                    — System settings (Relationship Autodetection = False)
├── Version                     — Power BI version footprint
└── Report/
    ├── StaticResources/
    │   ├── RegisteredResources/
    │   │   ├── Slide1001517857674170886.JPG  — Slide 10 background asset
    │   │   ├── Slide117464114728740421.JPG   — Slide 11 background asset
    │   │   ├── Slide118439984935394726.JPG   — Slide 1 background asset
    │   │   ├── Slide27347212707158642.JPG    — Slide 2 background asset
    │   │   ├── Slide309091866095042911.JPG   — Slide 3 background asset
    │   │   ├── Slide41493027783074652.JPG    — Slide 4 background asset
    │   │   ├── Slide57415008510370026.JPG    — Slide 5 background asset
    │   │   ├── Slide62658744714536899.JPG    — Slide 6 background asset
    │   │   ├── Slide75487632867023069.JPG    — Slide 7 background asset
    │   │   ├── Slide804243223576637256.JPG   — Slide 8 background asset
    │   │   ├── Slide929698227231961627.JPG   — Slide 9 background asset
    │   │   └── Stacked_Master_WKWW_*.png     — PETRONAS logo asset
    │   └── SharedResources/
    │       └── BaseThemes/
    │           └── CY21SU11.json             — Base report styling color palette and defaults
    └── definition/
        ├── report.json         — Global report configs (slicers, filters, custom visuals, settings)
        ├── version.json        — Metadata schema version (v1.0.0)
        └── pages/
            ├── pages.json      — Page order array and current active page identifier
            └── [12 directories for report pages]/
                ├── page.json   — Configuration, layout size, background resource mapping
                └── visuals/
                    └── [visual GUID folders]/
                        └── visual.json — Visual type, bounds, formatting, query projection
```

---

## 3. Data Connection & Architecture

The report relies on a **Live Connection** to an existing dataset hosted in the Power BI Service cloud.

### Connection String Details (from `Connections`)
- **Server Address:** `pbiazure://api.powerbi.com`
- **Initial Catalog (Dataset ID):** `189d534b-fa21-4e2f-b0c9-01da1a5f4832`
- **Report ID:** `d1fba46e-8b68-439c-a0a0-6bb34d0e55b8`
- **Original Workspace ID:** `81a248dd-b149-45b3-9af2-2f0206f1df7b`
- **Connection Type:** `pbiServiceLive`
- **Security:** Authenticates via Integrated Azure Active Directory ClaimsToken.

---

## 4. Data Model & Schema Structure

The semantic model in the cloud workspace maps the tables shown in `DiagramLayout`:

```
              ┌─────────────────────────┐
              │      DateDimension      │
              │  ─────────────────────  │
              │  MonthYear (Key)        │
              │  MonthYear Sort         │
              │  Date                   │
              └────────────┬────────────┘
                           │ (1:N Filter)
                           ▼
 ┌──────────────────────────────────────────────────┐
 │             Service Request Raw Data             │
 │  ──────────────────────────────────────────────  │
 │  Service Request ID (Key)                        │
 │  Work Order ID, Submit Date, Closed Date         │
 │  Status, Measurement Status                      │
 │  Product Categorization Tier 3                   │
 │  ──── Referenced Measures ────                   │
 │  SR Total Tickets, SR Initiated, SR Closed,      │
 │  SR Pending, SR In Progress, SR Cancelled,       │
 │  SR Performance (SLA Met %), SR Ticket Count 4M, │
 │  SR Performance 4M                               │
 └────────────────────────┬─────────────────────────┘
                          │ (1:1 / 1:N Filter Link)
                          ▼
 ┌──────────────────────────────────────────────────┐
 │             MonthlyAgeingSnapshot                │
 │  ──────────────────────────────────────────────  │
 │  SortOrder, AgeingOver30, Total Ageing 3M        │
 │  ──── Dynamic DAX Measures ────                  │
 │  SR_TicketSummary, SR_AgeingSummary              │
 └──────────────────────────────────────────────────┘

 ┌──────────────────────────────────────────────────┐
 │                Incident Raw Data                 │
 │  ──────────────────────────────────────────────  │
 │  Incident ID (Key), Reported Date, Closed Date   │
 │  Status, Priority, Measurement Status            │
 │  Product Categorization Tier 3                   │
 │  ──── Referenced Measures ────                   │
 │  INC Total (Non Duplicated), INC Assigned,       │
 │  INC In Progress, INC Pending, INC Resolved,     │
 │  INC Closed, INC Cancelled, INC Total Tickets,   │
 │  INC Response Performance,                       │
 │  INC Resolution Performance, INC Ticket Count 3M │
 └────────────────────────┬─────────────────────────┘
                          │ (1:1 / 1:N Filter Link)
                          ▼
 ┌──────────────────────────────────────────────────┐
 │             MonthlyAgeingSnapshotINC             │
 │  ──────────────────────────────────────────────  │
 │  SortOrder, AgeingOver30, Total INC Ageing 3M    │
 │  ──── Dynamic DAX Measures ────                  │
 │  INC_TicketSummary, INC_AgeingSummary            │
 └──────────────────────────────────────────────────┘

 ┌──────────────────────────────────────────────────┐
 │                   IssueMapping                   │
 │  ──────────────────────────────────────────────  │
 │  Product Categorization Tier 3 (Module)          │
 │  Root Cause                                      │
 │  Action Plans                                    │
 └──────────────────────────────────────────────────┘

 ┌──────────────────────────────────────────────────┐
 │                 Date_Calendar_3M                 │
 │  ──────────────────────────────────────────────  │
 │  MonthYear, Selected Date Range 2                │
 └──────────────────────────────────────────────────┘

 ┌──────────────────────────────────────────────────┐
 │               Dashboard Update Log               │
 │  ──────────────────────────────────────────────  │
 │  SelectedMonth (Dynamic DAX Measure)             │
 └──────────────────────────────────────────────────┘
```

### Table Details
- **DateDimension:** Maps standard calendar entries, facilitating time intelligence and slicing by months.
- **GroupDimension:** Maps PETRONAS support groups (e.g. SAP HR, MYCAREERX SUPPORT), filtering tickets by ownership.
- **Service Request Raw Data:** Contains individual Service Request entries, work order ids, statuses, assignee names, and timestamps.
- **Incident Raw Data:** Contains incident details, priority classification (S1-S4/VIP), reported dates, and SLA compliance flags.
- **MonthlyAgeingSnapshot & MonthlyAgeingSnapshotINC:** Snapshot tables storing ageing ticket metrics grouped by month sort orders.
- **IssueMapping:** Contains root-cause write-ups and action plans matched to product tiers.
- **Dashboard Update Log:** Stores semantic model refresh date logs.

---

## 5. Report-Level Dynamic Measures (DAX)

Five measures are defined inside the report layout file (`reportExtensions.json`) to control headings and produce text descriptions based on selected dates:

### 1. `SelectedMonth` (Table: `Dashboard Update Log`)
Decodes the short month-year filter string (e.g. "Jan 2026") into a readable full month format (e.g. "January 2026").
```dax
VAR RawVal = SELECTEDVALUE(DateDimension[MonthYear], "Select Month")
VAR MonthAbbr = LEFT(RawVal, 3)
VAR YearPart = RIGHT(RawVal, 4)
VAR FullMonth = 
    SWITCH(MonthAbbr,
        "Jan", "January",
        "Feb", "February",
        "Mar", "March",
        "Apr", "April",
        "May", "May",
        "Jun", "June",
        "Jul", "July",
        "Aug", "August",
        "Sep", "September",
        "Oct", "October",
        "Nov", "November",
        "Dec", "December",
        MonthAbbr
    )
RETURN FullMonth & " " & YearPart
```

### 2. `SR_TicketSummary` (Table: `MonthlyAgeingSnapshot`)
Constructs a narrative summary comparing the current month's Service Request total logged volume to the previous month, expressing the direction of change and percentage shift.
```dax
VAR CurrentMonth = SELECTEDVALUE('DateDimension'[MonthYear])
VAR CurrentSort = SELECTEDVALUE('DateDimension'[MonthYear Sort])
VAR PrevSort = CurrentSort - 1
VAR PrevMonth = LOOKUPVALUE('DateDimension'[MonthYear], 'DateDimension'[MonthYear Sort], PrevSort)
VAR CurrentVal = [SR Total Tickets]
VAR PrevVal = CALCULATE([SR Total Tickets], REMOVEFILTERS('DateDimension'), 'DateDimension'[MonthYear Sort] = PrevSort)
VAR Diff = CurrentVal - PrevVal
VAR AbsDiff = ABS(Diff)
VAR Direction = IF(Diff > 0, "increased", IF(Diff < 0, "decreased", "remained unchanged"))
VAR PctChange = IF(PrevVal > 0, ROUND(DIVIDE(AbsDiff, PrevVal) * 100, 0), 0)
RETURN
IF(
    ISBLANK(PrevMonth) || PrevVal = 0,
    "• Total tickets logged is " & FORMAT(CurrentVal, "#,0") & " in " & CurrentMonth,
    IF(
        Diff = 0,
        "• Ticket volume remained steady at " & FORMAT(CurrentVal, "#,0") & " in " & CurrentMonth,
        "• Tickets logged " & Direction & " by " & FORMAT(AbsDiff, "#,0") & 
        IF(PctChange > 0 && PrevVal > 20, " (" & PctChange & "%)", "") &
        " in " & CurrentMonth & 
        ", from " & FORMAT(PrevVal, "#,0") & " to " & FORMAT(CurrentVal, "#,0")
    )
)
```

### 3. `SR_AgeingSummary` (Table: `MonthlyAgeingSnapshot`)
Compares the count of ageing SR tickets (>30 days) to the previous month's count, highlighting changes or backlog maintenance.
```dax
VAR CurrentMonth = SELECTEDVALUE('DateDimension'[MonthYear])
VAR CurrentSort = SELECTEDVALUE('DateDimension'[MonthYear Sort])
VAR PrevSort = CurrentSort - 1
VAR PrevMonth = LOOKUPVALUE('DateDimension'[MonthYear], 'DateDimension'[MonthYear Sort], PrevSort)
VAR CurrentValRaw = CALCULATE(SUM(MonthlyAgeingSnapshot[AgeingOver30]), MonthlyAgeingSnapshot[SortOrder] = CurrentSort)
VAR PrevValRaw = CALCULATE(SUM(MonthlyAgeingSnapshot[AgeingOver30]), MonthlyAgeingSnapshot[SortOrder] = PrevSort)
VAR CurrentVal = IF(ISBLANK(CurrentValRaw), 0, CurrentValRaw)
VAR PrevVal = IF(ISBLANK(PrevValRaw), 0, PrevValRaw)
VAR Diff = CurrentVal - PrevVal
VAR AbsDiff = ABS(Diff)
VAR Direction = IF(Diff > 0, "increased", IF(Diff < 0, "decreased", "remained unchanged"))
RETURN
IF(
    ISBLANK(PrevMonth),
    "• Ageing tickets (>30 days) is " & FORMAT(CurrentVal, "#,0") & " in " & CurrentMonth,
    IF(
        CurrentVal = 0 && PrevVal > 0,
        "• All ageing tickets resolved - count dropped from " & FORMAT(PrevVal, "#,0") & " to 0 in " & CurrentMonth,
        IF(
            Diff = 0,
            IF(
                CurrentVal = 0 && PrevVal = 0,
                "• No ageing tickets recorded in " & CurrentMonth & ", maintaining zero backlog",
                "• Ageing ticket count remained at " & FORMAT(CurrentVal, "#,0") & " in " & CurrentMonth
            ),
            "• Number of ageing tickets >30 days " & Direction & " by " & FORMAT(AbsDiff, "#,0") & " in " & CurrentMonth &
            ", from " & FORMAT(PrevVal, "#,0") & " to " & FORMAT(CurrentVal, "#,0")
        )
    )
)
```

### 4. `INC_TicketSummary` (Table: `MonthlyAgeingSnapshotINC`)
Constructs the comparison narrative for Incident tickets between the current month and the previous month.
```dax
VAR CurrentMonth = SELECTEDVALUE('DateDimension'[MonthYear])
VAR CurrentSort = SELECTEDVALUE('DateDimension'[MonthYear Sort])
VAR PrevSort = CurrentSort - 1
VAR PrevMonth = LOOKUPVALUE('DateDimension'[MonthYear], 'DateDimension'[MonthYear Sort], PrevSort)
VAR CurrentVal = [INC Total (Non Duplicated)]
VAR PrevVal = CALCULATE([INC Total (Non Duplicated)], REMOVEFILTERS('DateDimension'), 'DateDimension'[MonthYear Sort] = PrevSort)
VAR Diff = CurrentVal - PrevVal
VAR AbsDiff = ABS(Diff)
VAR Direction = IF(Diff > 0, "increased", IF(Diff < 0, "decreased", "remained unchanged"))
VAR PctChange = IF(PrevVal > 0, ROUND(DIVIDE(AbsDiff, PrevVal) * 100, 0), 0)
RETURN
IF(
    ISBLANK(PrevMonth) || PrevVal = 0,
    "• Total tickets logged is " & FORMAT(CurrentVal, "#,0") & " in " & CurrentMonth,
    IF(
        Diff = 0,
        "• Ticket volume remained steady at " & FORMAT(CurrentVal, "#,0") & " in " & CurrentMonth,
        "• Tickets logged " & Direction & " by " & FORMAT(AbsDiff, "#,0") & 
        IF(PctChange > 0 && PrevVal > 20, " (" & PctChange & "%)", "") &
        " in " & CurrentMonth & 
        ", from " & FORMAT(PrevVal, "#,0") & " to " & FORMAT(CurrentVal, "#,0")
    )
)
```

### 5. `INC_AgeingSummary` (Table: `MonthlyAgeingSnapshotINC`)
Generates the comparison narrative for ageing incidents (>30 days) versus the prior month.
```dax
VAR CurrentMonth = SELECTEDVALUE('DateDimension'[MonthYear])
VAR CurrentSort = FORMAT(SELECTEDVALUE('DateDimension'[MonthYear Sort]), "0")
VAR PrevSort = FORMAT(SELECTEDVALUE('DateDimension'[MonthYear Sort]) - 1, "0")
VAR PrevMonth = LOOKUPVALUE('DateDimension'[MonthYear], 'DateDimension'[MonthYear Sort], SELECTEDVALUE('DateDimension'[MonthYear Sort]) - 1)
VAR CurrentValRaw = CALCULATE(SUM(MonthlyAgeingSnapshotINC[AgeingOver30]), MonthlyAgeingSnapshotINC[SortOrder] = CurrentSort)
VAR PrevValRaw = CALCULATE(SUM(MonthlyAgeingSnapshotINC[AgeingOver30]), MonthlyAgeingSnapshotINC[SortOrder] = PrevSort)
VAR CurrentVal = IF(ISBLANK(CurrentValRaw), 0, CurrentValRaw)
VAR PrevVal = IF(ISBLANK(PrevValRaw), 0, PrevValRaw)
VAR Diff = CurrentVal - PrevVal
VAR AbsDiff = ABS(Diff)
VAR Direction = IF(Diff > 0, "increased", IF(Diff < 0, "decreased", "remained unchanged"))
RETURN
IF(
    ISBLANK(PrevMonth),
    "• Ageing tickets (>30 days) is " & FORMAT(CurrentVal, "#,0") & " in " & CurrentMonth,
    IF(
        CurrentVal = 0 && PrevVal > 0,
        "• All ageing tickets resolved, count dropped from " & FORMAT(PrevVal, "#,0") & " to 0 in " & CurrentMonth,
        IF(
            Diff = 0,
            IF(
                CurrentVal = 0 && PrevVal = 0,
                "• No ageing tickets recorded in " & CurrentMonth & ", maintaining zero backlog",
                "• Ageing ticket count remained at " & FORMAT(CurrentVal, "#,0") & " in " & CurrentMonth
            ),
            "• Number of ageing tickets >30 days " & Direction & " by " & FORMAT(AbsDiff, "#,0") & " in " & CurrentMonth &
            ", from " & FORMAT(PrevVal, "#,0") & " to " & FORMAT(CurrentVal, "#,0")
        )
    )
)
```

---

## 6. Design Strategy: PPT Slide Background Overlay

A key design choice in this dashboard is the use of slide background images. Rather than building static grids, shapes, and titles inside Power BI, the dashboard developers:
1. Created a consistent slide deck layout in Microsoft PowerPoint/Slide Editor with PETRONAS brand frames, titles, headers, boxes, tables outline, and grids.
2. Exported these layouts as high-resolution images: `Slide1.JPG` through `Slide11.JPG`.
3. Set these images as 0% transparency backgrounds on pages 2 through 12.
4. Placed active Power BI visual overlays (Card metrics, line charts, column charts, data tables, and slicers) directly inside the boundaries of the slide background boxes.

This strategy results in a highly customized presentation design that looks like a static slide deck but functions as a live data report.

---

## 7. Report Pages Deep Dive (12 Pages)

The report has **12 pages** in total (page index 1 is "Input", page indices 2-12 are labeled "1" through "11").

| Page # | Page Name | Dimensions | Background Image Resource | Primary Purpose |
|---|---|---|---|---|
| 0 | `Input` | 552 × 350 | *None* | Initial filter landing page |
| 1 | `1` | 1280 × 720 | `Slide118439984935394726.JPG` (`Slide1.JPG`) | Cover Page with Selected Month |
| 2 | `2` | 1280 × 720 | `Slide27347212707158642.JPG` (`Slide2.JPG`) | Hidden filter synchronization page |
| 3 | `3` | 1280 × 720 | `Slide309091866095042911.JPG` (`Slide3.JPG`) | SR SLA Performance & Trends |
| 4 | `4` | 1280 × 720 | `Slide41493027783074652.JPG` (`Slide4.JPG`) | SR Ageing Charts & Summaries |
| 5 | `5` | 1280 × 720 | `Slide57415008510370026.JPG` (`Slide5.JPG`) | SR Issue Mapping Detail Table |
| 6 | `6` | 1280 × 720 | `Slide62658744714536899.JPG` (`Slide6.JPG`) | SR Module Pie Chart & Pivot Table |
| 7 | `7` | 1280 × 720 | `Slide75487632867023069.JPG` (`Slide7.JPG`) | INC SLA Performance & Trends |
| 8 | `8` | 1280 × 720 | `Slide804243223576637256.JPG` (`Slide8.JPG`) | INC Ageing Charts & Summaries |
| 9 | `9` | 1280 × 720 | `Slide929698227231961627.JPG` (`Slide9.JPG`) | INC Issue Mapping Detail Table |
| 10 | `10` | 1280 × 720 | `Slide1001517857674170886.JPG` (`Slide10.JPG`) | INC Module Pie Chart & Pivot Table |
| 11 | `11` | 1280 × 720 | `Slide117464114728740421.JPG` (`Slide11.JPG`) | Concluding Sync Page |

---

### Page 0: Input (Landing Page)
- **Visible Visuals:**
  - **Slicers:** Slicer for Group (`GroupDimension.Group`) and Slicer for MonthYear (`DateDimension.MonthYear`) as a Dropdown.
  - **KPI Card:** Visual showing `Dashboard Update Log.SelectedMonth` to confirm refresh time.
  - **Text Title:** Centered textbox "MONTHLY REPORT" (Arial, 18pt Bold, white text).
  - **Graphic Shape:** Large rounded rectangle background panel (`rectangleRounded`, curve 3L, transparency 70%, filled with PETRONAS Teal).

### Page 1: Slide 1 (Dashboard Cover Page)
- **Visible Visuals:**
  - **Title Textbox:** "ERP HCM Support Dashboard" (Arial, 36pt Bold, white text).
  - **Month Card:** `Dashboard Update Log.SelectedMonth` displaying the active target month in Arial, 24pt Bold.
  - **Slicers (Hidden/Sync):** Group (`GroupDimension.Group`) and MonthYear (`DateDimension.MonthYear`).
  - **Background Frame:** `Slide1.JPG` contains the PETRONAS corporate title slide layout.

### Page 2: Slide 2 (Slicers & Filters Sync)
- **Visible Visuals:**
  - This page contains no visible interactive cards or tables. It uses hidden slicers (`GroupDimension.Group` and `DateDimension.MonthYear`) syncing selection parameters to other target pages.
  - **Background Frame:** `Slide2.JPG`.

### Page 3: Slide 3 (SR SLA & Volume Performance)
- **Purpose:** Monitor SLA Achievement Rates and volume classifications for Service Requests.
- **Background Frame:** `Slide3.JPG` (provides visual borders, labels, and title titles like "Service Request Performance", "SLA Performance", "95% SLA Target", "Ticketing Trend by Submit Date").
- **Key Metrics (Overlaid Cards):**
  - **SR Total Tickets:** `Service Request Raw Data.SR Total Tickets`
  - **SR Initiated:** `Service Request Raw Data.SR Initiated`
  - **SR In Progress:** `Service Request Raw Data.SR In Progress`
  - **SR Pending:** `Service Request Raw Data.SR Pending`
  - **SR Closed:** `Service Request Raw Data.SR Closed`
  - **SR Cancelled:** `Service Request Raw Data.SR Cancelled`
  - **SLA Performance:** `Service Request Raw Data.SR Performance` (Large percentage indicator showing target met percentage).
  - **Selected Date Range 2:** `Date_Calendar_3M.Selected Date Range 2` (displays the selection window).
- **Line Chart (Overlaid):**
  - Displays the volume trend and performance over months.
  - **Category (X-Axis):** `Date_Calendar_3M.MonthYear`
  - **Y-Axis 1 (Line):** `Service Request Raw Data.SR Ticket Count 4M` (Representing count trends)
  - **Y-Axis 2 (Line):** `Service Request Raw Data.SR Performance 4M` (Representing SLA trends)
- **Slicers:** Slicers for Group (`GroupDimension.Group`) and Month (`DateDimension.MonthYear`).

### Page 4: Slide 4 (SR Ageing Trend & Summaries)
- **Purpose:** Analyze pending Service Requests open for more than 30 days.
- **Background Frame:** `Slide4.JPG` (provides background container graphics and labels).
- **Dynamic Text Cards (cardVisual):**
  - **SR Ticket Summary:** Displays the dynamic measure `MonthlyAgeingSnapshot.SR_TicketSummary` (e.g. "• Tickets logged increased by 14 in June 2026, from 80 to 94").
  - **SR Ageing Summary:** Displays `MonthlyAgeingSnapshot.SR_AgeingSummary` showing prior month comparisons for tickets open >30 days.
- **Column Chart (Overlaid):**
  - **Category (X-Axis):** `Date_Calendar_3M.MonthYear`
  - **Y-Axis (Columns):** `MonthlyAgeingSnapshot.Total Ageing 3M` (Total Ageing Service Requests)
- **Slicers:** Slicers for Group and MonthYear.

### Page 5: Slide 5 (SR Issue Mapping Table)
- **Purpose:** Cross-reference Service Request volume with root cause descriptions and action items.
- **Background Frame:** `Slide5.JPG`.
- **Selected Month:** Card visual displaying `Dashboard Update Log.SelectedMonth`.
- **Table Visual (tableEx):**
  - Displays categorizations, causes, and action steps.
  - **Columns:**
    1. **Module:** `IssueMapping.Product Categorization Tier 3`
    2. **Root Cause:** `IssueMapping.Root Cause`
    3. **Action Plans:** `IssueMapping.Action Plans`
    4. **Total Tickets:** `Service Request Raw Data.Total Tickets`
  - **Sorting:** Sorted descending by `Total Tickets` count to highlight frequent issues first.
- **Slicers:** Group and MonthYear.

### Page 6: Slide 6 (SR Product Category Distribution)
- **Purpose:** Break down SR tickets by application modules.
- **Background Frame:** `Slide6.JPG`.
- **Pie Chart (Overlaid):**
  - **Legend (Category):** `Service Request Raw Data.Product Categorization Tier 3` (e.g. modules under HR/E-Learning)
  - **Values (Y-Axis):** Count of `Service Request Raw Data.Service Request ID`
- **Pivot Table / Matrix (Overlaid):**
  - Lists module breakdown in a tabular format.
  - **Rows:** `Service Request Raw Data.Product Categorization Tier 3`
  - **Values:** `Service Request Raw Data.Total Tickets` (Total count)
- **Slicers:** Group and MonthYear.

### Page 7: Slide 7 (Incident SLA & Volume Performance)
- **Purpose:** Track incident volumes and SLA targets for both Response and Resolution times.
- **Background Frame:** `Slide7.JPG` (contains labels for target response times, resolution times, and titles).
- **Key Metrics (Overlaid Cards):**
  - **INC Total:** `Incident Raw Data.INC Total (Non Duplicated)`
  - **INC Assigned:** `Incident Raw Data.INC Assigned`
  - **INC In Progress:** `Incident Raw Data.INC In Progress`
  - **INC Pending:** `Incident Raw Data.INC Pending`
  - **INC Resolved:** `Incident Raw Data.INC Resolved`
  - **INC Closed:** `Incident Raw Data.INC Closed`
  - **INC Cancelled:** `Incident Raw Data.INC Cancelled`
  - **Incident Response Performance:** `Incident Raw Data.INC Response Performance`
  - **Incident Resolution Performance:** `Incident Raw Data.INC Resolution Performance`
  - **Selected Date Range 2:** `Date_Calendar_3M.Selected Date Range 2`
- **Line Chart (Overlaid):**
  - **Category (X-Axis):** `Date_Calendar_3M.MonthYear`
  - **Y-Axis (Line):** `Incident Raw Data.INC Ticket Count 3M` (Historical monthly incident counts)
- **Slicers:** Group and MonthYear.

### Page 8: Slide 8 (Incident Ageing Trend & Summaries)
- **Purpose:** Track pending Incident tickets open longer than 30 days.
- **Background Frame:** `Slide8.JPG`.
- **Dynamic Text Cards (cardVisual):**
  - **INC Ticket Summary:** Displays the dynamic measure `MonthlyAgeingSnapshotINC.INC_TicketSummary` comparing current month incident volume to previous months.
  - **INC Ageing Summary:** Displays `MonthlyAgeingSnapshotINC.INC_AgeingSummary` explaining the backlog trend of incidents over 30 days old.
- **Column Chart (Overlaid):**
  - **Category (X-Axis):** `Date_Calendar_3M.MonthYear`
  - **Y-Axis (Columns):** `MonthlyAgeingSnapshotINC.Total INC Ageing 3M` (Total Ageing Incidents)
- **Slicers:** Group and MonthYear.

### Page 9: Slide 9 (Incident Issue Mapping Table)
- **Purpose:** Connect Incident tickets to Root Causes and Action Plans.
- **Background Frame:** `Slide9.JPG`.
- **Selected Month:** Card visual displaying `Dashboard Update Log.SelectedMonth`.
- **Table Visual (tableEx):**
  - Displays categorizations, causes, and action steps.
  - **Columns:**
    1. **Module:** `IssueMapping.Product Categorization Tier 3`
    2. **Root Cause:** `IssueMapping.Root Cause`
    3. **Action Plans:** `IssueMapping.Action Plans`
    4. **Total Tickets:** `Incident Raw Data.INC Total Tickets`
  - **Sorting:** Sorted descending by `INC Total Tickets`.
- **Slicers:** Group and MonthYear.

### Page 10: Slide 10 (Incident Product Category Distribution)
- **Purpose:** Analyze Incident distribution by product classification.
- **Background Frame:** `Slide10.JPG`.
- **Pie Chart (Overlaid):**
  - **Legend (Category):** `Incident Raw Data.Product Categorization Tier 3`
  - **Values (Y-Axis):** `Incident Raw Data.INC Total (Non Duplicated)`
  - **Tooltip:** `Incident Raw Data.Total INC (%)`
- **Pivot Table / Matrix (Overlaid):**
  - **Rows:** `Incident Raw Data.Product Categorization Tier 3`
  - **Values:** `Incident Raw Data.Total Tickets`
- **Slicers:** Group and MonthYear.

### Page 11: Slide 11 (Concluding Slicers & Sync)
- **Purpose:** A hidden concluding slide used to synchronize slicers at the end of the presentation report.
- **Background Frame:** `Slide11.JPG`.
- **Slicers (Hidden/Sync):** Group and MonthYear.

---

## 8. Filters, Slicers & Sync Groups

Slicers across the dashboard pages are grouped together using Power BI's **Sync Slicers** engine. This ensures that when a user selects a month or group on one page, the choice is propagated to all other pages automatically.

### Sync Group Configurations
1. **`Group1` Sync Group:**
   - Synced columns: `GroupDimension.Group`
   - Active on all visible pages (Input, Cover, SR, and Incident slides).
   - Bi-directional synchronization is enabled.
2. **`MonthYear` Sync Group:**
   - Synced columns: `DateDimension.MonthYear`
   - Governs month selection throughout the dashboard, keeping all charts aligned to the same monthly reporting timeframe.

---

## 9. Report Settings & Theme

### Settings
- **Relationship Autodetection:** Disabled (`IsRelationshipAutodetectionEnabled = false`) to enforce explicit developer-defined schemas.
- **Data Exporting:** Restrained to allow summarized data export (`exportDataMode = AllowSummarized`).
- **Tooltips:** Enhanced visual tooltips enabled (`useEnhancedTooltips = true`).

### Theme Definition (`BaseThemes/CY21SU11.json`)
The report incorporates PETRONAS brand colors:
- **Primary Teal:** `#00B1A9` (Used for SLA Met states, accents, and headers)
- **Teal (Alt):** `#00A19C` (Used in tables and pivots)
- **Light Aqua Accent:** `#14E5DC` (Used for ageing column charts)
- **Alert/Missed Red:** `#D64550` (Used for SLA Missed states)
- **Warning Yellow:** `#FDB924`
- **Neutral Dark Backgrounds:** `#B3B3B3` / `#ffffff`
- **Primary Font Family:** Arial
