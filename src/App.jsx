import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import AllCertificates from './pages/AllCertificates';

function App() {
  const location = useLocation();

  // Scroll to top on route change, unless there's a hash
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    } else {
      // If there's a hash, try to scroll to it
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // small delay to let DOM mount
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="relative min-h-screen animate-fade-in pb-12" style={{ background: 'var(--bg)' }}>
      {/* Noise texture overlay */}
      <div className="noise-overlay" />
      
      {/* Editorial Structural Grid Lines */}
      <div className="aesthetic-grid-lines">
        <div className="grid-line" />
        <div className="grid-line hidden md:block" />
        <div className="grid-line" />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/certificates" element={<AllCertificates />} />
      </Routes>
    </div>
  );
}

export default App;
