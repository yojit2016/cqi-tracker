const ReportsPage = () => (
  <div className="space-y-8">
    <div className="rounded-3xl bg-surface p-6 shadow-md border border-border">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-secondary">Reports</p>
        <h1 className="text-3xl font-semibold text-text-primary">CQI Reporting</h1>
        <p className="text-text-secondary max-w-3xl">
          Access summaries, export audit documents, and review report-ready insights for quality improvement.
        </p>
      </div>
      <div className="mt-8 rounded-3xl border border-dashed border-border bg-background p-8 text-center">
        <p className="text-xl font-semibold text-text-primary">Coming Soon</p>
        <p className="mt-3 text-text-secondary">
          Reporting tools will be added in the next sprint to support CQI documentation workflows.
        </p>
      </div>
    </div>
  </div>
);

export default ReportsPage;
