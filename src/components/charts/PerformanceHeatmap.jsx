import { useCQIData } from '../../hooks/useCQIData';
import { mockDepartments } from '../../data/mockCQIData';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const PerformanceHeatmap = ({ className = '' }) => {
  const { correctiveActions, timelineEvents } = useCQIData();
  const [hoveredCell, setHoveredCell] = useState(null);

  // Group events by department and month
  // Month index is 0-11
  const getCellIntensity = (deptId, monthIdx) => {
    // Check timeline events matching department and month
    const count = timelineEvents.filter((event) => {
      const parentAction = correctiveActions.find((a) => a.id === event.actionId);
      if (!parentAction || parentAction.departmentId !== deptId) return false;
      
      const eventDate = new Date(event.date);
      // Ensure date is valid and month index matches
      return !isNaN(eventDate.getTime()) && eventDate.getMonth() === monthIdx;
    }).length;

    return count;
  };

  const getCellColor = (count) => {
    if (count === 0) return 'bg-slate-100 dark:bg-slate-800/40 text-text-tertiary';
    if (count === 1) return 'bg-primary/20 text-primary hover:scale-105';
    if (count === 2) return 'bg-primary/50 text-white hover:scale-105';
    return 'bg-primary text-white hover:scale-105';
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between text-xs text-text-secondary">
        <span className="font-semibold">Audit Compliance Density Heatmap</span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-slate-100 dark:bg-slate-800/40 border border-border" /> 0</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-primary/20" /> 1</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-primary/50" /> 2</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-primary" /> 3+</span>
        </div>
      </div>

      <div className="overflow-x-auto pb-2 relative">
        <div className="min-w-[640px] grid grid-cols-[80px_1fr] gap-2">
          {/* Header row */}
          <div className="h-6" />
          <div className="grid grid-cols-12 gap-1 text-center text-[10px] font-bold uppercase tracking-wider text-text-tertiary">
            {MONTHS.map((m) => (
              <div key={m}>{m}</div>
            ))}
          </div>

          {/* Department rows */}
          {mockDepartments.map((dept) => (
            <div key={dept.id} className="contents">
              {/* Row Label */}
              <div className="flex items-center text-xs font-bold text-text-secondary h-8">
                {dept.code}
              </div>
              
              {/* Heatmap cells */}
              <div className="grid grid-cols-12 gap-1">
                {MONTHS.map((_, monthIdx) => {
                  const count = getCellIntensity(dept.id, monthIdx);
                  const colorClass = getCellColor(count);

                  return (
                    <div
                      key={monthIdx}
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setHoveredCell({
                          dept: dept.name,
                          month: MONTHS[monthIdx],
                          count,
                          x: e.currentTarget.offsetLeft,
                          y: e.currentTarget.offsetTop - 45,
                        });
                      }}
                      onMouseLeave={() => setHoveredCell(null)}
                      className={`h-8 rounded-sm transition-all duration-fast flex items-center justify-center text-[10px] font-bold border border-border/30 cursor-pointer ${colorClass}`}
                    >
                      {count > 0 ? count : ''}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Custom floating tooltip */}
        <AnimatePresence>
          {hoveredCell && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute pointer-events-none rounded bg-slate-900 text-white text-[10px] p-2 shadow-lg leading-tight z-10 w-36"
              style={{
                left: hoveredCell.x - 45,
                top: hoveredCell.y,
              }}
            >
              <p className="font-bold">{hoveredCell.dept}</p>
              <p className="opacity-90 mt-0.5">{hoveredCell.month}: {hoveredCell.count} audit events</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PerformanceHeatmap;
