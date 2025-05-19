
import React from "react";
import { Mail, GitMerge, MessageSquare, Heart } from "lucide-react";
import { ParticleBackground } from "@/components/ui/motion/particles";

const Footer = () => {
  return (
    <footer className="relative bg-black border-t border-blue-900/30 py-12">
      <ParticleBackground variant="default" density="low" className="opacity-20" />
      
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 flex items-center">
            <img src="/lovable-uploads/2ac77590-a08e-4983-bafa-7be5dc24647b.png" alt="InnovAIte Logo" className="h-16 mr-3" />
            <div>
              <p className="text-xl font-mono font-bold text-white mb-2">InnovAIte</p>
              <p className="text-sm text-white/60">
                A research initiative under Deakin University's SPARK 2026 program
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-6 mb-4">
              <a href="mailto:contact@innovaite.ai" className="text-white/60 hover:text-blue-400 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
              <a href="https://gitlab.deakin.edu.au/innovaite/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-blue-400 transition-colors">
                <GitMerge className="h-5 w-5" />
              </a>
              <a href="https://teams.microsoft.com/l/team/19%3AcW6v8QDG1uJuK3IebazxDFvL7RLh8SPVLP7ZMK8jCH01%40thread.tacv2/conversations?groupId=64f97721-41a3-47c1-adad-e07a0e609089&tenantId=d02378ec-1688-46d5-8540-1c28b5f470f6" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-blue-400 transition-colors">
                <MessageSquare className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-white/60 flex items-center">
              Made with <Heart className="h-4 w-4 mx-1 text-blue-500" /> by InnovAIte
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
