const BrandEdge = ({ title, subtitle, action }) => {
  return (
    <div className="overflow-hidden rounded-[2rem] bg-primary p-6 shadow-lg">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-white/90 sm:text-base">{subtitle}</p>
        </div>
        {action && <div>{action}</div>}
      </div>
      <div className="mt-6 h-2 rounded-full bg-secondary/80" />
    </div>
  );
};

export default BrandEdge;
