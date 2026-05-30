# CQI Tracker UI - Layout & Wireframe Blueprint
## Structural Mockups and Interface Mapping

This document provides visual ASCII wireframes for the **Dashboard** and **CQI Timeline** pages. It maps out the placement of UI elements, layouts, and responsive components from the Somaiya Vidyavihar University Design System.

---

## 1. Global Page Layout Wrapper (Sidebar + Top Navbar)

The workspace uses a 2-column layout. The Sidebar is fixed to the left edge, and the main canvas stretches to cover the remaining width.

```text
+---------------------------------------------------------------------------------------------------------+
|                                              GLOBAL LAYOUT                                              |
+---------------------------------------------------------------------------------------------------------+
| [SIDEBAR: 260px]          | [TOP NAVBAR: 70px Height]                                                   |
| (Fixed to left)           |  CQI Tracker UI  |  [Global Search...]  | [Dept Dropdown] | [🔔 3] | (Avatar) |
|                           +-----------------------------------------------------------------------------+
| * SVU Logo & Brand Name   | [MAIN CANVAS WORKSPACE: main-wrapper padding: var(--space-xl)]              |
|                           |                                                                             |
| * Dashboard       [Active]|                                                                             |
| * CQI Timeline            |                                                                             |
| * Corrective Actions      |                 PAGE-SPECIFIC COMPONENT WORKSPACE INJECTED HERE             |
| * Analytics               |                                                                             |
| * Reports                 |                                                                             |
| * Settings                |                                                                             |
|                           |                                                                             |
|                           |                                                                             |
|                           |                                                                             |
| ------------------------- |                                                                             |
| [Theme Selector toggle]   |                                                                             |
| ☀️ Light  /  🌙 Dark      |                                                                             |
+---------------------------+-----------------------------------------------------------------------------+
```

---

## 2. Dashboard Wireframe Blueprint

The dashboard provides a high-level visual summary. It utilizes a grid containing stat cards, charts, data tables, and an activity feed.

```text
+---------------------------------------------------------------------------------------------------------+
| [Navbar] CQI Dashboard  |  [Search...]  | [Dept: Computer Eng. v]  | [Notifications 🔔] | [User Avatar] |
+---------------------------------------------------------------------------------------------------------+
| [BRAND EDGE STRIPE: .brand-edge]                                                                | (Vital|
|  CQI Outcome-Based Education Dashboard                                                           | ity   |
|  Accreditation Year: 2026-27 | System Status: Active Gaps Review                                 | Stripe|
+---------------------------------------------------------------------------------------------------------+
| [KPI CARDS GRID: 4-Column Grid, var(--space-lg) gap]                                                    |
| +---------------------+ +---------------------+ +---------------------+ +---------------------+ |
| | Quality Index Score | | Open Actions        | | Audit Compliance    | | NBA Prep Stage      | |
| |  84.6%     [+2.4% 📈]| |  12 Active  [4 Due] | |  92.4%   [-1.2% 📉] | |  Step 3 / 6 (Draft) | |
| | (vs Last Sem: 82.2%)| | (6 resolved this wk)| | (Target: 95.0%)     | | (Self Assessment)   | |
| +---------------------+ +---------------------+ +---------------------+ +---------------------+ |
+---------------------------------------------------------------------------------------------------------+
| [MAIN CONTENT PANEL: grid-12 layout]                                                                    |
|                                                                                                         |
| [LEFT COLUMN: col-8 (2/3 Width)]                        | [RIGHT COLUMN: col-4 (1/3 Width)]             |
|                                                         |                                               |
| +-----------------------------------------------------+ | +-------------------------------------------+ |
| | OBE Attainment Trends (.card)                       | | | Quick Actions (.card)                     | |
| | [Segmented Tab: All Depts | Computer | IT | EXTC ]  | | | +-------------------------------------+ | |
| |                                                     | | | | [⚡ Initiate Corrective Action]     | | |
| |   (Chart.js Canvas - Line Chart)                    | | | | [📋 Generate Department PDF Audit]    | | |
| |    Quality Index %                                  | | | +-------------------------------------+ | |
| |     100 |     /----\                                | | +-------------------------------------------+ |
| |      80 |  --/      \------\                        | |                                               |
| |      60 |                  \----                    | | +-------------------------------------------+ |
| |       0 +------------------------                   | | | Recent Activity Feed (.timeline)          | |
| |           Sem I  Sem II  Sem III                    | | |                                           |
| +-----------------------------------------------------+ | | (•) Gap Resolved: CO-4 Mapping            | |
|                                                         | |     Computer Eng. Dept. | Just Now        | |
| +-----------------------------------------------------+ | |                                           |
| | Active Gaps & Corrective Actions (.card)            | | | (•) Audit Log: Syllabus gap identified    | |
| |                                                     | | |     Information Tech. | 2 hrs ago         | |
| | Action ID | Outcome  | Dept  | Status  | Close Date | | |                                           |
| | ----------+----------+-------+---------+----------- | | | (•) Accreditation milestone completed     | |
| | CA-2026-01| CO-3(gap)| Comp  | [PENDING| 12-Jun-26  | | |     NBA Stage 2 approved | Yesterday       | |
| | CA-2026-02| PO-12    | IT    | [CLOSED]| 28-May-26  | | +-------------------------------------------+ |
| | CA-2026-03| CO-5     | EXTC  | [OVERDUE| 24-May-26  | |                                               |
| +-----------------------------------------------------+ |                                               |
+---------------------------------------------------------------------------------------------------------+
```

---

## 3. CQI Timeline Wireframe Blueprint

The timeline tracks Outcome-Based Education accreditation progress over academic cycles.

```text
+---------------------------------------------------------------------------------------------------------+
| [Navbar] CQI Accreditation Timeline  | [Search...] | [Filter Semester v] | [Notifications] | [Avatar]   |
+---------------------------------------------------------------------------------------------------------+
| [BRAND EDGE STRIPE: .brand-edge]                                                                | (Vital|
|  OBE Course Assessment & Accreditation Cycle                                                     | ity   |
|  Current Phase: NBA Self-Assessment Report Generation                                            | Stripe|
+---------------------------------------------------------------------------------------------------------+
| [PROGRESS STEP WIZARD: .step-indicator]                                                                 |
|                                                                                                         |
|      (✓) -------------- (✓) -------------- (2) -------------- [3] -------------- [4] -------------- [5]   |
|   Gap Analysis     Action Design     Dept Review      Implementation      Evaluation       Accredited   |
|   (Completed)       (Completed)       (Active)         (Remaining)        (Remaining)      (Goal state) |
+---------------------------------------------------------------------------------------------------------+
| [TIMELINE WORKSPACE GRID: grid-12 layout]                                                               |
|                                                                                                         |
| [LEFT PANEL: col-4 (1/3 Width) Filters]                 | [RIGHT PANEL: col-8 (2/3 Width) Timeline]     |
| +-----------------------------------------------------+ | +-------------------------------------------+ |
| | Timeline Scope & Filters (.card)                    | | | Vertical Audit Trail (.timeline)          | |
| |                                                     | | |                                           |
| | [form-group]                                        | | | [Active Phase: Department Review]         | |
| |  Select Department:                                 | | | (•) Active - Board of Studies Review      | |
| |  [ Computer Engineering                     v ]      | | |     Syllabus gap remediation approval.    | |
| |                                                     | | |     Date: 30-May-2026                     | |
| | [form-group]                                        | | |     Details: Mapped CO-3 gap in Advanced  | |
| |  Accreditation Type:                                | | |     Algorithms. Adjusting Lab hours (+10) | |
| |  (o) NBA Tier 1 Audit                               | | |                                           |
| |  ( ) NAAC Cycle 4                                   | | | [Previous Phase: Action Design]           | |
| |                                                     | | | (•) Success - Action Plan Generated       | |
| | [form-group]                                        | | |     Corrective action CA-2026-01 signed   | |
| |  Show Events:                                       | | |     Date: 25-May-2026                     | |
| |  [x] Gap Identifications                            | | |     Assigned: Prof. K. R. Sharma          | |
| |  [x] Remediation Approvals                          | | |                                           |
| |  [ ] Administrative Logs                            | | | [Previous Phase: Gap Analysis]            | |
| |                                                     | | | (•) Success - Target Attainment Gap Logged| |
| | [Button: Apply Scope Filters]                       | | |     Target outcome CO-3 attainment gap    | |
| +-----------------------------------------------------+ | |     detected in Course Files.             | |
|                                                         | | |     Date: 15-May-2026                     | |
|                                                         | | +-------------------------------------------+ |
+---------------------------------------------------------------------------------------------------------+
```

---

## 4. Interaction Patterns & Micro-Animations

### A. Hover Transitions on Cards
When a user moves the pointer over any metric card or corrective action item table row:
*   The card scales up by y-axis translation (`transform: translateY(-4px)`) and elevates its shadow projection from `--shadow-sm` to `--shadow-lg`.
*   Table rows highlight in `--color-surface-hover` with a background transition speed of `0.12s`.

### B. Theme Toggle Interaction
Clicking the light/dark theme switch triggers:
*   An HSL background and color variable swap on the `<html>` root node.
*   A smooth `0.22s` color fade across all layout surfaces, sidebars, borders, and typography.
*   A redrawing trigger for Chart.js canvases to repaint axes, grid borders, and line colors to respect dark mode text contrast.
