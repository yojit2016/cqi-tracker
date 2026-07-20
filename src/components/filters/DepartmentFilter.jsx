import { mockDepartments } from '../../data/mockCQIData';

const DepartmentFilter = ({ selected, onChange, className = '' }) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">Scoping Department</span>
      <div className="flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => onChange('ALL')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-sm border transition-all duration-fast outline-none ${
            selected === 'ALL'
              ? 'border-primary bg-primary text-white shadow-sm'
              : 'border-border bg-surface text-text-secondary hover:bg-surface-hover'
          }`}
        >
          All Departments
        </button>
        {mockDepartments.map((dept) => (
          <button
            key={dept.id}
            type="button"
            onClick={() => onChange(dept.id)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-sm border transition-all duration-fast outline-none ${
              selected === dept.id
                ? 'border-primary bg-primary text-white shadow-sm'
                : 'border-border bg-surface text-text-secondary hover:bg-surface-hover'
            }`}
          >
            {dept.code}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DepartmentFilter;
