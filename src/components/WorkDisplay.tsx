import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import ReactPlayer from "react-player";
import type { Work } from "@/lib/supabase";

interface WorkDisplayProps {
  work: Work;
  className?: string;
}

export function WorkDisplay({ work, className = "" }: WorkDisplayProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`group relative overflow-hidden rounded-lg bg-black/50 border border-white/10 ${className}`}
    >
      {/* Media Container */}
      <div className="aspect-video relative">
        {work.type === 'video' ? (
          <div className="w-full h-full">
            {isPlaying ? (
              <ReactPlayer
                url={work.url}
                width="100%"
                height="100%"
                controls={true}
                playing={true}
                onPause={handlePause}
                onEnded={handlePause}
                config={{
                  vimeo: {
                    byline: false,
                    portrait: false,
                    title: false,
                    color: 'CA8A04'
                  }
                }}
                className="rounded-lg"
              />
            ) : (
              <div 
                className="w-full h-full flex items-center justify-center bg-black/80 cursor-pointer relative"
                onClick={handlePlay}
              >
                {/* Premium thumbnail background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-black/60 to-black/90">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-20 h-20 bg-primary/95 rounded-full flex items-center justify-center shadow-2xl border-2 border-white/20"
                    >
                      <Play className="w-10 h-10 text-black ml-1" />
                    </motion.div>
                  </div>
                </div>
                
                {/* Vimeo branding indicator */}
                {work.url.includes('vimeo.com') && (
                  <div className="absolute top-4 left-4">
                    <div className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full">
                      <span className="text-white/80 text-xs font-medium">VIMEO</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-full">
            <img
              src={work.url}
              alt={work.title}
              className="w-full h-full object-cover rounded-lg"
              loading="lazy"
            />
          </div>
        )}
      </div>

      {/* Overlay Info */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end"
      >
        <h3 className="text-xl font-bold text-white mb-2">{work.title}</h3>
        {work.description && (
          <p className="text-white/80 text-sm line-clamp-2">{work.description}</p>
        )}
      </motion.div>
    </motion.div>
  );
}
