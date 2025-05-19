
/**
 * Utility functions for processing YouTube URLs
 */

/**
 * Validates if a string is a valid YouTube URL
 */
export function isValidYoutubeUrl(url: string): boolean {
  try {
    if (!url) return false;
    
    // Regular expression for YouTube URL validation
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    const result = regex.test(url);
    
    console.log(`URL ${url} is ${result ? 'valid' : 'invalid'} YouTube URL`);
    return result;
  } catch (error) {
    console.error("Error validating YouTube URL:", error);
    return false;
  }
}

/**
 * Converts a YouTube URL to an embeddable format
 */
export function getYoutubeEmbedUrl(url: string): string {
  try {
    if (!url) return '';
    
    // Extract video ID from YouTube URL
    let videoId = '';
    
    // Handle youtu.be format
    if (url.includes('youtu.be')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } 
    // Handle youtube.com format
    else if (url.includes('youtube.com')) {
      const urlParams = new URLSearchParams(new URL(url).search);
      videoId = urlParams.get('v') || '';
    }
    
    if (!videoId) {
      console.warn("Could not extract YouTube video ID from URL:", url);
      return url; // Return original URL if we couldn't extract the video ID
    }
    
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    console.log(`Converted ${url} to embed URL: ${embedUrl}`);
    return embedUrl;
  } catch (error) {
    console.error("Error getting YouTube embed URL:", error);
    return url; // Return original URL in case of any error
  }
}
