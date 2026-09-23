import { menuCategories } from '@/data/menu';
import type { MenuItem } from '@/types';
import { AddToCartButton } from './AddToCartButton';
import { Flame } from 'lucide-react';

const popularItems: MenuItem[] = [
  ...menuCategories.flatMap((cat) => cat.items.filter((item) => item.popular)),
];

export function ChefSpecials() {
  return (
    <section className="px-4 pt-10 sm:px-6 sm:pt-14">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-6 text-center sm:mb-8">
          <p className="font-script text-xl text-saffron-500 sm:text-2xl">
            handpicked
          </p>
          <h2 className="mt-1 font-serif text-2xl font-bold uppercase tracking-wide text-plum-900 sm:text-3xl lg:text-4xl">
            Chef's Specials
          </h2>
          <div className="mx-auto mt-3 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-plum-300" />
            <Flame className="h-3.5 w-3.5 text-saffron-500" />
            <span className="h-px w-8 bg-plum-300" />
          </div>
          <p className="mt-2 text-xs font-medium text-charcoal-500">
            {popularItems.length} popular picks
          </p>
        </div>

        {/* Horizontal scroll cards */}
        <div className="hide-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {popularItems.slice(0, 8).map((item, i) => (
            <div
              key={item.id}
              className="flex-shrink-0"
              style={{ width: 'min(280px, 78vw)' }}
            >
              <ChefSpecialCard item={item} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChefSpecialCard({ item, index }: { item: MenuItem; index: number }) {
  return (
    <div
      className="animate-fade-in-up overflow-hidden rounded-2xl border border-cream-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
    >
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={item.image}
          alt={item.imageAlt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-serif text-base font-semibold text-plum-900 sm:text-lg">
          {item.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-charcoal-500">
          {item.description}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-serif text-lg font-bold text-saffron-600">
            {item.priceFull ? `\u20B9${item.price} / \u20B9${item.priceFull}` : `\u20B9${item.price}`}
          </span>
        </div>
        <div className="mt-3">
          <AddToCartButton item={item} />
        </div>
      </div>
    </div>
  );
}
