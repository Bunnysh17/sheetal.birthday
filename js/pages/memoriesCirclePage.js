import { loadCircleAdjustments, circlePhotoStyle } from '../circlePhotoEditor.js?v=3';
import { soundManager } from '../audio.js';

export class MemoriesCirclePage {
  constructor(app) {
    this.app = app;
    this.photos = [];
    this.currentRotation = 0;
    this.isDragging = false;
    this.startX = 0;
    this.startRotation = 0;
    this.animFrameId = null;
    this.autoRotateSpeed = 0.22; // smooth degrees per frame
    this.isPaused = false;
  }

  async loadGalleryPhotos() {
    // Selected keepsake photos
    this.photos = [
      {
        "src": "assets/gallery/upload_1790536205575.png",
        "zoom": 1,
        "panX": 0,
        "panY": 0,
        "frame": "frame-polaroid"
      },
      {
        "src": "assets/gallery/upload_1790279965330.png",
        "zoom": 1,
        "panX": 0,
        "panY": 0,
        "frame": "frame-polaroid"
      },
      {
        "src": "assets/gallery/photo_jhumka_smile.jpg",
        "zoom": 1,
        "panX": 0,
        "panY": 0,
        "frame": "frame-polaroid"
      },
      {
        "src": "assets/gallery/photo_birthday_hat.jpg",
        "zoom": 1,
        "panX": 0,
        "panY": 0,
        "frame": "frame-polaroid"
      },
      {
        "src": "assets/gallery/upload_1790536283430.png",
        "zoom": 1,
        "panX": 0,
        "panY": 0,
        "frame": "frame-polaroid"
      },
      {
        "src": "assets/gallery/upload_1790631202615.png",
        "zoom": 1,
        "panX": 0,
        "panY": 0,
        "frame": "frame-polaroid"
      },
      {
        "src": "assets/gallery/upload_1790536309773.png",
        "zoom": 1,
        "panX": 0,
        "panY": 0,
        "frame": "frame-polaroid"
      },
      {
        "src": "assets/gallery/upload_1790536176961.png",
        "zoom": 1,
        "panX": 0,
        "panY": 0,
        "frame": "frame-polaroid"
      },
      {
        "src": "assets/gallery/IMG_20260916_191958_333.jpg",
        "zoom": 1,
        "panX": 0,
        "panY": 0,
        "frame": "frame-polaroid"
      },
      {
        "src": "assets/gallery/upload_1790536263785.png",
        "zoom": 1,
        "panX": 0,
        "panY": 0,
        "frame": "frame-polaroid"
      }
    ];
    this.photos = await loadCircleAdjustments(this.photos);
  }

  render() {
    const container = document.createElement('div');
    container.className = 'page-view';
    this.container = container;
    
    container.innerHTML = `
      <style>
        .memories-circle-container {
          width: 100%;
          height: calc(100vh - 70px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          position: relative;
          perspective: 1200px;
          overflow: hidden;
          background: transparent;
          padding: 10px 0 20px 0;
          touch-action: pan-y;
        }
        
        .carousel-scene {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transform: rotateX(-14deg) rotateY(0deg);
          will-change: transform;
        }

        .carousel-item {
          position: absolute;
          width: 200px;
          height: 250px;
          left: 0;
          top: 0;
          transform-style: preserve-3d;
          backface-visibility: visible;
          cursor: pointer;
          user-select: none;
          -webkit-user-select: none;
        }

        .polaroid-wrapper {
          background: #FFFDF9;
          border: 1.5px solid rgba(201, 168, 108, 0.5);
          box-shadow: 0 14px 32px rgba(92, 64, 51, 0.2), 0 2px 6px rgba(0,0,0,0.08);
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          border-radius: 12px;
          padding: 8px 8px 32px 8px;
          transform: rotate(-2deg);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        
        .carousel-item:hover .polaroid-wrapper {
          transform: scale(1.06) rotate(0deg);
          box-shadow: 0 18px 40px rgba(92, 64, 51, 0.32);
          border-color: rgba(201, 168, 108, 0.9);
        }
        .carousel-item:nth-child(even) .polaroid-wrapper { transform: rotate(2.5deg); }
        .carousel-item:nth-child(even):hover .polaroid-wrapper { transform: scale(1.06) rotate(0deg); }

        .photo-crop-box {
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 8px;
          background: #f7efe6;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .photo-crop-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
          display: block;
        }
        
        .memories-header {
          text-align: center;
          margin-bottom: 5px;
          z-index: 10;
        }
        .memories-header h1 { font-family: var(--font-heading); font-size: clamp(1.8rem, 5vw, 2.6rem); color: #68433e; margin: 0; }
        .memories-header p { font-family: var(--font-hand); font-size: clamp(1rem, 3.5vw, 1.35rem); color: #935e66; margin-top: 4px; }

        /* Swipe Guide Hint */
        .carousel-swipe-hint {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          color: rgba(147, 94, 102, 0.85);
          background: rgba(255, 255, 255, 0.5);
          padding: 3px 12px;
          border-radius: 14px;
          border: 1px solid rgba(201, 168, 108, 0.3);
          margin-top: 4px;
        }

        /* ===== Soft Aesthetic Photo Lightbox (Gentle Blur) ===== */
        .circle-lightbox {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: rgba(45, 25, 25, 0.32);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.25s ease;
          cursor: pointer;
        }
        .circle-lightbox.is-open {
          opacity: 1;
          pointer-events: auto;
        }

        .lightbox-content {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 90vw;
          max-height: 88vh;
          animation: lightboxPopIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: default;
        }
        @keyframes lightboxPopIn {
          from { transform: scale(0.85); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .lightbox-photo-wrap {
          position: relative;
          background: linear-gradient(145deg, #FFFDF8, #F5EBE0);
          border: 2.5px solid rgba(201, 168, 108, 0.7);
          border-radius: 16px;
          padding: 10px 10px 20px 10px;
          box-shadow: 0 18px 50px rgba(92, 64, 51, 0.38), 0 3px 10px rgba(0,0,0,0.12);
          max-width: 88vw;
          max-height: 82vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible;
          cursor: default;
        }

        .lightbox-photo-wrap img {
          max-width: 100%;
          max-height: 74vh;
          object-fit: contain;
          border-radius: 10px;
          display: block;
        }

        /* Close Button */
        .lightbox-close {
          position: absolute;
          top: -14px;
          right: -14px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #A0616A 0%, #8A5058 100%);
          color: #fff;
          border: 2px solid rgba(255,255,255,0.7);
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
          box-shadow: 0 4px 12px rgba(160,97,106,0.4);
          z-index: 10;
          line-height: 1;
        }
        .lightbox-close:hover {
          transform: scale(1.15) rotate(90deg);
          background: linear-gradient(135deg, #B87878 0%, #A0616A 100%);
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .carousel-item { width: 180px !important; height: 230px !important; }
          #perspective-wrapper { width: 180px !important; height: 230px !important; perspective: 1200px !important; }
          .lightbox-photo-wrap {
            max-width: 92vw;
            max-height: 76vh;
            padding: 8px 8px 16px 8px;
            border-radius: 14px;
          }
          .lightbox-photo-wrap img {
            max-height: 68vh;
          }
          .lightbox-close {
            top: -10px;
            right: -10px;
            width: 34px;
            height: 34px;
            font-size: 1rem;
          }
        }
      </style>

      <div class="memories-circle-container">
        <div class="memories-header stagger-1">
          <span class="gift-badge-pill">✨ CHAPTER 5 • ENDLESS MEMORIES ✨</span>
          <h1 class="arched-text">Our Infinite Circle</h1>
          <p>Every memory with you is a treasure.</p>
          <div class="carousel-swipe-hint">
            <span>👈</span> Swipe to spin • Tap to view <span>👉</span>
          </div>
        </div>

        <div style="flex: 1; display: flex; align-items: center; justify-content: center; width: 100%; position: relative;">
          <div id="carousel-scaler" style="transition: transform 0.3s ease;">
            <div id="perspective-wrapper" style="perspective: 1200px; width: 200px; height: 250px; margin: 0 auto;">
              <div class="carousel-scene" id="carousel-scene">
                <!-- Photos injected here -->
              </div>
            </div>
          </div>
        </div>
        
        <div style="z-index: 10; display: flex; flex-direction: column; align-items: center; padding-bottom: 20px;">
          <button class="ref-btn inviting-pulse stagger-3" id="circle-next-btn" style="padding: 12px 38px; font-size: 1.15rem; box-shadow: 0 10px 30px rgba(0,0,0,0.25);">
            NEXT CHAPTER 💝
          </button>
        </div>
      </div>

      <!-- Single Photo Lightbox -->
      <div class="circle-lightbox" id="circle-lightbox">
        <div class="lightbox-content">
          <div class="lightbox-photo-wrap" id="lightbox-frame">
            <button class="lightbox-close" id="lightbox-close" aria-label="Close">✕</button>
            <img id="lightbox-img" src="" alt="Photo preview" />
          </div>
        </div>
      </div>
    `;

    this.loadGalleryPhotos().then(() => {
      this.rebuildCircle();
      this.startContinuousRotation();
      this.bindDragEvents();
    });

    container.querySelector('#circle-next-btn').addEventListener('click', () => {
      soundManager.playTap();
      this.app.navigateTo('credits');
    });

    // Lightbox controls
    const lightbox = container.querySelector('#circle-lightbox');
    const lightboxImg = container.querySelector('#lightbox-img');

    this._openLightbox = (index) => {
      if (!this.photos[index]) return;
      lightboxImg.src = this.photos[index].src;
      lightbox.classList.add('is-open');
    };

    this._closeLightbox = () => {
      lightbox.classList.remove('is-open');
    };

    container.querySelector('#lightbox-close').addEventListener('click', (e) => {
      e.stopPropagation();
      soundManager.playTap();
      this._closeLightbox();
    });

    // Clicking anywhere outside the photo frame on the side closes immediately
    lightbox.addEventListener('click', (e) => {
      if (!e.target.closest('#lightbox-frame')) {
        soundManager.playTap();
        this._closeLightbox();
      }
    });

    this._keyHandler = (e) => {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') this._closeLightbox();
    };
    document.addEventListener('keydown', this._keyHandler);
    
    return container;
  }

  startContinuousRotation() {
    const scene = this.container?.querySelector('#carousel-scene');
    if (!scene) return;

    const loop = () => {
      if (!this.isDragging && !this.isPaused) {
        this.currentRotation = (this.currentRotation + this.autoRotateSpeed) % 360;
        scene.style.transform = `rotateX(-14deg) rotateY(${this.currentRotation}deg)`;
      }
      this.animFrameId = requestAnimationFrame(loop);
    };

    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
    this.animFrameId = requestAnimationFrame(loop);
  }

  bindDragEvents() {
    const scaler = this.container?.querySelector('#carousel-scaler') || this.container;
    const scene = this.container?.querySelector('#carousel-scene');
    if (!scaler || !scene) return;

    let hasMoved = false;

    const onStart = (clientX) => {
      this.isDragging = true;
      hasMoved = false;
      this.startX = clientX;
      this.startRotation = this.currentRotation;
    };

    const onMove = (clientX) => {
      if (!this.isDragging) return;
      const deltaX = clientX - this.startX;
      if (Math.abs(deltaX) > 4) {
        hasMoved = true;
      }
      this.currentRotation = this.startRotation + (deltaX * 0.45);
      scene.style.transform = `rotateX(-14deg) rotateY(${this.currentRotation}deg)`;
    };

    const onEnd = () => {
      this.isDragging = false;
    };

    // Touch events
    scaler.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        onStart(e.touches[0].clientX);
      }
    }, { passive: true });

    scaler.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1) {
        onMove(e.touches[0].clientX);
      }
    }, { passive: true });

    scaler.addEventListener('touchend', () => {
      onEnd();
    }, { passive: true });

    // Mouse drag events
    scaler.addEventListener('mousedown', (e) => {
      onStart(e.clientX);
      const moveHandler = (me) => onMove(me.clientX);
      const upHandler = () => {
        onEnd();
        window.removeEventListener('mousemove', moveHandler);
        window.removeEventListener('mouseup', upHandler);
      };
      window.addEventListener('mousemove', moveHandler);
      window.addEventListener('mouseup', upHandler);
    });

    this.hasMovedDrag = () => hasMoved;
  }
  
  rebuildCircle() {
    const scene = this.container?.querySelector('#carousel-scene');
    if (!scene) return;
    
    if (!this.resizeListenerAdded) {
      this.resizeListenerAdded = true;
      this.onResize = () => {
        if (this.resizeTimer) clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => this.rebuildCircle(), 200);
      };
      window.addEventListener('resize', this.onResize);
    }
    
    const numPhotos = this.photos.length;
    if (numPhotos === 0) {
      scene.innerHTML = '';
      return;
    }

    const angle = 360 / numPhotos;
    const itemWidth = 200;
    const gap = 20;
    
    // Smooth circle radius for full 3D ring shape
    const radius = Math.max(280, (numPhotos * (itemWidth + gap)) / (2 * Math.PI));

    const scaler = this.container.querySelector('#carousel-scaler');
    if (scaler) {
      const isMobile = (this.container.clientWidth || window.innerWidth) <= 768;
      const availableWidth = this.container.clientWidth || window.innerWidth;
      const availableHeight = Math.max(280, window.innerHeight - 240);
      
      if (isMobile) {
        // Balanced scaling: ~35% larger than original, but keeps full 3D circle shape intact
        const scale = Math.min(0.62, Math.max(0.48, availableWidth / 650));
        scaler.style.transform = `scale(${scale})`;
      } else {
        const scale = Math.min(1.0, availableWidth / (radius * 2 + 250), availableHeight / (radius * 0.65 + 320));
        scaler.style.transform = `scale(${scale})`;
      }
    }

    scene.innerHTML = this.photos.map((p, i) => `
      <div class="carousel-item" style="transform: rotateY(${i * angle}deg) translateZ(${radius}px);" data-index="${i}" aria-label="Photo ${i + 1}">
        <div class="polaroid-wrapper frame-polaroid ${p.frameStyle || 'glass'}">
          <div class="photo-crop-box">
            <img src="${p.src}" style="${circlePhotoStyle(p)}" />
          </div>
        </div>
      </div>
    `).join('');
    
    // Click on any carousel photo to open only that photo in the lightbox
    scene.querySelectorAll('.carousel-item').forEach(item => {
      item.addEventListener('click', (e) => {
        if (this.hasMovedDrag && this.hasMovedDrag()) {
          return;
        }
        soundManager.playTap();
        const idx = parseInt(item.getAttribute('data-index'));
        this._openLightbox(idx);
      });
    });
  }

  cleanup() {
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
    window.removeEventListener('resize', this.onResize);
    document.removeEventListener('keydown', this._keyHandler);
    clearTimeout(this.resizeTimer);
  }
}


