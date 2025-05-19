
/**
 * Extracts YouTube video ID from various URL formats
 */
export const getVideoId = (url: string): string => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : "";
};

/**
 * Gets thumbnail URL for a YouTube video
 */
export const getThumbnailUrl = (videoId: string): string => {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};
