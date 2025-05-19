
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "@/components/ui/motion";
import { Play, Pause, Volume, VolumeOff } from "lucide-react";

interface YouTubePlayerProps {
  videoId: string;
  isPlaying: boolean;
  muted: boolean;
  onPlayToggle: () => void;
  onMuteToggle: () => void;
}

const YouTubePlayer = ({ 
  videoId, 
  isPlaying, 
  muted,
  onPlayToggle,
  onMuteToggle 
}: YouTubePlayerProps) => {
  return (
    <motion.div 
      className="mb-8 rounded-xl overflow-hidden shadow-2xl relative bg-blue-950/20 backdrop-blur border border-blue-500/30"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      key={videoId}
    >
      <div className="aspect-video w-full relative">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}&mute=${muted ? 1 : 0}&modestbranding=1&rel=0`}
          title="YouTube video"
          className="absolute inset-0 w-full h-full"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
        
        <motion.div 
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white bg-black/40 backdrop-blur hover:bg-black/60"
              onClick={onMuteToggle}
            >
              {muted ? <VolumeOff className="h-5 w-5" /> : <Volume className="h-5 w-5" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white bg-black/40 backdrop-blur hover:bg-black/60"
              onClick={onPlayToggle}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default YouTubePlayer;
