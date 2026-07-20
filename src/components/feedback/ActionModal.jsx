import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const ActionModal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  className = '',
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className={`relative z-10 w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-surface shadow-xl flex flex-col max-h-[90vh] ${className}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h3 className="text-base font-bold text-text-primary tracking-tight">{title}</h3>
              <button
                onClick={onClose}
                className="rounded-md p-1.5 text-text-secondary hover:bg-surface-hover hover:text-text-primary transition outline-none"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body (Scrollable if tall) */}
            <div className="overflow-y-auto px-6 py-4 flex-grow">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="flex items-center justify-end border-t border-border bg-surface-hover/20 px-6 py-4">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ActionModal;
