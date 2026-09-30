/**
 * 📸 Gift 3: Moments I Cherish With You (Exact match with sample video 00:28 - 00:31)
 * Hanging clothesline string with pinned polaroid memory photos, floating ribbons,
 * and bottom cloud doodle banner with "★ Moments I Cherish With You ★" + navigation >> button!
 */

import { birthdayConfig } from '../../config.js';
import { soundManager } from '../audio.js';

export class PhotoStringPage {
  constructor(app) {
    this.app = app;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'page-view photo-string-view';

    const memories = (birthdayConfig.memories && birthdayConfig.memories.length >= 4)
      ? birthdayConfig.memories.slice(0, 4)
      : [
          { image: 'assets/images/photo1.svg', caption: 'Our First Date 💕', rot: -4 },
          { image: 'assets/images/photo2.svg', caption: 'Sweet Moments ✨', rot: 3 },
          { image: 'assets/images/photo3.svg', caption: 'Silly Laughter 😂', rot: -2 },
          { image: 'assets/images/photo4.svg', caption: 'Forever & Always ❤️', rot: 4 }
        ];

    container.innerHTML = `
      <div class="photo-string-card stagger-1">
        <!-- Floating Ribbons Decor -->
        <div class="hanging-ribbons-decor" aria-hidden="true">
          <span class="ribbon-streamer r1">〰️</span>
          <span class="ribbon-streamer r2">〰️</span>
          <span class="ribbon-streamer r3">〰️</span>
        </div>

        <!-- Clothesline Wire & Clothespins with Hanging Polaroids -->
        <div class="clothesline-container stagger-2">
          <!-- The Wire String -->
          <div class="clothesline-wire"></div>

          <!-- 4 Hanging Polaroid Photos -->
          <div class="hanging-polaroids-row">
            ${memories.map((m, idx) => `
              <div class="hanging-polaroid-item item-${idx + 1}" style="--item-rot: ${m.rot || (idx % 2 === 0 ? -3 : 3)}deg;">
                <!-- Clothespin Peg -->
                <div class="clothespin-peg"></div>
                <!-- Polaroid Frame -->
                <div class="polaroid-frame-box">
                  <div class="polaroid-photo-area">
                    <img src="${m.image || m.video || 'assets/images/photo1.svg'}" alt="Memory ${idx + 1}" class="polaroid-img" />
                  </div>
                  <div class="polaroid-caption-small">${m.caption || 'Cherished Memory'}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Bottom Cloud Doodle Banner Section -->
        <div class="cloud-banner-section stagger-3">
          <!-- White Fluffy Cloud Base -->
          <div class="cloud-base-shape">
            <!-- Doodles on Cloud -->
            <span class="doodle-item doodle-forever">forever ♡</span>
            <span class="doodle-item doodle-love">love ♪</span>
            <span class="doodle-item doodle-sparks">✨ ★ ✨</span>

            <!-- Center Purple Ribbon Banner -->
            <div class="moments-ribbon-banner">
              <span class="banner-star">★</span>
              <span class="banner-text">Moments I Cherish With You</span>
              <span class="banner-star">★</span>
            </div>
          </div>
        </div>

        <!-- Bottom Navigation Controls -->
        <div class="camera-nav-bottom">
          <button class="nav-arrow-pill-btn" id="next-to-letter-btn" title="Next to Letter">
            <span>&gt;&gt;</span>
          </button>
        </div>
      </div>
    `;

    this.attachEvents(container);
    return container;
  }

  attachEvents(container) {
    const nextBtn = container.querySelector('#next-to-letter-btn');
    nextBtn.addEventListener('click', () => {
      soundManager.playTap();
      this.app.openedGifts = this.app.openedGifts || {};
      this.app.openedGifts[3] = true;
      this.app.navigateTo('letter');
    });
  }

  cleanup() {}
}
