import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LANGUAGES } from '../constants';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute top-6 left-6 z-[800]">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="glass-panel w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
        whileTap={{ scale: 0.95 }}
      >
        <Globe size={20} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="absolute top-12 left-0 glass-panel rounded-2xl overflow-hidden min-w-[160px] p-2 flex flex-col gap-1 shadow-xl"
          >
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 rounded-xl text-sm transition-colors flex justify-between items-center ${
                  language === lang.code 
                    ? 'bg-[#FF9933] text-black font-semibold' 
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <span>{lang.nativeLabel}</span>
                {language === lang.code && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageToggle;