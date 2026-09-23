import type { MenuItem } from '@/types';
import { LazyImage } from './LazyImage';
import { AddToCartButton } from './AddToCartButton';
import { Flame, Leaf, Drumstick, Egg, Star, ChefHat } from 'lucide-react';

interface MenuItemCardProps {
  item: MenuItem;
  index: number;
}

const dietConfig = {
  veg: {
    icon: Leaf,
    color: 'text-green-600',
    border: 'border-green-500',
    bg: 'bg-green-50',
    label: 'Veg',
  },
  'non-veg': {
    icon: Drumstick,
    color: 'text-maroon-600',
    border: 'border-maroon-500',
    bg: 'bg-maroon-50',
    label: 'Non-Veg',
  },
  egg: {
    icon: Egg,
    color: 'text-gold-700',
    border: 'border-gold-500',
    bg: 'bg-gold-50',
    label: 'Egg',
  },
};

const spiceConfig = {
  mild: { label: 'Mild', flames: 1 },
  medium: { label: 'Medium', flames: 2 },
  hot: { label: 'Hot', flames: 3 },
};

function formatPrice(price: number): string {
  return `\u20B9${price}`;
}

export function MenuItemCard({ item, index }: MenuItemCardProps) {
  const diet = dietConfig[item.diet];
  const DietIcon = diet.icon;
  const spice = item.spice ? spiceConfig[item.spice] : null;

  return (
    <article
      className="group flex animate-fade-in-up flex-col overflow-hidden rounded-2xl border border-cream-200 bg-white shadow-sm transition-all duration-300 hover:border-saffron-200 hover:shadow-lg active:scale-[0.97]"
      style={{ animationDelay: `${Math.min(index * 50, 500)}ms`, animationFillMode: 'both' }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-100">
        <LazyImage
          src={item.image}
          alt={item.imageAlt}
          className="h-full w-full"
        />
        {/* Diet indicator */}
        <div className={`absolute left-2 top-2 flex h-5 w-5 items-center justify-center rounded-full border-2 ${diet.border} ${diet.bg} backdrop-blur-sm sm:h-6 sm:w-6`}>
          <DietIcon className={`h-3 w-3 ${diet.color} sm:h-3.5 sm:w-3.5`} />
        </div>
        {/* Popular/Chef badge */}
        {(item.popular || item.chefSpecial) && (
          <div className="absolute right-2 top-2">
            {item.chefSpecial ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-gold-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white shadow-md sm:text-[10px]">
                <ChefHat className="h-2.5 w-2.5" />
                Chef's
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-saffron-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white shadow-md sm:text-[10px]">
                <Star className="h-2.5 w-2.5 fill-white text-white" />
                Popular
              </span>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        {/* Name + price */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-sm font-semibold leading-snug text-plum-900 sm:text-base">
            {item.name}
          </h3>
        </div>

        {/* Price */}
        <div className="mt-1.5">
          {item.priceFull ? (
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-base font-bold text-saffron-600 sm:text-lg">
                {formatPrice(item.price)}
              </span>
              <span className="text-[10px] text-charcoal-400">Half</span>
              <span className="font-serif text-base font-bold text-saffron-600 sm:text-lg">
                {formatPrice(item.priceFull)}
              </span>
              <span className="text-[10px] text-charcoal-400">Full</span>
            </div>
          ) : (
            <span className="font-serif text-base font-bold text-saffron-600 sm:text-lg">
              {formatPrice(item.price)}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-charcoal-500 sm:text-xs">
          {item.description}
        </p>

        {/* Bottom row: serves + spice */}
        <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-2.5">
          {item.serves && (
            <span className="rounded-full bg-cream-100 px-2 py-0.5 text-[10px] font-medium text-charcoal-500">
              {item.serves}
            </span>
          )}
          {spice && (
            <span className="inline-flex items-center gap-0.5 rounded-full bg-maroon-50 px-2 py-0.5 text-[10px] font-medium text-maroon-600">
              {Array.from({ length: spice.flames }).map((_, i) => (
                <Flame key={i} className="h-2.5 w-2.5" />
              ))}
              {spice.label}
            </span>
          )}
        </div>

        {/* Add to cart */}
        <AddToCartButton item={item} />
      </div>
    </article>
  );
}
