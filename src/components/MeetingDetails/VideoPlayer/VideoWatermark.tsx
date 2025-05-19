
import React from "react";
import { motion } from "@/components/ui/motion";

interface VideoWatermarkProps {
  isPlaying: boolean;
}

const VideoWatermark: React.FC<VideoWatermarkProps> = ({ isPlaying }) => {
  return (
    <motion.div 
      className="absolute bottom-4 right-4 z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: isPlaying ? 0.6 : 0.8 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <img 
        src="/lovable-uploads/e2814672-f895-4078-9d7c-faa5569a0d14.png" 
        alt="Deakin University Logo"
        className="h-12 w-12"
      />
    </motion.div>
  );
};

export default VideoWatermark;
