import React from 'react';

const SelectField = React.forwardRef(({
  label,
  error,
  success,
  helperText,
  options = [],
  value,
  onChange,
  placeholder,
  className = '',
  ...props
}, ref) => {
  const borderClass = error
    ? 'border-error focus:border-error focus:ring-1 focus:ring-error'
    : success
    ? 'border-success focus:border-success focus:ring-1 focus:ring-success'
    : 'border-border focus:border-primary focus:ring-1 focus:ring-primary';

  const selectId = label ? `select-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined;
  const errorId = error ? `error-${label?.replace(/\s+/g, '-').toLowerCase()}` : undefined;
  const helperId = helperText ? `helper-${label?.replace(/\s+/g, '-').toLowerCase()}` : undefined;

  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      {label && (
        <label htmlFor={selectId} className="text-xs font-semibold uppercase tracking-[0.1em] text-text-secondary mb-1">
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={selectId}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : (helperText ? helperId : undefined)}
        className={`w-full rounded-md border bg-surface px-4 py-2.5 text-sm text-text-primary transition duration-200 outline-none cursor-pointer ${borderClass}`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <span id={errorId} className="text-xs font-medium text-error mt-0.5">
          ⚠️ {error}
        </span>
      )}
      {!error && helperText && (
        <span id={helperId} className="text-xs text-text-tertiary mt-0.5">
          {helperText}
        </span>
      )}
    </div>
  );
});

SelectField.displayName = 'SelectField';

export default SelectField;
