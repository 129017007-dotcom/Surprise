import confetti from 'canvas-confetti';

export function fireRomanticConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#fb7185', '#f472b6', '#c084fc', '#fbbf24', '#fff1f2', '#fda4af'],
    disableForReducedMotion: true,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

export function fireHeartTap(clientX: number, clientY: number) {
  const x = clientX / window.innerWidth;
  const y = clientY / window.innerHeight;

  confetti({
    particleCount: 18,
    spread: 45,
    origin: { x, y },
    colors: ['#fb7185', '#f472b6', '#fda4af', '#fecdd3'],
    scalar: 0.85,
    startVelocity: 20,
    ticks: 40,
    disableForReducedMotion: true,
  });
}
