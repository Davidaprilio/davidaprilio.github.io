import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  'React', 'TypeScript', 'Next.js', 'Nest.js', 'GSAP', 'Tailwind CSS', 'Bootstrap CSS',
  'Node.js', 'Figma', 'Three.js', 'Prisma', 'Bun.js', 'MySQL/MariaDB', 'MongoDB',
  'JavaScript', 'HTML/CSS', 'Vue.js', 'PostgreSQL', 'Docker', 'Golang', 'Python',
  'Git', 'REST API', 'GraphQL', 'Vite', 'CI/CD', 'Unit Test', 'PHP', 'Laravel', 'Codeigniter'
];


const slice_skills = (skills: string[], count: number): string[][] => {
  const perSlice = Math.ceil(skills.length / count);
  const slices = [];
  for (let i = 0; i < count; i++) {
    slices.push(skills.slice(i * perSlice, (i + 1) * perSlice));
  }
  return slices;
};

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  return (
    <div className="marquee-row relative flex overflow-hidden py-4">
      <div className={reverse ? 'marquee-track-reverse flex shrink-0 gap-4' : 'marquee-track flex shrink-0 gap-4'}>
        {[...items, ...items].map((skill, i) => (
          <div
            key={`${skill}-${i}`}
            className="flex shrink-0 items-center gap-4 rounded-full border border-border-light px-6 py-3 transition-colors hover:border-accent hover:text-accent"
          >
            <span className="whitespace-nowrap font-light tracking-wide">
              {skill}
            </span>
            <span className="text-accent">✦</span>
          </div>
        ))}
      </div>
      <div className={reverse ? 'marquee-track-reverse flex shrink-0 gap-4' : 'marquee-track flex shrink-0 gap-4'}>
        {[...items, ...items].map((skill, i) => (
          <div
            key={`${skill}-dup-${i}`}
            className="flex shrink-0 items-center gap-4 rounded-full border border-border-light px-6 py-3 transition-colors hover:border-accent hover:text-accent"
          >
            <span className="whitespace-nowrap font-light tracking-wide">
              {skill}
            </span>
            <span className="text-accent">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const isMobile = () => window.innerWidth <= 768;
const getMarqueeItemCount = () => isMobile() ? 4 : 2;

export default function Marquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [skills, setSkills] = useState<string[][]>(slice_skills(SKILLS, getMarqueeItemCount()));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
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

  useEffect(() => {
    const updateMarqueItems = () => {
        const count = getMarqueeItemCount();
        setSkills(slice_skills(SKILLS, count));
    }

    const handleResize = () => {
      updateMarqueItems();
    };

    window.addEventListener('resize', handleResize);
    // updateMarqueItems();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  })

  return (
    <section ref={sectionRef} className="relative overflow-hidden px-6 py-32 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 font-mono text-xs tracking-[0.3em] text-text-muted uppercase">
          <span className="text-accent">03</span> — Capabilities
        </div>
        <div ref={lineRef} className="hr-animated mb-8" />
        <div ref={headingRef} className="mb-16">
          <h2 className="text-4xl font-extralight leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Tech <span className="italic text-accent">stacks</span> & tools
          </h2>
        </div>
      </div>

      <div className="marquee-fade space-y-4">
        {skills.map((skillsSlice, index) => (
          <MarqueeRow
            key={`marquee-row-${index}`}
            items={skillsSlice}
            reverse={index % 2 === 1}
          />
        ))}
      </div>
    </section>
  );
}
