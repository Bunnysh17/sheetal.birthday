/**
 * ⏳ Page 11: Our Story Timeline Screen
 * Vertical timeline with heart markers, milestone stories, and polaroids.
 */

import { birthdayConfig } from '../../config.js';
import { soundManager } from '../audio.js';

export class TimelinePage {
  constructor(app) {
    this.app = app;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'page-view';

    container.innerHTML = `
      <div class="timeline-page-wrap">
        <div class="cute-badge">
          <span>📖</span> Chapter 06
        </div>

        <h1 class="ref-heading">${birthdayConfig.timelineHeading || "A few little moments..."}</h1>
        <p style="text-align: center; color: var(--text-muted); font-size: 1.15rem; margin-bottom: 12px;">How ordinary days became our greatest adventures 🌸</p>

        <!-- Vertical Timeline Track -->
        <div class="story-timeline-track">
          ${birthdayConfig.timeline.map(item => `
            <div class="timeline-item">
              <!-- Heart Node Marker -->
              <div class="timeline-heart-node">
                ${item.icon || '💖'}
              </div>

              <!-- Content Card -->
              <div class="timeline-content-card">
                <span class="timeline-date">${item.date}</span>
                <h3 class="timeline-title">${item.title}</h3>
                <p class="timeline-desc">${item.description}</p>
                ${item.image ? `
                  <div class="timeline-polaroid" data-img="${item.video || item.image}" data-is-video="${item.video ? 'true' : 'false'}">
                    <img 
                      src="${item.image}" 
                      alt="${item.title}" 
                      style="width: 100%; height: auto; display: block; cursor: pointer; border-radius: 6px;"
                      onerror="this.src='assets/images/story1.svg'"
                    />
                  </div>
                ` : ''}
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Trigger to Final Secret Surprise -->
        <button class="ref-btn" id="trigger-final-surprise-btn" style="margin-top: 18px; font-size: 1.4rem;">
          ${birthdayConfig.finalTriggerButton || "ONE LAST THING... 🎁"}
        </button>
      </div>
    `;

    // Polaroid lightbox triggers
    const polaroids = container.querySelectorAll('.timeline-polaroid');
    polaroids.forEach(p => {
      p.addEventListener('click', () => {
        soundManager.playTap();
        const img = p.dataset.img;
        this.app.openLightbox(img, "Our Story Memory ✨");
      });
    });

    container.querySelector('#trigger-final-surprise-btn').addEventListener('click', () => {
      soundManager.playSuccessSound();
      this.app.navigateTo('final-surprise');
    });

    return container;
  }

  cleanup() {}
}
