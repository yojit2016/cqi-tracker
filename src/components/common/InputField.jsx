import React from 'react';

const InputField = React.forwardRef(({
  label,
  error,
  success,
  helperText,
  type = 'text',
  value,
  onChange,
  placeholder,
  className = '',
  multiline = false,
  ...props
}, ref) => {
  const InputTag = multiline ? 'textarea' : 'input';
  
  const borderClass = error
    ? 'border-error focus:border-error focus:ring-1 focus:ring-error'
    : success
    ? 'border-success focus:border-success focus:ring-1 focus:ring-success'
    : 'border-border focus:border-primary focus:ring-1 focus:ring-primary';

  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      {label && (
        <label className="text-xs font-semibold uppercase tracking-[0.1em] text-text-secondary mb-1">
          {label}
        </label>
      )}
      <InputTag
        ref={ref}
        type={multiline ? undefined : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={multiline ? 4 : undefined}
        className={`w-full rounded-md border bg-surface px-4 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary transition duration-200 outline-none ${borderClass}`}
        {...props}
      />
      {error && (
        <span className="text-xs font-medium text-error mt-0.5">
          ⚠️ {error}
        </span>
      )}
      {!error && helperText && (
        <span className="text-xs text-text-tertiary mt-0.5">
          {helperText}
        </span>
      )}
    </div>
  );
});

InputField.displayName = 'InputField';

export default InputField;
