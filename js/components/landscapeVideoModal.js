/**
 * 🎬 Forced Landscape Fullscreen Video Modal Component
 * 
 * Guarantees a cinematic widescreen landscape video playback experience on mobile devices,
 * even when the phone has auto-rotate locked or is held in portrait mode.
 */

import { soundManager } from '../audio.js';
import { confettiEngine } from '../confetti.js';

let activeModal = null;

export class LandscapeVideoModal {
  constructor(options = {}) {
    this.src = options.src || '';
    this.title = options.title || 'Special Video ❤️';
    this.currentTime = options.currentTime || 0;
    this.autoplay = options.autoplay !== false;
    this.onEnded = options.onEnded || null;
    this.onClose = options.onClose || null;
    this.onTimeUpdate = options.onTimeUpdate || null;

    this.dom = null;
    this.video = null;
    this.controlsTimer = null;
    this.isForcedRotated = true;
    this.isDraggingSeek = false;
  }

  formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  checkShouldRotate() {
    // If screen height is greater than width, device is in portrait
    return window.innerHeight > window.innerWidth;
  }

  updateOrientationClass() {
    if (!this.dom) return;
    const isPortrait = this.checkShouldRotate();
    if (isPortrait && this.isForcedRotated) {
      this.dom.classList.add('force-rotate');
    } else {
      this.dom.classList.remove('force-rotate');
    }
  }

  showControls() {
    if (!this.dom) return;
    this.dom.classList.remove('controls-hidden');
    clearTimeout(this.controlsTimer);

    if (this.video && !this.video.paused) {
      this.controlsTimer = setTimeout(() => {
        if (this.video && !this.video.paused) {
          this.dom.classList.add('controls-hidden');
        }
      }, 2500);
    }
  }

  showCenterIcon(icon) {
    const feedback = this.dom?.querySelector('#fl-center-feedback');
    const iconEl = this.dom?.querySelector('#fl-center-icon');
    if (!feedback || !iconEl) return;

    iconEl.textContent = icon;
    feedback.classList.remove('fl-pulse-anim');
    void feedback.offsetWidth; // Force reflow
    feedback.classList.add('fl-pulse-anim');
  }

  open() {
    // Remove any existing modal
    if (activeModal) {
      activeModal.close(false);
    }
    activeModal = this;

    // Suppress app BGM
    soundManager.suppressBGM(true);

    // Create modal DOM
    const overlay = document.createElement('div');
    overlay.className = 'forced-landscape-overlay';
    overlay.id = 'forced-landscape-overlay';

    overlay.innerHTML = `
      <div class="landscape-video-container" id="fl-container">
        <!-- Top Navigation Bar -->
        <div class="landscape-top-bar" id="fl-top-bar">
          <div class="landscape-title-tag">
            <span class="landscape-title-icon">🎬</span>
            <span class="landscape-title-text">${this.title}</span>
          </div>
          <div class="landscape-top-actions">
            <button class="landscape-action-btn" id="fl-rotate-btn" title="Toggle Landscape Rotation">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
              </svg>
              <span>Rotate</span>
            </button>
            <button class="landscape-action-btn landscape-close-action" id="fl-close-btn" title="Close Fullscreen Video">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              <span>Exit</span>
            </button>
          </div>
        </div>

        <!-- Center Video Box -->
        <div class="landscape-video-box" id="fl-video-box">
          <video id="fl-video" src="${this.src}" playsinline webkit-playsinline preload="auto"></video>
          
          <!-- Tap Center Feedback -->
          <div class="landscape-center-feedback" id="fl-center-feedback">
            <span id="fl-center-icon">▶</span>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    document.body.classList.add('forced-landscape-body-locked');
    this.dom = overlay;
    this.video = overlay.querySelector('#fl-video');

    // Trigger initial orientation class
    this.updateOrientationClass();

    // Try native orientation lock & fullscreen where supported
    this.tryNativeFullscreen();

    // Wire events
    this.bindEvents();

    // Set initial time & start playback
    if (this.currentTime > 0) {
      this.video.currentTime = this.currentTime;
    }

    if (this.autoplay) {
      const playPromise = this.video.play();
      if (playPromise) {
        playPromise.catch(() => {});
      }
    }

    // Auto-hide controls timer
    this.showControls();
  }

  async tryNativeFullscreen() {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen({ navigationUI: 'hide' }).catch(() => {});
      } else if (document.documentElement.webkitRequestFullscreen) {
        await document.documentElement.webkitRequestFullscreen();
      }
    } catch (e) {}

    try {
      if (screen.orientation && screen.orientation.lock) {
        await screen.orientation.lock('landscape').catch(() => {});
      }
    } catch (e) {}
  }

  async exitNativeFullscreen() {
    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        await document.exitFullscreen().catch(() => {});
      } else if (document.webkitFullscreenElement && document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    } catch (e) {}

    try {
      if (screen.orientation && screen.orientation.unlock) {
        screen.orientation.unlock();
      }
    } catch (e) {}
  }

  bindEvents() {
    const video = this.video;
    const overlay = this.dom;
    const rotateBtn = overlay.querySelector('#fl-rotate-btn');
    const closeBtn = overlay.querySelector('#fl-close-btn');
    const videoBox = overlay.querySelector('#fl-video-box');

    // Video play/pause events
    video.addEventListener('play', () => {
      this.showControls();
    });

    video.addEventListener('pause', () => {
      this.showControls();
    });

    video.addEventListener('timeupdate', () => {
      if (this.onTimeUpdate) {
        this.onTimeUpdate(video.currentTime);
      }
    });

    video.addEventListener('ended', () => {
      this.showControls();
      confettiEngine.burst({ count: 120 });
      if (this.onEnded) {
        this.onEnded();
      }
    });

    // Tap video to toggle play/pause & show controls
    videoBox.addEventListener('click', (e) => {
      if (e.target.closest('#fl-center-feedback')) return;
      if (video.paused) {
        video.play().catch(() => {});
        this.showCenterIcon('▶');
      } else {
        video.pause();
        this.showCenterIcon('❚❚');
      }
      this.showControls();
    });

    // Rotate button toggle
    rotateBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      soundManager.playTap();
      this.isForcedRotated = !this.isForcedRotated;
      this.updateOrientationClass();
      this.showControls();
    });

    // Close button
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      soundManager.playTap();
      this.close();
    });

    // Orientation / Resize listener
    this.onResize = () => {
      this.updateOrientationClass();
    };
    window.addEventListener('resize', this.onResize);
    window.addEventListener('orientationchange', this.onResize);

    // Escape key to close
    this.onKeyDown = (e) => {
      if (e.key === 'Escape') {
        this.close();
      }
    };
    window.addEventListener('keydown', this.onKeyDown);
  }

  close(triggerCallback = true) {
    if (!this.dom) return;

    clearTimeout(this.controlsTimer);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('orientationchange', this.onResize);
    window.removeEventListener('keydown', this.onKeyDown);

    const currentTime = this.video ? this.video.currentTime : 0;
    if (this.video) {
      this.video.pause();
      this.video.src = '';
      this.video.load();
    }

    this.exitNativeFullscreen();

    // Fade out animation
    this.dom.style.opacity = '0';
    this.dom.style.transform = 'scale(0.96)';
    this.dom.style.transition = 'opacity 0.25s ease, transform 0.25s ease';

    setTimeout(() => {
      this.dom?.remove();
      this.dom = null;
      document.body.classList.remove('forced-landscape-body-locked');
      soundManager.suppressBGM(false);

      if (triggerCallback && this.onClose) {
        this.onClose(currentTime);
      }
    }, 250);

    if (activeModal === this) {
      activeModal = null;
    }
  }
}

/**
 * Convenience Helper Function
 */
export function openLandscapeVideo(options) {
  const modal = new LandscapeVideoModal(options);
  modal.open();
  return modal;
}
