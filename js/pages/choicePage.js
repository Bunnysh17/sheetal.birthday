import { soundManager } from '../audio.js';
import { birthdayConfig } from '../../config.js';

export class ChoicePage {
  constructor(app) { this.app = app; }

  render() {
    const container = document.createElement('div');
    container.className = 'page-view birthday-wish-view';

    container.innerHTML = `
      <section class="birthday-wish-card" aria-labelledby="wish-title">
        <img src="assets/scrapbook/scrapbook_pink_gold_brushstroke.png" class="wish-decor wish-tape" alt="" aria-hidden="true" />
        <img src="assets/scrapbook/scrapbook_swallowtail_butterfly.png" class="wish-decor wish-butterfly" alt="" aria-hidden="true" />
        <img src="assets/scrapbook/scrapbook_blue_forgetmenot.png" class="wish-decor wish-flowers-left" alt="" aria-hidden="true" />
        <img src="assets/scrapbook/scrapbook_lavender_bouquet.png" class="wish-decor wish-lavender" alt="" aria-hidden="true" />
        <img src="assets/scrapbook/scrapbook_postage_stamp_heart.png" class="wish-decor wish-stamp" alt="" aria-hidden="true" />

        <span class="wish-eyebrow stagger-1">BEFORE THE SURPRISES BEGIN</span>
        <h1 class="wish-title stagger-1" id="wish-title">A little birthday wish<br><em>just for you.</em></h1>
        <p class="wish-subtitle stagger-1">Not the candle kind yet — just a tiny wish from the heart.</p>

        <div class="wish-centerpiece stagger-2">
          <div style="position: relative; width: min(100%, 300px); margin: auto; transform: rotate(-3deg); transition: transform 0.3s ease;" id="wish-photo-container">
            <div style="border-radius: 12px; border: 6px solid #fff; overflow: hidden; aspect-ratio: 3/4; background: #f0eaeb; filter: drop-shadow(0 10px 18px rgba(74,50,43,.15));">
              <img src="${birthdayConfig.wishPhoto || 'assets/gallery/upload_1790756322098.png'}" alt="A beautiful moment" id="wish-photo-img" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
            </div>
          </div>
          
          <div class="wish-paper-note">
            <span class="wish-note-small">I hope this year gives you</span>
            <p>more reasons to smile,<br>more peace on heavy days,<br>and more beautiful moments than you can count.</p>
            <span class="wish-note-heart">♡</span>
          </div>
        </div>

        <div class="wish-three-notes stagger-3" aria-label="Three birthday wishes">
          <div><span>✦</span><strong>soft days</strong><small>when life feels a little too loud</small></div>
          <div><span>♡</span><strong>happy moments</strong><small>the kind you remember without trying</small></div>
          <div><span>✿</span><strong>good surprises</strong><small>the kind you secretly hoped for</small></div>
        </div>

        <p class="wish-prompt stagger-3">Now make one tiny wish for yourself too.</p>
        <button class="ref-btn inviting-pulse wish-begin-btn stagger-3" id="wish-begin-btn">
          I MADE MY WISH ✨
        </button>
      </section>`;

    container.querySelector('#wish-begin-btn').addEventListener('click', () => {
      soundManager.playSuccessSound();
      this.app.navigateTo('cake');
    });

    this.loadWishPhoto(container);

    return container;
  }

  async loadWishPhoto(container) {
    try {
      const response = await fetch('photo_adjustments.json?t=' + Date.now());
      if (response.ok) {
        const data = await response.json();
        if (data.wish_photo) {
          this.wishPhotoConfig = data.wish_photo;
          this.applyWishPhoto(container);
        }
      }
    } catch (e) {
      this.wishPhotoConfig = { scale: 1, x: 0, y: 0, image: 'assets/gallery/upload_1790756322098.png' };
      this.applyWishPhoto(container);
    }
  }

  applyWishPhoto(container) {
    if (!this.wishPhotoConfig) return;
    const img = container.querySelector('#wish-photo-img');
    if (img) {
      img.src = this.wishPhotoConfig.image || img.src;
      const s = this.wishPhotoConfig.scale || 1;
      const x = this.wishPhotoConfig.x || 0;
      const y = this.wishPhotoConfig.y || 0;
      img.style.transform = `scale(${s}) translate(${x}px, ${y}px)`;
    }
  }

  cleanup() {}
}
