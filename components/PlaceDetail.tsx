import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Place } from '../types';
import { X, MapPin, Star, Share2, Navigation } from 'lucide-react';

interface PlaceDetailProps {
  place: Place | null;
  onClose: () => void;
}

const PlaceDetail: React.FC<PlaceDetailProps> = ({ place, onClose }) => {
  if (!place) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          layoutId={`card-container-${place.id}`}
          className="w-full sm:max-w-md h-[90vh] sm:h-auto bg-[#0a0a0a] sm:rounded-[32px] rounded-t-[32px] overflow-hidden relative shadow-2xl border border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Image Area */}
          <div className="relative h-[40vh] sm:h-[300px] w-full">
            <motion.img
              layoutId={`image-${place.id}`}
              src={place.imageUrl}
              alt={place.name}
              className="w-full h-full object-cover"
            />
            
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-black/50 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#0a0a0a] to-transparent h-32" />
          </div>

          {/* Content Body */}
          <div className="p-8 -mt-10 relative">
             <div className="flex justify-between items-start mb-4">
                <div>
                   <motion.div layoutId={`category-${place.id}`} className="mb-2">
                     <span className="text-[#FF9933] text-xs font-bold uppercase tracking-widest">
                       {place.category}
                     </span>
                   </motion.div>
                   <motion.h2 layoutId={`title-${place.id}`} className="text-3xl font-bold text-white mb-2">
                     {place.name}
                   </motion.h2>
                </div>
                <div className="flex flex-col items-end gap-1">
                   <div className="flex items-center gap-1 bg-[#FF9933]/10 px-3 py-1 rounded-full border border-[#FF9933]/20">
                     <Star className="w-4 h-4 text-[#FF9933] fill-[#FF9933]" />
                     <span className="text-[#FF9933] font-bold">{place.rating}</span>
                   </div>
                </div>
             </div>

             <motion.div layoutId={`meta-${place.id}`} className="flex flex-wrap gap-2 mb-6">
                {place.tags.map((tag, i) => (
                  <span key={i} className="text-xs font-medium text-gray-400 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                    #{tag}
                  </span>
                ))}
             </motion.div>

             <p className="text-gray-300 leading-relaxed text-sm mb-8">
               {place.description}
             </p>

             {/* Action Buttons */}
             <div className="grid grid-cols-2 gap-4">
               <button className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#222] text-white font-medium hover:bg-[#333] transition-colors border border-white/5">
                 <Share2 size={18} />
                 Share
               </button>
               <button className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#FF9933] text-black font-bold hover:bg-[#ffaa55] transition-colors shadow-lg shadow-[#FF9933]/20">
                 <Navigation size={18} />
                 Navigate
               </button>
             </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PlaceDetail;