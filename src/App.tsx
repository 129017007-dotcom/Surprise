import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { BackgroundStars } from './components/BackgroundStars';
import { ScreenMysteryOpening } from './components/ScreenMysteryOpening';
import { ScreenRomanticReveal } from './components/ScreenRomanticReveal';
import { ScreenSurpriseWorld } from './components/ScreenSurpriseWorld';
import { ScreenFinalReveal } from './components/ScreenFinalReveal';
import { MusicModal } from './components/modals/MusicModal';
import { romanticAudio, type AudioState } from './utils/audioEngine';
import { SURPRISE_CONFIG } from './config/surpriseConfig';

export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<1 | 2 | 3 | 4>(1);
  const [audioState, setAudioState] = useState<AudioState>(romanticAudio.state);
  const [isMusicModalOpen, setIsMusicModalOpen] = useState(false);

  useEffect(() => {
    // Initialize audio engine with configured file
    romanticAudio.init(SURPRISE_CONFIG.AUDIO_FILE);

    const unsub = romanticAudio.subscribe((state) => {
      setAudioState(state);
    });
    return unsub;
  }, []);

  const handleToggleSound = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await romanticAudio.toggle();
  };

  return (
    <div className="min-h-screen bg-[#06050e] text-[#fff1f2] relative flex flex-col justify-center items-center selection:bg-pink-500/30 selection:text-pink-100 overflow-x-hidden font-sans">
      {/* Interactive Twinkling Starfield Background */}
      <BackgroundStars />

      {/* Persistent Subtle Audio Orb Control (Top-Left) */}
      <div className="fixed top-4 left-4 sm:top-6 sm:left-6 z-40 flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={handleToggleSound}
          className="p-2.5 rounded-full bg-zinc-900/60 border border-white/10 hover:border-pink-400/40 backdrop-blur-md shadow-lg text-rose-200 transition-all flex items-center gap-2"
          title={audioState.isPlaying ? 'Pause Background Soundtrack' : 'Play Background Soundtrack'}
          aria-label="Soundtrack toggle"
        >
          {audioState.isPlaying ? (
            <Volume2 className="w-4 h-4 text-pink-400 animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4 text-zinc-400" />
          )}
          {audioState.isPlaying && (
            <span className="text-[11px] font-mono tracking-wider text-pink-300 hidden sm:inline-block pr-1">
              PLAYING 🎵
            </span>
          )}
        </motion.button>

        {/* Quick button to open full music player */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsMusicModalOpen(true)}
          className="p-2.5 rounded-full bg-zinc-900/60 border border-white/10 hover:border-purple-400/40 backdrop-blur-md shadow-lg text-purple-200 transition-all"
          title="Open Music Player"
          aria-label="Open Music Player"
        >
          <Music className="w-4 h-4 text-purple-300" />
        </motion.button>
      </div>

      {/* Main Narrative Stage Transitions */}
      <main className="relative z-10 w-full flex-1 flex items-center justify-center py-4">
        <AnimatePresence mode="wait">
          {currentScreen === 1 && (
            <motion.div
              key="screen-1"
              className="w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6 }}
            >
              <ScreenMysteryOpening onStart={() => setCurrentScreen(2)} />
            </motion.div>
          )}

          {currentScreen === 2 && (
            <motion.div
              key="screen-2"
              className="w-full"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.6 }}
            >
              <ScreenRomanticReveal onShowMe={() => setCurrentScreen(3)} />
            </motion.div>
          )}

          {currentScreen === 3 && (
            <motion.div
              key="screen-3"
              className="w-full"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
            >
              <ScreenSurpriseWorld onProceedToFinal={() => setCurrentScreen(4)} />
            </motion.div>
          )}

          {currentScreen === 4 && (
            <motion.div
              key="screen-4"
              className="w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <ScreenFinalReveal onRevisit={() => setCurrentScreen(3)} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Music Modal (can be opened from top left or inside Surprise World) */}
      <MusicModal
        isOpen={isMusicModalOpen}
        onClose={() => setIsMusicModalOpen(false)}
      />
    </div>
  );
};

export default App;
