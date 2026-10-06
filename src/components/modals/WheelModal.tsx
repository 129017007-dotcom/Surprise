import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, RefreshCw } from 'lucide-react';
import { SURPRISE_CONFIG, type WheelSlice } from '../../config/surpriseConfig';
import { fireRomanticConfetti } from '../../utils/confetti';

interface WheelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenMusic?: () => void;
  onOpenLetter?: () => void;
}

export const WheelModal: React.FC<WheelModalProps> = ({
  isOpen,
  onClose,
  onOpenMusic,
  onOpenLetter,
}) => {
  const { wheel } = SURPRISE_CONFIG;
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<WheelSlice | null>(null);
  const [history, setHistory] = useState<number[]>([]);
  const slices = wheel.slices;
  const sliceAngle = 360 / slices.length;
  const spinCountRef = useRef(0);

  if (!isOpen) return null;

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setResult(null);

    // Anti-repetitive selection: choose a slice not in recent history
    const recent = history.slice(-2);
    const available = slices.filter((s) => !recent.includes(s.id));
    const chosenSlice = available[Math.floor(Math.random() * available.length)] || slices[0];
    const chosenIndex = slices.findIndex((s) => s.id === chosenSlice.id);

    // Calculate rotation: Pointer is at TOP (270 deg or 90 deg relative)
    // Slice index i starts at i * sliceAngle to (i+1) * sliceAngle
    // To land slice center at 270 deg pointer:
    const sliceCenterAngle = chosenIndex * sliceAngle + sliceAngle / 2;
    const targetOffset = 270 - sliceCenterAngle;

    spinCountRef.current += 1;
    const extraSpins = 360 * (5 + Math.floor(Math.random() * 2));
    const newRotation = rotation + extraSpins + (targetOffset - (rotation % 360) + 360) % 360;

    setRotation(newRotation);

    // Spin duration 4.5 seconds
    setTimeout(() => {
      setIsSpinning(false);
      setResult(chosenSlice);
      setHistory((prev) => [...prev, chosenSlice.id]);
      fireRomanticConfetti();
    }, 4500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
        <div className="fixed inset-0 -z-10" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg max-h-[92vh] my-auto rounded-3xl glass-modal border border-rose-400/30 p-6 sm:p-8 flex flex-col items-center text-center shadow-2xl overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-rose-200 transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title */}
          <div className="mb-4">
            <span className="text-xs uppercase tracking-widest text-rose-300 font-mono">
              ROMANTIC FORTUNE
            </span>
            <h3 className="text-xl sm:text-2xl font-serif text-romantic-gradient font-medium mt-1">
              ✨ {wheel.title}
            </h3>
          </div>

          {/* Wheel Container */}
          <div className="relative my-4 flex items-center justify-center">
            {/* Top Pointer Indicator */}
            <div className="absolute -top-3 z-20 flex flex-col items-center pointer-events-none drop-shadow-lg">
              <div className="w-5 h-6 bg-amber-400 clip-triangle shadow-md transform rotate-180" 
                   style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
              <div className="w-3 h-3 rounded-full bg-white shadow-glow-gold -mt-1" />
            </div>

            {/* Glowing wheel border */}
            <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full p-2 bg-gradient-to-tr from-rose-500/30 via-purple-500/30 to-amber-400/30 shadow-glow-rose flex items-center justify-center">
              {/* Rotating SVG Wheel */}
              <div
                className="w-full h-full rounded-full overflow-hidden shadow-inner relative"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: isSpinning
                    ? 'transform 4.5s cubic-bezier(0.12, 0.8, 0.15, 1)'
                    : 'none',
                }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full transform">
                  {slices.map((slice, index) => {
                    const startAngle = (index * sliceAngle * Math.PI) / 180;
                    const endAngle = (((index + 1) * sliceAngle) * Math.PI) / 180;
                    const x1 = 50 + 50 * Math.cos(startAngle);
                    const y1 = 50 + 50 * Math.sin(startAngle);
                    const x2 = 50 + 50 * Math.cos(endAngle);
                    const y2 = 50 + 50 * Math.sin(endAngle);
                    const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;

                    // Mid angle for text label
                    const midAngle = ((index + 0.5) * sliceAngle * Math.PI) / 180;
                    const textX = 50 + 32 * Math.cos(midAngle);
                    const textY = 50 + 32 * Math.sin(midAngle);
                    const textRotation = (index + 0.5) * sliceAngle + 90;

                    return (
                      <g key={slice.id}>
                        <path
                          d={pathData}
                          fill={slice.color}
                          opacity={0.85}
                          stroke="#1a1435"
                          strokeWidth="1.2"
                        />
                        <text
                          x={textX}
                          y={textY}
                          fill="#ffffff"
                          fontSize="5"
                          fontWeight="bold"
                          textAnchor="middle"
                          dominantBaseline="central"
                          transform={`rotate(${textRotation}, ${textX}, ${textY})`}
                        >
                          {slice.emoji}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Center Hub */}
                <div className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-zinc-950/90 border-2 border-rose-300 shadow-md flex items-center justify-center z-10">
                  <Sparkles className="w-5 h-5 text-rose-300 animate-spin-slow" />
                </div>
              </div>
            </div>
          </div>

          {/* Result Card or Spin Button */}
          <div className="w-full mt-3">
            <AnimatePresence mode="wait">
              {result && !isSpinning ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-5 rounded-2xl bg-black/50 border border-rose-400/30 text-left"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{result.emoji}</span>
                    <h4 className="font-serif text-lg font-semibold text-rose-100">
                      {result.resultTitle}
                    </h4>
                  </div>
                  <p className="text-sm text-rose-200/90 leading-relaxed font-light mb-4">
                    {result.resultMessage}
                  </p>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/10">
                    <button
                      onClick={handleSpin}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-rose-200 flex items-center gap-1.5 transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Spin Again</span>
                    </button>

                    {result.id === 3 && onOpenMusic && (
                      <button
                        onClick={onOpenMusic}
                        className="px-4 py-2 rounded-xl bg-purple-500/30 hover:bg-purple-500/40 text-xs text-purple-200 font-medium transition-colors"
                      >
                        Listen Now 🎵
                      </button>
                    )}

                    {result.id === 4 && onOpenLetter && (
                      <button
                        onClick={onOpenLetter}
                        className="px-4 py-2 rounded-xl bg-rose-500/30 hover:bg-rose-500/40 text-xs text-rose-200 font-medium transition-colors"
                      >
                        Read Letter 💌
                      </button>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.button
                  key="spin-btn"
                  onClick={handleSpin}
                  disabled={isSpinning}
                  whileHover={{ scale: isSpinning ? 1 : 1.04 }}
                  whileTap={{ scale: isSpinning ? 1 : 0.96 }}
                  className={`w-full py-3.5 px-6 rounded-2xl font-semibold text-sm sm:text-base tracking-wider transition-all shadow-lg ${
                    isSpinning
                      ? 'bg-rose-950/40 text-rose-400 cursor-not-allowed border border-rose-500/20'
                      : 'bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white shadow-rose-500/30 border border-rose-300/30'
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    <span>{isSpinning ? 'SPINNING SURPRISE…' : 'SPIN THE WHEEL 🎡'}</span>
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
