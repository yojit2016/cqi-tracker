import { motion } from 'framer-motion';

const ToggleSwitch = ({ checked, onChange, label, className = '' }) => {
  return (
    <label className={`flex items-center gap-3 cursor-pointer select-none ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <motion.div
          className={`h-6 w-11 rounded-full p-0.5 transition-colors duration-normal ${
            checked ? 'bg-success' : 'bg-slate-300 dark:bg-slate-700'
          }`}
        >
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="h-5 w-5 rounded-full bg-white shadow-sm"
            style={{ x: checked ? 20 : 0 }}
          />
        </motion.div>
      </div>
      {label && <span className="text-sm font-medium text-text-secondary">{label}</span>}
    </label>
  );
};

export default ToggleSwitch;
