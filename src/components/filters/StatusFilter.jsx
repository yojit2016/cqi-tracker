import { STATUS_TOKEN } from '../../utils/statusMap';

const StatusFilter = ({ selected = [], onChange, className = '' }) => {
  const statuses = ['pending', 'in-progress', 'under-review', 'resolved', 'delayed'];

  const handleToggle = (status) => {
    if (selected.includes(status)) {
      onChange(selected.filter((s) => s !== status));
    } else {
      onChange([...selected, status]);
    }
  };

  const getStyle = (status) => {
    const isSelected = selected.includes(status);
    const token = STATUS_TOKEN[status];

    const colorConfig = {
      'text-tertiary': {
        selected: 'bg-slate-500 text-white border-slate-500',
        unselected: 'bg-surface text-slate-500 border-slate-300 hover:bg-slate-50 dark:border-slate-700',
      },
      info: {
        selected: 'bg-info text-white border-info',
        unselected: 'bg-surface text-info border-info/30 hover:bg-info-soft dark:border-info/50 dark:text-info-text',
      },
      warning: {
        selected: 'bg-warning text-white border-warning',
        unselected: 'bg-surface text-warning border-warning/30 hover:bg-warning-soft dark:border-warning/50 dark:text-warning-text',
      },
      success: {
        selected: 'bg-success text-white border-success',
        unselected: 'bg-surface text-success border-success/30 hover:bg-success-soft dark:border-success/50 dark:text-success-text',
      },
      error: {
        selected: 'bg-error text-white border-error',
        unselected: 'bg-surface text-error border-error/30 hover:bg-error-soft dark:border-error/50 dark:text-error-text',
      },
    };

    const config = colorConfig[token] || colorConfig['text-tertiary'];
    return isSelected ? config.selected : config.unselected;
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">Scoping Status</span>
      <div className="flex flex-wrap gap-1.5">
        {statuses.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => handleToggle(status)}
            className={`px-2.5 py-1 text-xs font-semibold rounded-full border transition-all duration-fast outline-none select-none ${getStyle(
              status
            )}`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StatusFilter;
