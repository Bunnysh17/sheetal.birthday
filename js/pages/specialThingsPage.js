/**
 * 🎁 Gift 2: "Sheetal 2.0" Video Page
 * Replaces the special things cards with a beautiful video showcase.
 */

import { birthdayConfig } from '../../config.js';
import { soundManager } from '../audio.js';
import { confettiEngine } from '../confetti.js';
import { openLandscapeVideo } from '../components/landscapeVideoModal.js';

export class SpecialThingsPage {
  constructor(app) {
    this.app = app;
    this.pausedMusic = false;
    this.activeLandscapeModal = null;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'page-view';

    container.innerHTML = `
      <div class="special-showcase-container stagger-1" style="max-width: 800px; margin: 0 auto; padding: 20px;">
        <!-- Top Navigation Bar -->
        <div class="page-top-bar" style="width: 100%; display: flex; justify-content: flex-start; margin-bottom: 6px;">
          <button class="game-back-btn" id="special-back-btn">← Back to Gifts</button>
        </div>

        <img src="assets/scrapbook/scrapbook_purple_washi_tape.png" class="sb-sticker sb-special-tape" alt="washi tape" style="top: 10px; right: 20px; z-index: 5;" />

        <div style="text-align: center; margin-bottom: 25px; margin-top: 10px;">
          <span class="gift-badge-pill">✨ GIFT 2 OF 3 • YOUR SPECIAL MOMENTS ✨</span>
          <h1 class="ref-heading arched-text" style="margin-top: 15px; font-size: 2.2rem;">Things That Make You Special ❤️</h1>
          <p style="color: var(--text-warm); font-size: 1.05rem; margin-top: 5px;">A little cinematic memory just for you... 🌸</p>
        </div>

        <!-- Cinematic Video Player -->
        <div class="cinematic-video-wrapper stagger-2" style="position: relative; width: 92%; max-width: 650px; margin: 0 auto 30px; border-radius: 12px; box-shadow: 0 15px 35px rgba(92, 64, 51, 0.2); background: #fffaf1; padding: 6px; border: 1px solid rgba(0,0,0,0.06);">
           
           <img src="assets/scrapbook/scrapbook_postage_stamp_heart.png" style="position: absolute; top: -12px; left: -12px; width: 55px; z-index: 10; transform: rotate(-8deg); pointer-events: none;" alt="stamp" />
           <img src="assets/scrapbook/scrapbook_swallowtail_butterfly.png" style="position: absolute; bottom: -15px; right: -15px; width: 45px; z-index: 10; transform: rotate(-15deg); pointer-events: none;" alt="butterfly" />

           <div style="position: relative; width: 100%; border-radius: 8px; overflow: hidden; background: transparent; box-shadow: inset 0 0 20px rgba(0,0,0,0.8); cursor: pointer;" id="special-video-wrapper">
             <video id="sheetal-video" 
                    src="sheetal.mp4" 
                    playsinline
                    preload="metadata"
                    style="width: 100%; display: block; max-height: 65vh; object-fit: contain;">
             </video>
             
             <div id="special-play-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; background: rgba(0,0,0,0.15); transition: opacity 0.3s ease;">
               <div style="width: 70px; height: 70px; background: rgba(255, 255, 255, 0.9); border-radius: 50%; display: flex; justify-content: center; align-items: center; box-shadow: 0 4px 15px rgba(0,0,0,0.3);">
                 <span style="font-size: 2.2rem; color: #5C4033; margin-left: 6px;">▶</span>
               </div>
             </div>
           </div>
           
           <div style="margin-top: 10px; text-align: center;">
             <button id="fullscreen-video-btn" class="cute-btn" style="padding: 10px 20px; font-size: 0.95rem; font-weight: 600; border: 2px solid #fff; display: inline-flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 14px rgba(189, 120, 130, 0.35);">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle;"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg> Watch in Full Landscape
             </button>
           </div>
        </div>

        <div style="display: flex; gap: 14px; margin-top: 20px; flex-wrap: wrap; justify-content: center;" class="stagger-3">
          <button class="ref-btn inviting-pulse" id="finish-gift2-btn" style="font-size: 1.15rem; padding: 12px 28px;">
            🎁 COMPLETE GIFT 2 & OPEN GIFT 3 ✨
          </button>
        </div>
      </div>
    `;

    this.attachEvents(container);
    return container;
  }

  attachEvents(container) {
    const video = container.querySelector('#sheetal-video');
    const fullscreenBtn = container.querySelector('#fullscreen-video-btn');
    const overlay = container.querySelector('#special-play-overlay');
    const wrapper = container.querySelector('#special-video-wrapper');

    if (wrapper && video && overlay) {
      wrapper.addEventListener('click', () => {
        if (video.paused) {
          video.play().catch(e => console.log(e));
          overlay.style.opacity = '0';
        } else {
          video.pause();
          overlay.style.opacity = '1';
        }
      });
      video.addEventListener('play', () => {
        overlay.style.opacity = '0';
        soundManager.suppressBGM(true);
      });
      video.addEventListener('pause', () => {
        if (!video.ended) overlay.style.opacity = '1';
        soundManager.suppressBGM(false);
      });
      video.addEventListener('ended', () => {
        overlay.style.opacity = '1';
        soundManager.suppressBGM(false);
        confettiEngine.burst({ count: 150 });
      });
    }

    if (fullscreenBtn && video) {
      fullscreenBtn.addEventListener('click', () => {
        soundManager.playTap();
        const curTime = video.currentTime;
        video.pause();
        if (overlay) overlay.style.opacity = '1';

        this.activeLandscapeModal = openLandscapeVideo({
          src: 'sheetal.mp4',
          title: "Sheetal's Special Moments ❤️",
          currentTime: curTime,
          onTimeUpdate: (time) => {
            video.currentTime = time;
          },
          onClose: (time) => {
            video.currentTime = time;
            this.activeLandscapeModal = null;
          },
          onEnded: () => {
            confettiEngine.fireCannons();
          }
        });
      });
    }

    container.querySelector('#special-back-btn')?.addEventListener('click', () => {
      soundManager.playTap();
      if (video) video.pause();
      if (this.activeLandscapeModal) {
        this.activeLandscapeModal.close();
        this.activeLandscapeModal = null;
      }
      this.app.navigateTo('gifts-hub');
    });

    container.querySelector('#finish-gift2-btn')?.addEventListener('click', () => {
      soundManager.playSuccessSound();
      confettiEngine.fireCannons();
      if (video) video.pause();
      if (this.activeLandscapeModal) {
        this.activeLandscapeModal.close();
        this.activeLandscapeModal = null;
      }
      
      setTimeout(() => {
        this.app.openedGifts = this.app.openedGifts || { 1: false, 2: false, 3: false };
        this.app.openedGifts[2] = true;
        this.app.navigateTo('gifts-hub');
      }, 500);
    });
  }

  cleanup() {
    if (this.activeLandscapeModal) {
      this.activeLandscapeModal.close();
      this.activeLandscapeModal = null;
    }
    const video = document.querySelector('#sheetal-video');
    if (video) video.pause();
    soundManager.suppressBGM(false);
  }
}