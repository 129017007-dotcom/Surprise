# 💖 Romantic Birthday Surprise Website

A handcrafted, premium, mobile-first interactive birthday surprise web experience.

---

## 🚀 How to Run Locally

The development server is already running for you at:
👉 **`http://127.0.0.1:5173/`**

To start it manually anytime:
```bash
npm run dev
```

To build for production:
```bash
npm run build
```

---

## 🎨 How to Personalize (Centralized Config)

All personalized details, names, messages, and audio are located in one single file:
📂 **[`src/config/surpriseConfig.ts`](./src/config/surpriseConfig.ts)**

### 1. Change Names
```typescript
HER_NAME: "Her Name",       // Replace with her real name or nickname
MY_NAME: "Your Name",       // Replace with your name for the letter signature
```

### 2. Add Your Song 🎵
1. Place your MP3 file inside the `public/` folder (for example: `public/our-song.mp3`).
2. In `src/config/surpriseConfig.ts`, update:
```typescript
AUDIO_FILE: "/our-song.mp3",
SONG_TITLE: "Your Song Title",
SONG_ARTIST: "Artist Name",
```
*(Note: If no audio file is provided, the website automatically plays a dreamy romantic ambient synth chord progression using the Web Audio API!)*

### 3. Customize the Final Birthday Message ❤️
In `src/config/surpriseConfig.ts`, update `FINAL_MESSAGE`:
```typescript
FINAL_MESSAGE: `Your personal emotional birthday message here...`,
```

### 4. Adding Future Memories (e.g. Park / Hand-Holding Memory)
The config includes a dedicated `FUTURE_PERSONAL_MEMORIES` array ready for when you wish to add personal milestone memories:
```typescript
FUTURE_PERSONAL_MEMORIES: [
  {
    id: "park_memory",
    title: "That Evening at the Park",
    description: "Your personal story here...",
    date: "A Day to Remember",
  }
]
```

### 5. Hidden Easter Egg
- A tiny sparkling star (`✨`) is tucked in the upper cosmos of the Surprise Galaxy. Tapping it unlocks the secret envelope:
> *"I could write a hundred things here, but honestly… I'm just really happy that you're a part of my life. ❤️ That's it. That's the secret."*

---

## 🌟 Interactive Journey Overview

1. **Screen 1 — Mystery Opening**: Locked confidential dossier with glowing borders and restricted protocol status.
2. **Screen 2 — Romantic Reveal**: Access granted screen with staggered intimate lead-in text.
3. **Screen 3 — Main Surprise World**: Interactive digital cosmos with 6 interactive features:
   - 💌 **A Letter For You**: Wax sealed envelope with unfold animation and heartfelt letter.
   - 🎁 **A Little Gift**: 5 unboxable gift cards (Cute Compliment, Funny Message, Sweet Message, Teasing Message, Little Reminder).
   - 🎡 **Pick Your Surprise**: Physics-based interactive spin wheel with anti-repeat selection and custom prizes.
   - 🎮 **Let's Play (Catch the Hearts)**: Touch-optimized mobile arcade game catching 10 floating hearts with particle bursts.
   - 🎵 **A Song For You**: Interactive vinyl turntable player with progress scrubber and equalizer wave bars.
   - ✨ **Something Hidden**: Easter egg secret envelope.
4. **Screen 4 — Final Birthday Reveal**: Screen fades into darkness with suspense pulse, followed by grand celebration:
   - `HAPPY BIRTHDAY, [HER NAME] ❤️`
   - Pastel & gold heart confetti shower
   - Final personal note
   - Revisit option
