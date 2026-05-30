# Reusable Component Inventory
## React Component Registry & UI Kit Mapping

This document lists the reusable React components designed to implement the mandatory Somaiya Vidyavihar University UI Kit. Each component wraps specific HTML structures and class names from `components.css`, exposing a clean, developer-friendly React API.

---

## 1. Typography & Layout Elements

### A. BrandEdge (The SVU Edge Accent Stripe)
*   **CSS Classes Mapped:** `.brand-edge`, `.brand-edge-column-power`, `.brand-edge-column-vitality`
*   **Props API:**
    *   `title` (string, required): Bold header text displayed in the primary column.
    *   `subtitle` (string, optional): Secondary sub-header or action text.
    *   `action` (ReactNode, optional): Custom button or toggle placed right-aligned in the primary column.
*   **Code Example:**
    ```jsx
    import React from 'react';
    import { motion } from 'framer-motion';

    export const BrandEdge = ({ title, subtitle, action }) => (
      <div className="brand-edge mb-lg w-full">
        <div className="brand-edge-column-power">
          <div className="flex justify-between items-center z-20">
            <div>
              <h2 className="h2 text-white mb-2xs">{title}</h2>
              {subtitle && <p className="text-white/80 text-small">{subtitle}</p>}
            </div>
            {action && <div className="ml-md">{action}</div>}
          </div>
        </div>
        <div className="brand-edge-column-vitality" />
      </div>
    );
    ```

### B. Card (UI Content Container)
*   **CSS Classes Mapped:** `.card`, `.card-header`, `.card-body`, `.card-footer`, `.card-interactive`
*   **Props API:**
    *   `children` (ReactNode): Inside body content.
    *   `title` (ReactNode, optional): Card header text or customized layout.
    *   `action` (ReactNode, optional): Right-aligned element in header.
    *   `footer` (ReactNode, optional): Footer section containing action buttons.
    *   `interactive` (boolean, default: `false`): Enables hover transitions and elevations.
    *   `onClick` (function, optional): Triggered on card click if interactive.
*   **Code Example:**
    ```jsx
    export const Card = ({ title, action, children, footer, interactive = false, onClick }) => {
      const CardWrapper = interactive ? motion.div : 'div';
      const wrapperProps = interactive 
        ? { 
            whileHover: { y: -4, transition: { duration: 0.12 } },
            className: "card card-interactive",
            onClick 
          }
        : { className: "card" };

      return (
        <CardWrapper {...wrapperProps}>
          {(title || action) && (
            <div className="card-header">
              {typeof title === 'string' ? <h4 className="h5 mb-0">{title}</h4> : title}
              {action && <div>{action}</div>}
            </div>
          )}
          <div className="card-body">{children}</div>
          {footer && <div className="card-footer">{footer}</div>}
        </CardWrapper>
      );
    };
    ```

---

## 2. Interactive Controls & Forms

### A. Button
*   **CSS Classes Mapped:** `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-success`, `.btn-danger`, `.btn-sm`, `.btn-lg`, `.form-btn`
*   **Props API:**
    *   `variant` (enum: `'primary' | 'secondary' | 'success' | 'danger'`, default: `'primary'`): Visual weight.
    *   `size` (enum: `'sm' | 'md' | 'lg'`, default: `'md'`): Height and padding size.
    *   `block` (boolean, default: `false`): Extends to full container width (`.form-btn`).
    *   `disabled` (boolean, default: `false`): Disables pointer events.
    *   `icon` (ReactNode, optional): Left-aligned Lucide icon.
    *   `onClick` (function, optional): Click handler.
*   **Code Example:**
    ```jsx
    export const Button = ({ variant = 'primary', size = 'md', block = false, disabled = false, icon, children, onClick }) => {
      const classes = [
        'btn',
        `btn-${variant}`,
        size !== 'md' ? `btn-${size}` : '',
        block ? 'form-btn' : ''
      ].filter(Boolean).join(' ');

      return (
        <motion.button
          whileTap={disabled ? {} : { scale: 0.97 }}
          className={classes}
          disabled={disabled}
          onClick={onClick}
        >
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <span>{children}</span>
        </motion.button>
      );
    };
    ```

### B. InputField
*   **CSS Classes Mapped:** `.form-group`, `.form-label`, `.form-control`, `.is-invalid`, `.is-valid`, `.invalid-feedback`, `.valid-feedback`
*   **Props API:**
    *   `label` (string, required): Floating field description.
    *   `type` (string, default: `'text'`): Input type (text, password, number, email, date).
    *   `value` (string/number): Binding state.
    *   `onChange` (function): Update callback.
    *   `placeholder` (string): Help value inside field.
    *   `error` (string, optional): Red border overlay and detailed error label.
    *   `success` (boolean, default: `false`): Green border verification outline.
    *   `multiline` (boolean, default: `false`): Renders a `<textarea>` instead of standard `<input>`.
*   **Code Example:**
    ```jsx
    export const InputField = ({ label, type = 'text', value, onChange, placeholder, error, success, multiline = false, ...props }) => {
      const inputClass = `form-control ${error ? 'is-invalid' : ''} ${success && !error ? 'is-valid' : ''}`;
      const InputTag = multiline ? 'textarea' : 'input';

      return (
        <div className="form-group w-full">
          <label className="form-label">{label}</label>
          <InputTag
            type={!multiline ? type : undefined}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={inputClass}
            {...props}
          />
          {error && <span className="invalid-feedback">{error}</span>}
          {success && !error && <span className="valid-feedback">Looks good!</span>}
        </div>
      );
    };
    ```

### C. SwitchToggle (iOS Style Toggle Switch)
*   **CSS Classes Mapped:** `.form-switch`, `.switch-track`
*   **Props API:**
    *   `checked` (boolean, required): Toggle check state.
    *   `onChange` (function, required): Toggles boolean state.
    *   `label` (string, optional): Text descriptive label.
*   **Code Example:**
    ```jsx
    export const SwitchToggle = ({ checked, onChange, label }) => (
      <label className="form-switch">
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className="switch-track" />
        {label && <span className="text-small text-secondary font-semibold">{label}</span>}
      </label>
    );
    ```

---

## 3. Navigation & Feedback Overlays

### A. SegmentedControl (Tab switches)
*   **CSS Classes Mapped:** `.segmented-control`, `.segmented-item`, `.active`
*   **Props API:**
    *   `options` (array of strings/objects, required): List of tabs.
    *   `activeOption` (string, required): Currently selected item index/key.
    *   `onChange` (function, required): Selection changed callback.
*   **Code Example:**
    ```jsx
    export const SegmentedControl = ({ options, activeOption, onChange }) => (
      <div className="segmented-control">
        {options.map((option) => {
          const value = typeof option === 'object' ? option.value : option;
          const label = typeof option === 'object' ? option.label : option;
          const isActive = activeOption === value;

          return (
            <button
              key={value}
              className={`segmented-item ${isActive ? 'active' : ''}`}
              onClick={() => onChange(value)}
            >
              {label}
            </button>
          );
        })}
      </div>
    );
    ```

### B. Modal (Overlay Dialog)
*   **CSS Classes Mapped:** `.modal-backdrop`, `.modal-content`, `.modal-header`, `.modal-close`, `.modal-body`, `.modal-footer`
*   **Props API:**
    *   `isOpen` (boolean, required): Visibility control.
    *   `onClose` (function, required): Close overlay request.
    *   `title` (string, required): Header text.
    *   `children` (ReactNode): Inside body content.
    *   `footerActions` (ReactNode, optional): Custom actions placed in footer.
*   **Code Example:**
    ```jsx
    import { AnimatePresence } from 'framer-motion';

    export const Modal = ({ isOpen, onClose, title, children, footerActions }) => (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="modal-backdrop active"
            onClick={(e) => e.target.classList.contains('modal-backdrop') && onClose()}
          >
            <motion.div
              initial={{ scale: 0.92, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 15 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              className="modal-content"
            >
              <div className="modal-header">
                <h3 className="h4 mb-0">{title}</h3>
                <button className="modal-close text-2xl" onClick={onClose}>&times;</button>
              </div>
              <div className="modal-body">{children}</div>
              {footerActions && <div className="modal-footer">{footerActions}</div>}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
    ```

---

## 4. Academic Progress & Timelines

### A. StepIndicator (Accreditation / Progress Wizard)
*   **CSS Classes Mapped:** `.step-indicator`, `.step-item`, `.step-bubble`, `.step-label`, `.completed`, `.active`
*   **Props API:**
    *   `steps` (array of strings, required): Step descriptive tags.
    *   `currentStep` (number, required): Active step index (0-indexed).
*   **Code Example:**
    ```jsx
    export const StepIndicator = ({ steps, currentStep }) => (
      <div className="step-indicator w-full">
        {steps.map((step, idx) => {
          const isCompleted = idx < currentStep;
          const isActive = idx === currentStep;
          const stateClass = isCompleted ? 'completed' : isActive ? 'active' : '';

          return (
            <div key={idx} className={`step-item ${stateClass}`}>
              <div className="step-bubble">
                {isCompleted ? '✓' : idx + 1}
              </div>
              <span className="step-label">{step}</span>
            </div>
          );
        })}
      </div>
    );
    ```

### B. Timeline (Activity Trails)
*   **CSS Classes Mapped:** `.timeline`, `.timeline-item`, `.timeline-dot`, `.timeline-content`, `.timeline-title`, `.timeline-meta`
*   **Props API:**
    *   `events` (array of objects, required): Event item payload.
        *   Format: `{ title: string, description: string, date: string, type: 'active' | 'success' | 'default' }`
*   **Code Example:**
    ```jsx
    export const Timeline = ({ events }) => (
      <div className="timeline w-full">
        {events.map((event, idx) => (
          <div key={idx} className="timeline-item">
            <div className={`timeline-dot ${event.type || ''}`} />
            <div className="timeline-content">
              <div className="timeline-title">{event.title}</div>
              <p className="text-secondary text-small">{event.description}</p>
              <div className="timeline-meta">{event.date}</div>
            </div>
          </div>
        ))}
      </div>
    );
    ```
