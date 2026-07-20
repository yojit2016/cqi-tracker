import { motion } from 'framer-motion';

const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  icon,
  children,
  className = '',
  type = 'button',
}) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-fast rounded-sm focus:outline-none';
  
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-hover active:bg-primary-active disabled:bg-primary-soft disabled:text-white/60 disabled:cursor-not-allowed shadow-sm focus:shadow-focus',
    secondary: 'border border-border bg-surface text-text-primary hover:bg-surface-hover active:bg-surface-active disabled:text-text-tertiary disabled:border-border disabled:bg-surface disabled:cursor-not-allowed focus:shadow-focus-secondary',
    success: 'bg-success text-white hover:opacity-90 active:opacity-100 disabled:bg-success/50 disabled:cursor-not-allowed focus:ring-2 focus:ring-success/50',
    danger: 'bg-error text-white hover:opacity-90 active:opacity-100 disabled:bg-error/50 disabled:cursor-not-allowed focus:ring-2 focus:ring-error/50',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3.5 text-base',
  };

  return (
    <motion.button
      whileTap={disabled ? {} : { scale: 0.98 }}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {icon && <span className="w-4 h-4 flex items-center justify-center">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
};

export default Button;
