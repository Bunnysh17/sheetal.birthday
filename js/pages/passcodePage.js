/**
 * ???? Page 1: Passcode Screen
 * Split card with SVG Heart Ring, Profile Photo, Glitter Stars, 4 Passcode Boxes, Underlined Keypad & UNLOCK button.
 */

import { birthdayConfig } from '../../config.js';
import { soundManager } from '../audio.js';

export class PasscodePage {
  constructor(app) {
    this.app = app;
    this.enteredDigits = '';
    this.keypadButtons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];
    this.keyListener = null;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'page-view';

    const heartCount = 32;
    let heartElements = '';
    const rx = 96;
    const ry = 142;
    const cx = 140;
    const cy = 185;

    for (let i = 0; i < heartCount; i++) {
      const angle = (i / heartCount) * (Math.PI * 2) - Math.PI / 2;
      const x = cx + rx * Math.cos(angle);
      const y = cy + ry * Math.sin(angle);
      const rot = (angle * 180) / Math.PI + 90;
      const delay = (i * 0.07).toFixed(2);
      heartElements += `
        <g transform="translate(${x.toFixed(1)}, ${y.toFixed(1)}) rotate(${rot.toFixed(1)})" style="animation: heartWave 2.6s infinite ease-in-out ${delay}s; transform-origin: center;">
          <path d="M0 -6 C-3.5 -11 -8 -5.5 -4.5 0 L0 4.5 L4.5 0 C8 -5.5 3.5 -11 0 -6 Z" fill="#C9908F" stroke="#8A5058" stroke-width="1.2"/>
        </g>
      `;
    }

    const photoSrc = birthdayConfig.profilePhoto || 'assets/images/chick_profile.png';

    container.innerHTML = `
      <div class="passcode-stage-wrapper">
        <div class="passcode-outer-decor" aria-hidden="true">
          <img src="assets/scrapbook/scrapbook_celestial_pink_cloud.png" class="sb-sticker sb-outer-cloud" alt="celestial cloud" />
          <img src="assets/scrapbook/scrapbook_crescent_moon_alpine.png" class="sb-sticker sb-outer-moon" alt="crescent moon" />
          <img src="assets/scrapbook/scrapbook_letters_twine_bundle.png" class="sb-sticker sb-outer-letters" alt="love letters" />
          <img src="assets/scrapbook/scrapbook_airmail_pink_envelope.png" class="sb-sticker sb-outer-airmail" alt="vintage airmail" />
        </div>

        <div class="passcode-split-card">
          <div class="passcode-left-panel stagger-1">
            <img src="assets/scrapbook/scrapbook_purple_washi_tape.png" class="sb-sticker sb-passcode-tape" alt="washi tape" />

            <div class="sb-stamp-cluster">
              <img src="assets/scrapbook/scrapbook_postage_stamp_heart.png" class="sb-sticker sb-passcode-stamp" alt="postage stamp" />
              <img src="assets/scrapbook/scrapbook_round_postmark_heart.png" class="sb-sticker sb-passcode-postmark" alt="heart postmark" />
            </div>

            <span class="glitter-star gs-top-left">\u2605</span>
            <span class="glitter-star gs-top-right">\u2605</span>
            <span class="glitter-star gs-mid-left">\u2605</span>
            <span class="glitter-star gs-mid-right">\u2605</span>
            <span class="glitter-star gs-bot-left">\u2605</span>
            <span class="glitter-star gs-bot-right">\u2605</span>

            <div class="passcode-polaroid-frame" id="passcode-frame-wrap" style="position: relative; width: 300px; height: 220px; background: white; padding: 10px 10px 30px 10px; border-radius: 4px; box-shadow: 0 8px 20px rgba(92, 64, 51, 0.15); transform: rotate(-2deg); display: flex; align-items: center; justify-content: center; cursor: pointer;" title="Click to enlarge">
              <div style="width: 100%; height: 100%; overflow: hidden; border-radius: 2px; position: relative; background: #f0eaeb;">
                <img id="passcode-profile-photo" src="${photoSrc}" style="width: 100%; height: 100%; object-fit: cover; display: block; transform-origin: center;" />
              </div>
              <img src="assets/scrapbook/scrapbook_pink_rosebud_stem.png" class="sb-sticker sb-passcode-rose" alt="dried rosebud" style="position: absolute; bottom: -10px; left: -10px; width: 80px; z-index: 5; transform: rotate(-15deg);" />
            </div>

            <div class="passcode-caption-row">
              <img src="gifs/mochi-mochi-peach-cute-cat.gif" class="passcode-cat-cute-gif" alt="cute cat" />
              <div class="passcode-handwritten-caption">
                <span>For my favorite person in the world ✨</span>
              </div>
            </div>

            <img src="assets/scrapbook/scrapbook_swallowtail_butterfly.png" class="sb-sticker sb-passcode-butterfly" alt="swallowtail butterfly" />
          </div>

          <div class="passcode-right-panel">
            <img src="assets/scrapbook/scrapbook_letter_wax_seal_pink.png" class="sb-sticker sb-passcode-seal" alt="wax seal" />

            <h1 class="passcode-title stagger-1">Enter Passcode ✨</h1>

            <div class="passcode-boxes-wrap stagger-2" id="passcode-boxes">
              <div class="passcode-box"></div>
              <div class="passcode-box"></div>
              <div class="passcode-box"></div>
              <div class="passcode-box"></div>
            </div>

            <div class="keypad-grid-ref stagger-3" id="keypad-grid">
              ${this.keypadButtons.map(btn => `
                <button class="keypad-circle-btn" data-key="${btn}">
                  <span class="key-text">${btn}</span>
                  <span class="key-underline">_</span>
                </button>
              `).join('')}
            </div>

            <div class="unlock-btn-wrap">
              <button class="ref-btn unlock-btn" id="unlock-submit-btn">
                <span class="unlock-btn-text">UNLOCK ✨</span>
              </button>
            </div>

            <img src="gifs/peach-goma.gif" class="passcode-keypad-cat-gif" alt="cheering cat" />
            <img src="assets/scrapbook/scrapbook_lavender_sprig.png" class="sb-sticker sb-passcode-lavender" alt="lavender" />
          </div>
        </div>
      </div>
    `;

    this.attachEvents(container);
    this.loadPasscodePhoto(container);

    // Start passcode music on first user interaction (anywhere on page)
    this._startMusicHandler = () => {
      soundManager.playPasscodeMusic();
      document.removeEventListener('click', this._startMusicHandler);
      document.removeEventListener('keydown', this._startMusicHandler);
      document.removeEventListener('touchstart', this._startMusicHandler);
    };
    document.addEventListener('click', this._startMusicHandler);
    document.addEventListener('keydown', this._startMusicHandler);
    document.addEventListener('touchstart', this._startMusicHandler);

    return container;
  }

  async loadPasscodePhoto(container) {
    try {
      const response = await fetch('photo_adjustments.json?t=' + Date.now());
      if (response.ok) {
        const data = await response.json();
        if (data.passcode_photo) {
          this.passcodePhotoConfig = data.passcode_photo;
          this.applyPasscodePhoto(container);
        }
      }
    } catch (e) {
      // Fallback to baked settings
      this.passcodePhotoConfig = {
        scale: 0.95,
        x: -1.3,
        y: -2.3,
        image: "assets/gallery/upload_1790755261827.png",
        frameH: "310",
        frameW: "305"
      };
      this.applyPasscodePhoto(container);
    }
  }

  applyPasscodePhoto(container) {
    if (!this.passcodePhotoConfig) return;
    const img = container.querySelector('#passcode-profile-photo');
    const wrap = container.querySelector('#passcode-frame-wrap');
    if (img) {
      if (this.passcodePhotoConfig.image) {
        img.src = this.passcodePhotoConfig.image;
      }
      const s = this.passcodePhotoConfig.scale || 1;
      const x = this.passcodePhotoConfig.x || 0;
      const y = this.passcodePhotoConfig.y || 0;
      img.style.transform = `translate(${x}px, ${y}px) scale(${s})`;
    }
    if (wrap) {
      if (this.passcodePhotoConfig.frameW) wrap.style.width = this.passcodePhotoConfig.frameW + 'px';
      if (this.passcodePhotoConfig.frameH) wrap.style.height = this.passcodePhotoConfig.frameH + 'px';
    }
  }

  attachEvents(container) {
    const keypad = container.querySelector('#keypad-grid');
    keypad.addEventListener('click', (e) => {
      const btn = e.target.closest('.keypad-circle-btn');
      if (!btn) return;
      const key = btn.dataset.key;
      this.handleInput(key, container);
    });

    const unlockBtn = container.querySelector('#unlock-submit-btn');
    if (unlockBtn) {
      unlockBtn.addEventListener('click', () => {
        soundManager.playTap();
        this.validatePasscode(container);
      });
    }

    this.keyListener = (e) => {
      if (this.app.currentPageId !== 'passcode') return;
      if (e.key >= '0' && e.key <= '9') {
        this.handleInput(e.key, container);
      } else if (e.key === 'Backspace') {
        this.handleInput('*', container);
      } else if (e.key === 'Enter') {
        if (this.enteredDigits.length === 4) {
          this.validatePasscode(container);
        }
      }
    };
    window.addEventListener('keydown', this.keyListener);
  }

  handleInput(key, container) {
    if (key === '*' || key === 'Backspace') {
      soundManager.playTap();
      this.enteredDigits = this.enteredDigits.slice(0, -1);
    } else if (key === '#' || key === 'Enter') {
      if (this.enteredDigits.length === 4) {
        this.validatePasscode(container);
      }
      return;
    } else if (this.enteredDigits.length < 4) {
      soundManager.playTap();
      this.enteredDigits += key;
    }

    this.updateBoxes(container);
  }

  updateBoxes(container) {
    const boxes = container.querySelectorAll('.passcode-box');
    const unlockBtn = container.querySelector('#unlock-submit-btn');

    boxes.forEach((box, index) => {
      if (index < this.enteredDigits.length) {
        box.classList.add('filled');
        box.innerHTML = `
          <svg class="passcode-star-svg" viewBox="0 0 24 24" width="22" height="22" fill="#5C4033">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
        `;
      } else {
        box.classList.remove('filled', 'correct', 'error');
        box.innerHTML = '';
      }
    });

    if (this.enteredDigits.length === 4) {
      unlockBtn.classList.add('show-unlock');
    } else {
      unlockBtn.classList.remove('show-unlock');
    }
  }

  validatePasscode(container) {
    const correctPass = birthdayConfig.passcode || '1010';
    const boxes = container.querySelectorAll('.passcode-box');

    if (this.enteredDigits === correctPass) {
      soundManager.playSuccessSound();
      soundManager.stopPasscodeMusic();
      soundManager.playFullMusic();
      boxes.forEach(b => b.classList.add('correct'));

      setTimeout(() => {
        this.app.navigateTo('choice');
      }, 500);
    } else {
      soundManager.playErrorSound();
      boxes.forEach(b => b.classList.add('error'));

      setTimeout(() => {
        this.enteredDigits = '';
        this.updateBoxes(container);
        this.app.navigateTo('wrong-passcode');
      }, 600);
    }
  }

  cleanup() {
    if (this.keyListener) {
      window.removeEventListener('keydown', this.keyListener);
      this.keyListener = null;
    }
    if (this._startMusicHandler) {
      document.removeEventListener('click', this._startMusicHandler);
      document.removeEventListener('keydown', this._startMusicHandler);
      document.removeEventListener('touchstart', this._startMusicHandler);
    }
  }
}