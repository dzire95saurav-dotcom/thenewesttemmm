import { useEffect, useRef } from 'react';

export interface CategoryNavItem {
  id: string;
  label: string;
  shortLabel: string;
}

interface CategoryNavProps {
  categories: CategoryNavItem[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function CategoryNav({ categories, activeId, onSelect }: CategoryNavProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!activeRef.current || !listRef.current) return;

    const container = listRef.current;
    const active = activeRef.current;
    const containerRect = container.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();

    const offsetLeft = active.offsetLeft;
    const targetScroll = offsetLeft - containerRect.width / 2 + activeRect.width / 2;

    container.scrollTo({ left: targetScroll, behavior: 'smooth' });
  }, [activeId]);

  return (
    <nav
      className="border-b border-cream-200 bg-cream-50/95 backdrop-blur-lg"
      aria-label="Menu categories"
    >
      <div
        ref={listRef}
        className="hide-scrollbar flex gap-2 overflow-x-auto px-4 py-3 sm:px-6"
        role="tablist"
      >
        {categories.map((cat) => {
          const isActive = cat.id === activeId;
          return (
            <button
              key={cat.id}
              ref={isActive ? activeRef : null}
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelect(cat.id)}
              className={`flex-shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300 active:scale-90 sm:text-sm ${
                isActive
                  ? 'border-saffron-500 bg-saffron-50 text-saffron-700 shadow-sm'
                  : 'border-cream-300 bg-white text-charcoal-600 hover:border-plum-300 hover:text-plum-700'
              }`}
            >
              {cat.shortLabel}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
