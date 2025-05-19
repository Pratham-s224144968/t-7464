
/**
 * Validates a YouTube URL and returns true if it's a valid YouTube video link
 * Supports various YouTube URL formats
 */
export function isValidYoutubeUrl(url: string): boolean {
  if (!url) return false;
  
  // Regular expression to match YouTube URLs
  const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\S+)?$/;
  return regExp.test(url);
}

/**
 * Extracts the video ID from a YouTube URL
 */
export function getYoutubeVideoId(url: string): string | null {
  if (!url) return null;
  
  // Match YouTube URLs and extract the video ID
  const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\S+)?$/;
  const match = url.match(regExp);
  
  return match ? match[1] : null;
}

/**
 * Converts a YouTube URL to an embed URL
 */
export function getYoutubeEmbedUrl(url: string): string | null {
  const videoId = getYoutubeVideoId(url);
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}
