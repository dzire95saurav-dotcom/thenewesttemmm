import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
  isSearching: boolean;
}

export function SearchBar({ value, onChange, resultCount, isSearching }: SearchBarProps) {
  return (
    <div className="relative">
      <div className="group relative">
        {/* Search icon */}
        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-400 transition-colors group-focus-within:text-saffron-500">
          <Search className="h-5 w-5" />
        </div>

        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search biryani, tandoor, curries, starter, naan..."
          aria-label="Search menu items"
          className="w-full rounded-2xl border border-cream-300 bg-white py-3.5 pl-12 pr-28 text-sm text-charcoal-900 shadow-sm transition-all duration-300 placeholder:text-charcoal-400 focus:border-saffron-400 focus:outline-none focus:ring-2 focus:ring-saffron-200"
          autoCapitalize="none"
          autoComplete="off"
          spellCheck={false}
        />

        {/* LIVE SEARCH badge */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {value ? (
            <button
              type="button"
              onClick={() => onChange('')}
              aria-label="Clear search"
              className="flex h-7 w-7 items-center justify-center rounded-full text-charcoal-400 transition-colors hover:bg-cream-100 hover:text-plum-700"
            >
              <X className="h-4 w-4" />
            </button>
          ) : (
            <span className="flex items-center gap-1 rounded-full bg-saffron-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-saffron-600">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-saffron-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-saffron-500" />
              </span>
              Live Search
            </span>
          )}
        </div>
      </div>

      {/* Result count */}
      {isSearching && (
        <p className="mt-2.5 pl-1 text-xs text-charcoal-500 animate-fade-in">
          {resultCount > 0 ? (
            <>Showing <span className="font-semibold text-saffron-600">{resultCount}</span> matching dish{resultCount !== 1 ? 'es' : ''}</>
          ) : (
            <>No dishes match "<span className="font-semibold text-maroon-600">{value}</span>"</>
          )}
        </p>
      )}
    </div>
  );
}
