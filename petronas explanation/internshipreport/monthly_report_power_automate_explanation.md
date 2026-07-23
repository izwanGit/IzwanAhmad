# 📊 Power BI & Power Automate Integrated Monthly Report Automation

This document provides a comprehensive technical breakdown of the fully automated Monthly Reporting pipeline within the **PETRONAS HCSM Operations Hub**. This cloud-native system automates the generation, formatting, and distribution of the monthly management PowerPoint deck directly from the HCSM Power BI dashboard using Microsoft Power Automate, eliminating the manual PDF-scraping and PPTX-rebuilding Python pipeline.

---

## 1. Overview of the Automated Architecture

Instead of exporting Power BI pages as a PDF, scraping images and text using Python (`PyMuPDF`), and rebuilding a PowerPoint slide deck (`python-pptx`), this modern architecture leverages native Microsoft Power Platform integrations:

```
┌─────────────────────────────────────────────────────────────┐
│                       POWER BI CLOUD                        │
│  - Presentation-designed canvas pages (16:9 aspect ratio)   │
│  - DAX-based dynamic text generation (Executive Summaries)   │
│  - Auto-filtering for the previous month (Time Intelligence) │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼ [Triggered on 1st of Month]
┌─────────────────────────────────────────────────────────────┐
│                    POWER AUTOMATE FLOW                      │
│  1. Trigger: Monthly Recurrence                             │
│  2. Export To File for Power BI Reports (Format: PPTX)      │
│  3. Stage & Save .pptx file in SharePoint Archive Folder    │
│  4. Distribute via Outlook to HCSM Management & Leads        │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Power BI Presentation-Ready Dashboard Design

To bypass the need for image cropping and coordinate-based PPTX positioning, the Power BI report (`HCSM Monthly Report Source`) was redesigned from the ground up as a presentation template:

### 2.1 Canvas Geometry
* **Widescreen 16:9**: The page size is configured to exactly **Widescreen 16:9** format (33.87 cm × 19.05 cm / 1280 × 720 pixels). This matches PowerPoint's native slide layout, preventing stretching or black borders on export.
* **Hidden Chrome**: Slicers, navigation panes, and report tabs are hidden or stripped from these pages. The output pages are flat, high-fidelity slides.

### 2.2 PETRONAS Corporate Styling
The visuals conform strictly to the PETRONAS design guidelines:
* **Primary Teal** (`#00B1A9`): Used for SLA gauge fills, card titles, and primary metrics.
* **Secondary Dark Accent** (`#003B5C`): Deep Blue/Navy used for slide headers and table headers.
* **Clean Card Layouts**: Visuals are enclosed in rounded-corner card containers with subtle drop shadows, matching the slide styling of the corporate PowerPoint template.

---

## 3. DAX-Based Dynamic Text Generation (Executive Summaries)

The manual effort of writing bullet points for ticket trends (such as changes in ticket volume and ageing counts) is eliminated by writing **DAX Measures** that format business logic into natural-language sentences.

### 3.1 Volume Trend DAX Measure
This measure compares ticket volumes between the reporting month and the preceding month:

```dax
SR_Volume_Summary_Bullet = 
VAR CurrentMonthVal = 
    CALCULATE(
        [Total Tickets],
        FILTER(
            ALL('Calendar'),
            'Calendar'[YearMonth] = FORMAT(EOMONTH(TODAY(), -1), "YYYYMM")
        )
    )
VAR PrevMonthVal = 
    CALCULATE(
        [Total Tickets],
        FILTER(
            ALL('Calendar'),
            'Calendar'[YearMonth] = FORMAT(EOMONTH(TODAY(), -2), "YYYYMM")
        )
    )
VAR Diff = CurrentMonthVal - PrevMonthVal
VAR PctChange = DIVIDE(ABS(Diff), PrevMonthVal, 0) * 100
VAR Direction = IF(Diff > 0, "increased", "decreased")
VAR ReportingMonthName = FORMAT(EOMONTH(TODAY(), -1), "MMMM YYYY")
RETURN
    IF(
        Diff = 0,
        "• Ticket volume remained unchanged in " & ReportingMonthName & " at " & CurrentMonthVal & " tickets.",
        "• Ticket volume " & Direction & " by " & ABS(Diff) & " (" & FORMAT(PctChange, "0.0") & "%) in " & ReportingMonthName & ", from " & PrevMonthVal & " to " & CurrentMonthVal & " tickets."
    )
```

### 3.2 Ageing Trend DAX Measure
This measure handles ageing ticket summaries, incorporating specific logic for zero backlogs and extreme percentage changes:

```dax
SR_Ageing_Summary_Bullet = 
VAR CurrentAgeingVal = 
    CALCULATE(
        [Ageing Tickets Over 30 Days],
        FILTER(
            ALL('Calendar'),
            'Calendar'[YearMonth] = FORMAT(EOMONTH(TODAY(), -1), "YYYYMM")
        )
    )
VAR PrevAgeingVal = 
    CALCULATE(
        [Ageing Tickets Over 30 Days],
        FILTER(
            ALL('Calendar'),
            'Calendar'[YearMonth] = FORMAT(EOMONTH(TODAY(), -2), "YYYYMM")
        )
    )
VAR Diff = CurrentAgeingVal - PrevAgeingVal
VAR PctChange = DIVIDE(ABS(Diff), PrevAgeingVal, 0) * 100
VAR ReportingMonthName = FORMAT(EOMONTH(TODAY(), -1), "MMMM YYYY")
RETURN
    SWITCH(
        TRUE(),
        CurrentAgeingVal = 0 && PrevAgeingVal > 0,
            "• All ageing tickets resolved: backlog successfully reduced from " & PrevAgeingVal & " to 0.",
        CurrentAgeingVal = 0 && PrevAgeingVal = 0,
            "• Backlog maintained at 0 ageing tickets, showing excellent SLA control.",
        Diff > 0,
            "• Ageing backlog increased by " & Diff & " tickets (" & FORMAT(PctChange, "0.0") & "%) in " & ReportingMonthName & ", rising to " & CurrentAgeingVal & " open tickets.",
        Diff < 0,
            "• Ageing backlog decreased by " & ABS(Diff) & " tickets (" & FORMAT(PctChange, "0.0") & "%) in " & ReportingMonthName & ", dropping to " & CurrentAgeingVal & " open tickets."
    )
```

These measures are placed directly inside **Card (new)** or **Text box** visuals on the report pages. When Power BI is exported, these dynamic sentences appear fully rendered on the slide.

---

## 4. DAX-Based Time Intelligence & Date Rollover

To ensure zero human maintenance, dates are filtered dynamically based on the current system date:

### 4.1 Automated Monthly Filter
The report includes a page-level or report-level filter that uses the following DAX calculated column in the date table to dynamically identify the previous month:

```dax
IsPreviousMonth = 
IF(
    'Calendar'[YearMonth] = FORMAT(EOMONTH(TODAY(), -1), "YYYYMM"),
    1,
    0
)
```
This flag is set to `1` in the report filter panel. As a result:
* When the flow runs in June, it automatically displays May data.
* When it rolls over to July, it automatically switches to June data.

### 4.2 Dynamic Title Formatting
Report page headers dynamically update to display the correct reporting period:
```dax
Report_Header_Title = 
"HCSM Service Request Performance Dashboard — " & UPPER(FORMAT(EOMONTH(TODAY(), -1), "MMMM YYYY"))
```
This measure is bound to the title text property of the header shape, eliminating the need to search and replace text blocks during post-processing.

---

## 5. Power Automate Workflow Architecture

The Power Automate cloud flow (`HCSM Monthly Report - Auto Export`) acts as the scheduling and execution engine.

### 5.1 Step 1: Recurrence Trigger
The flow is scheduled to run on the **1st of every month at 8:00 AM SGT (Singapore Standard Time)**.
```
Interval: 1
Frequency: Month
Start Time: 2026-07-01T08:00:00Z
```

### 5.2 Step 2: Export To File for Power BI Reports (Asynchronous)
The flow calls the Power BI REST API through the native Power BI connector action `Export To File for Power BI Reports`:
* **Workspace**: `PETRONAS HCSM BAU Operations`
* **Report**: `HCSM Monthly Report Source`
* **Export Format**: `PowerPoint Presentation (.pptx)`

> [!NOTE]
> Since exporting a high-fidelity PowerPoint report can take up to 2–5 minutes, this connector executes asynchronously. Power Automate automatically polls the Power BI export status API until the file bytes are ready.

### 5.3 Step 3: Archive to SharePoint
Once the file bytes are returned, the flow creates a file in the HCSM SharePoint document library:
* **Folder Path**: `/Shared Documents/Monthly Reports/[CurrentYear]/`
* **File Name**: `HCSM_Monthly_Operations_Report_@{formatDateTime(addDays(utcNow(), -10), 'MMMM_yyyy')}.pptx`
*(Subtracting 10 days ensures that a run on June 1st generates a file named `HCSM_Monthly_Operations_Report_May_2026.pptx`)*

### 5.4 Step 4: Management Email Distribution
The flow fetches the file content from SharePoint and emails the finalized presentation to the management team and support leads:
* **Connector**: `Office 365 Outlook - Send an email (V2)`
* **To**: `norhaiza.awang@petronas.com.my; aisyoul.zainon@petronas.com.my`
* **Cc**: `yusrinah.mohamed@petronas.com.my; supervisor_leads@petronas.com`
* **Subject**: `[HCSM Report] Monthly Operations Deck — @{formatDateTime(addDays(utcNow(), -10), 'MMMM yyyy')}`
* **Body**:
  ```html
  <p>Hi Team,</p>
  <p>Please find attached the automated HCSM Monthly Operations Report for <b>@{formatDateTime(addDays(utcNow(), -10), 'MMMM yyyy')}</b>.</p>
  <p>This report has been compiled and formatted directly from the live Power BI dashboard data.</p>
  <p>Best regards,<br>HCSM Operations Bot</p>
  ```
* **Attachments**: The PowerPoint file content retrieved in the previous step.

---

## 6. Comparison: Python Pipeline vs. Power Automate Pipeline

| Metric / Feature | Python Pipeline (`2_Monthly_Report.py`) | Power Automate Pipeline |
|---|---|---|
| **Execution Trigger** | Manual click in Streamlit UI | **Automatic Recurrence (1st of month)** |
| **Data Extraction** | PyMuPDF spatial analysis & text matching | **Native Power BI DAX calculations** |
| **PPTX Compilation** | Delete-and-replace shapes (`python-pptx`) | **Direct PPTX export from Power BI Service** |
| **Date Rollover** | Regex search & replace on text runs | **Power BI Time Intelligence (`TODAY()`)** |
| **Output Delivery** | Manual download & email attachment | **Automatic Email + SharePoint archiving** |
| **Fragility / Maintenance** | High (breaking changes in PDF layouts) | **Very Low (native cloud export)** |
| **Maintenance Post-Internship** | Requires local Python dependencies | **Zero-maintenance (Microsoft Cloud)** |

---

## 7. The Hybrid Backup Strategy

Although the Power Automate flow is the primary vehicle for monthly reporting, the Python **MyCareerX Report Hub** page (`pages/2_Monthly_Report.py`) serves two crucial organizational roles:

1. **Fallback Recovery (Outage Backup)**: If the Power Automate cloud service or Power BI API experiences throttling, service outages, or connector credential expiration, the analyst can run the Streamlit app. By uploading the PDF manually, they can compile the report in under 2 minutes, ensuring business continuity.
2. **Onboarding & Knowledge Transfer**: It acts as a clear reference panel for newcomers. It explains the mapping, shows PDF coordinates, and documents the business logic in the source code, making it easier for new interns and support staff to understand the ticketing KPIs.

---

> [!IMPORTANT]
> Keep the credentials for the Power Automate connection API (which runs under `mizwan.ahmad@petronas.com`) updated. If password expiration occurs, the connection must be refreshed in the Power Automate portal to prevent the recurrence job from failing.
