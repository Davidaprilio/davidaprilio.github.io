import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Counter animation
    const counter = { val: 0 };
    gsap.to(counter, {
      val: 100,
      duration: 0.35,
      ease: 'power2.inOut',
      onUpdate: () => {
        setCount(Math.floor(counter.val));
      },
    });

    const tl = gsap.timeline({
      delay: 0.4,
      onComplete: () => {
        onComplete();
      },
    });

    tl.to(textRef.current, {
      y: -40,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
    });

    tl.to(preloaderRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: 'power4.inOut',
    });
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-bg"
    >
      <div ref={textRef} className="flex flex-col items-center gap-4">
        <span className="font-mono text-xs tracking-[0.5em] text-text-muted uppercase">
          Loading
        </span>
        <span
          ref={counterRef}
          className="text-7xl font-extralight tabular-nums text-accent md:text-9xl"
        >
          {count}
        </span>
      </div>
    </div>
  );
}
