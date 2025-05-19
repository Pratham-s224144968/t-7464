
import React from "react";
import { motion } from "@/components/ui/motion";
import { Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        
        <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto">
          <motion.div className="md:w-1/2 p-6 rounded-lg bg-blue-900/20 backdrop-blur border border-blue-500/30" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.5 }} viewport={{ once: true }}>
            <h3 className="text-xl font-semibold text-white mb-4">Get In Touch</h3>
            <p className="text-white/80 mb-4">
              Have questions or want to collaborate? Reach out to our team.
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-blue-400 mr-2" />
                <span className="text-white/80">contact@innovaite.ai</span>
              </div>
              <div className="flex items-center">
                <MessageSquare className="w-5 h-5 text-blue-400 mr-2" />
                <span className="text-white/80">MS Teams Channel</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div className="md:w-1/2 p-6 rounded-lg bg-blue-900/20 backdrop-blur border border-blue-500/30" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.5 }} viewport={{ once: true }}>
            <h3 className="text-xl font-semibold text-white mb-4">Visit Us</h3>
            <p className="text-white/80 mb-4">
              We're located at Deakin University's Burwood Campus.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 w-full" onClick={() => window.open('https://goo.gl/maps/9Z9Z9Z9Z9Z9Z9Z9Z9', '_blank')}>
              View Map
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
