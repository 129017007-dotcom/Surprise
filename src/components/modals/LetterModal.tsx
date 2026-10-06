import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Sparkles } from 'lucide-react';
import { SURPRISE_CONFIG } from '../../config/surpriseConfig';

interface LetterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LetterModal: React.FC<LetterModalProps> = ({ isOpen, onClose }) => {
  const [isOpened, setIsOpened] = useState(false);
  const { letter, MY_NAME } = SURPRISE_CONFIG;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto">
        {/* Backdrop click */}
        <div className="fixed inset-0 -z-10" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl max-h-[90vh] my-auto rounded-3xl glass-modal border border-rose-400/30 p-6 sm:p-8 flex flex-col shadow-2xl overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-rose-200 transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {!isOpened ? (
            /* Envelope Sealed View */
            <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="relative mb-6 cursor-pointer"
                onClick={() => setIsOpened(true)}
              >
                {/* Envelope Graphic */}
                <div className="w-56 h-40 rounded-2xl bg-gradient-to-br from-rose-950/80 via-purple-950/80 to-zinc-900 border-2 border-rose-400/40 shadow-glow-rose flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  
                  {/* Flap lines */}
                  <div className="absolute top-0 left-0 right-0 h-20 border-b border-rose-400/30 transform -skew-y-6 opacity-60" />
                  
                  {/* Wax Seal Button */}
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-red-600 shadow-lg border-2 border-rose-200/50 flex flex-col items-center justify-center z-10"
                  >
                    <Heart className="w-7 h-7 text-white fill-white animate-pulse" />
                  </motion.div>
                </div>
              </motion.div>

              <h3 className="text-xl sm:text-2xl font-serif text-romantic-gradient font-medium mb-2">
                A Letter Just For You
              </h3>
              <p className="text-sm text-rose-200/70 mb-6">
                Tap the wax seal to break the seal and read it...
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpened(true)}
                className="px-6 py-2.5 rounded-full bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/40 text-rose-200 text-sm font-medium tracking-wide flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-rose-300" />
                <span>Open Letter</span>
              </motion.button>
            </div>
          ) : (
            /* Unfolded Letter View */
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col flex-1 overflow-y-auto pr-1"
            >
              {/* Letter Header */}
              <div className="pb-4 border-b border-rose-400/20 mb-5 text-center">
                <span className="text-xs uppercase tracking-widest text-rose-400 font-mono">
                  CONFIDENTIAL & PERSONAL
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-romantic-gradient font-medium mt-2 leading-relaxed">
                  {letter.heading}
                </h3>
              </div>

              {/* Letter Content */}
              <div className="space-y-4 text-sm sm:text-base text-rose-100/90 leading-relaxed font-sans font-light">
                {letter.paragraphs.map((p, idx) => {
                  const isSpecial = p.includes('Happy Birthday!') || p.includes('worth making');
                  return (
                    <p
                      key={idx}
                      className={
                        isSpecial
                          ? 'font-serif text-base sm:text-lg text-pink-200 font-medium italic my-2'
                          : ''
                      }
                    >
                      {p}
                    </p>
                  );
                })}

                {/* Sign-off with [Your Name] */}
                <div className="pt-6 pb-2 text-right">
                  <p className="font-serif italic text-lg sm:text-xl text-romantic-gradient font-semibold">
                    — {MY_NAME}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
