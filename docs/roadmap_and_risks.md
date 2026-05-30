# Roadmap, Risks, and UI Kit Compliance Specifications
## CQI Tracker UI Delivery Plan

This document maps out the required pages, folder structure, delivery milestones, risk analysis, potential UI inconsistencies, and a compliance audit checklist for the **CQI Tracker UI**.

---

## 1. Scope: Required Pages & Sections

The application is structured into six primary functional areas:

1.  **Dashboard**: Focuses on high-level quality index trends, open corrective actions, accreditation status gauges, and quick buttons to launch new audits.
2.  **CQI Timeline**: A step-by-step audit wizard showing accreditation stages and a vertical timeline detailing recent changes, outcome evaluations, and academic logs.
3.  **Corrective Actions**: A registry table with columns for Action ID, Department, Target Outcome Gap, Status, and supervisor assignments. Includes editing overlays.
4.  **Analytics**: Visual charts showing outcome attainment levels, program compliance distributions, and department performance comparisons.
5.  **Reports**: Generates summaries of audits, NBA/NAAC compliance logs, and exports data to PDF or Excel formats.
6.  **Settings**: Configures academic thresholds, department mappings, user profiles, notifications, and controls the Light/Dark mode toggles.

---

## 2. Recommended Folder Structure

Below is the repository blueprint to be scaffolded during the project initiation phase:

```text
cqi-tracker/
├── docs/                     # Design and architectural specifications
│   ├── architecture.md
│   ├── design_system.md
│   ├── component_inventory.md
│   ├── wireframes.md
│   └── roadmap_and_risks.md
├── src/
│   ├── assets/               # SVU brand logos and SVG assets
│   ├── components/           # Shared React components mapping design styles
│   │   ├── common/           # Buttons, Badges, Dropdowns, Inputs
│   │   ├── layout/           # Sidebar, Navbar, MainWrapper
│   │   ├── feedback/         # Modals, Alerts, ToastNotification
│   │   └── data/             # Tables, SegmentedControl, Timeline
│   ├── context/              # Context Providers (Theme, CQIState)
│   ├── hooks/                # useTheme, useCQIData, useCorrectiveActions
│   ├── pages/                # Client router entry pages
│   │   ├── Dashboard/
│   │   ├── Timeline/
│   │   ├── CorrectiveActions/
│   │   ├── Analytics/
│   │   ├── Reports/
│   │   └── Settings/
│   ├── styles/               # CSS and theme sheets
│   │   ├── index.css         # Entry CSS with Tailwind directives
│   │   ├── design-tokens.css # UI Kit Core Variables
│   │   ├── components.css    # UI Kit Component CSS
│   │   └── theme-dark.css    # Dark Mode overrides
│   └── App.jsx               # Navigation router configuration
└── tailwind.config.js        # Mapped to design-tokens.css variables
```

---

## 3. Implementation Roadmap & Deliverables

### Week 1 Deliverables (Planning, Design & Bridging)
*   **[Completed] Mandatory UI Kit Analysis**: Extracted color palette, typography hierarchy, spatial rules, button styles, and interactive indicators.
*   **[Completed] Design Token Mapping**: Structured custom HSL variables and created the Tailwind CSS integration bridge config.
*   **[Completed] Wireframe Blueprints**: Created layout mockups for the Dashboard and CQI Timeline interfaces.
*   **[Completed] Component Inventory**: Defined React component API schemas matching the UI Kit styles.
*   **[Scaffolding] Design Scaffolding**: Create the Tailwind configurations, import custom styles, and verify variables bridge correctly in a test route.

### Week 2 Deliverables (Building & Scaffolding UI Foundations)
*   **Task 2.1: Navigation Sidebar Component**: Create a sidebar with SVU branding, hover transition rules, and layout indicators using Framer Motion.
*   **Task 2.2: Top Navbar Component**: Build a header with global search, department dropdown selection context, notification alert counts, and profile triggers.
*   **Task 2.3: Theme Controller & Dark Mode**: Write the React Theme Context to toggle a `data-theme` attribute and load dark mode variables dynamically.
*   **Task 2.4: Hero & KPI Metrics Grid**: Build the `BrandEdge` university stripe and a responsive 4-column KPI cards grid.
*   **Task 2.5: Compliance & QA Audit**: Validate all elements against the UI Kit compliance checklist.

---

## 4. Architectural Risk Analysis

| Identified Risk | Architectural Impact | Mitigation Strategy |
| :--- | :--- | :--- |
| **Chart.js Dark Theme Lag** | Toggling the theme changes page CSS, but canvas-rendered charts keep light colors until forced to update. | Bind a `key={theme}` to chart components. This triggers a clean component redraw whenever the theme changes. |
| **Tailwind & CSS Specificity Conflicts** | Standard utility classes might clash with the UI Kit's `.btn` or `.form-control` styles. | Apply custom styles carefully. Use the UI Kit's base component classes for components, and use Tailwind utilities for page grid layouts and margins. |
| **Timeline Performance Degrades** | Loading many academic activity logs can slow down Framer Motion stagger transitions. | Implement page filtering by department or semester, and limit timeline rendering to the most recent 15 events. |
| **Chart.js Memory Leaks** | Frequent page changes or component updates can leave orphan canvas contexts in memory. | Ensure all chart instances are clean destroyed during the React component cleanup phase. |

---

## 5. Potential UI Inconsistencies & Resolutions

*   **Inconsistent Color Usages:**
    *   *Issue:* Developers might accidentally write hardcoded hex values in tailwind classes (e.g. `bg-[#A01E25]`).
    *   *Resolution:* Set up strict ESLint rules that warn against arbitrary Tailwind color classes, and enforce using variables like `bg-primary` instead.
*   **Varying Border Radii:**
    *   *Issue:* Cards, buttons, and form inputs could end up with mismatched corner styles.
    *   *Resolution:* Check that corner sizes map directly to CSS variables (e.g., `rounded-lg` for cards, `rounded-sm` for buttons) based on the border-radius scale in the design tokens.
*   **Custom vs System Spacing:**
    *   *Issue:* Random margins (like `mt-[7px]`) can break the visual alignment.
    *   *Resolution:* Restrict spacing sizes to multiples of the 4px base grid (e.g., `space-xs`, `space-md`, `space-lg`).

---

## 6. UI Kit Compliance Audit Checklist

This checklist must be used to verify all components before committing code changes:

- [ ] **Colors:** No hardcoded hex values (`#A01E25`, `#F8FAFC`) exist in Tailwind classes or style blocks.
- [ ] **Colors:** All colors point to system CSS variables (`var(--color-primary)`, `var(--color-background)`).
- [ ] **Typography:** All headings use the `--font-headings` (Plus Jakarta Sans) font.
- [ ] **Typography:** Table cells and dashboard metrics use the `--font-body` (Inter) font.
- [ ] **Elevations:** Component shadows are styled using system tokens (`--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`).
- [ ] **Transitions:** Hover and focus states use the `--transition-fast` or `--transition-normal` cubic-bezier values.
- [ ] **Theme:** All components change their styling correctly when the theme toggles between light and dark modes.
- [ ] **Accessibility:** Interactive elements have clear `:focus` outlines styling with focus rings.
- [ ] **Responsive Design:** Columns and grid systems wrap cleanly into single column structures when the screen width is less than 768px.
