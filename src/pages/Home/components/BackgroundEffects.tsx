
import React from "react";
import { motion } from "@/components/ui/motion";
import { ParticleBackground } from "@/components/ui/motion/particles";

const BackgroundEffects: React.FC = () => {
  return (
    <>
      {/* Global persistent particle background for neural network effect */}
      <ParticleBackground 
        variant="cyber" 
        density="low"
        speed="normal" 
        starEffect={true}
        interactive={true}
        className="fixed inset-0 opacity-30 z-0" 
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
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
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
    </>
  );
};

export default BackgroundEffects;
