/**
 * 💖 Dedicated Game 2: The Magic Scratch Card (#gift2-game)
 * A beautifully aesthetic scratch card game where she must scratch 
 * to reveal the surprise and unlock Gift 2.
 */

import { birthdayConfig } from '../../config.js';
import { soundManager } from '../audio.js';
import { confettiEngine } from '../confetti.js';

export class Gift2GamePage {
  constructor(app) {
    this.app = app;
    this.herName = birthdayConfig.nickname || birthdayConfig.herName || 'Cutie';
    this.container = null;
    
    this.isDrawing = false;
    this.canvas = null;
    this.ctx = null;
    this.isRevealed = false;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'page-view gift2-game-view';
    this.container = container;

    container.innerHTML = `
      <div class="gift2-game-container tap-heart-container" style="padding-bottom: 50px;">
        <!-- Navigation Top Bar -->
        <div class="game-top-bar stagger-1">
          <button class="ref-btn game-back-btn" id="scratch-back-to-hub">
            ← Back to Gifts
          </button>
        </div>

        <!-- Page Header -->
        <div class="gift2-game-header tap-heart-header stagger-1">
          <span class="gift-badge-pill">✨ SURPRISE SCRATCH CARD ✨</span>
          <h1 class="ref-heading arched-text gift2-game-title tap-heart-title">
            Scratch to Reveal! 💖
          </h1>
          <p class="gift2-game-subtitle tap-heart-subtitle">
            Batao iske peeche kya chupa hai? Scratch the card to unlock your next surprise! 🎁
          </p>
        </div>

        <!-- Scratch Card Stage -->
        <div class="quiz-board-card tap-board-card stagger-2" style="position: relative; max-width: 350px; margin: 30px auto; padding: 20px; text-align: center;">
          <!-- Center Vintage Washi Tape Pin -->
          <img src="assets/scrapbook/scrapbook_pink_gold_brushstroke.png" class="game-board-washi" alt="washi tape" />
          
          <p style="font-style: italic; color: var(--text-warm); margin-bottom: 20px; font-weight: 600;">Use your finger to scratch! ✨</p>

          <div id="scratch-wrapper" style="position: relative; width: 100%; aspect-ratio: 1; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(160,97,106,0.2); background: #fff;">
            
            <!-- Hidden Prize Layer (Base) -->
            <div id="scratch-prize" style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; background: url('assets/images/vintage_aesthetic_bg.jpg') center/cover; padding: 20px;">
               <img src="gifs/peach-goma.gif" alt="yay" style="width: 120px; margin-bottom: 15px;" />
               <h3 style="color: #8A5058; font-size: 1.4rem; margin: 0 0 10px 0; font-family: var(--font-display); font-style: italic;">✨ YAAAY! ✨</h3>
               <p style="font-size: 0.95rem; color: #5C4033; margin-bottom: 20px; line-height: 1.4;">
                 You successfully scratched the card! 😍<br>
                 Get ready to see all the reasons why you are so special to me.
               </p>
               <button class="cute-btn" id="scratch-claim-btn" style="padding: 10px 20px; font-size: 0.9rem; margin-top: 10px; width: 100%; border: 2px solid #fff;">
                 🎁 OPEN SURPRISE!
               </button>
            </div>
            
            <!-- Scratch Canvas Layer (Top) -->
            <canvas id="scratch-canvas" style="position: absolute; inset: 0; z-index: 5; cursor: crosshair; touch-action: none; transition: opacity 0.8s ease;"></canvas>
          </div>
        </div>
      </div>
    `;

    this.attachEvents(container);
    return container;
  }

  attachEvents(container) {
    const backBtn = container.querySelector('#scratch-back-to-hub');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        soundManager.playTap();
        this.app.navigateTo('gifts-hub');
      });
    }

    const claimBtn = container.querySelector('#scratch-claim-btn');
    if (claimBtn) {
      claimBtn.addEventListener('click', () => {
        soundManager.playSuccessSound();
        confettiEngine.fireCannons();
        this.app.openedGifts[2] = true; 
        
        setTimeout(() => {
          this.app.navigateTo('special-things');
        }, 800);
      });
    }

    // Setup Canvas after mount
    setTimeout(() => {
      this.setupScratchCard();
    }, 100);
  }

  setupScratchCard() {
    this.canvas = this.container.querySelector('#scratch-canvas');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
    const wrapper = this.container.querySelector('#scratch-wrapper');
    let w = wrapper.offsetWidth;
    let h = wrapper.offsetHeight;
    if (!w || w === 0) w = 350;
    if (!h || h === 0) h = 350;
    
    this.canvas.width = w;
    this.canvas.height = h;

    // Fill the canvas with a beautiful gradient scratch layer
    const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
    gradient.addColorStop(0, '#D4B896');
    gradient.addColorStop(0.5, '#C9A88A');
    gradient.addColorStop(1, '#A0616A');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Add some pattern/text to the scratch layer
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = 'bold 26px Georgia, serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText('SCRATCH ME ✨', this.canvas.width / 2, this.canvas.height / 2);

    // Events
    this.canvas.addEventListener('mousedown', this.startDrawing.bind(this));
    this.canvas.addEventListener('mousemove', this.draw.bind(this));
    this.canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
    this.canvas.addEventListener('mouseleave', this.stopDrawing.bind(this));

    this.canvas.addEventListener('touchstart', this.startDrawing.bind(this), { passive: false });
    this.canvas.addEventListener('touchmove', this.draw.bind(this), { passive: false });
    this.canvas.addEventListener('touchend', this.stopDrawing.bind(this));
  }

  getPointerPos(e) {
    const rect = this.canvas.getBoundingClientRect();
    let clientX, clientY;
    
    if (e.type.includes('touch')) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  }

  startDrawing(e) {
    if (this.isRevealed) return;
    if (e.cancelable) e.preventDefault();
    this.isDrawing = true;
    const pos = this.getPointerPos(e);
    
    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 45; // Size of the scratch brush

    this.ctx.beginPath();
    this.ctx.moveTo(pos.x, pos.y);
  }

  draw(e) {
    if (!this.isDrawing || this.isRevealed) return;
    if (e.cancelable) e.preventDefault();

    const pos = this.getPointerPos(e);
    this.ctx.lineTo(pos.x, pos.y);
    this.ctx.stroke();

    // Occasional sound effect
    if (Math.random() < 0.05) soundManager.playTap();

    // Check percentage every few frames
    if (Math.random() < 0.1) {
      this.checkReveal();
    }
  }

  stopDrawing(e) {
    if (!this.isDrawing) return;
    this.isDrawing = false;
    this.checkReveal();
  }

  checkReveal() {
    if (this.isRevealed) return;

    // Get pixel data to calculate how much is scratched
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const pixels = imageData.data;
    
    let transparentPixels = 0;
    const totalPixels = pixels.length / 4; 

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] < 128) {
        transparentPixels++;
      }
    }

    const percentage = (transparentPixels / totalPixels) * 100;

    // If 50% or more is scratched, reveal the whole thing
    if (percentage > 50) {
      this.isRevealed = true;
      this.canvas.style.opacity = '0';
      this.canvas.style.pointerEvents = 'none'; // Prevent further interaction
      soundManager.playSparkle();
      confettiEngine.burst({ count: 120 });
    }
  }

  cleanup() {
    this.container = null;
  }
}
