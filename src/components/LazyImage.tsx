import { useEffect, useRef, useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  lowQualitySrc?: string;
}

export function LazyImage({ src, alt, className = '' }: LazyImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) {
      setInView(true);
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const rect = el.getBoundingClientRect();
    const alreadyVisible =
      rect.top < window.innerHeight + 200 && rect.bottom > -200;

    if (alreadyVisible) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '200px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 shimmer-bg animate-shimmer" aria-hidden="true" />
      )}
      <img
        ref={imgRef}
        src={inView ? src : undefined}
        alt={alt}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-all duration-700 ${
          loaded ? 'scale-100 blur-0 opacity-100' : 'scale-105 blur-md opacity-0'
        }`}
      />
    </div>
  );
}
