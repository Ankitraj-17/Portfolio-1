import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal, ArrowRight, Layout, FileCode, Atom, Server, Cpu, Brain } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Self-contained animated stat card with IntersectionObserver count-up
const StatCard = ({ item }) => {
  const elRef = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const target = item.val;
    const isDecimal = String(target).includes('.');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const duration = 1600;
          const startTime = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = ease * target;
            el.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current)) + item.suff;
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [item.val, item.suff]);

  return (
    <div
      className="group relative flex flex-col justify-between p-5 rounded-2xl bg-[var(--surface)] border border-[var(--c20)] overflow-hidden hover:border-[var(--red)]/30 transition-all duration-300 min-h-[120px]"
      style={{ borderBottom: `2px solid ${item.accent}22` }}
    >
      {/* Accent bottom flash on hover */}
      <div
        className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
        style={{ backgroundColor: item.accent }}
      />
      {/* Icon / glyph */}
      <span
        className="text-[11px] font-mono mb-2 block"
        style={{ color: item.accent }}
      >
        {item.icon}
      </span>
      {/* Big number */}
      <span
        ref={elRef}
        className="block font-black font-display tracking-tight leading-none text-[var(--cream)] group-hover:text-[var(--cream)]"
        style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', color: item.accent }}
      >
        0{item.suff}
      </span>
      {/* Label */}
      <span className="text-[9.5px] font-mono uppercase tracking-[0.18em] text-[var(--c50)] mt-2 block leading-snug whitespace-pre-line">
        {item.label}
      </span>
    </div>
  );
};

const skills = [
  {
    name: 'HTML & CSS',
    icon: <Layout size={16} />,
    desc: 'Semantic structure, grid layout systems, & responsive fluid design.',
    pct: 95,
    color: '#e34f26' // HTML5 Orange
  },
  {
    name: 'JavaScript',
    icon: <FileCode size={16} />,
    desc: 'Asynchronous event execution, dynamic DOM mutations, & deep ES6+ paradigms.',
    pct: 90,
    color: '#f7df1e' // JS Yellow
  },
  {
    name: 'React',
    icon: <Atom size={16} />,
    desc: 'Component rendering cycles, modular architecture, & advanced hook management.',
    pct: 88,
    color: '#61dafb' // React Cyan
  },
  {
    name: 'Node.js',
    icon: <Server size={16} />,
    desc: 'Backend REST API structuring, asynchronous processing, & service routers.',
    pct: 80,
    color: '#339933' // Node Green
  },
  {
    name: 'Python',
    icon: <Terminal size={16} />,
    desc: 'Automated data scripting, system helper utilities, & algorithms.',
    pct: 75,
    color: '#3776ab' // Python Blue
  },
  {
    name: 'C++',
    icon: <Cpu size={16} />,
    desc: 'Low-level memory execution, object structures, & advanced diagnostic coding.',
    pct: 85,
    color: '#00599c' // C++ Blue
  },
];

const About = () => {
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState('mindset');

  useEffect(() => {
    let ctx;
    let isCleanedUp = false;

    const initAbout = () => {
      if (isCleanedUp) return;
      ctx = gsap.context(() => {
        // 1. Title Animation
        gsap.fromTo(
          '.about-title-anim',
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 90%' },
          }
        );

        // 2. Polaroid Portrait scroll parallax
        gsap.to('.about-polaroid-parallax', {
          y: -40,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          }
        });
      }, sectionRef);
    };

    if (document.readyState === 'complete') {
      initAbout();
    } else {
      window.addEventListener('load', initAbout);
    }

    return () => {
      isCleanedUp = true;
      window.removeEventListener('load', initAbout);
      if (ctx) ctx.revert();
    };
  }, []);

  // Slide & scale spring reveal when switching tabs
  useEffect(() => {
    gsap.fromTo('.tab-content-wrapper',
      { opacity: 0, scale: 0.96, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );
  }, [activeTab]);

  // Dynamic 3D Card tilt listeners mapped precisely to the 'arsenal' rendering lifecycle
  useEffect(() => {
    if (activeTab !== 'arsenal') return;

    // Timeout ensures elements are fully mounted in DOM before query
    const timer = setTimeout(() => {
      const tiltCards = document.querySelectorAll('.skill-tilt-card');
      const boundsListeners = [];

      tiltCards.forEach(card => {
        const boundMove = (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const xc = rect.width / 2;
          const yc = rect.height / 2;
          const angleX = (yc - y) / 8;
          const angleY = (x - xc) / 8;
          gsap.to(card, {
            rotateX: angleX,
            rotateY: angleY,
            scale: 1.025,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        };

        const boundLeave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.5,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        };

        card.addEventListener('mousemove', boundMove);
        card.addEventListener('mouseleave', boundLeave);
        boundsListeners.push({ card, boundMove, boundLeave });
      });

      window._boundsListeners = boundsListeners;
    }, 50);

    return () => {
      clearTimeout(timer);
      if (window._boundsListeners) {
        window._boundsListeners.forEach(({ card, boundMove, boundLeave }) => {
          card.removeEventListener('mousemove', boundMove);
          card.removeEventListener('mouseleave', boundLeave);
        });
        window._boundsListeners = null;
      }
    };
  }, [activeTab]);

  const tabIndex = activeTab === 'mindset' ? 0 : 1;

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
    >
      <div className="container relative z-10 max-w-7xl mx-auto px-6">
        
        {/* ── Section Header ── */}
        <div className="mb-16 md:mb-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-end">
          {/* Left: Label + Heading */}
          <div>
            <p className="about-title-anim text-[10px] uppercase tracking-[0.32em] font-bold text-[var(--red)] mb-5 font-mono flex items-center gap-3">
              <span className="w-6 h-px bg-[var(--red)] inline-block" />
              Phase 02: Origin
            </p>
            <h2 className="about-title-anim font-black text-[var(--cream)] tracking-tight leading-[1.0] font-display uppercase" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)' }}>
              A curious mind<br />
              with a passion for{' '}
              <span className="text-[var(--red)] font-hand lowercase italic tracking-normal" style={{ fontSize: '1.1em' }}>craft</span>.
            </h2>
          </div>

          {/* Right: Bio blurb + quick stats row */}
          <div className="about-title-anim flex flex-col gap-6">
            <p className="text-[var(--c60)] text-sm leading-[1.85] font-medium">
              Building at the intersection of <strong className="text-[var(--cream)] font-semibold">clean architecture</strong> and{' '}
              <strong className="text-[var(--cream)] font-semibold">visual craft</strong> — from low-level C++ algorithms to 
              full-stack React systems.
            </p>
            {/* Quick stat pills */}
            <div className="flex flex-wrap gap-3">
              {[
                { n: '3+',   label: 'yrs coding' },
                { n: '85K+', label: 'lines written' },
                { n: '45+',  label: 'repos' },
              ].map(({ n, label }) => (
                <div key={n} className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--c20)] bg-[var(--bg2)]">
                  <span className="font-black font-display text-[var(--red)] text-sm leading-none">{n}</span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[var(--c50)]">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Dynamic Tab Selector (Apple/Vercel sliding slider style) ── */}
        <div className="flex justify-center mb-16 relative z-20">
          <div className="clay-pill bg-[var(--bg2)] border border-[var(--c20)] p-1.5 flex gap-2 relative overflow-hidden backdrop-blur-md w-full max-w-[340px] rounded-full">
            {/* Sliding Background Pill */}
            <div 
              className="absolute top-1.5 bottom-1.5 left-1.5 rounded-full bg-[var(--red)] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-[0_4px_16px_rgba(227,83,66,0.3)] pointer-events-none"
              style={{
                width: 'calc(50% - 6px)',
                transform: `translateX(${tabIndex * 100}%)`,
              }}
            />
            {[
              { id: 'mindset', label: 'Mindset & Origin', icon: <Brain size={13} /> },
              { id: 'arsenal', label: 'Tech Arsenal', icon: <Cpu size={13} /> }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-500 relative z-10 w-full ${
                    isActive
                      ? 'text-white'
                      : 'text-[var(--c70)] hover:text-[var(--cream)]'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Tab Content Wrapper ── */}
        <div className="tab-content-wrapper min-h-[500px]">
          {activeTab === 'mindset' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full relative perspective-parent">
              
              {/* Card 1: About & Polaroid (Spans 7 cols, tall) */}
              <div className="about-glass-card lg:col-span-7 asymmetric-card-1 bg-[var(--bg2)] border border-[var(--c20)] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.03)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.45)] relative overflow-hidden group flex flex-col md:flex-row gap-10 items-center reveal-left">
                
                {/* Skeuomorphic Graph Paper Grid Overlay */}
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--cream) 1.5px, transparent 1.5px)', backgroundSize: '18px 18px' }} />
                
                <div className="flex-1 flex flex-col justify-between h-full z-10">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[var(--red)] bg-[var(--red)]/10 px-3.5 py-1 rounded-full">
                        // INDIA
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--red)]/10 border border-[var(--red)]/25 text-[9px] font-mono text-[var(--red)] font-bold uppercase">
                        Available for Internships
                      </span>
                    </div>

                    <p className="text-[var(--c70)] text-[14.5px] leading-[1.8] font-medium mb-10">
                      Based in India, I engineer at the intersection of <strong className="text-[var(--cream)] font-bold">clean systems logic</strong> and <strong className="text-[var(--cream)] font-bold">immersive digital design</strong>. I am driven to collaborate with high-performance engineering teams, master state-of-the-art platforms, and ship robust codebases for next-generation digital products.
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      window.dispatchEvent(new CustomEvent('open-social-modal'));
                    }}
                    className="group/btn inline-flex items-center gap-4 w-fit pb-1.5 border-b border-[var(--red)]/35 hover:border-[var(--red)] transition-colors duration-300"
                  >
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--cream)] group-hover/btn:text-[var(--red)] transition-colors duration-300">
                      Initiate Contact
                    </span>
                    <ArrowRight
                      size={14}
                      className="text-[var(--red)] transform group-hover/btn:translate-x-1.5 transition-transform duration-300"
                    />
                  </button>
                </div>
                
                {/* Polaroid portrait */}
                <div className="about-polaroid-parallax flex flex-col items-center flex-shrink-0 relative group/img-wrapper z-10 w-fit mt-8 md:mt-0">
                  {/* Skeuomorphic Brutalist Tape */}
                  <div className="absolute top-[-14px] left-1/2 -translate-x-1/2 w-20 h-6 bg-amber-100/35 dark:bg-amber-950/10 backdrop-blur-[1px] border-l border-r border-black/[0.02] dark:border-white/[0.02] shadow-[0_1px_2px_rgba(0,0,0,0.01)] rotate-[-4deg] z-25 pointer-events-none" />
                  
                  {/* 3D Offset Brutalist Outline */}
                  <div className="absolute -inset-2 border border-dashed border-[var(--red)]/25 rounded-2xl -z-0 pointer-events-none transition-all duration-500 group-hover/img-wrapper:scale-[1.02] group-hover/img-wrapper:border-[var(--red)]/45" />

                  {/* Polaroid Frame Card */}
                  <div className="w-[220px] md:w-[230px] p-3.5 pb-6 rounded-2xl border border-[var(--c20)] bg-white dark:bg-zinc-900 shadow-2xl z-10 transition-all duration-500 group-hover/img-wrapper:translate-y-[-8px] flex flex-col items-center">
                    <div className="w-full aspect-square rounded-lg overflow-hidden relative border border-black/5 bg-[var(--surface)]">
                      {/* Photo overlay glass glare */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/20 z-10 opacity-0 group-hover/img-wrapper:opacity-100 transition-opacity duration-700 pointer-events-none" />
                      <img
                        src="/profile2.png"
                        alt="Ankitraj Jha"
                        className="absolute inset-0 w-full h-full object-cover filter contrast-[1.02] saturate-[0.85] group-hover/img-wrapper:scale-105 transition-all duration-700"
                      />
                    </div>
                    
                    {/* Handwritten signature area */}
                    <div className="mt-4 flex flex-col items-center select-none">
                      <span 
                        className="text-[var(--red)] text-[20px] font-medium leading-none tracking-normal"
                        style={{ fontFamily: 'var(--font-hand)', fontStyle: 'italic' }}
                      >
                        ankitraj jha
                      </span>
                      <span className="text-[7px] font-mono tracking-widest text-[var(--c40)] uppercase mt-1">
                        sys.dev // 2026
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Card 2: Philosophy (Philosophy Card - pullquote editorial style) */}
              <div className="about-glass-card lg:col-span-5 asymmetric-card-2 bg-[var(--bg2)] border border-[var(--c20)] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.03)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.45)] relative overflow-hidden flex flex-col justify-center reveal-right group">
                
                {/* Skeuomorphic Graph Paper Grid Overlay */}
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--cream) 1.5px, transparent 1.5px)', backgroundSize: '18px 18px' }} />
                
                {/* Neon Red/Coral Soft Radial Glow */}
                <div className="absolute -bottom-20 -right-20 w-52 h-52 rounded-full bg-[var(--red)]/5 blur-[80px] group-hover:bg-[var(--red)]/10 transition-colors duration-500 pointer-events-none" />

                {/* Skeuomorphic Backquote symbol */}
                <div 
                  className="absolute -top-10 -right-4 text-[16rem] font-serif text-[var(--c20)] select-none pointer-events-none leading-none opacity-20 transform rotate-12 transition-transform duration-700 group-hover:rotate-6 group-hover:scale-105"
                  style={{ textShadow: '1px 1px 0px var(--bg)' }}
                >
                  “
                </div>

                <h3 className="text-[9px] font-bold uppercase tracking-[0.25em] text-[var(--gold)] mb-8 font-mono relative z-10">
                  // Core Philosophy
                </h3>
                <p className="text-[var(--cream)] text-lg md:text-xl leading-[1.6] font-semibold relative z-10">
                  "I fell in love with programming because it empowers me to build whatever I imagine. I don't just write code — I <span className="text-[var(--red)]">engineer experiences</span> that feel alive."
                </p>
                <p className="text-[var(--c70)] text-sm leading-[1.8] font-medium mt-6 relative z-10">
                  From structuring optimized computational logic in C++ to structuring full-stack systems with React and Node.js, I bridge the gap between architectural precision and visual excellence.
                </p>
              </div>

            </div>
          )}

          {activeTab === 'arsenal' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full relative perspective-parent">
              
              {/* Card 3: Skills List (Spans 8 cols) */}
              <div className="about-glass-card lg:col-span-8 asymmetric-card-1 bg-[var(--bg2)] border border-[var(--c20)] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.03)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.45)] relative overflow-hidden reveal-left">
                
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--cream) 1.5px, transparent 1.5px)', backgroundSize: '18px 18px' }} />
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 relative z-10">
                  <h3 className="text-[9px] font-bold uppercase tracking-[0.25em] text-[var(--gold)] font-mono">
                    // Technical Toolset
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[var(--c50)]">
                      Drives Active
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                  {skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="skill-tilt-card group flex flex-col p-5 rounded-2xl bg-[var(--surface)] border border-[var(--c20)] shadow-[0_6px_12px_rgba(0,0,0,0.02)] dark:shadow-[0_6px_15px_rgba(0,0,0,0.3)] hover:border-[var(--red)]/20 hover:shadow-[0_4px_16px_rgba(0,0,0,0.02)] transition-all duration-300 cursor-pointer"
                      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
                    >
                      <div className="flex items-center gap-5">
                        <div 
                          className="w-12 h-12 rounded-xl bg-[var(--bg2)] border border-[var(--c20)] flex items-center justify-center text-[var(--c70)] group-hover:text-white group-hover:-translate-y-1 transition-all duration-300"
                          style={{ 
                            '--hover-bg': skill.color 
                          }}
                        >
                          <span className="group-hover:scale-110 transition-transform duration-300" style={{ color: 'inherit' }}>
                            {React.cloneElement(skill.icon, {
                              className: 'group-hover:text-white transition-colors duration-300'
                            })}
                          </span>
                        </div>
                        <div className="flex-grow">
                          <p className="font-bold text-[var(--cream)] text-sm">{skill.name}</p>
                          <p className="text-[11px] text-[var(--c70)] leading-relaxed font-medium mt-1 pr-4">
                            {skill.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 4: Stats Bento Grid */}
              <div className="about-glass-card lg:col-span-4 asymmetric-card-2 bg-[var(--bg2)] border border-[var(--c20)] p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.45)] relative overflow-hidden flex flex-col reveal-right">
                
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--cream) 1.5px, transparent 1.5px)', backgroundSize: '18px 18px' }} />
                <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-[var(--red)]/5 blur-[60px] pointer-events-none" />

                <div className="mb-5 relative z-10">
                  <h3 className="text-[9px] font-bold uppercase tracking-[0.25em] text-[var(--gold)] font-mono">
                    // By The Numbers
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3 relative z-10 flex-grow">
                  {[
                    { label: 'Years\nCoding', val: 3,    suff: '+',  accent: 'var(--red)',  icon: '⟨/⟩' },
                    { label: 'Hours\nDebugging', val: 2400, suff: '+',  accent: 'var(--gold)', icon: '◎' },
                    { label: 'Lines\nWritten', val: 85,   suff: 'K+', accent: 'var(--red)',  icon: '▣' },
                    { label: 'GitHub\nRepos', val: 45,   suff: '+',  accent: 'var(--gold)', icon: '⎇' },
                  ].map((item, idx) => (
                    <StatCard key={idx} item={item} />
                  ))}
                </div>
              </div>

            </div>
          )}


        </div>
      </div>
    </section>
  );
};

export default About;
