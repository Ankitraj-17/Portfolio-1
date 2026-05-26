import React, { useEffect, useRef, useState } from 'react';
// Trigger HMR cache rebuild

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Award } from 'lucide-react';

const CrossQuestVisualizer = () => {
  const [grid, setGrid] = useState([
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', '']
  ]);
  const [status, setStatus] = useState('Typing...');

  useEffect(() => {
    let timer;
    const words = [
      { r: 0, c: 0, char: 'R' }, { r: 0, c: 1, char: 'E' }, { r: 0, c: 2, char: 'A' }, { r: 0, c: 3, char: 'T' },
      { r: 1, c: 1, char: 'O' },
      { r: 2, c: 1, char: 'D' },
      { r: 3, c: 1, char: 'E' }
    ];

    const runLoop = () => {
      setGrid([
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', '']
      ]);
      setStatus('Compiling Grid...');

      let i = 0;
      const typeNext = () => {
        if (i < words.length) {
          const { r, c, char } = words[i];
          setGrid(prev => {
            const next = prev.map(row => [...row]);
            next[r][c] = char;
            return next;
          });
          i++;
          timer = setTimeout(typeNext, 220);
        } else {
          setStatus('VERIFYING...');
          timer = setTimeout(() => {
            setStatus('VALIDATED! ✓');
            timer = setTimeout(runLoop, 2200);
          }, 600);
        }
      };

      timer = setTimeout(typeNext, 500);
    };

    runLoop();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full bg-[#110e0e] flex flex-col items-center justify-center p-4 select-none font-mono text-[9px] relative overflow-hidden">
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[size:100%_4px] opacity-20" />
      <div className="grid grid-cols-4 gap-1.5 mb-3 relative z-10">
        {grid.map((row, r) => 
          row.map((cell, c) => {
            const isFilled = cell !== '';
            const isGreen = status === 'VALIDATED! ✓' && isFilled;
            return (
              <div 
                key={`${r}-${c}`} 
                className={`w-7.5 h-7.5 flex items-center justify-center font-bold border text-[11px] rounded transition-all duration-300 ${
                  isGreen 
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.4)]' 
                    : isFilled 
                      ? 'bg-neutral-900 border-[var(--red)]/40 text-[#ffffff] scale-105' 
                      : 'bg-neutral-950/40 border-neutral-900'
                }`}
              >
                {cell}
              </div>
            );
          })
        )}
      </div>
      <div className={`px-2.5 py-0.5 rounded-full text-[7.5px] font-bold uppercase tracking-widest border transition-all duration-300 relative z-10 ${
        status === 'VALIDATED! ✓' 
          ? 'bg-emerald-950/50 border-emerald-500/30 text-emerald-400 animate-pulse' 
          : 'bg-neutral-900 border-neutral-800 text-[var(--c50)]'
      }`}>
        {status}
      </div>
    </div>
  );
};

const WordPuzzleVisualizer = () => {
  const [guesses, setGuesses] = useState([
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
  ]);
  const [colors, setColors] = useState([
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
  ]);
  const [streak, setStreak] = useState(4);

  useEffect(() => {
    let timer;

    const runLoop = () => {
      setGuesses([
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', '']
      ]);
      setColors([
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', '']
      ]);
      setStreak(4);

      const typeRow1 = () => {
        let i = 0;
        const row1 = ['C', 'L', 'O', 'N', 'E'];
        const typeNext = () => {
          if (i < 5) {
            setGuesses(prev => {
              const next = prev.map(r => [...r]);
              next[0][i] = row1[i];
              return next;
            });
            i++;
            timer = setTimeout(typeNext, 180);
          } else {
            // Flip Row 1
            timer = setTimeout(() => {
              setColors(prev => {
                const next = prev.map(r => [...r]);
                next[0] = ['bg-neutral-800 border-neutral-700', 'bg-neutral-800 border-neutral-700', 'bg-neutral-800 border-neutral-700', 'bg-neutral-800 border-neutral-700', 'bg-neutral-800 border-neutral-700'];
                return next;
              });
              timer = setTimeout(typeRow2, 500);
            }, 200);
          }
        };
        typeNext();
      };

      const typeRow2 = () => {
        let i = 0;
        const row2 = ['S', 'T', 'A', 'C', 'K'];
        const typeNext = () => {
          if (i < 5) {
            setGuesses(prev => {
              const next = prev.map(r => [...r]);
              next[1][i] = row2[i];
              return next;
            });
            i++;
            timer = setTimeout(typeNext, 180);
          } else {
            // Flip Row 2
            timer = setTimeout(() => {
              setColors(prev => {
                const next = prev.map(r => [...r]);
                next[1] = ['bg-neutral-800 border-neutral-700', 'bg-amber-900/60 border-amber-600/40 text-amber-300', 'bg-amber-900/60 border-amber-600/40 text-amber-300', 'bg-neutral-800 border-neutral-700', 'bg-neutral-800 border-neutral-700'];
                return next;
              });
              timer = setTimeout(typeRow3, 500);
            }, 200);
          }
        };
        typeNext();
      };

      const typeRow3 = () => {
        let i = 0;
        const row3 = ['R', 'E', 'A', 'C', 'T'];
        const typeNext = () => {
          if (i < 5) {
            setGuesses(prev => {
              const next = prev.map(r => [...r]);
              next[2][i] = row3[i];
              return next;
            });
            i++;
            timer = setTimeout(typeNext, 180);
          } else {
            // Flip Row 3 (Success!)
            timer = setTimeout(() => {
              setColors(prev => {
                const next = prev.map(r => [...r]);
                next[2] = Array(5).fill('bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.25)]');
                return next;
              });
              setStreak(5);
              timer = setTimeout(runLoop, 2200);
            }, 200);
          }
        };
        typeNext();
      };

      timer = setTimeout(typeRow1, 500);
    };

    runLoop();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full bg-[#0a0d14] flex flex-col items-center justify-center p-4 select-none font-mono text-[9px] relative overflow-hidden">
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[size:100%_4px] opacity-20" />
      
      {/* Streak badge */}
      <div className="mb-3 flex items-center gap-1.5 px-2 py-0.5 rounded bg-orange-950/60 border border-orange-600/40 text-orange-400 font-bold uppercase tracking-widest text-[7px] animate-pulse relative z-10">
        <span>STREAK: {streak}</span>
        <span>🔥</span>
      </div>

      <div className="grid grid-rows-3 gap-1 mb-2 relative z-10">
        {guesses.map((row, r) => (
          <div key={r} className="flex gap-1">
            {row.map((cell, c) => {
              const hasVal = cell !== '';
              const cellColor = colors[r][c];
              return (
                <div 
                  key={`${r}-${c}`} 
                  className={`w-7.5 h-7.5 flex items-center justify-center font-bold border text-[10px] rounded transition-all duration-300 ${
                    cellColor 
                      ? cellColor 
                      : hasVal 
                        ? 'bg-neutral-900 border-neutral-700 text-white' 
                        : 'bg-neutral-950/40 border-neutral-900'
                  }`}
                >
                  {cell}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

const ChatbotVisualizer = () => {
  const [logs, setLogs] = useState([]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    let timer;
    const conversation = [
      { sender: 'user', text: 'Hello! Can you help me?' },
      { sender: 'bot', text: 'Hello! I am ready to accelerate your software engineering.' },
      { sender: 'user', text: 'What is our tech stack?' },
      { sender: 'bot', text: 'We compile with React, Node, C++, and Python diagnostics.' }
    ];

    const runConvo = () => {
      setLogs([]);
      let i = 0;

      const triggerNext = () => {
        if (i < conversation.length) {
          const nextMsg = conversation[i];
          setTyping(true);
          
          // simulated writing delay
          timer = setTimeout(() => {
            setTyping(false);
            setLogs(prev => [...prev, nextMsg]);
            i++;
            timer = setTimeout(triggerNext, 1200);
          }, 800);
        } else {
          timer = setTimeout(runConvo, 3000);
        }
      };

      timer = setTimeout(triggerNext, 500);
    };

    runConvo();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full bg-[#08120b] flex flex-col p-4 justify-between select-none font-mono text-[9px] text-[var(--c80)] relative overflow-hidden">
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[size:100%_4px] opacity-20" />
      
      {/* Dialogue Screen */}
      <div className="flex flex-col gap-2.5 flex-grow overflow-hidden select-none relative z-10 pt-1">
        {logs.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex flex-col max-w-[85%] rounded px-2.5 py-1.5 border transition-all duration-300 ${
              msg.sender === 'user'
                ? 'self-end bg-neutral-900/60 border-neutral-800 text-[#ffffff] rounded-tr-none'
                : 'self-start bg-[var(--red)]/5 border-[var(--red)]/20 text-[var(--red)] rounded-tl-none'
            }`}
          >
            <span className="text-[6px] text-[var(--c40)] uppercase tracking-wider mb-0.5">
              {msg.sender === 'user' ? 'Transmission' : 'AI Assistant'}
            </span>
            <span className="text-[9px] leading-relaxed break-words">{msg.text}</span>
          </div>
        ))}

        {typing && (
          <div className="self-start bg-neutral-900/20 border border-neutral-900 rounded-lg rounded-tl-none px-3 py-2 flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-[var(--red)] animate-bounce" />
            <span className="w-1 h-1 rounded-full bg-[var(--red)] animate-bounce [animation-delay:0.15s]" />
            <span className="w-1 h-1 rounded-full bg-[var(--red)] animate-bounce [animation-delay:0.3s]" />
          </div>
        )}
      </div>

      <div className="mt-2 border-t border-[var(--c20)] pt-2 flex items-center justify-between text-[7px] text-[var(--c40)] uppercase tracking-widest relative z-10">
        <span>SYS.LOG // ACTIVE</span>
      </div>
    </div>
  );
};

const getVisualizer = (title) => {
  if (title === 'Customer Support Chatbot') return <ChatbotVisualizer />;
  return null;
};

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    num: '01',
    title: 'CrossQuest-V2',
    category: 'Web Application',
    year: '2026',
    description:
      'An interactive crossword puzzle application with real-time validation, dynamic hints, and progressive difficulty tiers.',
    tags: ['React', 'Node.js', 'Game Logic', 'TailwindCSS'],
    image: '/crossquest.png',
    liveUrl: 'https://cross-quest-v2.vercel.app/',
    githubUrl: 'https://github.com/Ankitraj-17/CrossQuest-V2',
  },
  {
    num: '02',
    title: 'Word Puzzle',
    category: 'Interactive Game',
    year: '2026',
    description:
      'A mobile-first word guessing engine with streak trackers, keyframe feedbacks, and responsive local-storage retention.',
    tags: ['React', 'CSS Animations', 'State Mgmt', 'Vite'],
    image: '/Word-puzzel.png',
    liveUrl: 'https://ankitraj-17.github.io/CrossQuest/',
    githubUrl: 'https://github.com/Ankitraj-17',
  },
  {
    num: '03',
    title: 'Customer Support Chatbot',
    category: 'JavaScript Project',
    year: '2026',
    description:
      'An interactive customer support chatbot built with vanilla JavaScript, providing automated responses and efficient query handling.',
    tags: ['JavaScript', 'DOM Manipulation', 'HTML5', 'CSS3'],
    image: '/customersupport.png',
    liveUrl: 'https://github.com/Ankitraj-17/JavaScript-Mini-Project',
    githubUrl: 'https://github.com/Ankitraj-17/JavaScript-Mini-Project',
  },
];

const Projects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.proj-row').forEach((row, i) => {
        // Screen Parallax inside Browser
        const img = row.querySelector('.project-img');
        if (img) {
          gsap.fromTo(img,
            { yPercent: 0 },
            {
              yPercent: -18,
              ease: 'none',
              scrollTrigger: {
                trigger: row,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              }
            }
          );
        }

        // Horizontal Sliding Watermarks
        const watermark = row.querySelector('.proj-num-watermark');
        if (watermark) {
          gsap.fromTo(watermark,
            { x: -50, rotate: -2 },
            {
              x: 80,
              rotate: 2,
              ease: 'none',
              scrollTrigger: {
                trigger: row,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              }
            }
          );
        }
      });

      gsap.fromTo(
        '.proj-header-text',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 95%',
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
      className="py-24 md:py-36 relative overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      <div className="container relative z-10 max-w-7xl mx-auto px-6">

        {/* ── Section Header ── */}
        <div className="proj-header-text flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24">
          <div>
            <p className="section-label mb-4">SELECTED WORK // 03</p>
            <h2
              className="text-[clamp(2.4rem,5.5vw,4.5rem)] font-bold text-[var(--cream)] tracking-tighter leading-[1.05] uppercase"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Projects I've<br />Built So <span style={{ fontFamily: 'var(--font-hand)', fontStyle: 'italic', color: 'var(--red)', textTransform: 'lowercase', letterSpacing: 0 }}>Far</span>.
            </h2>
          </div>
          <p className="text-[var(--c70)] max-w-xs text-[13px] leading-relaxed md:mb-1 font-medium">
            Each project is a real-world challenge solved with clean code, modern tooling, and an eye for detail.
          </p>
        </div>

        {/* ── Project Cards (Claymorphism Overhaul) ── */}
        <div className="flex flex-col gap-12 md:gap-20">
          {projects.map((project, i) => {
            const bgColors = [
              'bg-[#fff3f3] dark:bg-[#1a1212]',  // Pastel Coral
              'bg-[#f0f5ff] dark:bg-[#11141a]',  // Pastel Blue
              'bg-[#f0fff4] dark:bg-[#111a13]',  // Pastel Mint
            ];

            return (
              <div
                key={project.title}
                className={`proj-row ${
                  i % 2 === 0 ? 'reveal-left' : 'reveal-right'
                } group relative p-8 md:p-12 border border-[var(--c20)] flex flex-col lg:flex-row gap-10 lg:gap-14 items-stretch justify-between ${
                  i % 2 === 0 ? 'asymmetric-card-1' : 'asymmetric-card-2'
                } ${bgColors[i % bgColors.length]}`}
              >
                {/* Index Number Backdrop (Left Aligned Watermark) */}
                <div 
                  className="proj-num-watermark absolute left-6 top-4 text-8xl md:text-[12rem] font-black font-display select-none pointer-events-none tracking-tighter leading-none z-0"
                  style={{ color: 'var(--cream)', opacity: 0.03 }}
                >
                  {project.num}
                </div>

                {/* Left Side: Info (Flex-1) */}
                <div className="flex-1 flex flex-col justify-between relative z-10">
                  <div className="space-y-6">
                    {/* Meta tags */}
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--red)] bg-[var(--red)]/10 px-3.5 py-1.5 rounded-full font-mono">
                        {project.category}
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--c40)] font-mono">
                        {project.year}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className="text-3xl md:text-4xl lg:text-[40px] font-bold text-[var(--cream)] tracking-tight leading-tight group-hover:text-[var(--red)] transition-colors duration-300"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[var(--c70)] text-[14.5px] leading-[1.8] font-medium max-w-lg">
                      {project.description}
                    </p>

                    {/* Tags in Clay Pills */}
                    <div className="flex flex-wrap gap-2.5 pt-2">
                      {project.tags.map(tag => (
                        <span
                          key={tag}
                          className="clay-pill px-4 py-2 text-[9px] font-bold uppercase tracking-widest text-[var(--c70)] bg-white/60 dark:bg-black/25 border border-black/[0.02] dark:border-white/[0.02] font-mono cursor-default"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 mt-10">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group/btn inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[var(--red)] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[var(--redp)] transition-all duration-300 shadow-md hover:-translate-y-0.5 transform font-mono"
                    >
                      Live Demo 
                      <ArrowUpRight size={13} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group/btn inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--c50)] hover:text-[var(--cream)] transition-colors font-mono"
                    >
                      <span className="group-hover/btn:rotate-12 transition-transform duration-300 flex items-center">
                        <GithubIcon />
                      </span> 
                      Source Code
                    </a>
                  </div>
                </div>

                {/* Right Side: Skeuomorphic Inset Browser Mockup */}
                <div className="w-full lg:w-[460px] flex-shrink-0 flex items-center justify-center relative">
                  <div className="clay-inset w-full overflow-hidden rounded-[2rem] border border-[var(--c20)] bg-[var(--bg)] p-1.5 transition-transform duration-500 group-hover:scale-[1.01]">
                    <div className="rounded-[1.7rem] overflow-hidden bg-[var(--bg2)]">
                      {/* Browser mock header */}
                      <div className="flex items-center gap-1.5 px-5 py-3.5 bg-[var(--bg-elevated)] border-b border-[var(--c20)]">
                        <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                        <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                        <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
                        <span className="ml-3 flex-1 bg-[var(--bg)] text-[8px] text-[var(--c40)] font-mono py-0.5 px-2 rounded text-center truncate border border-[var(--c20)]">
                          {project.title.toLowerCase().replace(/\s+/g, '-')}.dev
                        </span>
                      </div>
                      <div className="aspect-[16/10] overflow-hidden relative group/browser">
                        {getVisualizer(project.title) ? (
                          getVisualizer(project.title)
                        ) : (
                          <img
                            src={project.image}
                            alt={project.title}
                            loading="lazy"
                            className="project-img absolute top-0 left-0 w-full h-[126%] object-cover brightness-95 group-hover/browser:scale-[1.02] transition-transform duration-[1.2s] ease-out"
                          />
                        )}
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/browser:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none z-20">
                          <span className="px-5 py-2.5 rounded-full bg-white text-black text-[9px] font-bold uppercase tracking-wider font-mono shadow-lg scale-90 group-hover/browser:scale-100 transition-transform duration-500">
                            Visit Site
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* ── View All Button ── */}
        <div className="mt-20 md:mt-28 flex justify-center">
          <a
            href="https://github.com/Ankitraj-17"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--red)] text-[#f5f2eb] text-[10px] font-bold uppercase tracking-widest hover:bg-[var(--cream)] hover:text-[var(--bg)] transition-all duration-400 font-mono shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <GithubIcon size={14} />
            View All on GitHub
            <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default Projects;
