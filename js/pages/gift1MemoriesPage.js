import { birthdayConfig } from '../../config.js';
import { soundManager } from '../audio.js';

export class Gift1MemoriesPage {
  constructor(app) {
    this.app = app;
    const basePhotos = (birthdayConfig.gift1Memories || []).filter(item => item.type === 'photo');
    this.basePhotosCount = basePhotos.length || 10;
    this.originalPhotos = [
       ...basePhotos,
       { image: 'assets/gallery/upload_1790631861661.png', caption: 'Finale Photo 1' },
       { image: 'assets/gallery/upload_1790682690157.png', caption: 'Finale Photo 2' },
       { image: 'assets/gallery/upload_1790691388398.png', caption: 'Finale Photo 3' },
       { image: 'assets/gallery/upload_1790683258461.png', caption: 'Finale Photo 4' }
    ];
    this.photos = this.originalPhotos.map(item => ({...item}));
    this.cues = [];
    this.cueIndex = -1;
    this.reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  render() {
    soundManager.suppressBGM(true);
    this.container = document.createElement('div');
    this.container.className = 'page-view perfect-sync';
    this.container.innerHTML = `
      <section class="perfect-memory-page">
        <button class="game-back-btn" id="memories-back-btn">← Back to surprises</button>
        <header class="album-heading"><span class="album-eyebrow">PERFECT · ED SHEERAN</span><h1>If I could keep<br><em>a moment forever.</em></h1><p>It would be one with you in it.</p></header>
        <div class="perfect-vertical-window" aria-label="A vertical story of lyrics and memories">
          <div class="perfect-vertical-track"></div>
        </div>
      </section>`;

    this.container.querySelector('#memories-back-btn').onclick = () => this.app.navigateTo('gifts-hub');
    this.setupSong(this.container.querySelector('.perfect-vertical-track'));
    return this.container;
  }

  setupSong(track) {
    this.track = track;
    this.audio = new Audio();
    this.audio.preload = 'auto';
    this.audio.loop = false; // Stop at the end for the grand finale
    this.audio.volume = .7;
    this.abort = new AbortController();
    // Buffer this small clip locally so replay/seek also works on servers without Range support.
    this.audioReady = fetch('assets/music/perfect-clip.mp3', { signal: this.abort.signal })
      .then(response => { if (!response.ok) throw Error('Song unavailable'); return response.blob(); })
      .then(blob => { if (this.disposed) return; this.audioUrl = URL.createObjectURL(blob); this.audio.src = this.audioUrl; this.audio.load(); })
      .catch(error => { if (!this.disposed && error.name !== 'AbortError') console.warn('Song could not load.'); });
    
    this.photoReady = this.loadPhotoChoices();
    this.ready = fetch('assets/music/perfect-cues.json?v=67', { signal: this.abort.signal })
      .then(response => { if (!response.ok) throw Error('Lyrics unavailable'); return response.json(); })
      .then(async cues => {
        await this.photoReady;
        if (this.disposed) return;
        this.cues = cues.map(cue => ({ ...cue, start: cue.words[0]?.start ?? cue.start }));
        this.buildStory();
        this.syncSong();
        this.playSong(); // Try autoplay immediately when ready
      }).catch(error => {
        if (error.name !== 'AbortError' && !this.disposed) console.warn('Lyrics could not load.');
      });
      
    // Force play on first interaction if autoplay fails
    const forcePlay = () => {
      this.playSong();
    };
    document.addEventListener('click', forcePlay);
    document.addEventListener('touchstart', forcePlay);

    this.audio.addEventListener('play', () => {
      const overlay = this.container.querySelector('#memory-tap-overlay');
      if (overlay) overlay.style.display = 'none';
      document.removeEventListener('click', forcePlay);
      document.removeEventListener('touchstart', forcePlay);
    });
    this.audio.addEventListener('loadedmetadata', () => this.measureStory?.());
    this.audio.addEventListener('seeked', () => this.syncSong());

    const tick = () => {
      if (this.disposed) return;
      this.syncSong();
      this.frame = requestAnimationFrame(tick);
    };
    this.frame = requestAnimationFrame(tick);
  }

  async playSong() {
    try { await this.audioReady; if (this.disposed) return; await this.audio.play(); }
    catch { 
      // Autoplay blocked by browser. Wait for user tap.
      const overlay = this.container.querySelector('#memory-tap-overlay');
      if (overlay) overlay.style.display = 'flex';
    }
  }

  buildStory() {
    this.resize?.disconnect();
    this.track.replaceChildren();
    this.lines = [];
    this.cues.forEach((cue, index) => {
      const section = document.createElement('section');
      section.className = 'vertical-memory-beat';
      const heading = document.createElement('h2'); heading.className = 'vertical-lyric';
      const cueNumber = index % this.cues.length;
      const titles = { 0: ['WE WERE JUST', 'KIDS', 'WHEN WE FELL IN LOVE'], 2: ['I WILL NOT', 'GIVE YOU UP', 'THIS TIME'], 4: ['YOUR HEART', 'IS ALL', 'I OWN'] };
      const titleLines = titles[cueNumber];
      if (titleLines) {
        titleLines.forEach((text, i) => { const span = document.createElement('span'); span.textContent = text; span.className = i === 1 ? 'film-title-main' : 'film-title-small'; heading.append(span); });
      } else { heading.hidden = true; section.classList.add('photo-interlude'); }
      const memoryPhotosCount = this.basePhotosCount;
      const photo = cue.isFinale ? null : this.photos[index % memoryPhotosCount];
      const row = document.createElement('div'); row.className = 'vertical-photo-note';
      if (index % 2) row.classList.add('photo-on-right');
      if (photo) {
        const figure = document.createElement('figure');
        const wrapper = document.createElement('div');
        wrapper.className = 'photo-crop-wrapper';
        const img = document.createElement('img'); img.src = photo.image; img.alt = 'A little moment, kept with love';
        if (photo.scale || photo.x || photo.y) { img.style.transform = `scale(${photo.scale || 1}) translate(${photo.x || 0}px, ${photo.y || 0}px)`; img.style.transformOrigin = 'center center'; }
        wrapper.append(img);
        figure.append(wrapper);
        figure.style.cursor = 'pointer';
        figure.title = 'Click to enlarge';
        figure.addEventListener('click', () => {
          soundManager.playTap();
          this.app.openLightbox(photo.image, photo.caption, false, this.photos.map(p => ({ src: p.image, caption: p.caption })));
        });
        img.dataset.memorySlot = String(index % memoryPhotosCount);
        
        const note = document.createElement('div'); note.className = 'vertical-note';
        const label = document.createElement('span'); label.className = 'vertical-note-label'; label.textContent = 'A LITTLE NOTE FOR YOU';
        const title = document.createElement('h3'); title.textContent = photo.caption;
        const message = document.createElement('p'); message.textContent = photo.date || 'With all my love. Always. ♡';
        note.append(label, title, message); row.append(figure, note);
      }
      section.append(heading, row); this.track.append(section);
    });

    this.measureStory = () => {
      const viewport = this.container.querySelector('.perfect-vertical-window');
      const blocks = [...this.track.children];
      const duration = Number.isFinite(this.audio.duration) ? this.audio.duration : 31.49;
      blocks.forEach(node => node.style.minHeight = '0px');
      const spans = this.cues.map((cue, i) => (this.cues[i + 1]?.start ?? duration) - cue.start);
      this.scrollSpeed = Math.max(...this.cues.map((cue, i) => cue.isFinale ? 0 : blocks[i].getBoundingClientRect().height / spans[i])) * 0.75;
      blocks.forEach((node, i) => node.style.minHeight = `${this.scrollSpeed * spans[i % spans.length]}px`);
      this.offsets = blocks.map(node => node.offsetTop);
      this.topSpace = viewport.clientHeight * 0.85;
      this.syncSong();
    };
    this.resize = new ResizeObserver(this.measureStory);
    this.resize.observe(this.container.querySelector('.perfect-vertical-window'));
    this.measureStory();
    document.fonts.ready.then(() => { if (!this.disposed) this.measureStory(); });

    // Grand finale overlay that fades in
    if (!document.querySelector('#grand-finale-overlay')) {
      const overlay = document.createElement('div');
      overlay.id = 'grand-finale-overlay';
      overlay.style.cssText = 'position: fixed; inset: 0; width: 100vw; height: 100vh; z-index: 9990; display: flex; flex-direction: column; align-items: center; justify-content: center; opacity: 0; transition: opacity 2.5s ease-in-out; pointer-events: none; padding: 20px; box-sizing: border-box; overflow-y: auto;';
      overlay.innerHTML = `
        <div class="vintage-journal-bg" style="z-index: -2;">
          <div class="vintage-paper-grain"></div>
          <div class="vintage-stain stain-1"></div>
          <div class="vintage-stain stain-2"></div>
          <div class="vintage-stain stain-3"></div>
        </div>
        
        <style>
          @keyframes bdayGlow {
            0%, 100% { text-shadow: 0 0 20px rgba(160,97,106,0.3); }
            50% { text-shadow: 0 0 40px rgba(160,97,106,0.5), 0 0 10px rgba(200,144,143,0.3); }
          }
          
          .finale-title-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            position: relative;
            width: 100%;
            margin: 0 0 20px 0;
            z-index: 5;
          }

          .finale-decor-side {
            display: flex;
            align-items: center;
            gap: 6px;
            position: relative;
            flex-shrink: 0;
            pointer-events: none;
          }

          .sb-title-butterfly {
            width: 38px;
            height: auto;
            filter: drop-shadow(0 3px 8px rgba(160, 97, 106, 0.28));
            user-select: none;
            transition: transform 0.3s ease;
          }

          .sb-title-butterfly-left {
            transform: rotate(-14deg);
            animation: floatTitleLeft 3.5s ease-in-out infinite alternate;
          }

          .sb-title-butterfly-right {
            transform: rotate(14deg);
            animation: floatTitleRight 4s ease-in-out infinite alternate;
          }

          .sb-title-star {
            width: 18px;
            height: auto;
            filter: drop-shadow(0 0 6px rgba(230, 180, 190, 0.6));
            animation: twinkleStar 2.5s ease-in-out infinite alternate;
            user-select: none;
          }

          .sb-title-star-left {
            animation-delay: 0.3s;
          }

          .sb-title-star-right {
            animation-delay: 0.8s;
          }

          @keyframes floatTitleLeft {
            0% { transform: translateY(0px) rotate(-14deg) scale(1); }
            50% { transform: translateY(-3px) rotate(-8deg) scale(1.04); }
            100% { transform: translateY(2px) rotate(-18deg) scale(0.98); }
          }

          @keyframes floatTitleRight {
            0% { transform: translateY(0px) rotate(14deg) scale(1); }
            50% { transform: translateY(-4px) rotate(20deg) scale(1.05); }
            100% { transform: translateY(1px) rotate(10deg) scale(0.97); }
          }

          @keyframes twinkleStar {
            0%, 100% { opacity: 0.6; transform: scale(0.85) rotate(0deg); }
            50% { opacity: 1; transform: scale(1.15) rotate(15deg); }
          }

          .finale-bday-title {
            color: #A0616A;
            font-family: var(--font-accent, Georgia, serif);
            font-size: clamp(1.8rem, 5vw, 3.2rem);
            text-align: center;
            font-weight: 500;
            line-height: 1.2;
            margin: 0;
            position: relative;
            z-index: 5;
            animation: bdayGlow 3s ease-in-out infinite;
          }
          .typewriter-text::after { content: '|'; animation: twBlink 1s step-end infinite; color: #A0616A; }
          .typewriter-text.finished::after { display: none; }
          @keyframes twBlink { 50% { opacity: 0; } }
          
          .finale-split-layout {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 36px;
            width: 100%;
            max-width: 820px;
            margin: 0 auto;
            position: relative;
            z-index: 5;
          }

          .finale-photo-container {
            position: relative;
            flex-shrink: 0;
          }

          .finale-split-layout figure {
            transform: rotate(-4deg);
            box-shadow: 0 14px 30px rgba(105, 73, 55, 0.22);
            background: #FFFDF8;
            padding: 8px 8px 24px 8px;
            margin: 0;
            border: 1px solid rgba(201, 168, 108, 0.3);
            border-radius: 6px;
            position: relative;
            cursor: pointer;
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            z-index: 2;
          }
          .finale-split-layout figure:hover {
            transform: rotate(-1deg) scale(1.04);
          }

          .finale-split-layout figure .finale-img-wrapper {
            overflow: hidden;
            border-radius: 4px;
            height: 220px;
            width: 170px;
            display: block;
            margin: 0;
          }
          .finale-split-layout figure img {
            object-fit: cover;
            height: 100%;
            width: 100%;
            display: block;
          }

          /* Anchored Scrapbook Stickers around Polaroid */
          .sb-finale-stamp {
            position: absolute;
            top: -14px;
            left: -12px;
            width: 44px;
            transform: rotate(-12deg);
            filter: drop-shadow(0 4px 10px rgba(105, 73, 55, 0.18));
            z-index: 4;
            pointer-events: none;
          }

          .sb-finale-rose {
            position: absolute;
            top: -24px;
            right: -20px;
            width: 60px;
            transform: rotate(20deg);
            filter: drop-shadow(0 4px 12px rgba(105, 73, 55, 0.18));
            opacity: 0.9;
            z-index: 1;
            pointer-events: none;
          }

          .sb-finale-lavender {
            position: absolute;
            bottom: -18px;
            left: -28px;
            width: 68px;
            transform: rotate(-35deg);
            filter: drop-shadow(0 4px 10px rgba(105, 73, 55, 0.2));
            z-index: 1;
            pointer-events: none;
          }

          .sb-finale-butterfly {
            position: absolute;
            bottom: -4px;
            right: -20px;
            width: 42px;
            transform: rotate(15deg);
            filter: drop-shadow(0 4px 8px rgba(105, 73, 55, 0.18));
            z-index: 4;
            pointer-events: none;
          }

          .sb-finale-letters {
            position: absolute;
            bottom: 12px;
            right: 18px;
            width: 75px;
            transform: rotate(10deg);
            filter: drop-shadow(0 6px 14px rgba(105, 73, 55, 0.18));
            opacity: 0.85;
            pointer-events: none;
            z-index: 1;
          }

          .finale-typewriter-container {
            flex: 1;
            text-align: left;
          }
          .finale-eyebrow {
            font-size: 0.78rem;
            letter-spacing: 0.25em;
            color: #A0616A;
            text-transform: uppercase;
            font-weight: 700;
            display: block;
            margin-bottom: 6px;
          }
          .finale-subtitle {
            margin: 0 0 12px 0;
            font-size: 1.8rem;
            font-family: var(--font-display, Georgia, serif);
            color: var(--heading-color, #5C4033);
            font-style: italic;
          }
          .typewriter-text {
            font-size: 1.15rem;
            line-height: 1.7;
            font-weight: 600;
            color: #5C4033;
            text-shadow: 0 1px 3px rgba(255, 255, 255, 0.8);
            font-family: var(--font-body);
            margin: 0;
            min-height: 80px;
          }

          @media (max-width: 768px) {
            .finale-title-wrapper {
              gap: 6px !important;
              margin-bottom: 12px !important;
            }
            .finale-bday-title {
              font-size: 1.55rem !important;
              margin: 0 !important;
              line-height: 1.15 !important;
            }
            .finale-decor-side {
              gap: 3px !important;
            }
            .sb-title-butterfly {
              width: 26px !important;
            }
            .sb-title-star {
              width: 14px !important;
            }
            .finale-split-layout {
              flex-direction: column !important;
              gap: 16px !important;
            }
            .finale-split-layout figure {
              padding: 6px 6px 18px 6px !important;
            }
            .finale-split-layout figure .finale-img-wrapper {
              height: 190px !important;
              width: 145px !important;
            }
            .sb-finale-stamp {
              width: 36px !important;
              top: -10px !important;
              left: -8px !important;
            }
            .sb-finale-rose {
              width: 48px !important;
              top: -16px !important;
              right: -14px !important;
            }
            .sb-finale-lavender {
              width: 52px !important;
              bottom: -14px !important;
              left: -18px !important;
            }
            .sb-finale-butterfly {
              width: 34px !important;
              bottom: -4px !important;
              right: -14px !important;
            }
            .sb-finale-letters {
              width: 55px !important;
              bottom: 8px !important;
              right: 10px !important;
            }
            .finale-typewriter-container {
              text-align: center !important;
            }
            .finale-subtitle {
              font-size: 1.35rem !important;
              margin-bottom: 6px !important;
            }
            .typewriter-text {
              font-size: 0.98rem !important;
              line-height: 1.55 !important;
              min-height: 60px !important;
            }
            #finale-next-action {
              text-align: center !important;
              margin-top: 16px !important;
            }
          }

          @media (max-width: 400px) {
            .finale-bday-title {
              font-size: 1.35rem !important;
            }
            .sb-title-butterfly {
              width: 22px !important;
            }
            .sb-title-star {
              width: 12px !important;
            }
          }
        </style>
        
        <div style="display: flex; flex-direction: column; align-items: center; position: relative; z-index: 1; width: 100%; padding: 0 15px; max-width: 900px; margin: 0 auto;">
          <div class="finale-title-wrapper">
            <!-- Left Side Scrapbook Decorations -->
            <div class="finale-decor-side left">
              <img src="assets/scrapbook/vintage_purple_butterfly.png" class="sb-title-butterfly sb-title-butterfly-left" alt="butterfly" />
              <img src="assets/scrapbook/vintage_glitter_star_pink.png" class="sb-title-star sb-title-star-left" alt="sparkle" />
            </div>

            <h2 class="finale-bday-title">Happy Birthday, Sheetal</h2>

            <!-- Right Side Scrapbook Decorations -->
            <div class="finale-decor-side right">
              <img src="assets/scrapbook/vintage_glitter_star_pink.png" class="sb-title-star sb-title-star-right" alt="sparkle" />
              <img src="assets/scrapbook/vintage_vintage_swallowtail_butterfly.png" class="sb-title-butterfly sb-title-butterfly-right" alt="butterfly" />
            </div>
          </div>
          
          <div class="finale-split-layout">
             <div class="finale-photo-container">
               <!-- Delicate Scrapbook Stickers Anchored to Polaroid -->
               <img src="assets/scrapbook/vintage_stamp_pink_heart.png" class="sb-finale-stamp" alt="stamp" />
               <img src="assets/scrapbook/vintage_pink_rosebud_stem.png" class="sb-finale-rose" alt="rose" />
               <img src="assets/scrapbook/vintage_lavender_bouquet_tied.png" class="sb-finale-lavender" alt="lavender" />
               <img src="assets/scrapbook/vintage_vintage_swallowtail_butterfly.png" class="sb-finale-butterfly" alt="butterfly" />
               
               <figure id="finale-photo-figure">
                 <div class="finale-img-wrapper">
                    <img id="finale-photo-img" src="assets/gallery/upload_1790631861661.png" alt="Sheetal">
                 </div>
               </figure>
             </div>

             <div class="finale-typewriter-container">
               <span class="finale-eyebrow">MY EVERYTHING</span>
               <h3 class="finale-subtitle">To the most beautiful girl</h3>
               <div class="typewriter-text"></div>
               
               <div id="finale-next-action" style="margin-top: 25px; opacity: 0; transition: opacity 1.5s ease; text-align: left;">
                 <button id="finale-next-btn" class="ref-btn">
                   KEEP GOING, THERE’S MORE ♡
                 </button>
               </div>
             </div>
          </div>

          <!-- Bottom Corner Twine Letters Stack -->
          <img src="assets/scrapbook/vintage_letters_twine_stack.png" class="sb-finale-letters" alt="letters" />
        </div>
      `;
      document.body.append(overlay);
      
      const nextBtn = overlay.querySelector('#finale-next-btn');
      if (nextBtn) {
          nextBtn.onclick = () => {
              this.app.openedGifts = this.app.openedGifts || { 1: false, 2: false, 3: false };
              this.app.openedGifts[1] = true;
              window.location.hash = 'gifts-hub';
          };
      }

      const finaleFig = overlay.querySelector('#finale-photo-figure');
      if (finaleFig) {
          finaleFig.style.cursor = 'pointer';
          finaleFig.title = 'Click to enlarge';
          finaleFig.addEventListener('click', () => {
              soundManager.playTap();
              const currentSrc = finaleFig.querySelector('img')?.src;
              if (currentSrc) {
                  this.app.openLightbox(currentSrc, "Happy Birthday, Sheetal ♡");
              }
          });
      }
    }
  }

  syncSong() {
    if (this.disposed || !this.offsets?.length) return;
    const time = this.audio.currentTime;
    let index = 0;
    for (let i = 0; i < this.cues.length; i++) if (time >= this.cues[i].start) index = i;
    this.cueIndex = index;
    const offset = this.reducedMotion ? this.offsets[index] : time * this.scrollSpeed;
    this.track.style.transform = `translateY(${this.topSpace - offset}px)`;

    // Trigger grand finale animation ONLY when track is completely clear
    if (time >= 31.0 && !this.finaleTriggered) {
      this.finaleTriggered = true;
      const finale = document.querySelector('#grand-finale-overlay');
      if (finale) {
        finale.style.opacity = '1';
        finale.style.transform = 'scale(1)';
        finale.style.pointerEvents = 'auto';
        
        const imgEl = finale.querySelector('#finale-photo-img');
        imgEl.style.transition = 'opacity 0.4s ease';
        
        const applyPhotoToImg = (imgObj, element) => {
             element.src = imgObj.image;
             if (imgObj.scale || imgObj.x || imgObj.y) {
                 element.style.transform = `scale(${imgObj.scale || 1}) translate(${imgObj.x || 0}px, ${imgObj.y || 0}px)`;
             } else {
                 element.style.transform = '';
             }
        };
        
        const wrapper = finale.querySelector('.finale-img-wrapper');
        wrapper.style.position = 'relative';
        
        imgEl.style.position = 'absolute';
        imgEl.style.top = '0'; imgEl.style.left = '0';
        let bgImgEl = wrapper.querySelector('.finale-bg-img');
        if (!bgImgEl) {
            bgImgEl = document.createElement('img');
            bgImgEl.className = 'finale-bg-img';
            bgImgEl.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; display: block; z-index: 1; opacity: 0; transition: opacity 1.2s ease-in-out;';
            wrapper.prepend(bgImgEl);
        }
        
        imgEl.style.zIndex = '2';
        imgEl.style.transition = 'opacity 1.2s ease-in-out';

        let imgIndex = 0;
        let showingForeground = true;
        
        this.updateFinaleAnimation = () => {
           clearInterval(this.finaleImageInterval);
           const finalePhotos = this.photos.slice(this.basePhotosCount, this.basePhotosCount + 4); 
           
           if (finalePhotos.length > 0) {
              imgIndex = 0;
              showingForeground = true;
              applyPhotoToImg(finalePhotos[0], imgEl);
              imgEl.style.opacity = '1';
              bgImgEl.style.opacity = '0';
              
              if (finalePhotos.length > 1) {
                  this.finaleImageInterval = setInterval(() => {
                      const nextIndex = (imgIndex + 1) % finalePhotos.length;
                      
                      const currentLayer = showingForeground ? imgEl : bgImgEl;
                      const nextLayer = showingForeground ? bgImgEl : imgEl;
                      
                      applyPhotoToImg(finalePhotos[nextIndex], nextLayer);
                      
                      nextLayer.style.zIndex = '2';
                      currentLayer.style.zIndex = '1';
                      
                      setTimeout(() => {
                          nextLayer.style.opacity = '1';
                          currentLayer.style.opacity = '0';
                          showingForeground = !showingForeground;
                          imgIndex = nextIndex;
                      }, 50);
                      
                  }, 4000);
              }
           }
        };
        this.updateFinaleAnimation();

        // Play the mix song for the final slide after 1.5 seconds delay
        this.finaleAudio = new Audio('assets/music/mix_35s.mp3');
        this.finaleAudioTimer = setTimeout(() => {
            this.finaleAudio.play().catch(() => {});
        }, 1500);
        
        // When finale song finishes, seamlessly continue main background music
        let finaleEndedTime = 0;
        this.finaleAudio.addEventListener('ended', () => {
            finaleEndedTime = performance.now();
            soundManager.suppressBGM(false);
            soundManager.playFullMusic();
        });
        
        const twContainer = finale.querySelector('.typewriter-text');
        
        let typeoutTimeout;
        this.startTypewriter = (customLines) => {
          clearTimeout(typeoutTimeout);
          twContainer.innerHTML = '';
          twContainer.classList.remove('finished');
          
          let lines = customLines;
          if (!lines) {
            lines = [
              "Yeh Aasmaan khila khila hai , Shaayd woh kahin muskura rahi hai",
              "Yeh Mausam Mein Jo Nami Haina Uski Maayusi Dikha Rahi Hai",
              "Sangeet Tha Mera Eklauta Pyaar Bas Iss Raste Pe Yeh Kaisa Mood Aaya .",
              "Main Abhi Nadaan Sa Aashiq Woh Muhje Ishq Karna Sikha Rahi Hai ♡",
              "Tum sach mein mere liye bahut special ho.",
              "Happy Birthday Sheetal .",
              "Khush raho, hasste raho, aur hamesha mere dil ke sabse kareeb rahoge.",
              "I love you more than words can ever explain."
            ];
          }

          const defaultTimings = [0.48, 5.94, 11.46, 17.66, 22.0, 26.0, 30.0, 34.0];
          let timings = defaultTimings;
          let speeds = [65, 65, 65, 65, 65, 65, 65, 65];

          let currentLineIdx = 0;
          let charIdx = 0;

          const typeWriter = () => {
            if (currentLineIdx >= lines.length) { 
               twContainer.classList.add('finished'); 
               const nextAction = finale.querySelector('#finale-next-action');
               if (nextAction) nextAction.style.opacity = '1';
               return; 
            }
            
            let t = 0;
            if (this.finaleAudio) {
               if (!this.finaleAudio.ended) {
                 t = this.finaleAudio.currentTime;
               } else {
                 t = (this.finaleAudio.duration || 35.7) + ((performance.now() - (finaleEndedTime || performance.now())) / 1000);
               }
            }
            
            const target = timings[currentLineIdx] || (currentLineIdx * 4);
            
            if (this.finaleAudio && !this.finaleAudio.ended && !this.finaleAudio.paused && t < target && charIdx === 0) {
               typeoutTimeout = setTimeout(typeWriter, 50);
               return;
            }
            if (this.finaleAudio && this.finaleAudio.ended && t < target && charIdx === 0) {
               typeoutTimeout = setTimeout(typeWriter, 50);
               return;
            }

            const line = lines[currentLineIdx];
            if (charIdx === 0 && currentLineIdx > 0) twContainer.innerHTML += '<br>';
            
            twContainer.innerHTML += line.charAt(charIdx);
            charIdx++;
            
            if (charIdx >= line.length) { 
               currentLineIdx++; 
               charIdx = 0; 
               typeoutTimeout = setTimeout(typeWriter, 50); 
            } else {
               const customSpeed = speeds[currentLineIdx] !== undefined ? speeds[currentLineIdx] : 65;
               typeoutTimeout = setTimeout(typeWriter, customSpeed);
            }
          };
          typeWriter();
        };

        // Start typewriter animation 1.5s after fade-in starts
        setTimeout(() => this.startTypewriter(), 1500);
      }
    }
  }

  async loadPhotoChoices() {
    try {
      const response = await fetch('photo_adjustments.json?t=' + Date.now());
      const choices = await response.json();
      this.photoChoices = choices;
      this.photos.forEach((item, i) => {
        const choice = choices['memory_' + i];
        if (choice) {
          item.image = choice.image || item.image;
          item.scale = choice.scale || 1;
          item.x = choice.x || 0;
          item.y = choice.y || 0;
        }
      });
    } catch { this.photoChoices = {}; }
  }

  cleanup() {
    this.disposed = true;
    soundManager.suppressBGM(false);
    cancelAnimationFrame(this.frame);
    this.abort?.abort();
    this.resize?.disconnect();
    this.lyricAnimation?.cancel();
    clearTimeout(this.finaleAudioTimer);
    clearInterval(this.finaleImageInterval);
    this.audio?.pause();
    this.finaleAudio?.pause();
    this.finaleBgMusic?.pause();
    if (this.audioUrl) URL.revokeObjectURL(this.audioUrl);
    if (this.audio) { this.audio.removeAttribute('src'); this.audio.load(); }
    if (this.finaleAudio) { this.finaleAudio.removeAttribute('src'); this.finaleAudio.load(); }
    if (this.finaleBgMusic) { this.finaleBgMusic.removeAttribute('src'); this.finaleBgMusic.load(); }
    
    const finaleOverlay = document.getElementById('grand-finale-overlay');
    if (finaleOverlay) finaleOverlay.remove();
  }
}
