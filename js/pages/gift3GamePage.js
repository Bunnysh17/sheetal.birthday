import { soundManager } from '../audio.js';
import { confettiEngine } from '../confetti.js';

export class Gift3GamePage {
  constructor(app) {
    this.app = app;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'page-view gift3-game-view';

    container.innerHTML = `
      <div class="gift3-game-container" style="width: 100%; min-height: 100vh; position: relative; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; overflow: hidden; padding: 20px 15px;">

        <style>
          .gift3-title-wrap {
            position: relative;
            margin-top: 30px;
            margin-bottom: 6px;
            display: inline-block;
            max-width: 95%;
          }
          .gift3-main-title {
            color: #5C4033;
            font-family: var(--font-heading, 'Playfair Display', serif);
            font-size: clamp(1.85rem, 6.5vw, 3.6rem);
            font-weight: 700;
            line-height: 1.15;
            margin: 0;
            position: relative;
            z-index: 3;
            white-space: nowrap;
            text-shadow: 0 2px 4px rgba(255,255,255,0.8);
          }
          .gift3-decor-butterfly {
            position: absolute;
            top: -28px;
            left: -24px;
            width: 48px;
            transform: rotate(-15deg);
            opacity: 0.95;
            z-index: 4;
            pointer-events: none;
          }
          .gift3-decor-brushstroke {
            position: absolute;
            top: -6px;
            left: -12px;
            width: 140px;
            opacity: 0.75;
            z-index: 1;
            pointer-events: none;
          }
          .gift3-decor-stamp {
            position: absolute;
            top: -32px;
            right: -16px;
            width: 62px;
            transform: rotate(6deg);
            z-index: 2;
            opacity: 0.95;
            pointer-events: none;
          }
          .gift3-decor-tape {
            position: absolute;
            top: -40px;
            right: 28px;
            width: 56px;
            transform: rotate(-10deg);
            z-index: 1;
            pointer-events: none;
          }
          @media (max-width: 768px) {
            .gift3-title-wrap {
              margin-top: 20px;
              margin-bottom: 2px;
            }
            .gift3-main-title {
              font-size: clamp(1.55rem, 6.2vw, 2.2rem) !important;
            }
            .gift3-decor-butterfly {
              width: 36px !important;
              top: -20px !important;
              left: -14px !important;
            }
            .gift3-decor-brushstroke {
              width: 100px !important;
              top: -4px !important;
              left: -6px !important;
            }
            .gift3-decor-stamp {
              width: 46px !important;
              top: -22px !important;
              right: -8px !important;
            }
            .gift3-decor-tape {
              width: 42px !important;
              top: -28px !important;
              right: 24px !important;
            }
          }
          @media (max-width: 380px) {
            .gift3-main-title {
              font-size: 1.38rem !important;
            }
          }
        </style>

        <!-- Main Title Area with relative decorations -->
        <div class="stagger-1 gift3-title-wrap">
          <!-- Decorations Top Left -->
          <img src="assets/scrapbook/vintage_purple_butterfly.png" class="gift3-decor-butterfly" alt="butterfly" />
          <img src="assets/scrapbook/vintage_pink_gold_brushstroke.png" class="gift3-decor-brushstroke" alt="brushstroke" />
          
          <!-- Decorations Top Right -->
          <img src="assets/scrapbook/vintage_stamps_trio_rose_heart_cupid.png" class="gift3-decor-stamp" alt="stamp" />
          <img src="assets/scrapbook/vintage_purple_washi_tape.png" class="gift3-decor-tape" alt="washi tape" />

          <h1 class="ref-heading gift3-main-title">
            I made something
          </h1>
        </div>

        <!-- Curved Subtitle -->
        <div class="stagger-2" style="position: relative; z-index: 2; margin-top: -5px; margin-bottom: 25px; width: 100%; max-width: 360px;">
          <svg viewBox="0 0 500 90" style="width: 100%; max-width: 380px; height: auto; max-height: 70px;">
            <path id="archCurve" d="M 40,65 Q 250,15 460,65" fill="transparent" />
            <text>
              <textPath href="#archCurve" startOffset="50%" text-anchor="middle" fill="#8C6A5D" font-style="italic" font-family="var(--font-display), Georgia, serif" font-size="40" letter-spacing="1.2">
                Do you want to see ?
              </textPath>
            </text>
          </svg>
        </div>

        <!-- Cute Cat Gif (Centered) -->
        <div class="stagger-3" style="position: relative; margin: 10px 0 35px 0; display: inline-block;">
          <img src="gifs/peach-and-goma-peach-goma.webp" style="height: 180px; max-width: 100%; object-fit: contain; position: relative; z-index: 2;" alt="peach goma box" onerror="this.src='gifs/peach-goma.gif'" />
          
          <!-- Side Flowers & Key -->
          <img src="assets/scrapbook/vintage_blue_forgetmenot_sprig.png" style="position: absolute; left: -65px; top: 15px; width: 55px; z-index: 1; opacity: 0.9; pointer-events: none;" />
          <img src="assets/scrapbook/vintage_antique_key_sage_ribbon.png" style="position: absolute; right: -70px; bottom: 10px; width: 80px; transform: rotate(-15deg); z-index: 1; opacity: 0.9; pointer-events: none;" />
        </div>

        <!-- Button Area -->
        <div class="stagger-4" style="display: flex; align-items: center; justify-content: center; gap: 24px; margin-bottom: 20px; position: relative; z-index: 5;">
          
          <div style="position: relative; z-index: 10; transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); transform-origin: left center;" id="yes-btn-wrap">
            <button class="ref-btn inviting-pulse" id="chapter3-begin-btn" style="background: #A0616A; color: white; padding: 12px 38px; border-radius: 25px; font-size: 1.15rem; border: none; font-weight: bold; letter-spacing: 1px; cursor: pointer; box-shadow: 0 4px 15px rgba(160,97,106,0.3); z-index: 2; transition: background 0.2s; min-width: 110px;">
              YES
            </button>
            <img src="shinchan/shinchan.gif" style="position: absolute; right: -15px; top: -50px; width: 65px; z-index: 3; pointer-events: none;" />
          </div>

          <button class="ref-btn" id="chapter3-not-yet" style="background: #A0616A; color: white; padding: 12px 38px; border-radius: 25px; font-size: 1.15rem; border: none; font-weight: bold; letter-spacing: 1px; cursor: pointer; box-shadow: 0 4px 15px rgba(160,97,106,0.3); z-index: 2; transition: transform 0.2s, background 0.2s; min-width: 110px;">
            NO
          </button>
        </div>
        
        <!-- Bottom Decor -->
        <img src="assets/scrapbook/vintage_lavender_sprig_tall.png" class="stagger-1" style="position: absolute; bottom: -20px; left: -20px; width: 160px; opacity: 0.8; pointer-events: none;" />
        <img src="assets/scrapbook/vintage_postmarked_letter_sheet.png" class="stagger-1" style="position: absolute; bottom: 50px; left: 100px; width: 75px; transform: rotate(-25deg); opacity: 0.9; pointer-events: none;" />

      </div>
    `;

    this.attachEvents(container);
    return container;
  }

  attachEvents(container) {
    let yesScale = 1;
    let noScale = 1;

    // "NO" makes "YES" bigger
    container.querySelector('#chapter3-not-yet')?.addEventListener('click', () => {
      soundManager.playErrorSound();
      
      const noBtn = container.querySelector('#chapter3-not-yet');
      const yesWrap = container.querySelector('#yes-btn-wrap');
      
      noBtn.classList.add('shake-error');
      setTimeout(() => noBtn.classList.remove('shake-error'), 500);
      
      // Make YES bigger
      yesScale += 0.35;
      yesWrap.style.transform = `scale(${yesScale})`;
      
      // Optionally make NO smaller
      noScale = Math.max(0, noScale - 0.15);
      noBtn.style.transform = `scale(${noScale})`;
    });

    // "YES" finishes Gift 3 and opens the final letter
    container.querySelector('#chapter3-begin-btn')?.addEventListener('click', () => {
      soundManager.playSuccessSound();
      confettiEngine.fireCannons();
      
      if (!this.app.openedGifts) {
        this.app.openedGifts = { 1: true, 2: true, 3: false };
      }
      this.app.openedGifts[3] = true;
      
      setTimeout(() => {
        this.app.navigateTo('letter');
      }, 500);
    });
  }

  cleanup() {
    // No ongoing loops to clear
  }
}
