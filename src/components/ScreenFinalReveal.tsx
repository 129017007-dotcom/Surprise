import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, RotateCcw } from 'lucide-react';
import { SURPRISE_CONFIG } from '../config/surpriseConfig';
import { fireRomanticConfetti } from '../utils/confetti';

interface ScreenFinalRevealProps {
  onRevisit: () => void;
}

export const ScreenFinalReveal: React.FC<ScreenFinalRevealProps> = ({ onRevisit }) => {
  const [stage, setStage] = useState<'suspense' | 'heading' | 'message' | 'punchline'>('suspense');
  const { HER_NAME, MY_NAME, PHOTO_PATH, finalReveal } = SURPRISE_CONFIG;

  useEffect(() => {
    // 1. Suspense duration (2.4s) -> Reveal Birthday Heading
    const t1 = setTimeout(() => {
      setStage('heading');
      fireRomanticConfetti();
    }, 2400);

    // 2. Short delay (+1.2s) -> Reveal Personal Letter
    const t2 = setTimeout(() => {
      setStage('message');
    }, 3600);

    // 3. Subtle delay (+1.8s) -> Reveal Final Emotional Punchline
    const t3 = setTimeout(() => {
      setStage('punchline');
    }, 5400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[92vh] px-5 py-8 text-center max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {stage === 'suspense' ? (
          /* Suspense Phase */
          <motion.div
            key="suspense"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center space-y-6"
          >
            {/* Soft pulsing loading aura */}
            <div className="relative flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-rose-500/20 blur-xl animate-pulse-glow" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 rounded-full border-2 border-t-pink-400 border-r-rose-400 border-b-transparent border-l-transparent"
              />
              <Heart className="absolute w-6 h-6 text-rose-300 fill-rose-300 animate-ping" />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg sm:text-2xl font-serif italic text-rose-200/90 tracking-wide"
            >
              “{finalReveal.suspenseText}”
            </motion.p>
          </motion.div>
        ) : (
          /* Grand Birthday Reveal Phase */
          <motion.div
            key="revealed"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full flex flex-col items-center"
          >
            {/* Top Celebratory Sparkles */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring' }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-200 text-xs sm:text-sm font-mono tracking-widest uppercase mb-4"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>A SPECIAL DAY FOR A SPECIAL PERSON</span>
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            </motion.div>

            {/* Giant Birthday Typography */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-4 space-y-1"
            >
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight text-white glow-text-rose leading-tight">
                {finalReveal.bannerGreeting},
              </h1>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-extrabold text-romantic-gradient py-1">
                {HER_NAME} ❤️
              </h2>
            </motion.div>

            {/* Elegant Birthday Photo Frame */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative my-4 sm:my-5 group w-full max-w-[280px] sm:max-w-[320px] mx-auto"
            >
              {/* Soft romantic glowing aura behind photo */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-rose-500/30 via-pink-500/30 to-purple-600/30 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-700 animate-pulse-glow pointer-events-none" />

              {/* Glass frame */}
              <div className="relative p-2 rounded-3xl glass-card border border-rose-400/40 shadow-glow-rose overflow-hidden">
                <div className="relative overflow-hidden rounded-2xl bg-black/50 aspect-[3/4]">
                  <img
                    src={PHOTO_PATH}
                    alt={`${HER_NAME}`}
                    className="w-full h-full object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                  />
                  {/* Subtle romantic bottom vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Small heart badge on photo corner */}
                  <div className="absolute bottom-2.5 right-2.5 p-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-rose-300">
                    <Heart className="w-3.5 h-3.5 fill-current text-rose-400 animate-pulse" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Final Personal Message Card (Revealed after short delay) */}
            {(stage === 'message' || stage === 'punchline') && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="w-full p-6 sm:p-9 rounded-3xl glass-card border border-rose-400/30 shadow-glow-rose mb-6 text-left relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                  <Heart className="w-24 h-24 text-rose-400 fill-rose-400" />
                </div>

                <div className="space-y-4 text-sm sm:text-base text-rose-100/90 leading-relaxed font-light whitespace-pre-line font-sans">
                  {finalReveal.personalMessage}
                </div>

                <div className="pt-6 text-right">
                  <p className="font-serif italic text-lg sm:text-xl text-romantic-gradient font-semibold">
                    — {MY_NAME}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Final Emotional Punchline Card (Revealed after another subtle delay) */}
            {stage === 'punchline' && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="w-full p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-rose-950/60 via-purple-950/60 to-black/60 border border-rose-400/40 shadow-glow-rose mb-8 text-center relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
                <motion.p
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-base sm:text-lg font-serif italic text-pink-200 font-medium tracking-wide"
                >
                  {finalReveal.finalPunchline}
                </motion.p>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-3.5"
            >
              <button
                onClick={() => fireRomanticConfetti()}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium text-xs sm:text-sm tracking-wider shadow-lg shadow-rose-500/30 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
              >
                <Heart className="w-4 h-4 fill-current" />
                <span>Shower with Love 💖</span>
              </button>

              <button
                onClick={onRevisit}
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-rose-200 font-medium text-xs sm:text-sm tracking-wider flex items-center gap-2 border border-white/10 hover:scale-105 active:scale-95 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Revisit Surprises ✨</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
