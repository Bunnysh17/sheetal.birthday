/**
 * \u2764\uFE0F Page 2: Wrong Passcode Screen
 * Arched "WRONG PASSCODE!", Dudu dragging crying Bubu sticker, and red "TRY AGAIN" button.
 */

import { soundManager } from '../audio.js';

export class WrongPasscodePage {
  constructor(app) {
    this.app = app;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'page-view';

    container.innerHTML = `
      <div class="choice-open-container">
        <!-- Top Washi Tape -->
        <img src="assets/scrapbook/scrapbook_purple_washi_tape.png" class="sb-sticker sb-choice-tape-left" alt="washi tape" />
        <img src="assets/scrapbook/scrapbook_round_postmark_heart.png" class="sb-sticker sb-choice-postmark" alt="postmark" />

        <!-- Arched Red Heading -->
        <h1 class="ref-heading arched-text stagger-1" style="font-size: clamp(2.8rem, 7.5vw, 4.2rem);">
          WRONG PASSCODE!
        </h1>

        <!-- Character Sticker with Crumpled Heart Background -->
        <div class="choice-stickers-wrap stagger-2" style="position: relative;">
          <img 
            src="assets/scrapbook/scrapbook_crumpled_paper_heart.png" 
            alt="crumpled heart" 
            class="sb-sticker" 
            style="width: 140px; top: -20px; left: 50%; transform: translateX(-50%) rotate(-8deg); opacity: 0.85; z-index: 1;"
          />
          <img 
            src="mochi-cat-im-the-boss.gif" 
            alt="Wrong passcode cats" 
            class="sticker-img sticker-floating"
            id="wrong-cats-img"
            style="max-width: 250px; position: relative; z-index: 2;"
          />
        </div>

        <!-- Red Pill Button -->
        <button class="ref-btn inviting-pulse stagger-3" id="try-again-btn" style="margin-top: 10px;">
          TRY AGAIN \u{1F504}
        </button>
      </div>
    `;

    // Ensure passcode music keeps playing
    soundManager.playPasscodeMusic();

    const sticker = container.querySelector('#wrong-cats-img');
    if (sticker) {
      sticker.addEventListener('click', () => {
        soundManager.playErrorSound();
      });
    }

    container.querySelector('#try-again-btn').addEventListener('click', () => {
      soundManager.playTap();
      this.app.navigateTo('passcode');
    });

    return container;
  }

  cleanup() {}
}