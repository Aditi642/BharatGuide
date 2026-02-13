import React from 'react';
import { motion } from 'framer-motion';
import { Place } from '../types';
import { Star, MapPin } from 'lucide-react';

interface DiscoveryFeedProps {
  places: Place[];
  onPlaceSelect: (place: Place) => void;
  isLoading: boolean;
  title: string;
}

const DiscoveryFeed: React.FC<DiscoveryFeedProps> = ({ places, onPlaceSelect, isLoading, title }) => {
  if (places.length === 0 && !isLoading) return null;

  return (
    <div className="absolute bottom-24 left-0 w-full z-[500] pl-6 pointer-events-none">
      <div className="mb-4 pointer-events-auto">
        <h2 className="text-[#FF9933] text-sm font-bold uppercase tracking-wider mb-2 drop-shadow-md">
          {isLoading ? 'Scanning Region...' : title}
        </h2>
        
        <div className="flex overflow-x-auto gap-4 pb-8 pr-6 snap-x snap-mandatory scrollbar-hide">
          {isLoading ? (
             // Skeleton Loaders
             Array.from({ length: 3 }).map((_, i) => (
               <div key={i} className="min-w-[280px] h-[360px] rounded-[32px] bg-neutral-900/80 backdrop-blur-md border border-white/10 animate-pulse" />
             ))
          ) : (
            places.map((place) => (
              <motion.div
                key={place.id}
                layoutId={`card-container-${place.id}`}
                onClick={() => onPlaceSelect(place)}
                className="min-w-[280px] max-w-[280px] h-[360px] relative rounded-[32px] overflow-hidden cursor-pointer snap-center glass-panel shadow-2xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Image */}
                <motion.img
                  layoutId={`image-${place.id}`}
                  src={place.imageUrl}
                  alt={place.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <motion.div 
                    layoutId={`category-${place.id}`}
                    className="inline-block px-3 py-1 mb-2 rounded-full bg-[#FF9933]/20 backdrop-blur-md border border-[#FF9933]/30"
                  >
                    <span className="text-[#FF9933] text-xs font-bold uppercase tracking-wide">
                      {place.category}
                    </span>
                  </motion.div>
                  
                  <motion.h3 
                    layoutId={`title-${place.id}`}
                    className="text-white text-xl font-bold mb-1 leading-tight"
                  >
                    {place.name}
                  </motion.h3>
                  
                  <motion.div 
                    layoutId={`meta-${place.id}`}
                    className="flex items-center text-gray-300 text-sm gap-4"
                  >
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-[#FF9933] fill-[#FF9933]" />
                      <span>{place.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 opacity-75">
                      <MapPin className="w-3 h-3" />
                      <span>Nearby</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscoveryFeed;