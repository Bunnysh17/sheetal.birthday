/**
 * ???? 3 Gifts Hub Screen: Turn-by-Turn Birthday Gift Unlocking
 * Features 3 large 3D aesthetic pink gift boxes with organic cards,
 * cute dancing Shinchan companion, and magical gift box opening animations.
 */

import { birthdayConfig } from '../../config.js';
import { soundManager } from '../audio.js';
import { confettiEngine } from '../confetti.js';

export class GiftHubPage {
  constructor(app) {
    this.app = app;
    if (!this.app.openedGifts) {
      this.app.openedGifts = { 1: false, 2: false, 3: false };
    }
    this.isOpeningAny = false;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'page-view gift-hub-view';

    const gift1Done = this.app.openedGifts[1];
    const gift2Done = this.app.openedGifts[2];
    const gift3Done = this.app.openedGifts[3];

    const allDone = gift1Done && gift2Done && gift3Done;

    container.innerHTML = `
      <div class="gift-hub-container">
        <img src="assets/scrapbook/scrapbook_swallowtail_butterfly.png" class="hub-soft-decor hub-soft-butterfly" alt="" aria-hidden="true" />
        <img src="assets/scrapbook/scrapbook_lavender_sprig.png" class="hub-soft-decor hub-soft-lavender" alt="" aria-hidden="true" />
        <!-- Cute Dancing Shinchan Companion (Cleanly Positioned, No Swan Overlap) -->
        <img src="shinchan/shinchan.gif" class="hub-header-shinchan" alt="dancing shinchan" />

        <!-- Cute Cheering Mascot Cat on Left -->
        <img src="gifs/peach-goma.gif" class="hub-header-cat" alt="peach goma" />

        <!-- Header -->
        <div class="gift-hub-header stagger-1">
          <span class="gift-badge-pill">${allDone ? '🎉 ALL 3 SURPRISES UNLOCKED! 💖✨' : '✨ 3 SPECIAL SURPRISES FOR YOU ✨'}</span>
          <h1 class="ref-heading arched-text gift-hub-title">
            A few pieces of my heart.
          </h1>
          <p class="gift-hub-subtitle">
            ${allDone ? 'You have completed all 3 birthday surprises! Hope you loved every moment ❤️' : 'One little chapter at a time. Take as long as you like.'}
          </p>
        </div>

        <!-- 3 Interactive Gift Boxes ??? Aesthetic Pinned Postcard Style -->
        <div class="gift-boxes-trio-row stagger-2">

          <!-- ================= GIFT 1 ================= -->
          <div class="aesthetic-gift-card ${gift1Done ? 'card-opened' : 'card-unlocked inviting-pulse'}" id="gift-card-1" data-gift="1">
            <!-- Pinned Vintage Washi Tape -->
            <img src="assets/scrapbook/scrapbook_purple_washi_tape.png" class="gift-card-washi" alt="tape" />

            <div class="gift-box-stage">
              <img src="assets/images/pink_gift_box.png" alt="Gift 1 Box" class="gift-box-3d-img" />
              
              <!-- Opening VFX Burst Layer -->
              <div class="gift-opening-burst" id="burst-1">
                <div class="gift-burst-aura"></div>
                <div class="gift-burst-sparkles">
                  <span>\u2728</span><span>\u{1F496}</span><span>\u2B50</span><span>\u{1F338}</span><span>\u2728</span>
                </div>
              </div>

              ${gift1Done ? '<span class="gift-status-badge badge-done">\u2705 OPENED</span>' : '<span class="gift-status-badge badge-new">\u2728 OPEN ME</span>'}
            </div>
            
            <div class="gift-card-info">
              <div class="gift-mini-companion"><img src="gifs/mochi-mochi-peach-cute-cat.gif" alt="" loading="lazy" /><span>FOR YOU · 01</span></div><h3 class="gift-card-name">The moments</h3><p class="gift-personal-note">Little moments, kept with love.</p>
              <p class="gift-card-desc">\u{1F4F8} Our Sweet Memories & Photos</p>
              <button class="ref-btn gift-card-action-btn">
                ${gift1Done ? 'SEE AGAIN \u2728' : 'OPEN NOW \u{1F381}'}
              </button>
            </div>
          </div>

          <!-- ================= GIFT 2 ================= -->
          <div class="aesthetic-gift-card ${gift2Done ? 'card-opened' : (gift1Done ? 'card-unlocked inviting-pulse' : 'card-locked')}" id="gift-card-2" data-gift="2">
            <!-- Pinned Vintage Washi Tape -->
            <img src="assets/scrapbook/scrapbook_pink_gold_brushstroke.png" class="gift-card-washi" alt="tape" />

            <div class="gift-box-stage">
              <img src="assets/images/pink_gift_box.png" alt="Gift 2 Box" class="gift-box-3d-img" />
              
              <!-- Opening VFX Burst Layer -->
              <div class="gift-opening-burst" id="burst-2">
                <div class="gift-burst-aura"></div>
                <div class="gift-burst-sparkles">
                  <span>\u2728</span><span>\u{1F496}</span><span>\u2B50</span><span>\u{1F338}</span><span>\u2728</span>
                </div>
              </div>

              ${gift2Done ? '<span class="gift-status-badge badge-done">\u2705 OPENED</span>' : (gift1Done ? '<span class="gift-status-badge badge-new">\u2728 UNLOCKED</span>' : '<span class="gift-status-badge badge-lock">\u{1F512} LOCKED</span>')}
            </div>

            <div class="gift-card-info">
              <div class="gift-mini-companion"><img src="gifs/goma-heart-goma-love.gif" alt="" loading="lazy" /><span>FOR YOU · 02</span></div><h3 class="gift-card-name">The little things</h3><p class="gift-personal-note">A few reasons. A whole lot of love.</p>
              <p class="gift-card-desc">\u{1F496} Things That Make You Special</p>
              <button class="ref-btn gift-card-action-btn" ${!gift1Done ? 'disabled' : ''}>
                ${gift2Done ? 'SEE AGAIN \u2728' : (gift1Done ? 'OPEN NOW \u{1F381}' : 'LOCKED \u{1F512}')}
              </button>
            </div>
          </div>

          <!-- ================= GIFT 3 ================= -->
          <div class="aesthetic-gift-card ${gift3Done ? 'card-opened' : (gift2Done ? 'card-unlocked inviting-pulse' : 'card-locked')}" id="gift-card-3" data-gift="3">
            <!-- Pinned Vintage Washi Tape -->
            <img src="assets/scrapbook/scrapbook_oil_paint_swatch.png" class="gift-card-washi" alt="tape" />

            <div class="gift-box-stage">
              <img src="assets/images/pink_gift_box.png" alt="Gift 3 Box" class="gift-box-3d-img" />
              
              <!-- Opening VFX Burst Layer -->
              <div class="gift-opening-burst" id="burst-3">
                <div class="gift-burst-aura"></div>
                <div class="gift-burst-sparkles">
                  <span>\u2728</span><span>\u{1F496}</span><span>\u2B50</span><span>\u{1F338}</span><span>\u2728</span>
                </div>
              </div>

              ${gift3Done ? '<span class="gift-status-badge badge-done">\u2705 OPENED</span>' : (gift2Done ? '<span class="gift-status-badge badge-new">\u2728 UNLOCKED</span>' : '<span class="gift-status-badge badge-lock">\u{1F512} LOCKED</span>')}
            </div>

            <div class="gift-card-info">
              <div class="gift-mini-companion"><img src="gifs/peach-loves-goma-peach-and-goma.gif" alt="" loading="lazy" /><span>FOR YOU · 03</span></div><h3 class="gift-card-name">The words</h3><p class="gift-personal-note">Sealed with a little piece of my heart.</p>
              <p class="gift-card-desc">\u{1F48C} Heartfelt Birthday Wish Letter</p>
              <button class="ref-btn gift-card-action-btn" ${!gift2Done ? 'disabled' : ''}>
                ${gift3Done ? 'SEE AGAIN \u2728' : (gift2Done ? 'OPEN NOW \u{1F381}' : 'LOCKED \u{1F512}')}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.attachEvents(container);
    return container;
  }

  triggerGiftOpenAnimation(cardElement, giftNumber, targetPage) {
    if (this.isOpeningAny) return;
    this.isOpeningAny = true;

    soundManager.playGiftOpenSound();
    confettiEngine.burst({ count: 60 });

    cardElement.classList.add('gift-card-opening');

    setTimeout(() => {
      this.isOpeningAny = false;
      this.app.navigateTo(targetPage);
    }, 850);
  }

  attachEvents(container) {
    const card1 = container.querySelector('#gift-card-1');
    const card2 = container.querySelector('#gift-card-2');
    const card3 = container.querySelector('#gift-card-3');

    card1.addEventListener('click', () => {
      if (!this.app.openedGifts[1]) {
        soundManager.playTap();
        this.app.navigateTo('gift1-game');
      } else {
        // Already opened before, direct access
        this.triggerGiftOpenAnimation(card1, 1, 'gift1-memories');
      }
    });

    card2.addEventListener('click', () => {
      if (this.app.openedGifts[1]) {
        if (!this.app.openedGifts[2]) {
          soundManager.playTap();
          this.app.navigateTo('gift2-game');
        } else {
          this.triggerGiftOpenAnimation(card2, 2, 'special-things');
        }
      } else {
        soundManager.playErrorSound();
        card2.classList.add('shake-error');
        setTimeout(() => card2.classList.remove('shake-error'), 500);
      }
    });

    card3.addEventListener('click', () => {
      if (this.app.openedGifts[2]) {
        if (!this.app.openedGifts[3]) {
          soundManager.playTap();
          this.app.navigateTo('gift3-game');
        } else {
          this.triggerGiftOpenAnimation(card3, 3, 'letter');
        }
      } else {
        soundManager.playErrorSound();
        card3.classList.add('shake-error');
        setTimeout(() => card3.classList.remove('shake-error'), 500);
      }
    });

    // Mascot Easter Egg Audio
    const hubShinchan = container.querySelector('.hub-header-shinchan');
    if (hubShinchan) {
      hubShinchan.style.cursor = 'pointer';
      hubShinchan.title = "Tap Shinchan! 😄";
      hubShinchan.addEventListener('click', () => {
        soundManager.playShinchanLaugh();
        hubShinchan.classList.add('inviting-pulse');
        setTimeout(() => hubShinchan.classList.remove('inviting-pulse'), 800);
      });
    }

    const hubCat = container.querySelector('.hub-header-cat');
    if (hubCat) {
      hubCat.style.cursor = 'pointer';
      hubCat.title = "Tap Cats! 🐱";
      hubCat.addEventListener('click', () => {
        soundManager.playCuteGiggle();
        hubCat.classList.add('inviting-pulse');
        setTimeout(() => hubCat.classList.remove('inviting-pulse'), 800);
      });
    }
  }

  cleanup() {}
}