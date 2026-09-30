import { soundManager } from '../audio.js';

const CHAPTERS = {
  'chapter-01': {
    index: '01 / 03',
    label: 'CHAPTER 01',
    kicker: 'A BIRTHDAY STORY, WRITTEN WITH LOVE',
    title: 'A little story
for a very special day.',
    lines: [
      'Some days deserve more than a simple happy birthday...',
      'they deserve a few soft moments, silly smiles, and words worth keeping.',
      'So this little story starts with one wish made especially for today.'
    ],
    whisper: 'Before anything else, there is a birthday wish waiting for you.',
    target: 'choice'
  },
  'chapter-02': {
    index: '02 / 03',
    label: 'CHAPTER 02',
    kicker: 'A FEW SURPRISES, SAVED WITH CARE',
    title: 'The little things
I wanted you to open slowly.',
    lines: [
      'A memory can be a gift. So can a laugh. So can a few honest words.',
      'Nothing here is meant to be rushed...',
      'just open each little surprise whenever you are ready.'
    ],
    whisper: 'Three gifts. One by one. No chapter screens in between. ♡',
    target: 'gifts-hub'
  },
  'chapter-03': {
    index: '03 / 03',
    label: 'CHAPTER 03',
    kicker: 'ONE LAST PAGE, BEFORE THIS LITTLE STORY ENDS',
    title: 'The website may end.
The feeling behind it does not.',
    lines: [
      'I hope at least one page made you smile...',
      'one line made you feel special...',
      'and one little moment here becomes something worth remembering.'
    ],
    whisper: 'There is one tiny ending left. Open it slowly. ♡',
    target: 'final-surprise'
  }
};

export class ChapterPage {
  constructor(app) { this.app = app; }

  render() {
    const data = CHAPTERS[this.app.currentPageId] || CHAPTERS['chapter-01'];
    const container = document.createElement('div');
    container.className = 'page-view chapter-one-page';
    const titleHtml = data.title.replace('\n', '<br>');

    container.innerHTML = `
      <section class="chapter-one-scene" aria-labelledby="chapter-title">
        <img src="assets/scrapbook/scrapbook_luna_moth_ivory.png" class="chapter-decor chapter-decor-moth" alt="" aria-hidden="true" />
        <img src="assets/scrapbook/scrapbook_pink_rosebud_stem.png" class="chapter-decor chapter-decor-rose" alt="" aria-hidden="true" />
        <div class="chapter-one-stars" aria-hidden="true">✦　·　✧　·　✦</div>
        <div class="chapter-one-bookmark">${data.index}</div>
        <p class="chapter-one-kicker">${data.kicker}</p>
        <h1 id="chapter-title">${data.label}</h1>
        <div class="chapter-one-rule"><span>♡</span></div>
        <h2>${titleHtml}</h2>
        <div class="chapter-one-copy">
          ${data.lines.map((line, i) => `<p${i === data.lines.length - 1 ? ' class="chapter-one-last"' : ''}>${line}</p>`).join('')}
        </div>
        <button class="chapter-one-open" id="chapter-open">Open this chapter <span>♡</span></button>
        <p class="chapter-one-whisper">${data.whisper}</p>
        <div class="chapter-one-flower" aria-hidden="true">❀</div>
      </section>`;

    container.querySelector('#chapter-open').addEventListener('click', () => {
      soundManager.playTap();
      this.app.navigateTo(data.target, true, { skipChapterGate: true });
    });
    return container;
  }

  cleanup() {}
}
