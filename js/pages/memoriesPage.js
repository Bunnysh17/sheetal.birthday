/**
 * 📸 Page 7: Our Memories Screen (Scrapbook Gallery & Video Reels)
 * Tilted polaroids with handwritten captions, video badges, stickers, and interactive lightbox.
 */

import { birthdayConfig } from '../../config.js';
import { soundManager } from '../audio.js';

export class MemoriesPage {
  constructor(app) {
    this.app = app;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'page-view';

    container.innerHTML = `
      <div class="memories-container">
        <div class="cute-badge">
          <span>📷</span> Chapter 02
        </div>

        <h1 class="ref-heading">OUR MEMORIES ❤️</h1>
        <p style="text-align: center; color: var(--text-muted); font-size: 1.15rem; margin-bottom: 8px;">Click on any photo or video reel to play our memories ✨</p>

        <!-- Scrapbook Grid of Polaroids -->
        <div class="scrapbook-grid" id="scrapbook-grid">
          ${birthdayConfig.memories.map((m, idx) => `
            <div 
              class="polaroid-card ${m.video ? 'is-video-card' : ''}" 
              style="transform: rotate(${m.rotation || (idx % 2 === 0 ? -2 : 3)}deg);"
              data-media="${m.video || m.image}"
              data-is-video="${m.video ? 'true' : 'false'}"
              data-caption="${m.caption}"
            >
              <!-- Cute Washi Tape on top -->
              <div class="washi-tape" style="width: 70px; height: 18px; top: -8px;"></div>

              <div class="polaroid-img-wrap" style="position: relative;">
                <img 
                  src="${m.image}" 
                  alt="${m.caption}" 
                  class="polaroid-img" 
                  loading="lazy"
                  onerror="this.src='assets/images/photo${(idx % 6) + 1}.svg'"
                />
                ${m.video ? `
                  <div class="video-play-badge">
                    <span>▶</span>
                  </div>
                ` : ''}
              </div>

              <p class="polaroid-caption">${m.caption}</p>
              ${m.date ? `<span class="polaroid-date-tag">🗓️ ${m.date} ${m.video ? '• 🎬 Video' : ''}</span>` : ''}
            </div>
          `).join('')}
        </div>

        <!-- Next Button -->
        <button class="ref-btn" id="next-to-special-btn" style="margin-top: 20px;">
          WHAT MAKES YOU SPECIAL 💖
        </button>
      </div>
    `;

    // Attach click events for lightbox modal (supporting both photos and videos)
    const cards = container.querySelectorAll('.polaroid-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        soundManager.playTap();
        const media = card.dataset.media;
        const isVideo = card.dataset.isVideo === 'true';
        const caption = card.dataset.caption;
        this.app.openLightbox(media, caption, isVideo);
      });
    });

    container.querySelector('#next-to-special-btn').addEventListener('click', () => {
      soundManager.playTap();
      this.app.navigateTo('special-things');
    });

    return container;
  }

  cleanup() {}
}
