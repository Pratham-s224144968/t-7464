
import React from "react";
import { motion } from "@/components/ui/motion";
import { ParticleBackground } from "@/components/ui/motion/particles";
import { Users, Globe, Cpu, Lightbulb } from "lucide-react";

const About = () => {
  return (
    <motion.section 
      id="about" 
      className="relative py-20 bg-gradient-to-b from-black to-blue-950/50 overflow-hidden" 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <ParticleBackground variant="default" density="low" className="opacity-30" />
      
      <motion.div 
        className="absolute inset-0 bg-gradient-radial from-blue-500/5 via-transparent to-transparent pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="container mx-auto relative z-10">
        <motion.h2 
          className="text-3xl font-mono font-bold mb-12 text-center text-blue-500" 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.2,
            duration: 0.5
          }} 
          viewport={{ once: true }}
        >
          /ABOUT US
        </motion.h2>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            <motion.div className="md:w-1/2" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.5 }} viewport={{ once: true }}>
              <h3 className="text-2xl font-semibold text-white mb-4">Our Mission</h3>
              <p className="text-white/80 mb-6 leading-relaxed">
                InnovAIte identifies, validates, and showcases cutting-edge AI tools and workflows 
                that reshape how businesses and academia adopt artificial intelligence.
              </p>
              <p className="text-white/80 mb-6 leading-relaxed">
                Operating under Deakin University's SPARK 2026 initiative, we bring together 
                students, researchers, and industry partners to create practical AI solutions.
              </p>
            </motion.div>
            
            <motion.div className="md:w-1/2" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.5 }} viewport={{ once: true }}>
              <div className="grid grid-cols-2 gap-4 h-full">
                <div className="p-4 rounded-lg bg-blue-900/20 backdrop-blur border border-blue-500/30 flex flex-col items-center justify-center">
                  <Users className="w-10 h-10 text-blue-400 mb-2" />
                  <h3 className="text-lg font-medium text-white">Student-Led</h3>
                  <p className="text-sm text-white/70 text-center">Fresh perspectives driving innovation</p>
                </div>
                <div className="p-4 rounded-lg bg-blue-900/20 backdrop-blur border border-blue-500/30 flex flex-col items-center justify-center">
                  <Cpu className="w-10 h-10 text-blue-400 mb-2" />
                  <h3 className="text-lg font-medium text-white">AI-Focused</h3>
                  <p className="text-sm text-white/70 text-center">Cutting-edge AI technology</p>
                </div>
                <div className="p-4 rounded-lg bg-blue-900/20 backdrop-blur border border-blue-500/30 flex flex-col items-center justify-center">
                  <Globe className="w-10 h-10 text-blue-400 mb-2" />
                  <h3 className="text-lg font-medium text-white">Connected</h3>
                  <p className="text-sm text-white/70 text-center">Strong industry partnerships</p>
                </div>
                <div className="p-4 rounded-lg bg-blue-900/20 backdrop-blur border border-blue-500/30 flex flex-col items-center justify-center">
                  <Lightbulb className="w-10 h-10 text-blue-400 mb-2" />
                  <h3 className="text-lg font-medium text-white">Innovative</h3>
                  <p className="text-sm text-white/70 text-center">Creating new possibilities</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
