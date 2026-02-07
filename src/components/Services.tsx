import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
    {
        title: 'API & Backend Engineering',
        description:
            'Building secure, high-performance APIs with clean architecture, authentication, and database optimization.',
        icon: '→',
    },
    {
        title: 'Frontend Development',
        description:
            'Developing responsive, maintainable user interfaces with modern frameworks and state management.',
        icon: '→',
    },
    {
        title: 'System Architecture',
        description:
            'Designing scalable system structures, selecting tech stacks, and defining application flow for long-term growth.',
        icon: '→',
    },
    {
        title: 'Build Custom CMS',
        description:
            'Creating tailored content management systems to empower non-technical users to manage website content easily.',
        icon: '→',
    },
    {
        title: 'Performance & Scalability',
        description:
            'Optimizing system performance, web vitals, caching layers, and infrastructure for high traffic.',
        icon: '→',
    },
    {
        title: 'DevOps & Deployment',
        description:
            'Handling CI/CD pipelines, cloud deployment, monitoring, and production readiness.',
        icon: '→',
    },
    {
        title: 'Technical Leadership',
        description:
            'Defining engineering standards, reviewing code, and guiding product development decisions.',
        icon: '→',
    },

];

export default function Services() {
    const sectionRef = useRef<HTMLElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
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

            itemRefs.current.forEach((el, i) => {
                if (!el) return;
                gsap.fromTo(
                    el,
                    { y: 60, opacity: 0 },
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
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative px-6 py-32 md:px-12 lg:px-24">
            <div className="mx-auto max-w-7xl">
                <div className="mb-4 font-mono text-xs tracking-[0.3em] text-text-muted uppercase">
                    <span className="text-accent">04</span> — Services
                </div>
                <div ref={lineRef} className="hr-animated mb-16" />

                <div className="grid gap-0 md:grid-cols-1">
                    {SERVICES.map((service, i) => (
                        <div
                            key={service.title}
                            ref={(el) => { itemRefs.current[i] = el; }}
                            className="group border-b border-border-light py-10 transition-colors first:border-t hover:bg-bg-light"
                        >
                            <div className="flex flex-col items-start justify-between gap-4 px-4 md:flex-row md:items-center">
                                <div className="flex items-center gap-6">
                                    <span className="font-mono text-sm text-text-muted">
                                        0{i + 1}
                                    </span>
                                    <h3 className="text-2xl font-light tracking-tight transition-colors group-hover:text-accent md:text-3xl">
                                        {service.title}
                                    </h3>
                                </div>
                                <p className="max-w-md text-sm font-light leading-relaxed text-text-muted md:text-right">
                                    {service.description}
                                </p>
                                <span className="text-2xl text-text-muted transition-all group-hover:translate-x-2 group-hover:text-accent">
                                    {service.icon}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
