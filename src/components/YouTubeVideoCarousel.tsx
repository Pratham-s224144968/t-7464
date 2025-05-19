
import React, { useState, useEffect, useCallback } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ExternalLink, Play, Pause, Volume, VolumeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "@/components/ui/motion";
import { pulseAnimation, glowAnimation } from "@/components/ui/motion";
import { ScrollArea } from "@/components/ui/scroll-area";

interface YouTubeVideo {
  id: string;
  thumbnail: string;
}

const getVideoId = (url: string): string => {
  // Extract video ID from different YouTube URL formats
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : "";
};

const YouTubeVideoCarousel = () => {
  const [activeVideo, setActiveVideo] = useState<YouTubeVideo | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);
  const [muted, setMuted] = useState<boolean>(true);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [autoScrollIndex, setAutoScrollIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  
  // All video URLs
  const videoUrls = [
    "https://youtu.be/JMBqw2SkuRw",
    "https://youtu.be/zxCHEJACAI8",
    "https://youtu.be/N8JWiuVLi9E",
    "https://youtu.be/qVuWRQh4Buo",
    "https://youtu.be/COgf8DAEH24"
  ];
  
  // Initialize videos with shuffled order
  useEffect(() => {
    // Create the videos array with unique IDs
    const uniqueVideos: YouTubeVideo[] = videoUrls
      .map(url => {
        const id = getVideoId(url);
        return {
          id,
          thumbnail: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
        };
      })
      .filter((video, index, self) => 
        // Remove duplicates
        index === self.findIndex((v) => v.id === video.id)
      );
    
    // Shuffle the videos array
    const shuffled = [...uniqueVideos].sort(() => Math.random() - 0.5);
    setVideos(shuffled);
    
    // Set first video as active
    if (shuffled.length > 0) {
      setActiveVideo(shuffled[0]);
    }
  }, []);

  const changeActiveVideo = useCallback((video: YouTubeVideo) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveVideo(video);
      setIsTransitioning(false);
    }, 300); // Matches the exit animation duration
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (videos.length > 0) {
        const nextIndex = (autoScrollIndex + 1) % videos.length;
        setAutoScrollIndex(nextIndex);
        
        // Only change the active video if no video is currently playing
        if (!currentPlayingId) {
          changeActiveVideo(videos[nextIndex]);
        }
      }
    }, 5000); // Change video every 5 seconds
    
    return () => clearInterval(interval);
  }, [autoScrollIndex, videos, currentPlayingId, changeActiveVideo]);

  const handleVideoPlay = (video: YouTubeVideo) => {
    if (currentPlayingId === video.id) {
      // Toggle play/pause for current video
      setIsPlaying(!isPlaying);
    } else {
      // Switch to new video
      changeActiveVideo(video);
      setCurrentPlayingId(video.id);
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  return (
    <div className="w-full">
      {/* Featured Video Player */}
      <AnimatePresence mode="wait">
        {activeVideo && (
          <motion.div 
            key={activeVideo.id}
            className="mb-8 rounded-xl overflow-hidden shadow-2xl relative bg-blue-950/20 backdrop-blur border border-blue-500/30"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="aspect-video w-full relative">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=${isPlaying ? 1 : 0}&mute=${muted ? 1 : 0}&modestbranding=1&rel=0`}
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
                    onClick={toggleMute}
                  >
                    {muted ? <VolumeOff className="h-5 w-5" /> : <Volume className="h-5 w-5" />}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-white bg-black/40 backdrop-blur hover:bg-black/60"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Carousel */}
      <div className="relative">
        <motion.div 
          className="absolute -left-5 -right-5 -top-5 -bottom-5 bg-blue-500/5 rounded-3xl -z-10"
          style={{ 
            backgroundImage: "radial-gradient(circle at center, rgba(59, 130, 246, 0.2) 0%, rgba(30, 64, 175, 0.05) 70%)"
          }}
          {...glowAnimation}
        ></motion.div>
        
        <ScrollArea className="w-full max-h-80">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {videos.map((video, index) => (
                <CarouselItem key={video.id} className="md:basis-1/3 lg:basis-1/4">
                  <motion.div 
                    className="p-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  >
                    <div 
                      className={`overflow-hidden rounded-xl border ${currentPlayingId === video.id 
                        ? 'border-blue-400 shadow-lg shadow-blue-500/20' 
                        : 'border-blue-500/30'} bg-blue-950/20 backdrop-blur relative group cursor-pointer h-full`}
                      onClick={() => handleVideoPlay(video)}
                    >
                      <div className="aspect-video relative overflow-hidden">
                        <motion.img
                          src={video.thumbnail}
                          alt="YouTube video thumbnail"
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        />
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
                              currentPlayingId === video.id ? 'animate-pulse' : ''
                            }`}
                          >
                            {currentPlayingId === video.id && isPlaying ? (
                              <Pause className="h-6 w-6" />
                            ) : (
                              <Play className="h-6 w-6" />
                            )}
                          </Button>
                        </motion.div>
                        
                        {currentPlayingId === video.id && (
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
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-center mt-4 gap-2">
              <CarouselPrevious className="relative static transform-none translate-y-0 bg-blue-800/50 border-blue-500/30 hover:bg-blue-700/70 text-white" />
              <Button
                variant="outline"
                size="sm"
                className="text-blue-300 border-blue-500/30 hover:bg-blue-800/30"
                onClick={() => window.open("https://www.youtube.com/@innovAIteDeakin", "_blank")}
              >
                Visit Channel <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
              <CarouselNext className="relative static transform-none translate-y-0 bg-blue-800/50 border-blue-500/30 hover:bg-blue-700/70 text-white" />
            </div>
          </Carousel>
        </ScrollArea>
      </div>
    </div>
  );
};

export default YouTubeVideoCarousel;
