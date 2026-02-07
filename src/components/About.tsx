import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stats } from '../consts/profile';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);
    const statRefs = useRef<(HTMLDivElement | null)[]>([]);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading reveal
            gsap.fromTo(
                headingRef.current,
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                    },
                }
            );

            // Line scale
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
                        toggleActions: 'play none none none',
                    },
                }
            );

            // Text paragraphs reveal
            textRefs.current.forEach((el) => {
                if (!el) return;
                gsap.fromTo(
                    el,
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 85%',
                            toggleActions: 'play none none none',
                        },
                    }
                );
            });

            // Stats reveal
            statRefs.current.forEach((el, i) => {
                if (!el) return;
                gsap.fromTo(
                    el,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        delay: i * 0.1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 85%',
                            toggleActions: 'play none none none',
                        },
                    }
                );
            });

            // ── Parallax: About scrolls FAST (rises up over Hero) ──
            const aboutContent = sectionRef.current?.querySelector('.about-content');
            if (aboutContent) {
              gsap.fromTo(
                aboutContent,
                { y: 120 },
                {
                  y: 0,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'top 30%',
                    scrub: 0,
                  },
                }
              );
            }

        }, sectionRef);

        return () => ctx.revert();
    }, []);


    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative z-10 bg-bg px-6 py-32 md:px-12 lg:px-24"
        >
            <div className="about-content mx-auto max-w-7xl">
                {/* Section Label */}
                <div className="mb-4 font-mono text-xs tracking-[0.3em] text-text-muted uppercase">
                    <span className="text-accent">01</span> — About
                </div>

                <div ref={lineRef} className="hr-animated mb-16" />

                <div className="grid gap-16 lg:grid-cols-2">
                    {/* Left */}
                    <div>
                        <h2
                            ref={headingRef}
                            className="text-4xl font-extralight leading-tight tracking-tight md:text-5xl lg:text-6xl"
                        >
                            <span className='text-4xl'>A simple philosophy:</span>
                            <br />
                            <span className="italic text-accent">Build it right</span> from the start.
                        </h2>
                    </div>

                    {/* Right */}
                    <div className="flex flex-col gap-8">
                        <p
                            ref={(el) => { textRefs.current[0] = el; }}
                            className="text-lg font-light leading-relaxed text-text-muted"
                        >
                            I'm a Full-Stack Engineer focused on designing scalable architectures and building high-performance digital products. I combine clean architecture, maintainable code with thoughtful system design to create applications that grow with the business.
                        </p>
                        <p
                            ref={(el) => { textRefs.current[1] = el; }}
                            className="text-lg font-light leading-relaxed text-text-muted"
                        >
                            Each project is approached with care for structure, performance, and usability — balancing backend strength, and production readiness. I believe great products come from solid engineering fundamentals and consistent attention to detail.
                        </p>
                    </div>
                </div>

                {/* Stats */}
                <div className="mt-24 grid grid-cols-2 gap-8 md:grid-cols-4">
                    {stats.map((stat, i) => (
                        <div
                            key={stat.label}
                            ref={(el) => { statRefs.current[i] = el; }}
                            className="border-t border-border-light pt-6"
                        >
                            <div className="text-4xl font-extralight text-accent md:text-5xl">
                                {stat.number}
                            </div>
                            <div className="mt-2 font-mono text-xs tracking-wider text-text-muted uppercase">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
