import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { myCertificates } from '../data/certificates';
import { CertCard } from './CertCard';

gsap.registerPlugin(ScrollTrigger);

const Certificates = () => {
  const sectionRef = useRef(null);
  
  // Display up to 6 certificates on the homepage
  const displayedCertificates = myCertificates.slice(0, 6);

  useEffect(() => {
    // Parallax logic for background elements
    const ctx = gsap.context(() => {
      gsap.to('.cert-watermark', {
        y: -150,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // We rely on .scroll-card-reveal logic in useAppLogic for individual cards
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="certificates" 
      ref={sectionRef} 
      className="py-32 relative overflow-hidden"
    >
      {/* Background aesthetics */}
      <div className="absolute top-40 left-0 w-[500px] h-[500px] rounded-full bg-[var(--c20)] mix-blend-color-dodge blur-[120px] opacity-30 pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[800px] h-[800px] rounded-full bg-[var(--c10)] mix-blend-color-dodge blur-[150px] opacity-40 pointer-events-none" />
      
      <div 
        className="cert-watermark absolute top-[10%] left-[-5%] text-[15vw] font-black tracking-tighter leading-none pointer-events-none z-0"
        style={{
          color: 'transparent',
          WebkitTextStroke: '1px var(--c10)'
        }}
      >
        PROVE IT
      </div>

      <div className="container relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-end">
          {/* Left: Label + Heading */}
          <div>
            <p className="cert-title-anim text-[10px] uppercase tracking-[0.32em] font-bold text-[var(--red)] mb-5 font-mono flex items-center gap-3">
              <span className="w-6 h-px bg-[var(--red)] inline-block" />
              Phase 04: Validation
            </p>
            <h2 className="cert-title-anim font-black text-[var(--cream)] tracking-tight leading-[1.0] font-display uppercase" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)' }}>
              Earned &{' '}
              <span className="text-[var(--red)] font-hand lowercase italic tracking-normal" style={{ fontSize: '1.1em' }}>certified</span>.
            </h2>
          </div>

          {/* Right: Blurb + stat */}
          <div className="cert-title-anim flex flex-col gap-5">
            <p className="text-[var(--c60)] text-sm leading-[1.85] font-medium">
              Certifications that validate <strong className="text-[var(--cream)] font-semibold">technical depth</strong> and{' '}
              <strong className="text-[var(--cream)] font-semibold">platform expertise</strong> — from algorithms to full-stack development.
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--c20)] bg-[var(--bg2)]">
                <span className="font-black font-display text-[var(--red)] text-sm leading-none">{myCertificates.length}+</span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[var(--c50)]">certificates earned</span>
              </div>
            </div>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 perspective-parent">
          {displayedCertificates.map((cert, i) => (
            <CertCard key={cert.title + i} cert={cert} index={i} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-20 flex justify-center reveal-center">
          <Link 
            to="/certificates"
            className="group relative inline-flex items-center gap-4 bg-[var(--bg2)] border border-[var(--c20)] px-8 py-4 rounded-full font-mono text-sm font-bold uppercase tracking-widest text-[var(--c90)] hover:text-[var(--cream)] hover:border-[var(--red)]/40 transition-all duration-300"
          >
            <span className="absolute inset-0 bg-[var(--red)]/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            View All Certificates
            <span className="w-8 h-8 rounded-full bg-[var(--c10)] group-hover:bg-[var(--red)] flex items-center justify-center transition-colors duration-300">
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Certificates;
