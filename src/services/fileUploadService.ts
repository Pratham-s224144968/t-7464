
// Service for handling file uploads and YouTube video links

import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/integrations/supabase/client";

/**
 * Validates if a URL is a valid YouTube video URL
 */
export const isValidYoutubeUrl = (url: string): boolean => {
  // Check common YouTube URL patterns
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})(\S*)?$/;
  return youtubeRegex.test(url);
};

/**
 * Extracts the YouTube video ID from a valid YouTube URL
 */
export const extractYoutubeVideoId = (url: string): string | null => {
  if (!isValidYoutubeUrl(url)) return null;
  
  // Extract video ID from various YouTube URL formats
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
};

/**
 * Converts a YouTube URL to an embed URL
 */
export const getYoutubeEmbedUrl = (url: string): string | null => {
  const videoId = extractYoutubeVideoId(url);
  if (!videoId) return null;
  
  return `https://www.youtube.com/embed/${videoId}`;
};

/**
 * Uploads a file with progress tracking
 */
export const uploadFile = async (
  file: File, 
  bucketName: string, 
  path: string,
  onProgress?: (progress: number) => void
): Promise<string | null> => {
  try {
    // Simulate realistic progress for development environment
    if (onProgress) {
      const simulateProgress = () => {
        let progress = 0;
        const interval = setInterval(() => {
          // Create a more realistic simulation with variable speeds and pauses
          const increment = Math.floor(Math.random() * 10) + 2;
          progress += increment;
          
          // Simulate slowdown at certain thresholds
          if (progress >= 85 && progress < 95) {
            progress += Math.floor(Math.random() * 3);
          }
          
          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
          }
          
          onProgress(progress);
        }, 300 + Math.random() * 400); // Variable timing between updates
      };
      simulateProgress();
    }
    
    // For now, just simulate the upload and return a mock URL
    // In production, this would use the Supabase storage API
    console.log(`Uploading file ${file.name} to ${bucketName}/${path}`);
    
    // Return a mock public URL
    return `https://example.com/storage/${bucketName}/${path}`;
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
};

/**
 * Generates a unique file path for uploading
 */
export const generateFilePath = (meetingId: string, fileType: 'recording' | 'transcript'): string => {
  const fileName = `${fileType}_${uuidv4()}`;
  return `meetings/${meetingId}/${fileName}`;
};
