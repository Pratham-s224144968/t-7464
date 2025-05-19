
import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ExternalLink, Play, Pause, Volume, VolumeOff, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "@/components/ui/motion";
import { useInView, pulseAnimation, glowAnimation } from "@/components/ui/motion";
import { toast } from "@/hooks/use-toast";

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  viewCount?: number;
}

const YouTubeVideoCarousel = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [activeVideo, setActiveVideo] = useState<YouTubeVideo | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);
  const [muted, setMuted] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });

  // YouTube channel ID for InnovAIte
  const channelId = "UCbghlQU1xn4yhR7EvMu74pg"; // InnovAIte Deakin channel ID
  const apiKey = "AIzaSyDyH1jzc0ndNdGmxtu4CHEoKPK3o_TdQuE"; // This is a public API key for YouTube Data API

  useEffect(() => {
    const fetchYoutubeVideos = async () => {
      try {
        setLoading(true);
        // First get channel uploads playlist ID
        const channelResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`
        );
        const channelData = await channelResponse.json();
        
        if (!channelData.items || channelData.items.length === 0) {
          throw new Error("Channel not found");
        }

        const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;
        
        // Get videos from uploads playlist
        const videosResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=8&playlistId=${uploadsPlaylistId}&key=${apiKey}`
        );
        const videosData = await videosResponse.json();

        if (!videosData.items || videosData.items.length === 0) {
          throw new Error("No videos found");
        }

        // Get video IDs for statistics lookup
        const videoIds = videosData.items.map((item: any) => item.snippet.resourceId.videoId).join(',');
        
        // Get video statistics (view counts)
        const statsResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoIds}&key=${apiKey}`
        );
        const statsData = await statsResponse.json();
        
        // Map videos with statistics
        const mappedVideos = statsData.items.map((item: any) => ({
          id: item.id,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.maxres?.url || 
                    item.snippet.thumbnails.high?.url || 
                    item.snippet.thumbnails.medium?.url,
          viewCount: parseInt(item.statistics.viewCount, 10)
        }));
        
        // Sort by view count (most viewed first)
        const sortedVideos = mappedVideos.sort((a: YouTubeVideo, b: YouTubeVideo) => 
          (b.viewCount || 0) - (a.viewCount || 0)
        );
        
        setVideos(sortedVideos);
        
        // Set most viewed video as active
        if (sortedVideos.length > 0) {
          setActiveVideo(sortedVideos[0]);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching YouTube videos:", error);
        toast({
          title: "Could not load videos",
          description: "Using demo videos instead",
          variant: "destructive",
        });
        
        // Fallback to hardcoded videos
        setVideos([
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
          }
        ]);
        
        setActiveVideo({
          id: "jEyX8HW-RLs",
          title: "InnovAIte: AI Education Demo",
          thumbnail: "https://img.youtube.com/vi/jEyX8HW-RLs/maxresdefault.jpg",
        });
        
        setLoading(false);
      }
    };

    fetchYoutubeVideos();
  }, []);

  const handleVideoPlay = (video: YouTubeVideo) => {
    if (currentPlayingId === video.id) {
      // Toggle play/pause for current video
      setIsPlaying(!isPlaying);
    } else {
      // Switch to new video
      setActiveVideo(video);
      setCurrentPlayingId(video.id);
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  return (
    <div 
      ref={containerRef}
      className="w-full"
    >
      {loading ? (
        <div className="flex justify-center items-center h-64 w-full">
          <Loader className="h-10 w-10 text-blue-400 animate-spin" />
          <p className="ml-2 text-blue-300">Loading videos...</p>
        </div>
      ) : (
        <>
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
                  title={activeVideo.title}
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
                    <h3 className="text-white font-semibold text-lg md:text-xl">{activeVideo.title}</h3>
                    {activeVideo.viewCount && (
                      <p className="text-blue-300 text-sm">{activeVideo.viewCount.toLocaleString()} views</p>
                    )}
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
                          : 'border-blue-500/30'} bg-blue-950/20 backdrop-blur relative group cursor-pointer`}
                        onClick={() => handleVideoPlay(video)}
                      >
                        <div className="aspect-video relative overflow-hidden">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                            <h3 className="text-white font-semibold line-clamp-1 text-sm">
                              {video.title}
                            </h3>
                            {video.viewCount && (
                              <p className="text-blue-300 text-xs">{video.viewCount.toLocaleString()} views</p>
                            )}
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
          </div>
        </>
      )}
    </div>
  );
};

export default YouTubeVideoCarousel;
