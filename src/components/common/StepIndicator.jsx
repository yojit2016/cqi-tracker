import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const StepIndicator = ({
  steps = [],
  currentStep = 0,
  direction = 'horizontal', // 'horizontal' | 'vertical'
  onStepClick,
  className = '',
}) => {
  const isHorizontal = direction === 'horizontal';

  return (
    <div
      className={`flex ${
        isHorizontal ? 'flex-row items-center w-full justify-between' : 'flex-col items-start gap-8'
      } ${className}`}
    >
      {steps.map((step, idx) => {
        const isCompleted = idx < currentStep;
        const isActive = idx === currentStep;
        const isPending = idx > currentStep;

        return (
          <div
            key={idx}
            className={`flex ${
              isHorizontal ? 'flex-col items-center flex-1 relative' : 'flex-row items-start gap-4'
            }`}
          >
            {/* Connector Line */}
            {idx > 0 && isHorizontal && (
              <div
                className="absolute top-5 left-[-50%] right-[50%] h-0.5 -translate-y-1/2 bg-border"
                style={{ zIndex: 0 }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: isCompleted || isActive ? '100%' : '0%' }}
                  className="h-full bg-primary"
                  transition={{ duration: 0.4 }}
                />
              </div>
            )}

            {/* Vertical Connector Line */}
            {idx > 0 && !isHorizontal && (
              <div
                className="absolute left-5 top-[-30px] bottom-[30px] w-0.5 bg-border"
                style={{ zIndex: 0, transform: 'translateX(-50%)' }}
              >
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: isCompleted || isActive ? '100%' : '0%' }}
                  className="w-full bg-primary"
                  transition={{ duration: 0.4 }}
                />
              </div>
            )}

            {/* Step Bubble */}
            <button
              onClick={() => onStepClick && onStepClick(idx)}
              disabled={!onStepClick}
              className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-normal outline-none focus:outline-none ${
                isCompleted
                  ? 'border-primary bg-primary text-white'
                  : isActive
                  ? 'border-primary bg-surface text-primary shadow-focus'
                  : 'border-border bg-surface text-text-tertiary'
              }`}
            >
              {isCompleted ? <Check className="w-5 h-5" /> : <span>{idx + 1}</span>}
            </button>

            {/* Step Details */}
            <div className={`mt-2 ${isHorizontal ? 'text-center' : 'text-left pt-1'}`}>
              <p
                className={`text-xs font-bold uppercase tracking-wider ${
                  isActive ? 'text-primary' : isCompleted ? 'text-text-primary' : 'text-text-tertiary'
                }`}
              >
                {step.label}
              </p>
              {step.subtitle && (
                <p className="text-xs text-text-tertiary mt-0.5">{step.subtitle}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
