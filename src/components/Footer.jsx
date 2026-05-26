import React from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

const Footer = () => {
  const links = [
    { label: 'Work', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Journey', href: '#experience' },
    { label: 'Certificates', href: '#certificates' },
    { label: 'Contact', href: '#', isModalTrigger: true },
  ];

  const socials = [
    { label: 'GitHub', href: 'https://github.com/Ankitraj-17' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ankitraj-jha-103567369' },
  ];

  return (
    <footer id="footer" className="border-t border-[var(--c20)] relative overflow-hidden" style={{ background: 'var(--bg)' }}>

      {/* Subtle background glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[60vw] h-[30vw] rounded-full bg-[var(--red)]/4 blur-[120px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">

        {/* ── Big Statement Row ── */}
        <div className="py-16 md:py-24 border-b border-[var(--c20)] flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          
          {/* Left: Large name + tagline */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--red)]/30 bg-[var(--red)]/8 text-[9px] font-mono font-bold uppercase tracking-widest text-[var(--red)]">
                Available for Internships
              </span>
            </div>
            <h2
              className="font-black text-[var(--cream)] tracking-tight leading-[0.95] font-display uppercase"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)' }}
            >
              Let's build something<br />
              <span className="text-[var(--red)] font-hand lowercase italic tracking-normal" style={{ fontSize: '1.05em' }}>remarkable</span>.
            </h2>
          </div>

          {/* Right: CTA */}
          <div className="flex flex-col gap-4 lg:items-end lg:text-right">
            <p className="text-[var(--c50)] text-sm font-medium max-w-xs leading-relaxed lg:text-right">
              Open to internships, freelance projects, and full-time opportunities in web development.
            </p>
            <a
              href="mailto:ankitra4007@gmail.com"
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[var(--red)] text-white text-[11px] font-mono font-bold uppercase tracking-widest hover:bg-[var(--redp)] transition-colors duration-300 w-fit"
            >
              Start a conversation
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>

        {/* ── Middle Row: Logo + Nav ── */}
        <div className="py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-[var(--c20)]">
          {/* Logo */}
          <div
            className="text-xl font-bold tracking-tight text-[var(--cream)]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Ankitraj<span className="text-[var(--red)]">.</span>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={link.isModalTrigger ? (e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('open-social-modal')); } : undefined}
                className="text-[10px] font-bold uppercase tracking-wider text-[var(--c50)] hover:text-[var(--red)] transition-colors duration-300 font-mono"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* ── Bottom Row ── */}
        <div className="py-6 flex flex-col md:flex-row justify-between items-start md:items-center text-[10px] text-[var(--c40)] gap-4 font-mono">
          <p className="font-medium">© {new Date().getFullYear()} Ankitraj Jha. Designed & Built in India.</p>
          <div className="flex items-center gap-6">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="font-bold uppercase tracking-wider text-[var(--c40)] hover:text-[var(--red)] transition-colors inline-flex items-center gap-0.5"
              >
                {social.label} <ArrowUpRight size={11} className="stroke-[2.5]" />
              </a>
            ))}
            <a
              href="#home"
              className="font-bold uppercase tracking-wider text-[var(--c40)] hover:text-[var(--red)] transition-colors"
            >
              ↑ Top
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
