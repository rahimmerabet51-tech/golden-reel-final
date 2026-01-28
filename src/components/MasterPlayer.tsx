import React from 'react';

interface MasterPlayerProps {
  url: string;
}

const MasterPlayer: React.FC<MasterPlayerProps> = ({ url }) => {
  const getVideoSource = (url: string) => {
    if (!url) return null;

    // YouTube
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
      return {
        type: 'iframe',
        src: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
      };
    }
    
    // Vimeo
    if (url.includes('vimeo.com')) {
      const videoId = url.split('/').pop();
      return {
        type: 'iframe',
        src: `https://player.vimeo.com/video/${videoId}?autoplay=1`
      };
    }

    // --- الجديد: Streamable ---
    if (url.includes('streamable.com')) {
      const videoId = url.split('/').pop();
      return {
        type: 'iframe',
        src: `https://streamable.com/e/${videoId}?autoplay=1`
      };
    }

    // ملف مباشر (MP4)
    return { type: 'file', src: url };
  };

  const video = getVideoSource(url);

  if (!video) return <div className="w-full h-full bg-black flex items-center justify-center text-white text-xs">No Video Link</div>;

  return (
    <div className="w-full h-full bg-black relative">
      {video.type === 'iframe' ? (
        <iframe
          src={video.src}
          className="w-full h-full absolute inset-0"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <video 
          src={video.src} 
          className="w-full h-full object-contain" 
          controls 
          autoPlay 
        />
      )}
    </div>
  );
};

export default MasterPlayer;