import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { profile } from '../consts/profile';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // animate img
    //   tl.fromTo()

      // Animate heading lines
      tl.fromTo(
        [imgRef.current, line1Ref.current, line2Ref.current, line3Ref.current],
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, stagger: 0.15, duration: 1.2, delay: 0.3 }
      );

      // Animate subtitle
      tl.fromTo(
        subRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.5'
      );

      // Scroll indicator
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.3'
      );

      // Floating animation for scroll indicator
      gsap.to(scrollIndicatorRef.current, {
        y: 12,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 md:px-12 lg:px-24"
    >
      {/* Background subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg to-bg-light opacity-50" />

      <div className="relative z-10">
        <div className="mb-6">
          <div className="">
            <div
              ref={line1Ref}
              className="text-[clamp(2.5rem,8vw,8rem)] font-extralight leading-[0.95] tracking-tight"
            >
                Hello, I'm <span className="text-accent">{profile.name}</span>
            </div>
          </div>
          <div className="">
            <div
              ref={line2Ref}
              className="text-[clamp(2.5rem,8vw,8rem)] font-extralight leading-[0.95] tracking-tight"
            >
              <span className="italic font-light text-accent">Full-Stack</span>
            </div>
          </div>
          <div className="">
            <div
              ref={line3Ref}
              className="text-[clamp(2.5rem,8vw,8rem)] font-extralight leading-[0.95] tracking-tight ml-40"
            >
              Engineer
            </div>
          </div>

          <img ref={imgRef} src="/photo.jpg" alt="my photo" className="absolute top-0 right-0 size-96 mr-30 object-cover rounded-full" />
        </div>

        <div ref={subRef} className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-base font-light leading-relaxed text-text-muted md:text-lg pt-40">
            Welcome to my portfolio!. Let's explore.
            <br />
            <span className="text-text">Building serious projects with love</span>
          </p>
          <p className="font-mono text-xs tracking-widest text-text-muted uppercase text-right">
            Based in Indonesia <br />
            <TimeWalkZone timeZone="Asia/Jakarta" />
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] tracking-[0.3em] text-text-muted uppercase">
            Scroll
          </span>
          <div className="h-12 w-px bg-gradient-to-b from-accent to-transparent" />
        </div>
      </div>
    </section>
  );
}

function TimeWalkZone({timeZone}: {timeZone: string}) {
    const [time, setTime] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            const options: Intl.DateTimeFormatOptions = {
                hour: '2-digit',
                minute: '2-digit',
                // second: '2-digit',
                timeZone,
                hour12: false,
            };
            const formatter = new Intl.DateTimeFormat([], options);
            // refTime.current.textContent = formatter.format(new Date());
            setTime(formatter.format(new Date()));
        }, 1000);

        return () => clearInterval(interval);
    }, [timeZone, setTime]);

    return (
        <span>{timeZone} {time}</span>
    )
}
