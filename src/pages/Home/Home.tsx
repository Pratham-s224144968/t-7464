
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
import { motion } from "@/components/ui/motion";

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Global persistent particle background for neural network effect */}
      <ParticleBackground 
        variant="cyber" 
        density="low" // Changed from medium to low for fewer particles
        speed="normal" 
        starEffect={true}
        interactive={true}
        className="fixed inset-0 opacity-30 z-0" // Reduced opacity from 60% to 30%
      />
      
      {/* Additional motion gradient for depth that persists */}
      <motion.div 
        className="fixed inset-0 bg-gradient-radial from-blue-900/20 via-transparent to-black/80 pointer-events-none z-0"
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
      
      {/* Distant stars effect */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[...Array(30)].map((_, i) => ( // Reduced from 50 to 30 stars
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1, // Slightly smaller stars
              height: Math.random() * 2 + 1, // Slightly smaller stars
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.4, 0.1], // Reduced opacity from [0.2, 0.8, 0.2]
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </motion.div>
      
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
