import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Loader2, AlertCircle } from 'lucide-react';

interface MasterPlayerProps {
  url: string;
}

const MasterPlayer: React.FC<MasterPlayerProps> = ({ url }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="w-full h-full bg-black" />;

  return (
    <div className="w-full h-full relative bg-black group overflow-hidden">
      
      {/* 1. Loading Spinner (يختفي كي يبدأ الفيديو) */}
      {isLoading && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/50">
          <Loader2 className="w-10 h-10 text-yellow-500 animate-spin mb-2" />
          <p className="text-white text-xs">Loading video...</p>
        </div>
      )}

      {/* 2. Error Message (إذا الرابط غالط) */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-zinc-900">
          <AlertCircle className="w-10 h-10 text-red-500 mb-2" />
          <p className="text-white text-sm">Video Error</p>
          <p className="text-red-400 text-xs mt-1 px-4 text-center">{url || "No URL provided"}</p>
        </div>
      )}

      {/* 3. The Player */}
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls={true}
        playing={true}
        muted={true} // مهم: الفيديو يبدأ صامت باش المتصفح ما يبلوكيهش
        onReady={() => setIsLoading(false)}
        onStart={() => setIsLoading(false)}
        onPlay={() => setIsLoading(false)}
        onError={(e) => {
          console.error("Video Error:", e);
          setIsLoading(false);
          setError(true);
        }}
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
      
      {/* Debug URL (نحوه من بعد) */}
      <div className="absolute top-0 left-0 bg-black/50 text-white text-[10px] p-1 z-30 opacity-50 hover:opacity-100">
        {url}
      </div>
    </div>
  );
};

export default MasterPlayer;