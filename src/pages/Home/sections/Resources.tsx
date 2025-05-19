
import React from "react";
import { motion } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { GitMerge, MessageSquare, FileText } from "lucide-react";
import { ParticleBackground } from "@/components/ui/motion/particles";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const Resources = () => {
  const { isAuthenticated, isDeakinUser } = useAuth();
  const navigate = useNavigate();
  
  const handleResourceClick = (path: string, requiresDeakin: boolean = false) => {
    if (!isAuthenticated) {
      navigate("/auth");
      toast({
        title: "Authentication Required",
        description: "Please sign in to access this resource.",
      });
      return;
    }
    
    if (requiresDeakin && !isDeakinUser) {
      toast({
        title: "Access Restricted",
        description: "This resource is only available to Deakin University members.",
        variant: "destructive"
      });
      return;
    }
    
    navigate(path);
  };

  return (
    <motion.section id="resources" className="relative py-20 bg-black/30 backdrop-blur-sm" initial={{
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
        variant="cyber" 
        density="low" 
        speed="slow" 
        className="absolute inset-0 opacity-20" 
      />
      
      {/* Subtle cyber gradient that doesn't hide particles */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10 pointer-events-none"
        animate={{
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
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
          /RESOURCES
        </motion.h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* GitLab Repositories - Deakin-only resource */}
          <motion.div className="p-6 rounded-lg bg-blue-900/20 backdrop-blur border border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} viewport={{ once: true }}>
            <div className="flex items-center mb-4">
              <GitMerge className="w-8 h-8 text-blue-400 mr-3" />
              <h3 className="text-xl font-semibold text-white">GitLab Repositories</h3>
            </div>
            <p className="text-white/70 mb-4">
              Access our open-source code repositories, documentation, and project materials.
              {!isAuthenticated && <span className="block mt-2 text-blue-300">*Requires Deakin authentication</span>}
            </p>
            <Button 
              className={`w-full ${isDeakinUser ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600/50 hover:bg-blue-700/50'}`} 
              onClick={() => handleResourceClick('https://gitlab.deakin.edu.au/innovaite', true)}
              disabled={isAuthenticated && !isDeakinUser}
            >
              {isAuthenticated && !isDeakinUser ? 'Deakin Access Only' : 'View Repositories'}
            </Button>
          </motion.div>
          
          {/* MS Teams Channel */}
          <motion.div className="p-6 rounded-lg bg-blue-900/20 backdrop-blur border border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }} viewport={{ once: true }}>
            <div className="flex items-center mb-4">
              <MessageSquare className="w-8 h-8 text-blue-400 mr-3" />
              <h3 className="text-xl font-semibold text-white">MS Teams Channel</h3>
            </div>
            <p className="text-white/70 mb-4">
              Join our Microsoft Teams channel for discussions, announcements, and collaboration.
              {!isAuthenticated && <span className="block mt-2 text-blue-300">*Requires authentication</span>}
            </p>
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700" 
              onClick={() => handleResourceClick('https://teams.microsoft.com/l/team/19%3AcW6v8QDG1uJuK3IebazxDFvL7RLh8SPVLP7ZMK8jCH01%40thread.tacv2/conversations?groupId=64f97721-41a3-47c1-adad-e07a0e609089&tenantId=d02378ec-1688-46d5-8540-1c28b5f470f6')}
            >
              Join Teams Channel
            </Button>
          </motion.div>
          
          {/* Meeting Notes */}
          <motion.div className="p-6 rounded-lg bg-blue-900/20 backdrop-blur border border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }} viewport={{ once: true }}>
            <div className="flex items-center mb-4">
              <FileText className="w-8 h-8 text-blue-400 mr-3" />
              <h3 className="text-xl font-semibold text-white">Meeting Notes</h3>
            </div>
            <p className="text-white/70 mb-4">
              Browse our weekly meeting summaries and project updates.
              {!isAuthenticated && <span className="block mt-2 text-blue-300">*Requires authentication</span>}
            </p>
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700" 
              onClick={() => handleResourceClick('/meetings')}
            >
              View Team Meetings
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Resources;
