/**
 * 🎵 Audio Manager & Web Audio API Music Box Synthesizer
 * Plays custom MP3 if available, or synthesizes a sweet romantic music-box melody!
 */

import { birthdayConfig } from '../config.js';

class AudioManager {
  constructor() {
    this.audioElement = null;
    this.isPlayingMusic = false;
    this.audioCtx = null;
    this.musicBoxTimer = null;
    this.melodyIndex = 0;
    this.useSynthesizer = false;

    // Sweet Music Box Lullaby Notes (Frequencies in Hz)
    // Plays a sweet music-box rendition of Happy Birthday & cute romantic notes
    this.lullabyNotes = [
      261.63, 261.63, 293.66, 261.63, 349.23, 329.63, // Happy birthday to you
      261.63, 261.63, 293.66, 261.63, 392.00, 349.23, // Happy birthday to you
      261.63, 261.63, 523.25, 440.00, 349.23, 329.63, 293.66, // Happy birthday dear...
      466.16, 466.16, 440.00, 349.23, 392.00, 349.23, // Happy birthday to you
      // Romantic Arpeggio continuation
      329.63, 349.23, 392.00, 440.00, 523.25, 440.00, 392.00, 349.23
    ];
    this.noteDurations = [
      400, 400, 800, 800, 800, 1200,
      400, 400, 800, 800, 800, 1200,
      400, 400, 800, 800, 800, 800, 1200,
      400, 400, 800, 800, 800, 1400,
      600, 600, 600, 600, 800, 600, 600, 1200
    ];

    this.initAudioElement();
    this.setupVisibilityHandler();
  }

  setupVisibilityHandler() {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        // Pause all DOM audio/video elements
        document.querySelectorAll('audio, video').forEach(media => {
          if (!media.paused) {
            media.dataset.wasPlaying = 'true';
            media.pause();
          }
        });
        
        // Pause BGM instances
        if (this.passcodeBGM && !this.passcodeBGM.paused) {
          this.passcodeBGM._wasPlaying = true;
          this.passcodeBGM.pause();
        }
        if (this.fullBGM && !this.fullBGM.paused) {
          this.fullBGM._wasPlaying = true;
          this.fullBGM.pause();
        }
      } else {
        // Resume all DOM audio/video elements
        document.querySelectorAll('audio, video').forEach(media => {
          if (media.dataset.wasPlaying === 'true') {
            media.play().catch(e => console.log('Autoplay prevented on resume'));
            delete media.dataset.wasPlaying;
          }
        });
        
        // Resume BGM instances
        if (this.passcodeBGM && this.passcodeBGM._wasPlaying) {
          this.passcodeBGM.play().catch(e => console.log('Autoplay prevented on resume'));
          this.passcodeBGM._wasPlaying = false;
        }
        if (this.fullBGM && this.fullBGM._wasPlaying) {
          this.fullBGM.play().catch(e => console.log('Autoplay prevented on resume'));
          this.fullBGM._wasPlaying = false;
        }
      }
    });
  }

  initAudioElement() {
    if (birthdayConfig.music) {
      this.audioElement = new Audio();
      this.audioElement.src = birthdayConfig.music;
      this.audioElement.loop = true;
      this.audioElement.volume = 0.5;

      this.audioElement.addEventListener('error', () => {
        console.log('Custom MP3 not found or blocked, falling back to Web Audio Music Box chime.');
        this.useSynthesizer = true;
      });
    } else {
      this.useSynthesizer = true;
    }
  }

  getAudioContext() {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  toggle(onStateChange) {
    if (this.isPlayingMusic) {
      this.pause();
    } else {
      this.play();
    }
    if (onStateChange) {
      onStateChange(this.isPlayingMusic);
    }
    return this.isPlayingMusic;
  }

  play() {
    this.isPlayingMusic = false;
  }

  pause() {
    this.isPlayingMusic = false;
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.stopMusicBox();
  }

  startMusicBox() {
    this.stopMusicBox();
  }

  stopMusicBox() {
    if (this.musicBoxTimer) {
      clearTimeout(this.musicBoxTimer);
      this.musicBoxTimer = null;
    }
  }

  // 🔇 All Sound Effects completely disabled per user request
  playSound(src, volume = 0.8) {
    return null;
  }

  // 🎭 Funny & Cute Sound Effects (Disabled)
  playShinchanLaugh() {}
  playShinchanVoice() {}
  playAnimeWow() {}
  playCuteGiggle() {}
  playKidsYay() {}
  playBabyLaugh() {}
  playOhNoLaugh() {}
  playCartoonBoing() {}
  playWompWomp() {}
  playChipmunkLaugh() {}

  // 🎭 Indian Memes Sound Effects (Disabled)
  playPuneetSamajhGaya() {}
  playPuneetKyaFayda() {}
  playPuneetAbTuGaya() {}
  playChinTapak() {}
  playLookingLikeAWow() {}
  playKhatamTata() {}
  playMoyeMoye() {}
  playChotiBachi() {}
  playPaisaHiPaisa() {}
  playAayein() {}

  // 🎲 Game Match / Mismatch Sound Helpers (Disabled)
  playRandomFunnyMatchSound() {}
  playRandomMismatchSound() {}
  playTap() {}
  playSuccessSound() {}
  playErrorSound() {}
  playGiftOpenSound() {}
  playCelebrationFanfare() {}

  playChimeNote(freq, duration = 1.2) {}
  playHugSound() {}
  playBlowSound() {}
  playSliceSound() {}
  playSparkle() {}

  // === Passcode Page Music (password.m4a - loops on passcode screen) ===
  initPasscodeMusic() {
    if (!this.passcodeBGM) {
      this.passcodeBGM = new Audio('password.mp3');
      this.passcodeBGM.loop = true;
      this.passcodeBGM.volume = 0.6;
    }
  }

  playPasscodeMusic() {
    this.initPasscodeMusic();
    if (this.passcodeBGM && this.passcodeBGM.paused) {
      this.passcodeBGM.play().catch(e => console.log('Passcode music autoplay prevented'));
    }
  }

  stopPasscodeMusic() {
    if (this.passcodeBGM) {
      this.passcodeBGM.pause();
      this.passcodeBGM.currentTime = 0;
    }
  }

  // === Full Site Music (full.m4a - loops after passcode is unlocked) ===
  initFullMusic() {
    if (!this.fullBGM) {
      this.fullBGM = new Audio('full.mp3');
      this.fullBGM.loop = true;
      this.fullBGM.volume = 0.6;
      this.isSuppressed = false;
    }
  }

  playFullMusic() {
    this.initFullMusic();
    if (!this.isSuppressed && this.fullBGM) {
      this.fullBGM.play().catch(e => console.log('Full BGM autoplay prevented'));
    }
  }

  pauseFullMusic() {
    if (this.fullBGM) {
      this.fullBGM.pause();
    }
  }

  // Suppress full BGM when a slide has its own audio/video
  suppressBGM(suppress) {
    this.initFullMusic();
    this.isSuppressed = suppress;
    
    if (this._fadeInterval) {
      clearInterval(this._fadeInterval);
      this._fadeInterval = null;
    }

    if (suppress) {
      if (this.fullBGM && !this.fullBGM.paused) {
        let vol = this.fullBGM.volume;
        this._fadeInterval = setInterval(() => {
          vol -= 0.05;
          if (vol <= 0.01) {
            vol = 0;
            this.fullBGM.volume = 0;
            clearInterval(this._fadeInterval);
            this.pauseFullMusic();
            this.fullBGM.volume = 0.6; // reset for next time
          } else {
            this.fullBGM.volume = vol;
          }
        }, 100); // 0.05 decrease every 100ms = 1.2s fade out
      }
    } else {
      if (this.fullBGM) {
        this.fullBGM.volume = 0;
        this.playFullMusic();
        let vol = 0;
        this._fadeInterval = setInterval(() => {
          vol += 0.05;
          if (vol >= 0.6) {
            vol = 0.6;
            this.fullBGM.volume = 0.6;
            clearInterval(this._fadeInterval);
          } else {
            this.fullBGM.volume = vol;
          }
        }, 100); // 1.2s fade in
      }
    }
  }
}

export const soundManager = new AudioManager();

