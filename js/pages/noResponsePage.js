/**
 * \u{1F494} Page 4: "Why did u click no!?" Screen
 * Fighting/biting cute cats with red "TRY AGAIN" button.
 */

import { soundManager } from '../audio.js';

export class NoResponsePage {
  constructor(app) {
    this.app = app;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'page-view';

    container.innerHTML = `
      <div class="choice-open-container">
        <!-- Top Washi Tape & Stamp -->
        <img src="assets/scrapbook/scrapbook_purple_washi_tape.png" class="sb-sticker sb-choice-tape-right" alt="washi tape" />

        <!-- Arched Red Heading -->
        <h1 class="ref-heading arched-text stagger-1" style="font-size: clamp(2.4rem, 6.5vw, 3.6rem);">
          Why did u click no!?
        </h1>

        <!-- Character Sticker with Folded Heart Accent -->
        <div class="choice-stickers-wrap stagger-2" style="position: relative;">
          <img 
            src="assets/scrapbook/scrapbook_folded_parchment_heart.png" 
            alt="folded heart" 
            class="sb-sticker" 
            style="width: 130px; top: -15px; left: 50%; transform: translateX(-50%) rotate(6deg); opacity: 0.85; z-index: 1;"
          />
          <img 
            src="assets/characters/no_response_cats.png" 
            alt="No response cats" 
            class="sticker-img sticker-floating"
            id="no-cats-img"
            style="max-width: 250px; position: relative; z-index: 2;"
          />
          <img 
            src="assets/scrapbook/scrapbook_dried_yarrow.png" 
            alt="dried yarrow" 
            class="sb-sticker" 
            style="width: 65px; bottom: -10px; right: -20px; transform: rotate(15deg); z-index: 3;"
          />
        </div>

        <!-- Red Pill Button -->
        <button class="ref-btn inviting-pulse stagger-3" id="try-again-btn" style="margin-top: 10px;">
          TRY AGAIN \u{1F504}
        </button>
      </div>
    `;

    const sticker = container.querySelector('#no-cats-img');
    if (sticker) {
      sticker.addEventListener('click', () => {
        soundManager.playErrorSound();
      });
    }

    container.querySelector('#try-again-btn').addEventListener('click', () => {
      soundManager.playTap();
      this.app.navigateTo('choice');
    });

    return container;
  }

  cleanup() {}
}