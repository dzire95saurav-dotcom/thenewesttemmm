import type { MenuCategory } from '../types';
import { MenuItemCard } from './MenuItemCard';
import { useEffect, useState } from 'react';

interface MenuSectionProps {
  category: MenuCategory;
}

export function MenuSection({ category }: MenuSectionProps) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Generate eyebrow from category label
  const eyebrow = category.label.split('—')[0].trim();

  return (
    <section
      id={category.id}
      className="scroll-mt-20 py-8 sm:py-10"
      aria-label={category.label}
    >
      {/* Section header */}
      <div
        className={`mb-6 transition-all duration-700 sm:mb-8 ${
          revealed ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`}
      >
        <p className="font-script text-lg text-saffron-500 sm:text-xl">
          {eyebrow.toLowerCase()}
        </p>
        <div className="mt-1 flex items-center gap-3">
          <h2 className="font-serif text-xl font-bold uppercase tracking-wide text-plum-900 sm:text-2xl lg:text-3xl">
            {category.label.split('—')[1]?.trim() ?? category.label}
          </h2>
          <span className="flex-shrink-0 rounded-full bg-plum-50 px-2.5 py-0.5 text-xs font-medium text-plum-600">
            {category.items.length} items
          </span>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="h-px flex-1 bg-gradient-to-r from-plum-200 to-transparent" />
          <span className="h-1 w-1 rotate-45 border border-saffron-400" />
          <span className="h-px flex-1 bg-gradient-to-l from-plum-200 to-transparent" />
        </div>
      </div>

      {/* Items grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">
        {category.items.map((item, i) => (
          <MenuItemCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
