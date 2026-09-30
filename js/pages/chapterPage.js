import { soundManager } from '../audio.js';

const CHAPTERS = {
  'chapter-01': {
    index: '01 / 06',
    label: 'CHAPTER 01',
    kicker: 'A BIRTHDAY STORY, WRITTEN WITH LOVE',
    title: 'A little story\nfor a very special day.',
    lines: [
      'Some days deserve more than a simple happy birthday...',
      'they deserve a few soft moments, silly smiles, and words worth keeping.',
      'So this little story starts with one wish made especially for today.'
    ],
    whisper: 'Before anything else, there is a birthday wish waiting for you.',
    target: 'choice'
  },
  'chapter-02': {
    index: '02 / 06',
    label: 'CHAPTER 02',
    kicker: 'A SWEET MOMENT, JUST FOR YOU',
    title: 'A little magic,\na little cake.',
    lines: [
      'What is a birthday without a candle to blow?',
      'Close your eyes, hold onto that beautiful wish you just made...',
      'and let the birthday magic begin.'
    ],
    whisper: 'There is a cake waiting just for you. ♡',
    target: 'cake'
  },
  'chapter-03': {
    index: '03 / 06',
    label: 'CHAPTER 03',
    kicker: 'A FEW SURPRISES, SAVED WITH CARE',
    title: 'The little things\nI wanted you to open slowly.',
    lines: [
      'A memory can be a gift. So can a laugh. So can a few honest words.',
      'Nothing here is meant to be rushed...',
      'just open each little surprise whenever you are ready.'
    ],
    whisper: 'Three gifts. One by one. No chapter screens in between. ♡',
    target: 'gifts-hub'
  },
  'chapter-04': {
    index: '04 / 06',
    label: 'CHAPTER 04',
    kicker: 'OUR SWEET MEMORIES',
    title: '5 beautiful things\nI will always cherish.',
    lines: [
      'From those unspoken moments in school...',
      'to the little things that made us smile.',
      'Here are a few memories that stay with me.'
    ],
    whisper: 'Here is what makes you special. ♡',
    target: 'awards'
  },
  'chapter-05': {
    index: '05 / 06',
    label: 'CHAPTER 05',
    kicker: 'OUR ENDLESS MEMORIES',
    title: 'An infinite loop\nof beautiful moments.',
    lines: [
      'Some memories are so precious, we wish we could play them on loop...',
      'so here is a little circle of my favorite moments with you.',
      'Just a little reminder of how much you mean to me.'
    ],
    whisper: 'A beautiful journey in a circle. ♡',
    target: 'memories-circle'
  },
  'chapter-06': {
    index: '06 / 06',
    label: 'CHAPTER 06',
    kicker: 'THE END CREDITS',
    title: 'Every good story\ndeserves proper credits.',
    lines: [
      'The ceremony is over, the gifts are opened.',
      'But there is still one final scroll...',
      'to properly end this little birthday website.'
    ],
    whisper: 'A few last words waiting in the credits. ♡',
    target: 'credits'
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
