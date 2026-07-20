import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCQIData } from '../../hooks/useCQIData';
import BrandEdge from '../../components/common/BrandEdge';
import Button from '../../components/common/Button';
import DepartmentFilter from '../../components/filters/DepartmentFilter';
import DateRangeFilter from '../../components/filters/DateRangeFilter';
import StatusFilter from '../../components/filters/StatusFilter';
import StatusBadge from '../../components/common/StatusBadge';
import { mockDepartments, mockUsers } from '../../data/mockCQIData';
import { Printer, FileSpreadsheet, Calendar, GraduationCap } from 'lucide-react';

const ReportsPage = () => {
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

  // Generate CSV data download link
  const handleExportCSV = () => {
    if (scopedActions.length === 0) {
      alert('No data available to export.');
      return;
    }

    const sanitizeCell = (val) => {
      if (val === undefined || val === null) return '';
      const str = String(val);
      if (str.startsWith('=') || str.startsWith('+') || str.startsWith('-') || str.startsWith('@')) {
        return `'${str}`;
      }
      return str;
    };

    const headers = ['Action ID', 'Title', 'Outcome Gap', 'Course', 'Department', 'Status', 'Priority', 'Due Date', 'Created At', 'Resolved At'];
    
    const rows = scopedActions.map((a) => {
      const titleClean = sanitizeCell(a.title);
      const courseClean = sanitizeCell(a.courseName);
      const outcomeClean = sanitizeCell(a.outcomeId);
      const deptClean = sanitizeCell(a.departmentId);
      const statusClean = sanitizeCell(a.status);
      const priorityClean = sanitizeCell(a.priority);

      const escapedTitle = `"${titleClean.replace(/"/g, '""')}"`;
      const escapedCourse = `"${courseClean.replace(/"/g, '""')}"`;
      
      return [
        a.id,
        escapedTitle,
        outcomeClean,
        escapedCourse,
        deptClean,
        statusClean,
        priorityClean,
        a.dueDate,
        a.createdAt,
        a.resolvedAt || 'N/A',
      ];
    });

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `OBE_CQI_Audit_Report_${selectedDept}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const getAssigneeName = (userId) => {
    const user = mockUsers.find((u) => u.id === userId);
    return user ? user.name : 'Unassigned';
  };

  const getDeptLabel = () => {
    if (selectedDept === 'ALL') return 'All Academic Departments';
    const dept = mockDepartments.find((d) => d.id === selectedDept);
    return dept ? dept.name : 'All Academic Departments';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      <div className="no-print">
        <BrandEdge
          title="CQI Accreditation Summary & Audit Reports"
          subtitle="Generate, preview, and print compliance reports or export spreadsheet logs"
        />
      </div>

      {/* Filter Toolbar (hidden on print) */}
      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm space-y-4 no-print">
        <div className="flex items-center gap-2 pb-2 border-b border-border">
          <Calendar className="w-4 h-4 text-primary" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary">Customize Report Scope</h4>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* Report Preview Document */}
      <section data-aos="fade-up" className="rounded-lg border border-border bg-surface p-8 shadow-sm print-layout space-y-8 relative">
        {/* Print Header (Only visible on print / styled beautifully) */}
        <div className="hidden print:flex items-center justify-between border-b-2 border-primary pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded bg-primary text-white">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-secondary leading-none">SOMAIYA VIDYAVIHAR</p>
              <h2 className="text-lg font-bold text-text-primary tracking-tight mt-1 leading-none">OBE Analytics System</h2>
            </div>
          </div>
          <div className="text-right text-[10px] text-text-tertiary">
            <p>Accreditation Cycle: 2026-27</p>
            <p>Date Generated: {new Date().toISOString().split('T')[0]}</p>
          </div>
        </div>

        {/* Action button row (hidden on print) */}
        <div className="flex flex-wrap gap-2.5 justify-end border-b border-border pb-4 no-print">
          <Button
            variant="secondary"
            onClick={handleExportCSV}
            icon={<FileSpreadsheet className="w-4 h-4 text-success" />}
          >
            Export CSV Spreadsheet
          </Button>
          <Button
            variant="primary"
            onClick={handlePrint}
            icon={<Printer className="w-4 h-4" />}
          >
            Print PDF Report
          </Button>
        </div>

        {/* Report Metadata */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 bg-slate-50 dark:bg-slate-900/30 rounded-lg p-4 border border-border">
          <div className="text-xs">
            <span className="text-[9px] uppercase font-bold text-text-tertiary tracking-wider block">Scope Scope</span>
            <p className="font-bold text-text-primary mt-1">{getDeptLabel()}</p>
          </div>
          <div className="text-xs">
            <span className="text-[9px] uppercase font-bold text-text-tertiary tracking-wider block">Time Interval</span>
            <p className="font-bold text-text-primary mt-1">
              {startDate || 'Beginning'} to {endDate || 'Current'}
            </p>
          </div>
          <div className="text-xs">
            <span className="text-[9px] uppercase font-bold text-text-tertiary tracking-wider block">Total Mapped Gaps</span>
            <p className="font-bold text-text-primary mt-1">{scopedActions.length} Actions</p>
          </div>
          <div className="text-xs">
            <span className="text-[9px] uppercase font-bold text-text-tertiary tracking-wider block">Attainment Status</span>
            <p className="font-bold text-text-primary mt-1">
              {scopedActions.filter(a => a.status === 'resolved').length} Resolved / {scopedActions.filter(a => a.status === 'delayed').length} Overdue
            </p>
          </div>
        </div>

        {/* Report Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary">Accreditation Audit Trail Registry</h3>
          </div>
          
          <div className="overflow-x-auto border border-border rounded-lg">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border bg-slate-50 dark:bg-slate-800/40">
                  <th className="py-3 px-4 font-bold text-text-primary">Action ID</th>
                  <th className="py-3 px-4 font-bold text-text-primary">Syllabus Gap Remediation</th>
                  <th className="py-3 px-4 font-bold text-text-primary">Subject</th>
                  <th className="py-3 px-4 font-bold text-text-primary">Dept</th>
                  <th className="py-3 px-4 font-bold text-text-primary">Status</th>
                  <th className="py-3 px-4 font-bold text-text-primary">Priority</th>
                  <th className="py-3 px-4 font-bold text-text-primary">Assignee</th>
                  <th className="py-3 px-4 font-bold text-text-primary">Due Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {scopedActions.map((action) => (
                  <tr key={action.id} className="hover:bg-slate-50/50 transition">
                    <td className="py-3 px-4 font-bold text-primary">{action.id}</td>
                    <td className="py-3 px-4 text-text-primary font-medium">{action.title}</td>
                    <td className="py-3 px-4 text-text-secondary">{action.courseName}</td>
                    <td className="py-3 px-4 font-bold text-text-secondary">{action.departmentId}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={action.status} />
                    </td>
                    <td className="py-3 px-4 capitalize font-semibold">{action.priority}</td>
                    <td className="py-3 px-4 text-text-secondary">{getAssigneeName(action.assignedUserId)}</td>
                    <td className="py-3 px-4 text-text-secondary">{action.dueDate}</td>
                  </tr>
                ))}
                {scopedActions.length === 0 && (
                  <tr>
                    <td colSpan="8" className="py-8 text-center text-text-tertiary">
                      No corrective actions match the specified report query parameters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Printable Footer */}
        <div className="hidden print:block border-t border-border pt-6 mt-12 text-center text-[10px] text-text-tertiary">
          <p>This is an automated OBE CQI Summary generated from the Somaiya Vidyavihar University CQI Tracker Platform.</p>
          <p className="mt-1">© 2026 Somaiya Vidyavihar University. All rights reserved.</p>
        </div>
      </section>
    </motion.div>
  );
};

export default ReportsPage;
