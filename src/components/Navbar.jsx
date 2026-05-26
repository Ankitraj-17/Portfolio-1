import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Sun, Moon, ArrowUp } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLocation, Link } from 'react-router-dom';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(() => typeof window !== 'undefined' ? window.scrollY > 50 : false);
  const [lastScrollY, setLastScrollY] = useState(() => typeof window !== 'undefined' ? window.scrollY : 0);
  const [isVisible, setIsVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);

      // Calculate scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((currentScrollY / totalHeight) * 100);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const links = [
    { label: 'Work', href: isHome ? '#projects' : '/#projects' },
    { label: 'About', href: isHome ? '#about' : '/#about' },
    { label: 'Journey', href: isHome ? '#experience' : '/#experience' },
    { label: 'Certificates', href: '/certificates' },
    { label: 'Contact', href: '#', isModalTrigger: true },
  ];

  return (
    <>
      <header
        id="navbar"
        className={`fixed top-0 left-0 w-full z-[90] transition-all duration-500 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${scrolled ? 'py-3' : 'py-5'}`}
      >
        <div
          className={`max-w-[1200px] mx-auto px-6 flex items-center justify-between transition-all duration-500 ${
            scrolled
              ? 'bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] py-3 px-8 rounded-full shadow-xl shadow-[rgba(28,26,23,0.03)] max-w-[90vw]'
              : 'py-2'
          }`}
        >
          {/* Logo — Space Grotesk / Bricolage Grotesque bold */}
          <a
            href="#home"
            id="logo-link"
            className="text-xl font-bold tracking-tight transition-opacity duration-300 hover:opacity-85"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span className="text-[var(--cream)]">Ankitraj</span>
            <span className="text-[var(--red)]">.</span>
          </a>

          {/* Desktop Nav — pill style with hover states */}
          <nav className="hidden md:flex items-center gap-1" id="desktop-nav">
            {links.map((link) => (
              link.isModalTrigger ? (
                <a
                  key={link.label}
                  href="#"
                  onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('open-social-modal')); }}
                  className="px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--c70)] hover:text-[var(--cream)] hover:bg-[var(--c08)] rounded-full transition-all duration-300"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--c70)] hover:text-[var(--cream)] hover:bg-[var(--c08)] rounded-full transition-all duration-300"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {link.label}
                </Link>
              )
            ))}
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="ml-2 p-2 rounded-full text-[var(--c70)] hover:text-[var(--cream)] hover:bg-[var(--c08)] transition-all duration-300"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            <a
              href="#contact"
              id="nav-cta"
              className="ml-3 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--red)] text-white text-[10px] font-bold uppercase tracking-[0.16em] hover:bg-[var(--redp)] hover:scale-105 transition-all duration-300 shadow-md shadow-[rgba(28,26,23,0.15)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Let's Talk <ArrowRight size={12} />
            </a>
          </nav>

          {/* Mobile Right Section */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-[var(--c70)] hover:text-[var(--cream)] bg-[var(--c08)] transition-all duration-300"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle"
              className="w-10 h-10 flex items-center justify-center rounded-xl border border-[var(--c20)] bg-[var(--surface)] text-[var(--cream)] z-[60] hover:border-[var(--red)] transition-all duration-300"
              onClick={() => setMenuOpen(!menuOpen)}
            >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      <div 
        className={`md:hidden fixed inset-0 bg-[#1c1a17]/40 backdrop-blur-sm z-[95] transition-opacity duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMenuOpen(false)}
      />
 
      {/* Mobile Menu Sidebar */}
      <div
        id="mobile-nav-sidebar"
        className={`md:hidden fixed top-0 right-0 h-full w-[80vw] max-w-[320px] bg-[var(--bg)] border-l border-[var(--c20)] z-[100] shadow-2xl flex flex-col px-10 py-24 gap-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          className="absolute top-8 right-8 p-2.5 text-[var(--c40)] hover:text-[var(--cream)] transition-colors bg-[var(--c08)] rounded-full"
          onClick={() => setMenuOpen(false)}
        >
          <X size={18} />
        </button>
        
        <p className="text-[9px] uppercase tracking-[0.24em] font-bold text-[var(--red)] mb-4 border-b border-[var(--c08)] pb-4 w-full" style={{ fontFamily: 'var(--font-mono)' }}>
          Directory
        </p>

        {links.map((link) => (
          link.isModalTrigger ? (
            <a
              key={link.label}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(false);
                window.dispatchEvent(new CustomEvent('open-social-modal'));
              }}
              className="text-3xl font-bold tracking-tight text-[var(--cream)] hover:text-[var(--red)] hover:translate-x-2 transition-all duration-300 flex items-center"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {link.label}
            </a>
          ) : (
            <Link
              key={link.label}
              to={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-3xl font-bold tracking-tight text-[var(--cream)] hover:text-[var(--red)] hover:translate-x-2 transition-all duration-300 flex items-center"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {link.label}
            </Link>
          )
        ))}
      </div>

      {/* Floating Circular Mobile Scroll Progress Indicator (Mobile only) */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[var(--bg)] border border-[var(--c20)] flex items-center justify-center lg:hidden shadow-lg transition-all duration-300 active:scale-90 ${
          scrollProgress > 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <svg className="w-full h-full transform -rotate-90 absolute inset-0">
          <circle
            cx="24"
            cy="24"
            r="18"
            className="stroke-[var(--c08)] fill-transparent"
            strokeWidth="2.5"
          />
          <circle
            cx="24"
            cy="24"
            r="18"
            className="stroke-[var(--red)] fill-transparent transition-all duration-75"
            strokeWidth="2.5"
            strokeDasharray={2 * Math.PI * 18}
            strokeDashoffset={2 * Math.PI * 18 - (scrollProgress / 100) * (2 * Math.PI * 18)}
            strokeLinecap="round"
          />
        </svg>
        <div className="text-[var(--red)] relative z-10">
          <ArrowUp size={14} className="stroke-[2.5]" />
        </div>
      </button>
    </>
  );
};

export default Navbar;
