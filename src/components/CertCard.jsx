import React, { useRef } from 'react';
import gsap from 'gsap';
import { ExternalLink, Award } from 'lucide-react';

export const CertCard = ({ cert, index }) => {
  const cardRef = useRef(null);

  function handleMouseMove({ clientX, clientY }) {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    // Calculate 3D card rotation angles based on cursor offset
    const xc = width / 2;
    const yc = height / 2;
    const angleX = (yc - y) / 12; // slightly softer rotation
    const angleY = (x - xc) / 12;

    gsap.to(card, {
      rotateX: angleX,
      rotateY: angleY,
      scale: 1.015,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  }

  function handleMouseLeave() {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.55,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => window.open(cert.link, '_blank', 'noopener,noreferrer')}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.open(cert.link, '_blank', 'noopener,noreferrer');
        }
      }}
      className={`${
        index % 3 === 0 ? 'reveal-left' : index % 3 === 1 ? 'reveal-center' : 'reveal-right'
      } group relative flex flex-col bg-[var(--bg2)] border border-[var(--c20)] overflow-hidden hover:border-[var(--red)]/40 hover:shadow-[0_30px_70px_rgba(138,28,28,0.06)] dark:hover:shadow-[0_30px_70px_rgba(0,0,0,0.5)] transition-all duration-500 block min-h-[340px] cursor-pointer ${
        index % 2 === 0 ? 'asymmetric-card-sm-1' : 'asymmetric-card-sm-2'
      }`}
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
    >
      
      {/* Dynamic grid pattern overlay on hover */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-[0.06] dark:group-hover:opacity-[0.04] transition-opacity duration-500 z-0"
        style={{
          backgroundImage: 'radial-gradient(var(--cream) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Interactive hover glow */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: 'radial-gradient(350px circle at var(--mouse-x) var(--mouse-y), var(--accent-light), transparent 60%)'
        }}
      />
      
      <div className="p-6 md:p-8 flex flex-col h-full relative z-10 flex-grow">
        
        {/* Card Top */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[var(--red)]/5 dark:bg-[var(--red)]/10 flex items-center justify-center text-[var(--red)] group-hover:scale-110 transition-transform duration-300">
              <Award size={12} />
            </div>
            <span className="text-[9px] font-mono font-bold tracking-widest text-[var(--red)] uppercase">
              {cert.tag}
            </span>
          </div>
          <span className="text-2xl md:text-3xl font-display font-light text-[var(--c20)] leading-none transition-colors duration-300 group-hover:text-[var(--red)]/30">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Card Body */}
        <div className="mt-auto flex flex-col justify-end">
          <h3 className="text-xl md:text-[22px] font-black text-[var(--cream)] tracking-tight leading-snug mb-2 group-hover:text-[var(--red)] dark:group-hover:text-[var(--cream)] transition-colors duration-300">
            {cert.title}
          </h3>
          
          <div className="text-[10px] font-mono text-[var(--c60)] uppercase tracking-wider mb-6">
            ISSUED BY <span className="font-bold text-[var(--c80)]">{cert.issuer}</span>
          </div>

          <div className="pt-4 border-t border-[var(--c20)] flex justify-between items-center">
            <span className="text-[9px] font-mono font-semibold text-[var(--c50)] tracking-widest uppercase">DATE</span>
            <div className="text-xs font-hand font-medium italic text-[var(--red)]">
              {cert.date}
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom Bottom Action Bar */}
      <div className="px-6 md:px-8 pb-6 pt-3 flex items-center justify-between border-t border-[var(--c08)] bg-[var(--c08)]/20 relative z-10">
        <span
          className="inline-flex items-center gap-2 text-[9px] font-mono font-bold text-[var(--c80)] group-hover:text-[var(--red)] uppercase tracking-widest transition-colors group/link"
        >
          VIEW CREDENTIAL 
          <ExternalLink size={10} className="group-hover/link:-translate-y-[2px] group-hover/link:translate-x-[2px] transition-transform" />
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-[8px] font-mono font-bold text-[var(--c50)] tracking-[0.2em] uppercase">Verified</span>
        </div>
      </div>

    </div>
  );
};
