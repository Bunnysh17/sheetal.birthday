import { soundManager } from '../audio.js';

export class FinalSurprisePage {
  constructor(app) { this.app = app; }

  render() {
    const container = document.createElement('div');
    container.className = 'page-view story-ending-view';
    container.innerHTML = `
      <section class="story-ending" aria-labelledby="ending-title">
        <span class="story-ending-kicker">THE FINAL CHAPTER</span>
        <p class="story-ending-dedication">For my favourite person.<br>On your special day, and all the ordinary ones too.</p>
        <div class="story-ending-rule" aria-hidden="true"></div>
        <h1 id="ending-title">THE END</h1>
        <p class="story-ending-afterword">Iss film ka.<br><em>Hamari kahaani toh abhi baaki hai.</em></p>
        <p class="story-ending-credit">Aaj tumhara birthday hai.<br>Par tum meri favourite person har din ho. ♡</p>
        <div class="story-ending-actions">
          <button class="ref-btn" id="read-letter-again">READ MY LETTER AGAIN</button>
          <button class="game-back-btn" id="replay-story">Back to the beginning ↺</button>
        </div>
      </section>`;
    container.querySelector('#read-letter-again').addEventListener('click', () => {
      soundManager.playTap();
      this.app.navigateTo('letter');
    });
    container.querySelector('#replay-story').addEventListener('click', () => {
      soundManager.playTap();
      this.app.openedGifts = { 1: false, 2: false, 3: false };
      this.app.navigateTo('passcode');
    });
    return container;
  }
  cleanup() {}
}
