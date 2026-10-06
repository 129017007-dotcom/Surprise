import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Disc3, Info, Music2 } from 'lucide-react';
import { SURPRISE_CONFIG } from '../../config/surpriseConfig';
import { romanticAudio, type AudioState } from '../../utils/audioEngine';

interface MusicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MusicModal: React.FC<MusicModalProps> = ({ isOpen, onClose }) => {
  const [audioState, setAudioState] = useState<AudioState>(romanticAudio.state);
  const { SONG_HEADING, SONG_TITLE, SONG_SUBTITLE, AUDIO_MISSING_NOTE, AUDIO_INSTRUCTION } = SURPRISE_CONFIG;

  useEffect(() => {
    const unsub = romanticAudio.subscribe((state) => {
      setAudioState(state);
    });
    return unsub;
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleTogglePlay = async () => {
    await romanticAudio.toggle();
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const percent = parseFloat(e.target.value);
    romanticAudio.seek(percent);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
        <div className="fixed inset-0 -z-10" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-md my-auto rounded-3xl glass-modal border border-purple-400/30 p-6 sm:p-8 flex flex-col items-center text-center shadow-2xl overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-rose-200 transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Section Heading */}
          <div className="mb-4">
            <span className="text-[11px] uppercase tracking-widest text-purple-300 font-mono">
              SPECIAL SOUNDTRACK
            </span>
            <h3 className="text-lg sm:text-xl font-serif text-romantic-gradient font-medium mt-1">
              «{SONG_HEADING}»
            </h3>
          </div>

          {/* Album Vinyl Record & Romantic Cover Visual */}
          <div className="relative my-3 flex items-center justify-center">
            {/* Ambient Vinyl Glow */}
            <div
              className={`absolute w-56 h-56 rounded-full blur-2xl transition-opacity duration-700 ${
                audioState.isPlaying ? 'bg-purple-500/30 opacity-100' : 'opacity-0'
              }`}
            />

            {/* Rotating Vinyl Record */}
            <motion.div
              animate={{ rotate: audioState.isPlaying ? 360 : 0 }}
              transition={{
                rotate: {
                  duration: 9,
                  repeat: audioState.isPlaying ? Infinity : 0,
                  ease: 'linear',
                },
              }}
              className="relative w-48 h-48 sm:w-52 sm:h-52 rounded-full bg-zinc-950 border-4 border-zinc-800 shadow-2xl flex items-center justify-center overflow-hidden"
              style={{
                boxShadow: audioState.isPlaying
                  ? '0 0 40px -5px rgba(192, 132, 252, 0.45), inset 0 0 25px rgba(0,0,0,0.85)'
                  : '0 10px 30px rgba(0,0,0,0.6)',
              }}
            >
              {/* Vinyl Grooves */}
              <div className="absolute inset-2 rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute inset-5 rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute inset-8 rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute inset-11 rounded-full border border-white/5 pointer-events-none" />

              {/* Center Artistic Album Label (Radhe Shyam - Ee Raathale aesthetic) */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-rose-600 via-pink-600 to-indigo-700 border-2 border-white/30 flex flex-col items-center justify-center shadow-inner relative z-10 p-2 text-center">
                <Disc3 className="w-7 h-7 text-white/90 animate-spin-slow mb-0.5" />
                <span className="text-[9px] font-mono font-bold tracking-tight text-white/90 leading-tight">
                  EE RAATHALE
                </span>
                <span className="text-[8px] text-pink-200/80 font-mono">
                  RADHE SHYAM
                </span>
                <div className="absolute w-4 h-4 rounded-full bg-zinc-950 border border-white/40" />
              </div>
            </motion.div>
          </div>

          {/* Song Information */}
          <div className="my-2 space-y-1">
            <h4 className="text-xl sm:text-2xl font-serif font-medium text-rose-100">
              «{SONG_TITLE}»
            </h4>
            <p className="text-xs sm:text-sm text-purple-300 font-mono tracking-wide">
              «{SONG_SUBTITLE}»
            </p>
          </div>

          {/* Dynamic Frequency Visualizer Bars */}
          <div className="flex items-end justify-center gap-1.5 h-8 my-2.5 w-44">
            {[45, 80, 60, 100, 65, 90, 50, 95, 75, 55].map((h, i) => (
              <motion.div
                key={i}
                animate={{
                  height: audioState.isPlaying ? [`${h * 0.3}%`, `${h}%`, `${h * 0.4}%`] : '15%',
                }}
                transition={{
                  duration: 0.55 + (i % 3) * 0.2,
                  repeat: audioState.isPlaying ? Infinity : 0,
                  ease: 'easeInOut',
                }}
                className="w-1.5 rounded-full bg-gradient-to-t from-rose-500 to-purple-400 opacity-80"
              />
            ))}
          </div>

          {/* Progress Bar & Seek */}
          <div className="w-full space-y-1.5 px-3 mb-3">
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={audioState.progress}
              onChange={handleSeek}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-pink-400"
            />
            <div className="flex justify-between text-[11px] font-mono text-rose-200/60">
              <span>{formatTime(audioState.currentTime)}</span>
              <span>{formatTime(audioState.duration)}</span>
            </div>
          </div>

          {/* Play / Pause Interactive Controls */}
          <div className="flex items-center justify-center gap-4 my-1">
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: '0 0 25px rgba(244, 114, 182, 0.6)' }}
              whileTap={{ scale: 0.92 }}
              onClick={handleTogglePlay}
              className="w-14 h-14 rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-purple-600 text-white shadow-glow-rose flex items-center justify-center border border-white/20"
              aria-label={audioState.isPlaying ? 'Pause' : 'Play'}
            >
              {audioState.isPlaying ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current ml-0.5" />
              )}
            </motion.button>
          </div>

          {/* Graceful Missing Audio / Fallback Notice */}
          <div className="mt-4 w-full">
            {audioState.hasCustomAudio ? (
              <div className="inline-flex items-center gap-1.5 text-[11px] text-emerald-300/80 font-mono bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                <Music2 className="w-3.5 h-3.5" />
                <span>Playing custom audio: Ee Raathale 🎵</span>
              </div>
            ) : (
              <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/20 text-left text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-purple-300 font-medium font-mono">
                  <Info className="w-3.5 h-3.5 shrink-0 text-pink-400" />
                  <span>«{AUDIO_MISSING_NOTE}»</span>
                </div>
                <p className="text-[11px] text-rose-200/60 font-sans font-light pl-5">
                  {AUDIO_INSTRUCTION} Playing romantic ambient melody preview.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
