import type { ComboThali } from '@/types';
import { LazyImage } from './LazyImage';
import { AddToCartButton } from './AddToCartButton';
import { Check, Leaf, Drumstick, Users, Star } from 'lucide-react';

interface ComboThaliCardProps {
  combo: ComboThali;
  index: number;
}

function formatPrice(price: number): string {
  return `\u20B9${price}`;
}

export function ComboThaliCard({ combo, index }: ComboThaliCardProps) {
  const isAvailable = true;
  const isVeg = combo.diet === 'veg';
  const isEgg = combo.diet === 'egg';
  const DietIcon = isVeg ? Leaf : isEgg ? Leaf : Drumstick;
  const dietBorder = isVeg ? 'border-green-500' : isEgg ? 'border-gold-500' : 'border-maroon-500';
  const dietBg = isVeg ? 'bg-green-50' : isEgg ? 'bg-gold-50' : 'bg-maroon-50';
  const dietColor = isVeg ? 'text-green-600' : isEgg ? 'text-gold-700' : 'text-maroon-600';

  return (
    <article
      className="group relative animate-fade-in-up overflow-hidden rounded-2xl border border-cream-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl sm:rounded-3xl"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
    >
      {/* Image */}
      <div className="relative h-44 w-full overflow-hidden sm:h-52">
        <LazyImage
          src={combo.image}
          alt={combo.imageAlt}
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-plum-950/70 via-plum-950/10 to-transparent" />

        {/* Diet indicator */}
        <div className={`absolute left-3 top-3 flex h-6 w-6 items-center justify-center rounded-full border-2 ${dietBorder} ${dietBg} backdrop-blur-sm`}>
          <DietIcon className={`h-3.5 w-3.5 ${dietColor}`} />
        </div>

        {/* Popular badge */}
        {combo.popular && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-saffron-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg">
            <Star className="h-3 w-3 fill-white text-white" />
            Best Seller
          </span>
        )}

        {/* Price overlay */}
        <div className="absolute bottom-3 left-3">
          <span className="font-serif text-2xl font-bold text-white drop-shadow-lg sm:text-3xl">
            {formatPrice(combo.price)}
          </span>
        </div>

        {!isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-plum-950/55">
            <span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-plum-900 shadow-lg">
              Currently Unavailable
            </span>
          </div>
        )}

        {/* Serves badge */}
        <div className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-plum-950/60 px-2.5 py-1 text-[10px] font-medium text-cream-100 backdrop-blur-sm">
          <Users className="h-3 w-3" />
          {combo.serves}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <h3 className="font-serif text-base font-bold text-plum-900 sm:text-lg">
          {combo.name}
        </h3>
        <p className="mt-1.5 text-xs leading-relaxed text-charcoal-500 sm:text-sm">
          {combo.description}
        </p>

        {/* Items list */}
        <ul className="mt-4 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
          {combo.items.map((item, i) => (
            <li key={i} className="flex items-center gap-2 text-xs text-charcoal-600 sm:text-sm">
              <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-saffron-100">
                <Check className="h-2.5 w-2.5 text-saffron-600" />
              </span>
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-5">
          <AddToCartButton
            item={{
              id: combo.id,
              name: combo.name,
              description: combo.description,
              price: combo.price,
              image: combo.image,
              imageAlt: combo.imageAlt,
              diet: combo.diet,
              isAvailable,
            }}
          />
        </div>
      </div>
    </article>
  );
}
