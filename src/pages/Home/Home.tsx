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
import { motion, AnimatePresence } from "@/components/ui/motion";

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Global particle background for neural network effect */}
      <ParticleBackground 
        variant="cyber" 
        density="low" 
        speed="slow" 
        interactive={true}
        className="fixed inset-0 opacity-40" 
      />
      
      {/* Additional motion gradient for depth */}
      <motion.div 
        className="fixed inset-0 bg-gradient-radial from-blue-900/10 to-transparent pointer-events-none"
        animate={{ 
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
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
