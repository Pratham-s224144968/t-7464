
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "@/components/ui/motion";
import { Play, Pause } from "lucide-react";
import { pulseAnimation } from "@/components/ui/motion";
import { YouTubeVideo } from "@/models/videoTypes";

interface VideoThumbnailProps {
  video: YouTubeVideo;
  index: number;
  isPlaying: boolean;
  isCurrentVideo: boolean;
  onClick: () => void;
}

const VideoThumbnail = ({
  video,
  index,
  isPlaying,
  isCurrentVideo,
  onClick,
}: VideoThumbnailProps) => {
  return (
    <motion.div 
      className="p-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
    >
      <div 
        className={`overflow-hidden rounded-xl border ${isCurrentVideo 
          ? 'border-blue-400 shadow-lg shadow-blue-500/20' 
          : 'border-blue-500/30'} bg-blue-950/20 backdrop-blur relative group cursor-pointer h-full`}
        onClick={onClick}
      >
        <div className="aspect-video relative overflow-hidden">
          {video.thumbnail && (
            <img
              src={video.thumbnail}
              alt="YouTube thumbnail"
              className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                // If thumbnail fails, try a fallback
                target.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
          </div>
          <motion.div 
            className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"
            {...pulseAnimation}
          >
            <Button
              variant="default"
              size="icon"
              className={`bg-blue-600/80 hover:bg-blue-600 backdrop-blur rounded-full ${
                isCurrentVideo ? 'animate-pulse' : ''
              }`}
            >
              {isCurrentVideo && isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </Button>
          </motion.div>
          
          {isCurrentVideo && (
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-blue-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 30, ease: "linear" }}
            ></motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default VideoThumbnail;
