
import React, { useState, useEffect } from "react";
import { motion } from "@/components/ui/motion";
import { Card, CardContent } from "@/components/ui/card";
import VideoControls from "./VideoControls";
import VideoOverlay from "./VideoOverlay";
import VideoWatermark from "./VideoWatermark";
import VideoProgressBar from "./VideoProgressBar";

interface VideoPlayerProps {
  src?: string;
  poster?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster = "https://images.unsplash.com/photo-1556155092-8707de31f9c4?q=80&w=1000",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showWatermark, setShowWatermark] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    // Hide watermark after 5 seconds if video is playing
    if (isPlaying) {
      const watermarkTimer = setTimeout(() => {
        setShowWatermark(false);
      }, 5000);
      return () => {
        clearTimeout(timer);
        clearTimeout(watermarkTimer);
      };
    }

    return () => clearTimeout(timer);
  }, [isPlaying]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  if (!src) return null;

  return (
    <motion.div 
      className="aspect-video bg-blue-900/30 rounded-md flex items-center justify-center relative overflow-hidden"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
    >
      {!isLoaded && (
        <motion.div 
          className="absolute inset-0 flex items-center justify-center bg-blue-950/80 z-10"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="loading-spinner"></div>
        </motion.div>
      )}
      
      <video
        controls
        className="w-full h-full rounded-md"
        poster={poster}
        onPlay={handlePlay}
        onPause={handlePause}
        onLoadedData={() => setIsLoaded(true)}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {!isPlaying && isLoaded && (
        <VideoOverlay onPlay={() => {
          const videoEl = document.querySelector('video');
          if (videoEl) {
            videoEl.play();
          }
        }} />
      )}
      
      {showWatermark && <VideoWatermark isPlaying={isPlaying} />}
      
      {isPlaying && <VideoProgressBar />}
    </motion.div>
  );
};

export default VideoPlayer;
