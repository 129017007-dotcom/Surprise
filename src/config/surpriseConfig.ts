/**
 * ROMANTIC BIRTHDAY SURPRISE - CONFIGURATION FILE
 * 
 * Personalized for Bhavya from Saivardhan.
 * Everything is modular and cleanly separated.
 */

export interface GiftItem {
  id: number;
  tag: string;
  title: string;
  icon: string;
  accentColor: string;
  message: string;
}

export interface WheelSlice {
  id: number;
  label: string;
  emoji: string;
  color: string;
  resultTitle: string;
  resultMessage: string;
}

export interface EasterEgg {
  id: string;
  title: string;
  message: string;
  unlockedHint?: string;
}

export interface PersonalMemory {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  icon: string;
  accentGradient: string;
  content: string;
  theme: 'park' | 'annual_day';
}

export const SURPRISE_CONFIG = {
  // ==========================================
  // 1. PERSONAL DETAILS
  // ==========================================
  HER_NAME: "Bhavya",
  MY_NAME: "Saivardhan",
  PHOTO_PATH: "/images/birthday-photo.jpg",
  
  // ==========================================
  // 2. FAVOURITE SONG SECTION 🎵
  // ==========================================
  SONG_HEADING: "A Song That Reminds Me Of You 🎵",
  SONG_TITLE: "Ee Raathale",
  SONG_SUBTITLE: "Radhe Shyam — Telugu",
  AUDIO_FILE: "/audio/ee-raathale.mp3",
  AUDIO_MISSING_NOTE: "Add the song file to play this memory 🎵",
  AUDIO_INSTRUCTION: "Place ee-raathale.mp3 into public/audio/ to play your custom track.",

  // ==========================================
  // 3. PERSONAL MEMORIES SECTION 🌸
  // ==========================================
  memoriesSection: {
    introHeading: "Some memories never really leave us… ❤️",
    introSubheading: "Even the smallest moments can become the ones we remember the most.",
    memories: [
      {
        id: "the_park",
        tag: "MEMORY 01",
        title: "The Moment Everything Stopped",
        subtitle: "The Park ❤️",
        icon: "🌙",
        accentGradient: "from-emerald-900/40 via-purple-950/60 to-rose-950/60",
        theme: "park",
        content: `Some moments are so small, but somehow they stay with you.

I still remember the moment you held my hand in the park.

For those few seconds, everything around me felt strangely quiet… and it honestly felt like my world had almost stopped. ❤️

I don't know if you realized how much that little moment meant to me, but I did.

And it's one of those moments I can still remember with a smile.`,
      },
      {
        id: "annual_day",
        tag: "MEMORY 02",
        title: "The Day I First Noticed You Differently",
        subtitle: "6th Class Annual Day 🌸",
        icon: "✨",
        accentGradient: "from-amber-900/40 via-rose-950/60 to-purple-950/60",
        theme: "annual_day",
        content: `6th class… our annual day.

I still remember watching you dance that day.

And honestly… I was completely floored. 😂❤️

It wasn't just the dance — it was the way you looked that day, the way you carried yourself, and the way you somehow caught my attention without even trying.

I probably didn't know how to put it into words back then, but somewhere in my mind, I remember thinking…

“Wow… she's really beautiful.” ❤️

It's funny how a moment from so many years ago can still make me smile when I think about it.`,
      },
    ] as PersonalMemory[],
  },

  // ==========================================
  // 4. SCREEN 1: MYSTERY OPENING
  // ==========================================
  mysteryOpening: {
    mission: "MISSION: MAKE HER SMILE",
    access: "ACCESS: RESTRICTED",
    target: "TARGET: THE BIRTHDAY GIRL ❤️",
    status: "STATUS: SURPRISE READY…",
    buttonText: "START THE SURPRISE",
  },

  // ==========================================
  // 5. SCREEN 2: ROMANTIC REVEAL
  // ==========================================
  romanticReveal: {
    badge: "ACCESS GRANTED ✓",
    line1: "Okay… you made it this far. 👀",
    line2: "But this isn't just a birthday surprise.",
    line3: "It's a little piece of my heart, made just for you. ❤️",
    prompt: "So… are you ready?",
    buttonText: "SHOW ME",
  },

  // ==========================================
  // 6. SCREEN 3: SURPRISE WORLD NAVIGATION
  // ==========================================
  surpriseWorld: {
    bottomHint: "Take your time… there are little surprises waiting everywhere. ❤️",
    items: [
      { id: "memories", label: "Personal Memories", icon: "🌸", color: "from-rose-500/25 via-pink-500/20 to-purple-500/25", featured: true },
      { id: "letter", label: "A Letter For You", icon: "💌", color: "from-amber-500/20 to-rose-500/30" },
      { id: "gifts", label: "A Little Gift", icon: "🎁", color: "from-rose-500/20 to-pink-500/30" },
      { id: "music", label: "A Song For You", icon: "🎵", color: "from-purple-500/20 to-indigo-500/30" },
      { id: "wheel", label: "Pick Your Surprise", icon: "🎡", color: "from-pink-500/20 to-purple-500/30" },
      { id: "game", label: "Let's Play", icon: "🎮", color: "from-fuchsia-500/20 to-rose-500/30" },
    ],
  },

  // ==========================================
  // 7. LETTER SECTION 💌 (EXACT TEXT)
  // ==========================================
  letter: {
    heading: "To someone who means a little more than she probably realizes ❤️",
    paragraphs: [
      "Happy Birthday! 🥹❤️",
      "I could have simply wished you “Happy Birthday” and left it at that… but honestly, that felt a little too ordinary.",
      "So I made this little surprise for you.",
      "I don't know if I can perfectly put everything into words, but I just want you to know how much I appreciate having you in my life.",
      "Thank you for all the little things — the conversations, the laughs, the silly moments, and all those times you've managed to make me smile without even trying.",
      "Some people become special without even realizing it… and somehow, you became one of those people for me. ❤️",
      "I hope today gives you plenty of reasons to smile, laugh, and feel appreciated. You genuinely deserve all the happiness and beautiful moments coming your way.",
      "And if this little website makes you smile even once…",
      "then honestly, it was completely worth making. 🥹❤️",
      "Happy Birthday! 🎂✨",
      "Stay amazing, always. ❤️",
    ],
  },

  // ==========================================
  // 8. GIFTS SECTION 🎁 (EXACT TEXT)
  // ==========================================
  gifts: [
    {
      id: 1,
      tag: "Gift 1",
      title: "Cute Compliment",
      icon: "🌸",
      accentColor: "#fb7185",
      message: `Honestly, I don't even know what to say about you sometimes. 😅❤️

You are really cute and beautiful, and I genuinely mean that. There are moments when I look at you and just think, “How can someone be this cute?” 😂

And the funny thing is, I don't always know how to explain what I like about you. It's just… something about you.

Maybe it's your smile, maybe it's the way you talk, or maybe it's just you being you.

I don't know bro… I just know that you have this way of making me smile without even trying. ❤️

So yeah, that's my little compliment for you.

Don't let it get to your head though. 😂❤️`,
    },
    {
      id: 2,
      tag: "Gift 2",
      title: "Funny Message",
      icon: "😂",
      accentColor: "#f472b6",
      message: `Okay, first of all… congratulations. 😂🎉

You somehow managed to unlock this message.

I was going to write something very emotional here, but then I remembered that you already have enough reasons to tease me. 😭😂

So I'll just say this:

You're officially one of my favourite people to annoy. ❤️

And yes, before you ask…

No, you cannot escape me by closing this website. 😂`,
    },
    {
      id: 3,
      tag: "Gift 3",
      title: "Sweet Message",
      icon: "🍯",
      accentColor: "#c084fc",
      message: `Just a small reminder…

You are more special to me than I probably tell you.

Even on completely normal days, talking to you somehow makes my day a little better. ❤️

So today, I just wanted to remind you:

I'm really glad I met you. 🥹`,
    },
    {
      id: 4,
      tag: "Gift 4",
      title: "Teasing Message",
      icon: "👀",
      accentColor: "#fbbf24",
      message: `Okay, let's be honest…

You probably opened this expecting something extremely cute. 👀

Well…

You're cute. Happy now? 😂❤️

Don't get too excited though.

I'll give you exactly one compliment for now. 😌`,
    },
    {
      id: 5,
      tag: "Gift 5",
      title: "Little Reminder",
      icon: "✨",
      accentColor: "#38bdf8",
      message: `If today gets stressful, or you ever feel like things aren't going your way, come back to this little message.

Just remember that somewhere, there's someone who genuinely wants to see you happy.

So smile, okay? ❤️

And yes… that was your free reminder for today. 😌`,
    },
  ] as GiftItem[],

  // ==========================================
  // 9. SPIN THE WHEEL 🎡
  // ==========================================
  wheel: {
    title: "PICK YOUR LITTLE SURPRISE",
    slices: [
      {
        id: 1,
        label: "A Sweet Message",
        emoji: "💕",
        color: "#fb7185",
        resultTitle: "A Sweet Message For You 💕",
        resultMessage: "Out of billions of people in this world, I'm really lucky that our paths crossed. Keep being your bright, lovely self!",
      },
      {
        id: 2,
        label: "Something Silly",
        emoji: "😂",
        color: "#f472b6",
        resultTitle: "Something Silly 😂",
        resultMessage: "Fun fact: Scientifically, it is impossible for you to stay mad at me for more than 48 hours. Please don't try to test this hypothesis. 😂",
      },
      {
        id: 3,
        label: "Your Song",
        emoji: "🎵",
        color: "#a855f7",
        resultTitle: "Your Song 🎵",
        resultMessage: "Every time 'Ee Raathale' plays, it always makes me think of you. Go check the Music section!",
      },
      {
        id: 4,
        label: "A Love Note",
        emoji: "💌",
        color: "#e11d48",
        resultTitle: "A Tiny Note 💌",
        resultMessage: "You don't need a special occasion to be celebrated, but today is the absolute best reason to remind you how cherished you are.",
      },
      {
        id: 5,
        label: "A Cute Compliment",
        emoji: "🌸",
        color: "#fbbf24",
        resultTitle: "A Cute Compliment 🌸",
        resultMessage: "Your laugh is genuinely one of the best sounds in the world. Please don't ever hide it!",
      },
      {
        id: 6,
        label: "Another Surprise",
        emoji: "🎁",
        color: "#38bdf8",
        resultTitle: "Another Little Surprise 🎁",
        resultMessage: "You have earned 1x Free Birthday Wish voucher! Redeemable anytime for your favorite snack or an attentive listening ear.",
      },
    ] as WheelSlice[],
  },

  // ==========================================
  // 10. MINI GAME 🎮 (CATCH THE HEARTS)
  // ==========================================
  game: {
    title: "CATCH THE HEARTS ❤️",
    targetScore: 10,
    completionLine1: "Aww… you caught them all. ❤️",
    completionLine2: "But I think you already caught something more important… 👀",
    rewardTitle: "Special Birthday Achievement Unlocked! 🏆",
    rewardDescription: "Master of Catching Hearts (and stealing them without permission).",
  },

  // ==========================================
  // 11. HIDDEN SECRET / EASTER EGG 🔐 (PRESERVED)
  // ==========================================
  easterEggs: [
    {
      id: "sparkle_primary",
      title: "You found something that wasn't supposed to be easy to find… ✨",
      message: `I could write a hundred things here, but honestly…

I'm just really happy that you're a part of my life. ❤️

That's it. That's the secret.`,
      unlockedHint: "Secret star discovered in the digital cosmos ✨",
    },
  ] as EasterEgg[],

  // ==========================================
  // 12. FINAL BIRTHDAY MESSAGE & REVEAL 🎂
  // ==========================================
  finalReveal: {
    suspenseText: "And now… the last little surprise.",
    bannerGreeting: "HAPPY BIRTHDAY",
    personalMessage: `I hope this little surprise made you smile, even if it was just for a moment.

I don't know if I'll ever be able to put everything I feel into the perfect words, but I'm really glad I got to know you and share these little moments with you.

Keep smiling, keep being the person you are, and never forget how special you are. ❤️

Happy Birthday once again. 🎂✨`,
    finalPunchline: "“And yes… I made this entire thing just to see you smile. ❤️”",
  },
};
