# Somaiya Vidyavihar University (SVU) Design System Reference
## CQI Tracker UI Theme Integration Specification

This document details the mandatory design tokens, spacing systems, and components defined by the Somaiya Vidyavihar University UI Kit. It specifies how these tokens are mapped to CSS custom variables, how they transition between Light and Dark themes, and how to bridge them with Tailwind CSS.

---

## 1. Brand Color Palette

The color system is divided into functional layers to ensure high contrast, accessibility, and alignment with SVU brand guidelines.

### A. Brand Colors
| Variable Name | Hex Code (Light) | Role / Usage |
| :--- | :--- | :--- |
| `--color-primary` | `#b7202e` | Somaiya Crimson. Primary brand color for headers, active elements, and main CTAs. |
| `--color-primary-hover` | `#931926` | Darker Crimson. Hover state for primary buttons/links. |
| `--color-primary-active` | `#78141e` | Deep Crimson. Active/pressed state for primary components. |
| `--color-primary-soft` | `#ffd5d9` | Light Crimson tint for badge backgrounds and soft highlight containers. |
| `--color-primary-soft-border` | `#d22637` | Soft Crimson border. |
| `--color-vitality` | `#ed1c24` | Vitality Red. Used strictly for "The Edge" university branding device. |
| `--color-secondary` | `#d97706` | Heritage Amber/Gold. Used for secondary CTAs, warnings, and highlighting. |
| `--color-secondary-hover` | `#d57e1b` | Mid-gold. Hover state for secondary elements. |
| `--color-secondary-active` | `#b25f00` | Deep gold. Active/pressed state for secondary elements. |
| `--color-secondary-soft` | `#f6cd9f` | Soft amber tint for warning badge backgrounds. |

### B. Core UI & Surface Colors
These variables control the core surfaces and backgrounds of the application. In Dark Mode, these variables are overridden.

| Variable Name | Light Theme Hex | Dark Theme Hex (Proposed Overrides) | Role / Usage |
| :--- | :--- | :--- | :--- |
| `--color-background` | `#f8fafc` (Slate 50) | `#0f172a` (Slate 900) | App workspace background behind layout cards. |
| `--color-surface` | `#ffffff` | `#1e293b` (Slate 800) | Core card surfaces, dialog boxes, and navigation sidebars. |
| `--color-surface-hover` | `#f1f5f9` (Slate 100) | `#334155` (Slate 700) | Highlight background on list hover, select menus, and active links. |
| `--color-surface-active` | `#e2e8f0` (Slate 200) | `#475569` (Slate 600) | Active/pressed state overlays on surfaces. |

### C. Typography & Text Colors
| Variable Name | Light Theme Hex | Dark Theme Hex (Proposed Overrides) | Role / Usage |
| :--- | :--- | :--- | :--- |
| `--color-text-primary` | `#231f20` (Dark Charcoal) | `#f8fafc` (Slate 50) | High-contrast body copy and headings. |
| `--color-text-secondary` | `#58595b` (Cool Gray) | `#cbd5e1` (Slate 300) | Secondary body copy, labels, and table cells. |
| `--color-text-tertiary` | `#808285` (Medium Gray) | `#94a3b8` (Slate 400) | Captions, timestamps, disabled indicators, and placeholders. |
| `--color-text-on-primary`| `#ffffff` | `#ffffff` | Contrast text when placed on top of Crimson or Amber CTAs. |

### D. Borders & Dividers
| Variable Name | Light Theme Hex | Dark Theme Hex (Proposed Overrides) | Role / Usage |
| :--- | :--- | :--- | :--- |
| `--color-border` | `#c5cacf` | `#334155` (Slate 700) | Standard layout borders, card borders, and table separators. |
| `--color-border-hover` | `#cbd5e1` | `#475569` (Slate 600) | Focused input border hover state. |
| `--color-border-active` | `#94a3b8` | `#64748b` (Slate 500) | Input field focus outlines and active separator lines. |

### E. Semantic Alerts
| Severity | CSS Variable Base | Background (Soft) | Border (Alert) | Text Color |
| :--- | :--- | :--- | :--- | :--- |
| **Success** | `--color-success` (`#059669`) | `--color-success-soft` (`#ecfdf5`) | `--color-success-border` (`#a7f3d0`) | `--color-success-text` (`#047857`) |
| **Warning** | `--color-warning` (`#d97706`) | `--color-warning-soft` (`#fef3c7`) | `--color-warning-border` (`#fde68a`) | `--color-warning-text` (`#b45309`) |
| **Error** | `--color-error` (`#dc2626`) | `--color-error-soft` (`#fef2f2`) | `--color-error-border` (`#fee2e2`) | `--color-error-text` (`#b91c1c`) |
| **Info** | `--color-info` (`#2563eb`) | `--color-info-soft` (`#eff6ff`) | `--color-info-border` (`#bfdbfe`) | `--color-info-text` (`#1d4ed8`) |

---

## 2. Typography System

The typography scale utilizes **Plus Jakarta Sans** for headlines and brand expressions to convey a modern, premium feel, and **Inter** for dense data displays and tables to maximize readability.

### A. Font Families
*   **Headings Font (`--font-headings`):** `"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
*   **Body Font (`--font-body`):** `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
*   **Monospace Font (`--font-mono`):** `"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace`

### B. Font Weights
*   `--fw-regular`: `400`
*   `--fw-medium`: `500`
*   `--fw-semibold`: `600`
*   `--fw-bold`: `700`
*   `--fw-extrabold`: `800`

### C. Typography Scale
| Token | Rem Value | Pixel Value | Line Height | Typical Usage |
| :--- | :--- | :--- | :--- | :--- |
| `--fs-xs` | `0.75rem` | `12px` | `1.5` | Captions, metadata, badge labels, timeline dates |
| `--fs-sm` | `0.875rem`| `14px` | `1.5` | Standard body text, inputs, sidebar links, tables |
| `--fs-base`| `1rem` | `16px` | `1.6` | Large body copy, lead text |
| `--fs-md` | `1.125rem`| `18px` | `1.5` | Section headers, card titles |
| `--fs-lg` | `1.25rem` | `20px` | `1.4` | Subheadings (h4), hero section cards |
| `--fs-xl` | `1.5rem` | `24px` | `1.3` | H3 headings, large stat display metrics |
| `--fs-2xl`| `1.875rem`| `30px` | `1.2` | H2 headings, modal headers |
| `--fs-3xl`| `2.25rem` | `36px` | `1.2` | H1 headings, main dashboard page title |
| `--fs-4xl`| `3rem` | `48px` | `1.1` | Marketing pages or primary metric focus |

---

## 3. Spatial & Border Radius Systems

The grid spacing follows a strict **4px Base Obsidian Grid** to ensure visual rhythm.

### A. Spacing Scale
*   `--space-2xs`: `0.25rem` (4px)
*   `--space-xs`: `0.5rem` (8px)
*   `--space-sm`: `0.75rem` (12px)
*   `--space-md`: `1rem` (16px)
*   `--space-lg`: `1.5rem` (24px)
*   `--space-xl`: `2rem` (32px)
*   `--space-2xl`: `3rem` (48px)
*   `--space-3xl`: `4rem` (64px)

### B. Border Radius Scale
Includes a global modifier multiplier (`--radius-factor: 1`) allowing layout-wide adjustments to corner softness.
*   `--radius-xs`: `calc(4px * var(--radius-factor))` — Checkboxes, tags, indicators
*   `--radius-sm`: `calc(6px * var(--radius-factor))` — Buttons, segmented tabs
*   `--radius-md`: `calc(10px * var(--radius-factor))` — Inputs, small dropdowns, badges
*   `--radius-lg`: `calc(16px * var(--radius-factor))` — Cards, table containers, alerts
*   `--radius-xl`: `calc(24px * var(--radius-factor))` — Modals, dropdown drawers
*   `--radius-full`: `9999px` — Switches, pill tags, profile circles

---

## 4. Shadow & Transition Mappings

### A. Elevations (Shadows)
*   `--shadow-sm`: `0 1px 2px 0 rgba(15, 23, 42, 0.05)` — Flat card border resting shadow
*   `--shadow-md`: `0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.06)` — Standard input focus and dashboard card shadow
*   `--shadow-lg`: `0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 4px 6px -4px rgba(15, 23, 42, 0.08)` — Card hover state, dropdown menus
*   `--shadow-xl`: `0 20px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.1)` — Modal dialog boxes, overlays

### B. Focus Glow Rings
*   `--shadow-focus`: `0 0 0 4px rgba(183, 32, 46, 0.18)` — Primary focus glow ring (Crimson)
*   `--shadow-focus-secondary`: `0 0 0 4px rgba(217, 119, 6, 0.22)` — Secondary focus glow ring (Heritage Gold)

### C. Transitions & Animation Curves
All UI components (buttons, links, active cards) must animate state changes using these curves:
*   `--transition-fast`: `0.12s cubic-bezier(0.4, 0, 0.2, 1)`
*   `--transition-normal`: `0.22s cubic-bezier(0.4, 0, 0.2, 1)`
*   `--transition-slow`: `0.38s cubic-bezier(0.4, 0, 0.2, 1)`

---

## 5. Light/Dark Theme Variable Mappings

To establish a beautiful dark mode, we redefine core design tokens. We recommend creating `src/styles/theme-dark.css` and attaching a `data-theme="dark"` attribute to the `<html>` node.

```css
/* theme-dark.css */
html[data-theme="dark"] {
  /* Core UI Colors Override */
  --color-background: #0f172a; /* Slate 900 */
  --color-surface: #1e293b; /* Slate 800 */
  --color-surface-hover: #334155; /* Slate 700 */
  --color-surface-active: #475569; /* Slate 600 */

  /* Text Colors Override */
  --color-text-primary: #f8fafc; /* Slate 50 */
  --color-text-secondary: #cbd5e1; /* Slate 300 */
  --color-text-tertiary: #94a3b8; /* Slate 400 */
  --color-text-on-primary: #ffffff;

  /* Border Colors Override */
  --color-border: #334155; /* Slate 700 */
  --color-border-hover: #475569; /* Slate 600 */
  --color-border-active: #64748b; /* Slate 500 */

  /* Shadow & Elevation Override for Dark Backdrop */
  --color-shadow-base: 0, 0, 0; /* Pure black shadows on dark backgrounds */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.2);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.3);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.4);

  /* Semantic Alerts Adjustments for Dark Mode (increased legibility) */
  --color-success-soft: rgba(16, 185, 129, 0.1);
  --color-success-border: rgba(16, 185, 129, 0.3);
  --color-success-text: #34d399;

  --color-warning-soft: rgba(245, 158, 11, 0.1);
  --color-warning-border: rgba(245, 158, 11, 0.3);
  --color-warning-text: #fbbf24;

  --color-error-soft: rgba(239, 68, 68, 0.1);
  --color-error-border: rgba(239, 68, 68, 0.3);
  --color-error-text: #fca5a5;

  --color-info-soft: rgba(59, 130, 246, 0.1);
  --color-info-border: rgba(59, 130, 246, 0.3);
  --color-info-text: #93c5fd;

  /* Custom Sidebar overrides for Dark Theme compatibility */
  --color-sidebar-bg: #1e293b; /* Slate 800 */
  --color-sidebar-border: #334155; /* Slate 700 */
  --color-sidebar-text: #cbd5e1; /* Slate 300 */
  --color-sidebar-bg-active: #334155; /* Slate 700 */
  --color-sidebar-text-active: #ffffff;
}
```

---

## 6. Tailwind CSS Integration Bridge

To use utility classes without violating the design system, configure `tailwind.config.js` to reference the CSS custom properties directly. This binds components and utilities to the same token source.

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'], // supports dark selector override
  theme: {
    extend: {
      colors: {
        // Brand Primary Crimson
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
          active: 'var(--color-primary-active)',
          soft: 'var(--color-primary-soft)',
          'soft-border': 'var(--color-primary-soft-border)',
        },
        // Brand Secondary Gold
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          hover: 'var(--color-secondary-hover)',
          active: 'var(--color-secondary-active)',
          soft: 'var(--color-secondary-soft)',
        },
        // Brand Edge Accents
        vitality: 'var(--color-vitality)',
        // Core Layout Mappings
        background: 'var(--color-background)',
        surface: {
          DEFAULT: 'var(--color-surface)',
          hover: 'var(--color-surface-hover)',
          active: 'var(--color-surface-active)',
        },
        // Typography Mappings
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
        },
        // Semantic Alerts
        success: {
          DEFAULT: 'var(--color-success)',
          soft: 'var(--color-success-soft)',
          border: 'var(--color-success-border)',
          text: 'var(--color-success-text)',
        },
        warning: {
          DEFAULT: 'var(--color-warning)',
          soft: 'var(--color-warning-soft)',
          border: 'var(--color-warning-border)',
          text: 'var(--color-warning-text)',
        },
        error: {
          DEFAULT: 'var(--color-error)',
          soft: 'var(--color-error-soft)',
          border: 'var(--color-error-border)',
          text: 'var(--color-error-text)',
        },
        info: {
          DEFAULT: 'var(--color-info)',
          soft: 'var(--color-info-soft)',
          border: 'var(--color-info-border)',
          text: 'var(--color-info-text)',
        },
      },
      spacing: {
        '2xs': 'var(--space-2xs)', // 4px
        xs: 'var(--space-xs)',     // 8px
        sm: 'var(--space-sm)',     // 12px
        md: 'var(--space-md)',     // 16px
        lg: 'var(--space-lg)',     // 24px
        xl: 'var(--space-xl)',     // 32px
        '2xl': 'var(--space-2xl)', // 48px
        '3xl': 'var(--space-3xl)', // 64px
      },
      fontFamily: {
        headings: 'var(--font-headings)',
        body: 'var(--font-body)',
        mono: 'var(--font-mono)',
      },
      fontWeight: {
        regular: 'var(--fw-regular)',
        medium: 'var(--fw-medium)',
        semibold: 'var(--fw-semibold)',
        bold: 'var(--fw-bold)',
        extrabold: 'var(--fw-extrabold)',
      },
      fontSize: {
        xs: 'var(--fs-xs)',
        sm: 'var(--fs-sm)',
        base: 'var(--fs-base)',
        md: 'var(--fs-md)',
        lg: 'var(--fs-lg)',
        xl: 'var(--fs-xl)',
        '2xl': 'var(--fs-2xl)',
        '3xl': 'var(--fs-3xl)',
        '4xl': 'var(--fs-4xl)',
      },
      borderRadius: {
        xs: 'var(--radius-xs)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        glow: 'var(--shadow-glow)',
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        fast: 'var(--transition-fast)',
        normal: 'var(--transition-normal)',
        slow: 'var(--transition-slow)',
      }
    },
  },
  plugins: [],
}
```
