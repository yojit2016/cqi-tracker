# CQI Tracker UI — OBE Quality Audit Platform

Continuous Quality Improvement (CQI) Dashboard for an Outcome-Based Education (OBE) accreditation system, conforming to NBA (National Board of Accreditation) Tier-1 specifications.

This frontend-only client dashboard enables course coordinators, HODs, and auditors to identify syllabus alignment gaps, track course outcome (CO) attainments, design corrective action plans, monitor cycle milestones, and compile compliance audit reports.

---

## 🚀 Key Features Built

1. **Analytics Dashboard (Landing Page)**:
   - High-level compliance stats (Quality Index, Active Gaps, Compliance Rate, NBA Stages) driven by live context.
   - Dynamic outcome attainment Line charts.
   - Real-time recent activity feeds and quick-action modals.
   - Active compliance registry preview tracking deadlines and priority statuses.

2. **Interactive Accreditation Timeline**:
   - Numbered step wizard showing global accreditation cycle phases.
   - Chronological vertical timeline feed with dynamic SVG lines that draw in on scroll.
   - Expandable logs detailing courses, departments, and course outcomes (COs).
   - Dynamic department-based scoping filters.

3. **Corrective Actions Board**:
   - Five kanban lanes corresponding to action statuses: *Pending, In Progress, Under Review, Resolved, Delayed*.
   - Dynamic filtering by search string, department bounds, and priorities.
   - Interactive sliding transitions allowing status shifting directly from card action buttons (fully responsive).
   - Form-validation enabled Create and Edit modals to update or purge items in the registry.

4. **Analytics Deep-Dive Module**:
   - Outlined scoping selectors (departments, custom calendar ranges, and status multi-selection).
   - Course attainment trend charts scoped in real-time.
   - Customized HTML/CSS monthly audit density heatmap showing audit loads.
   - Doughnut status distribution charts and Bar chart department benchmarks.

5. **Accreditation Reports Section**:
   - Formal report template previewing scoped datasets.
   - Custom CSV exporter writing tabular records into downloads.
   - Print-ready media stylesheets (`@media print`) rendering clean documents styled for A4 papers (hides sidebar, navbar, and filter cards).

6. **System Settings & User Profile**:
   - Theme toggle switcher caching Light/Dark modes in local storage.
   - E-mail and In-app notification toggle switches (iOS-style slides).
   - Input validators tracking alert thresholds.

---

## 🛠️ Tech Stack & Styling Rules

- **Framework**: React + Vite (SPA routing via `react-router-dom` nested under `DashboardLayout` shell)
- **Styling**: Tailwind CSS (fully bridges CSS variables in `design-tokens.css` and `theme-dark.css` to tailwind class utilities)
- **Visualization**: Chart.js (via `react-chartjs-2`) with theme-aware repainting listeners
- **Animations**:
  - **Framer Motion**: Page transitions, tab switches, expandable cards, modal scale mounts, and iOS switch toggles
  - **AOS (Animate on Scroll)**: Card grids, chart panels, and preview documents
- **Icons**: Lucide React
- **Persistence**: Centralized `CQIDataContext` syncing state automatically to `localStorage` under `cqi-tracker-data`.

---

## 💻 Setup and Run Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```

### 3. Production Build Validation
Verify compilation and lint checks:
```bash
npm run build
npm run lint
```

---

## 🔍 Demo Walkthrough Guide

To verify end-to-end functionality, perform the following steps:
1. **Dynamic KPI Updates**: Go to the **Corrective Actions** page and create a new corrective action or resolve a pending one. Return to the **Dashboard** or **Analytics** pages and observe the Quality Index counter and stats increment.
2. **Department Scoping**: Select "Information Technology" from the top navbar. All charts, KPI values, and tables on the Dashboard, Timeline, and Analytics will filter to show IT-specific audits.
3. **Accreditation Timeline**: Open the **CQI Timeline** page. Notice the vertical lines drawing in. Click any card to expand/collapse detailed parent action specs.
4. **Theme Toggle**: Click the Light/Dark mode switcher at the bottom of the sidebar. Notice backgrounds, typography, and Chart.js grid lines adjust to dark-mode slate aesthetics.
5. **Print Layout**: Navigate to **Reports**, adjust filters, and click **Print PDF Report**. In the print preview, notice the layouts scale for A4 paper and navigation menus are hidden.
