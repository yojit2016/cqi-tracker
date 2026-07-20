import { STATUS_TOKEN } from '../../utils/statusMap';

const StatusBadge = ({ status, variant = 'pill', className = '' }) => {
  const token = STATUS_TOKEN[status] || 'text-tertiary';

  // Styles map
  const styles = {
    pill: {
      'text-tertiary': 'text-slate-500 border border-slate-300 bg-slate-50 dark:text-slate-400 dark:border-slate-700 dark:bg-slate-800/40',
      info: 'text-info border border-info/30 bg-info-soft dark:border-info/50 dark:bg-info/10 dark:text-info-text',
      warning: 'text-warning border border-warning/30 bg-warning-soft dark:border-warning/50 dark:bg-warning/10 dark:text-warning-text',
      success: 'text-success border border-success/30 bg-success-soft dark:border-success/50 dark:bg-success/10 dark:text-success-text',
      error: 'text-error border border-error/30 bg-error-soft dark:border-error/50 dark:bg-error/10 dark:text-error-text',
    },
    solid: {
      'text-tertiary': 'text-white bg-slate-500 dark:bg-slate-600',
      info: 'text-white bg-info',
      warning: 'text-white bg-warning',
      success: 'text-white bg-success',
      error: 'text-white bg-error',
    },
  };

  const selectedStyle = styles[variant][token] || styles[variant]['text-tertiary'];
  
  // Format status label for display
  const label = status
    ? status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')
    : 'Unknown';

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full text-xs font-semibold px-2.5 py-1 ${selectedStyle} ${className}`}
    >
      {label}
    </span>
  );
};

export default StatusBadge;
