import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AllCertificates from './pages/AllCertificates';

function App() {
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
