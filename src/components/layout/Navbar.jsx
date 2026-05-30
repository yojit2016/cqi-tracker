import { motion } from 'framer-motion';

const Navbar = ({ onOpenSidebar }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-border bg-background/95 px-4 py-4 backdrop-blur-xl md:px-8"
    >
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="inline-flex items-center justify-center rounded-2xl border border-border bg-surface p-2 text-text-secondary transition hover:bg-surface-hover md:hidden"
          aria-label="Open sidebar"
        >
          ☰
        </button>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">Dashboard</p>
          <h2 className="text-2xl font-semibold text-text-primary">CQI Tracker UI</h2>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-3">
        <div className="hidden flex-1 items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-text-secondary md:flex">
          <span className="text-text-tertiary">Search</span>
          <input
            type="search"
            placeholder="Search reports, departments..."
            className="w-full bg-transparent text-text-primary outline-none placeholder:text-text-tertiary"
            aria-label="Global search"
          />
        </div>
        <div className="hidden items-center gap-2 rounded-2xl bg-surface px-4 py-3 text-sm text-text-secondary md:flex">
          Department:
          <span className="rounded-full bg-surface-hover px-3 py-1 text-text-primary">Computer Eng.</span>
        </div>
        <button
          type="button"
          className="rounded-2xl bg-surface p-3 text-text-secondary transition hover:bg-surface-hover"
          aria-label="Notifications"
        >
          🔔
        </button>
        <div className="hidden h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white md:flex">SV</div>
      </div>
    </motion.header>
  );
};

export default Navbar;
