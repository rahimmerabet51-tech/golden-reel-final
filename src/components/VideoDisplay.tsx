import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Video as VideoType } from "../../../shared/schema";
import { Play } from "lucide-react";
import ReactPlayer from "react-player";

interface VideoDisplayProps {
  className?: string;
}

// Function to convert video URLs to embeddable formats
function getEmbedUrl(url: string): string | null {
  if (!url) return null;
  
  // YouTube URLs
  const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
  const youtubeMatch = url.match(youtubeRegex);
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
  }
  
  // Vimeo URLs
  const vimeoRegex = /(?:vimeo\.com\/)(\d+)/;
  const vimeoMatch = url.match(vimeoRegex);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }
  
  // Instagram URLs
  const instagramRegex = /(?:instagram\.com\/p\/)([^\/\?]+)/;
  const instagramMatch = url.match(instagramRegex);
  if (instagramMatch) {
    return `https://www.instagram.com/p/${instagramMatch[1]}/embed/captioned/`;
  }
  
  // Direct MP4 URLs - return null to use video tag
  if (url.includes('.mp4') || url.includes('.webm') || url.includes('.ogg')) {
    return null;
  }
  
  // For other URLs, try to use as iframe
  return url;
}

export function VideoDisplay({ className = "" }: VideoDisplayProps) {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    fetchVideos();
    
    // Set up auto-refresh every 30 seconds
    const interval = setInterval(fetchVideos, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchVideos = async () => {
    try {
      console.log('Fetching videos from /api/videos...');
      const response = await fetch('/api/videos');
      console.log('Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Videos data received:', data);
        setVideos(data);
        setLastUpdated(new Date());
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('API error:', errorData);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`w-full h-64 bg-black/50 border border-white/10 flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/70">Loading videos...</p>
        </div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className={`w-full h-64 bg-black/50 border border-white/10 flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Play className="w-8 h-8 text-primary" />
          </div>
          <p className="text-white/70 mb-4">No videos available yet.</p>
          <button 
            onClick={fetchVideos}
            className="px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg transition-colors"
          >
            Refresh Videos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Header with refresh controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif text-primary mb-2">Video Library</h2>
          <p className="text-white/60 text-sm">
            {videos.length} {videos.length === 1 ? 'video' : 'videos'} available
            {lastUpdated && ` • Updated ${lastUpdated.toLocaleTimeString()}`}
          </p>
        </div>
        <button 
          onClick={fetchVideos}
          disabled={loading}
          className="px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              Refreshing...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </>
          )}
        </button>
      </div>

      {/* Video Grid */}
      {videos.map((video, index) => (
        <motion.div
          key={video.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="bg-black/50 border border-white/10 overflow-hidden"
        >
          {/* Video Container */}
          <div className="relative aspect-video bg-black">
            {getEmbedUrl(video.videoUrl) ? (
              <iframe
                src={getEmbedUrl(video.videoUrl)!}
                className="w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                title={video.title}
                onError={(e) => {
                  // Fallback for Instagram and other blocked embeds
                  const target = e.target as HTMLIFrameElement;
                  if (target.src.includes('instagram.com')) {
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }
                }}
              />
            ) : null}
            
            {/* Fallback for blocked embeds */}
            {video.videoUrl.includes('instagram.com') && (
              <div 
                className="absolute inset-0 flex items-center justify-center bg-black/90"
                style={{ display: 'none' }}
              >
                <div className="text-center p-6">
                  <p className="text-white mb-4">Instagram content cannot be embedded directly</p>
                  <a 
                    href={video.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-primary text-black font-semibold hover:bg-primary/90 transition-colors"
                  >
                    View on Instagram
                  </a>
                </div>
              </div>
            )}
            
            {!getEmbedUrl(video.videoUrl) && !video.videoUrl.includes('instagram.com') && (
              <div className="w-full h-full bg-black">
                <ReactPlayer
                  url={video.videoUrl}
                  width="100%"
                  height="100%"
                  controls={true}
                  playing={false}
                  // @ts-ignore
                />
              </div>
            )}
          </div>
          
          {/* Video Details */}
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-2xl font-serif text-primary mb-3">{video.title}</h3>
                <p className="text-white/80 leading-relaxed mb-4">{video.description}</p>
                <div className="flex items-center gap-4 text-sm text-white/50">
                  <span>Uploaded: {new Date(video.createdAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>Duration: Auto-detected</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default VideoDisplay;
