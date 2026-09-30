import { soundManager } from '../audio.js';
import { confettiEngine } from '../confetti.js';

export class VideoPage {
  constructor(app) {
    this.app = app;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'page-view video-edit-view';
    
    container.innerHTML = `
      <div style="width: 100%; min-height: 100vh; position: relative; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 20px; text-align: center; overflow: hidden;">
        
        <!-- Background Decorations -->
        <img src="assets/scrapbook/vintage_celestial_pink_cloud.png" style="position: absolute; top: -50px; left: -50px; width: 200px; opacity: 0.6; z-index: 1;" />
        <img src="assets/scrapbook/vintage_pink_peony_stem.png" style="position: absolute; bottom: 0; right: -50px; width: 250px; opacity: 0.8; z-index: 1;" />

        <div class="stagger-1" style="position: relative; z-index: 2; margin-bottom: 20px;">
          <h1 class="ref-heading arched-text" style="color: #5C4033; font-size: clamp(2.5rem, 6vw, 3.8rem); margin-bottom: 5px; line-height: 1.1;">
            Just For You
          </h1>
          <p style="color: #8C6A5D; font-style: italic; font-size: 1.2rem; margin: 0; font-family: var(--font-body);">
            Ek chhota sa video edit...
          </p>
        </div>

        <!-- Video Container -->
        <div class="stagger-2" style="position: relative; z-index: 5; width: fit-content; max-width: 95%; background: rgba(255, 255, 255, 0.4); border-radius: 20px; padding: 10px; box-shadow: 0 15px 40px rgba(92, 64, 51, 0.15); border: 2px solid rgba(201, 168, 108, 0.4); backdrop-filter: blur(10px);">
          <div style="border-radius: 12px; overflow: hidden; background: transparent; position: relative; display: flex; justify-content: center; align-items: center; cursor: pointer;" id="video-wrapper">
            <video preload="auto" playsinline webkit-playsinline style="max-width: 100%; max-height: 58vh; width: auto; height: auto; display: block; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);" id="my-video">
              <source src="sheetal3.0.mp4" type="video/mp4">
              Your browser does not support the video tag.
            </video>
            
            <div id="play-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; background: rgba(0,0,0,0.15); transition: opacity 0.3s ease;">
               <div style="width: 70px; height: 70px; background: rgba(255, 255, 255, 0.9); border-radius: 50%; display: flex; justify-content: center; align-items: center; box-shadow: 0 4px 15px rgba(0,0,0,0.3);">
                <span style="font-size: 2.2rem; color: #5C4033; margin-left: 6px;">▶</span>
              </div>
            </div>
          </div>
        </div>

        <div class="stagger-2" style="margin-top: 14px; text-align: center; z-index: 5; position: relative;">
          <button id="portrait-fs-btn" class="cute-btn" style="padding: 9px 20px; font-size: 0.92rem; font-weight: 600; border: 1.5px solid rgba(255,255,255,0.7); display: inline-flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 14px rgba(189, 120, 130, 0.35);">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg> Watch in Full Screen
          </button>
        </div>

        <button class="ref-btn inviting-pulse stagger-3" id="video-next-btn" style="margin-top: 25px; padding: 12px 40px; font-size: 1.25rem; z-index: 2;">
          NEXT CHAPTER ✨
        </button>
      </div>
    `;

    const vid = container.querySelector('#my-video');
    const overlay = container.querySelector('#play-overlay');
    const wrapper = container.querySelector('#video-wrapper');
    const fsBtn = container.querySelector('#portrait-fs-btn');

    if (wrapper && vid && overlay) {
      wrapper.addEventListener('click', () => {
        if (vid.paused) {
          vid.play().catch(e => console.log(e));
          overlay.style.opacity = '0';
        } else {
          vid.pause();
          overlay.style.opacity = '1';
        }
      });
      vid.addEventListener('play', () => {
        overlay.style.opacity = '0';
        soundManager.suppressBGM(true);
      });
      vid.addEventListener('pause', () => {
        if (!vid.ended) overlay.style.opacity = '1';
        soundManager.suppressBGM(false);
      });
      vid.addEventListener('ended', () => {
        overlay.style.opacity = '1';
        soundManager.suppressBGM(false);
        confettiEngine.burst({ count: 120 });
      });
    }

    if (fsBtn && vid) {
      fsBtn.addEventListener('click', () => {
        soundManager.playTap();
        this.openPortraitFullscreen(vid, overlay);
      });
    }

    container.querySelector('#video-next-btn').addEventListener('click', () => {
      soundManager.playTap();
      if (vid) vid.pause();
      this.app.navigateTo('awards');
    });

    soundManager.suppressBGM(true);

    return container;
  }

  openPortraitFullscreen(videoEl, inlineOverlay) {
    soundManager.suppressBGM(true);
    const curTime = videoEl ? videoEl.currentTime : 0;
    if (videoEl) videoEl.pause();
    if (inlineOverlay) inlineOverlay.style.opacity = '1';

    const overlay = document.createElement('div');
    overlay.className = 'portrait-video-overlay';
    overlay.id = 'portrait-video-overlay';
    overlay.innerHTML = `
      <style>
        .portrait-video-overlay {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          background: #000000;
          z-index: 99999999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          opacity: 0;
          transition: opacity 0.25s ease;
          user-select: none;
          -webkit-user-select: none;
        }
        .portrait-video-overlay.active {
          opacity: 1;
        }
        .portrait-video-top-bar {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          padding: 16px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 30;
          background: linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0) 100%);
          transition: opacity 0.3s ease, transform 0.3s ease;
          box-sizing: border-box;
        }
        .portrait-video-overlay.controls-hidden .portrait-video-top-bar {
          opacity: 0;
          transform: translateY(-15px);
          pointer-events: none;
        }
        .portrait-video-title {
          color: #fff;
          font-family: var(--font-heading, 'Playfair Display', serif);
          font-size: 1.05rem;
          font-weight: 600;
          text-shadow: 0 2px 8px rgba(0,0,0,0.8);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .portrait-video-close-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, rgba(205, 115, 125, 0.95), rgba(165, 80, 95, 0.95));
          border: 1px solid rgba(255, 210, 220, 0.5);
          color: #fff;
          padding: 7px 16px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(165, 80, 95, 0.4);
          transition: all 0.2s ease;
        }
        .portrait-video-box {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
        .portrait-video-box video {
          width: 100%;
          height: 100%;
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          background: #000;
        }
        .portrait-center-icon {
          position: absolute;
          width: 76px;
          height: 76px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.65);
          border: 2px solid rgba(255, 255, 255, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 2.2rem;
          pointer-events: none;
          opacity: 0;
          transform: scale(0.6);
          z-index: 25;
        }
        .portrait-center-icon.pulse-anim {
          animation: pvFeedbackPulse 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes pvFeedbackPulse {
          0% { opacity: 0; transform: scale(0.6); }
          40% { opacity: 0.95; transform: scale(1.15); }
          100% { opacity: 0; transform: scale(1.4); }
        }
      </style>

      <div class="portrait-video-top-bar" id="pv-top-bar">
        <div class="portrait-video-title">
          <span>🎬</span>
          <span>Ek Chhota Sa Video Edit ✨</span>
        </div>
        <button class="portrait-video-close-btn" id="pv-close-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          <span>Exit</span>
        </button>
      </div>

      <div class="portrait-video-box" id="pv-video-box">
        <video id="pv-video" src="sheetal3.0.mp4" playsinline webkit-playsinline preload="auto"></video>
        <div class="portrait-center-icon" id="pv-center-icon">▶</div>
      </div>
    `;

    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('active'));

    const fsVid = overlay.querySelector('#pv-video');
    const closeBtn = overlay.querySelector('#pv-close-btn');
    const box = overlay.querySelector('#pv-video-box');
    const centerIcon = overlay.querySelector('#pv-center-icon');
    let hideTimer = null;

    const showControls = () => {
      overlay.classList.remove('controls-hidden');
      clearTimeout(hideTimer);
      if (!fsVid.paused) {
        hideTimer = setTimeout(() => {
          if (!fsVid.paused) overlay.classList.add('controls-hidden');
        }, 2500);
      }
    };

    const showPulse = (text) => {
      centerIcon.textContent = text;
      centerIcon.classList.remove('pulse-anim');
      void centerIcon.offsetWidth;
      centerIcon.classList.add('pulse-anim');
    };

    if (curTime > 0) {
      fsVid.currentTime = curTime;
    }
    fsVid.play().catch(() => {});
    showControls();

    box.addEventListener('click', () => {
      if (fsVid.paused) {
        fsVid.play().catch(() => {});
        showPulse('▶');
      } else {
        fsVid.pause();
        showPulse('❚❚');
      }
      showControls();
    });

    fsVid.addEventListener('play', showControls);
    fsVid.addEventListener('pause', showControls);
    fsVid.addEventListener('ended', () => {
      showControls();
      confettiEngine.burst({ count: 120 });
    });

    const closeFullscreen = () => {
      clearTimeout(hideTimer);
      const fsTime = fsVid.currentTime;
      fsVid.pause();
      if (videoEl) {
        videoEl.currentTime = fsTime;
      }
      overlay.classList.remove('active');
      setTimeout(() => {
        overlay.remove();
        soundManager.suppressBGM(false);
      }, 250);
    };

    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      soundManager.playTap();
      closeFullscreen();
    });

    const onKey = (e) => {
      if (e.key === 'Escape') {
        window.removeEventListener('keydown', onKey);
        closeFullscreen();
      }
    };
    window.addEventListener('keydown', onKey);
  }

  cleanup() {
    const fsOverlay = document.getElementById('portrait-video-overlay');
    if (fsOverlay) fsOverlay.remove();
    const vid = document.querySelector('#my-video');
    if (vid) vid.pause();
    soundManager.suppressBGM(false);
  }
}


