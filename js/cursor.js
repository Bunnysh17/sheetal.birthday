/**
 * ✨ Trailing Sparkle & Interactive Click Hearts for Desktop & Mobile
 */

export function initCustomCursor() {
  const sparkleChars = ['✨', '🌸', '⭐', '🌿', '🎀', '💌', '🕯️'];
  let lastSparkleTime = 0;

  // 1. Mouse Move Sparkle Trail (Desktop only)
  if (!('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    document.addEventListener('mousemove', (e) => {
      const now = Date.now();
      if (now - lastSparkleTime < 50) return;
      lastSparkleTime = now;

      const sparkle = document.createElement('span');
      sparkle.className = 'cursor-sparkle';
      sparkle.textContent = sparkleChars[Math.floor(Math.random() * sparkleChars.length)];
      sparkle.style.left = `${e.clientX}px`;
      sparkle.style.top = `${e.clientY}px`;
      sparkle.style.fontSize = `${Math.random() * 8 + 14}px`;

      document.body.appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, 750);
    });
  }

  // 2. Click / Tap Burst of Mini Hearts & Stars (Universal)
  window.addEventListener('pointerdown', (e) => {
    // Spawn 5-7 burst particles at click coordinates
    const count = 6;
    const clickEmojis = ['✨', '🌸', '⭐', '🌿', '💖', '💌'];

    for (let i = 0; i < count; i++) {
      const spark = document.createElement('span');
      spark.className = 'click-spark-particle';
      spark.textContent = clickEmojis[Math.floor(Math.random() * clickEmojis.length)];
      spark.style.left = `${e.clientX}px`;
      spark.style.top = `${e.clientY}px`;
      spark.style.fontSize = `${Math.random() * 10 + 16}px`;

      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const distance = Math.random() * 35 + 25;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      const rot = (Math.random() - 0.5) * 60;

      spark.style.setProperty('--tx', `${tx}px`);
      spark.style.setProperty('--ty', `${ty}px`);
      spark.style.setProperty('--rot', `${rot}deg`);

      document.body.appendChild(spark);

      setTimeout(() => {
        spark.remove();
      }, 700);
    }
  });
}
