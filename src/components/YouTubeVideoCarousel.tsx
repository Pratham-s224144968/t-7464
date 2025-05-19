
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "@/components/ui/motion";
import { glowAnimation } from "@/components/ui/motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useYouTubeCarousel } from "@/hooks/useYouTubeCarousel";
import VideoThumbnail from "./VideoThumbnail";
import YouTubePlayer from "./YouTubePlayer";

const YouTubeVideoCarousel = () => {
  // All video URLs
  const videoUrls = [
    "https://youtu.be/JMBqw2SkuRw",
    "https://youtu.be/zxCHEJACAI8",
    "https://youtu.be/N8JWiuVLi9E",
    "https://youtu.be/qVuWRQh4Buo",
    "https://youtu.be/COgf8DAEH24"
  ];
  
  const {
    activeVideo,
    isPlaying,
    currentPlayingId,
    muted,
    videos,
    handleVideoPlay,
    toggleMute,
    setIsPlaying
  } = useYouTubeCarousel(videoUrls);

  return (
    <div className="w-full">
      {/* Featured Video Player */}
      {activeVideo && (
        <YouTubePlayer
          videoId={activeVideo.id}
          isPlaying={isPlaying}
          muted={muted}
          onPlayToggle={() => setIsPlaying(!isPlaying)}
          onMuteToggle={toggleMute}
        />
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
                  <VideoThumbnail
                    video={video}
                    index={index}
                    isPlaying={isPlaying}
                    isCurrentVideo={currentPlayingId === video.id}
                    onClick={() => handleVideoPlay(video)}
                  />
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
