import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Certificates from '../components/Certificates';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import SocialModal from '../components/SocialModal';
import GutterColumns from '../components/GutterColumns';

const Home = () => {
  return (
    <>
      {/* Isolated dynamic side columns & scroll triggers */}
      <GutterColumns />
      
      <SocialModal />
      <Navbar />
      
      {/* Padding layout on desktop to prevent content clipping into stamp columns */}
      <main className="relative z-10 lg:px-[52px]">
        <Hero />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Projects />
        <div className="section-divider" />
        <Experience />
        <div className="section-divider" />
        <Certificates />
        <div className="section-divider" />
        <Contact />
      </main>
      
      <div className="lg:px-[52px]">
        <Footer />
      </div>
    </>
  );
};

export default Home;
