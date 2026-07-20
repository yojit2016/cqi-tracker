import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCQIData } from '../../hooks/useCQIData';
import KPICard from '../../components/common/KPICard';
import BrandEdge from '../../components/common/BrandEdge';
import TrendChart from '../../components/charts/TrendChart';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';
import InputField from '../../components/common/InputField';
import SelectField from '../../components/common/SelectField';
import ActionModal from '../../components/feedback/ActionModal';
import { mockUsers, mockDepartments } from '../../data/mockCQIData';
import { Plus, Printer, FileText, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const {
    correctiveActions,
    timelineEvents,
    selectedDept,
    createCorrectiveAction,
  } = useCQIData();

  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [outcomeId, setOutcomeId] = useState('CO-3 (Assessment Gap)');
  const [courseName, setCourseName] = useState('');
  const [deptId, setDeptId] = useState('COMP');
  const [priority, setPriority] = useState('medium');
  const [assignedUserId, setAssignedUserId] = useState('u2');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState({});

  // Filter actions based on globally selected department in navbar
  const scopedActions = selectedDept === 'ALL'
    ? correctiveActions
    : correctiveActions.filter((a) => a.departmentId === selectedDept);

  const scopedTimeline = selectedDept === 'ALL'
    ? timelineEvents
    : timelineEvents.filter((e) => {
        const action = correctiveActions.find((a) => a.id === e.actionId);
        return action && action.departmentId === selectedDept;
      });

  // Dynamic KPI calculations
  const total = scopedActions.length;
  const resolvedCount = scopedActions.filter((a) => a.status === 'resolved').length;
  const pendingCount = scopedActions.filter((a) => a.status === 'pending').length;
  const delayedCount = scopedActions.filter((a) => a.status === 'delayed').length;
  const openCount = scopedActions.filter((a) => a.status !== 'resolved').length;

  const qualityIndex = total > 0 ? Math.round(80 + (resolvedCount / total) * 20) : 80;
  const compliance = total > 0 ? Math.round(100 - (delayedCount / total) * 30) : 100;
  const nbaStageVal = total > 0 ? Math.min(6, Math.max(1, Math.round(2 + (resolvedCount / total) * 4))) : 2;

  const kpis = [
    {
      title: 'Quality Index Score',
      value: `${qualityIndex}.0%`,
      delta: resolvedCount > 0 ? `+${resolvedCount} resolved` : '0 resolved',
      meta: `Target Attainment: 90%`,
      status: resolvedCount > 0 ? 'positive' : 'neutral',
    },
    {
      title: 'Open Actions',
      value: `${openCount} Active`,
      delta: `${pendingCount} Pending`,
      meta: 'Needs review in Bos',
      status: openCount > 3 ? 'negative' : 'neutral',
    },
    {
      title: 'Audit Compliance',
      value: `${compliance}.0%`,
      delta: delayedCount > 0 ? `-${delayedCount} delayed` : '0 delayed',
      meta: 'Target Compliance: 95%',
      status: delayedCount > 0 ? 'negative' : 'positive',
    },
    {
      title: 'NBA Prep Stage',
      value: `Step ${nbaStageVal} / 6`,
      delta: nbaStageVal >= 4 ? 'Self Assessment' : 'Curriculum Audit',
      meta: 'Accreditation prep cycle',
      status: 'positive',
    },
  ];

  const handleCreateAction = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!title) newErrors.title = 'Title is required';
    if (!description) newErrors.description = 'Description is required';
    if (!courseName) newErrors.courseName = 'Course name is required';
    if (!dueDate) newErrors.dueDate = 'Due date is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    createCorrectiveAction({
      title,
      description,
      outcomeId,
      courseName,
      departmentId: deptId,
      status: 'pending',
      priority,
      assignedUserId,
      dueDate,
    });

    // Reset Form
    setTitle('');
    setDescription('');
    setCourseName('');
    setDueDate('');
    setErrors({});
    setShowAddModal(false);
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
        title="CQI Outcome-Based Education Dashboard"
        subtitle={`Accreditation Year: 2026-27 · Department View: ${
          selectedDept === 'ALL' ? 'All Departments Combined' : selectedDept
        }`}
      />

      <section data-aos="fade-up" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <KPICard key={kpi.title} {...kpi} />
        ))}
      </section>

      {/* Main Workspace Layout split */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Line Chart Panel (AOS fade-right) */}
        <div data-aos="fade-right" className="lg:col-span-2 rounded-lg border border-border bg-surface p-6 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">OBE Attainment Trends</p>
              <h4 className="text-lg font-bold text-text-primary tracking-tight mt-1">Outcome attainment scores over semesters</h4>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-surface-hover px-3 py-1 text-xs font-medium text-text-secondary">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Sem I - Sem VI
            </div>
          </div>
          <div className="h-72">
            <TrendChart department={selectedDept} />
          </div>
        </div>

        {/* Action Panel & Activity Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions Panel (AOS fade-left) */}
          <div data-aos="fade-left" className="rounded-lg border border-border bg-surface p-6 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">Quick Actions</p>
            <h4 className="text-lg font-bold text-text-primary tracking-tight mt-1 mb-4">Execute operations</h4>
            <div className="flex flex-col gap-2.5">
              <Button
                variant="primary"
                onClick={() => setShowAddModal(true)}
                icon={<Plus className="w-4 h-4" />}
                className="w-full"
              >
                Initiate Corrective Action
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate('/reports')}
                icon={<Printer className="w-4 h-4" />}
                className="w-full"
              >
                Generate Department Audit
              </Button>
            </div>
          </div>

          {/* Activity Feed sidebar (AOS fade-left with delay) */}
          <div data-aos="fade-left" data-aos-delay="100" className="rounded-lg border border-border bg-surface p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">Activity Feed</p>
                <h4 className="text-md font-bold text-text-primary tracking-tight mt-1">Latest compliance logs</h4>
              </div>
              <button
                onClick={() => navigate('/timeline')}
                className="text-xs font-bold text-primary flex items-center gap-1 hover:underline outline-none"
              >
                Timeline <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <ul className="space-y-3.5 max-h-[170px] overflow-y-auto pr-1">
              {scopedTimeline.slice(0, 3).map((item) => (
                <li key={item.id} className="relative pl-4 border-l-2 border-border/80">
                  <div className="absolute top-1.5 left-[-4.5px] h-2 w-2 rounded-full bg-primary" />
                  <p className="font-semibold text-xs text-text-primary leading-tight">{item.title}</p>
                  <p className="text-[11px] text-text-secondary mt-0.5 leading-normal truncate">{item.description}</p>
                  <span className="text-[10px] text-text-tertiary block mt-0.5">{item.date}</span>
                </li>
              ))}
              {scopedTimeline.length === 0 && (
                <p className="text-xs text-text-tertiary text-center py-4">No recent activity logged for this selection.</p>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Gaps / Action Table Registry (AOS fade-up) */}
      <section data-aos="fade-up" className="rounded-lg border border-border bg-surface p-6 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">Active Corrective Registry</p>
            <h4 className="text-lg font-bold text-text-primary tracking-tight mt-1">Pending syllabus gaps & mapping corrections</h4>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/corrective-actions')}
            icon={<FileText className="w-3.5 h-3.5" />}
          >
            Manage Kanban Board
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-surface-hover/60">
                <th className="py-3 px-4 font-bold text-text-primary">Action ID</th>
                <th className="py-3 px-4 font-bold text-text-primary">Course Outcome Gap</th>
                <th className="py-3 px-4 font-bold text-text-primary">Course / Subject</th>
                <th className="py-3 px-4 font-bold text-text-primary">Dept</th>
                <th className="py-3 px-4 font-bold text-text-primary">Status</th>
                <th className="py-3 px-4 font-bold text-text-primary">Priority</th>
                <th className="py-3 px-4 font-bold text-text-primary">Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {scopedActions.slice(0, 5).map((action) => (
                <tr
                  key={action.id}
                  onClick={() => navigate('/corrective-actions')}
                  className="hover:bg-surface-hover/40 cursor-pointer transition duration-fast"
                >
                  <td className="py-3 px-4 font-bold text-primary">{action.id}</td>
                  <td className="py-3 px-4 text-text-primary font-medium">{action.title}</td>
                  <td className="py-3 px-4 text-text-secondary">{action.courseName}</td>
                  <td className="py-3 px-4"><span className="rounded bg-surface-hover px-2 py-0.5 font-bold">{action.departmentId}</span></td>
                  <td className="py-3 px-4">
                    <StatusBadge status={action.status} />
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`font-semibold capitalize ${
                        action.priority === 'high'
                          ? 'text-error'
                          : action.priority === 'medium'
                          ? 'text-warning'
                          : 'text-text-tertiary'
                      }`}
                    >
                      {action.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-text-secondary">{action.dueDate}</td>
                </tr>
              ))}
              {scopedActions.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-6 text-center text-text-tertiary">
                    No corrective actions found matching the filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Initiate Corrective Action Modal */}
      <AnimatePresence>
        {showAddModal && (
          <ActionModal
            isOpen={showAddModal}
            onClose={() => {
              setShowAddModal(false);
              setErrors({});
            }}
            title="⚡ Initiate Corrective Action"
            footer={
              <div className="flex gap-2 justify-end w-full">
                <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleCreateAction}>
                  Create Action Plan
                </Button>
              </div>
            }
          >
            <form onSubmit={handleCreateAction} className="space-y-4">
              <InputField
                label="Action Title / Name"
                placeholder="e.g. Map advanced laboratory hours for CO-3"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={errors.title}
              />
              <InputField
                label="Action Description"
                placeholder="Describe detail scope of corrective measures..."
                multiline
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                error={errors.description}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <InputField
                  label="Course / Subject Name"
                  placeholder="e.g. Advanced Algorithms"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  error={errors.courseName}
                />
                <InputField
                  label="Course outcome / gap mapped"
                  placeholder="e.g. CO-3 (Assessment Gap)"
                  value={outcomeId}
                  onChange={(e) => setOutcomeId(e.target.value)}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <SelectField
                  label="Department Scope"
                  value={deptId}
                  onChange={(e) => setDeptId(e.target.value)}
                  options={mockDepartments.map((d) => ({ value: d.id, label: d.name }))}
                />
                <SelectField
                  label="Priority Mapped"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  options={[
                    { value: 'low', label: 'Low Priority' },
                    { value: 'medium', label: 'Medium Priority' },
                    { value: 'high', label: 'High Priority' },
                  ]}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <SelectField
                  label="Assignee Professor"
                  value={assignedUserId}
                  onChange={(e) => setAssignedUserId(e.target.value)}
                  options={mockUsers.map((u) => ({ value: u.id, label: `${u.name} (${u.role})` }))}
                />
                <InputField
                  label="Target Resolve Date"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  error={errors.dueDate}
                />
              </div>
            </form>
          </ActionModal>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DashboardPage;
