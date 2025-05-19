
import React from "react";
import { motion } from "@/components/ui/motion";
import YouTubeVideoCarousel from "@/components/YouTubeVideoCarousel";
import { backgroundShift } from "@/components/ui/motion";
import { ParticleBackground } from "@/components/ui/motion/particles";

const Hero = () => {
  return (
    <motion.section 
      id="home" 
      className="relative pt-5 pb-32 bg-gradient-to-br from-blue-900/40 to-transparent overflow-hidden" 
      initial={{
        opacity: 0
      }} 
      animate={{
        opacity: 1
      }} 
      transition={{
        duration: 0.6
      }}
    >
      {/* Very subtle particles specific to hero section */}
      <ParticleBackground 
        variant="default" 
        density="low" 
        speed="slow" 
        starEffect={true}
        interactive={true}
        className="opacity-15 z-0" 
      />
      
      {/* Dynamic gradient overlay that doesn't hide particles */}
      <motion.div 
        className="absolute inset-0 bg-gradient-radial from-blue-500/10 to-transparent pointer-events-none"
        {...backgroundShift}
      />
      
      <div className="container mx-auto text-center relative z-10 px-4">
        <motion.img 
          alt="InnovAIte Logo" 
          initial={{
            opacity: 0
          }} 
          animate={{
            opacity: 1,
            scale: [1, 1.02, 1],
            rotate: [-1, 1, -1],
            y: [-10, 0, -10]
          }} 
          transition={{
            delay: 0.2,
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }} 
          src="/lovable-uploads/7b9b7ff1-8cf0-4f74-a362-00f0ceaf28e9.png" 
          className="mx-auto h-150 w-auto object-contain filter drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" 
        />
        
        <motion.h1 
          className="text-5xl md:text-7xl font-mono font-bold mb-6 text-white relative"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 animate-gradient-move">
            InnovAIte
          </span>
          
          {/* Animated glowing orbs */}
          <motion.span 
            className="absolute -right-2 top-0 h-3 w-3 rounded-full bg-blue-400 blur-sm"
            animate={{
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.span 
            className="absolute -left-2 bottom-0 h-2 w-2 rounded-full bg-purple-400 blur-sm"
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        </motion.h1>
        
        <motion.p 
          className="text-2xl max-w-2xl mx-auto mb-4 text-blue-200 font-medium"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          AI Innovation Hub at Deakin University
        </motion.p>
        
        <motion.p 
          className="text-lg max-w-3xl mx-auto mb-8 text-white/80"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          We are an AI-focused innovation platform driven by students and researchers at Deakin University.
        </motion.p>
        
        {/* YouTube Video Carousel */}
        <motion.div 
          className="mt-16 mb-8 w-full" 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-blue-300 mb-8 relative inline-block">
            Featured Videos
            <motion.span 
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 1, duration: 0.8 }}
            />
          </h2>
          <div className="w-full max-w-5xl mx-auto">
            <YouTubeVideoCarousel />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
