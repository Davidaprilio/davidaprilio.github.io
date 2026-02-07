import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { profile } from '../consts/profile';

const NAV_LINKS = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#projects' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const navRef = useRef<HTMLElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const lastScrollY = useRef(0);
    const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

    // Hide navbar on scroll down, show on scroll up
    useEffect(() => {
        const onScroll = () => {
            const currentY = window.scrollY;
            if (currentY > lastScrollY.current && currentY > 100) {
                setHidden(true);
            } else {
                setHidden(false);
            }
            lastScrollY.current = currentY;
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Animate menu links
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
            gsap.fromTo(
                linkRefs.current,
                { y: 80, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.08,
                    delay: 0.3,
                    duration: 0.8,
                    ease: 'power3.out',
                }
            );
        } else {
            document.body.style.overflow = '';
        }
    }, [menuOpen]);

    const handleLinkClick = () => {
        setMenuOpen(false);
    };

    return (
        <>
            <nav
                ref={navRef}
                className={`fixed top-0 left-0 z-100 flex w-full items-center justify-between px-6 py-5 transition-transform duration-500 md:px-12 ${hidden && !menuOpen ? '-translate-y-full' : 'translate-y-0'
                    }`}
                style={{ mixBlendMode: menuOpen ? 'normal' : undefined }}
            >
                {/* Glassmorphism background */}
                <div className="pointer-events-none absolute inset-0 border-none bg-bg/40 backdrop-blur-md" style={{ maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)' }} />
                <a
                    href="#hero"
                    className="text-lg font-bold tracking-widest text-text uppercase relative"
                >
                    {profile.name}<span className="text-accent capitalize"> .Portofolio</span>
                    {/* Decorative corner */}
                    <div className="font-mono text-xs text-text-muted">&copy; 2026</div>
                </a>

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="relative z-110 flex h-10 w-10 flex-col items-center justify-center gap-1.5"
                    aria-label="Toggle menu"
                >
                    <span
                        className={`block h-0.5 w-6 bg-text transition-all duration-300 ${menuOpen ? 'translate-y-1 rotate-45' : ''
                            }`}
                    />
                    <span
                        className={`block h-0.5 w-6 bg-text transition-all duration-300 ${menuOpen ? '-translate-y-1 -rotate-45' : ''
                            }`}
                    />
                </button>
            </nav>

            {/* Full-screen Overlay Menu */}
            <div
                ref={overlayRef}
                className={`nav-overlay fixed inset-0 z-99 flex flex-col items-center justify-center bg-bg ${menuOpen ? 'open' : ''
                    }`}
            >
                <div className="flex flex-col items-center gap-8">
                    {NAV_LINKS.map((link, i) => (
                        <a
                            key={link.label}
                            ref={(el) => { linkRefs.current[i] = el; }}
                            href={link.href}
                            onClick={handleLinkClick}
                            className="group relative text-5xl font-light tracking-tight text-text transition-colors duration-300 hover:text-accent md:text-7xl"
                        >
                            <span className="font-mono text-sm text-text-muted mr-4">
                                0{i + 1}
                            </span>
                            {link.label}
                        </a>
                    ))}
                </div>

                <div className="absolute bottom-10 flex gap-8 text-sm tracking-wider text-text-muted">
                    {Object.entries(profile.socials).map(([label, href]) => (
                        <a href={href} target="_blank" rel="noreferrer" className="link-underline hover:text-accent transition-colors uppercase" key={label}>
                            {label}
                        </a>
                    ))}
                </div>
            </div>
        </>
    );
}
