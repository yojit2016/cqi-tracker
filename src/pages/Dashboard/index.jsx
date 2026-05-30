import { motion } from 'framer-motion';
import KPICard from '../../components/common/KPICard';
import BrandEdge from '../../components/common/BrandEdge';
import { kpiCards, quickActions, recentActivity } from '../../data/dashboardData';

const DashboardPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="space-y-8"
    >
      <BrandEdge
        title="CQI Outcome-Based Education Dashboard"
        subtitle="Accreditation Year: 2026-27 · System Status: Active Gaps Review"
      />
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpiCards.map((card) => (
          <KPICard key={card.title} {...card} />
        ))}
      </section>
      <section className="grid gap-4 xl:grid-cols-[2fr_1fr]">
        <div className="rounded-3xl bg-surface p-6 shadow-md border border-border">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-secondary">OBE Attainment Trends</p>
              <h2 className="mt-2 text-2xl font-semibold text-text-primary">Department performance overview</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-surface-hover px-3 py-2 text-sm text-text-secondary">
              All Depts
              <span className="h-2 w-2 rounded-full bg-primary" />
            </div>
          </div>
          <div className="mt-8 h-64 rounded-3xl bg-background p-6 text-text-secondary">
            <div className="h-full rounded-3xl border border-border border-dashed bg-surface flex items-center justify-center">
              <p className="text-center text-sm">Chart placeholder for line trend</p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-3xl bg-surface p-6 shadow-md border border-border">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-secondary">Quick Actions</p>
                <h3 className="mt-2 text-xl font-semibold text-text-primary">Launch a task</h3>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  className={`rounded-2xl px-4 py-3 text-sm font-semibold transition duration-200 ${
                    action.variant === 'primary'
                      ? 'bg-primary text-white hover:bg-primary-hover'
                      : 'border border-border bg-surface text-text-primary hover:border-primary hover:text-primary'
                  }`}
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-surface p-6 shadow-md border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-secondary">Recent Activity</p>
                <h3 className="mt-2 text-xl font-semibold text-text-primary">Latest updates</h3>
              </div>
            </div>
            <ul className="mt-6 space-y-4">
              {recentActivity.map((item) => (
                <li key={item.title} className="rounded-3xl bg-surface-hover p-4">
                  <p className="font-semibold text-text-primary">{item.title}</p>
                  <p className="mt-1 text-sm text-text-secondary">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default DashboardPage;
