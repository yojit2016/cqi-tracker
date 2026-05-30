import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import ThemeToggle from '../common/ThemeToggle';
import { navigationItems } from '../../config/navigation';

const Sidebar = ({ mobileOpen, onClose }) => {
  return (
    <motion.aside
      initial={false}
      animate={{ x: mobileOpen ? 0 : '-100%' }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="fixed inset-y-0 left-0 z-40 w-72 overflow-y-auto border-r border-border bg-surface px-6 py-6 shadow-lg shadow-slate-900/10 backdrop-blur-xl md:static md:translate-x-0 md:border-r-0 md:shadow-none"
    >
      <div className="flex items-center justify-between md:justify-start gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-secondary">SVU CQI</p>
          <h1 className="mt-2 text-2xl font-bold text-text-primary">Tracker</h1>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-border p-2 text-text-secondary transition hover:bg-surface-hover md:hidden"
          aria-label="Close sidebar"
        >
          ✕
        </button>
      </div>
      <nav className="mt-10 flex flex-col gap-2">
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex w-full items-center justify-between rounded-3xl px-4 py-3 text-left text-sm font-medium transition duration-200 hover:bg-surface-hover ${
                isActive ? 'bg-primary text-white shadow-md' : 'text-text-secondary'
              }`
            }
            onClick={onClose}
          >
            {({ isActive }) => (
              <>
                <span>{item.label}</span>
                {isActive ? <span className="text-xs font-semibold uppercase">Active</span> : <span className="text-xs" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>
      <div className="mt-10 rounded-3xl border border-border bg-surface p-4">
        <p className="text-sm font-semibold text-text-primary">Theme</p>
        <p className="mt-1 text-sm text-text-secondary">Switch between light and dark interfaces.</p>
        <div className="mt-4">
          <ThemeToggle />
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
