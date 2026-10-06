import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift as GiftIcon, Sparkles, ArrowLeft, CheckCircle } from 'lucide-react';
import { SURPRISE_CONFIG, type GiftItem } from '../../config/surpriseConfig';
import { fireHeartTap } from '../../utils/confetti';

interface GiftsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GiftsModal: React.FC<GiftsModalProps> = ({ isOpen, onClose }) => {
  const { gifts } = SURPRISE_CONFIG;
  const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null);
  const [openedGifts, setOpenedGifts] = useState<Set<number>>(new Set());

  if (!isOpen) return null;

  const handleOpenGift = (gift: GiftItem, e: React.MouseEvent) => {
    fireHeartTap(e.clientX, e.clientY);
    setOpenedGifts((prev) => new Set(prev).add(gift.id));
    setSelectedGift(gift);
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
          className="relative w-full max-w-2xl max-h-[90vh] my-auto rounded-3xl glass-modal border border-rose-400/30 p-6 sm:p-8 flex flex-col shadow-2xl overflow-hidden"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-rose-400/20 mb-6">
            <div className="flex items-center gap-2.5">
              {selectedGift ? (
                <button
                  onClick={() => setSelectedGift(null)}
                  className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-rose-300 transition-colors flex items-center gap-1 text-xs sm:text-sm font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>All Gifts</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-rose-500/20 text-rose-300">
                    <GiftIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-serif font-medium text-rose-100">
                      A Little Gift Box
                    </h3>
                    <p className="text-xs text-rose-300/70">
                      {openedGifts.size} of {gifts.length} unwrapped
                    </p>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-rose-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="overflow-y-auto flex-1 pr-1">
            <AnimatePresence mode="wait">
              {!selectedGift ? (
                /* Grid of 5 Gift Boxes */
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-2"
                >
                  {gifts.map((g) => {
                    const isOpened = openedGifts.has(g.id);
                    return (
                      <motion.div
                        key={g.id}
                        whileHover={{ scale: 1.03, y: -4 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={(e) => handleOpenGift(g, e)}
                        className="group relative p-5 rounded-2xl glass-card cursor-pointer border border-rose-500/20 hover:border-rose-400/50 transition-all flex flex-col items-center text-center justify-between min-h-[170px]"
                      >
                        {/* Status Check if already opened */}
                        {isOpened && (
                          <div className="absolute top-3 right-3 text-emerald-400">
                            <CheckCircle className="w-4 h-4" />
                          </div>
                        )}

                        {/* Gift Box Icon with Ribbon */}
                        <div className="relative my-2">
                          <motion.div
                            animate={{
                              rotate: isOpened ? 0 : [0, -3, 3, -3, 0],
                            }}
                            transition={{
                              duration: 4,
                              repeat: isOpened ? 0 : Infinity,
                              ease: 'easeInOut',
                            }}
                            className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-lg border border-white/10"
                            style={{
                              background: `radial-gradient(circle, ${g.accentColor}33, #130f29)`,
                            }}
                          >
                            <span>{g.icon}</span>
                          </motion.div>
                          {!isOpened && (
                            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                            </span>
                          )}
                        </div>

                        <div>
                          <span className="text-[11px] font-mono tracking-wider uppercase text-rose-300/70">
                            {g.tag}
                          </span>
                          <h4 className="text-sm font-semibold text-rose-100 group-hover:text-pink-300 transition-colors">
                            {g.title}
                          </h4>
                        </div>

                        <span className="text-xs text-rose-300/60 mt-2">
                          {isOpened ? 'Read again →' : 'Tap to unwrap ✨'}
                        </span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              ) : (
                /* Unwrapped Gift Single View */
                <motion.div
                  key="detail"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center text-left py-2"
                >
                  <div className="w-full p-6 sm:p-7 rounded-2xl bg-black/40 border border-rose-500/20 shadow-inner">
                    <div className="flex items-center gap-3 pb-4 border-b border-rose-400/20 mb-5">
                      <span className="text-3xl p-2 rounded-xl bg-rose-500/10">
                        {selectedGift.icon}
                      </span>
                      <div>
                        <span className="text-xs font-mono uppercase tracking-wider text-rose-400">
                          {selectedGift.tag}
                        </span>
                        <h4 className="text-xl font-serif font-medium text-rose-100">
                          {selectedGift.title}
                        </h4>
                      </div>
                    </div>

                    {/* Pre-formatted message paragraphs */}
                    <div className="space-y-3.5 text-sm sm:text-base text-rose-100/90 leading-relaxed whitespace-pre-line font-light">
                      {selectedGift.message}
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => setSelectedGift(null)}
                      className="px-6 py-2.5 rounded-full bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-sm font-medium border border-rose-400/30 flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-rose-300" />
                      <span>Back to other gifts</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
