import { profile } from "../consts/profile";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pt-8 md:px-12 lg:px-24">
            <div className="flex flex-col items-center justify-between gap-4 border-t border-border-light pt-8 md:flex-row">
                <p className="font-mono text-xs tracking-wider text-text-muted">
                &copy; 2026 {profile.name}. All rights reserved.
                </p>
                <p className="font-mono text-xs tracking-wider text-text-muted">
                Designed & Built with <span className="text-accent">♥</span>
                </p>
                <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="font-mono text-xs tracking-wider text-text-muted uppercase transition-colors hover:text-accent"
                >
                Back to top ↑
                </button>
            </div>
        </div>

        {/* Full-width massive name — bottom touches screen */}
        <div className="footer-name-wrapper mt-12 w-full select-none text-5xl">
            <h2 className="footer-name text-center font-black uppercase tracking-tighter text-text-muted/20">
                {profile.fullName.split(' ').map((word, index) => (
                    <span key={index} className={index === 1 ? "hidden md:inline" : ""}>{word} </span>
                ))}
            </h2>
        </div>
    </footer>
  );
}
