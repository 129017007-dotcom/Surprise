import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Trophy, RotateCcw, Sparkles } from 'lucide-react';
import { SURPRISE_CONFIG } from '../../config/surpriseConfig';
import { fireRomanticConfetti, fireHeartTap } from '../../utils/confetti';

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FloatingHeart {
  id: number;
  x: number; // percentage
  y: number; // percentage
  size: number;
  color: string;
}

export const GameModal: React.FC<GameModalProps> = ({ isOpen, onClose }) => {
  const { game } = SURPRISE_CONFIG;
  const [score, setScore] = useState(0);
  const [activeHearts, setActiveHearts] = useState<FloatingHeart[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const heartIdCounter = useRef(0);

  const colors = ['#fb7185', '#f472b6', '#ec4899', '#fda4af', '#f43f5e'];

  const spawnHeart = () => {
    heartIdCounter.current += 1;
    const newHeart: FloatingHeart = {
      id: heartIdCounter.current,
      // Keep within 12% to 85% to ensure easy tapping on mobile
      x: Math.random() * 72 + 14,
      y: Math.random() * 65 + 18,
      size: Math.random() * 12 + 36,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
    setActiveHearts((prev) => [...prev.slice(-3), newHeart]);
  };

  // Reset or start game
  const resetGame = () => {
    setScore(0);
    setIsCompleted(false);
    setActiveHearts([]);
    setTimeout(spawnHeart, 300);
  };

  useEffect(() => {
    if (isOpen) {
      resetGame();
    }
  }, [isOpen]);

  // Handle heart tap
  const handleCatchHeart = (heartId: number, e: React.MouseEvent) => {
    if (isCompleted) return;

    fireHeartTap(e.clientX, e.clientY);

    // Remove tapped heart
    setActiveHearts((prev) => prev.filter((h) => h.id !== heartId));

    const nextScore = score + 1;
    setScore(nextScore);

    if (nextScore >= game.targetScore) {
      setIsCompleted(true);
      fireRomanticConfetti();
    } else {
      // Spawn next heart shortly
      setTimeout(spawnHeart, 250);
      if (Math.random() > 0.5 && activeHearts.length < 2) {
        setTimeout(spawnHeart, 500);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-hidden select-none">
        <div className="fixed inset-0 -z-10" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg h-[540px] sm:h-[580px] rounded-3xl glass-modal border border-rose-400/30 p-5 sm:p-7 flex flex-col shadow-2xl overflow-hidden"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-rose-400/20 z-20">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-rose-300">
                MINI ARCADE
              </span>
              <h3 className="text-lg font-serif font-medium text-rose-100 flex items-center gap-2">
                <span>{game.title}</span>
              </h3>
            </div>

            {/* Score Badge */}
            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-200 text-xs sm:text-sm font-semibold tracking-wider flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400 animate-pulse" />
                <span>
                  {score} / {game.targetScore}
                </span>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-rose-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Interactive Game Area */}
          <div
            ref={containerRef}
            className="relative flex-1 w-full my-2 rounded-2xl bg-black/40 border border-white/5 overflow-hidden"
          >
            {/* Background floating ambient grid / hint */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              <span className="text-xs font-mono tracking-widest uppercase text-rose-300">
                TAP THE FLOATING HEARTS
              </span>
            </div>

            {!isCompleted ? (
              /* Floating Hearts on Field */
              activeHearts.map((heart) => (
                <motion.button
                  key={heart.id}
                  onClick={(e) => handleCatchHeart(heart.id, e)}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0.9, 1.15, 1],
                    opacity: 1,
                    y: [0, -8, 0],
                  }}
                  exit={{ scale: 1.5, opacity: 0 }}
                  transition={{
                    y: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
                    scale: { duration: 0.3 },
                  }}
                  style={{
                    position: 'absolute',
                    left: `${heart.x}%`,
                    top: `${heart.y}%`,
                    transform: 'translate(-50%, -50%)',
                    width: `${heart.size}px`,
                    height: `${heart.size}px`,
                  }}
                  className="p-2 cursor-pointer flex items-center justify-center rounded-full transition-transform active:scale-90 touch-manipulation drop-shadow-[0_0_12px_rgba(251,113,133,0.7)]"
                >
                  <Heart
                    style={{ fill: heart.color, color: '#ffffff' }}
                    className="w-full h-full filter drop-shadow"
                  />
                </motion.button>
              ))
            ) : (
              /* Victory Card Screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center bg-black/70 backdrop-blur-md z-30"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-rose-400 flex items-center justify-center text-zinc-950 shadow-glow-gold mb-4"
                >
                  <Trophy className="w-9 h-9" />
                </motion.div>

                <h4 className="text-xl sm:text-2xl font-serif text-romantic-gradient font-medium mb-2">
                  {game.completionLine1}
                </h4>

                <p className="text-sm sm:text-base text-rose-200/90 font-sans italic mb-5">
                  {game.completionLine2}
                </p>

                {/* Surprise Achievement Certificate */}
                <div className="w-full max-w-xs p-4 rounded-xl bg-white/5 border border-amber-400/30 text-center mb-6">
                  <div className="flex items-center justify-center gap-1.5 text-amber-300 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{game.rewardTitle}</span>
                  </div>
                  <p className="text-xs text-rose-100/80 font-light">
                    {game.rewardDescription}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={resetGame}
                    className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-rose-200 text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Play Again</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs sm:text-sm font-medium shadow-md shadow-rose-500/30"
                  >
                    Keep Exploring ✨
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          <div className="pt-2 text-center">
            <p className="text-[11px] text-rose-300/60 font-mono">
              TARGET: CATCH 10 HEARTS // TOUCH-FRIENDLY
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
