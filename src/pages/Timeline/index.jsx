import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCQIData } from '../../hooks/useCQIData';
import BrandEdge from '../../components/common/BrandEdge';
import StatusBadge from '../../components/common/StatusBadge';
import StepIndicator from '../../components/common/StepIndicator';
import { Calendar, User, ChevronDown, ChevronUp, BookOpen, Layers } from 'lucide-react';
import { mockDepartments } from '../../data/mockCQIData';

const TimelinePage = () => {
  const { timelineEvents, correctiveActions, selectedDept, setSelectedDept } = useCQIData();
  const [expandedCard, setExpandedCard] = useState(null);
  
  // Local page filters
  const [filterPhase, setFilterPhase] = useState('ALL');
  const [showGaps, setShowGaps] = useState(true);
  const [showRemediation, setShowRemediation] = useState(true);

  // Accreditation wizard steps at the top
  const steps = [
    { label: 'Gap Analysis', subtitle: 'Audit shortfalls' },
    { label: 'Action Design', subtitle: 'Remediation specs' },
    { label: 'Dept Review', subtitle: 'Board approval' },
    { label: 'Implementation', subtitle: 'Action in labs' },
    { label: 'Evaluation', subtitle: 'Attainment test' },
    { label: 'Accredited', subtitle: 'Compliance sign-off' },
  ];

  // Calculate current stage dynamically based on resolved tasks
  const totalActions = correctiveActions.length;
  const resolvedActions = correctiveActions.filter(a => a.status === 'resolved').length;
  const activeStep = totalActions > 0 ? Math.min(5, Math.max(0, Math.floor((resolvedActions / totalActions) * 6))) : 2;

  // Filter timeline events
  const filteredEvents = timelineEvents.filter((event) => {
    // 1. Department scoping
    const action = correctiveActions.find((a) => a.id === event.actionId);
    if (!action) return false;
    if (selectedDept !== 'ALL' && action.departmentId !== selectedDept) return false;

    // 2. Local phase scoping
    if (filterPhase !== 'ALL' && event.phase !== filterPhase) return false;

    // 3. Category toggles
    if (!showGaps && event.phase === 'gap-analysis') return false;
    if (!showRemediation && event.phase !== 'gap-analysis') return false;

    return true;
  });

  const toggleCard = (eventId) => {
    setExpandedCard(expandedCard === eventId ? null : eventId);
  };

  const getPhaseIndex = (phase) => {
    const phases = ['gap-analysis', 'action-design', 'dept-review', 'implementation', 'evaluation', 'accredited'];
    return phases.indexOf(phase);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      <BrandEdge
        title="OBE Course Assessment & Accreditation Cycle"
        subtitle="Accreditation Timeline · Real-time Departmental compliance records"
      />

      {/* Progress Step Wizard */}
      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm overflow-hidden">
        <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-6">
          Global Accreditation Cycle Progress
        </h4>
        <div className="overflow-x-auto pb-4">
          <StepIndicator steps={steps} currentStep={activeStep} className="min-w-[800px] px-4" />
        </div>
      </section>

      {/* Main Grid: Left Filter Scope, Right Vertical Timeline */}
      <div className="grid gap-6 md:grid-cols-12">
        {/* Left Scope & Filters */}
        <div className="md:col-span-4 space-y-4">
          <div className="rounded-lg border border-border bg-surface p-6 shadow-sm sticky top-24">
            <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">Scope Boundaries</p>
            <h4 className="text-md font-bold text-text-primary tracking-tight mt-1 mb-4">Filter Timeline Trail</h4>
            
            <div className="space-y-4">
              {/* Dept select */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-secondary">Department Scope</label>
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="rounded-md border border-border bg-surface px-3 py-2 text-xs text-text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  <option value="ALL">All Departments Combined</option>
                  {mockDepartments.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Phase select */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-secondary">Compliance Phase</label>
                <select
                  value={filterPhase}
                  onChange={(e) => setFilterPhase(e.target.value)}
                  className="rounded-md border border-border bg-surface px-3 py-2 text-xs text-text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  <option value="ALL">All Phases</option>
                  <option value="gap-analysis">Phase 1: Gap Analysis</option>
                  <option value="action-design">Phase 2: Action Design</option>
                  <option value="dept-review">Phase 3: Dept Review</option>
                  <option value="implementation">Phase 4: Implementation</option>
                  <option value="evaluation">Phase 5: Evaluation</option>
                  <option value="accredited">Phase 6: Accredited</option>
                </select>
              </div>

              {/* Event toggle */}
              <div className="space-y-2 border-t border-border pt-4">
                <span className="text-xs font-semibold text-text-secondary block mb-1">Show Events</span>
                <label className="flex items-center gap-2.5 cursor-pointer text-xs text-text-secondary">
                  <input
                    type="checkbox"
                    checked={showGaps}
                    onChange={() => setShowGaps(!showGaps)}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                  Gap Identifications
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer text-xs text-text-secondary">
                  <input
                    type="checkbox"
                    checked={showRemediation}
                    onChange={() => setShowRemediation(!showRemediation)}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                  Remediation Approvals & Logs
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Vertical Timeline Feed */}
        <div className="md:col-span-8 relative">
          {filteredEvents.length > 0 && (
            /* Animated drawing connecting SVG line */
            <div className="absolute left-[26px] top-6 bottom-6 w-0.5" style={{ zIndex: 0 }}>
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <line
                  x1="1"
                  y1="0"
                  x2="1"
                  y2="100%"
                  className="stroke-slate-200 dark:stroke-slate-800"
                  strokeWidth="2"
                />
                <motion.line
                  x1="1"
                  y1="0"
                  x2="1"
                  y2="100%"
                  className="stroke-primary"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                />
              </svg>
            </div>
          )}

          <div className="space-y-6 relative" style={{ zIndex: 1 }}>
            {filteredEvents.map((event) => {
              const parentAction = correctiveActions.find((a) => a.id === event.actionId);
              const isExpanded = expandedCard === event.id;

              return (
                <div key={event.id} className="flex gap-4">
                  {/* Circle Indicator with dynamic outline */}
                  <div className="relative flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-full bg-surface border border-border shadow-sm">
                    {/* SVG Progress circle */}
                    <svg className="absolute inset-0 h-full w-full rotate-[-90deg]">
                      <circle
                        cx="26"
                        cy="26"
                        r="22"
                        className="stroke-border"
                        strokeWidth="1.5"
                        fill="transparent"
                      />
                      <motion.circle
                        cx="26"
                        cy="26"
                        r="22"
                        className="stroke-primary"
                        strokeWidth="2"
                        fill="transparent"
                        initial={{ strokeDasharray: '138 138', strokeDashoffset: 138 }}
                        animate={{
                          strokeDashoffset: 138 - (138 * (getPhaseIndex(event.phase) + 1)) / 6,
                        }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      />
                    </svg>
                    <span className="text-[10px] font-bold text-primary">
                      P{getPhaseIndex(event.phase) + 1}
                    </span>
                  </div>

                  {/* Card Container */}
                  <div className="flex-grow rounded-lg border border-border bg-surface p-4 shadow-sm hover:shadow-md transition-all duration-normal">
                    <div className="flex items-start justify-between gap-2">
                      <div className="cursor-pointer" onClick={() => toggleCard(event.id)}>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary">
                            {event.phase.replace('-', ' ')}
                          </span>
                          <span className="text-border">·</span>
                          <span className="text-[10px] font-bold text-primary">{event.actionId}</span>
                        </div>
                        <h4 className="text-sm font-bold text-text-primary mt-1 hover:text-primary transition duration-fast">
                          {event.title}
                        </h4>
                      </div>
                      <button
                        onClick={() => toggleCard(event.id)}
                        className="p-1 rounded text-text-secondary hover:bg-surface-hover transition outline-none"
                        aria-label="Toggle details"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                    <p className="text-xs text-text-secondary mt-2 leading-relaxed">
                      {event.description}
                    </p>

                    <div className="flex items-center gap-3 mt-3 text-[10px] text-text-tertiary">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {event.date}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1 font-semibold">
                        <User className="w-3.5 h-3.5" />
                        {event.updatedBy}
                      </span>
                    </div>

                    {/* Expandable Action Specs Details */}
                    <AnimatePresence>
                      {isExpanded && parentAction && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-border mt-4 pt-4 space-y-3.5">
                            <div className="grid gap-3 sm:grid-cols-2 text-xs">
                              <div className="space-y-1">
                                <span className="text-[10px] uppercase font-bold tracking-wider text-text-tertiary">Subject / Course</span>
                                <p className="font-semibold text-text-primary flex items-center gap-1.5">
                                  <BookOpen className="w-4 h-4 text-secondary" />
                                  {parentAction.courseName}
                                </p>
                              </div>
                              <div className="space-y-1">
                                <span className="text-[10px] uppercase font-bold tracking-wider text-text-tertiary">Department</span>
                                <p className="font-semibold text-text-primary flex items-center gap-1.5">
                                  <Layers className="w-4 h-4 text-primary" />
                                  {mockDepartments.find(d => d.id === parentAction.departmentId)?.name || parentAction.departmentId}
                                </p>
                              </div>
                            </div>
                            
                            <div className="grid gap-3 sm:grid-cols-2 text-xs">
                              <div className="space-y-1">
                                <span className="text-[10px] uppercase font-bold tracking-wider text-text-tertiary">Action Priority</span>
                                <p className={`font-bold capitalize ${
                                  parentAction.priority === 'high' ? 'text-error' : 'text-warning'
                                }`}>
                                  {parentAction.priority} Priority
                                </p>
                              </div>
                              <div className="space-y-1">
                                <span className="text-[10px] uppercase font-bold tracking-wider text-text-tertiary">Action Status</span>
                                <div>
                                  <StatusBadge status={parentAction.status} />
                                </div>
                              </div>
                            </div>

                            <div className="bg-surface-hover/30 rounded p-3 text-xs border border-border">
                              <p className="font-semibold text-text-primary">Parent Gap Details:</p>
                              <p className="text-text-secondary mt-1 leading-relaxed">{parentAction.description}</p>
                              <p className="text-text-tertiary mt-2">Target Completion Date: <span className="font-semibold text-text-secondary">{parentAction.dueDate}</span></p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}

            {filteredEvents.length === 0 && (
              <div className="rounded-lg border border-dashed border-border p-12 text-center">
                <p className="text-base font-bold text-text-secondary">No timeline events found</p>
                <p className="text-xs text-text-tertiary mt-2">
                  Try adjusting the department scope boundaries or phase select filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TimelinePage;
