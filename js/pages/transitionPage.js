/**
 * 💕 Page 5: Main Story Transition Screen
 * "Okay... then this is for you ❤️" smooth romantic segue into the story.
 */

import { birthdayConfig } from '../../config.js';
import { soundManager } from '../audio.js';
import { confettiEngine } from '../confetti.js';

export class TransitionPage {
  constructor(app) {
    this.app = app;
    this.autoTimer = null;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'page-view';

    container.innerHTML = `
      <div class="paper-card feedback-card" style="padding: 50px 30px;">
        <div class="washi-tape"></div>

        <div style="font-size: 3.5rem; animation: gentlePulse 1.8s infinite ease-in-out;">
          💌 ✨
        </div>

        <h1 class="handwritten-heading" style="font-size: clamp(2.2rem, 6vw, 3.4rem);">
          Okay... then this is for you ❤️
        </h1>

        <p class="handwritten-subtext" style="font-size: 1.5rem; color: var(--text-rose);">
          Made with all my love for ${birthdayConfig.herName} 🌸
        </p>

        <!-- Continue Button -->
        <button class="cute-btn cute-btn-primary" id="open-surprise-btn" style="margin-top: 16px;">
          <span>📖</span> OPEN YOUR BIRTHDAY DIARY
        </button>
      </div>
    `;

    // Trigger soft confetti burst
    setTimeout(() => {
      confettiEngine.burst({ count: 50 });
    }, 200);

    const openBtn = container.querySelector('#open-surprise-btn');
    openBtn.addEventListener('click', () => {
      soundManager.playTap();
      this.clearAutoTimer();
      this.app.navigateTo('letter');
    });

    // Auto navigate after 4.5s if not clicked
    this.autoTimer = setTimeout(() => {
      this.app.navigateTo('letter');
    }, 4500);

    return container;
  }

  clearAutoTimer() {
    if (this.autoTimer) {
      clearTimeout(this.autoTimer);
      this.autoTimer = null;
    }
  }

  cleanup() {
    this.clearAutoTimer();
  }
}
