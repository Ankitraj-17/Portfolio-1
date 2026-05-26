import React, { useState, useEffect } from 'react';
import { Search, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { myCertificates } from '../data/certificates';
import { CertCard } from '../components/CertCard';
import { useAppLogic } from '../hooks/useAppLogic';

const AllCertificates = () => {
  useAppLogic();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState('All');
  
  // Extract unique tags for the filter pills
  const tags = ['All', ...new Set(myCertificates.map(cert => cert.tag))];

  // Filter certificates based on search and active tag
  const filteredCertificates = myCertificates.filter(cert => {
    const matchesSearch = 
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = activeTag === 'All' || cert.tag === activeTag;
    
    return matchesSearch && matchesTag;
  });

  // Ensure scroll is at top when this page mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      
      <main className="relative z-10 lg:px-[52px] pt-32 pb-24 min-h-screen">
        <div className="container relative z-10 max-w-7xl mx-auto px-6">
          
          <div className="mb-12">
            <Link 
              to="/"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[var(--c60)] hover:text-[var(--cream)] uppercase tracking-widest transition-colors mb-8"
            >
              <ArrowLeft size={14} /> Back to Portfolio
            </Link>
            
            <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-black text-[var(--cream)] tracking-tighter leading-[0.9] font-display uppercase mb-4">
              All <span className="text-[var(--red)] font-hand lowercase italic tracking-normal">Certificates</span>
            </h1>
            <p className="text-[var(--c60)] font-mono text-xs tracking-widest uppercase">
              {filteredCertificates.length} {filteredCertificates.length === 1 ? 'CERTIFICATE' : 'CERTIFICATES'} FOUND
            </p>
          </div>

          {/* ── Sleek Terminal Search Input ── */}
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center mb-12 relative z-20">
            
            <div className="relative w-full max-w-md group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-[var(--c50)] font-mono text-xs">$</span>
              </div>
              <input 
                type="text" 
                placeholder="search_ Filter by title, issuer, or tags..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[var(--bg2)] border border-[var(--c20)] rounded-full py-3.5 pl-10 pr-12 text-xs font-mono text-[var(--c90)] placeholder:text-[var(--c40)] focus:outline-none focus:border-[var(--red)]/40 focus:ring-1 focus:ring-[var(--red)]/20 transition-all duration-300"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <Search size={14} className="text-[var(--c50)] group-focus-within:text-[var(--red)] transition-colors" />
              </div>
            </div>

            {/* ── Instant Filter Tag Pills ── */}
            <div className="flex flex-wrap gap-2 lg:gap-3">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-4 py-2 rounded-full text-[9px] md:text-[10px] font-mono font-bold uppercase tracking-widest transition-all duration-300 ${
                    activeTag === tag
                      ? 'bg-[var(--red)] text-[var(--cream)] shadow-[0_0_15px_rgba(227,83,66,0.3)] border border-[var(--red)]'
                      : 'bg-[var(--bg2)] text-[var(--c60)] border border-[var(--c20)] hover:text-[var(--cream)] hover:border-[var(--c40)]'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Certificates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-parent min-h-[400px]">
            {filteredCertificates.length > 0 ? (
              filteredCertificates.map((cert, i) => (
                <CertCard key={cert.title + i + searchQuery + activeTag} cert={cert} index={i} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-[var(--c50)] font-mono text-sm uppercase tracking-widest">
                  // No certificates found matching your criteria.
                </p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setActiveTag('All');
                  }}
                  className="mt-6 text-[var(--red)] font-mono text-xs hover:underline uppercase tracking-widest"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
          
        </div>
      </main>
      
      <div className="lg:px-[52px]">
        <Footer />
      </div>
    </>
  );
};

export default AllCertificates;
