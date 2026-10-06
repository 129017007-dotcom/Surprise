import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Compass, Stars } from 'lucide-react';
import { SURPRISE_CONFIG } from '../config/surpriseConfig';
import { LetterModal } from './modals/LetterModal';
import { GiftsModal } from './modals/GiftsModal';
import { WheelModal } from './modals/WheelModal';
import { GameModal } from './modals/GameModal';
import { MusicModal } from './modals/MusicModal';
import { SecretModal } from './modals/SecretModal';
import { MemoriesModal } from './modals/MemoriesModal';
import { fireHeartTap } from '../utils/confetti';

interface ScreenSurpriseWorldProps {
  onProceedToFinal: () => void;
}

export const ScreenSurpriseWorld: React.FC<ScreenSurpriseWorldProps> = ({ onProceedToFinal }) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [visitedItems, setVisitedItems] = useState<Set<string>>(new Set());
  const [foundEasterEgg, setFoundEasterEgg] = useState(false);

  const { surpriseWorld } = SURPRISE_CONFIG;

  const handleOpenItem = (id: string, e?: React.MouseEvent) => {
    if (e) fireHeartTap(e.clientX, e.clientY);
    setVisitedItems((prev) => new Set(prev).add(id));
    setActiveModal(id);
  };

  const handleEasterEggClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    fireHeartTap(e.clientX, e.clientY);
    setFoundEasterEgg(true);
    setActiveModal('secret');
  };

  // Staggered floating configurations for objects
  const floatAnimations = [
    { y: [0, -8, 0], duration: 4.2 },
    { y: [0, 8, 0], duration: 5.1 },
    { y: [0, -10, 0], duration: 4.8 },
    { y: [0, 7, 0], duration: 5.4 },
    { y: [0, -9, 0], duration: 4.5 },
    { y: [0, 6, 0], duration: 5.0 },
  ];

  return (
    <div className="relative z-10 w-full min-h-[92vh] flex flex-col justify-between px-4 sm:px-6 py-6 max-w-4xl mx-auto">
      {/* ============================================================== */}
      {/* HIDDEN SECRET EASTER EGG SPARKLE IN THE CORNER OF THE UNIVERSE */}
      {/* ============================================================== */}
      <motion.button
        onClick={handleEasterEggClick}
        animate={{
          scale: [1, 1.35, 1],
          opacity: [0.35, 0.9, 0.35],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="fixed top-5 right-5 sm:top-8 sm:right-10 z-30 p-2.5 text-amber-300 hover:text-amber-200 cursor-pointer drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]"
        title="✨"
        aria-label="A tiny mysterious sparkle"
      >
        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
      </motion.button>

      {/* Top Header Atmosphere */}
      <div className="text-center pt-2 pb-5">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-mono tracking-widest uppercase mb-3"
        >
          <Compass className="w-3.5 h-3.5 animate-spin-slow" />
          <span>SURPRISE GALAXY // FREE EXPLORATION</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-2xl sm:text-3xl md:text-4xl font-serif text-romantic-gradient font-medium"
        >
          Your Personal Digital World
        </motion.h2>

        {/* Exploration Counter & Easter Egg status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-2 mt-2 text-xs font-mono text-rose-300/70"
        >
          <span className="flex items-center gap-1">
            <Stars className="w-3.5 h-3.5 text-pink-400" />
            {visitedItems.size} of {surpriseWorld.items.length} discovered
          </span>
          {foundEasterEgg && (
            <span className="text-amber-300 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Secret Star Found!
            </span>
          )}
        </motion.div>
      </div>

      {/* Interactive Surprise Grid / Constellation */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-5 my-auto py-4">
        {surpriseWorld.items.map((item, index) => {
          const isVisited = visitedItems.has(item.id);
          const float = floatAnimations[index % floatAnimations.length];

          return (
            <motion.div
              key={item.id}
              animate={{ y: float.y }}
              transition={{
                duration: float.duration,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.94 }}
                onClick={(e) => handleOpenItem(item.id, e)}
                className="group relative w-full h-36 sm:h-44 p-4 rounded-3xl glass-card border border-rose-400/20 hover:border-rose-400/60 shadow-glass flex flex-col items-center justify-center text-center transition-all overflow-hidden"
              >
                {/* Background glow gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-30 group-hover:opacity-60 transition-opacity`}
                />

                {/* Visited Check Dot */}
                {isVisited && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-[10px] text-emerald-300 font-mono">
                    <span>✓</span>
                  </div>
                )}

                {/* Floating 3D emoji icon */}
                <span className="text-3xl sm:text-4xl mb-2 sm:mb-3 filter drop-shadow-md group-hover:scale-115 transition-transform duration-300">
                  {item.icon}
                </span>

                {/* Card Title */}
                <h3 className="font-serif text-sm sm:text-base font-semibold text-rose-100 group-hover:text-pink-200 transition-colors z-10 leading-snug">
                  {item.label}
                </h3>

                <span className="text-[10px] sm:text-xs text-rose-300/60 font-mono mt-1 z-10">
                  {isVisited ? 'Revisit' : 'Tap to open'}
                </span>
              </motion.button>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Section: Hint & Final Birthday Button */}
      <div className="pt-4 pb-2 text-center space-y-4">
        {/* Floating Hint */}
        <p className="text-xs sm:text-sm text-rose-200/70 font-light italic">
          “{surpriseWorld.bottomHint}”
        </p>

        {/* Trigger to Final Birthday Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="pt-2"
        >
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 0 35px rgba(244, 114, 182, 0.6)' }}
            whileTap={{ scale: 0.95 }}
            onClick={onProceedToFinal}
            className="group relative px-7 py-3.5 sm:px-9 sm:py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-semibold text-sm sm:text-base tracking-wider shadow-lg shadow-rose-500/30 border border-rose-300/40 inline-flex items-center gap-2.5 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Heart className="w-4 h-4 fill-current text-white animate-pulse" />
            <span>THE FINAL SURPRISE 🌟</span>
            <Sparkles className="w-4 h-4 text-amber-200" />
          </motion.button>
        </motion.div>
      </div>

      {/* Modals */}
      <LetterModal
        isOpen={activeModal === 'letter'}
        onClose={() => setActiveModal(null)}
      />

      <GiftsModal
        isOpen={activeModal === 'gifts'}
        onClose={() => setActiveModal(null)}
      />

      <WheelModal
        isOpen={activeModal === 'wheel'}
        onClose={() => setActiveModal(null)}
        onOpenMusic={() => setActiveModal('music')}
        onOpenLetter={() => setActiveModal('letter')}
      />

      <GameModal
        isOpen={activeModal === 'game'}
        onClose={() => setActiveModal(null)}
      />

      <MusicModal
        isOpen={activeModal === 'music'}
        onClose={() => setActiveModal(null)}
      />

      <MemoriesModal
        isOpen={activeModal === 'memories'}
        onClose={() => setActiveModal(null)}
      />

      <SecretModal
        isOpen={activeModal === 'secret'}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
};
