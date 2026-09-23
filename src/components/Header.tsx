import { restaurantInfo } from '@/data/restaurant';
import { UtensilsCrossed, Phone, MapPin } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-cream-200 bg-cream-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6 sm:py-6">
        {/* Logo + branding */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-plum-900 sm:h-12 sm:w-12">
            <UtensilsCrossed className="h-5 w-5 text-cream-50 sm:h-6 sm:w-6" />
          </div>
          <div>
            <h1 className="font-serif text-lg font-bold leading-tight text-plum-900 sm:text-xl">
              {restaurantInfo.name}
            </h1>
            <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-saffron-600 sm:text-[10px]">
              {restaurantInfo.subtitle}
            </p>
          </div>
        </div>

        {/* Contact buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`tel:${restaurantInfo.phones[0].replace(/\s/g, '')}`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-cream-300 bg-white text-plum-700 transition-all hover:border-saffron-300 hover:text-saffron-600 active:scale-90 sm:h-10 sm:w-10"
            aria-label="Call us"
          >
            <Phone className="h-4 w-4" />
          </a>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurantInfo.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-cream-300 bg-white text-plum-700 transition-all hover:border-saffron-300 hover:text-saffron-600 active:scale-90 sm:h-10 sm:w-10"
            aria-label="View location"
          >
            <MapPin className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
