interface PageHeaderProps {
  search: string;
  onSearch: (value: string) => void;
}

export default function PageHeader({ search, onSearch }: PageHeaderProps) {
  return (
    <header className="mb-16">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div>
          <h1 className="text-4xl lg:text-[3.5rem] font-display font-bold leading-none tracking-tighter text-on-surface">
            SESSION <span className="text-primary">LOGS</span>
          </h1>
          <p className="font-mono text-sm text-on-surface-variant mt-4 opacity-80 uppercase tracking-wider">
            &gt; Querying session history...
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-6 w-full md:w-auto">
          <div className="flex items-center bg-surface border border-outline-variant/30 px-4 py-2.5 w-full md:w-80 focus-within:border-primary transition-all">
            <span className="font-mono text-primary mr-3 text-sm font-bold animate-pulse">&gt;</span>
            <input
              type="text"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="SEARCH_LOGS..."
              className="bg-transparent border-none outline-none focus:ring-0 text-sm font-mono text-on-surface w-full placeholder:text-on-surface-variant/40 p-0"
            />
            <span className="material-symbols-outlined text-on-surface-variant/60 text-[18px]">search</span>
          </div>

          <div className="flex gap-6">
            <button className="text-xs font-headline tracking-widest text-on-surface-variant hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary pb-1 uppercase">
              Export Data
            </button>
            <button className="text-xs font-headline tracking-widest text-on-surface-variant hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary pb-1 uppercase">
              Filter Rules
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
