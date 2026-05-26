import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Code, Globe, MapPin, ArrowRight, Terminal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const ref = useRef(null);
  const confettiCanvasRef = useRef(null);
  const [formState, setFormState] = useState('idle'); // idle, submitting, success

  useEffect(() => {
    let ctx;
    let isCleanedUp = false;

    const initContact = () => {
      if (isCleanedUp) return;
      ctx = gsap.context(() => {
        // Reveal animations for the new layout
        gsap.fromTo('.contact-anim', 
          { opacity: 0, y: 50 },
          {
            opacity: 1, 
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 85%',
            }
          }
        );
      }, ref);
    };

    if (document.readyState === 'complete') {
      initContact();
    } else {
      window.addEventListener('load', initContact);
    }

    return () => {
      isCleanedUp = true;
      window.removeEventListener('load', initContact);
      if (ctx) ctx.revert();
    };
  }, []);

  const triggerConfetti = () => {
    const canvas = confettiCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const particles = [];
    const symbols = ['{', '}', '[', ']', '<', '>', '0', '1', '+', '*', '○', '•', 'DEV', 'LOGIC', 'C++', 'JS', 'VITE'];
    const colors = ['#b92b27', '#f2ba49', '#ffffff', '#8a1c1c', 'rgba(185,43,39,0.3)'];
    
    // Spawn particles around the form container center
    const x = canvas.width / 2;
    const y = canvas.height * 0.75;
    
    for (let i = 0; i < 95; i++) {
      particles.push({
        x,
        y,
        char: symbols[Math.floor(Math.random() * symbols.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 11 + 7,
        vx: (Math.random() - 0.5) * 18,
        vy: (Math.random() - 0.72) * 20,
        alpha: 1,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.12,
      });
    }
    
    const animateConfetti = () => {
      if (particles.length === 0) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.38; // gravity
        p.vx *= 0.98; // friction
        p.alpha -= 0.012;
        p.rotation += p.rotSpeed;
        
        if (p.alpha <= 0 || p.y > canvas.height) {
          particles.splice(i, 1);
          continue;
        }
        
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.font = `bold ${p.size}px monospace`;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fillText(p.char, -5, 5);
        ctx.restore();
      }
      
      if (particles.length > 0) {
        requestAnimationFrame(animateConfetti);
      }
    };
    
    animateConfetti();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState('submitting');
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Fetch access key from .env file securely
    data.access_key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        setFormState('success');
        // Trigger visual confetti burst on successful dispatch
        setTimeout(() => triggerConfetti(), 100);
        setTimeout(() => setFormState('idle'), 5000);
        e.target.reset();
      } else {
        setFormState('idle');
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      setFormState('idle');
      alert(`Error: ${error.message}`);
    }
  };

  const contactLinks = [
    { icon: <Mail size={20} />, label: 'Email', value: 'ankitra4007@gmail.com', href: 'mailto:ankitra4007@gmail.com' },
    { icon: <Code size={20} />, label: 'GitHub', value: '@Ankitraj-17', href: 'https://github.com/Ankitraj-17' },
    { icon: <Globe size={20} />, label: 'LinkedIn', value: 'ankitraj-jha', href: 'https://www.linkedin.com/in/ankitraj-jha-103567369' },
  ];

  return (
    <section 
      id="contact" 
      ref={ref} 
      className="py-32 relative overflow-hidden border-t border-[var(--c20)]" 
      style={{ background: 'var(--bg)' }}
    >
      {/* Dynamic Background Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[var(--red)]/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-[var(--gold)]/5 blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(28,26,23,0.012)_1px,transparent_1px)] bg-[size:100px_100%]" />
      </div>

      <div className="container relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="contact-anim mb-16 md:mb-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-end">
          {/* Left */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.32em] font-bold text-[var(--red)] mb-5 font-mono flex items-center gap-3">
              <span className="w-6 h-px bg-[var(--red)] inline-block" />
              Phase 06: Connection
            </p>
            <h2 className="font-black text-[var(--cream)] tracking-tight leading-[1.0] font-display uppercase" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)' }}>
              Start a{' '}
              <span className="text-[var(--red)] font-hand lowercase italic tracking-normal" style={{ fontSize: '1.1em' }}>conversation</span>.
            </h2>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-5">
            <p className="text-[var(--c60)] text-sm leading-[1.85] font-medium">
              Have a project, internship opportunity, or just want to connect? I'm always open to{' '}
              <strong className="text-[var(--cream)] font-semibold">interesting conversations</strong> and{' '}
              <strong className="text-[var(--cream)] font-semibold">meaningful work</strong>.
            </p>
            <a
              href="mailto:ankitra4007@gmail.com"
              className="flex items-center gap-2 w-fit px-4 py-2 rounded-full border border-[var(--c20)] bg-[var(--bg2)] hover:border-[var(--red)]/40 transition-colors duration-300"
            >
              <span className="font-black font-display text-[var(--red)] text-xs leading-none">↗</span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-[var(--c50)] hover:text-[var(--cream)] transition-colors">ankitra4007@gmail.com</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Side: Contact Information Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="contact-anim bg-[var(--bg2)] p-8 md:p-10 rounded-3xl border border-[var(--c20)] shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-100 transition-opacity duration-700 text-[var(--red)] rotate-12 group-hover:rotate-0">
                  <Terminal size={80} strokeWidth={1} />
               </div>
               
               <h3 className="text-2xl font-bold text-[var(--cream)] font-display uppercase mb-4 relative z-10">Direct Line</h3>
               <p className="text-[var(--c70)] text-sm leading-relaxed mb-10 relative z-10 max-w-[85%]">
                 My inbox is always open. Whether you have a project in mind, an internship opportunity, or just want to say hi, I'll try my best to get back to you!
               </p>
               
               <div className="flex flex-col gap-4 relative z-10">
                 {contactLinks.map((item, i) => (
                   <a 
                     key={i}
                     href={item.href}
                     target="_blank"
                     rel="noreferrer"
                     className="flex items-center gap-5 p-4 rounded-2xl bg-[var(--bg)] border border-[var(--c20)] hover:border-[var(--red)]/40 hover:bg-[var(--surface)] transition-all duration-300 group/link"
                   >
                     <div className="w-12 h-12 rounded-full bg-[var(--bg2)] border border-[var(--c20)] flex items-center justify-center text-[var(--c70)] group-hover/link:text-[var(--red)] group-hover/link:scale-110 group-hover/link:shadow-[0_0_20px_rgba(227,83,66,0.2)] transition-all duration-300">
                       {item.icon}
                     </div>
                     <div>
                       <p className="text-[10px] font-mono tracking-widest text-[var(--c40)] uppercase mb-1">{item.label}</p>
                       <p className="font-semibold text-[var(--cream)] text-sm">{item.value}</p>
                     </div>
                   </a>
                 ))}
               </div>
            </div>

            <div className="contact-anim flex items-center gap-5 p-6 rounded-3xl border border-[var(--c20)] bg-[var(--bg2)]">
               <div className="w-12 h-12 rounded-full bg-[var(--red)]/10 flex items-center justify-center">
                 <MapPin size={22} className="text-[var(--red)] animate-bounce" />
               </div>
               <div>
                 <p className="text-[10px] font-mono tracking-widest text-[var(--c40)] uppercase mb-1">Current Base</p>
                 <p className="font-semibold text-[var(--cream)] text-sm">Mumbai, India</p>
               </div>
            </div>
          </div>

          {/* Right Side: The Interactive Form */}
          <div className="lg:col-span-7 contact-anim lg:ml-8">
            <div className="bg-[var(--surface)] rounded-[2.5rem] p-8 md:p-12 border border-[var(--c20)] shadow-2xl relative">
              <canvas ref={confettiCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-50 rounded-[2.5rem]" />
              
              {/* Decorative terminal header */}
              <div className="flex items-center justify-between mb-12 pb-6 border-b border-[var(--c20)]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[var(--red)]/80" />
                  <div className="w-3 h-3 rounded-full bg-[var(--gold)]/80" />
                  <div className="w-3 h-3 rounded-full bg-[var(--c20)]" />
                </div>
                <span className="text-[10px] font-mono text-[var(--c40)] tracking-widest uppercase flex items-center gap-2">
                  Transmission Ready
                </span>
              </div>

              {formState === 'success' ? (
                <div className="flex flex-col items-center justify-center min-h-[350px] text-center animate-[fadeIn_0.5s_ease_forwards]">
                  <div className="w-20 h-20 bg-[var(--red)]/10 rounded-full flex items-center justify-center mb-6">
                    <ArrowRight className="text-[var(--red)] w-8 h-8 -rotate-45" />
                  </div>
                  <h4 className="text-3xl font-bold text-[var(--cream)] mb-4 font-display uppercase tracking-tight">
                    Message Sent
                  </h4>
                  <p className="text-[var(--c70)] font-medium max-w-sm leading-relaxed">
                    Thank you for reaching out. I've received your transmission and will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form className="space-y-8" onSubmit={handleSubmit}>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Floating Label Input for Name */}
                    <div className="relative group overflow-hidden rounded-2xl">
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        className="peer w-full bg-[var(--bg2)] border border-[var(--c20)] rounded-2xl px-6 py-5 text-[var(--cream)] placeholder-transparent focus:outline-none focus:border-[var(--red)]/30 transition-all font-medium text-base shadow-inner"
                        placeholder="Name"
                      />
                      <label 
                        htmlFor="contact-name" 
                        className="absolute left-6 -top-3 bg-[var(--surface)] px-2 text-[10px] font-bold font-mono tracking-widest text-[var(--red)] uppercase transition-all 
                                   peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-[var(--c40)] peer-placeholder-shown:bg-transparent 
                                   peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-[var(--red)] peer-focus:bg-[var(--surface)]"
                      >
                        Your Name
                      </label>
                      <div className="input-expand-underline" />
                    </div>

                    {/* Floating Label Input for Email */}
                    <div className="relative group overflow-hidden rounded-2xl">
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        className="peer w-full bg-[var(--bg2)] border border-[var(--c20)] rounded-2xl px-6 py-5 text-[var(--cream)] placeholder-transparent focus:outline-none focus:border-[var(--red)]/30 transition-all font-medium text-base shadow-inner"
                        placeholder="Email"
                      />
                      <label 
                        htmlFor="contact-email" 
                        className="absolute left-6 -top-3 bg-[var(--surface)] px-2 text-[10px] font-bold font-mono tracking-widest text-[var(--red)] uppercase transition-all 
                                   peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-[var(--c40)] peer-placeholder-shown:bg-transparent 
                                   peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-[var(--red)] peer-focus:bg-[var(--surface)]"
                      >
                        Email Address
                      </label>
                      <div className="input-expand-underline" />
                    </div>
                  </div>
                  
                  {/* Floating Label Textarea for Message */}
                  <div className="relative group overflow-hidden rounded-2xl">
                    <textarea
                      id="contact-message"
                      name="message"
                      rows="4"
                      required
                      className="peer w-full bg-[var(--bg2)] border border-[var(--c20)] rounded-2xl px-6 py-5 text-[var(--cream)] placeholder-transparent focus:outline-none focus:border-[var(--red)]/30 transition-all font-medium text-base resize-none shadow-inner"
                      placeholder="Message"
                    />
                    <label 
                      htmlFor="contact-message" 
                      className="absolute left-6 -top-3 bg-[var(--surface)] px-2 text-[10px] font-bold font-mono tracking-widest text-[var(--red)] uppercase transition-all 
                                 peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-[var(--c40)] peer-placeholder-shown:bg-transparent 
                                 peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-[var(--red)] peer-focus:bg-[var(--surface)]"
                    >
                      Project Details
                    </label>
                    <div className="input-expand-underline" />
                  </div>
                  
                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={formState === 'submitting'}
                      className="group flex items-center justify-between w-full p-2 bg-[var(--bg2)] border border-[var(--c20)] hover:border-[var(--red)] text-[var(--cream)] transition-all duration-500 disabled:opacity-70 disabled:cursor-not-allowed rounded-full overflow-hidden"
                    >
                      <span className="pl-6 font-mono uppercase font-bold tracking-widest text-[11px] group-hover:text-[var(--red)] transition-colors">
                        {formState === 'submitting' ? 'Transmitting...' : 'Send Dispatch'}
                      </span>
                      <div className="w-12 h-12 bg-[var(--red)] rounded-full flex items-center justify-center text-[#f5f2eb] group-hover:scale-105 transition-transform">
                        <ArrowRight size={18} className={`transition-transform duration-500 group-hover:-rotate-45 ${formState === 'submitting' ? 'animate-pulse' : ''}`} />
                      </div>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
