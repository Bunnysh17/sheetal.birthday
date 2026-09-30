/**
 * 📷 Gift 1: Digital Camera & Birthday Wishes Screen (Exact match with sample video 00:17 - 00:20)
 * Pink grid background, lace top with ribbon, vintage digital camera with viewfinder photo,
 * heartfelt surrounding text, 3D "Happy Birthday" title, and navigation >> button!
 */

import { birthdayConfig } from '../../config.js';
import { soundManager } from '../audio.js';

export class CameraWishPage {
  constructor(app) {
    this.app = app;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'page-view camera-wish-view';

    const photoSrc = birthdayConfig.profilePhoto || 'assets/images/penguin_tulips.png';

    container.innerHTML = `
      <div class="camera-wish-card stagger-1">
        <!-- Top Lace Ruffle with Ribbon -->
        <div class="lace-top-banner" aria-hidden="true">
          <div class="lace-ruffle-edge"></div>
          <div class="lace-bow-ribbon">🎀</div>
        </div>

        <!-- Main Content Grid -->
        <div class="camera-content-layout">
          <!-- Left Text Column -->
          <div class="camera-side-text camera-text-left stagger-2">
            <p class="camera-para-text">
              Happy birthday my love. You bring a soft kind of magic to every day, and I hope today wraps you in calm moments, warm laughs, and the sweetest kind of peace.
            </p>
          </div>

          <!-- Center: Vintage Digital Camera with Photo Viewfinder -->
          <div class="vintage-camera-center stagger-2">
            <div class="camera-device-wrap">
              <img 
                src="assets/images/vintage_camera.png" 
                alt="Vintage Digital Camera" 
                class="vintage-camera-body"
              />
              <!-- LCD Screen Viewfinder Photo Inside Camera Screen -->
              <div class="camera-screen-viewfinder">
                <img 
                  src="${photoSrc}" 
                  alt="Birthday Memory" 
                  class="viewfinder-photo"
                />
                <span class="rec-dot-indicator">● REC</span>
              </div>
            </div>

            <!-- 3D Chubby "Happy Birthday" Text Below Camera -->
            <div class="happy-bday-3d-title stagger-3">
              <span class="bday-word-happy">Happy</span>
              <span class="bday-word-bday">Birthday</span>
            </div>
          </div>

          <!-- Right Text Column -->
          <div class="camera-side-text camera-text-right stagger-2">
            <p class="camera-para-text">
              May this year be full of little wins, warm conversations and moments that remind just how loved you are.
            </p>
          </div>
        </div>

        <!-- Bottom Navigation Controls -->
        <div class="camera-nav-bottom">
          <button class="nav-arrow-pill-btn" id="next-gift-btn" title="Next Gift">
            <span>&gt;&gt;</span>
          </button>
        </div>
      </div>
    `;

    this.attachEvents(container);
    return container;
  }

  attachEvents(container) {
    const nextBtn = container.querySelector('#next-gift-btn');
    nextBtn.addEventListener('click', () => {
      soundManager.playTap();
      // Navigate to Gift 2 (Cake Screen)
      this.app.openedGifts = this.app.openedGifts || {};
      this.app.openedGifts[1] = true;
      this.app.navigateTo('cake-wish');
    });
  }

  cleanup() {}
}
