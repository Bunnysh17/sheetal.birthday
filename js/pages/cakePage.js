/**
 * \u2728 Page 4: 3D Interactive Birthday Cake Celebration Screen
 * Realistic 3D birthday cake with glowing interactive candle flame,
 * dynamic candle blowing smoke VFX, clean instant cake cutting, slice sound & confetti.
 */

import { birthdayConfig } from '../../config.js';
import { soundManager } from '../audio.js';
import { confettiEngine } from '../confetti.js';

export class CakePage {
  constructor(app) {
    this.app = app;
    this.herName = birthdayConfig.nickname || birthdayConfig.herName || 'Sweetheart';
    this.step = 'blow'; // 'blow' -> 'cut' -> 'done'
    this.hasCut = false;
    this.animations = new Set();
    this.disposed = false;
  }

  render() {
    const herName = this.herName;
    const container = document.createElement('div');
    container.className = 'page-view cake-celebration-view';

    container.innerHTML = `
      <div class="cake-celebration-container cake-celebration-card">
        <!-- Draped Golden Warm Fairy Lights -->
        <div class="cake-fairy-lights" aria-hidden="true">
          <svg viewBox="0 0 500 55" class="fairy-lights-svg">
            <path d="M 15 15 Q 130 42 250 18 Q 370 42 485 15" fill="none" stroke="rgba(214, 160, 110, 0.45)" stroke-width="1.6" stroke-dasharray="3 2"/>
            <g class="bulb b1"><circle cx="45" cy="24" r="4.5" fill="#FFE082"/><circle cx="45" cy="24" r="10" fill="rgba(255, 224, 130, 0.35)"/></g>
            <g class="bulb b2"><circle cx="110" cy="33" r="5" fill="#FFD54F"/><circle cx="110" cy="33" r="11" fill="rgba(255, 213, 79, 0.35)"/></g>
            <g class="bulb b3"><circle cx="180" cy="31" r="4.5" fill="#FFE082"/><circle cx="180" cy="31" r="10" fill="rgba(255, 224, 130, 0.35)"/></g>
            <g class="bulb b4"><circle cx="250" cy="18" r="5.5" fill="#FFF176"/><circle cx="250" cy="18" r="13" fill="rgba(255, 241, 118, 0.4)"/></g>
            <g class="bulb b5"><circle cx="320" cy="31" r="4.5" fill="#FFE082"/><circle cx="320" cy="31" r="10" fill="rgba(255, 224, 130, 0.35)"/></g>
            <g class="bulb b6"><circle cx="390" cy="33" r="5" fill="#FFD54F"/><circle cx="390" cy="33" r="11" fill="rgba(255, 213, 79, 0.35)"/></g>
            <g class="bulb b7"><circle cx="455" cy="24" r="4.5" fill="#FFE082"/><circle cx="455" cy="24" r="10" fill="rgba(255, 224, 130, 0.35)"/></g>
          </svg>
        </div>

        <!-- Top Celebration Pill Badge -->
        <div class="cake-celebration-pill stagger-1">
          A MOMENT JUST FOR YOU
        </div>

        <!-- Arched Birthday Heading -->
        <div class="cake-heading-wrap stagger-1">
          <h1 class="cake-main-title">
            Happy Birthday,<br><span class="cake-name">${herName}.</span>
          </h1>
          <p class="cake-celebration-sub">Close your eyes for a second. Wish for something beautiful.</p>
        </div>

        <!-- Instruction Banner Pill -->
        <div class="cake-instruction-banner stagger-1" id="cake-instruction-banner">
          <span class="cake-instruction-text" id="cake-instruction" role="status" aria-live="polite">
            Make a wish. Then tap to blow out your candle.
          </span>
        </div>

        <!-- 3D Interactive Cake Centerpiece Stage -->
        <div class="cake-stage-centerpiece stagger-2">
          <div class="cake-garden" aria-hidden="true">
            <img class="cake-botanical cake-lavender" src="assets/scrapbook/vintage_lavender_bouquet_tied.png" alt="" />
            <img class="cake-botanical cake-rose" src="assets/scrapbook/vintage_pink_rosebud_stem.png" alt="" />
            <span class="cake-glimmer glimmer-one">&#10023;</span><span class="cake-glimmer glimmer-two">&#10022;</span>
            <span class="cake-garden-note">a wish, just for you</span>
          </div>
          <!-- Bottom-Left Pressed Golden Fern Botanical -->
          <img src="assets/scrapbook/scrapbook_golden_fern.png" class="sb-sticker sb-cake-fern" alt="golden fern" />

          <!-- Scalloped Ceramic & Gold Cake Stand Pedestal -->
          <div class="cake-stand-pedestal" aria-hidden="true">
            <div class="cake-stand-platter"></div>
            <div class="cake-stand-pillar"></div>
            <div class="cake-stand-base"></div>
            <div class="cake-stand-shadow"></div>
          </div>

          <!-- Main 3D Cake Container -->
          <div class="real-3d-cake-wrapper" id="real-3d-cake-wrap">
            <button type="button" class="real-3d-knife" id="real-3d-knife" aria-label="Blow out the candle, then cut the cake">
              <img src="assets/images/cake_knife_3d.png" alt="" class="real-knife-img" />
            </button>

            <!-- Uncut 3D Cake Image -->
            <img 
              src="assets/images/cake_3d_render.png" 
              alt="3D Birthday Cake" 
              class="real-3d-cake-img uncut-cake-img" 
              id="uncut-cake-img"
            />

            <!-- 3D Cut Birthday Cake Image (Cross Cut) -->
            <img 
              src="assets/images/cake_cut_3d_render.png" 
              alt="3D Cut Birthday Cake" 
              class="real-3d-cake-img cut-cake-img" 
              id="cut-cake-img"
            />

            <!-- Glowing Candle Flame Overlay -->
            <div class="candle-flame-overlay" id="flame-overlay">
              <div class="candle-glow-aura"></div>
              <div class="candle-flame-core"></div>
            </div>

            <!-- Smoke Puff Element on Extinguish -->
            <div class="smoke-puff-overlay" id="smoke-overlay">
              <span>\u{1F4A8}</span>
            </div>

            <svg class="cake-cross-cut-vfx" viewBox="0 0 100 100" aria-hidden="true">
              <path id="cut-trace-1" pathLength="1" d="M53.3 16.5 L46.5 43" />
              <path id="cut-trace-2" pathLength="1" d="M31.5 22.5 L72 35.5" />
            </svg>
          </div>

          <!-- Adorable Birthday Party Cats Mascot beside the Cake (100% Transparent Background) -->
          <div class="cake-companion-cats" title="Party Cats celebrating with you!">
            <img 
              src="gifs/peach-goma.gif" 
              alt="Peach and Goma celebrating your birthday" 
              class="cake-cats-img" 
            />
          </div>
        </div>

        <ol class="cake-ritual" aria-label="Your birthday moment">
          <li data-step="wish" aria-current="step"><span>01</span> Make a wish</li>
          <li data-step="cut"><span>02</span> Cut the cake</li>
          <li data-step="celebrate"><span>03</span> Celebrate</li>
        </ol>
        <!-- Clean, Prominent Celebration Action Button -->
        <div class="cake-action-container stagger-3">
          <button class="cake-action-btn inviting-pulse" id="cake-action-btn">
            \u{1F4A8} BLOW OUT THE CANDLE \u2728
          </button>
        </div>
      </div>
    `;

    this.attachEvents(container);
    return container;
  }

  attachEvents(container) {
    const herName = this.herName;
    const actionBtn = container.querySelector('#cake-action-btn');
    const instruction = container.querySelector('#cake-instruction');
    const flame = container.querySelector('#flame-overlay');
    const smoke = container.querySelector('#smoke-overlay');
    const knife = container.querySelector('#real-3d-knife');
    const cakeWrap = container.querySelector('#real-3d-cake-wrap');

    // STEP 1: BLOW CANDLE
    const handleBlow = () => {
      if (this.step !== 'blow') return;

      soundManager.playBlowSound();
      flame.classList.add('flame-extinguished');
      smoke.classList.add('smoke-active');

      instruction.textContent = 'Wish made. Now for the sweetest part…';
      knife.setAttribute('aria-label', 'Cut your birthday cake');
      container.querySelector('[data-step="wish"]').classList.add('is-complete');
      container.querySelector('[data-step="cut"]').setAttribute('aria-current', 'step');
      container.querySelector('[data-step="wish"]').removeAttribute('aria-current');
      actionBtn.innerHTML = "🎂 CUT THE CAKE ✨";
      this.step = 'cut';
    };

    // The knife tip and both seams share the cake's normalized coordinate system.
    const handleCut = async () => {
      if (this.step !== 'cut' || this.hasCut) return;
      this.hasCut = true;
      this.step = 'cutting';
      actionBtn.disabled = true;
      actionBtn.classList.remove('inviting-pulse');
      actionBtn.textContent = 'A little birthday magic…';
      instruction.textContent = 'Two little cuts, and a wish just for you…';
      knife.disabled = true;
      try {
        await Promise.all([...cakeWrap.querySelectorAll('img')].map(img => img.decode()));
        if (this.disposed) return;
        // Freeze at the current floating position, avoiding a snap on click.
        cakeWrap.style.transform = getComputedStyle(cakeWrap).transform;
        cakeWrap.classList.add('cake-is-cutting');
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        // Lift before turning the blade toward the second, left-to-right seam.
        const pose = (x, y, opacity = 1, angle = -100) => ({
          left: `${x}%`, top: `${y}%`, opacity,
          transform: `translate(-89.8%, -82.2%) rotate(${angle}deg)`
        });
        if (!reduced) {
          await this.animate(knife, [pose(20, 75), pose(30, 12), pose(53.3, 8)], 600);
          await this.animate(knife, [pose(53.3, 8), pose(53.3, 16.5)], 300);
          soundManager.playSliceSound();
          await Promise.all([
            this.animate(knife, [pose(53.3, 16.5), pose(50.8, 27), pose(46.5, 43)], 900),
            this.animate(container.querySelector('#cut-trace-1'), [{strokeDashoffset: 1}, {strokeDashoffset: 0}], 900)
          ]);
          // Lift, level the blade, then keep it straight throughout the left-to-right cut.
          await this.animate(knife, [pose(46.5, 43), pose(46.5, 25)], 250);
          await this.animate(knife, [pose(46.5, 25), pose(31.5, 12, 1, -39)], 550);
          await this.animate(knife, [pose(31.5, 12, 1, -39), pose(31.5, 22.5, 1, -39)], 280);
          soundManager.playSliceSound();
          await Promise.all([
            this.animate(knife, [pose(31.5, 22.5, 1, -39), pose(72, 35.5, 1, -39)], 950),
            this.animate(container.querySelector('#cut-trace-2'), [{strokeDashoffset: 1}, {strokeDashoffset: 0}], 950)
          ]);
          await this.animate(knife, [pose(72, 35.5, 1, -39), pose(78, 18, 0, -39)], 500);
        }
        if (this.disposed) return;
        knife.hidden = true;
        cakeWrap.classList.add('cake-is-cut');
        if (!reduced) {
          await this.animate(container.querySelector('#cut-cake-img'), [{opacity: 0}, {opacity: 1}], 450);
        }
        if (this.disposed) return;
        this.step = 'done';
        container.querySelector('[data-step="cut"]').classList.add('is-complete');
        container.querySelector('[data-step="cut"]').removeAttribute('aria-current');
        container.querySelector('[data-step="celebrate"]').setAttribute('aria-current', 'step');
        soundManager.playCelebrationFanfare();
        if (!reduced) confettiEngine.fireCannons();
        instruction.textContent = `Happiest Birthday ${herName}! A little story is waiting for you.`;
        actionBtn.textContent = 'OPEN YOUR BIRTHDAY SURPRISES';
        actionBtn.disabled = false;
        if (!reduced) container.querySelector('.cake-cats-img')?.classList.add('cats-celebrate');
      } catch (error) {
        if (this.disposed) return;
        this.animations.forEach(animation => animation.cancel());
        this.animations.clear();
        cakeWrap.classList.remove('cake-is-cutting', 'cake-is-cut');
        cakeWrap.style.transform = '';
        knife.hidden = false;
        knife.disabled = false;
        this.hasCut = false;
        this.step = 'cut';
        actionBtn.disabled = false;
        actionBtn.textContent = 'TRY CUTTING AGAIN';
        instruction.textContent = 'The cake is still getting ready. Tap to try again.';
        console.error('Cake animation could not finish:', error);
      }
    };

    actionBtn.addEventListener('click', () => {
      if (this.step === 'blow') {
        handleBlow();
      } else if (this.step === 'cut') {
        handleCut();
      } else if (this.step === 'done') {
        soundManager.playTap();
        this.app.navigateTo('gifts-hub');
      }
    });

    cakeWrap.addEventListener('click', () => {
      if (this.step === 'blow') {
        handleBlow();
      } else if (this.step === 'cut') {
        handleCut();
      }
    });

    if (knife) {
      knife.addEventListener('click', (event) => {
        event.stopPropagation();
        if (this.step === 'blow') {
          handleBlow();
        } else if (this.step === 'cut') {
          handleCut();
        }
      });
    }
  }

  async animate(element, frames, duration) {
    if (this.disposed) throw new DOMException('Page closed', 'AbortError');
    const animation = element.animate(frames, { duration, easing: 'ease-in-out', fill: 'forwards' });
    this.animations.add(animation);
    await animation.finished;
    animation.commitStyles();
    animation.cancel();
    this.animations.delete(animation);
  }

  cleanup() {
    this.disposed = true;
    this.animations.forEach(animation => animation.cancel());
    this.animations.clear();
  }
}