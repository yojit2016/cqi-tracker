import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCQIData } from '../../hooks/useCQIData';
import Button from '../../components/common/Button';
import InputField from '../../components/common/InputField';
import SelectField from '../../components/common/SelectField';
import ActionModal from '../../components/feedback/ActionModal';
import { mockUsers, mockDepartments } from '../../data/mockCQIData';
import { Calendar, User, Plus, Edit, Trash2, ArrowLeft, ArrowRight, Clipboard } from 'lucide-react';

const LANES = [
  { id: 'pending', title: 'Pending', bg: 'bg-slate-50 dark:bg-slate-900/30' },
  { id: 'in-progress', title: 'In Progress', bg: 'bg-info/5 dark:bg-info/10' },
  { id: 'under-review', title: 'Under Review', bg: 'bg-warning/5 dark:bg-warning/10' },
  { id: 'resolved', title: 'Resolved', bg: 'bg-success/5 dark:bg-success/10' },
  { id: 'delayed', title: 'Delayed / Overdue', bg: 'bg-error/5 dark:bg-error/10' },
];

const CorrectiveActionsPage = () => {
  const {
    correctiveActions,
    selectedDept,
    createCorrectiveAction,
    updateCorrectiveAction,
    deleteCorrectiveAction,
    transitionActionStatus,
  } = useCQIData();

  const [selectedPriority, setSelectedPriority] = useState('ALL');
  const [boardSearch, setBoardSearch] = useState('');
  
  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeAction, setActiveAction] = useState(null);

  // Form Fields State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [outcomeId, setOutcomeId] = useState('CO-3 (Assessment Gap)');
  const [courseName, setCourseName] = useState('');
  const [deptId, setDeptId] = useState('COMP');
  const [priority, setPriority] = useState('medium');
  const [assignedUserId, setAssignedUserId] = useState('u2');
  const [status, setStatus] = useState('pending');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState({});

  // Filter actions based on search/scoping/priority
  const getFilteredActions = () => {
    return correctiveActions.filter((a) => {
      // Dept Scoping
      if (selectedDept !== 'ALL' && a.departmentId !== selectedDept) return false;
      // Search Box
      if (boardSearch && !a.title.toLowerCase().includes(boardSearch.toLowerCase()) && !a.courseName.toLowerCase().includes(boardSearch.toLowerCase())) return false;
      // Priority
      if (selectedPriority !== 'ALL' && a.priority !== selectedPriority) return false;
      return true;
    });
  };

  const filtered = getFilteredActions();

  // Reset form
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setOutcomeId('CO-3 (Assessment Gap)');
    setCourseName('');
    setDeptId('COMP');
    setPriority('medium');
    setAssignedUserId('u2');
    setStatus('pending');
    setDueDate('');
    setErrors({});
  };

  const handleCreate = (e) => {
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
    resetForm();
    setShowAddModal(false);
  };

  const handleEditOpen = (action) => {
    setActiveAction(action);
    setTitle(action.title);
    setDescription(action.description);
    setOutcomeId(action.outcomeId);
    setCourseName(action.courseName);
    setDeptId(action.departmentId);
    setPriority(action.priority);
    setAssignedUserId(action.assignedUserId);
    setStatus(action.status);
    setDueDate(action.dueDate);
    setShowEditModal(true);
  };

  const handleEditSave = (e) => {
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

    updateCorrectiveAction(activeAction.id, {
      title,
      description,
      outcomeId,
      courseName,
      departmentId: deptId,
      status,
      priority,
      assignedUserId,
      dueDate,
    });
    resetForm();
    setShowEditModal(false);
    setActiveAction(null);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this corrective action plan? This will clear all associated timeline records.')) {
      deleteCorrectiveAction(id);
      setShowEditModal(false);
      resetForm();
      setActiveAction(null);
    }
  };

  // Move status helpers
  const handleShiftStatus = (id, direction) => {
    const action = correctiveActions.find(a => a.id === id);
    if (!action) return;
    
    const currentIndex = LANES.findIndex(l => l.id === action.status);
    let nextIndex = currentIndex + direction;
    if (nextIndex >= 0 && nextIndex < LANES.length) {
      transitionActionStatus(id, LANES[nextIndex].id);
    }
  };

  const getAssigneeName = (userId) => {
    const user = mockUsers.find(u => u.id === userId);
    return user ? user.name : 'Unassigned';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-text-secondary">Remediation Board</p>
          <h2 className="text-2xl font-bold text-text-primary tracking-tight mt-1">CQI Corrective Actions Kanban</h2>
        </div>
        <Button
          variant="primary"
          onClick={() => {
            resetForm();
            setShowAddModal(true);
          }}
          icon={<Plus className="w-4 h-4" />}
        >
          Initiate Corrective Task
        </Button>
      </div>

      {/* Board Filters Row */}
      <section className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center flex-1 max-w-2xl">
          {/* Quick Search */}
          <div className="flex flex-1 items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs text-text-secondary">
            <Clipboard className="w-3.5 h-3.5 text-text-tertiary" />
            <input
              type="text"
              value={boardSearch}
              onChange={(e) => setBoardSearch(e.target.value)}
              placeholder="Search Subject or Action..."
              className="w-full bg-transparent text-text-primary outline-none"
            />
          </div>
          {/* Priority Scoper */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-text-secondary">Priority:</span>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="rounded-md border border-border bg-background px-3 py-1.5 text-xs text-text-primary outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="ALL">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
        </div>
        <div className="text-[11px] text-text-tertiary">
          Showing <span className="font-semibold text-text-secondary">{filtered.length}</span> actions under Dept: <span className="font-semibold text-primary">{selectedDept}</span>
        </div>
      </section>

      {/* Kanban lanes workspace */}
      <div className="flex gap-4 overflow-x-auto pb-4 min-h-[500px] select-none">
        {LANES.map((lane) => {
          const laneActions = filtered.filter((a) => a.status === lane.id);

          return (
            <div
              key={lane.id}
              className={`flex-shrink-0 w-72 rounded-lg border border-border/80 p-4 flex flex-col gap-4 ${lane.bg}`}
            >
              {/* Lane Header */}
              <div className="flex items-center justify-between border-b border-border pb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary flex items-center gap-1.5">
                  {lane.title}
                  <span className="rounded-full bg-slate-200 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-text-secondary leading-none">
                    {laneActions.length}
                  </span>
                </h3>
              </div>

              {/* Lane Cards container */}
              <div className="flex-grow space-y-3 overflow-y-auto max-h-[600px] pr-1">
                {laneActions.map((action) => (
                  <motion.div
                    key={action.id}
                    layoutId={`card-${action.id}`}
                    whileHover={{ y: -3 }}
                    className="group rounded-md border border-border bg-surface p-4 shadow-sm hover:shadow-md transition-all duration-fast relative cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-1.5">
                      <span className="text-[9px] font-bold text-primary">{action.id}</span>
                      <span className="text-[9px] font-bold bg-surface-hover px-1.5 py-0.5 rounded text-text-secondary">
                        {action.outcomeId.split(' ')[0]}
                      </span>
                    </div>

                    <div onClick={() => handleEditOpen(action)} className="mt-2 space-y-1">
                      <p className="font-bold text-xs text-text-primary group-hover:text-primary transition-colors leading-tight">
                        {action.title}
                      </p>
                      <p className="text-[10px] text-text-secondary">
                        Subject: <span className="font-semibold">{action.courseName}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-border mt-3 pt-3 text-[10px] text-text-secondary">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-text-tertiary" />
                        {action.dueDate}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-text-primary">
                        <User className="w-3 h-3 text-text-tertiary" />
                        {getAssigneeName(action.assignedUserId).split(' ')[1]}
                      </span>
                    </div>

                    {/* Quick Move Shift controls */}
                    <div className="flex justify-end gap-1.5 border-t border-border/60 mt-3 pt-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-normal">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShiftStatus(action.id, -1);
                        }}
                        disabled={lane.id === 'pending'}
                        className="p-1 rounded hover:bg-surface-hover border border-border text-text-secondary disabled:opacity-30 disabled:hover:bg-transparent"
                        aria-label="Shift Left"
                      >
                        <ArrowLeft className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditOpen(action);
                        }}
                        className="p-1 rounded hover:bg-surface-hover border border-border text-text-secondary"
                        aria-label="Edit item"
                      >
                        <Edit className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShiftStatus(action.id, 1);
                        }}
                        disabled={lane.id === 'delayed'}
                        className="p-1 rounded hover:bg-surface-hover border border-border text-text-secondary disabled:opacity-30 disabled:hover:bg-transparent"
                        aria-label="Shift Right"
                      >
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                ))}
                {laneActions.length === 0 && (
                  <p className="text-[10px] text-text-tertiary text-center py-6 border border-dashed border-border/55 rounded-md">
                    No actions in this column
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Task Modal */}
      <AnimatePresence>
        {showAddModal && (
          <ActionModal
            isOpen={showAddModal}
            onClose={() => setShowAddModal(false)}
            title="⚡ Initiate Corrective Action"
            footer={
              <div className="flex gap-2 justify-end w-full">
                <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleCreate}>
                  Create Action Plan
                </Button>
              </div>
            }
          >
            <form onSubmit={handleCreate} className="space-y-4">
              <InputField
                label="Action Title / Name"
                placeholder="e.g. Realignment of Laboratory hours"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={errors.title}
              />
              <InputField
                label="Action Description"
                placeholder="Provide details about outcomes, materials, and student reviews..."
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
                  label="Course Outcome Gap Mapped"
                  placeholder="e.g. CO-3 (Assessment Gap)"
                  value={outcomeId}
                  onChange={(e) => setOutcomeId(e.target.value)}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <SelectField
                  label="Department"
                  value={deptId}
                  onChange={(e) => setDeptId(e.target.value)}
                  options={mockDepartments.map(d => ({ value: d.id, label: d.name }))}
                />
                <SelectField
                  label="Priority"
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
                  options={mockUsers.map(u => ({ value: u.id, label: `${u.name} (${u.role})` }))}
                />
                <InputField
                  label="Target Completion Date"
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

      {/* Edit Task Modal */}
      <AnimatePresence>
        {showEditModal && activeAction && (
          <ActionModal
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            title={`🛠️ Edit Corrective Action: ${activeAction.id}`}
            footer={
              <div className="flex gap-2 justify-between w-full">
                <Button
                  variant="danger"
                  onClick={() => handleDelete(activeAction.id)}
                  icon={<Trash2 className="w-4 h-4" />}
                >
                  Delete Plan
                </Button>
                <div className="flex gap-2">
                  <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleEditSave}>
                    Save Changes
                  </Button>
                </div>
              </div>
            }
          >
            <form onSubmit={handleEditSave} className="space-y-4">
              <InputField
                label="Action Title / Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={errors.title}
              />
              <InputField
                label="Action Description"
                multiline
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                error={errors.description}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <InputField
                  label="Course / Subject Name"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  error={errors.courseName}
                />
                <InputField
                  label="Course Outcome Gap Mapped"
                  value={outcomeId}
                  onChange={(e) => setOutcomeId(e.target.value)}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <SelectField
                  label="Department"
                  value={deptId}
                  onChange={(e) => setDeptId(e.target.value)}
                  options={mockDepartments.map(d => ({ value: d.id, label: d.name }))}
                />
                <SelectField
                  label="Priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  options={[
                    { value: 'low', label: 'Low Priority' },
                    { value: 'medium', label: 'Medium Priority' },
                    { value: 'high', label: 'High Priority' },
                  ]}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <SelectField
                  label="Assignee Professor"
                  value={assignedUserId}
                  onChange={(e) => setAssignedUserId(e.target.value)}
                  options={mockUsers.map(u => ({ value: u.id, label: `${u.name} (${u.role})` }))}
                  className="sm:col-span-2"
                />
                <SelectField
                  label="Board Status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  options={LANES.map(l => ({ value: l.id, label: l.title }))}
                />
              </div>
              <InputField
                label="Target Completion Date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                error={errors.dueDate}
              />
            </form>
          </ActionModal>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CorrectiveActionsPage;
