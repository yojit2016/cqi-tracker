import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCQIData } from '../../hooks/useCQIData';
import BrandEdge from '../../components/common/BrandEdge';
import TrendChart from '../../components/charts/TrendChart';
import DistributionChart from '../../components/charts/DistributionChart';
import PerformanceHeatmap from '../../components/charts/PerformanceHeatmap';
import DepartmentFilter from '../../components/filters/DepartmentFilter';
import DateRangeFilter from '../../components/filters/DateRangeFilter';
import StatusFilter from '../../components/filters/StatusFilter';
import KPICard from '../../components/common/KPICard';
import { BarChart3, TrendingUp, CheckCircle, Clock } from 'lucide-react';

const AnalyticsPage = () => {
  const { correctiveActions, selectedDept, setSelectedDept } = useCQIData();

  // Filters state
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState(['pending', 'in-progress', 'under-review', 'resolved', 'delayed']);

  // Filter actions based on ALL filters
  const getFilteredActions = () => {
    return correctiveActions.filter((action) => {
      // 1. Department Scope
      if (selectedDept !== 'ALL' && action.departmentId !== selectedDept) return false;

      // 2. Status Scope
      if (!selectedStatuses.includes(action.status)) return false;

      // 3. Date Scope
      if (startDate && action.createdAt < startDate) return false;
      if (endDate && action.createdAt > endDate) return false;

      return true;
    });
  };

  const scopedActions = getFilteredActions();

  // Dynamic calculations for sub-charts
  const total = scopedActions.length;
  const resolved = scopedActions.filter((a) => a.status === 'resolved').length;
  const active = scopedActions.filter((a) => a.status === 'in-progress' || a.status === 'pending').length;
  const delayed = scopedActions.filter((a) => a.status === 'delayed').length;

  const counts = {
    pending: scopedActions.filter((a) => a.status === 'pending').length,
    'in-progress': scopedActions.filter((a) => a.status === 'in-progress').length,
    'under-review': scopedActions.filter((a) => a.status === 'under-review').length,
    resolved,
    delayed,
  };

  // Calculate department average score based on corrective action statuses
  const calculateDeptAverage = (deptId) => {
    const deptActions = correctiveActions.filter((a) => a.departmentId === deptId);
    if (deptActions.length === 0) return 80.0;
    
    const sum = deptActions.reduce((acc, curr) => {
      if (curr.status === 'resolved') return acc + 95;
      if (curr.status === 'in-progress') return acc + 80;
      if (curr.status === 'under-review') return acc + 70;
      if (curr.status === 'delayed') return acc + 50;
      return acc + 60; // pending
    }, 0);

    return parseFloat((sum / deptActions.length).toFixed(1));
  };

  const averages = {
    COMP: calculateDeptAverage('COMP'),
    IT: calculateDeptAverage('IT'),
    EXTC: calculateDeptAverage('EXTC'),
    MECH: calculateDeptAverage('MECH'),
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
        title="OBE Course Assessment & Analytics Module"
        subtitle="Perform quality audit compliance checks and track outcomes"
      />

      {/* Scoping Filters (AOS fade-in) */}
      <section data-aos="fade-up" className="rounded-lg border border-border bg-surface p-6 shadow-sm space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary">Scope Boundaries & Diagnostic Filters</h4>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-start">
          <DepartmentFilter selected={selectedDept} onChange={setSelectedDept} />
          <DateRangeFilter
            startDate={startDate}
            endDate={endDate}
            onChange={(start, end) => {
              setStartDate(start);
              setEndDate(end);
            }}
          />
          <StatusFilter selected={selectedStatuses} onChange={setSelectedStatuses} className="sm:col-span-2 lg:col-span-1" />
        </div>
      </section>

      {/* KPI Stats overview row (AOS fade-in with delay) */}
      <section data-aos="fade-up" data-aos-delay="100" className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Audits"
          value={String(total)}
          delta="Total Gaps Mapped"
          meta="Within diagnostic filters"
          status="neutral"
        />
        <KPICard
          title="Resolved Actions"
          value={String(resolved)}
          delta={`${total > 0 ? Math.round((resolved / total) * 100) : 0}% Rate`}
          meta="Compliance resolved"
          status="positive"
        />
        <KPICard
          title="Active Actions"
          value={String(active)}
          delta="Under implementation"
          meta="Requires active hours"
          status="neutral"
        />
        <KPICard
          title="Delayed Issues"
          value={String(delayed)}
          delta={`${total > 0 ? Math.round((delayed / total) * 100) : 0}% Overdue`}
          meta="Action timeline delayed"
          status="negative"
        />
      </section>

      {/* Main Graphs split */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Big Panel: Trend Line and Heatmap */}
        <div className="lg:col-span-2 space-y-6">
          {/* Line Chart (AOS fade-right) */}
          <div data-aos="fade-right" className="rounded-lg border border-border bg-surface p-6 shadow-sm">
            <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-primary" />
              Course Attainment outcome Trends
            </h3>
            <div className="h-72">
              <TrendChart department={selectedDept} />
            </div>
          </div>

          {/* Audit Heatmap (AOS fade-right with delay) */}
          <div data-aos="fade-right" data-aos-delay="100" className="rounded-lg border border-border bg-surface p-6 shadow-sm">
            <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-secondary" />
              Compliance Density Grid
            </h3>
            <PerformanceHeatmap />
          </div>
        </div>

        {/* Right Panel: Doughnut and Comparison Bars */}
        <div className="space-y-6">
          {/* Doughnut status distribution (AOS fade-left) */}
          <div data-aos="fade-left" className="rounded-lg border border-border bg-surface p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-success" />
                Action status distribution
              </h3>
              <p className="text-xs text-text-secondary leading-normal mb-6">
                Visual breakdown of current active, delayed, and resolved corrective audits.
              </p>
            </div>
            <div className="h-56">
              <DistributionChart type="donut" data={counts} />
            </div>
          </div>

          {/* Department Benchmark comparison (AOS fade-left with delay) */}
          <div data-aos="fade-left" data-aos-delay="100" className="rounded-lg border border-border bg-surface p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-info" />
                Attainment Score by Department
              </h3>
              <p className="text-xs text-text-secondary leading-normal mb-6">
                Calculated outcome averages mapping current compliance levels.
              </p>
            </div>
            <div className="h-56">
              <DistributionChart type="bar" data={averages} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalyticsPage;
