import { motion } from "framer-motion";
import { X } from "lucide-react";
import ReactPlayer from "react-player";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
}

export function VideoModal({ isOpen, onClose, videoUrl, title }: VideoModalProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-4xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Video Container */}
        <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl">
          <div className="aspect-video">
            <ReactPlayer
              url={videoUrl}
              width="100%"
              height="100%"
              controls={true}
              playing={true}
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
          </div>
        </div>

        {/* Video Title */}
        <div className="mt-4 text-center">
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
      </motion.div>
    </motion.div>
  );
}
