/**
 * ???? Page 5: Birthday Wish Screen
 * Arched "HAPPY BIRTHDAY", heartfelt letter, and party cats with cake.
 */

import { birthdayConfig } from '../../config.js';
import { soundManager } from '../audio.js';
import { confettiEngine } from '../confetti.js';

export class LetterPage {
  constructor(app) {
    this.app = app;
  }

  render() {
    if (!this.app.openedGifts) {
      this.app.openedGifts = { 1: true, 2: true, 3: true };
    } else {
      this.app.openedGifts[3] = true;
    }

    const container = document.createElement('div');
    container.className = 'page-view';

    container.innerHTML = `
      <div class="wish-page-container" style="position: relative; padding-bottom: 30px;">
        <!-- Top Navigation Bar -->
        <div class="page-top-bar" style="width: 100%; display: flex; justify-content: flex-start; margin-bottom: 6px; z-index: 20; position: relative;">
          <button class="game-back-btn" id="letter-back-btn">← Back to Gifts</button>
        </div>

        <span class="gift-badge-pill stagger-1" style="margin-bottom: 6px;">💌 GIFT 3 OF 3 • A SPECIAL LETTER ✨</span>

        <div class="wish-watermark stagger-1" aria-hidden="true">
          MY WISH
        </div>

        <h1 class="ref-heading arched-text stagger-1" style="font-size: clamp(2.2rem, 6vw, 3.4rem); z-index: 2;">
          HAPPY BIRTHDAY Sheetal ❤️
        </h1>

        <p class="letter-preface">Sab kuch kehna aasaan nahi hota.<br>Isliye aaj, yeh chhoti si duniya tumhare naam.</p>
        <div class="wish-content-layout" style="position: relative; z-index: 3;">
          <div class="wish-text-col stagger-2" style="position: relative; overflow: visible;">
            <div class="sb-letter-stamp-cluster">
              <img src="assets/scrapbook/scrapbook_postage_stamp_heart.png" class="sb-sticker sb-letter-stamp" alt="postage stamp" />
              <img src="assets/scrapbook/scrapbook_round_postmark_heart.png" class="sb-sticker sb-letter-postmark" alt="heart postmark" />
            </div>

            <img 
              src="assets/scrapbook/scrapbook_letter_wax_seal_pink.png" 
              alt="wax seal" 
              class="sb-sticker sb-letter-seal"
            />

            <img src="assets/scrapbook/scrapbook_pink_rosebud_stem.png" class="sb-sticker sb-letter-rose" alt="rosebud" />

            <p style="font-weight: 700; color: var(--heading-red); margin-bottom: 10px; font-size: 1.15rem;">
              ${birthdayConfig.letterGreeting}
            </p>
            <div style="font-size: 1.05rem; line-height: 1.5; color: #5C4033; padding-right: 10px; display: flex; flex-direction: column; gap: 8px;">
              ${birthdayConfig.letterParagraphs.map(p => `<span>${p}</span>`).join('\n              ')}
            </div>
            
            <div class="wish-signoff" style="display: flex; align-items: center; justify-content: flex-end; margin-top: 15px; gap: 8px; font-weight: bold;">
              <img src="assets/scrapbook/scrapbook_glitter_pink_heart.png" alt="heart" style="width: 28px; vertical-align: middle;" />
            </div>

            <img src="assets/scrapbook/scrapbook_swallowtail_butterfly.png" class="sb-sticker sb-letter-butterfly" alt="butterfly" />
          </div>

          <div class="stagger-3 letter-companion-col" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; position: relative;">
            <img 
              src="gifs/birthday-cake.webp" 
              alt="Birthday Cake" 
              class="sticker-img sticker-floating"
              id="birthday-cake-cats-img"
              style="max-width: 200px;"
            />
            <div style="display: flex; gap: 8px; align-items: center; justify-content: center;">
              <img 
                src="assets/scrapbook/scrapbook_lavender_bouquet.png" 
                alt="lavender" 
                style="width: 85px; filter: drop-shadow(0 4px 10px rgba(92, 64, 51, 0.2)); transform: rotate(-5deg);" 
              />
              <img 
                src="assets/scrapbook/scrapbook_letters_twine_bundle.png" 
                alt="tied letters" 
                style="width: 80px; filter: drop-shadow(0 4px 10px rgba(92, 64, 51, 0.2)); transform: rotate(8deg);" 
              />
            </div>
          </div>
        </div>

        </div>
        <button class="ref-btn inviting-pulse stagger-4" id="replay-btn" style="margin-top: 28px; padding: 12px 36px; font-size: 1.25rem;">
          THERE'S MORE... ✨
        </button>
      </div>
    `;

    const backBtn = container.querySelector('#letter-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        soundManager.playTap();
        this.app.navigateTo('gifts-hub');
      });
    }

    container.querySelector('#replay-btn').addEventListener('click', () => {
      soundManager.playTap();
      this.app.navigateTo('video-edit');
    });

    return container;
  }

  cleanup() {}
}