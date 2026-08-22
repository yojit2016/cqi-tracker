import { motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import ThemeToggle from '../common/ThemeToggle';
import { navigationItems } from '../../config/navigation';
import { ChevronLeft, ChevronRight, GraduationCap } from 'lucide-react';
import { useState } from 'react';

const Sidebar = ({ mobileOpen, onClose }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Mobile backdrop overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      <motion.aside
        initial={false}
        animate={{
          x: mobileOpen ? 0 : undefined,
          width: collapsed ? '80px' : '288px',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className={`fixed inset-y-0 left-0 z-40 overflow-y-auto border-r border-border bg-surface px-4 py-6 shadow-lg shadow-slate-900/5 dark:shadow-none flex flex-col justify-between md:sticky md:top-0 md:h-screen md:translate-x-0 flex-shrink-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-8">
          {/* Logo Header */}
          <div className="flex items-center justify-between gap-2 px-2">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-primary text-white shadow-sm">
                <GraduationCap className="w-5 h-5" />
              </div>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="leading-tight"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-secondary">SOMAIYA</p>
                  <h1 className="text-md font-bold text-text-primary tracking-tight">CQI Tracker</h1>
                </motion.div>
              )}
            </div>
            
            {/* Collapse Trigger (Desktop only) */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden md:flex h-6 w-6 items-center justify-center rounded-full border border-border bg-surface hover:bg-surface-hover text-text-secondary transition outline-none"
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
            </button>
            
            {/* Mobile close button */}
            <button
              onClick={onClose}
              className="md:hidden h-7 w-7 flex items-center justify-center rounded-full border border-border bg-surface text-text-secondary hover:bg-surface-hover"
              aria-label="Close sidebar"
            >
              ✕
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5">
            {navigationItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`group relative flex items-center gap-3 rounded-md px-3.5 py-3.5 text-xs font-semibold select-none outline-none transition duration-fast focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-[#161E2E] focus:outline-none ${
                    isActive
                      ? 'text-white'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover/60'
                  }`}
                  onClick={onClose}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-sidebar-indicator"
                      className="absolute inset-0 bg-primary rounded-md shadow-sm z-0"
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    />
                  )}
                  
                  {/* Underlay highlight on hover for inactive items */}
                  <span className="relative z-10 flex items-center gap-3 w-full">
                    <span className="font-bold flex-shrink-0">
                      {item.label.substring(0, 2).toUpperCase()}
                    </span>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="truncate"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Theme Toggler Panel */}
        <div className="space-y-4 pt-4 border-t border-border">
          {!collapsed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-lg bg-surface-hover/40 p-4 border border-border/50"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-text-primary">Interface Theme</p>
              <p className="mt-1 text-[11px] text-text-secondary">Switch colors instantly.</p>
              <div className="mt-3">
                <ThemeToggle />
              </div>
            </motion.div>
          ) : (
            <div className="flex justify-center">
              <ThemeToggle iconOnly />
            </div>
          )}
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
