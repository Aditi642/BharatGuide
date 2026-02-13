import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative w-full h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Top Overlay Gradient */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/80 to-transparent z-[10] pointer-events-none" />
      
      {/* Brand Header */}
      <div className="absolute top-6 left-0 w-full flex justify-center z-[10] pointer-events-none">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-panel px-6 py-2 rounded-full flex items-center gap-2 pointer-events-auto"
        >
          <Compass className="text-[#FF9933]" size={20} />
          <span className="font-bold tracking-wider text-sm">BHARAT<span className="text-[#FF9933]">GUIDE</span></span>
        </motion.div>
      </div>

      {children}
    </div>
  );
};

export default Layout;