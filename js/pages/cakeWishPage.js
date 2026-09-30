/**
 * 🎂 Gift 2: MAKE A WISH Interactive Cake Screen (Exact match with sample video 00:21 - 00:25)
 * Deep crimson gradient background, "MAKE A WISH", "blow your candle" -> "click on cake" interactive flow,
 * burning candle flame, smoke wisp, star balloon bunch, and navigation >> button!
 */

import { birthdayConfig } from '../../config.js';
import { soundManager } from '../audio.js';
import { confettiEngine } from '../confetti.js';

export class CakeWishPage {
  constructor(app) {
    this.app = app;
    this.isBlown = false;
    this.isCut = false;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'page-view cake-wish-view';

    container.innerHTML = `
      <div class="cake-wish-card stagger-1">
        <!-- Left Side: MAKE A WISH + Dynamic Arrow Instruction + Wish Text -->
        <div class="cake-wish-left-col stagger-2">
          <h1 class="make-wish-title">
            MAKE<br/>A WISH
          </h1>

          <!-- Dynamic Arrow Instruction ("blow your candle" -> "click on cake") -->
          <div class="wish-arrow-instruction" id="wish-arrow-box">
            <span class="instruction-label" id="instruction-label">blow your candle</span>
            <svg class="hand-drawn-arrow-svg" viewBox="0 0 60 40" width="50" height="35" fill="none">
              <path d="M5 20 Q30 5 48 18 M40 8 L50 20 L35 24" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>

          <p class="wish-prayer-text">
            I pray that all your dreams come true and that you are always happy... I truly want to see you smile everyday.
          </p>
        </div>

        <!-- Center: Aesthetic Birthday Cake with Candle & Interactive Cutting -->
        <div class="cake-wish-center-col stagger-2">
          <div class="aesthetic-cake-wrap" id="aesthetic-cake-wrap">
            <svg class="aesthetic-cake-svg" viewBox="0 0 280 260" width="280" height="260">
              <defs>
                <filter id="candleGlowFilter" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="5" result="glow" />
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <radialGradient id="cakePlateShine" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="#FFFFFF"/>
                  <stop offset="90%" stop-color="#CBD5E1"/>
                </radialGradient>
              </defs>

              <!-- Cake Base Platter -->
              <ellipse cx="140" cy="225" rx="120" ry="18" fill="url(#cakePlateShine)" stroke="#94A3B8" stroke-width="1.5" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.3))"/>
              <ellipse cx="140" cy="220" rx="105" ry="14" fill="#F8FAFC"/>

              <!-- Bottom Tier: Soft Frosted White / Ivory -->
              <path d="M45 155 L45 195 C45 210 90 222 140 222 C190 222 235 210 235 195 L235 155 Z" fill="#FDFBF7" stroke="#E2DCD5" stroke-width="1.5"/>
              <ellipse cx="140" cy="155" rx="95" ry="18" fill="#FFFFFF" stroke="#E2DCD5" stroke-width="1.5"/>
              
              <!-- Cream Piping Scallops on Bottom Rim -->
              <path d="M45 158 Q65 174 85 158 Q110 176 140 156 Q170 176 195 158 Q215 174 235 158" fill="none" stroke="#F1ECE4" stroke-width="6" stroke-linecap="round"/>

              <!-- Top Tier: Pearl White Aesthetic Cake Body -->
              <g class="cake-top-tier" id="cake-clickable-body" style="cursor: pointer;">
                <path d="M70 100 L70 148 C70 160 102 168 140 168 C178 168 210 160 210 148 L210 100 Z" fill="#FFFFFF" stroke="#E2DCD5" stroke-width="1.5"/>
                <ellipse cx="140" cy="100" rx="70" ry="16" fill="#FFFDF9" stroke="#E2DCD5" stroke-width="1.5"/>

                <!-- Top Pearl Swirls -->
                <path d="M70 103 Q90 118 110 102 Q130 118 150 102 Q170 118 190 102 Q200 112 210 103" fill="none" stroke="#FAF6EE" stroke-width="6" stroke-linecap="round"/>

                <!-- White Strawberries / Pearl Cherries on Top -->
                <g class="white-strawberries">
                  <circle cx="95" cy="94" r="8.5" fill="#FFF5EB" stroke="#D4C8B8" stroke-width="1.2"/>
                  <circle cx="140" cy="88" r="8.5" fill="#FFF5EB" stroke="#D4C8B8" stroke-width="1.2"/>
                  <circle cx="185" cy="94" r="8.5" fill="#FFF5EB" stroke="#D4C8B8" stroke-width="1.2"/>
                  <circle cx="115" cy="96" r="7" fill="#FBF0E4" stroke="#D4C8B8" stroke-width="1"/>
                  <circle cx="165" cy="96" r="7" fill="#FBF0E4" stroke="#D4C8B8" stroke-width="1"/>
                </g>
              </g>

              <!-- Cut Cake Slice (Slides out on click) -->
              <g class="wish-cake-slice" id="wish-cake-slice" style="opacity: 0; transform-origin: center;">
                <path d="M140 100 L185 130 L175 180 L135 152 Z" fill="#FFF0F5" stroke="#C83838" stroke-width="1.5"/>
                <circle cx="160" cy="135" r="4" fill="#C83838"/>
              </g>

              <!-- Center Tall Elegant Birthday Candle -->
              <g class="interactive-candle" id="interactive-candle" style="cursor: pointer;">
                <!-- Candle Stick -->
                <rect x="136" y="38" width="8" height="52" rx="2.5" fill="#FFFFFF" stroke="#B0A494" stroke-width="1"/>
                <line x1="140" y1="38" x2="140" y2="30" stroke="#333333" stroke-width="1.8" stroke-linecap="round"/>

                <!-- Glowing Candle Flame -->
                <g class="flame-element" id="candle-flame-group" filter="url(#candleGlowFilter)">
                  <!-- Outer Warm Glow -->
                  <circle cx="140" cy="22" r="14" fill="rgba(255, 220, 100, 0.45)"/>
                  <!-- Outer Flame -->
                  <path d="M140 8 C132 18 134 26 140 28 C146 26 148 18 140 8 Z" fill="#FFD000"/>
                  <!-- Core Inner Flame -->
                  <path d="M140 14 C136 20 137 25 140 27 C143 25 144 20 140 14 Z" fill="#FFFFFF"/>
                </g>

                <!-- Smoke Effect on Blow -->
                <g class="candle-smoke-puff" id="candle-smoke" style="opacity: 0;">
                  <circle cx="140" cy="20" r="4" fill="rgba(255, 255, 255, 0.8)"/>
                  <circle cx="136" cy="12" r="6" fill="rgba(240, 240, 240, 0.6)"/>
                  <circle cx="143" cy="4" r="8" fill="rgba(220, 220, 220, 0.4)"/>
                </g>
              </g>
            </svg>
          </div>
        </div>

        <!-- Right Side: Sweet Birthday Note & Metallic Star Balloons Bunch -->
        <div class="cake-wish-right-col stagger-2">
          <p class="sweet-appreciation-text">
            Your smile makes every space feel brighter, and your laugh feels like a warm day. You're gentle, caring, and such a joy to be around. I'm really glad our paths crossed - you deserve all the good things.
          </p>

          <!-- Metallic Star Balloons Bunch (Matching Sample Video) -->
          <div class="star-balloons-bunch" aria-hidden="true">
            <span class="star-balloon sb-1">⭐</span>
            <span class="star-balloon sb-2">⭐</span>
            <span class="star-balloon sb-3">⭐</span>
          </div>
        </div>

        <!-- Bottom Navigation Controls -->
        <div class="camera-nav-bottom">
          <button class="nav-arrow-pill-btn" id="next-to-gallery-btn" title="Next Gift">
            <span>&gt;&gt;</span>
          </button>
        </div>
      </div>
    `;

    this.attachEvents(container);
    return container;
  }

  attachEvents(container) {
    const candle = container.querySelector('#interactive-candle');
    const cakeBody = container.querySelector('#cake-clickable-body');
    const flame = container.querySelector('#candle-flame-group');
    const smoke = container.querySelector('#candle-smoke');
    const arrowBox = container.querySelector('#wish-arrow-box');
    const label = container.querySelector('#instruction-label');
    const slice = container.querySelector('#wish-cake-slice');
    const nextBtn = container.querySelector('#next-to-gallery-btn');

    // Blow candle interaction
    const handleBlowCandle = () => {
      if (this.isBlown) return;
      this.isBlown = true;
      soundManager.playBlowSound();

      flame.classList.add('flame-blow-out');
      smoke.classList.add('smoke-rise');

      // Update instruction to "click on cake" with arrow pointing down
      setTimeout(() => {
        label.textContent = "click on cake";
        arrowBox.classList.add('point-to-cake');
      }, 350);
    };

    candle.addEventListener('click', handleBlowCandle);
    arrowBox.addEventListener('click', handleBlowCandle);

    // Cut cake interaction
    cakeBody.addEventListener('click', () => {
      if (!this.isBlown) {
        handleBlowCandle();
        return;
      }
      if (this.isCut) return;
      this.isCut = true;

      soundManager.playSliceSound();
      slice.classList.add('slice-slide-out');

      setTimeout(() => {
        soundManager.playCelebrationFanfare();
        confettiEngine.fireCannons();
        label.textContent = "happy birthday! ❤️";
      }, 350);
    });

    nextBtn.addEventListener('click', () => {
      soundManager.playTap();
      this.app.openedGifts = this.app.openedGifts || {};
      this.app.openedGifts[2] = true;
      this.app.navigateTo('photo-string');
    });
  }

  cleanup() {}
}
