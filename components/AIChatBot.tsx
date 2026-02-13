import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Sparkles, User, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { chatWithArjun } from '../services/geminiService';
import { ChatMessage, Location } from '../types';

interface AIChatBotProps {
  isOpen: boolean;
  onToggle: () => void;
  userLocation: Location | null;
}

const AIChatBot: React.FC<AIChatBotProps> = ({ isOpen, onToggle, userLocation }) => {
  const { language, t } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: 'init',
        role: 'model',
        text: t('welcome_chat'),
        timestamp: Date.now()
      }]);
    }
  }, [language, t]); // Reset if language changes? Ideally translate existing, but simplified here.

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const context = userLocation ? `User is at Lat: ${userLocation.lat}, Lng: ${userLocation.lng}` : undefined;
    
    // Prepare history
    const history = messages.map(m => ({ role: m.role, text: m.text }));
    
    const responseText = await chatWithArjun(history, userMsg.text, language, context);

    const modelMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, modelMsg]);
    setIsTyping(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={onToggle}
          className="fixed bottom-6 right-6 z-[800] w-14 h-14 bg-[#FF9933] rounded-full shadow-2xl shadow-[#FF9933]/40 flex items-center justify-center text-black"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MessageSquare size={24} fill="currentColor" />
        </motion.button>
      )}

      {/* Chat Interface Bottom Sheet */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onToggle}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[900]" 
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-[950] h-[80vh] md:h-[600px] md:w-[450px] md:right-6 md:left-auto md:bottom-6 md:rounded-[32px] rounded-t-[32px] bg-[#121212] border border-white/10 shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 bg-[#1a1a1a] border-b border-white/5 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-[#FF9933] flex items-center justify-center">
                     <span className="font-bold text-black text-lg">A</span>
                   </div>
                   <div>
                     <h3 className="font-bold text-white">Arjun</h3>
                     <p className="text-xs text-green-400 flex items-center gap-1">
                       <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                       Online • Historian
                     </p>
                   </div>
                 </div>
                 <button onClick={onToggle} className="p-2 hover:bg-white/10 rounded-full text-white/70">
                   <X size={20} />
                 </button>
              </div>

              {/* Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <motion.div 
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user' 
                        ? 'bg-[#FF9933] text-black rounded-tr-sm' 
                        : 'bg-[#222] text-gray-200 border border-white/5 rounded-tl-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-[#222] p-4 rounded-2xl rounded-tl-sm border border-white/5 flex gap-1">
                       <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                       <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                       <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 bg-[#1a1a1a] border-t border-white/5">
                <div className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={t('chat_placeholder')}
                    className="w-full bg-[#0a0a0a] text-white border border-white/10 rounded-full py-4 pl-6 pr-14 focus:outline-none focus:border-[#FF9933]/50 focus:ring-1 focus:ring-[#FF9933]/50 transition-all placeholder:text-gray-600"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className="absolute right-2 top-2 w-10 h-10 bg-[#FF9933] rounded-full flex items-center justify-center text-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#ffaa55] transition-colors"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatBot;