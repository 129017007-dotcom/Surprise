import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, KeyRound } from 'lucide-react';
import { SURPRISE_CONFIG, type EasterEgg } from '../../config/surpriseConfig';
import { fireRomanticConfetti } from '../../utils/confetti';

interface SecretModalProps {
  isOpen: boolean;
  onClose: () => void;
  egg?: EasterEgg;
}

export const SecretModal: React.FC<SecretModalProps> = ({ isOpen, onClose, egg }) => {
  const [unfolded, setUnfolded] = useState(false);
  const activeEgg = egg || SURPRISE_CONFIG.easterEggs[0];

  if (!isOpen || !activeEgg) return null;

  const handleOpenEnvelope = () => {
    setUnfolded(true);
    fireRomanticConfetti();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
        <div className="fixed inset-0 -z-10" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg my-auto rounded-3xl glass-modal border border-amber-400/40 p-6 sm:p-8 flex flex-col items-center text-center shadow-2xl overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-rose-200 transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Secret badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-mono font-semibold uppercase tracking-wider mb-5">
            <KeyRound className="w-3.5 h-3.5 text-amber-300" />
            <span>CONFIDENTIAL EASTER EGG</span>
          </div>

          {!unfolded ? (
            /* Closed Secret Envelope */
            <div className="py-6 flex flex-col items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenEnvelope}
                className="w-48 h-32 rounded-2xl bg-gradient-to-tr from-amber-950/60 via-purple-950/60 to-zinc-900 border-2 border-amber-400/50 shadow-glow-gold flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group mb-5"
              >
                <Sparkles className="w-8 h-8 text-amber-300 animate-pulse mb-1" />
                <span className="text-[11px] font-mono text-amber-200/80 tracking-wider">
                  TAP TO UNSEAL
                </span>
              </motion.div>

              <h3 className="text-lg sm:text-xl font-serif text-amber-200 font-medium max-w-xs mb-3">
                {activeEgg.title}
              </h3>

              <p className="text-xs text-rose-200/60 mb-6 font-mono">
                DISCOVERED IN THE CORNER OF THE UNIVERSE
              </p>

              <button
                onClick={handleOpenEnvelope}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 text-zinc-950 font-semibold text-xs tracking-wider shadow-lg shadow-amber-400/20"
              >
                READ THE SECRET NOTE ✨
              </button>
            </div>
          ) : (
            /* Unfolded Secret Parchment */
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full text-left p-6 sm:p-7 rounded-2xl bg-black/60 border border-amber-400/30 relative"
            >
              <div className="flex items-center gap-2 pb-3 border-b border-amber-400/20 mb-4">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span className="text-xs font-mono text-amber-300 uppercase tracking-widest">
                  SECRET DISCOVERY
                </span>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-rose-100/95 leading-relaxed font-light whitespace-pre-line font-serif italic">
                {activeEgg.message}
              </div>

              <div className="mt-6 pt-3 border-t border-white/5 flex justify-end">
                <span className="text-xs text-rose-300/50 font-mono">
                  [SHH… KEEP THIS BETWEEN US ❤️]
                </span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
