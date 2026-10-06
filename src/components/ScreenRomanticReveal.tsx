import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { CheckCircle2, Heart } from 'lucide-react';
import { SURPRISE_CONFIG } from '../config/surpriseConfig';

interface ScreenRomanticRevealProps {
  onShowMe: () => void;
}

export const ScreenRomanticReveal: React.FC<ScreenRomanticRevealProps> = ({ onShowMe }) => {
  const { romanticReveal } = SURPRISE_CONFIG;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.35,
        delayChildren: 0.15,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.5 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] px-5 py-8 text-center"
    >
      {/* Background romantic glow */}
      <div className="absolute w-80 h-80 rounded-full bg-gradient-to-tr from-rose-500/15 to-purple-600/15 blur-[100px] -z-10 pointer-events-none" />

      <motion.div className="w-full max-w-lg mx-auto p-7 sm:p-10 rounded-3xl glass-card border border-rose-400/20 shadow-glow-rose relative">
        {/* ACCESS GRANTED badge */}
        <motion.div variants={itemVariants} className="mb-6 inline-flex">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold tracking-wider font-mono">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            {romanticReveal.badge}
          </span>
        </motion.div>

        {/* Narrative Lines */}
        <div className="space-y-4 mb-8">
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-rose-100/90 font-medium font-sans"
          >
            {romanticReveal.line1}
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-rose-200/75 font-normal"
          >
            {romanticReveal.line2}
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl font-serif italic text-romantic-gradient font-medium py-1"
          >
            {romanticReveal.line3}
          </motion.p>

          <motion.div variants={itemVariants} className="pt-2">
            <p className="text-base sm:text-lg text-rose-300 font-medium tracking-wide">
              {romanticReveal.prompt}
            </p>
          </motion.div>
        </div>

        {/* Action Button */}
        <motion.div variants={itemVariants}>
          <motion.button
            onClick={onShowMe}
            whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(244, 114, 182, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold text-base tracking-wider bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white shadow-lg shadow-rose-500/30 inline-flex items-center justify-center gap-2.5 transition-all duration-300 border border-rose-300/30"
          >
            <Heart className="w-5 h-5 fill-current text-white animate-bounce" />
            <span>{romanticReveal.buttonText}</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
