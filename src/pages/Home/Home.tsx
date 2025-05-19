
import React from 'react';
import Hero from './sections/Hero';
import Portfolio from './sections/Portfolio';
import About from './sections/About';
import Blog from './sections/Blog';
import Resources from './sections/Resources';
import Leadership from './sections/Leadership';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import { ParticleBackground } from "@/components/ui/motion/particles";

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <ParticleBackground />
      <Hero />
      <Portfolio />
      <About />
      <Blog />
      <Resources />
      <Leadership />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
