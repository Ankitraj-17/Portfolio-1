import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useAppLogic() {
  const location = useLocation();

  // Scroll to top on route change, unless there's a hash
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    } else {
      // If there's a hash, scroll to that section
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    // Lenis smooth scroll — tuned for buttery 60fps on all devices
    const lenis = new Lenis({
      duration: 1.4,
      // Custom cubic-bezier: eases in slowly, settles smoothly
      easing: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      smoothTouch: true,       // Enable smooth touch on mobile
      touchMultiplier: 2.2,
      wheelMultiplier: 1.0,
      infinite: false,
    });

    // Synchronize GSAP ScrollTrigger updates with Lenis scroll event
    lenis.on('scroll', ScrollTrigger.update);

    // Bind Lenis animation frames directly to GSAP's global high-fidelity ticker loop
    const updateTicker = (time) => {
      lenis.raf(time * 1000); // convert time to milliseconds for Lenis
    };
    
    gsap.ticker.add(updateTicker);
    // Target 16ms (60fps) frame window — prevents animation jumps on slow frames
    gsap.ticker.lagSmoothing(100, 16);

    // Global GSAP scroll animations
    gsap.utils.toArray('.fade-up').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    gsap.utils.toArray('.fade-left').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    gsap.utils.toArray('.stagger-children').forEach((parent) => {
      const children = parent.children;
      gsap.fromTo(children,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: parent,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Certificates section header — independent trigger at 80% so it fires early
    gsap.utils.toArray('.cert-title-anim').forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: i * 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // ── NEW GLOBAL MOTION UTILITIES ──

    // 1. Parallax Scroll Utility
    gsap.utils.toArray('.parallax-scroll').forEach((el) => {
      const speed = parseFloat(el.getAttribute('data-speed')) || 0.15;
      gsap.to(el, {
        y: () => -window.innerHeight * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    // 2. Scale In Reveal Utility
    gsap.utils.toArray('.reveal-scale').forEach((el) => {
      gsap.fromTo(el,
        { scale: 0.88, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.85,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // 3. Counter scrubbing Utility
    gsap.utils.toArray('.scrub-counter').forEach((el) => {
      const target = parseFloat(el.getAttribute('data-target')) || 0;
      const isInt = !el.getAttribute('data-target').includes('.');
      const suffix = el.getAttribute('data-suffix') || '';
      const obj = { val: 0 };
      
      gsap.fromTo(obj, 
        { val: 0 },
        {
          val: target,
          duration: 2.0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            el.innerText = (isInt ? Math.floor(obj.val) : obj.val.toFixed(1)) + suffix;
          }
        }
      );
    });

    // 4. Text Scramble typing reveal
    const scrambleText = (el) => {
      const originalText = el.getAttribute('data-text') || el.innerText;
      if (!el.getAttribute('data-text')) {
        el.setAttribute('data-text', originalText);
      }
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*_+•□○';
      let progress = 0;
      const interval = setInterval(() => {
        el.innerText = originalText
          .split('')
          .map((char, index) => {
            if (char === ' ' || char === '\n') return char;
            if (index < progress) return originalText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');
        progress += originalText.length / 30;
        if (progress >= originalText.length) {
          el.innerText = originalText;
          clearInterval(interval);
        }
      }, 30);
    };

    gsap.utils.toArray('.scramble-trigger').forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => scrambleText(el),
      });
    });

    // 1. Reveal from Left (Slide in from left)
    gsap.utils.toArray('.reveal-left').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );
    });

    // 2. Reveal from Right (Slide in from right)
    gsap.utils.toArray('.reveal-right').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );
    });

    // 3. Reveal from Center (Scale up from middle)
    gsap.utils.toArray('.reveal-center').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, scale: 0.9, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );
    });

    // 4. Backwards-compatible Scroll Card Reveal (Optimized center-scale reveal)
    gsap.utils.toArray('.scroll-card-reveal').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, scale: 0.94, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );
    });

    // Scroll progress tracker for side gutters — optimized direct DOM update bypassing React state updates at 60fps
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        document.querySelectorAll('.col-scroll-progress').forEach(el => {
          el.style.height = `${progress}%`;
        });
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Remove any leftover custom cursor DOM elements & force page to load at top on reload
  useEffect(() => {
    // Kill any .cur elements that old cursor JS may have appended
    document.querySelectorAll('.cur').forEach(el => el.remove());
    // Remove body cursor-hiding classes
    document.body.classList.remove('cur-link', 'cur-text');
    // Ensure body cursor is always the system default
    document.body.style.cursor = '';

    // Re-route scroll to top on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Clean hash on load so reload doesn't trigger scroll-to-section
    if (window.location.hash) {
      window.history.replaceState(null, null, window.location.pathname + window.location.search);
    }
  }, []);

  return {};
}
