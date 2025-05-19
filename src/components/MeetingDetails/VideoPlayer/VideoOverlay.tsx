
import React from "react";
import { motion } from "@/components/ui/motion";

interface VideoOverlayProps {
  onPlay: () => void;
}

const VideoOverlay: React.FC<VideoOverlayProps> = ({ onPlay }) => {
  return (
    <motion.div 
      className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center cursor-pointer z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onPlay}
    >
      <motion.div 
        className="w-20 h-20 bg-blue-500/80 backdrop-blur-sm rounded-full flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="white"
          className="motion-svg"
        >
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default VideoOverlay;
