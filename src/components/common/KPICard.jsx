import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedCounter = ({ value, duration = 1000 }) => {
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    const stringValue = String(value);
    const numericStr = stringValue.replace(/[^0-9.]/g, '');
    const target = parseFloat(numericStr);
    
    if (isNaN(target)) {
      setDisplayValue(stringValue);
      return;
    }

    const isPercentage = stringValue.includes('%');
    const isStep = stringValue.includes('/');

    if (isStep) {
      setDisplayValue(stringValue);
      return;
    }

    const start = 0;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // easeOutQuad
      const ease = progress * (2 - progress);
      const current = start + ease * (target - start);

      if (isPercentage) {
        setDisplayValue(`${current.toFixed(1)}%`);
      } else {
        const textSuffix = stringValue.replace(/[0-9.]/g, '');
        setDisplayValue(`${Math.round(current)}${textSuffix}`);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(stringValue);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return <span>{displayValue}</span>;
};

const statusMap = {
  positive: 'text-success bg-success-soft dark:text-success-text dark:bg-success-soft',
  negative: 'text-error bg-error-soft dark:text-error-text dark:bg-error-soft',
  neutral: 'text-text-secondary bg-surface-hover',
};

const KPICard = ({ title, value, delta, meta, status = 'neutral' }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="rounded-lg border border-border bg-surface p-6 shadow-sm hover:shadow-md transition-shadow duration-normal flex flex-col justify-between"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-text-secondary">{title}</p>
          <h3 className="text-3xl font-bold text-text-primary tracking-tight">
            <AnimatedCounter value={value} />
          </h3>
        </div>
        {delta && (
          <span className={`rounded-sm px-2 py-1 text-xs font-bold leading-none ${statusMap[status]}`}>
            {delta}
          </span>
        )}
      </div>
      {meta && (
        <p className="mt-4 text-xs font-medium text-text-tertiary">
          {meta}
        </p>
      )}
    </motion.div>
  );
};

export default KPICard;
