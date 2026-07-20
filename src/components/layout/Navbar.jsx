import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, ChevronDown } from 'lucide-react';
import { useCQIData } from '../../hooks/useCQIData';
import { mockDepartments } from '../../data/mockCQIData';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onOpenSidebar }) => {
  const {
    searchQuery,
    setSearchQuery,
    selectedDept,
    setSelectedDept,
    timelineEvents,
  } = useCQIData();
  
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDepts, setShowDepts] = useState(false);

  // Get active notification list (recent 5 completed/active events)
  const notifications = timelineEvents.slice(0, 5);

  const handleDeptSelect = (deptId) => {
    setSelectedDept(deptId);
    setShowDepts(false);
  };

  const getDeptLabel = () => {
    if (selectedDept === 'ALL') return 'All Departments';
    const dept = mockDepartments.find((d) => d.id === selectedDept);
    return dept ? dept.name : 'All Departments';
  };

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
          className="inline-flex items-center justify-center rounded-md border border-border bg-surface p-2 text-text-secondary transition hover:bg-surface-hover md:hidden"
          aria-label="Open sidebar"
        >
          ☰
        </button>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-secondary">SOMAIYA OBE</p>
          <h2 className="text-xl font-bold text-text-primary tracking-tight">CQI Analytics Platform</h2>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-3">
        {/* Search Field */}
        <div className="hidden max-w-xs flex-1 items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-secondary focus-within:shadow-focus md:flex transition-shadow duration-fast">
          <Search className="w-4 h-4 text-text-tertiary" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search gaps, actions..."
            className="w-full bg-transparent text-text-primary outline-none placeholder:text-text-tertiary text-xs"
            aria-label="Global search"
          />
        </div>

        {/* Department Scope Selector */}
        <div className="relative">
          <button
            onClick={() => setShowDepts(!showDepts)}
            className="flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-xs font-semibold text-text-secondary hover:bg-surface-hover transition duration-fast outline-none"
          >
            <span>Dept: <span className="text-primary">{getDeptLabel()}</span></span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          
          <AnimatePresence>
            {showDepts && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setShowDepts(false)} />
                <motion.ul
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-1 z-30 w-56 rounded-md border border-border bg-surface py-1 shadow-lg"
                >
                  <li
                    onClick={() => handleDeptSelect('ALL')}
                    className={`px-4 py-2 text-xs cursor-pointer hover:bg-surface-hover ${
                      selectedDept === 'ALL' ? 'text-primary font-bold bg-primary-soft/30' : 'text-text-secondary'
                    }`}
                  >
                    All Departments
                  </li>
                  {mockDepartments.map((dept) => (
                    <li
                      key={dept.id}
                      onClick={() => handleDeptSelect(dept.id)}
                      className={`px-4 py-2 text-xs cursor-pointer hover:bg-surface-hover ${
                        selectedDept === dept.id ? 'text-primary font-bold bg-primary-soft/30' : 'text-text-secondary'
                      }`}
                    >
                      {dept.name}
                    </li>
                  ))}
                </motion.ul>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-md border border-border bg-surface p-2 text-text-secondary transition hover:bg-surface-hover outline-none"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-vitality" />
          </button>

          <AnimatePresence>
            {showNotifications && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setShowNotifications(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-1 z-30 w-72 rounded-md border border-border bg-surface py-2 shadow-lg text-xs"
                >
                  <div className="px-4 py-1.5 border-b border-border font-bold text-text-primary">
                    Recent Activity Logs
                  </div>
                  <ul className="max-h-60 overflow-y-auto divide-y divide-border">
                    {notifications.map((notif) => (
                      <li key={notif.id} className="p-3 hover:bg-surface-hover transition duration-fast">
                        <p className="font-semibold text-text-primary leading-tight">{notif.title}</p>
                        <p className="text-text-secondary mt-0.5 leading-normal">{notif.description}</p>
                        <span className="text-[10px] text-text-tertiary block mt-1">{notif.date} · {notif.updatedBy}</span>
                      </li>
                    ))}
                  </ul>
                  <div
                    onClick={() => {
                      setShowNotifications(false);
                      navigate('/timeline');
                    }}
                    className="text-center py-2 text-primary font-semibold border-t border-border cursor-pointer hover:bg-surface-hover"
                  >
                    View accreditation audit timeline
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* User Profile Trigger */}
        <button
          onClick={() => navigate('/settings')}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white hover:opacity-90 transition-opacity outline-none"
        >
          SK
        </button>
      </div>
    </motion.header>
  );
};

export default Navbar;
