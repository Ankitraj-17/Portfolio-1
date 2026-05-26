import React, { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hyperspeed from './Hyperspeed';
import { useTheme } from '../contexts/ThemeContext';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const [timeString, setTimeString] = useState('');

  // Hyperspeed effect options — tuned to match the portfolio's retro dark editorial theme with rich, saturated light trails
  const hyperspeedOptions = useMemo(() => ({
    distortion: 'turbulentDistortion',
    length: 400,
    roadWidth: 10,
    islandWidth: 2,
    lanesPerRoad: 4,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 20,
    lightPairsPerRoadWay: 40,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],
    movingAwaySpeed: [60, 80],
    movingCloserSpeed: [-120, -160],
    carLightsLength: [400 * 0.03, 400 * 0.2],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.8, 0.8],
    carFloorSeparation: [0, 5],
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0x131313,
      brokenLines: 0x131313,
      // Burgundy / crimson tones matching --red
      leftCars: [0xB92B27, 0x8A1C1C, 0xD13631],
      // Warm gold / amber tones matching --gold
      rightCars: [0xB38000, 0xF2BA49, 0xD4A020],
      sticks: 0xB92B27,
    },
  }), []);

  // Live Digital Clock (IST)
  useEffect(() => {
    const updateClock = () => {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      const now = new Date();
      try {
        const str = now.toLocaleTimeString('en-US', options);
        setTimeString(str + ' IST');
      } catch (err) {
        setTimeString(now.toTimeString().split(' ')[0] + ' IST');
      }
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let ctx;
    let animationFrameId;
    let resizeListener;
    let mouseMoveListener;
    let mouseLeaveListener;
    let canvasObserver;
    let boundsListeners = [];
    let isCleanedUp = false;

    const initHero = () => {
      if (isCleanedUp) return;

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        // Staggered 3D reveal animation for ANKITRAJ Jha.
        tl.fromTo('.hero-title-char', 
          { y: 140, rotateX: -100, rotateY: 25, opacity: 0, scale: 0.75, transformOrigin: '50% 50% -150px' },
          { y: 0, rotateX: 0, rotateY: 0, opacity: 1, scale: 1, duration: 1.6, stagger: 0.05, ease: 'back.out(1.5)' },
          0.2
        )
        .fromTo('.hero-subtitle', 
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 1.1 }, 
          0.7
        )
        .fromTo('.hero-ctas',
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.9 },
          0.9
        )
        .fromTo('.hero-sidebar-widget',
          { opacity: 0, x: (i) => i === 0 ? -60 : 60 },
          { opacity: 1, x: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out' },
          0.8
        );

        // Scroll Parallax for text container — scrub: true synchronizes animations tightly with scroll position for instant response
        gsap.to('.hero-text-container', {
          y: -120,
          opacity: 0.1,
          scale: 0.95,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        });

        // Scroll Parallax for side columns - scrub: true prevents delay / slugishness
        gsap.fromTo('.hero-sidebar-widget',
          { opacity: 1, y: 0 },
          {
            y: -180,
            opacity: 0.1,
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            }
          }
        );

      }, heroRef);

      // Canvas Retro Tech Grid and Spotlight
      const canvas = canvasRef.current;
      let canvasPaused = false;

      if (canvas) {
        const canvasCtx = canvas.getContext('2d');

        canvasObserver = new IntersectionObserver(([entry]) => {
          canvasPaused = !entry.isIntersecting;
        }, { threshold: 0 });
        canvasObserver.observe(canvas);
        
        const resizeCanvas = () => {
          canvas.width = canvas.offsetWidth;
          canvas.height = canvas.offsetHeight;
        };
        resizeCanvas();
        
        resizeListener = () => resizeCanvas();
        window.addEventListener('resize', resizeListener);

        let mouse = { x: -1000, y: -1000, active: false };

        mouseMoveListener = (e) => {
          const rect = canvas.getBoundingClientRect();
          mouse.x = e.clientX - rect.left;
          mouse.y = e.clientY - rect.top;
          mouse.active = true;
        };

        mouseLeaveListener = () => {
          mouse.active = false;
        };

        window.addEventListener('mousemove', mouseMoveListener);
        document.body.addEventListener('mouseleave', mouseLeaveListener);

        // Delicate Floating Tech Particles (plus symbols & circles)
        const particleCount = 18;
        const particles = [];
        const chars = ['+', '○', '•', '+'];
        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height + canvas.height,
            size: Math.random() * 8 + 6,
            char: chars[Math.floor(Math.random() * chars.length)],
            speedY: Math.random() * 0.35 + 0.15,
            speedX: Math.random() * 0.2 - 0.1,
            opacity: Math.random() * 0.25 + 0.08,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.008,
          });
        }

        const draw = () => {
          if (!canvas || !canvasCtx) return;

          if (canvasPaused) {
            animationFrameId = requestAnimationFrame(draw);
            return;
          }

          const w = canvas.width;
          const h = canvas.height;
          canvasCtx.clearRect(0, 0, w, h);

          const gridSize = 64;
          const isDark = document.documentElement.classList.contains('dark');
          const colorBase = isDark ? '255, 255, 255' : '28, 26, 23';
          const lineAccent = isDark ? '185, 43, 39' : '138, 28, 28';

          // 1. Draw Spotlight (radial ambient cursor glow)
          if (mouse.active) {
            const gradient = canvasCtx.createRadialGradient(
              mouse.x, mouse.y, 0,
              mouse.x, mouse.y, 350
            );
            if (isDark) {
              gradient.addColorStop(0, 'rgba(185, 43, 39, 0.09)'); // Glowing Red
              gradient.addColorStop(0.5, 'rgba(242, 186, 73, 0.02)'); // Glowing Gold
            } else {
              gradient.addColorStop(0, 'rgba(138, 28, 28, 0.07)'); // Soft Red
              gradient.addColorStop(0.5, 'rgba(179, 128, 0, 0.018)'); // Soft Gold
            }
            gradient.addColorStop(1, 'transparent');
            canvasCtx.fillStyle = gradient;
            canvasCtx.fillRect(0, 0, w, h);
          }

          // 2. Draw Retro Grid lines
          canvasCtx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.015)' : 'rgba(28, 26, 23, 0.025)';
          canvasCtx.lineWidth = 1;

          for (let x = 0; x < w; x += gridSize) {
            canvasCtx.beginPath();
            canvasCtx.moveTo(x, 0);
            canvasCtx.lineTo(x, h);
            canvasCtx.stroke();
          }

          for (let y = 0; y < h; y += gridSize) {
            canvasCtx.beginPath();
            canvasCtx.moveTo(0, y);
            canvasCtx.lineTo(w, y);
            canvasCtx.stroke();
          }

          // 3. Draw Grid Intersection Dots
          for (let x = 0; x < w; x += gridSize) {
            for (let y = 0; y < h; y += gridSize) {
              let opacity = 0.04;
              if (mouse.active) {
                const dx = mouse.x - x;
                const dy = mouse.y - y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 180) {
                  opacity += (1 - dist / 180) * 0.12;
                }
              }
              canvasCtx.fillStyle = `rgba(${colorBase}, ${opacity})`;
              canvasCtx.beginPath();
              canvasCtx.arc(x, y, 1.2, 0, Math.PI * 2);
              canvasCtx.fill();
            }
          }

          // 4. Draw & Update Floating Particles
          const scrollY = window.scrollY;
          const warpFactor = 1 + (scrollY * 0.012);

          particles.forEach(p => {
            if (mouse.active) {
              const dx = p.x - mouse.x;
              const dy = p.y - mouse.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 140) {
                const force = (140 - dist) / 140;
                const angle = Math.atan2(dy, dx);
                p.x += Math.cos(angle) * force * 1.8;
                p.y += Math.sin(angle) * force * 1.8;
              }
            }

            p.y -= p.speedY * warpFactor;
            p.x += p.speedX;
            p.rotation += p.rotSpeed;

            if (p.y < -30) {
              p.y = h + 30;
              p.x = Math.random() * w;
            }
            if (p.x < -30) p.x = w + 30;
            if (p.x > w + 30) p.x = -30;

            canvasCtx.save();
            canvasCtx.translate(p.x, p.y);
            canvasCtx.scale(1, warpFactor > 1.15 ? warpFactor * 0.85 : 1);
            canvasCtx.rotate(p.rotation);
            canvasCtx.font = '10px monospace';
            canvasCtx.fillStyle = `rgba(${colorBase}, ${Math.min(0.7, p.opacity * (1 + scrollY * 0.002))})`;
            canvasCtx.fillText(p.char, -3, 3);
            canvasCtx.restore();
          });

          // 4b. Draw delicate interconnected constellation lines
          canvasCtx.lineWidth = 0.5;
          for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
              const p1 = particles[i];
              const p2 = particles[j];
              const dx = p1.x - p2.x;
              const dy = p1.y - p2.y;
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist < 110) {
                const alpha = (1 - dist / 110) * 0.12;
                canvasCtx.strokeStyle = `rgba(${lineAccent}, ${alpha})`;
                canvasCtx.beginPath();
                canvasCtx.moveTo(p1.x, p1.y);
                canvasCtx.lineTo(p2.x, p2.y);
                canvasCtx.stroke();
              }
            }
          }

          animationFrameId = requestAnimationFrame(draw);
        };
        draw();
      }

      // 5. Magnetic CTA Button physics
      const magneticButtons = document.querySelectorAll('.btn-magnetic');

      magneticButtons.forEach(btn => {
        const boundMove = (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          gsap.to(btn, {
            x: x * 0.38,
            y: y * 0.38,
            duration: 0.3,
            ease: 'power2.out'
          });
          
          const innerText = btn.querySelector('.btn-magnetic-inner');
          if (innerText) {
            gsap.to(innerText, {
              x: x * 0.18,
              y: y * 0.18,
              duration: 0.3,
              ease: 'power2.out'
            });
          }
        };

        const boundLeave = () => {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1.1, 0.4)'
          });
          
          const innerText = btn.querySelector('.btn-magnetic-inner');
          if (innerText) {
            gsap.to(innerText, {
              x: 0,
              y: 0,
              duration: 0.6,
              ease: 'elastic.out(1.1, 0.4)'
            });
          }
        };

        btn.addEventListener('mousemove', boundMove);
        btn.addEventListener('mouseleave', boundLeave);
        boundsListeners.push({ btn, boundMove, boundLeave });
      });
    };

    if (document.readyState === 'complete') {
      initHero();
    } else {
      window.addEventListener('load', initHero);
    }

    return () => {
      isCleanedUp = true;
      window.removeEventListener('load', initHero);
      if (ctx) ctx.revert();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (resizeListener) window.removeEventListener('resize', resizeListener);
      if (mouseMoveListener) window.removeEventListener('mousemove', mouseMoveListener);
      if (mouseLeaveListener) document.body.removeEventListener('mouseleave', mouseLeaveListener);
      if (canvasObserver) {
        canvasObserver.disconnect();
        canvasObserver = null;
      }
      
      boundsListeners.forEach(({ btn, boundMove, boundLeave }) => {
        btn.removeEventListener('mousemove', boundMove);
        btn.removeEventListener('mouseleave', boundLeave);
      });
    };
  }, []);



  const marqueeItems = [
    "Web Development",
    "Fast & Interactive UIs",
    "BTech CSE",
    "Full-Stack",
    "Scalable Apps",
    "Problem Solving",
  ];

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[105svh] w-full flex flex-col justify-between overflow-hidden pt-36 pb-12"
      style={{ background: 'var(--bg)' }}
    >
      {/* ── Hyperspeed WebGL Background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Hyperspeed effectOptions={hyperspeedOptions} />
      </div>

      {/* ── Cinematic Vignette + Bottom Fade Overlay (Theme-aware) ── */}
      <div className="hero-overlay absolute inset-0 z-[1] pointer-events-none" />

      {/* ── Retro tech interactive background canvas (layered above overlays) ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-[2]"
      />

      {/* ── Ambient Background Glows ── */}
      <div className="absolute top-[15%] left-[8%] w-[35vw] h-[35vw] rounded-full bg-[var(--red)]/5 blur-[130px] pointer-events-none z-[2]" />
      <div className="absolute top-[35%] right-[3%] w-[30vw] h-[30vw] rounded-full bg-[var(--gold)]/5 blur-[110px] pointer-events-none z-[2]" />
      
      {/* ── Symmetrical Left Editorial Widget (Ticking Clock & Stats) ── */}
      <div className="hero-sidebar-widget absolute left-[4%] top-[45%] -translate-y-1/2 hidden xl:flex flex-col gap-9 text-[10px] font-mono z-20 pointer-events-auto border-l border-[var(--c20)] pl-5" style={{ borderRadius: '0 12px 12px 0' }}>
        <div className="flex flex-col gap-1">
          <span className="text-[var(--red)] dark:text-[var(--gold)] font-bold tracking-wider">// STATUS</span>
          <span className="flex items-center gap-2 widget-value">
            ACTIVE & OPEN
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[var(--red)] dark:text-[var(--gold)] font-bold tracking-wider">// LOCATION</span>
          <span className="widget-value">MUMBAI • INDIA</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[var(--red)] dark:text-[var(--gold)] font-bold tracking-wider">// ALGORITHMS SOLVED</span>
          <span className="widget-value font-bold text-xs">
            <span className="scrub-counter text-[var(--red)]" data-target="350" data-suffix="+">0+</span>
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[var(--red)] dark:text-[var(--gold)] font-bold tracking-wider">// DEV COMMITS</span>
          <span className="widget-value font-bold text-xs">
            <span className="scrub-counter" data-target="1240" data-suffix="+">0+</span>
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[var(--red)] dark:text-[var(--gold)] font-bold tracking-wider">// LOCAL TIME</span>
          <span className="widget-value tracking-widest">{timeString || '14:15:26 IST'}</span>
        </div>
      </div>

      {/* ── Symmetrical Right Editorial Widget (Manifest Specs) ── */}
      <div className="hero-sidebar-widget absolute right-[4%] top-[45%] -translate-y-1/2 hidden xl:flex flex-col gap-9 text-[10px] font-mono z-20 pointer-events-auto border-r border-[var(--c20)] pr-5 text-right items-end" style={{ borderRadius: '12px 0 0 12px' }}>
        <div className="flex flex-col gap-1">
          <span className="text-[var(--red)] dark:text-[var(--gold)] font-bold tracking-wider">SYSTEM //</span>
          <span className="widget-value">PORTFOLIO.V2.5</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[var(--red)] dark:text-[var(--gold)] font-bold tracking-wider">MAIN FOCUS //</span>
          <span className="widget-value">MERN & CLIENT INTERACTIONS</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[var(--red)] dark:text-[var(--gold)] font-bold tracking-wider">CODE EFFICIENCY //</span>
          <span className="widget-value font-bold text-xs">
            <span className="scrub-counter text-[var(--red)]" data-target="1840" data-suffix="">0</span>
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[var(--red)] dark:text-[var(--gold)] font-bold tracking-wider">APPLICATIONS SHIPPED //</span>
          <span className="widget-value font-bold text-xs">
            <span className="scrub-counter" data-target="12" data-suffix="+">0+</span>
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[var(--red)] dark:text-[var(--gold)] font-bold tracking-wider">ACADEMICS //</span>
          <span className="widget-value">B.TECH CSE</span>
        </div>
      </div>

      <div className="container relative z-20 w-full flex-grow flex flex-col items-center justify-center gap-8 py-10">
        
        {/* ── Center Typography Container ── */}
        <div className="hero-text-container w-full flex flex-col items-center text-center z-20">
          
          <h1 className="hero-title text-[clamp(3.8rem,9.5vw,8.5rem)] font-bold leading-[0.88] tracking-tighter uppercase font-display flex flex-col gap-2 items-center">
            <div className="overflow-hidden pb-1 flex">
              {"ANKITRAJ".split("").map((char, index) => (
                <span key={index} className="hero-title-char inline-block">{char}</span>
              ))}
            </div>
            <div className="overflow-hidden pb-3 flex justify-center w-full">
              <div className="flex">
                {"Jha.".split("").map((char, index) => (
                  <span 
                    key={index}
                    className="hero-title-char inline-block text-[var(--red)] drop-shadow-xl" 
                    style={{ 
                      fontFamily: 'var(--font-hand)', 
                      fontStyle: 'italic', 
                      textTransform: 'none',
                      fontWeight: 400
                    }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>
          </h1>

          <div className="hero-subtitle mt-6 flex flex-col items-center gap-6 px-6">
            <div className="hero-subtitle-box flex flex-col items-center max-w-xl transition-all duration-300">
              <p className="hero-subtitle-tag text-[11px] uppercase tracking-[0.22em] font-mono font-bold mb-3 text-[var(--red)] dark:text-[var(--gold)]">CS Student & Web Developer</p>
              <p className="hero-description text-[14px] md:text-[16px] font-medium text-[var(--text-primary)] leading-relaxed text-center opacity-85">
                Learning by building, improving by refining. Specializing in modern web applications and highly responsive interactive experiences.
              </p>
            </div>
          </div>

          {/* ── Symmetrical Magnetic CTA Buttons ── */}
          <div className="hero-ctas mt-10 flex flex-col sm:flex-row gap-5 items-center justify-center">
            <a 
              href="#projects" 
              className="btn-magnetic btn btn-primary flex items-center gap-2 text-xs animate-glow-pulse"
              style={{ boxShadow: '0 6px 25px rgba(185,43,39,0.3), 0 0 60px rgba(185,43,39,0.1)' }}
            >
              <span className="btn-magnetic-inner flex items-center gap-2">
                Explore Projects
                <svg className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
            </a>
            <a 
              href="#contact" 
              className="btn-magnetic btn btn-outline flex items-center gap-2 text-xs"
            >
              <span className="btn-magnetic-inner flex items-center gap-2">
                Let's Talk
              </span>
            </a>
          </div>


        </div>

      </div>

      {/* ── Scroll Down Indicator ── */}
      <div className="hero-ctas absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20">
        <span className="hero-scroll-text text-[9px] font-mono uppercase tracking-[0.25em]">Scroll to explore</span>
        <div className="flex flex-col items-center gap-1">
          <span className="hero-scroll-line w-px h-8 block" />
          <svg
            width="12" height="8" viewBox="0 0 12 8" fill="none"
            className="hero-scroll-arrow animate-bounce"
          >
            <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

    </section>
  );
};

export default Hero;

