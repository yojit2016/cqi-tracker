import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

const AlertBanner = ({
  type = 'info', // 'success' | 'warning' | 'error' | 'info'
  title,
  message,
  dismissible = true,
  onDismiss,
  duration = 0, // auto-dismiss in milliseconds, 0 means keep
  className = '',
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleDismiss = () => {
    setVisible(false);
    if (onDismiss) onDismiss();
  };

  const config = {
    success: {
      bg: 'bg-success-soft border-success-border text-success-text dark:text-success',
      icon: <CheckCircle2 className="w-5 h-5" />,
    },
    warning: {
      bg: 'bg-warning-soft border-warning-border text-warning-text dark:text-warning',
      icon: <AlertTriangle className="w-5 h-5" />,
    },
    error: {
      bg: 'bg-error-soft border-error-border text-error-text dark:text-error',
      icon: <AlertCircle className="w-5 h-5" />,
    },
    info: {
      bg: 'bg-info-soft border-info-border text-info-text dark:text-info',
      icon: <Info className="w-5 h-5" />,
    },
  };

  const current = config[type] || config.info;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`flex items-start gap-3 rounded-lg border p-4 shadow-sm relative ${current.bg} ${className}`}
        >
          <div className="flex-shrink-0 mt-0.5">{current.icon}</div>
          <div className="flex-grow pr-6">
            {title && <h5 className="font-bold text-sm leading-tight mb-1">{title}</h5>}
            {message && <p className="text-xs leading-normal opacity-90">{message}</p>}
          </div>
          {dismissible && (
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 hover:opacity-80 transition-opacity"
              aria-label="Dismiss alert"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AlertBanner;
