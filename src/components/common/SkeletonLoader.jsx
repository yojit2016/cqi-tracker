const SkeletonLoader = ({ type = 'card', count = 1, className = '' }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'row':
        return (
          <div className="flex items-center gap-4 py-3 border-b border-border w-full">
            <div className="h-10 w-10 rounded-full animate-pulse bg-slate-200 dark:bg-slate-800 flex-shrink-0" />
            <div className="flex-grow space-y-2">
              <div className="h-4 w-1/3 animate-pulse bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-3 w-1/2 animate-pulse bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
            <div className="h-6 w-16 animate-pulse bg-slate-200 dark:bg-slate-800 rounded-full" />
          </div>
        );
      case 'chart':
        return (
          <div className="h-64 rounded-xl border border-border bg-surface p-6 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
              <div className="h-5 w-1/4 animate-pulse bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-5 w-20 animate-pulse bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
            <div className="flex items-end gap-3 h-40 pt-4">
              <div className="h-[20%] w-full animate-pulse bg-slate-200 dark:bg-slate-800 rounded-t" />
              <div className="h-[50%] w-full animate-pulse bg-slate-200 dark:bg-slate-800 rounded-t" />
              <div className="h-[80%] w-full animate-pulse bg-slate-200 dark:bg-slate-800 rounded-t" />
              <div className="h-[40%] w-full animate-pulse bg-slate-200 dark:bg-slate-800 rounded-t" />
              <div className="h-[90%] w-full animate-pulse bg-slate-200 dark:bg-slate-800 rounded-t" />
              <div className="h-[60%] w-full animate-pulse bg-slate-200 dark:bg-slate-800 rounded-t" />
            </div>
          </div>
        );
      case 'card':
      default:
        return (
          <div className="rounded-lg border border-border bg-surface p-6 space-y-4 shadow-sm">
            <div className="h-4 w-1/4 animate-pulse bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-8 w-1/2 animate-pulse bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-3 w-3/4 animate-pulse bg-slate-200 dark:bg-slate-800 rounded" />
          </div>
        );
    }
  };

  return (
    <div className={`space-y-4 w-full ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>{renderSkeleton()}</div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
