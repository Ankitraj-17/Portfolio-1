import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Rocket, BookOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    icon: <BookOpen size={20} />,
    period: '2023 — 2025',
    title: '11th & 12th Grade',
    org: 'High School',
    description:
      'Built a strong foundation in Mathematics, Physics, and logical reasoning. Discovered my passion for code and wrote first programs in C++.',
  },
  {
    icon: <GraduationCap size={20} />,
    period: '2025 — 2026',
    title: 'Project Building & Experimentation',
    org: 'Personal & Academic Projects',
    description:
      'Built CrossQuest-V2 and Word Puzzle from scratch. Explored component architecture, advanced React hooks, state management, and immersive scroll animations with GSAP.',
  },
  {
    icon: <Rocket size={20} />,
    period: '2025 — Present',
    title: 'Computer Science Student',
    org: 'University',
    description:
      'Pursuing my degree in Computer Science with excellent academic standing. Self-learning React, Vite, Tailwind CSS, and Node.js while actively solving algorithmic challenges on LeetCode.',
  },
];

const Experience = () => {
  const ref = useRef(null);

  useEffect(() => {
    let ctx;
    let isCleanedUp = false;

    const initExperience = () => {
      if (isCleanedUp) return;
      ctx = gsap.context(() => {
        // Timeline Line self-drawing
        const path = document.querySelector('.timeline-draw-path');
        if (path) {
          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          gsap.to(path, {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 35%',
              end: 'bottom 78%',
              scrub: 1,
            }
          });
        }

        // Highly optimized side-slide and rotational settle reveal
        gsap.utils.toArray('.exp-card').forEach((card, index) => {
          const isEven = index % 2 === 0;
          const targetRot = isEven ? -2 : 2;
          
          gsap.fromTo(card,
            { opacity: 0, x: isEven ? -80 : 80, rotate: isEven ? -8 : 8 },
            {
              opacity: 1,
              x: 0,
              rotate: targetRot,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 92%',
                toggleActions: 'play none none none',
              }
            }
          );
        });
      }, ref);
    };

    if (document.readyState === 'complete') {
      initExperience();
    } else {
      window.addEventListener('load', initExperience);
    }

    return () => {
      isCleanedUp = true;
      window.removeEventListener('load', initExperience);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section 
      id="experience" 
      ref={ref} 
      className="py-24 md:py-36 relative overflow-hidden border-t border-[var(--c20)]"
      style={{ background: 'var(--bg)' }}
    >
      <div className="container relative z-10 max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="fade-up flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <p className="section-label">MY PATH // 04</p>
            <h2 className="text-[clamp(2.2rem,5vw,4.2rem)] font-bold text-[var(--cream)] tracking-tighter leading-[1.05] font-display mb-0 uppercase">
              My Academic<br />& Code <span className="serif-accent">Journey</span>.
            </h2>
          </div>
          <p className="text-[var(--c70)] max-w-sm text-[14px] md:text-[15px] font-medium leading-relaxed md:mb-1">
            A timeline of my academic and professional journey, building the foundation for crafting interactive digital experiences.
          </p>
        </div>

        {/* Interactive Sticky Note Cards Timeline Grid */}
        <div className="relative flex flex-col gap-12 mt-10 md:gap-20 items-stretch">
          {/* Central Winding & Drawing SVG Timeline Line */}
          <div className="absolute left-1/2 top-4 bottom-4 w-2 -translate-x-1/2 hidden md:block z-0 pointer-events-none">
            <svg className="w-full h-full animate-pulse-slow" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="4" y1="0" x2="4" y2="100%" className="stroke-[var(--c20)]" strokeWidth="2" strokeDasharray="6 6" />
              <path
                className="timeline-draw-path stroke-[var(--red)]"
                d="M4,0 L4,2500"
                strokeWidth="3.5"
                strokeLinecap="round"
                style={{ filter: 'drop-shadow(0 0 6px var(--red))' }}
              />
            </svg>
          </div>

          {experiences.map((exp, i) => {
            const isEven = i % 2 === 0;
            const cardRotation = isEven ? 'md:rotate-[-2deg]' : 'md:rotate-[2deg]';
            const cardAlignment = isEven ? 'md:self-start md:w-[calc(50%-24px)]' : 'md:self-end md:w-[calc(50%-24px)]';
            // Curated premium pastel paper note colors (Sage Green, Warm Peach, Steel Blue)
            const bgColors = [
              'bg-[#e0ead8] dark:bg-zinc-900',
              'bg-[#f2e2d9] dark:bg-zinc-900/90',
              'bg-[#dee8eb] dark:bg-zinc-900/80'
            ];

            return (
              <div 
                key={exp.title} 
                className={`exp-card group relative flex flex-col p-8 md:p-10 w-full rounded-[2px_2px_30px_2px] ${bgColors[i % bgColors.length]} shadow-[0_10px_30px_rgba(0,0,0,0.02),inset_0_2px_4px_rgba(255,255,255,0.8)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.05)] border border-[var(--c20)] hover:border-[var(--red)]/20 hover:shadow-[0_20px_45px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:hover:shadow-[0_25px_60px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.08)] transition-all duration-500 cursor-default ${cardRotation} hover:rotate-0 hover:z-20 ${cardAlignment}`}
              >
                {/* Premium Skeuomorphic Translucent Masking Tape */}
                <div 
                  className="absolute top-[-16px] left-1/2 -translate-x-1/2 w-24 h-7 bg-amber-100/35 dark:bg-amber-950/10 backdrop-blur-[1px] border-l border-r border-black/[0.02] dark:border-white/[0.02] shadow-[0_1px_2px_rgba(0,0,0,0.01)] rotate-[-3deg] z-20 pointer-events-none" 
                  style={{ 
                    backgroundImage: 'repeating-linear-gradient(45deg, rgba(0,0,0,0.01) 0px, rgba(0,0,0,0.01) 10px, transparent 10px, transparent 20px)' 
                  }} 
                />

                {/* Timeline Connector Line (desktop only) */}
                <div className={`hidden md:block absolute top-[48px] w-6 border-t-2 border-dashed border-[var(--c20)] group-hover:border-[var(--red)]/30 transition-colors z-0 ${
                  isEven ? 'right-[-24px]' : 'left-[-24px]'
                }`} />

                {/* Timeline Dot Indicator (desktop only) */}
                <div className={`hidden md:flex absolute items-center justify-center z-10 w-6 h-6 rounded-full bg-[var(--bg)] border border-[var(--c30)] top-[38px] shadow-md transition-all duration-300 group-hover:scale-125 group-hover:border-[var(--red)] ${
                  isEven ? 'right-[-35px]' : 'left-[-35px]'
                }`}>
                  {/* Glowing core animation */}
                  <div className="w-3 h-3 rounded-full bg-[var(--red)]/20 transition-colors duration-300 group-hover:bg-[var(--red)]/40 absolute animate-ping" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[var(--c70)] group-hover:bg-[var(--red)] transition-colors duration-300 relative z-10" />
                </div>

                <div className="flex flex-col gap-6 relative z-10 w-full">
                  {/* Card Header (Icon, Organization, Date) */}
                  <div className="flex items-center justify-between border-b border-[var(--c20)] pb-4 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border border-[var(--c20)] flex items-center justify-center text-[var(--c70)] bg-[var(--bg)]/50 group-hover:text-[var(--red)] group-hover:bg-[var(--bg)] transition-colors shadow-sm">
                        {exp.icon}
                      </div>
                      <span className="text-[14px] font-bold text-[var(--c70)] tracking-wide uppercase font-sans">
                        {exp.org}
                      </span>
                    </div>
                    <span 
                      className="text-2xl font-bold text-[var(--red)] leading-none transition-all duration-300 group-hover:scale-105"
                      style={{ fontFamily: 'var(--font-hand)', fontStyle: 'italic' }}
                    >
                      {exp.period}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="space-y-3">
                    <h3 className="text-xl md:text-2xl font-black text-[var(--cream)] tracking-tight leading-tight">
                      {exp.title}
                    </h3>
                    <p className="text-[var(--c70)] text-sm md:text-base leading-relaxed font-medium">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Experience;
