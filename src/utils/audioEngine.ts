/**
 * Interactive Audio Engine
 * Supports custom audio files with graceful fallback and missing-file messaging.
 */

export interface AudioState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  progress: number;
  hasCustomAudio: boolean;
  isMissingCustomAudio: boolean;
}

class RomanticAudioEngine {
  private audio: HTMLAudioElement | null = null;
  private audioCtx: AudioContext | null = null;
  private isSynthesizing: boolean = false;
  private synthInterval: number | null = null;
  private synthTime: number = 0;
  private listeners: Set<(state: AudioState) => void> = new Set();

  public state: AudioState = {
    isPlaying: false,
    currentTime: 0,
    duration: 260, // ~4m 20s (standard duration for Ee Raathale)
    progress: 0,
    hasCustomAudio: false,
    isMissingCustomAudio: true,
  };

  constructor() {
    // defer AudioContext until user interaction
  }

  public init(customUrl?: string) {
    if (customUrl) {
      this.audio = new Audio(customUrl);
      this.audio.preload = "metadata";

      this.audio.addEventListener("loadedmetadata", () => {
        if (this.audio) {
          this.state.duration = this.audio.duration || 260;
          this.state.hasCustomAudio = true;
          this.state.isMissingCustomAudio = false;
          this.notify();
        }
      });

      this.audio.addEventListener("timeupdate", () => {
        if (this.audio && this.audio.duration) {
          this.state.currentTime = this.audio.currentTime;
          this.state.progress = (this.audio.currentTime / this.audio.duration) * 100;
          this.notify();
        }
      });

      this.audio.addEventListener("ended", () => {
        this.state.isPlaying = false;
        this.notify();
      });

      this.audio.addEventListener("error", () => {
        this.state.hasCustomAudio = false;
        this.state.isMissingCustomAudio = true;
        this.notify();
      });
    }
  }

  public subscribe(cb: (state: AudioState) => void): () => void {
    this.listeners.add(cb);
    cb(this.state);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb({ ...this.state }));
  }

  public async toggle(): Promise<boolean> {
    if (this.state.isPlaying) {
      this.pause();
      return false;
    } else {
      await this.play();
      return true;
    }
  }

  public async play(): Promise<void> {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === "suspended") {
      await this.audioCtx.resume();
    }

    if (this.audio && this.state.hasCustomAudio) {
      try {
        await this.audio.play();
        this.state.isPlaying = true;
        this.notify();
        return;
      } catch {
        // Autoplay/load error, fall back to synth
      }
    }

    // Fallback dreamy romantic chime synth
    this.startRomanticSynth();
    this.state.isPlaying = true;
    this.notify();
  }

  public pause(): void {
    if (this.audio && this.state.hasCustomAudio) {
      this.audio.pause();
    }
    this.stopRomanticSynth();
    this.state.isPlaying = false;
    this.notify();
  }

  public seek(percent: number): void {
    const clamped = Math.max(0, Math.min(100, percent));
    const targetTime = (clamped / 100) * this.state.duration;
    if (this.audio && this.state.hasCustomAudio) {
      this.audio.currentTime = targetTime;
    }
    this.state.currentTime = targetTime;
    this.state.progress = clamped;
    this.synthTime = targetTime;
    this.notify();
  }

  /**
   * Generates a warm, dreamy ambient chime chord progression
   * Key of C/A: Cmaj7, Am9, Fmaj7, Gsus4
   */
  private startRomanticSynth() {
    if (this.isSynthesizing) return;
    this.isSynthesizing = true;

    // Chords (frequencies in Hz): [Root, 3rd, 5th, 7th/9th]
    const chordProgressions = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7 (C4, E4, G4, B4)
      [220.00, 261.63, 329.63, 392.00, 493.88], // Am9 (A3, C4, E4, G4, B4)
      [174.61, 261.63, 329.63, 392.00], // Fmaj7 (F3, C4, E4, G4)
      [196.00, 261.63, 293.66, 392.00], // Gsus4 (G3, C4, D4, G4)
    ];

    let chordIndex = 0;
    let step = 0;

    const playNotes = () => {
      if (!this.audioCtx || !this.isSynthesizing) return;
      const now = this.audioCtx.currentTime;
      const currentChord = chordProgressions[chordIndex % chordProgressions.length];
      
      const noteFreq = currentChord[step % currentChord.length];
      this.playChimeNote(noteFreq, now);

      step++;
      if (step % 4 === 0) {
        chordIndex++;
      }

      this.synthTime += 0.8;
      if (this.synthTime > this.state.duration) {
        this.synthTime = 0;
      }
      this.state.currentTime = this.synthTime;
      this.state.progress = (this.synthTime / this.state.duration) * 100;
      this.notify();
    };

    playNotes();
    this.synthInterval = window.setInterval(playNotes, 750);
  }

  private playChimeNote(freq: number, startTime: number) {
    if (!this.audioCtx) return;

    const osc1 = this.audioCtx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(freq, startTime);

    const osc2 = this.audioCtx.createOscillator();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(freq * 2, startTime);
    osc2.detune.setValueAtTime(4, startTime);

    const gain1 = this.audioCtx.createGain();
    gain1.gain.setValueAtTime(0.001, startTime);
    gain1.gain.exponentialRampToValueAtTime(0.08, startTime + 0.08);
    gain1.gain.exponentialRampToValueAtTime(0.0001, startTime + 2.2);

    const gain2 = this.audioCtx.createGain();
    gain2.gain.setValueAtTime(0.001, startTime);
    gain2.gain.exponentialRampToValueAtTime(0.02, startTime + 0.05);
    gain2.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.6);

    const filter = this.audioCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1400, startTime);

    osc1.connect(gain1);
    osc2.connect(gain2);
    gain1.connect(filter);
    gain2.connect(filter);
    filter.connect(this.audioCtx.destination);

    osc1.start(startTime);
    osc2.start(startTime);
    osc1.stop(startTime + 2.3);
    osc2.stop(startTime + 1.8);
  }

  private stopRomanticSynth() {
    this.isSynthesizing = false;
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }
}

export const romanticAudio = new RomanticAudioEngine();
