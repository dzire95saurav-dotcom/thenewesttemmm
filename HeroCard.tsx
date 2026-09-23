import { LazyImage } from './LazyImage';
import { restaurantInfo } from '@/data/restaurant';
import { Star, MapPin } from 'lucide-react';

export function HeroCard() {
  return (
    <section className="px-4 pt-6 sm:px-6 sm:pt-8">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-plum-950 shadow-xl sm:rounded-[2rem]">
        {/* Background image */}
        <div className="absolute inset-0">
          <LazyImage
            src={restaurantInfo.heroImage}
            alt={restaurantInfo.heroImageAlt}
            className="h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-plum-950/80 via-plum-900/60 to-plum-950/85" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-start px-6 py-10 sm:px-12 sm:py-16 lg:px-20 lg:py-20">
          {/* Kicker */}
          <span className="font-script text-xl text-saffron-300 sm:text-2xl">
            welcome to
          </span>

          {/* Headline */}
          <h2 className="mt-1 font-serif text-3xl font-bold leading-tight text-cream-50 sm:text-5xl lg:text-6xl">
            {restaurantInfo.name}
          </h2>

          {/* Subtitle */}
          <p className="mt-2 text-xs font-medium uppercase tracking-[0.3em] text-cream-200/80 sm:text-sm">
            {restaurantInfo.subtitle}
          </p>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <span className="h-px w-10 bg-saffron-400/60" />
            <span className="h-1.5 w-1.5 rotate-45 border border-saffron-400/60" />
            <span className="h-px w-10 bg-saffron-400/60" />
          </div>

          {/* Supporting text */}
          <p className="max-w-md text-sm leading-relaxed text-cream-200/80 sm:text-base">
            {restaurantInfo.tagline}. Explore our full menu of biryanis, tandoor specialties, curries, and more.
          </p>

          {/* Rating + location pills */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-cream-100 backdrop-blur-sm">
              <Star className="h-3.5 w-3.5 fill-saffron-400 text-saffron-400" />
              Premium Dining
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-cream-100 backdrop-blur-sm">
              <MapPin className="h-3.5 w-3.5 text-saffron-400" />
              Kankarbagh, Patna
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
