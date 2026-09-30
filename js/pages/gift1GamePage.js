/**
 * 🎮 Dedicated Full Page: Gift 1 Memory Match Challenge Screen (#gift1-game)
 * User must match all 6 pairs before Gift 1 (Memories) unlocks and opens!
 * Fully baked with permanent photos and positions.
 */

import { birthdayConfig } from '../../config.js';
import { soundManager } from '../audio.js';
import { confettiEngine } from '../confetti.js';
import { openPhotoAdjuster } from '../components/photoAdjusterModal.js';

export const CARD_DATA = [
  { 
    key: 'birthday_hat', 
    name: 'Birthday 🎂', 
    image: 'assets/gallery/upload_1790536176961.png'
  },
  { 
    key: 'jhumka_smile', 
    name: 'Pretty ✨', 
    image: 'assets/gallery/upload_1790536263785.png'
  },
  { 
    key: 'cool_shades', 
    name: 'Cool 😎', 
    image: 'assets/gallery/upload_1790536205575.png'
  },
  { 
    key: 'peace_sign', 
    name: 'Peace ✌️', 
    image: 'assets/gallery/upload_1790279965330.png'
  },
  { 
    key: 'vintage_cam', 
    name: 'Sweet 🌸', 
    image: 'assets/gallery/photo_birthday_hat.jpg'
  },
  { 
    key: 'sofa_pose', 
    name: 'Graceful 👑', 
    image: 'assets/gallery/upload_1790536309773.png'
  }
];

export const DEFAULT_PHOTO_ADJUSTMENTS = {
  birthday_hat: { 
    image: 'assets/gallery/upload_1790536176961.png', 
    fit: 'cover', 
    x: 0, 
    y: 0, 
    scale: 1.0 
  },
  jhumka_smile: { 
    image: 'assets/gallery/upload_1790536263785.png', 
    fit: 'cover', 
    x: 0, 
    y: 0, 
    scale: 1.0 
  },
  cool_shades: { 
    image: 'assets/gallery/upload_1790536205575.png', 
    fit: 'cover', 
    x: 0, 
    y: 0, 
    scale: 1.0 
  },
  peace_sign: { 
    image: 'assets/gallery/upload_1790279965330.png', 
    fit: 'cover', 
    x: 0, 
    y: 0, 
    scale: 1.0 
  },
  vintage_cam: { 
    image: 'assets/gallery/photo_birthday_hat.jpg', 
    fit: 'cover', 
    x: 0, 
    y: 0, 
    scale: 1.0 
  },
  sofa_pose: { 
    image: 'assets/gallery/upload_1790536309773.png', 
    fit: 'cover', 
    x: 0, 
    y: 0, 
    scale: 1.0 
  }
};

export class Gift1GamePage {
  constructor(app) {
    this.app = app;
    this.cards = [];
    this.firstCard = null;
    this.secondCard = null;
    this.isLocked = false;
    this.matchedPairs = 0;
    this.totalPairs = CARD_DATA.length;
    this.flipsCount = 0;

    this.container = null;
    this.gridEl = null;
    this.pairsCountEl = null;

    // Adjustments state initialized to baked settings
    this.adjustments = JSON.parse(JSON.stringify(DEFAULT_PHOTO_ADJUSTMENTS));
    this.loadAdjustments();
  }

  loadAdjustments() {
    try {
      const stored = localStorage.getItem('birthday_photo_adjustments');
      if (stored) {
        const parsed = JSON.parse(stored);
        Object.keys(parsed).forEach(k => {
          if (parsed[k] && parsed[k].fit === 'contain') parsed[k].fit = 'cover';
        });
        this.adjustments = { ...this.adjustments, ...parsed };
      }
    } catch (e) {
      console.warn('Could not read photo adjustments from localStorage:', e);
    }

    // Also sync with photo_adjustments.json if present
    fetch('photo_adjustments.json?t=' + Date.now())
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && typeof data === 'object') {
          Object.keys(data).forEach(k => {
            if (data[k] && data[k].fit === 'contain') data[k].fit = 'cover';
          });
          this.adjustments = { ...this.adjustments, ...data };
          this.updateGameBoardImages();
        }
      })
      .catch(() => {});
  }

  getPhotoSrc(key) {
    if (this.adjustments[key] && this.adjustments[key].image) {
      return this.adjustments[key].image;
    }
    const def = CARD_DATA.find(c => c.key === key);
    return def ? def.image : '';
  }

  getPhotoStyle(key) {
    const adj = this.adjustments[key] || DEFAULT_PHOTO_ADJUSTMENTS[key] || { x: 0, y: 0, scale: 1.0, fit: 'cover' };
    const fitMode = adj.fit && adj.fit !== 'contain' ? adj.fit : 'cover';
    const x = adj.x || 0;
    const y = adj.y || 0;
    const scale = adj.scale || 1.0;
    return `object-fit: ${fitMode} !important; object-position: center 20% !important; transform: translate(${x}px, ${y}px) scale(${scale}); transform-origin: center center;`;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'page-view gift1-game-view';
    this.container = container;

    container.innerHTML = `
      <div class="gift1-game-container">
        <!-- Navigation Top Bar -->
        <div class="game-top-bar stagger-1" style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
          <button class="ref-btn game-back-btn" id="game-back-to-hub">
            ← Back to Gifts
          </button>
          <button class="ref-btn cute-btn" id="game-adjust-photos-btn" style="padding: 7px 16px; font-size: 0.88rem; font-weight: 700; border-radius: 20px; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 4px 12px rgba(189, 120, 130, 0.35); background: linear-gradient(135deg, #A0616A, #5C4033); color: #fff;">
            🎨 Adjust Photos
          </button>
        </div>

        <!-- Page Header -->
        <div class="gift1-game-header stagger-1">
          <span class="gift-badge-pill">✨ MINI SURPRISE GAME ✨</span>
          <h1 class="ref-heading arched-text gift1-game-title">
            A little game before our memories? ✨
          </h1>
          <p class="gift1-game-subtitle">
            Match all 6 pairs to unlock your first birthday surprise! 🎁❤️
          </p>
        </div>

        <!-- Scrapbook Card Board -->
        <div class="game-board-card stagger-2">
          <!-- Cute Mascots Peeking on the Corners of the Board -->
          <img src="shinchan/shinchan.gif" class="game-board-shinchan" alt="shinchan" />
          <img src="gifs/peach-goma.gif" class="game-board-cat" alt="peach goma" />

          <!-- Pinned Vintage Washi Tape -->
          <img src="assets/scrapbook/scrapbook_purple_washi_tape.png" class="game-board-washi" alt="tape" />

          <!-- Progress Bar & Adjust Option -->
          <div class="memory-stats-bar">
            <div class="stat-pill pairs-pill">
              <span class="stat-icon">💖</span>
              <span>Pairs: <strong id="game-pairs-count">0</strong> / 6</span>
            </div>
            <button class="ref-btn cute-btn game-board-adjust-btn" id="game-adjust-photos-board-btn">
              🎨 Adjust Photos
            </button>
          </div>

          <!-- 3D Flippable Cards Grid -->
          <div class="memory-grid" id="game-memory-grid"></div>

          <!-- Full Game Victory Celebration Overlay -->
          <div class="memory-win-overlay" id="game-win-overlay">
            <div class="memory-win-content">
              <div class="win-mascot-row">
                <img src="shinchan/shinchan.gif" class="win-shinchan-gif" alt="celebration" />
                <img src="gifs/peach-goma.gif" class="win-peach-gif" alt="peach cheering" />
              </div>
              <h3 class="win-title">🎉 WOHOOO! YOU WON! 🎉</h3>
              <p class="win-message">
                You matched all 6 pairs brilliantly! 💖<br/>
                Ab khulega tumhara pehla birthday gift! 🎁✨
              </p>
              <button class="win-open-gift-btn" id="game-claim-btn">
                🎁 OPEN GIFT 1 NOW! ✨
              </button>
            </div>
          </div>
        </div>

        <!-- Floating Mobile Quick Adjust Button -->
        <button class="gift1-floating-adjust-btn" id="gift1-floating-adjust-btn" title="Adjust Photos for Mobile">
          🎨 Adjust Photos
        </button>
      </div>
    `;

    this.attachEvents(container);
    return container;
  }

  generateShuffledCards() {
    const deck = [];
    CARD_DATA.forEach(item => {
      deck.push({ ...item, id: `${item.key}-1` });
      deck.push({ ...item, id: `${item.key}-2` });
    });

    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    return deck;
  }

  attachEvents(container) {
    this.gridEl = container.querySelector('#game-memory-grid');
    this.pairsCountEl = container.querySelector('#game-pairs-count');

    // Back button
    container.querySelector('#game-back-to-hub')?.addEventListener('click', () => {
      soundManager.playTap();
      this.app.navigateTo('gifts-hub');
    });

    // Adjust Photos Button (Supports top bar, board bar, and floating mobile button)
    const openAdjusterHandler = () => {
      soundManager.playTap();
      openPhotoAdjuster({
        onChange: (newAdj) => {
          this.adjustments = { ...this.adjustments, ...newAdj };
          this.updateGameBoardImages();
        },
        onSave: (newAdj) => {
          this.adjustments = { ...this.adjustments, ...newAdj };
          this.updateGameBoardImages();
        }
      });
    };

    container.querySelector('#game-adjust-photos-btn')?.addEventListener('click', openAdjusterHandler);
    container.querySelector('#game-adjust-photos-board-btn')?.addEventListener('click', openAdjusterHandler);
    container.querySelector('#gift1-floating-adjust-btn')?.addEventListener('click', openAdjusterHandler);

    // Claim button
    container.querySelector('#game-claim-btn')?.addEventListener('click', () => {
      this.handleClaimGift();
    });

    // Mascot Easter Egg Audio
    const shinchanMascot = container.querySelector('.game-board-shinchan');
    if (shinchanMascot) {
      shinchanMascot.style.cursor = 'pointer';
      shinchanMascot.title = "Tap Shinchan! 😄";
      shinchanMascot.addEventListener('click', () => {
        soundManager.playShinchanLaugh();
        shinchanMascot.classList.add('inviting-pulse');
        setTimeout(() => shinchanMascot.classList.remove('inviting-pulse'), 800);
      });
    }

    const catMascot = container.querySelector('.game-board-cat');
    if (catMascot) {
      catMascot.style.cursor = 'pointer';
      catMascot.title = "Tap Cats! 🐱";
      catMascot.addEventListener('click', () => {
        soundManager.playCuteGiggle();
        catMascot.classList.add('inviting-pulse');
        setTimeout(() => catMascot.classList.remove('inviting-pulse'), 800);
      });
    }

    this.startNewGame();
  }

  updateGameBoardImages(key) {
    if (!this.container) return;
    const selector = key ? `.memory-card-img[data-key="${key}"]` : '.memory-card-img';
    this.container.querySelectorAll(selector).forEach(img => {
      const k = img.dataset.key;
      if (k) {
        img.src = this.getPhotoSrc(k);
        img.style.cssText = this.getPhotoStyle(k);
        img.setAttribute('style', this.getPhotoStyle(k));
      }
    });
  }

  startNewGame() {
    this.cards = this.generateShuffledCards();
    this.firstCard = null;
    this.secondCard = null;
    this.isLocked = false;
    this.matchedPairs = 0;

    if (this.pairsCountEl) this.pairsCountEl.textContent = '0';

    const winOverlay = this.container.querySelector('#game-win-overlay');
    if (winOverlay) winOverlay.classList.remove('win-overlay-active');

    this.renderCards();
  }

  renderCards() {
    if (!this.gridEl) return;
    this.gridEl.innerHTML = '';

    this.cards.forEach((card, index) => {
      const cardEl = document.createElement('div');
      cardEl.className = 'memory-card';
      cardEl.dataset.key = card.key;
      cardEl.dataset.index = index;

      cardEl.innerHTML = `
        <div class="memory-card-inner">
          <!-- Card Back (Shown Face Down - Vintage Aesthetic Wax Sealed Postcard) -->
          <div class="memory-card-back">
            <span class="card-corner-star tl">✦</span>
            <span class="card-corner-star br">✦</span>
            <div class="card-back-seal-box">
              <img src="assets/scrapbook/vintage_letter_pink_wax_seal.png" alt="vintage seal" class="card-back-wax-img" />
              <div class="card-back-tag">
                <span class="tag-sparkle">✨</span>
                <span class="tag-text">OPEN ME</span>
                <span class="tag-sparkle">✨</span>
              </div>
            </div>
          </div>
          <!-- Card Front (Shown When Flipped) -->
          <div class="memory-card-front">
            <div class="memory-card-img-wrap">
              <img 
                src="${this.getPhotoSrc(card.key)}" 
                alt="${card.name}" 
                class="memory-card-img" 
                data-key="${card.key}"
                style="${this.getPhotoStyle(card.key)}"
              />
            </div>
            <span class="memory-card-label">${card.name}</span>
          </div>
        </div>
      `;

      cardEl.addEventListener('click', () => this.handleCardClick(cardEl, card));
      this.gridEl.appendChild(cardEl);
    });
  }

  handleCardClick(cardEl, card) {
    if (this.isLocked) return;
    if (cardEl.classList.contains('is-flipped') || cardEl.classList.contains('is-matched')) return;

    soundManager.playTap();
    cardEl.classList.add('is-flipped');

    if (!this.firstCard) {
      this.firstCard = { el: cardEl, data: card };
    } else {
      this.secondCard = { el: cardEl, data: card };
      this.checkForMatch();
    }
  }

  checkForMatch() {
    const isMatch = this.firstCard.data.key === this.secondCard.data.key;

    if (isMatch) {
      this.handleMatchSuccess();
    } else {
      this.handleMismatch();
    }
  }

  handleMatchSuccess() {
    const c1 = this.firstCard.el;
    const c2 = this.secondCard.el;

    // Both cards stay open immediately and permanently
    c1.classList.add('is-matched');
    c2.classList.add('is-matched');

    this.matchedPairs++;
    if (this.pairsCountEl) this.pairsCountEl.textContent = this.matchedPairs;

    this.resetTurn();

    if (this.matchedPairs >= this.totalPairs) {
      this.handleGameWon();
    }
  }

  handleMismatch() {
    this.isLocked = true;
    const c1 = this.firstCard.el;
    const c2 = this.secondCard.el;

    soundManager.playRandomMismatchSound();
    c1.classList.add('is-wrong');
    c2.classList.add('is-wrong');

    setTimeout(() => {
      c1.classList.remove('is-flipped', 'is-wrong');
      c2.classList.remove('is-flipped', 'is-wrong');
      this.resetTurn();
    }, 750);
  }

  resetTurn() {
    this.firstCard = null;
    this.secondCard = null;
    this.isLocked = false;
  }

  handleGameWon() {
    soundManager.playCelebrationFanfare();
    confettiEngine.fireCannons();

    setTimeout(() => {
      const winOverlay = this.container.querySelector('#game-win-overlay');
      if (winOverlay) {
        winOverlay.classList.add('win-overlay-active');
      }
    }, 450);
  }

  handleClaimGift() {
    soundManager.playGiftOpenSound();
    confettiEngine.burst({ count: 70 });

    // Mark Gift 1 as completed and unlock
    this.app.openedGifts[1] = true;

    // Navigate to Gift 1 Memories Page!
    setTimeout(() => {
      this.app.navigateTo('gift1-memories');
    }, 400);
  }

  cleanup() {
    // Clean state
  }
}
