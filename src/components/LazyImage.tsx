import { useState, useRef, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
}

export default function LazyImage({
  src,
  alt,
  className = '',
  wrapperClassName = '',
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${wrapperClassName}`}>
      {/* Placeholder shimmer */}
      <div
        className={`absolute inset-0 bg-bg-card transition-opacity duration-700 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="lazy-shimmer absolute inset-0" />
      </div>

      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`transition-all duration-700 ${
            isLoaded ? 'scale-100 opacity-100 blur-0' : 'scale-105 opacity-0 blur-md'
          } ${className}`}
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
}
