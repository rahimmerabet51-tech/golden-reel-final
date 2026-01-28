export function getVideoUrl(url: string): string {
  // Handle Instagram URLs - convert to embed format if possible
  if (url.includes('instagram.com/reel/')) {
    // Instagram doesn't allow embedding, so we'll return a fallback or local video
    console.warn('Instagram URLs cannot be embedded. Please use YouTube, Vimeo, or direct MP4 URLs.');
    return '/site1.mp4'; // Fallback to local video
  }
  
  // Handle YouTube URLs
  if (url.includes('youtube.com/watch?v=')) {
    return url; // ReactPlayer handles YouTube URLs directly
  }
  
  // Handle YouTube short URLs
  if (url.includes('youtu.be/')) {
    return url; // ReactPlayer handles youtu.be URLs
  }
  
  // Handle Vimeo URLs
  if (url.includes('vimeo.com/')) {
    return url; // ReactPlayer handles Vimeo URLs directly
  }
  
  // Handle direct MP4 URLs
  if (url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.mov')) {
    return url; // Direct video files work fine
  }
  
  // Return as-is for other cases
  return url;
}

export function isVideoSupported(url: string): boolean {
  const supportedPlatforms = [
    'youtube.com',
    'youtu.be',
    'vimeo.com',
    '.mp4',
    '.webm',
    '.mov',
    '/site1.mp4' // Local video
  ];
  
  return supportedPlatforms.some(platform => url.includes(platform));
}
