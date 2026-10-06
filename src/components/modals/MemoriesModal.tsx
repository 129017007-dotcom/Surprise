import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ArrowLeft, Heart, BookOpen, ChevronRight } from 'lucide-react';
import { SURPRISE_CONFIG, type PersonalMemory } from '../../config/surpriseConfig';
import { fireHeartTap } from '../../utils/confetti';

interface MemoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MemoriesModal: React.FC<MemoriesModalProps> = ({ isOpen, onClose }) => {
  const { memoriesSection } = SURPRISE_CONFIG;
  const [selectedMemory, setSelectedMemory] = useState<PersonalMemory | null>(null);

  if (!isOpen) return null;

  const handleSelectMemory = (mem: PersonalMemory, e: React.MouseEvent) => {
    fireHeartTap(e.clientX, e.clientY);
    setSelectedMemory(mem);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
        <div className="fixed inset-0 -z-10" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl max-h-[92vh] my-auto rounded-3xl glass-modal border border-rose-400/30 p-5 sm:p-8 flex flex-col shadow-2xl overflow-hidden"
        >
          {/* Header Navigation */}
          <div className="flex items-center justify-between pb-3.5 border-b border-rose-400/20 mb-4 z-20">
            <div className="flex items-center gap-2">
              {selectedMemory ? (
                <button
                  onClick={() => setSelectedMemory(null)}
                  className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-rose-200 transition-colors flex items-center gap-1.5 text-xs sm:text-sm font-medium border border-white/10"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>All Memories</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-rose-500/20 text-rose-300">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-serif font-medium text-rose-100">
                      Personal Memories
                    </h3>
                    <p className="text-xs text-rose-300/70">
                      Little moments that stayed with me ❤️
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

          {/* Modal Content */}
          <div className="overflow-y-auto flex-1 pr-1">
            <AnimatePresence mode="wait">
              {!selectedMemory ? (
                /* Memories List & Emotional Intro */
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5 py-2"
                >
                  {/* Emotional Intro Box */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-rose-950/40 via-purple-950/40 to-black/50 border border-rose-400/20 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-rose-300/40 to-transparent" />
                    <Sparkles className="w-5 h-5 text-rose-300 mx-auto mb-2 animate-pulse" />
                    <h4 className="text-base sm:text-lg font-serif italic text-romantic-gradient font-medium mb-1.5">
                      «{memoriesSection.introHeading}»
                    </h4>
                    <p className="text-xs sm:text-sm text-rose-200/80 font-light max-w-md mx-auto">
                      «{memoriesSection.introSubheading}»
                    </p>
                  </div>

                  {/* Memory Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {memoriesSection.memories.map((mem) => {
                      const isPark = mem.theme === 'park';

                      return (
                        <motion.div
                          key={mem.id}
                          whileHover={{ scale: 1.02, y: -4 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={(e) => handleSelectMemory(mem, e)}
                          className={`group relative p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between min-h-[220px] overflow-hidden ${
                            isPark
                              ? 'bg-gradient-to-br from-emerald-950/40 via-purple-950/40 to-black/60 border-emerald-500/25 hover:border-emerald-400/50 shadow-glow-rose'
                              : 'bg-gradient-to-br from-amber-950/40 via-rose-950/40 to-black/60 border-amber-500/25 hover:border-amber-400/50 shadow-glow-gold'
                          }`}
                        >
                          {/* Ambient Visual Atmosphere Background */}
                          <div className="absolute inset-0 pointer-events-none opacity-30 group-hover:opacity-50 transition-opacity">
                            {isPark ? (
                              /* Park Night Illustration Graphic */
                              <svg className="w-full h-full" viewBox="0 0 200 120" preserveAspectRatio="none">
                                <circle cx="160" cy="30" r="14" fill="#fef08a" opacity="0.3" filter="blur(2px)" />
                                <path d="M 0 120 Q 50 85 100 105 T 200 95 L 200 120 Z" fill="#064e3b" opacity="0.4" />
                                <circle cx="60" cy="75" r="1.5" fill="#a7f3d0" />
                                <circle cx="85" cy="65" r="2" fill="#fbcfe8" />
                                <circle cx="130" cy="70" r="1.5" fill="#fef08a" />
                              </svg>
                            ) : (
                              /* Annual Day Stage Lighting Graphic */
                              <svg className="w-full h-full" viewBox="0 0 200 120" preserveAspectRatio="none">
                                <polygon points="30,0 70,120 0,120" fill="#f59e0b" opacity="0.15" />
                                <polygon points="170,0 200,120 130,120" fill="#ec4899" opacity="0.15" />
                                <circle cx="100" cy="70" r="2" fill="#fbbf24" />
                                <circle cx="115" cy="50" r="1.5" fill="#f472b6" />
                              </svg>
                            )}
                          </div>

                          {/* Top Badges */}
                          <div className="flex items-center justify-between z-10">
                            <span className="text-[11px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-white/10 text-rose-200/90 border border-white/10">
                              {mem.tag}
                            </span>
                            <span className="text-xl">{mem.icon}</span>
                          </div>

                          {/* Titles */}
                          <div className="my-3 z-10">
                            <span className="text-xs text-rose-300 font-mono block mb-1">
                              {mem.subtitle}
                            </span>
                            <h5 className="text-base sm:text-lg font-serif font-semibold text-rose-100 group-hover:text-pink-200 transition-colors leading-snug">
                              “{mem.title}”
                            </h5>
                          </div>

                          {/* Card Action footer */}
                          <div className="flex items-center justify-between text-xs text-rose-300/80 font-mono pt-3 border-t border-white/10 z-10">
                            <span>Open Memory</span>
                            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                /* Unfolded Memory Detail View */
                <motion.div
                  key="detail"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-5 py-2"
                >
                  {/* Visual Atmosphere Header Banner */}
                  <div
                    className={`relative p-6 sm:p-7 rounded-3xl border overflow-hidden ${
                      selectedMemory.theme === 'park'
                        ? 'bg-gradient-to-br from-emerald-950/70 via-purple-950/80 to-zinc-950 border-emerald-400/30'
                        : 'bg-gradient-to-br from-amber-950/70 via-rose-950/80 to-zinc-950 border-amber-400/30'
                    }`}
                  >
                    {/* Atmospheric Lighting Background */}
                    <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-30 pointer-events-none bg-rose-400" />
                    
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono uppercase tracking-widest text-rose-300/90 px-2.5 py-0.5 rounded-full bg-white/10">
                        {selectedMemory.tag}
                      </span>
                      <span className="text-xs font-mono text-rose-200">
                        • {selectedMemory.subtitle}
                      </span>
                    </div>

                    <h4 className="text-xl sm:text-2xl font-serif font-medium text-romantic-gradient mb-4">
                      “{selectedMemory.title}”
                    </h4>

                    {/* Intimate Story Content */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-sm">
                      <div className="space-y-4 text-sm sm:text-base text-rose-100/90 leading-relaxed font-light whitespace-pre-line font-serif italic">
                        {selectedMemory.content}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs text-rose-300/70 font-mono">
                      <span className="flex items-center gap-1.5">
                        <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
                        A cherished moment in time
                      </span>
                      <span>— Saivardhan</span>
                    </div>
                  </div>

                  {/* Navigation Switcher */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => setSelectedMemory(null)}
                      className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/15 text-rose-200 text-xs sm:text-sm font-medium transition-colors"
                    >
                      ← Back to Memories
                    </button>

                    {/* Switch to the other memory directly */}
                    {memoriesSection.memories
                      .filter((m) => m.id !== selectedMemory.id)
                      .map((otherMem) => (
                        <button
                          key={otherMem.id}
                          onClick={(e) => handleSelectMemory(otherMem, e)}
                          className="px-4 py-2 rounded-full bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs sm:text-sm font-medium border border-rose-400/30 flex items-center gap-1.5 transition-colors"
                        >
                          <span>Next: {otherMem.subtitle}</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      ))}
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
