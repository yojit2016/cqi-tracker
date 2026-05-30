import { motion } from 'framer-motion';

const statusMap = {
  positive: 'text-primary',
  negative: 'text-error',
  neutral: 'text-text-secondary',
};

const KPICard = ({ title, value, delta, meta, status = 'neutral' }) => {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="rounded-3xl border border-border bg-surface p-6 shadow-sm transition-shadow duration-200 hover:shadow-md"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">{title}</p>
          <p className="mt-3 text-3xl font-semibold text-text-primary">{value}</p>
        </div>
        <span className={`rounded-2xl bg-surface-hover px-3 py-2 text-sm font-semibold ${statusMap[status]}`}>
          {delta}
        </span>
      </div>
      <p className="mt-4 text-sm text-text-secondary">{meta}</p>
    </motion.div>
  );
};

export default KPICard;
