import { useState } from "react";
import { motion } from "framer-motion";
import type { Work } from "@/lib/supabase";
import ProjectModal from "./ProjectModal";

interface WorkCardProps {
  work: Work;
  onOpen?: (work: Work) => void;
  className?: string;
}

export function WorkCard({ work, onOpen, className = "" }: WorkCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    if (onOpen) {
      onOpen(work);
    } else {
      setIsModalOpen(true);
    }
  };
  const closeModal = () => setIsModalOpen(false);

  // Use thumbnail_url for videos, fallback to cover image, or regular image for images
  const coverImage = work.thumbnail_url || (work.type === 'video' ? '/sitecover.jpg' : work.url);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`group relative overflow-hidden rounded-lg bg-black/50 border border-white/10 cursor-pointer ${className}`}
        onClick={openModal}
      >
        {/* Cover Image */}
        <div className="aspect-video relative">
          <img
            src={coverImage}
            alt={work.title}
            className="w-full h-full object-cover"
          />
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Mobile Tap Indicator - Always visible on mobile, on hover on desktop */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 md:bg-transparent md:group-hover:bg-black/30 transition-all duration-300">
            <div className="bg-black/60 rounded-full p-4 transform transition-all duration-300 group-hover:scale-110 shadow-lg animate-pulse">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            {/* Mobile Tap Text */}
            <div className="absolute bottom-4 left-0 right-0 text-center md:hidden">
              <p className="text-white text-sm font-medium bg-black/60 inline-block px-3 py-1 rounded animate-pulse">
                TAP TO WATCH
              </p>
            </div>
          </div>
        </div>

        {/* Content Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent p-6 flex flex-col justify-end"
          onClick={(e) => e.stopPropagation()} // Prevent card click when clicking button
        >
          <h3 className="text-xl font-bold text-white mb-2">{work.title}</h3>
          {work.description && (
            <p className="text-white/80 text-sm line-clamp-2 mb-4">{work.description}</p>
          )}
          
          {/* Watch Video Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openModal}
            className="bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-semibold py-2 px-6 rounded-none transition-all duration-300 shadow-lg hover:shadow-[#D4AF37]/25 touch-target"
          >
            {work.type === 'video' ? 'VOIR LA VIDÉO' : 'VOIR LE PROJET'}
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Project Modal */}
      <ProjectModal
        work={work}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}
