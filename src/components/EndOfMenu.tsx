import { ArrowUpRight, Heart } from 'lucide-react';

interface EndOfMenuProps {
  onNext: () => void;
  isLastSection: boolean;
}

export function EndOfMenu({ onNext, isLastSection }: EndOfMenuProps) {
  return (
    <section
      className="animate-fade-in-up px-2 py-8 sm:px-6 sm:py-12"
      style={{ animationFillMode: 'both' }}
      aria-label="End of section"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-cream-300 bg-gradient-to-br from-cream-50 to-cream-100 p-6 shadow-md sm:rounded-3xl sm:p-8">
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-6">
          {/* Dark plum circular icon */}
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-plum-900 shadow-lg sm:h-16 sm:w-16">
            <Heart className="h-6 w-6 fill-saffron-400 text-saffron-400 sm:h-7 sm:w-7" />
          </div>

          {/* Heading + subtext */}
          <div className="flex-1 text-center sm:text-left">
            <p className="font-script text-lg text-saffron-500 sm:text-xl">
              {isLastSection ? "that's the full menu" : 'end of this section'}
            </p>
            <h2 className="mt-0.5 font-serif text-lg font-bold text-plum-900 sm:text-xl">
              Thank you for reaching the end!
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-charcoal-500">
              {isLastSection
                ? "You've seen our entire menu. Visit us or get in touch — we'd love to serve you."
                : 'Move to the next section for more amazing dishes.'}
            </p>
          </div>

          {/* Next Section / Visit Us button */}
          <button
            onClick={onNext}
            className="group inline-flex w-full flex-shrink-0 items-center justify-center gap-2 rounded-full bg-plum-900 px-6 py-3.5 text-sm font-semibold text-cream-50 shadow-xl transition-all duration-300 hover:bg-plum-800 hover:shadow-2xl active:scale-95 sm:w-auto sm:px-8 sm:py-4 sm:text-base"
          >
            {isLastSection ? 'Visit Us' : 'Next Section'}
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
