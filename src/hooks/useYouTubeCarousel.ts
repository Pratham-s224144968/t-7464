
import { useState, useEffect, useCallback } from "react";
import { YouTubeVideo } from "@/models/videoTypes";
import { getVideoId, getThumbnailUrl } from "@/utils/youtubeUtils";

export const useYouTubeCarousel = (videoUrls: string[]) => {
  const [activeVideo, setActiveVideo] = useState<YouTubeVideo | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);
  const [muted, setMuted] = useState<boolean>(true);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [autoScrollIndex, setAutoScrollIndex] = useState<number>(0);

  // Initialize videos with shuffled order
  useEffect(() => {
    // Create the videos array with unique IDs
    const uniqueVideos: YouTubeVideo[] = videoUrls
      .map(url => {
        const id = getVideoId(url);
        return {
          id,
          thumbnail: getThumbnailUrl(id),
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
  }, [videoUrls]);

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (videos.length > 0) {
        const nextIndex = (autoScrollIndex + 1) % videos.length;
        setAutoScrollIndex(nextIndex);
        
        // Only change the active video if no video is currently playing
        if (!currentPlayingId) {
          setActiveVideo(videos[nextIndex]);
        }
      }
    }, 5000); // Change video every 5 seconds
    
    return () => clearInterval(interval);
  }, [autoScrollIndex, videos, currentPlayingId]);

  const handleVideoPlay = useCallback((video: YouTubeVideo) => {
    if (currentPlayingId === video.id) {
      // Toggle play/pause for current video
      setIsPlaying(!isPlaying);
    } else {
      // Switch to new video
      setActiveVideo(video);
      setCurrentPlayingId(video.id);
      setIsPlaying(true);
    }
  }, [currentPlayingId, isPlaying]);

  const toggleMute = useCallback(() => {
    setMuted(!muted);
  }, [muted]);

  return {
    activeVideo,
    isPlaying,
    currentPlayingId,
    muted,
    videos,
    handleVideoPlay,
    toggleMute,
    setIsPlaying
  };
};
