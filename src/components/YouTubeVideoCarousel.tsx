
import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ExternalLink, Play, Pause, Volume, VolumeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "@/components/ui/motion";
import { pulseAnimation, glowAnimation } from "@/components/ui/motion";
import { ScrollArea } from "@/components/ui/scroll-area";

interface YouTubeVideo {
  id: string;
  title?: string;
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
  const [videoTitles, setVideoTitles] = useState<Record<string, string>>({});
  
  // All video URLs
  const videoUrls = [
    "https://youtu.be/JMBqw2SkuRw",
    "https://youtu.be/zxCHEJACAI8",
    "https://youtu.be/N8JWiuVLi9E",
    "https://youtu.be/qVuWRQh4Buo",
    "https://youtu.be/COgf8DAEH24"
  ];
  
  // Create the videos array with unique IDs
  const videos: YouTubeVideo[] = videoUrls
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

  // Fetch video titles from YouTube API
  useEffect(() => {
    const fetchVideoTitles = async () => {
      try {
        // Instead of making real API calls, we'll use placeholder titles for now
        // In a real implementation, you'd fetch from YouTube API with your API key
        const placeholderTitles: Record<string, string> = {};
        videos.forEach((video) => {
          placeholderTitles[video.id] = `InnovAIte Video - ${video.id.substring(0, 5)}`;
        });
        
        setVideoTitles(placeholderTitles);
      } catch (error) {
        console.error("Error fetching video titles:", error);
      }
    };

    fetchVideoTitles();
  }, []);

  // Set the first video as active by default
  useEffect(() => {
    if (videos.length > 0 && !activeVideo) {
      setActiveVideo({
        ...videos[0],
        title: videoTitles[videos[0].id] || "Loading title..."
      });
    }
  }, [videos, activeVideo, videoTitles]);

  // Update active video title when titles are loaded
  useEffect(() => {
    if (activeVideo && videoTitles[activeVideo.id]) {
      setActiveVideo(prev => prev ? {
        ...prev,
        title: videoTitles[prev.id] || prev.title
      } : null);
    }
  }, [videoTitles, activeVideo]);

  const handleVideoPlay = (video: YouTubeVideo) => {
    const videoWithTitle = {
      ...video,
      title: videoTitles[video.id] || "Loading title..."
    };
    
    if (currentPlayingId === video.id) {
      // Toggle play/pause for current video
      setIsPlaying(!isPlaying);
    } else {
      // Switch to new video
      setActiveVideo(videoWithTitle);
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
      {activeVideo && (
        <motion.div 
          className="mb-8 rounded-xl overflow-hidden shadow-2xl relative bg-blue-950/20 backdrop-blur border border-blue-500/30"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="aspect-video w-full relative">
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=${isPlaying ? 1 : 0}&mute=${muted ? 1 : 0}&modestbranding=1&rel=0`}
              title={activeVideo.title || "YouTube video"}
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
              <div>
                <h3 className="text-white font-semibold text-lg md:text-xl truncate pr-4">{activeVideo.title || "Loading title..."}</h3>
              </div>
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
                        <img
                          src={video.thumbnail}
                          alt={videoTitles[video.id] || "YouTube video thumbnail"}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                          <h3 className="text-white font-semibold line-clamp-1 text-sm">
                            {videoTitles[video.id] || "Loading..."}
                          </h3>
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
