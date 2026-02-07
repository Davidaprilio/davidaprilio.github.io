

export interface Project {
  title: string;
  category: string;
  tech: string[];
  image: string;
  link: string;
  year: string;
}

export const projects: Project[] = [
  {
    title: 'Luminary Studio',
    category: 'Creative Agency Website',
    tech: ['React', 'GSAP', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
    link: '#',
    year: '2025',
  },
  {
    title: 'Nexus Commerce',
    category: 'E-Commerce Platform',
    tech: ['Next.js', 'Stripe', 'Prisma'],
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    link: '#',
    year: '2025',
  },
  {
    title: 'Aether Dashboard',
    category: 'SaaS Application',
    tech: ['TypeScript', 'React', 'D3.js'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    link: '#',
    year: '2024',
  },
  {
    title: 'Wanderlust Travel',
    category: 'Booking Platform',
    tech: ['Next.js', 'Supabase', 'GSAP'],
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
    link: '#',
    year: '2024',
  },
] as const;