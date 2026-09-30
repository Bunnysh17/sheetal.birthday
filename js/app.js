/**
 * 🌸 Birthday Surprise - Main App Controller
 * Original website preserved; only full-screen chapter transitions are added.
 */

import { AmbientParticles } from './particles.js';
import { initCustomCursor } from './cursor.js';
import { soundManager } from './audio.js';

import { PasscodePage } from './pages/passcodePage.js?v=59.0';
import { WrongPasscodePage } from './pages/wrongPasscodePage.js?v=59.0';
import { ChoicePage } from './pages/choicePage.js?v=64.0';
import { CakePage } from './pages/cakePage.js?v=98.0';
import { NoResponsePage } from './pages/noResponsePage.js?v=59.0';
import { GiftHubPage } from './pages/giftHubPage.js?v=65.0';
import { Gift1GamePage } from './pages/gift1GamePage.js?v=59.0';
import { Gift1MemoriesPage } from './pages/gift1MemoriesPage.js?v=70.0';
import { Gift2GamePage } from './pages/gift2GamePage.js?v=59.0';
import { SpecialThingsPage } from './pages/specialThingsPage.js?v=65.0';
import { Gift3GamePage } from './pages/gift3GamePage.js?v=59.0';
import { LetterPage } from './pages/letterPage.js?v=65.0';
import { VideoPage } from './pages/videoPage.js?v=1.0';
import { AwardsPage } from './pages/awardsPage.js?v=1.0';
import { CreditsPage } from './pages/creditsPage.js?v=1.0';
import { ChapterPage } from './pages/chapterPage.js?v=1.0';
import { MemoriesCirclePage } from './pages/memoriesCirclePage.js?v=edit3';

class BirthdayApp {
  constructor() {
    this.appContainer = document.getElementById('page-container');
    this.currentPageId = null;
    this.currentPageInstance = null;
    this.isTransitioning = false;
    this.openedGifts = { 1: false, 2: false, 3: false };

    this.pageRegistry = {
      'passcode': PasscodePage,
      'wrong-passcode': WrongPasscodePage,
      'chapter-01': ChapterPage,
      'chapter-02': ChapterPage,
      'chapter-03': ChapterPage,
      'chapter-04': ChapterPage,
      'chapter-05': ChapterPage,
      'chapter-06': ChapterPage,
      'choice': ChoicePage,
      'cake': CakePage,
      'gifts-hub': GiftHubPage,
      'gift1-game': Gift1GamePage,
      'gift1-memories': Gift1MemoriesPage,
      'gift2-game': Gift2GamePage,
      'special-things': SpecialThingsPage,
      'gift3-game': Gift3GamePage,
      'no-response': NoResponsePage,
      'letter': LetterPage,
      'video-edit': VideoPage,
      'awards': AwardsPage,
      'memories-circle': MemoriesCirclePage,
      'credits': CreditsPage
    };

    // Chapters only divide the big parts of the story.
    // Gifts themselves stay uninterrupted: no chapter screen before Gift 1/2/3.
    this.chapterGateMap = {
      'choice': { gate: 'chapter-01', from: ['passcode'] },
      'cake': { gate: 'chapter-02', from: ['choice'] },
      'gifts-hub': { gate: 'chapter-03', from: ['cake'] },
      'awards': { gate: 'chapter-04', from: ['video-edit'] },
      'memories-circle': { gate: 'chapter-05', from: ['awards'] },
      'credits': { gate: 'chapter-06', from: ['memories-circle'] }
    };

    this.init();
  }

  init() {
    new AmbientParticles('particle-canvas');
    initCustomCursor();

    // Initialize Global Photo & Media Lightbox for all screens
    this.initGlobalLightbox();

    const initialHash = window.location.hash.replace('#', '');
    const startPage = this.pageRegistry[initialHash] ? initialHash : 'passcode';
    this.navigateTo(startPage, false, { skipChapterGate: true });

    window.addEventListener('hashchange', () => {
      const page = window.location.hash.replace('#', '');
      if (this.pageRegistry[page] && page !== this.currentPageId) {
        this.navigateTo(page, true, { skipChapterGate: true });
      }
    });
    
    // Global BGM Autoplay on first interaction
    const initBGM = () => {
      import('./audio.js').then(({ soundManager }) => {
        if (this.currentPageId === 'passcode') soundManager.playPasscodeMusic();
        else soundManager.playFullMusic();
      });
      document.removeEventListener('click', initBGM);
      document.removeEventListener('keydown', initBGM);
    };
    document.addEventListener('click', initBGM);
    document.addEventListener('keydown', initBGM);
  }

  navigateTo(pageId, animate = true, options = {}) {
    if (this.isTransitioning) return;

    const gate = this.chapterGateMap[pageId];
    if (!options.skipChapterGate && gate && gate.from.includes(this.currentPageId)) {
      pageId = gate.gate;
    }

    const PageClass = this.pageRegistry[pageId];
    if (!PageClass) {
      console.error(`Page "${pageId}" not found in registry.`);
      return;
    }

    this.isTransitioning = true;

    if (window.location.hash !== `#${pageId}`) {
      window.history.replaceState(null, null, `#${pageId}`);
    }

    if (this.currentPageInstance && typeof this.currentPageInstance.cleanup === 'function') {
      this.currentPageInstance.cleanup();
    }

    if (pageId !== 'passcode' && pageId !== 'wrong-passcode') {
      soundManager.stopPasscodeMusic();
    }

    const currentElem = this.appContainer.firstElementChild;

    const renderNewPage = () => {
      this.currentPageId = pageId;
      this.currentPageInstance = new PageClass(this);
      const newElem = this.currentPageInstance.render();
      newElem.dataset.storyPage = pageId;
      newElem.classList.add('page-enter');

      this.appContainer.innerHTML = '';
      this.appContainer.appendChild(newElem);
      void newElem.offsetWidth;
      newElem.classList.remove('page-enter');
      this.isTransitioning = false;

      const heading = newElem.querySelector('h1');
      if (heading) {
        heading.tabIndex = -1;
        heading.focus({ preventScroll: true });
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    if (animate && currentElem) {
      currentElem.classList.add('page-exit');
      setTimeout(renderNewPage, 350);
    } else {
      renderNewPage();
    }
  }

  initGlobalLightbox() {
    const lightboxEl = document.createElement('div');
    lightboxEl.className = 'global-app-lightbox';
    lightboxEl.id = 'global-app-lightbox';
    lightboxEl.innerHTML = `
      <div class="global-lightbox-backdrop"></div>
      <div class="global-lightbox-content">
        <button class="global-lightbox-close" id="global-lightbox-close" aria-label="Close">✕</button>
        <div class="global-lightbox-frame" id="global-lightbox-frame">
          <img id="global-lightbox-img" src="" alt="Photo Fullscreen" />
          <video id="global-lightbox-video" src="" controls playsinline style="display:none; max-width:100%; max-height:68vh; border-radius:10px;"></video>
          <div class="global-lightbox-caption" id="global-lightbox-caption"></div>
        </div>
        <button class="global-lightbox-nav prev" id="global-lightbox-prev" aria-label="Previous">‹</button>
        <button class="global-lightbox-nav next" id="global-lightbox-next" aria-label="Next">›</button>
      </div>
    `;
    document.body.appendChild(lightboxEl);

    this.lightboxEl = lightboxEl;
    this.lightboxImg = lightboxEl.querySelector('#global-lightbox-img');
    this.lightboxVideo = lightboxEl.querySelector('#global-lightbox-video');
    this.lightboxCaption = lightboxEl.querySelector('#global-lightbox-caption');
    this.lightboxCloseBtn = lightboxEl.querySelector('#global-lightbox-close');
    this.lightboxPrevBtn = lightboxEl.querySelector('#global-lightbox-prev');
    this.lightboxNextBtn = lightboxEl.querySelector('#global-lightbox-next');
    this.lightboxList = [];
    this.lightboxIndex = 0;

    const close = () => {
      lightboxEl.classList.remove('is-open');
      if (this.lightboxVideo) {
        this.lightboxVideo.pause();
        this.lightboxVideo.src = '';
      }
    };

    lightboxEl.addEventListener('click', (e) => {
      if (!e.target.closest('#global-lightbox-frame')) {
        soundManager.playTap();
        close();
      }
    });
    this.lightboxCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      soundManager.playTap();
      close();
    });

    const updateMedia = (idx) => {
      if (!this.lightboxList.length) return;
      this.lightboxIndex = (idx + this.lightboxList.length) % this.lightboxList.length;
      const item = this.lightboxList[this.lightboxIndex];
      const mediaSrc = item.src || item.image || item.video || '';
      const isVid = item.isVideo || (typeof mediaSrc === 'string' && (mediaSrc.endsWith('.mp4') || mediaSrc.endsWith('.webm')));
      
      if (isVid) {
        this.lightboxImg.style.display = 'none';
        this.lightboxVideo.style.display = 'block';
        this.lightboxVideo.src = mediaSrc;
        this.lightboxVideo.play().catch(() => {});
      } else {
        if (this.lightboxVideo) {
          this.lightboxVideo.pause();
          this.lightboxVideo.style.display = 'none';
        }
        this.lightboxImg.style.display = 'block';
        this.lightboxImg.src = mediaSrc;
      }
      
      this.lightboxCaption.textContent = item.caption || item.title || '';
      this.lightboxCaption.style.display = (item.caption || item.title) ? 'block' : 'none';

      if (this.lightboxList.length > 1) {
        this.lightboxPrevBtn.style.display = 'flex';
        this.lightboxNextBtn.style.display = 'flex';
      } else {
        this.lightboxPrevBtn.style.display = 'none';
        this.lightboxNextBtn.style.display = 'none';
      }
    };

    this.lightboxPrevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      soundManager.playTap();
      updateMedia(this.lightboxIndex - 1);
    });

    this.lightboxNextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      soundManager.playTap();
      updateMedia(this.lightboxIndex + 1);
    });

    document.addEventListener('keydown', (e) => {
      if (!lightboxEl.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft' && this.lightboxList.length > 1) {
        soundManager.playTap();
        updateMedia(this.lightboxIndex - 1);
      }
      if (e.key === 'ArrowRight' && this.lightboxList.length > 1) {
        soundManager.playTap();
        updateMedia(this.lightboxIndex + 1);
      }
    });

    this._updateGlobalLightboxMedia = updateMedia;
    this._closeGlobalLightbox = close;

    // Delegated click handler: clicking on any polaroid or memory image across any page opens it!
    document.addEventListener('click', (e) => {
      // Don't trigger if click is inside an active lightbox or on buttons/inputs/links
      if (e.target.closest('#global-app-lightbox') || e.target.closest('#circle-lightbox') || e.target.closest('.dev-quick-jump-bar')) return;
      if (e.target.closest('button') || e.target.closest('input') || e.target.closest('a') || e.target.closest('.audio-control-toggle')) return;

      const photoTarget = e.target.closest('.photo-crop-wrapper, .polaroid-card, .timeline-polaroid, .hanging-polaroid-item, .passcode-polaroid-frame, .finale-split-layout figure, .photo-polaroid-box, [data-open-lightbox]');
      if (photoTarget) {
        const img = photoTarget.querySelector('img') || (photoTarget.tagName === 'IMG' ? photoTarget : null);
        if (img && img.src && !img.src.includes('washi') && !img.src.includes('stamp') && !img.src.includes('butterfly') && !img.src.includes('tape')) {
          const caption = photoTarget.getAttribute('data-caption') || photoTarget.querySelector('h3, .polaroid-caption, p, .vertical-note h3')?.textContent?.trim() || '';
          soundManager.playTap();
          this.openLightbox(img.src, caption);
        }
      }
    });
  }

  openLightbox(mediaSrc, caption = '', isVideo = false, mediaList = null) {
    if (!this.lightboxEl) return;
    if (mediaList && Array.isArray(mediaList) && mediaList.length > 0) {
      this.lightboxList = mediaList;
      const foundIdx = mediaList.findIndex(m => (m.src || m.image || m.video) === mediaSrc);
      this.lightboxIndex = foundIdx >= 0 ? foundIdx : 0;
    } else {
      this.lightboxList = [{ src: mediaSrc, caption: caption, isVideo: isVideo }];
      this.lightboxIndex = 0;
    }
    this._updateGlobalLightboxMedia(this.lightboxIndex);
    this.lightboxEl.classList.add('is-open');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.birthdayApp = new BirthdayApp();
});

