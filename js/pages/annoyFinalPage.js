/**
 * 💖 Screen 5: Romantic Climax & Finale (Exact match with sample video 00:38 - 00:39)
 * Floating red heart, "I WANT TO ANNOY YOU for the rest of your life", Bubu & Dudu hugging sticker,
 * celebration confetti, and Replay button!
 */

import { soundManager } from '../audio.js';
import { confettiEngine } from '../confetti.js';

export class AnnoyFinalPage {
  constructor(app) {
    this.app = app;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'page-view annoy-final-view';

    container.innerHTML = `
      <div class="canva-center-card annoy-final-card">
        <!-- Floating Red Heart on Top -->
        <div class="top-floating-heart-bubble stagger-1" aria-hidden="true">
          ❤️
        </div>

        <!-- Dramatic Romantic Heading -->
        <div class="annoy-heading-block stagger-1">
          <h1 class="annoy-main-title">
            I WANT TO ANNOY YOU
          </h1>
          <p class="annoy-script-subtitle">
            for the rest of your life
          </p>
        </div>

        <!-- Bubu & Dudu Hugging Sticker -->
        <div class="stagger-2" style="margin: 14px 0;">
          <img 
            src="assets/characters/bubu_dudu_annoy.png" 
            alt="Bubu and Dudu Hugging" 
            class="sticker-img sticker-floating"
            id="annoy-couple-img"
            style="max-width: 330px;"
          />
        </div>

        <!-- Replay Pill Button -->
        <div class="stagger-3" style="margin-top: 10px;">
          <button class="ref-btn inviting-pulse" id="replay-all-btn" style="padding: 12px 38px;">
            <span style="text-decoration: underline; text-underline-offset: 4px;">REPLAY SURPRISE 🔄</span>
          </button>
        </div>
      </div>
    `;

    // Confetti celebration fanfare
    setTimeout(() => {
      confettiEngine.fireCannons();
      soundManager.playCelebrationFanfare();
    }, 300);

    // Interactive character sound
    const sticker = container.querySelector('#annoy-couple-img');
    if (sticker) {
      sticker.addEventListener('click', () => {
        soundManager.playHugSound();
        confettiEngine.fireCannons();
      });
    }

    container.querySelector('#replay-all-btn').addEventListener('click', () => {
      soundManager.playTap();
      this.app.openedGifts = { 1: false, 2: false, 3: false };
      this.app.navigateTo('passcode');
    });

    return container;
  }

  cleanup() {}
}
