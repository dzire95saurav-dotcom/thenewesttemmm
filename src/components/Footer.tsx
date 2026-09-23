import { restaurantInfo } from '@/data/restaurant';
import { MapPin, Phone, UtensilsCrossed, Navigation } from 'lucide-react';

export function Footer() {
  const mapsQuery = encodeURIComponent(restaurantInfo.address);

  return (
    <footer id="footer" className="scroll-mt-20 bg-plum-950 text-cream-100">
      <div className="h-1 bg-gradient-to-r from-saffron-600 via-saffron-400 to-saffron-600" />

      <div className="mx-auto max-w-4xl px-5 py-12 sm:px-6 sm:py-16">
        {/* Brand */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-saffron-500/20 ring-2 ring-saffron-400/30">
            <UtensilsCrossed className="h-6 w-6 text-saffron-400" />
          </div>
          <h2 className="font-serif text-2xl font-bold tracking-wide text-white sm:text-3xl">
            {restaurantInfo.name}
          </h2>
          <p className="mt-1 text-xs uppercase tracking-[0.25em] text-saffron-300">
            {restaurantInfo.subtitle}
          </p>
        </div>

        {/* Divider */}
        <div className="my-8 flex items-center gap-3">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-plum-800" />
          <span className="h-1.5 w-1.5 rotate-45 border border-saffron-400/40" />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-plum-800" />
        </div>

        {/* Contact info */}
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Address */}
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <div className="mb-2 flex items-center gap-2 text-saffron-300">
              <MapPin className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Address</span>
            </div>
            <p className="whitespace-pre-line text-sm leading-relaxed text-cream-200/70">
              {restaurantInfo.address}
            </p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-saffron-400 transition-colors hover:text-saffron-300"
            >
              <Navigation className="h-3.5 w-3.5" />
              Get Directions
            </a>
          </div>

          {/* Phone */}
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <div className="mb-2 flex items-center gap-2 text-saffron-300">
              <Phone className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Call Us</span>
            </div>
            <ul className="space-y-1.5">
              {restaurantInfo.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="text-sm text-cream-200/70 transition-colors hover:text-saffron-400"
                  >
                    {phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center gap-2 border-t border-plum-800 pt-6 text-center">
          <p className="text-xs text-cream-200/40">
            &copy; {new Date().getFullYear()} {restaurantInfo.name}. All rights reserved.
          </p>
          <p className="text-[10px] text-cream-200/30">
            Prices are inclusive of all taxes. Menu items are subject to availability.
          </p>
        </div>
      </div>
    </footer>
  );
}
