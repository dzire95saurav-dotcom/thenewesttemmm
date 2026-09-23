import { useEffect, useState, useCallback } from 'react';
import { UtensilsCrossed, Leaf, ChefHat, Sparkles, Heart } from 'lucide-react';
import { restaurantInfo } from '@/data/restaurant';

interface OpeningAnimationProps {
  onComplete: () => void;
}

const features = [
  { icon: Leaf, title: 'FRESH INGREDIENTS' },
  { icon: ChefHat, title: 'EXPERTLY PREPARED' },
  { icon: Sparkles, title: 'HYGIENIC KITCHEN' },
  { icon: Heart, title: 'MADE WITH LOVE' },
];

const START_PROGRESS = 40;

interface VegConfig {
  emoji: string;
  className: string;
  anim: string;
  delay: string;
  size: string;
}

const vegetables: VegConfig[] = [
  { emoji: '🍅', className: 'left-[6%] top-[12%]', anim: 'vegSlideIn', delay: '0.1s', size: 'text-3xl sm:text-4xl' },
  { emoji: '🌶️', className: 'right-[8%] top-[14%]', anim: 'vegPopIn', delay: '0.3s', size: 'text-2xl sm:text-3xl' },
  { emoji: '🫑', className: 'left-[10%] bottom-[16%]', anim: 'vegBounce', delay: '0.5s', size: 'text-3xl sm:text-4xl' },
  { emoji: '🧅', className: 'right-[6%] bottom-[18%]', anim: 'vegRotate', delay: '0.2s', size: 'text-2xl sm:text-3xl' },
  { emoji: '🌿', className: 'left-[16%] top-[42%]', anim: 'vegRotate', delay: '0.7s', size: 'text-2xl sm:text-3xl' },
  { emoji: '🍄', className: 'right-[14%] top-[40%]', anim: 'vegPopIn', delay: '0.4s', size: 'text-2xl sm:text-3xl' },
  { emoji: '🥕', className: 'left-[4%] top-[55%]', anim: 'vegBounce', delay: '0.6s', size: 'text-2xl sm:text-3xl' },
];

const burstVeggies = ['🍅', '🌶️', '🫑', '🧅', '🌿', '🍄', '🥕', '🍃'];

export function OpeningAnimation({ onComplete }: OpeningAnimationProps) {
  const [progress, setProgress] = useState(START_PROGRESS);
  const [phase, setPhase] = useState<'loading' | 'exiting'>('loading');
  const [showFlame, setShowFlame] = useState(false);
  const [showShake, setShowShake] = useState(false);
  const [showFastSpin, setShowFastSpin] = useState(false);
  const [showCompleteBurst, setShowCompleteBurst] = useState(false);
  const [showProgressGlow, setShowProgressGlow] = useState(false);

  useEffect(() => {
    const totalDuration = 3800;
    const interval = 40;
    const steps = totalDuration / interval;
    let current = 0;

    const flameStart = setTimeout(() => setShowFlame(true), 1200);
    const flameEnd = setTimeout(() => setShowFlame(false), 3200);
    const shake1 = setTimeout(() => {
      setShowShake(true);
      setTimeout(() => setShowShake(false), 300);
    }, 1400);
    const shake2 = setTimeout(() => {
      setShowShake(true);
      setTimeout(() => setShowShake(false), 200);
    }, 2600);
    const fastSpinStart = setTimeout(() => setShowFastSpin(true), 3000);
    const fastSpinEnd = setTimeout(() => setShowFastSpin(false), 3800);

    const timer = setInterval(() => {
      current++;
      const t = current / steps;
      const eased = 1 - Math.pow(1 - t, 2.2);
      const pct = Math.min(START_PROGRESS + eased * (100 - START_PROGRESS), 100);
      setProgress(pct);

      if (current >= steps) {
        clearInterval(timer);
        setProgress(100);
        setShowCompleteBurst(true);
        setShowProgressGlow(true);
        setShowShake(true);
        setTimeout(() => setShowShake(false), 250);
        setTimeout(() => {
          setPhase('exiting');
          setTimeout(onComplete, 700);
        }, 600);
      }
    }, interval);

    return () => {
      clearInterval(timer);
      clearTimeout(flameStart);
      clearTimeout(flameEnd);
      clearTimeout(shake1);
      clearTimeout(shake2);
      clearTimeout(fastSpinStart);
      clearTimeout(fastSpinEnd);
    };
  }, [onComplete]);

  const roundedProgress = Math.round(progress);
  const isComplete = roundedProgress >= 100;

  const getBurstStyle = useCallback((i: number) => {
    const angles = [0, 45, 90, 135, 180, 225, 270, 315];
    const angle = angles[i % angles.length];
    const dist = 50 + (i % 3) * 15;
    const rad = (angle * Math.PI) / 180;
    const x = Math.cos(rad) * dist;
    const y = Math.sin(rad) * dist;
    const rot = (i % 2 === 0 ? 180 : -180) + i * 30;
    return {
      '--burst-x': `${x}px`,
      '--burst-y': `${y}px`,
      '--burst-r': `${rot}deg`,
    } as React.CSSProperties;
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream-50 transition-all duration-700 ${
        phase === 'exiting'
          ? 'scale-105 opacity-0'
          : 'scale-100 opacity-100'
      }`}
    >
      {/* Vegetable elements around the screen */}
      {vegetables.map((veg, i) => (
        <div
          key={i}
          className={`pointer-events-none absolute ${veg.className} ${veg.size} select-none`}
          style={{ animation: `${veg.anim} ${veg.anim === 'vegSlideIn' ? '0.8s' : veg.anim === 'vegPopIn' ? '0.6s' : '3s'} cubic-bezier(0.22, 1, 0.36, 1) ${veg.delay} ${veg.anim === 'vegSlideIn' || veg.anim === 'vegPopIn' ? 'forwards' : 'infinite'}`, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
        >
          {veg.emoji}
        </div>
      ))}

      {/* Complete burst particles */}
      {showCompleteBurst && (
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          {burstVeggies.map((v, i) => (
            <span
              key={i}
              className="absolute text-2xl animate-veg-burst"
              style={{
                ...getBurstStyle(i),
                animationDelay: `${i * 40}ms`,
                animationFillMode: 'forwards',
                left: 0,
                top: 0,
              }}
            >
              {v}
            </span>
          ))}
          <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-saffron-400 animate-complete-burst" />
        </div>
      )}

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* Circular food image with chakri spinner and flame */}
        <div className="relative mb-6">
          {/* Outer rotating chakri ring */}
          <div
            className={`absolute -inset-4 rounded-full border-2 border-dashed border-saffron-400/50 ${showFastSpin ? 'animate-chakri-spin-fast' : 'animate-chakri-spin'}`}
          />
          {/* Inner rotating ring with vegetable icons */}
          <div
            className={`absolute -inset-1 rounded-full ${showFastSpin ? 'animate-chakri-spin-fast' : 'animate-chakri-spin'}`}
            style={{ animationDuration: showFastSpin ? '0.8s' : '2.5s' }}
          >
            {['🍅', '🌶️', '🫑', '🧅', '🌿', '🍄'].map((v, i) => {
              const angle = (i * 60 * Math.PI) / 180;
              const radius = 60;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              return (
                <span
                  key={i}
                  className="absolute left-1/2 top-1/2 text-base sm:text-lg"
                  style={{
                    transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.15))',
                  }}
                >
                  {v}
                </span>
              );
            })}
          </div>

          {/* Flame effect */}
          {showFlame && (
            <div className="pointer-events-none absolute left-1/2 bottom-[-12px] z-0 -translate-x-1/2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  <div
                    className="animate-flame-flicker"
                    style={{ transformOrigin: 'bottom center' }}
                  >
                    <svg width="30" height="36" viewBox="0 0 30 36" fill="none">
                      <path
                        d="M15 0 C8 8, 4 14, 4 22 C4 30, 9 36, 15 36 C21 36, 26 30, 26 22 C26 14, 22 8, 15 0 Z"
                        fill="url(#flameGrad)"
                      />
                      <path
                        d="M15 8 C11 14, 9 18, 9 24 C9 29, 12 32, 15 32 C18 32, 21 29, 21 24 C21 18, 19 14, 15 8 Z"
                        fill="#fde047"
                        opacity="0.8"
                      />
                      <defs>
                        <linearGradient id="flameGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#fdba74" />
                          <stop offset="50%" stopColor="#f97316" />
                          <stop offset="100%" stopColor="#ea580c" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div
                    className="animate-flame-rise"
                    style={{ animationDelay: `${i * 0.3}s`, transformOrigin: 'bottom center' }}
                  >
                    <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
                      <path
                        d="M10 0 C6 5, 3 9, 3 15 C3 20, 6 24, 10 24 C14 24, 17 20, 17 15 C17 9, 14 5, 10 0 Z"
                        fill="#f97316"
                        opacity="0.6"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Main circular food image */}
          <div
            className={`relative z-10 h-28 w-28 overflow-hidden rounded-full border-4 border-plum-200 shadow-xl sm:h-32 sm:w-32 ${
              showShake ? 'animate-cook-shake' : ''
            } ${showCompleteBurst ? 'animate-final-pulse' : ''}`}
          >
            <img
              src="https://images.pexels.com/photos/9792458/pexels-photo-9792458.jpeg?auto=compress&cs=tinysrgb&h=200&w=200"
              alt="Delicious Indian food"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-plum-900/10" />
          </div>
        </div>

        {/* Restaurant name — soft fade + rise */}
        <div
          className="animate-brand-rise"
          style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
        >
          <h1 className="font-serif text-2xl font-bold tracking-wide text-plum-900 sm:text-3xl">
            {restaurantInfo.name}
          </h1>
          <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.3em] text-saffron-600 sm:text-xs">
            {restaurantInfo.subtitle}
          </p>
        </div>

        {/* Decorative divider */}
        <div
          className="my-5 flex items-center gap-2 animate-fade-in"
          style={{ animationDelay: '0.9s', animationFillMode: 'both' }}
        >
          <span className="h-px w-8 bg-plum-300" />
          <span className="h-1.5 w-1.5 rotate-45 border border-saffron-400" />
          <span className="h-px w-8 bg-plum-300" />
        </div>

        {/* "Preparing" text */}
        <div
          className="mb-4 flex items-center gap-2 animate-fade-in"
          style={{ animationDelay: '1.1s', animationFillMode: 'both' }}
        >
          <span className="font-script text-lg text-plum-700 sm:text-xl">
            Preparing
          </span>
          <span className="text-saffron-500">&#10022;</span>
          <span className="text-sm font-medium text-charcoal-400">
            SOMETHING DELICIOUS...
          </span>
        </div>

        {/* Progress bar with shine sweep */}
        <div
          className={`relative h-1.5 w-48 overflow-hidden rounded-full bg-cream-200 sm:w-64 animate-fade-in ${showProgressGlow ? 'animate-progress-glow' : ''}`}
          style={{ animationDelay: '1.2s', animationFillMode: 'both' }}
        >
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-saffron-500 to-plum-500"
            style={{
              width: `${progress}%`,
              transition: 'width 80ms linear',
            }}
          />
          {/* Shine sweep */}
          {progress > START_PROGRESS && !isComplete && (
            <div
              className="absolute top-0 h-full w-12 animate-progress-shine"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                animationDuration: '1.8s',
              }}
            />
          )}
        </div>
        <span
          className="mt-2 text-[10px] font-medium text-charcoal-400 animate-fade-in"
          style={{ animationDelay: '1.2s', animationFillMode: 'both' }}
        >
          {roundedProgress}%
        </span>

        {/* Feature cards — staggered sequential reveal */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            const visibleAt = START_PROGRESS + i * 12;
            const visible = progress >= visibleAt;
            return (
              <div
                key={feat.title}
                className={`flex flex-col items-center gap-2 rounded-2xl border border-cream-200 bg-white/60 px-3 py-3 transition-all duration-500 ${
                  visible
                    ? 'translate-y-0 scale-100 opacity-100'
                    : 'translate-y-4 scale-90 opacity-0'
                }`}
                style={{
                  transitionDelay: `${i * 80}ms`,
                  transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-saffron-50 sm:h-10 sm:w-10">
                  <Icon className="h-4 w-4 text-saffron-600 sm:h-5 sm:w-5" />
                </div>
                <span className="text-[8px] font-semibold uppercase tracking-wider text-plum-700 sm:text-[9px]">
                  {feat.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Footer mark */}
        <div
          className="mt-8 flex items-center gap-1.5 text-charcoal-300 animate-fade-in"
          style={{ animationDelay: '1.5s', animationFillMode: 'both' }}
        >
          <UtensilsCrossed className="h-3 w-3" />
          <span className="text-[10px] tracking-wide">Digital QR Menu</span>
        </div>
      </div>
    </div>
  );
}
