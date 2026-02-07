import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects, type Project } from '../consts/projects';

gsap.registerPlugin(ScrollTrigger);


function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      if (!cardRef.current) return;
      // Parallax on image
      gsap.to(imageRef.current?.querySelector('img') as HTMLImageElement, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <a
      ref={cardRef}
      href={project.link}
      target="_blank"
      rel="noreferrer"
      className="project-card group block"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-xs tracking-[0.2em] text-text-muted uppercase">
          <span className="text-accent">0{index + 1}</span> / {project.year}
        </span>
        <div className="flex items-center gap-2 text-sm text-text-muted transition-colors group-hover:text-accent">
          <span className="font-mono text-xs tracking-wider uppercase">Visit</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          >
            <path
              d="M1 13L13 1M13 1H3M13 1V11"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </div>

      <div
        ref={imageRef}
        className="project-image-wrapper mb-6 aspect-[16/10] overflow-hidden rounded-sm bg-bg-card"
      >
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div ref={contentRef}>
        <h3 className="mb-2 text-2xl font-light tracking-tight transition-colors group-hover:text-accent md:text-3xl">
          {project.title}
        </h3>
        <p className="mb-3 text-sm font-light text-text-muted">
          {project.category}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border-light px-3 py-1 font-mono text-[10px] tracking-wider text-text-muted uppercase"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative px-6 py-32 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Label */}
        <div className="mb-4 font-mono text-xs tracking-[0.3em] text-text-muted uppercase">
          <span className="text-accent">02</span> — Selected Work
        </div>

        <div ref={lineRef} className="hr-animated mb-8" />

        <div ref={headingRef} className="mb-20">
          <h2 className="text-4xl font-extralight leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Featured <span className="italic text-accent">projects</span>
          </h2>
          <p className="mt-4 max-w-lg text-base font-light text-text-muted">
            A selection of recent work that showcases my approach to design and development.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
