/**
 * 💖 Page 10: Heart Photo Collage Screen
 * Heart-shaped photo mosaic layout with customizable date badge and doodle frame.
 */

import { birthdayConfig } from '../../config.js';
import { soundManager } from '../audio.js';

export class CollagePage {
  constructor(app) {
    this.app = app;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'page-view';

    const photos = birthdayConfig.collagePhotos || [
      "assets/images/photo1.svg",
      "assets/images/photo2.svg",
      "assets/images/photo3.svg",
      "assets/images/photo4.svg",
      "assets/images/photo5.svg",
      "assets/images/photo6.svg"
    ];

    container.innerHTML = `
      <div class="collage-page-wrap">
        <div class="cute-badge">
          <span>💖</span> Chapter 05
        </div>

        <h1 class="ref-heading">${birthdayConfig.collageHeading || "Will you be my birthday favorite? ❤️"}</h1>
        <p style="text-align: center; color: var(--text-muted); font-size: 1.15rem; margin-bottom: 8px;">A constellation of my favorite smiles ✨</p>

        <!-- Heart Collage Container -->
        <div class="heart-collage-container" id="heart-collage">
          <!-- Top Left -->
          <div class="collage-item" style="transform: rotate(-4deg);" data-img="${photos[0] || photos[0]}">
            <img src="${photos[0] || photos[0]}" alt="Memory 1" onerror="this.src='assets/images/photo1.svg'"/>
          </div>
          <!-- Top Center (Blank or Heart) -->
          <div class="collage-item" style="background: #FFE5EC; display: flex; align-items: center; justify-content: center; transform: scale(0.95);">
            <span style="font-size: 2.2rem; animation: gentlePulse 2s infinite;">💖</span>
          </div>
          <!-- Top Right -->
          <div class="collage-item" style="transform: rotate(4deg);" data-img="${photos[1] || photos[0]}">
            <img src="${photos[1] || photos[0]}" alt="Memory 2" onerror="this.src='assets/images/photo2.svg'"/>
          </div>
          <!-- Middle Left -->
          <div class="collage-item" style="transform: rotate(2deg);" data-img="${photos[2] || photos[0]}">
            <img src="${photos[2] || photos[0]}" alt="Memory 3" onerror="this.src='assets/images/photo3.svg'"/>
          </div>
          <!-- Middle Center -->
          <div class="collage-item" style="transform: scale(1.05);" data-img="${photos[3] || photos[0]}">
            <img src="${photos[3] || photos[0]}" alt="Memory 4" onerror="this.src='assets/images/photo4.svg'"/>
          </div>
          <!-- Middle Right -->
          <div class="collage-item" style="transform: rotate(-3deg);" data-img="${photos[4] || photos[0]}">
            <img src="${photos[4] || photos[0]}" alt="Memory 5" onerror="this.src='assets/images/photo5.svg'"/>
          </div>
          <!-- Bottom Center Area -->
          <div class="collage-item" style="grid-column: 2; grid-row: 3; transform: rotate(1deg);" data-img="${photos[5] || photos[0]}">
            <img src="${photos[5] || photos[0]}" alt="Memory 6" onerror="this.src='assets/images/photo6.svg'"/>
          </div>
        </div>

        <!-- Handwritten Decorative Birthday Date -->
        <div style="font-family: var(--font-chubby); font-size: 1.8rem; font-weight: 700; color: var(--heading-red); background: var(--white); padding: 8px 24px; border-radius: 999px; border: 2.5px dashed var(--btn-red); margin-top: 10px;">
          🗓️ ${birthdayConfig.birthdayDate}
        </div>

        <!-- Next Screen Button -->
        <button class="ref-btn" id="next-to-timeline-btn" style="margin-top: 16px;">
          OUR STORY TIMELINE ⏳
        </button>
      </div>
    `;

    // Lightbox triggers
    const items = container.querySelectorAll('.collage-item[data-img]');
    items.forEach(item => {
      item.addEventListener('click', () => {
        soundManager.playTap();
        const img = item.dataset.img;
        this.app.openLightbox(img, "Forever Cherished Moment 💕");
      });
    });

    container.querySelector('#next-to-timeline-btn').addEventListener('click', () => {
      soundManager.playTap();
      this.app.navigateTo('timeline');
    });

    return container;
  }

  cleanup() {}
}
