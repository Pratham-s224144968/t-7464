
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
      {/* Enhanced global particle background for neural network effect */}
      <ParticleBackground 
        variant="cyber" 
        density="medium" 
        speed="normal" 
        starEffect={true}
        interactive={true}
        className="fixed inset-0 opacity-60" 
      />
      
      {/* Additional motion gradient for depth that persists */}
      <motion.div 
        className="fixed inset-0 bg-gradient-radial from-blue-900/20 via-transparent to-black/80 pointer-events-none"
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
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
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
