import { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects, type Project } from '../consts/projects';
import LazyImage from '../components/LazyImage';

gsap.registerPlugin(ScrollTrigger);

function ProjectGridCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: (index % 3) * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, cardRef);
    return () => ctx.revert();
  }, [index]);

  return (
    <a
      ref={cardRef}
      href={project.link}
      target="_blank"
      rel="noreferrer"
      className="group block"
    >
      {/* Image */}
      <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-sm bg-bg-card">
        <LazyImage
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          wrapperClassName="h-full w-full"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-bg/60 opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100">
          <div className="flex items-center gap-2 rounded-full border border-accent/40 bg-bg/80 px-5 py-2.5 font-mono text-xs tracking-wider text-accent uppercase">
            View Project
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
      </div>

      {/* Meta row */}
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-xs tracking-[0.2em] text-text-muted uppercase">
          <span className="text-accent">0{index + 1}</span> / {project.year}
        </span>
        <span className="rounded-full border border-border-light px-3 py-0.5 font-mono text-[10px] tracking-wider text-text-muted uppercase">
          {project.category}
        </span>
      </div>

      {/* Title */}
      <h3 className="mb-3 text-2xl font-light tracking-tight transition-colors group-hover:text-accent md:text-3xl">
        {project.title}
      </h3>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded-full border border-border-light px-3 py-1 font-mono text-[10px] tracking-wider text-text-muted uppercase transition-colors group-hover:border-accent/30 group-hover:text-accent/70"
          >
            {t}
          </span>
        ))}
      </div>
    </a>
  );
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const headerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(projects.map((p) => p.category))];
    return ['All', ...cats];
  }, []);

  // Filter projects
  const filtered = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  // Header animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
      );
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: 'power3.inOut', delay: 0.4 }
      );
    });
    return () => ctx.revert();
  }, []);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Re-trigger card animations on filter change
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [activeFilter]);

  return (
    <section className="relative min-h-screen px-6 pt-32 pb-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        {/* Back link */}
        <Link
          to="/"
          className="group mb-12 inline-flex items-center gap-2 font-mono text-xs tracking-wider text-text-muted uppercase transition-colors hover:text-accent"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="transition-transform group-hover:-translate-x-1"
          >
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Home
        </Link>

        {/* Header */}
        <div ref={headerRef}>
          <div className="mb-4 font-mono text-xs tracking-[0.3em] text-text-muted uppercase">
            <span className="text-accent">Archive</span> — All Projects
          </div>

          <h1 className="text-5xl font-extralight leading-tight tracking-tight md:text-6xl lg:text-7xl">
            All <span className="italic text-accent">Projects</span>
          </h1>
          <p className="mt-4 max-w-xl text-base font-light text-text-muted">
            A comprehensive collection of my work spanning web applications,
            creative websites, and digital experiences.
          </p>
        </div>

        <div ref={lineRef} className="hr-animated my-12" />

        {/* Filter bar */}
        <div className="mb-16 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`rounded-full border px-5 py-2 font-mono text-xs tracking-wider uppercase transition-all duration-300 ${
                activeFilter === cat
                  ? 'border-accent bg-accent text-bg'
                  : 'border-border-light text-text-muted hover:border-accent/50 hover:text-text'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects count */}
        <div className="mb-8 font-mono text-xs tracking-wider text-text-muted">
          Showing {filtered.length} project{filtered.length !== 1 ? 's' : ''}
        </div>

        {/* Grid */}
        <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <ProjectGridCard
              key={project.title}
              project={project}
              index={i}
            />
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-lg font-light text-text-muted">
              No projects in this category yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
