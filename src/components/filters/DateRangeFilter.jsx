const DateRangeFilter = ({ startDate, endDate, onChange, className = '' }) => {
  const handlePreset = (presetType) => {
    if (presetType === 'semester') {
      // Say, Jan 1 to Jul 31
      onChange('2026-01-01', '2026-07-31');
    } else if (presetType === 'year') {
      // Academic year 2026-27 (say, Jun 1 to May 31)
      onChange('2026-06-01', '2027-05-31');
    } else {
      onChange('', '');
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">Date Interval Scope</span>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5 flex-wrap sm:flex-nowrap">
          <input
            type="date"
            value={startDate}
            onChange={(e) => onChange(e.target.value, endDate)}
            className="w-full sm:w-auto min-w-0 flex-1 rounded-md border border-border bg-surface px-2.5 py-1.5 text-xs text-text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            aria-label="Start date"
          />
          <span className="text-xs font-medium text-text-tertiary">to</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => onChange(startDate, e.target.value)}
            className="w-full sm:w-auto min-w-0 flex-1 rounded-md border border-border bg-surface px-2.5 py-1.5 text-xs text-text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            aria-label="End date"
          />
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => handlePreset('semester')}
            className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-sm border border-border bg-surface-hover text-text-secondary hover:bg-surface transition"
          >
            Sem Presets
          </button>
          <button
            type="button"
            onClick={() => handlePreset('year')}
            className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-sm border border-border bg-surface-hover text-text-secondary hover:bg-surface transition"
          >
            Full Year
          </button>
          {(startDate || endDate) && (
            <button
              type="button"
              onClick={() => handlePreset('clear')}
              className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-sm border border-error/20 bg-error-soft text-error hover:opacity-85 transition"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateRangeFilter;
