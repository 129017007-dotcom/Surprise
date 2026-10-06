import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Sparkles, ShieldAlert, Heart } from 'lucide-react';
import { SURPRISE_CONFIG } from '../config/surpriseConfig';

interface ScreenMysteryOpeningProps {
  onStart: () => void;
}

export const ScreenMysteryOpening: React.FC<ScreenMysteryOpeningProps> = ({ onStart }) => {
  const [isActivating, setIsActivating] = useState(false);
  const { mysteryOpening } = SURPRISE_CONFIG;

  const handleClick = () => {
    if (isActivating) return;
    setIsActivating(true);
    setTimeout(() => {
      onStart();
    }, 700);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] px-5 py-8 text-center"
    >
      {/* Ambient background glow ring */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-rose-500/10 blur-[90px] -z-10 pointer-events-none animate-pulse-glow" />

      {/* Main Mysterious Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
        className="w-full max-w-md mx-auto p-7 sm:p-9 rounded-3xl glass-card border border-rose-500/20 shadow-glow-rose relative overflow-hidden"
      >
        {/* Subtle decorative shimmer line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-rose-400/40 to-transparent" />
        
        {/* Top badge */}
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs font-medium tracking-widest uppercase mb-7"
        >
          <Lock className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
          <span>CONFIDENTIAL DOSSIER</span>
        </motion.div>

        {/* Cinematic Title & Dossier Details */}
        <div className="space-y-4 mb-9 text-left sm:text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-ping" />
            <h2 className="text-xs sm:text-sm tracking-[0.25em] uppercase text-rose-300/80 font-semibold font-mono">
              {mysteryOpening.mission}
            </h2>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-rose-500/10 space-y-2.5 backdrop-blur-sm">
            <div className="flex items-center justify-between text-xs sm:text-sm font-mono">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400/80" />
                ACCESS:
              </span>
              <span className="text-rose-400 font-semibold tracking-wider">
                {mysteryOpening.access.replace('ACCESS: ', '')}
              </span>
            </div>

            <div className="h-[1px] bg-white/5" />

            <div className="flex items-center justify-between text-xs sm:text-sm font-mono">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-pink-400" />
                TARGET:
              </span>
              <span className="text-pink-300 font-semibold">
                {mysteryOpening.target.replace('TARGET: ', '')}
              </span>
            </div>

            <div className="h-[1px] bg-white/5" />

            <div className="flex items-center justify-between text-xs sm:text-sm font-mono">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                STATUS:
              </span>
              <span className="text-emerald-400 font-medium animate-pulse">
                {mysteryOpening.status.replace('STATUS: ', '')}
              </span>
            </div>
          </div>
        </div>

        {/* Mysterious Exciting Button */}
        <motion.button
          onClick={handleClick}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          animate={isActivating ? { scale: [1, 1.08, 0.95], opacity: [1, 0.8, 1] } : {}}
          className={`group relative w-full py-4 px-6 rounded-2xl font-semibold text-sm sm:text-base tracking-wider overflow-hidden transition-all duration-300 shadow-lg ${
            isActivating
              ? 'bg-rose-500 text-white shadow-rose-500/60'
              : 'bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white hover:shadow-rose-500/40 shadow-rose-950/50'
          }`}
        >
          {/* Button shine reflection */}
          <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:translate-x-[250%] transition-transform duration-1000 ease-in-out" />

          <span className="relative z-10 flex items-center justify-center gap-2.5">
            <span className="text-lg">🔓</span>
            <span>{mysteryOpening.buttonText}</span>
          </span>
        </motion.button>
      </motion.div>

      {/* Subtle bottom detail */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.6 }}
        className="mt-6 text-xs text-rose-200/50 tracking-wider font-mono"
      >
        SECURE BIRTHDAY PROTOCOL // TAP TO PROCEED
      </motion.p>
    </motion.div>
  );
};
