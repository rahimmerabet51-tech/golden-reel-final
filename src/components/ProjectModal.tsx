import React from 'react';
import { X } from 'lucide-react';
import ReactPlayer from 'react-player';
import MasterPlayer from './MasterPlayer';
import type { Work } from '@/lib/supabase';

interface ProjectModalProps {
  work: Work | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ work, isOpen, onClose }) => {
  if (!isOpen || !work) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-50"
      >
        <X size={32} />
      </button>

      {/* Modal Content */}
      <div className="bg-zinc-900 rounded-2xl overflow-hidden max-w-5xl w-full border border-white/10 shadow-2xl relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[500px]">
          
          {/* Media Section (LEFT) */}
          <div className="lg:col-span-2 bg-black aspect-video relative overflow-hidden">
            {work.type === 'video' ? (
              <MasterPlayer url={work.url} />
            ) : (
              <img src={work.url} alt={work.title} className="w-full h-full object-contain" />
            )}
          </div>

          {/* Details Section (RIGHT) */}
          <div className="p-8 flex flex-col justify-center bg-zinc-900 border-l border-white/5">
            <span className="text-yellow-600 text-xs font-bold tracking-[0.2em] uppercase mb-4">
              {work.category || 'Featured Work'}
            </span>
            <h2 className="text-4xl font-black text-white mb-6 font-montserrat leading-tight">
              {work.title}
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8 text-sm">
              {work.description || "Une expérience visuelle unique signée R motion. Nous capturons l'essence de chaque moment avec une précision cinématographique."}
            </p>
            
            {/* Action Button */}
            <a 
              href="/contact" 
              className="mt-auto inline-flex items-center justify-center px-8 py-3 bg-white text-black font-bold text-sm tracking-wide hover:bg-yellow-500 transition-colors uppercase"
            >
              Commander ce style
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;