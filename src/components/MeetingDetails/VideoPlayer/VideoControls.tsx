
import React from "react";
import { motion } from "@/components/ui/motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface VideoControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  isMuted?: boolean;
  onMuteToggle?: () => void;
}

const VideoControls: React.FC<VideoControlsProps> = ({
  isPlaying,
  onPlayPause,
  isMuted = false,
  onMuteToggle
}) => {
  return (
    <motion.div 
      className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
    >
      <motion.button
        className="bg-blue-500/80 backdrop-blur-sm text-white p-2 rounded-full"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onPlayPause}
      >
        {isPlaying ? (
          <Pause size={20} />
        ) : (
          <Play size={20} />
        )}
      </motion.button>
      
      {onMuteToggle && (
        <motion.button
          className="bg-blue-500/80 backdrop-blur-sm text-white p-2 rounded-full"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onMuteToggle}
        >
          {isMuted ? (
            <VolumeX size={20} />
          ) : (
            <Volume2 size={20} />
          )}
        </motion.button>
      )}
    </motion.div>
  );
};

export default VideoControls;
