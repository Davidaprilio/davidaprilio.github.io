import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profile } from '../consts/profile';
import TimeWalkZone from './TimeWalkZone';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: lineRef.current,
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        headingRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        ctaRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 90%',
          },
        }
      );

      gsap.fromTo(
        linksRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: linksRef.current,
            start: 'top 90%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative px-6 py-32 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 font-mono text-xs tracking-[0.3em] text-text-muted uppercase">
          <span className="text-accent">05</span> — Contact
        </div>
        <div ref={lineRef} className="hr-animated mb-16" />

        <div ref={headingRef} className="mb-12">
            <p className='font-light leading-tight tracking-tight text-4xl md:text-5xl lg:text-6xl'>
                Let’s build and ship something remarkable. 
                Open to agency collaborations, freelance work, and fully remote full-time opportunities.
            </p>
          <h2 className="text-5xl font-extralight leading-tight tracking-tight md:text-7xl lg:text-8xl">
            <span >Let's work</span>
            <span className="ml-8 italic text-accent">together</span>
          </h2>
        </div>

        <div ref={ctaRef} className="mb-20 flex items-end justify-between">
          <a
            href={`mailto:${profile.email}`}
            className="magnetic-btn group inline-flex items-center gap-4 rounded-full border border-border-light px-10 py-5 transition-all duration-300 hover:border-accent hover:bg-accent hover:text-bg"
          >
            <span className="text-lg font-light tracking-wider uppercase">
              Get in Touch
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 14 14"
              fill="none"
              className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
            >
              <path
                d="M1 13L13 1M13 1H3M13 1V11"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </a>

          {/* show timezone */}
          <div className='text-text-muted'>
            <div>TZ {profile.timeZone}</div>
            <div className='text-right'><TimeWalkZone timeZone={profile.timeZone} second label={false} /></div>
          </div>
        </div>

        <div ref={linksRef} className="border-t border-border-light pt-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 font-mono text-xs tracking-wider text-text-muted uppercase">
                Email
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="link-underline text-lg font-light text-text transition-colors hover:text-accent"
              >
                {profile.email}
              </a>
            </div>

            <div className="flex gap-8">
              {Object.entries(profile.socials).map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline font-mono text-xs tracking-wider text-text-muted uppercase transition-colors hover:text-accent"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
