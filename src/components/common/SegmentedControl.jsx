import { motion } from 'framer-motion';

const SegmentedControl = ({ options = [], value, onChange, className = '' }) => {
  return (
    <div className={`inline-flex rounded-sm bg-surface-hover p-1 border border-border relative ${className}`}>
      {options.map((opt) => {
        const isActive = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`relative px-4 py-1.5 text-xs font-semibold rounded-sm transition duration-normal outline-none select-none z-10 ${
              isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="active-segmented-tab"
                className="absolute inset-0 bg-surface shadow-sm rounded-sm"
                style={{ zIndex: -1 }}
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
              />
            )}
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default SegmentedControl;
