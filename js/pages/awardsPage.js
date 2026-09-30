import { soundManager } from '../audio.js';
import { birthdayConfig } from '../../config.js';

export class AwardsPage {
  constructor(app) {
    this.app = app;
    this.currentThingIndex = -1;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'page-view';
    
    // Soft, diary-like aesthetic
    container.style.color = '#5C4033';
    container.style.minHeight = '100vh';
    container.style.position = 'relative';
    container.style.overflow = 'hidden';

    container.innerHTML = `
      <style>
        .thing-fade-in { animation: fadeIn 1s forwards; }
        
        .diary-card {
          background: #ffffff;
          border: 1px solid rgba(201, 168, 108, 0.3);
          border-radius: 4px;
          padding: 40px 30px;
          margin: 30px auto;
          max-width: 500px;
          color: #5C4033;
          box-shadow: 0 10px 20px rgba(0,0,0,0.05), inset 0 0 20px rgba(201, 168, 108, 0.05);
          position: relative;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s ease;
          background-image: repeating-linear-gradient(transparent, transparent 31px, rgba(201,168,108,0.2) 31px, rgba(201,168,108,0.2) 32px);
          background-attachment: local;
          line-height: 32px;
        }
        .diary-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 25px;
          bottom: 0;
          width: 2px;
          background: rgba(255, 105, 135, 0.3);
        }
        
        .diary-card.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .diary-text {
          font-family: 'Caveat', cursive;
          font-size: 1.8rem;
          color: #4A3525;
          margin-left: 15px;
          position: relative;
          z-index: 2;
          white-space: pre-wrap;
        }

        .thing-number {
          font-family: var(--font-heading);
          font-size: 1.2rem;
          color: #C9A86C;
          margin-bottom: 10px;
          margin-left: 15px;
          letter-spacing: 2px;
        }

        .final-thing {
          text-align: center;
          opacity: 0;
          transition: opacity 2s ease;
          padding: 60px 20px;
        }
        .final-thing.visible {
          opacity: 1;
        }
        
        /* Floating decors */
        .decor-float { animation: float 6s ease-in-out infinite; }
      </style>

      <div id="things-container" style="width: 100%; min-height: 100vh; padding: 60px 20px 100px; position: relative; z-index: 2;">
        
        <!-- Thing 1 -->
        <div class="diary-card" id="thing-0">
          <img src="assets/scrapbook/vintage_purple_washi_tape.png" style="position: absolute; top: -12px; left: 30%; width: 70px; transform: rotate(-5deg); opacity: 0.8; z-index: 5;">
          <img src="assets/scrapbook/scrapbook_postage_stamp_heart.png" style="position: absolute; top: -15px; right: -15px; width: 60px; transform: rotate(10deg); z-index: 5;">
          <div class="thing-number">ONE</div>
          <div class="diary-text">${birthdayConfig.fiveThings[0]}</div>
        </div>

        <!-- Thing 2 -->
        <div class="diary-card" id="thing-1">
          <img src="assets/scrapbook/vintage_golden_fern_sprig.png" style="position: absolute; bottom: -20px; left: -20px; width: 70px; transform: rotate(-15deg); opacity: 0.8; z-index: 5;">
          <img src="assets/scrapbook/vintage_pink_gold_brushstroke.png" style="position: absolute; top: 15px; right: 10px; width: 50px; opacity: 0.5; z-index: 1;">
          <div class="thing-number">TWO</div>
          <div class="diary-text">${birthdayConfig.fiveThings[1]}</div>
        </div>

        <!-- Thing 3 -->
        <div class="diary-card" id="thing-2">
          <img src="assets/scrapbook/vintage_celestial_pink_cloud.png" style="position: absolute; top: -30px; right: -20px; width: 80px; opacity: 0.6; z-index: 5;">
          <img src="assets/scrapbook/vintage_purple_washi_tape.png" style="position: absolute; bottom: -10px; left: 10%; width: 60px; transform: rotate(10deg); opacity: 0.7; z-index: 5;">
          <div class="thing-number">THREE</div>
          <div class="diary-text">${birthdayConfig.fiveThings[2]}</div>
        </div>

        <!-- Thing 4 -->
        <div class="diary-card" id="thing-3">
          <img src="assets/scrapbook/vintage_blue_forgetmenot_sprig.png" style="position: absolute; top: 10px; right: -25px; width: 65px; transform: rotate(10deg); opacity: 0.7; z-index: 5;">
          <img src="assets/scrapbook/vintage_round_postmark_heart.png" style="position: absolute; bottom: 5px; right: 5px; width: 45px; opacity: 0.4; z-index: 1;">
          <div class="thing-number">FOUR</div>
          <div class="diary-text">${birthdayConfig.fiveThings[3]}</div>
        </div>

        <!-- Thing 5 -->
        <div class="diary-card" id="thing-4">
          <img src="assets/scrapbook/vintage_purple_washi_tape.png" style="position: absolute; top: -10px; left: 50%; width: 80px; transform: translateX(-50%) rotate(-3deg); opacity: 0.9; z-index: 5;">
          <img src="assets/scrapbook/vintage_glitter_star_pink.png" style="position: absolute; bottom: 15px; left: -10px; width: 30px; opacity: 0.6; z-index: 5;">
          <div class="thing-number">FIVE</div>
          <div class="diary-text">${birthdayConfig.fiveThings[4]}</div>
        </div>

        <div class="final-thing" id="final-thing" style="position: relative;">
          <img src="assets/scrapbook/vintage_pink_peony_stem.png" style="position: absolute; top: -40px; right: 10%; width: 120px; opacity: 0.4; z-index: -1;">
          <img src="assets/scrapbook/scrapbook_luna_moth_ivory.png" style="width: 80px; margin-bottom: 20px; opacity: 0.8;">
          <h2 style="font-family: 'Great Vibes', cursive; font-size: 3rem; color: #8C6A5D; margin: 0;">Happy Birthday Sheetal</h2>
          <p style="font-size: 1.2rem; color: #A88B7D; margin-top: 15px; letter-spacing: 1px;">You are pretty amazing.</p>
          
          <button class="ref-btn inviting-pulse" id="awards-next-btn" style="margin-top: 40px; padding: 12px 35px; font-size: 1.1rem; opacity: 0; transition: opacity 1s ease;">
            EK AAKHRI MESSAGE... 💌
          </button>
        </div>

      </div>
    `;

    const nextBtn = container.querySelector('#awards-next-btn');

    nextBtn.addEventListener('click', () => {
      soundManager.playTap();
      this.app.navigateTo('memories-circle');
    });

    // Automatically start showing the diary cards
    setTimeout(() => {
      window.scrollTo(0, 0);
      this.showNextThing();
    }, 500);

    // Observer to trigger animations on scroll
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          if (entry.target.classList.contains('diary-card')) {
            const index = parseInt(entry.target.id.split('-')[1]);
            if (index === this.currentThingIndex) {
              setTimeout(() => {
                this.showNextThing();
              }, 4500); // Wait 4.5s before showing the next one
            }
          }
          
          // If the final thing is visible, show the next button shortly after
          if (entry.target.id === 'final-thing') {
            setTimeout(() => {
              nextBtn.style.opacity = '1';
            }, 2500);
          }
        }
      });
    }, { threshold: 0.3 });

    this.bgMusic = new Audio('mix_48s.mp3');
    this.bgMusic.volume = 0.75;
    this.bgMusic.loop = true;
    
    soundManager.suppressBGM(true);
    
    const tryPlayMusic = () => {
      if (this.bgMusic) {
        this.bgMusic.play().catch(() => {});
        document.removeEventListener('click', tryPlayMusic);
      }
    };
    
    this.bgMusic.play().catch(() => {
      document.addEventListener('click', tryPlayMusic);
    });

    return container;
  }

  showNextThing() {
    this.currentThingIndex++;
    if (this.currentThingIndex < 5) {
      const el = document.getElementById(`thing-${this.currentThingIndex}`);
      if (el) {
        el.style.display = 'block';
        this.observer.observe(el);
        
        // Auto-scroll slightly to bring it into view if needed
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    } else {
      const finalEl = document.getElementById('final-thing');
      if (finalEl) {
        finalEl.style.display = 'block';
        this.observer.observe(finalEl);
        setTimeout(() => {
          finalEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    }
  }

  cleanup() {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.bgMusic) {
      this.bgMusic.pause();
      this.bgMusic.removeAttribute('src');
      this.bgMusic.load();
      this.bgMusic = null;
    }
    soundManager.suppressBGM(false);
  }
}
