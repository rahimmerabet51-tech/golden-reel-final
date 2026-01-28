import React from 'react';
import ReactPlayer from 'react-player';

interface VideoDisplayProps {
  url?: string;
  title?: string;
  type?: 'video' | 'image';
  className?: string;
  playing?: boolean;
  controls?: boolean;
}

const VideoDisplay: React.FC<VideoDisplayProps> = ({ 
  url = '/site1.mp4', 
  title = 'Video', 
  type = 'video',
  className = '',
  playing = true,
  controls = true 
}) => {
  if (!url) return null;

  return (
    <div className={`w-full aspect-video bg-black ${className}`}>
      {type === 'video' ? (
        <ReactPlayer
          url={url}
          width="100%"
          height="100%"
          controls={controls}
          playing={playing}
          style={{ backgroundColor: 'black' }}
          // @ts-ignore
        />
      ) : (
        <img 
          src={url} 
          alt={title}
          className="w-full h-full object-contain"
        />
      )}
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
              <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
                <ReactPlayer
                  url={video.videoUrl}
                  width="100%"
                  height="100%"
                  controls={true}
                  playing={true}
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
