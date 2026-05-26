import React, { useEffect, useState } from 'react';
import { Mail, Code, Globe, X } from 'lucide-react';

const SocialModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-social-modal', handleOpen);
    return () => window.removeEventListener('open-social-modal', handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      // Lock body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      const timer = setTimeout(() => setIsRendered(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isRendered) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center px-4 transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
      <div className="absolute inset-0 bg-[#1c1a17]/45 backdrop-blur-md cursor-pointer" onClick={() => setIsOpen(false)} />
      
      <div className={`relative bg-[var(--bg2)] p-8 md:p-10 rounded-[2rem] border border-[var(--c20)] shadow-2xl w-full max-w-[360px] flex flex-col items-center transition-all duration-500 ${isOpen ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-8 scale-95 opacity-0'}`}>
        <button onClick={() => setIsOpen(false)} className="absolute top-5 right-5 text-[var(--c70)] hover:text-[var(--red)] transition-colors">
          <X size={18} />
        </button>
        
        <h3 className="text-xl font-display font-bold text-[var(--cream)] mb-8 tracking-wide uppercase">Connect</h3>
        
        <div className="flex flex-col gap-4 w-full">
          <a href="mailto:ankitra4007@gmail.com" className="flex items-center justify-center gap-3 w-full bg-[var(--red)] text-[#f5f2eb] py-3.5 rounded-full hover:bg-[#1c1a17] hover:text-[#f5f2eb] transition-all font-bold text-xs tracking-widest uppercase font-mono shadow-lg">
            <Mail size={16} />
            <span>Email Me</span>
          </a>
          
          <a href="https://www.linkedin.com/in/ankitraj-jha-103567369" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 w-full bg-[var(--surface)] text-[var(--cream)] py-3.5 rounded-full border border-[var(--c20)] hover:border-[var(--red)] hover:bg-[var(--bg2)] hover:scale-[1.02] active:scale-[0.98] transition-all font-bold text-xs tracking-widest uppercase font-mono shadow-md shadow-[rgba(28,26,23,0.03)]">
            <Globe size={16} />
            <span>LinkedIn</span>
          </a>
          
          <a href="https://github.com/Ankitraj-17" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 w-full bg-[var(--surface)] text-[var(--cream)] py-3.5 rounded-full border border-[var(--c20)] hover:border-[var(--red)] hover:bg-[var(--bg2)] hover:scale-[1.02] active:scale-[0.98] transition-all font-bold text-xs tracking-widest uppercase font-mono shadow-md shadow-[rgba(28,26,23,0.03)]">
            <Code size={16} />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SocialModal;
