/**
 * 🎮 Memory Match Minigame Modal
 * Gating minigame for Gift 1: User must match all 6 pairs
 * before the first birthday surprise gift unlocks and opens!
 */

import { soundManager } from '../audio.js';
import { confettiEngine } from '../confetti.js';

const CARD_DATA = [
  { key: 'birthday_hat', name: 'Birthday 🎂', image: 'assets/gallery/upload_1790536176961.png' },
  { key: 'jhumka_smile', name: 'Pretty ✨', image: 'assets/gallery/upload_1790536263785.png' },
  { key: 'cool_shades', name: 'Cool 😎', image: 'assets/gallery/upload_1790536205575.png' },
  { key: 'peace_sign', name: 'Peace ✌️', image: 'assets/gallery/upload_1790279965330.png' },
  { key: 'vintage_cam', name: 'Sweet 🌸', image: 'assets/gallery/photo_birthday_hat.jpg' },
  { key: 'sofa_pose', name: 'Graceful 👑', image: 'assets/gallery/upload_1790536309773.png' }
];

export class MemoryMatchModal {
  constructor({ onComplete, onClose }) {
    this.onComplete = onComplete;
    this.onClose = onClose;

    this.cards = [];
    this.firstCard = null;
    this.secondCard = null;
    this.isLocked = false;
    this.matchedPairs = 0;
    this.totalPairs = CARD_DATA.length;
    this.flipsCount = 0;

    this.modalEl = null;
    this.gridEl = null;
    this.pairsCountEl = null;
    this.flipsCountEl = null;
  }

  show() {
    this.createModal();
    this.startNewGame();
    // Prevent background scrolling
    document.body.classList.add('modal-open');
  }

  close() {
    if (this.modalEl) {
      this.modalEl.classList.remove('modal-visible');
      setTimeout(() => {
        if (this.modalEl && this.modalEl.parentNode) {
          this.modalEl.parentNode.removeChild(this.modalEl);
        }
        document.body.classList.remove('modal-open');
        if (this.onClose) this.onClose();
      }, 300);
    }
  }

  createModal() {
    const overlay = document.createElement('div');
    overlay.className = 'memory-modal-overlay';
    overlay.id = 'memory-match-overlay';

    overlay.innerHTML = `
      <div class="memory-modal-card">
        <!-- Vintage Decorative Washi Tape -->
        <img src="assets/scrapbook/scrapbook_purple_washi_tape.png" class="memory-modal-washi" alt="tape" />

        <!-- Close Button -->
        <button class="memory-modal-close-btn" id="memory-close-btn" title="Close Game">&times;</button>

        <!-- Cute Mascot Sticker in Header -->
        <div class="memory-modal-header">
          <span class="memory-badge-pill">✨ MINI SURPRISE GAME ✨</span>
          <h2 class="memory-modal-title">
            Gift dekhne se pehle game complete karo! ✨
          </h2>
          <p class="memory-modal-subtitle">
            Match all 6 pairs to unlock your first birthday surprise! 🎁❤️
          </p>
        </div>

        <!-- Progress Bar -->
        <div class="memory-stats-bar">
          <div class="stat-pill pairs-pill">
            <span class="stat-icon">💖</span>
            <span>Pairs: <strong id="memory-pairs-count">0</strong> / 6</span>
          </div>
        </div>

        <!-- 3D Flippable Cards Grid -->
        <div class="memory-grid" id="memory-grid"></div>

        <!-- Win Celebration Overlay -->
        <div class="memory-win-overlay" id="memory-win-overlay">
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
            <button class="win-open-gift-btn" id="memory-claim-btn">
              🎁 OPEN GIFT 1 NOW! ✨
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    this.modalEl = overlay;

    // Grab elements
    this.gridEl = overlay.querySelector('#memory-grid');
    this.pairsCountEl = overlay.querySelector('#memory-pairs-count');

    // Event listeners
    overlay.querySelector('#memory-close-btn').addEventListener('click', () => {
      soundManager.playTap();
      this.close();
    });

    overlay.querySelector('#memory-claim-btn').addEventListener('click', () => {
      this.handleClaimGift();
    });

    // Animate modal appearance
    requestAnimationFrame(() => {
      overlay.classList.add('modal-visible');
    });
  }

  generateShuffledCards() {
    const deck = [];
    CARD_DATA.forEach(item => {
      // 2 cards for each item (pair)
      deck.push({ ...item, id: `${item.key}-1` });
      deck.push({ ...item, id: `${item.key}-2` });
    });

    // Fisher-Yates Shuffle
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    return deck;
  }

  startNewGame() {
    this.cards = this.generateShuffledCards();
    this.firstCard = null;
    this.secondCard = null;
    this.isLocked = false;
    this.matchedPairs = 0;

    if (this.pairsCountEl) this.pairsCountEl.textContent = '0';

    const winOverlay = this.modalEl.querySelector('#memory-win-overlay');
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
              <img src="${card.image}" alt="${card.name}" class="memory-card-img" />
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
      // First card flipped
      this.firstCard = { el: cardEl, data: card };
    } else {
      // Second card flipped
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

    c1.classList.add('is-matched');
    c2.classList.add('is-matched');

    soundManager.playSuccessSound();
    confettiEngine.burst({ count: 25, x: window.innerWidth / 2, y: window.innerHeight * 0.4 });

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
      const winOverlay = this.modalEl.querySelector('#memory-win-overlay');
      if (winOverlay) {
        winOverlay.classList.add('win-overlay-active');
      }
    }, 450);
  }

  handleClaimGift() {
    soundManager.playGiftOpenSound();
    confettiEngine.burst({ count: 70 });

    if (this.modalEl) {
      this.modalEl.classList.remove('modal-visible');
    }

    setTimeout(() => {
      if (this.modalEl && this.modalEl.parentNode) {
        this.modalEl.parentNode.removeChild(this.modalEl);
      }
      document.body.classList.remove('modal-open');
      if (this.onComplete) {
        this.onComplete();
      }
    }, 350);
  }
}
