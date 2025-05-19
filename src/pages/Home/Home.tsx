
import React from 'react';
import { motion } from "@/components/ui/motion";
import Hero from './sections/Hero';
import Portfolio from './sections/Portfolio';
import About from './sections/About';
import Blog from './sections/Blog';
import Resources from './sections/Resources';
import Leadership from './sections/Leadership';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import BackgroundEffects from './components/BackgroundEffects';

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Global background effects */}
      <BackgroundEffects />
      
      {/* Content wrapper with higher z-index and transparent backgrounds */}
      <div className="relative z-10">
        <Hero />
        <Portfolio />
        <About />
        <Blog />
        <Resources />
        <Leadership />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
