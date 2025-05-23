
import React from "react";
import { motion } from "@/components/ui/motion";
import { Mail, MessageSquare } from "lucide-react";
import { ParticleBackground } from "@/components/ui/motion/particles";

const Contact = () => {
  return (
    <motion.section id="contact" className="relative py-20 bg-black/20 backdrop-blur-sm" initial={{
      opacity: 0
    }} whileInView={{
      opacity: 1
    }} transition={{
      duration: 0.8
    }} viewport={{
      once: true
    }}>
      {/* Subtle particle background specific to this section */}
      <ParticleBackground 
        variant="neural" 
        density="low" 
        speed="slow" 
        className="absolute inset-0 opacity-20" 
      />
      
      {/* Subtle glowing effect that doesn't hide particles */}
      <motion.div 
        className="absolute inset-0 bg-cyan-500/5 pointer-events-none"
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="container mx-auto relative z-10">
        <motion.h2 className="text-3xl font-mono font-bold mb-12 text-center text-blue-500" initial={{
          y: 20,
          opacity: 0
        }} whileInView={{
          y: 0,
          opacity: 1
        }} transition={{
          delay: 0.2,
          duration: 0.5
        }} viewport={{
          once: true
        }}>
          /CONTACT US
        </motion.h2>
        
        <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto justify-center">
          <motion.div className="md:w-2/3 max-w-md p-6 rounded-lg bg-blue-900/50 backdrop-blur-md border border-blue-500/30" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.5 }} viewport={{ once: true }}>
            <h3 className="text-xl font-semibold text-white mb-4">Get In Touch</h3>
            <p className="text-white/80 mb-4">
              Have questions or want to collaborate? Reach out to our team.
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-blue-400 mr-2" />
                <span className="text-white/80">innovaite@deakin.edu.au</span>
              </div>
              <div className="flex items-center">
                <MessageSquare className="w-5 h-5 text-blue-400 mr-2" />
                <span className="text-white/80">MS Teams Channel</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
