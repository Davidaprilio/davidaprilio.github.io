import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ORBS = [
  { top: '5%',  left: '10%',  w: '40vw', color: 'var(--color-accent)', opacity: 0.25, blur: 80 },
  { top: '25%', right: '5%',  w: '35vw', color: '#6366f1',             opacity: 0.2,  blur: 70 },
  { top: '55%', left: '35%',  w: '30vw', color: '#06b6d4',             opacity: 0.15, blur: 60 },
  { top: '70%', right: '15%', w: '28vw', color: 'var(--color-accent)', opacity: 0.12, blur: 75 },
];

const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  top: `${6 + (i * 5.7) % 88}%`,
  left: `${4 + (i * 6.3) % 92}%`,
  size: 2 + (i % 3),
}));

export default function AbstractBg() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Orb floating animation
      orbRefs.current.forEach((el, i) => {
        if (!el) return;
        const dir = i % 2 === 0 ? 1 : -1;
        gsap.to(el, {
          x: dir * (50 + i * 20),
          y: -dir * (40 + i * 15),
          scale: 1 + (i % 2 === 0 ? 0.15 : -0.1),
          duration: 14 + i * 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

      // Particle floating
      const particles = containerRef.current?.querySelectorAll('.particle');
      particles?.forEach((p, i) => {
        gsap.to(p, {
          y: (i % 2 === 0 ? -1 : 1) * (25 + (i * 6) % 35),
          x: (i % 2 === 0 ? 1 : -1) * (15 + (i * 4) % 25),
          opacity: 0.3 + (i % 3) * 0.2,
          duration: 5 + (i * 1.1) % 7,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: (i * 0.3) % 3,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
    >
      {/* ── Gradient Orbs ── */}
      {ORBS.map((orb, i) => (
        <div
          key={i}
          ref={(el) => { orbRefs.current[i] = el; }}
          className="absolute rounded-full"
          style={{
            top: orb.top,
            left: (orb as Record<string, unknown>).left as string | undefined,
            right: (orb as Record<string, unknown>).right as string | undefined,
            width: orb.w,
            height: orb.w,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            opacity: orb.opacity,
            filter: `blur(${orb.blur}px)`,
          }}
        />
      ))}

      {/* ── Floating particles ── */}
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="particle absolute rounded-full bg-accent"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            opacity: 0.5,
          }}
        />
      ))}

      {/* ── Accent crossing lines ── */}
      <div
        className="absolute top-0 right-[30%] h-full w-px opacity-[0.08]"
        style={{ background: 'linear-gradient(to bottom, transparent 10%, var(--color-accent) 50%, transparent 90%)' }}
      />
      <div
        className="absolute top-[40%] left-0 h-px w-full opacity-[0.06]"
        style={{ background: 'linear-gradient(to right, transparent 10%, var(--color-accent) 50%, transparent 90%)' }}
      />

      {/* ── Dot grid ── */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--color-text) 0.8px, transparent 0.8px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* ── Noise grain ── */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
