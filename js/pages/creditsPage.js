import { soundManager } from '../audio.js';
import { openLandscapeVideo } from '../components/landscapeVideoModal.js';

export class CreditsPage {
  constructor(app) {
    this.app = app;
    this.activeTimeouts = [];
    this.activeLandscapeModal = null;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'page-view';
    container.style.color = '#fff';
    container.style.height = '100vh';
    container.style.width = '100vw';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.zIndex = '99999';
    container.style.pointerEvents = 'none'; // Ensure container never blocks clicks
    container.style.overflow = 'hidden';

    // Create a full-screen blackout element appended to body to cover the floral background
    const blackout = document.createElement('div');
    blackout.id = 'credits-blackout';
    blackout.style.cssText = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: #000; z-index: 999999; pointer-events: auto;';
    document.body.appendChild(blackout);

    // Hide the bottom navigation bar for a cinematic effect
    const bottomNav = document.getElementById('dev-quick-jump-bar');
    if (bottomNav) {
        bottomNav.style.display = 'none';
    }

    blackout.innerHTML = `
      <style>
        .credits-scroll {
          position: absolute;
          top: 100vh;
          left: 0;
          width: 100vw;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          animation: scrollUp 25s linear forwards;
          pointer-events: none;
        }
        @keyframes scrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-200vh); }
        }
        .credit-block {
          margin-bottom: 50px;
        }
        .credit-title {
          font-size: 1rem;
          color: #888;
          letter-spacing: 4px;
          margin-bottom: 8px;
          text-transform: uppercase;
          font-family: 'Helvetica Neue', Arial, sans-serif;
        }
        .credit-name {
          font-size: 1.8rem;
          font-family: 'Georgia', serif;
          color: #fff;
          letter-spacing: 2px;
        }
        
        .fade-lines-container {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          opacity: 0;
          pointer-events: auto;
          transition: opacity 2s ease;
        }
        .fade-line {
          font-size: 1.2rem;
          color: #ddd;
          opacity: 0;
          margin-bottom: 20px;
          text-align: center;
          transition: opacity 1.5s ease;
          font-family: var(--font-body);
        }
        .final-hbd {
          font-family: 'Caveat', 'Great Vibes', cursive;
          font-size: clamp(2.4rem, 8vw, 3.6rem);
          color: #ffb6c1;
          opacity: 0;
          transform: scale(0.9);
          transition: all 2s ease;
          margin: 25px auto;
          text-shadow: 0 0 20px rgba(255,182,193,0.35);
          text-align: center !important;
          width: 100%;
          display: block;
          line-height: 1.25;
        }
        .final-wishes {
          font-size: 1.1rem;
          color: #bbb;
          line-height: 1.8;
          text-align: center;
          opacity: 0;
          transition: opacity 2s ease;
          max-width: 80%;
        }

        .credits-clickable-btn {
          cursor: pointer !important;
          pointer-events: auto !important;
          user-select: none;
          outline: none;
        }
        
        /* Hide mouse animations on this page */
        .cursor-sparkle, .click-spark-particle {
          display: none !important;
        }
      </style>



      <!-- Scrolling Credits -->
      <div class="credits-scroll" id="credits-scroller">
        
        <div class="credit-block">
          <div class="credit-title">DIRECTED BY</div>
          <div class="credit-name">Naveen</div>
        </div>

        <div class="credit-block">
          <div class="credit-title">STARRING</div>
          <div class="credit-name">Sheetal & Naveen</div>
        </div>
        
        <div class="credit-block">
          <div class="credit-title">MAIN CHARACTER</div>
          <div class="credit-name">Sheetal</div>
        </div>
        
        <div class="credit-block">
          <div class="credit-title">PRODUCED & WRITTEN WITH LOVE BY</div>
          <div class="credit-name">Naveen</div>
        </div>
        
        <div class="credit-block">
          <div class="credit-title">COMEDY DEPARTMENT</div>
          <div class="credit-name">All our silly random conversations</div>
        </div>
        
        <div class="credit-block">
          <div class="credit-title">BEST MEMORIES</div>
          <div class="credit-name">School time, Ludo, aur tumhari muskaan</div>
        </div>
        
        <div class="credit-block">
          <div class="credit-title">BACKGROUND MUSIC</div>
          <div class="credit-name">Har wo gaana jo tumhe yaad dilata hai</div>
        </div>
        
        <div class="credit-block" style="margin-top: 80px;">
          <div class="credit-title">SPECIAL THANKS</div>
          <div class="credit-name">To You, Sheetal.<br><span style="font-size: 1.1rem; color: #aaa; font-family: 'Helvetica Neue', Arial, sans-serif; display: block; margin-top: 15px; max-width: 500px; margin-left: auto; margin-right: auto; line-height: 1.6; letter-spacing: 1px;">For coming into my life and making it so beautiful. Happy Birthday.</span></div>
        </div>
      </div>

      <!-- Fading End Screen Container -->
      <div class="fade-lines-container" id="fade-container">
        
        <!-- 1. Story Lines -->
        <div id="lines-group" style="position: absolute; top: 45%; left: 0; width: 100%; transform: translateY(-50%); display: flex; flex-direction: column; align-items: center; pointer-events: none;">
          <div class="fade-line" id="line1">There was no perfect gift I could put into a box.</div>
          <div class="fade-line" id="line2">So I made you a little place on the internet instead.</div>
          <div class="fade-line" id="line3">A place made of stupid little ideas, wishes, surprises…</div>
          <div class="fade-line" id="line4">and a lot of thought about you.</div>
        </div>
        
        <!-- 2. HBD Message -->
        <div id="hbd-group" style="position: absolute; top: 45%; left: 0; width: 100%; transform: translateY(-50%); display: flex; flex-direction: column; align-items: center; justify-content: center; pointer-events: none; text-align: center; padding: 0 20px; box-sizing: border-box;">
          <div class="final-hbd" id="final-hbd">Happy Birthday,<br>Sheetal. ♡</div>
          
          <div class="final-wishes" id="final-wishes">
            I hope this next year gives you more reasons to laugh,<br>
            more days worth remembering,<br>
            and a lot of moments that make you genuinely happy.
          </div>
        </div>

        <!-- 3. 🕊️ Sorry Section (Appears after Happy Birthday) -->
        <div id="sorry-group" style="
          position: absolute;
          top: 45%;
          left: 0;
          width: 100%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 1.2s ease;
          pointer-events: none;
          text-align: center;
          padding: 20px;
          box-sizing: border-box;
        ">
          <!-- You can customize / edit these lines anytime -->
          <div class="fade-line" id="sorry-line1" style="font-family: 'Georgia', serif; font-size: 2.2rem; color: #fff; margin-bottom: 18px; letter-spacing: 1px;">And one last thing...</div>
          <div class="fade-line" id="sorry-line2" style="font-size: 1.25rem; color: #ccc; max-width: 600px; line-height: 1.8; margin-bottom: 12px; font-family: var(--font-body);">I am truly sorry for every time I hurt you or made things difficult.</div>
          <div class="fade-line" id="sorry-line3" style="font-size: 1.15rem; color: #999; max-width: 550px; line-height: 1.7; font-style: italic; font-family: 'Georgia', serif;">You deserve only love, peace, and happiness.</div>
        </div>

        <!-- 4. 🖤 One Hug? Prompt (Simple on pure black page, no decorations, NO emojis) -->
        <div id="hug-prompt-group" style="
          position: absolute;
          top: 45%;
          left: 0;
          width: 100%;
          transform: translateY(-50%);
          display: none;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 1s ease;
          pointer-events: auto !important;
          z-index: 50;
          text-align: center;
          padding: 20px;
          box-sizing: border-box;
        ">
          <h2 style="
            font-family: 'Cinzel', 'Georgia', serif;
            font-size: 2.8rem;
            font-weight: normal;
            color: #ffffff;
            letter-spacing: 3px;
            margin: 0 0 35px 0;
          ">One Hug?</h2>

          <div style="display: flex; gap: 24px; justify-content: center; align-items: center;">
            <button id="credits-btn-hug-yes" class="credits-clickable-btn" style="
              min-width: 120px;
              padding: 12px 36px;
              background: #ffffff;
              color: #000000;
              border: 1px solid #ffffff;
              border-radius: 30px;
              font-family: 'Helvetica Neue', Arial, sans-serif;
              font-size: 1rem;
              font-weight: 600;
              letter-spacing: 2px;
              text-transform: uppercase;
              cursor: pointer !important;
              transition: all 0.3s ease;
            ">YES</button>

            <button id="credits-btn-hug-no" class="credits-clickable-btn" style="
              min-width: 120px;
              padding: 12px 36px;
              background: transparent;
              color: #888888;
              border: 1px solid #444444;
              border-radius: 30px;
              font-family: 'Helvetica Neue', Arial, sans-serif;
              font-size: 1rem;
              font-weight: 600;
              letter-spacing: 2px;
              text-transform: uppercase;
              cursor: pointer !important;
              transition: all 0.3s ease;
            ">NO</button>
          </div>
        </div>

        <!-- 5. 🎬 Hug Video Section (Plays when YES is clicked) -->
        <div id="credits-video-group" style="
          position: absolute;
          top: 45%;
          left: 0;
          width: 100%;
          transform: translateY(-50%);
          display: none;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.8s ease;
          pointer-events: auto !important;
          z-index: 50;
          padding: 15px;
          box-sizing: border-box;
        ">
          <!-- Video Card with Tap to Pause/Resume -->
          <div id="credits-video-wrapper" class="credits-clickable-btn" style="
            width: 100%;
            max-width: 440px;
            border-radius: 22px;
            overflow: hidden;
            box-shadow: 0 0 50px rgba(255, 182, 193, 0.28), 0 20px 45px rgba(0,0,0,0.85);
            border: 1.5px solid rgba(255, 182, 193, 0.45);
            background: #000;
            position: relative;
            cursor: pointer !important;
            user-select: none;
            pointer-events: auto !important;
          ">
            <video id="credits-hug-video" src="hug.mp4" playsinline style="
              width: 100%;
              height: auto;
              max-height: 65vh;
              display: block;
              object-fit: contain;
              background: #000;
              pointer-events: none;
            "></video>

            <!-- Play/Pause Indicator Center Badge -->
            <div id="credits-play-badge" style="
              position: absolute;
              inset: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              background: rgba(0, 0, 0, 0.3);
              opacity: 0;
              transition: opacity 0.25s ease;
              pointer-events: none;
            ">
              <div style="
                width: 68px;
                height: 68px;
                background: rgba(255, 255, 255, 0.92);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 6px 20px rgba(0,0,0,0.4);
              ">
                <span id="credits-play-icon" style="font-size: 2rem; color: #333; margin-left: 4px;">▶</span>
              </div>
            </div>
          </div>

          <!-- Video Buttons: Full Screen -->
          <div id="credits-video-controls-row" style="
            display: flex;
            gap: 14px;
            align-items: center;
            justify-content: center;
            margin-top: 18px;
            flex-wrap: wrap;
            pointer-events: auto !important;
            z-index: 60;
          ">
            <button id="credits-btn-fullscreen" class="credits-clickable-btn" style="
              color: #fff;
              background: rgba(255, 182, 193, 0.2);
              border: 1px solid rgba(255, 182, 193, 0.5);
              padding: 10px 28px;
              border-radius: 25px;
              font-size: 1rem;
              cursor: pointer !important;
              font-family: 'Helvetica Neue', Arial, sans-serif;
              letter-spacing: 1px;
              transition: all 0.3s ease;
              display: inline-flex;
              align-items: center;
              gap: 8px;
              box-shadow: 0 4px 15px rgba(0,0,0,0.4);
            ">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle;"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg> Full Screen
            </button>
          </div>
        </div>
        
        <!-- 6. 🎬 The End -->
        <div class="the-very-end" id="the-very-end" style="
          position: absolute;
          top: 45%;
          left: 0;
          width: 100%;
          transform: translateY(-50%) scale(0.95);
          display: none;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 2s cubic-bezier(0.16, 1, 0.3, 1), transform 2s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: auto !important;
          z-index: 60;
        ">
          <h1 style="font-family: 'Cinzel', 'Georgia', serif; font-size: clamp(2.2rem, 8vw, 5.2rem); letter-spacing: clamp(6px, 2.5vw, 18px); white-space: nowrap; color: #fff; margin: 0 auto 20px auto; font-weight: normal; text-shadow: 0 0 35px rgba(255,255,255,0.35); text-align: center; width: 100%;">THE END</h1>
          <p style="color: #ddd; font-size: clamp(1.05rem, 3.8vw, 1.3rem); margin: 0 auto; line-height: 1.8; text-align: center; letter-spacing: 1.5px; max-width: 90%;">But for us, this is just the beginning. ♡<br>Thank you for being my favorite person.</p>
          
          <button id="credits-btn-close-website" class="credits-clickable-btn" style="
            margin-top: 48px;
            padding: 8px 16px;
            background: transparent;
            color: #666666;
            border: none;
            outline: none;
            font-family: 'Cinzel', 'Georgia', serif;
            font-size: 0.85rem;
            letter-spacing: 3px;
            text-transform: uppercase;
            cursor: pointer !important;
            opacity: 0;
            transition: opacity 2s ease, color 0.4s ease, transform 0.4s ease;
            pointer-events: none;
            display: inline-block;
          ">
            close website
          </button>
        </div>
      </div>
    `;

    // Elements
    const hugPromptGroup = blackout.querySelector('#hug-prompt-group');
    const btnHugYes = blackout.querySelector('#credits-btn-hug-yes');
    const btnHugNo = blackout.querySelector('#credits-btn-hug-no');
    const videoGroup = blackout.querySelector('#credits-video-group');
    const videoWrapper = blackout.querySelector('#credits-video-wrapper');
    const vid = blackout.querySelector('#credits-hug-video');
    const playBadge = blackout.querySelector('#credits-play-badge');
    const playIcon = blackout.querySelector('#credits-play-icon');
    const fullscreenBtn = blackout.querySelector('#credits-btn-fullscreen');
    const theEnd = blackout.querySelector('#the-very-end');
    const btnCloseWebsite = blackout.querySelector('#credits-btn-close-website');

    const addTimer = (fn, delay) => {
      const t = setTimeout(fn, delay);
      this.activeTimeouts.push(t);
      return t;
    };

    const clearAllTimers = () => {
      this.activeTimeouts.forEach(t => clearTimeout(t));
      this.activeTimeouts = [];
    };

    // Helper to transition smoothly to THE END
    const proceedToTheEnd = () => {
      clearAllTimers();
      if (vid) {
        try { vid.pause(); } catch(e) {}
      }

      // 1. Smoothly fade out and scale down the video
      if (videoGroup) {
        videoGroup.style.transition = 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
        videoGroup.style.opacity = '0';
        videoGroup.style.transform = 'translateY(-50%) scale(0.95)';
        setTimeout(() => {
          videoGroup.style.display = 'none';
        }, 1000);
      }

      if (hugPromptGroup) {
        hugPromptGroup.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        hugPromptGroup.style.opacity = '0';
        hugPromptGroup.style.transform = 'translateY(-50%) scale(0.95)';
        setTimeout(() => {
          hugPromptGroup.style.display = 'none';
        }, 800);
      }

      // 2. Once video is fully faded out into black, cinematic fade-in of THE END
      setTimeout(() => {
        soundManager.suppressBGM(false);
        if (theEnd) {
          theEnd.style.display = 'flex';
          theEnd.style.opacity = '0';
          theEnd.style.transform = 'translateY(-50%) scale(0.94)';
          
          if (btnCloseWebsite) {
            btnCloseWebsite.style.opacity = '0';
            btnCloseWebsite.style.pointerEvents = 'none';
          }

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              theEnd.style.transition = 'opacity 2s cubic-bezier(0.16, 1, 0.3, 1), transform 2s cubic-bezier(0.16, 1, 0.3, 1)';
              theEnd.style.opacity = '1';
              theEnd.style.transform = 'translateY(-50%) scale(1)';
            });
          });

          // 4.5 seconds after THE END, gently fade in the subtle "close website" text
          addTimer(() => {
            if (btnCloseWebsite) {
              btnCloseWebsite.style.transition = 'opacity 2s ease, color 0.4s ease, transform 0.4s ease';
              btnCloseWebsite.style.opacity = '0.65';
              btnCloseWebsite.style.pointerEvents = 'auto';
            }
          }, 4500);
        }
      }, 950);
    };

    // Helper to start the Video
    const startVideo = () => {
      clearAllTimers();
      soundManager.suppressBGM(true);
      if (hugPromptGroup) {
        hugPromptGroup.style.opacity = '0';
        setTimeout(() => { hugPromptGroup.style.display = 'none'; }, 400);
      }
      setTimeout(() => {
        if (videoGroup) {
          videoGroup.style.display = 'flex';
          requestAnimationFrame(() => {
            videoGroup.style.opacity = '1';
            if (vid) {
              vid.currentTime = 0;
              vid.play().catch(err => console.log('Autoplay waiting for interaction:', err));
            }
          });
        }
      }, 450);
    };



    // Hug Prompt YES / NO buttons
    if (btnHugYes) {
      btnHugYes.addEventListener('click', (e) => {
        e.stopPropagation();
        soundManager.playTap();
        startVideo();
      });
      btnHugYes.addEventListener('mouseenter', () => {
        btnHugYes.style.transform = 'scale(1.05)';
        btnHugYes.style.boxShadow = '0 0 20px rgba(255,255,255,0.6)';
      });
      btnHugYes.addEventListener('mouseleave', () => {
        btnHugYes.style.transform = 'none';
        btnHugYes.style.boxShadow = 'none';
      });
    }

    if (btnHugNo) {
      btnHugNo.addEventListener('click', (e) => {
        e.stopPropagation();
        soundManager.playTap();
        proceedToTheEnd();
      });
      btnHugNo.addEventListener('mouseenter', () => {
        btnHugNo.style.color = '#ffffff';
        btnHugNo.style.borderColor = '#888888';
        btnHugNo.style.transform = 'scale(1.05)';
      });
      btnHugNo.addEventListener('mouseleave', () => {
        btnHugNo.style.color = '#888888';
        btnHugNo.style.borderColor = '#444444';
        btnHugNo.style.transform = 'none';
      });
    }

    // Attach Video Event Handlers
    if (videoWrapper && vid) {
      videoWrapper.addEventListener('click', (e) => {
        e.stopPropagation();
        if (vid.paused) {
          vid.play().catch(err => console.log(err));
          if (playBadge) playBadge.style.opacity = '0';
        } else {
          vid.pause();
          if (playIcon) {
            playIcon.textContent = '▶';
            playIcon.style.marginLeft = '4px';
          }
          if (playBadge) playBadge.style.opacity = '1';
        }
      });

      vid.addEventListener('play', () => {
        if (playBadge) playBadge.style.opacity = '0';
        soundManager.suppressBGM(true);
      });
      vid.addEventListener('pause', () => {
        if (!vid.ended && playBadge) {
          if (playIcon) {
            playIcon.textContent = '▶';
            playIcon.style.marginLeft = '4px';
          }
          playBadge.style.opacity = '1';
        }
        if (!vid.ended) {
          soundManager.suppressBGM(false);
        }
      });

    // When video ends, automatically proceed to THE END
    vid.addEventListener('ended', () => {
      proceedToTheEnd();
    });
  }

    // Fullscreen button
    if (fullscreenBtn && vid) {
      fullscreenBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        soundManager.playTap();
        const curTime = vid.currentTime;
        vid.pause();
        if (playBadge) playBadge.style.opacity = '1';

        this.activeLandscapeModal = openLandscapeVideo({
          src: 'hug.mp4',
          title: "One Hug? ♡",
          currentTime: curTime,
          onTimeUpdate: (time) => {
            vid.currentTime = time;
          },
          onClose: (time) => {
            vid.currentTime = time;
            this.activeLandscapeModal = null;
          },
          onEnded: () => {
            if (this.activeLandscapeModal) {
              this.activeLandscapeModal.close();
              this.activeLandscapeModal = null;
            }
            proceedToTheEnd();
          }
        });
      });

      fullscreenBtn.addEventListener('mouseenter', () => {
        fullscreenBtn.style.background = 'rgba(255, 182, 193, 0.4)';
        fullscreenBtn.style.borderColor = 'rgba(255, 182, 193, 0.9)';
      });
      fullscreenBtn.addEventListener('mouseleave', () => {
        fullscreenBtn.style.background = 'rgba(255, 182, 193, 0.2)';
        fullscreenBtn.style.borderColor = 'rgba(255, 182, 193, 0.5)';
      });
    }

    // Close Website button
    if (btnCloseWebsite) {
      btnCloseWebsite.addEventListener('click', (e) => {
        e.stopPropagation();
        soundManager.playTap();

        // 1. Try closing the window/tab
        try {
          window.open('', '_self', '');
          window.close();
        } catch (err) {}

        try {
          window.close();
        } catch (err) {}

        // 2. Graceful black screen farewell if browser restricts script close
        setTimeout(() => {
          if (theEnd) {
            theEnd.style.transition = 'opacity 0.6s ease';
            theEnd.style.opacity = '0';
            setTimeout(() => {
              theEnd.innerHTML = `
                <h2 style="font-family: 'Cinzel', 'Georgia', serif; font-size: 2.6rem; letter-spacing: 10px; color: #fff; margin: 0 0 16px 0; font-weight: normal;">GOODBYE ♡</h2>
                <p style="color: #888; font-size: 1.1rem; letter-spacing: 2px; margin: 0;">You may now safely close this browser tab.</p>
              `;
              theEnd.style.opacity = '1';
            }, 600);
          }
        }, 300);
      });

      btnCloseWebsite.addEventListener('mouseenter', () => {
        btnCloseWebsite.style.color = '#ffffff';
        btnCloseWebsite.style.opacity = '1';
        btnCloseWebsite.style.transform = 'scale(1.05)';
      });
      btnCloseWebsite.addEventListener('mouseleave', () => {
        btnCloseWebsite.style.color = '#666666';
        btnCloseWebsite.style.opacity = '0.65';
        btnCloseWebsite.style.transform = 'none';
      });
    }

    // Timeline for animations
    addTimer(() => {
      // 25s animation ends here, fade out scroller
      const scroller = blackout.querySelector('#credits-scroller');
      if (scroller) {
        scroller.style.opacity = '0';
        setTimeout(() => { scroller.style.display = 'none'; }, 500);
      }
      
      addTimer(() => {
        const fadeCont = blackout.querySelector('#fade-container');
        if (fadeCont) fadeCont.style.opacity = '1';
        
        // Sequence fade ins
        const showLine = (id, delay) => {
          addTimer(() => {
            const el = blackout.querySelector(id);
            if (el) el.style.opacity = '1';
          }, delay);
        };
        
        // 1. Show Story Lines
        showLine('#line1', 0);
        showLine('#line2', 2000);
        showLine('#line3', 4000);
        showLine('#line4', 6000);
        
        addTimer(() => {
          // Hide Story Lines
          ['#line1', '#line2', '#line3', '#line4'].forEach(id => {
            const el = blackout.querySelector(id);
            if (el) el.style.opacity = '0';
          });
          
          // 2. Show Happy Birthday Message
          addTimer(() => {
            const hbd = blackout.querySelector('#final-hbd');
            if (hbd) {
              hbd.style.opacity = '1';
              hbd.style.transform = 'scale(1)';
            }
            showLine('#final-wishes', 1500);
            
            // Hide Happy Birthday, then Show 3. Sorry Section
            addTimer(() => {
              if (hbd) hbd.style.opacity = '0';
              const wishes = blackout.querySelector('#final-wishes');
              if (wishes) wishes.style.opacity = '0';
              
              addTimer(() => {
                const sorryGroup = blackout.querySelector('#sorry-group');
                if (sorryGroup) sorryGroup.style.opacity = '1';
                
                showLine('#sorry-line1', 0);
                showLine('#sorry-line2', 1500);
                showLine('#sorry-line3', 3200);

                // Hide Sorry Section, then Show 4. One Hug? Prompt
                addTimer(() => {
                  if (sorryGroup) sorryGroup.style.opacity = '0';
                  
                  addTimer(() => {
                    if (hugPromptGroup) {
                      hugPromptGroup.style.display = 'flex';
                      requestAnimationFrame(() => {
                        hugPromptGroup.style.opacity = '1';
                      });
                    }
                  }, 1000);

                }, 6500);

              }, 1200);

            }, 5500);
            
          }, 1500);
          
        }, 8500);
        
      }, 300); // 25000ms + 300ms = 25.3s exact
      
    }, 25000);

    return container;
  }

  cleanup() {
    this.activeTimeouts.forEach(t => clearTimeout(t));
    this.activeTimeouts = [];
    if (this.activeLandscapeModal) {
      this.activeLandscapeModal.close();
      this.activeLandscapeModal = null;
    }
    const blackout = document.getElementById('credits-blackout');
    if (blackout) blackout.remove();
    
    // Restore the bottom navigation bar if the user navigates away
    const bottomNav = document.getElementById('dev-quick-jump-bar');
    if (bottomNav) {
        bottomNav.style.display = '';
    }
    soundManager.suppressBGM(false);
  }
}
