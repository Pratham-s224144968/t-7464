
import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ExternalLink, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "@/components/ui/motion";

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
}

const videos: YouTubeVideo[] = [
  {
    id: "jEyX8HW-RLs",
    title: "InnovAIte: AI Education Demo",
    thumbnail: "https://img.youtube.com/vi/jEyX8HW-RLs/maxresdefault.jpg",
  },
  {
    id: "FZr1pQMzVjk",
    title: "InnovAIte: AI Industry Applications",
    thumbnail: "https://img.youtube.com/vi/FZr1pQMzVjk/maxresdefault.jpg",
  },
  {
    id: "nNoa0Sd7uDo",
    title: "InnovAIte: Hackathon 2024",
    thumbnail: "https://img.youtube.com/vi/nNoa0Sd7uDo/maxresdefault.jpg",
  },
  {
    id: "8WEIabXf1os",
    title: "InnovAIte: Building with AI",
    thumbnail: "https://img.youtube.com/vi/8WEIabXf1os/maxresdefault.jpg",
  },
  {
    id: "jOTf4qqcwmQ",
    title: "InnovAIte: Rapid Prototyping with AI",
    thumbnail: "https://img.youtube.com/vi/jOTf4qqcwmQ/maxresdefault.jpg",
  },
  {
    id: "N8JWiuVLi9E",
    title: "InnovAIte: AI Ethics Workshop",
    thumbnail: "https://img.youtube.com/vi/N8JWiuVLi9E/maxresdefault.jpg",
  },
  {
    id: "zxCHEJACAI8",
    title: "InnovAIte: Introduction to Large Language Models",
    thumbnail: "https://img.youtube.com/vi/zxCHEJACAI8/maxresdefault.jpg",
  },
  {
    id: "JMBqw2SkuRw",
    title: "InnovAIte: Future of AI in Education",
    thumbnail: "https://img.youtube.com/vi/JMBqw2SkuRw/maxresdefault.jpg",
  }
];

const YouTubeVideoCarousel = () => {
  const [activeVideo, setActiveVideo] = useState<YouTubeVideo | null>(null);

  const openVideoModal = (video: YouTubeVideo) => {
    setActiveVideo(video);
    // In a real implementation, we'd open a modal or redirect to YouTube
    window.open(`https://www.youtube.com/watch?v=${video.id}`, '_blank');
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {videos.map((video) => (
            <CarouselItem key={video.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <div className="overflow-hidden rounded-xl border border-blue-500/30 bg-blue-950/20 backdrop-blur relative group">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                      <h3 className="text-white font-semibold line-clamp-2">
                        {video.title}
                      </h3>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        onClick={() => openVideoModal(video)}
                        className="bg-blue-600/80 hover:bg-blue-600 backdrop-blur p-3 rounded-full"
                      >
                        <Play className="h-8 w-8" />
                        <span className="sr-only">Play video</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
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
    </div>
  );
};

export default YouTubeVideoCarousel;
