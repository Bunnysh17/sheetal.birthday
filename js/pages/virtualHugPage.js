/**
 * 🤗 Page 9: Virtual Hug Screen
 * Interactive animated hug with squeeze effect, heart shower, and sweet message.
 */

import { birthdayConfig } from '../../config.js';
import { Illustrations } from '../illustrations.js';
import { soundManager } from '../audio.js';
import { confettiEngine } from '../confetti.js';

export class VirtualHugPage {
  constructor(app) {
    this.app = app;
    this.hugGiven = false;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'page-view';

    container.innerHTML = `
      <div class="paper-card virtual-hug-card">
        <div class="washi-tape"></div>

        <div class="cute-badge">
          <span>🤗</span> Chapter 04
        </div>

        <h1 class="ref-heading">${birthdayConfig.virtualHugTitle || "Virtual hug for ya!"}</h1>
        <p style="text-align: center; color: var(--text-muted); font-size: 1.15rem; margin-bottom: 8px;">Click the button below to wrap you in a warm hug 🧸💕</p>

        <!-- Kawaii Hugging Characters Illustration -->
        <div class="hug-interactive-wrap" id="hug-illustration-wrap">
          ${Illustrations.huggingCouple()}
        </div>

        <!-- Hidden until clicked -->
        <div class="hug-result-message" id="hug-result-box">
          <p style="font-family: var(--font-chubby); font-size: 1.5rem; color: var(--heading-red);">${birthdayConfig.virtualHugSentMessage}</p>
          <div style="font-family: var(--font-chubby); font-size: 2.2rem; color: var(--btn-red); font-weight: 700; margin-top: 6px;">${birthdayConfig.virtualHugMissYou}</div>
        </div>

        <!-- Hug Button -->
        <button class="ref-btn" id="give-hug-btn">
          ${birthdayConfig.virtualHugButtonText || "CLICK FOR A HUG ❤️"}
        </button>

        <!-- Next Screen Button (Revealed after hug) -->
        <button class="ref-btn" id="next-to-collage-btn" style="display: none; background: #FFFDF9; color: var(--btn-red); border-color: var(--btn-red);">
          OUR PHOTO COLLAGE 📸
        </button>
      </div>
    `;

    const hugBtn = container.querySelector('#give-hug-btn');
    const nextBtn = container.querySelector('#next-to-collage-btn');
    const hugWrap = container.querySelector('#hug-illustration-wrap');
    const resultBox = container.querySelector('#hug-result-box');

    hugBtn.addEventListener('click', () => {
      this.hugGiven = true;
      soundManager.playHugSound();

      // Trigger squeeze animation
      hugWrap.classList.remove('squeezing');
      void hugWrap.offsetWidth; // trigger reflow
      hugWrap.classList.add('squeezing');

      // Heart burst confetti
      confettiEngine.burst({ count: 70 });

      // Reveal text
      resultBox.classList.add('visible');

      // Update button text and show next step
      hugBtn.innerHTML = '<span>✨</span> HUG SENT! HUG AGAIN? ❤️';
      nextBtn.style.display = 'inline-flex';
    });

    nextBtn.addEventListener('click', () => {
      soundManager.playTap();
      this.app.navigateTo('collage');
    });

    return container;
  }

  cleanup() {}
}
