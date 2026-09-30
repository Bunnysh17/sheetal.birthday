import { birthdayConfig } from '../../config.js';
import { CakePage } from './cakePage.js?v=60.0';

// Short scenes form one continuous film; no game or page unlock interrupts it.
export class BirthdayFilmPage {
  constructor(app) {
    this.app = app;
    this.index = 0;
    this.elapsed = 0;
    this.paused = matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.photos = ['photo_cute_smile.jpg','photo_sunshine_smile.jpg','photo_jhumka_smile.jpg','photo_green_dress.jpg','photo_peace_sign.jpg','photo_sofa_pose.jpg'];
    this.scenes = [
      {chapter:'PROLOGUE', small:'A little film. A whole lot of love.', lines:['This one','is for you.'], duration:3800, kind:'title'},
      {chapter:'CHAPTER 01 · YOU', small:'Out of all the people in this world…', lines:['My favourite','is you.'], photo:0, duration:4200},
      {chapter:'THE LITTLE THINGS', small:'The smile. The silliness. Everything in between.', lines:['Tumhari hasi.','Mera favourite.'], photo:1, duration:4200},
      {chapter:'CHAPTER 02 · THE MOMENTS', small:'Some moments deserve to play on repeat.', lines:['Little moments.','So much love.'], kind:'reel', duration:6000},
      {chapter:'JUST SO YOU KNOW', small:'It is the little things that stay with me.', lines:['Ordinary days.','Extraordinary you.'], photo:2, duration:4200},
      {chapter:'CHAPTER 03 · A WISH', small:'Close your eyes. Make a wish.', lines:['A little birthday','magic.'], kind:'cake', duration:11000},
      {chapter:'HAPPY BIRTHDAY', small:'Today, and every day after.', lines:['May life be','gentle with you.'], photo:3, duration:4800},
      {chapter:'CHAPTER 04 · FROM MY HEART', small:'Kuch baatein jo kehna reh jaata hai…', lines:['You are my','comfort person.'], photo:4, duration:4500},
      {chapter:'THANK YOU', small:'For staying. For understanding. For being you.', lines:['Meri life ka','pyaara sa hissa.'], kind:'title', duration:4500},
      {chapter:'ONE LITTLE PROMISE', small:'May we celebrate all your birthdays together.', lines:['More birthdays.','More us.'], kind:'reel', duration:5000},
      {chapter:'THE FINAL CHAPTER', small:'Iss film ka. Hamari kahaani toh abhi baaki hai.', lines:['THE','END.'], kind:'ending', duration:5500}
    ];
  }
  render() {
    this.root = document.createElement('div');
    this.root.className = 'birthday-film';
    this.root.innerHTML = `<div class="film-grain" aria-hidden="true"></div><header class="film-header"><span>FOR YOU, WITH LOVE</span><span class="film-running">A BIRTHDAY FILM · ON REPEAT</span></header><div class="film-screen"></div><footer class="film-footer"><div class="film-timeline" aria-label="Film progress">${this.scenes.map(()=>'<span><i></i></span>').join('')}</div><div class="film-controls"><button id="film-prev" aria-label="Previous scene">←</button><button id="film-play"></button><button id="film-next" aria-label="Next scene">→</button><span class="film-counter"></span></div></footer>`;
    this.root.querySelector('#film-play').onclick=()=>{this.paused=!this.paused;this.syncPlayback();};
    this.root.querySelector('#film-prev').onclick=()=>this.go(this.index-1);
    this.root.querySelector('#film-next').onclick=()=>this.go(this.index+1);
    this.visibility=()=>this.syncPlayback();
    document.addEventListener('visibilitychange',this.visibility);
    document.body.classList.add('film-mode');
    this.show();
    this.last=performance.now();
    const tick=now=>{
      if(this.disposed)return;
      const delta=now-this.last;this.last=now;
      if(!this.paused&&!document.hidden){
        this.elapsed+=delta;
        const scene=this.scenes[this.index];
        if(scene.kind==='cake'){
          const btn=this.root.querySelector('#cake-action-btn');
          if(this.elapsed>900&&this.cake?.step==='blow')btn?.click();
          if(this.elapsed>1900&&this.cake?.step==='cut')btn?.click();
        }
        if(this.elapsed>=scene.duration)this.go(this.index+1);
      }
      this.root.querySelectorAll('.film-timeline i').forEach((bar,i)=>bar.style.transform=`scaleX(${i<this.index?1:i===this.index?Math.min(1,this.elapsed/this.scenes[this.index].duration):0})`);
      this.frame=requestAnimationFrame(tick);
    };
    this.frame=requestAnimationFrame(tick);
    return this.root;
  }
  go(index){this.index=(index+this.scenes.length)%this.scenes.length;this.elapsed=0;this.show();}
  show(){
    this.cake?.cleanup();this.cake=null;
    const s=this.scenes[this.index];
    const screen=this.root.querySelector('.film-screen');
    screen.className=`film-screen film-${s.kind||'portrait'}`;
    screen.innerHTML=`<div class="film-copy"><span class="film-chapter"></span><h1></h1><p class="film-subtitle"></p></div>`;
    screen.querySelector('.film-chapter').textContent=s.chapter;
    screen.querySelector('.film-subtitle').textContent=s.small;
    s.lines.forEach((line,i)=>{const span=document.createElement('span');span.textContent=line;span.style.setProperty('--line',i);screen.querySelector('h1').append(span);});
    if(s.photo!=null){
      const figure=document.createElement('figure');figure.className='film-portrait-frame';
      const image=document.createElement('img');image.src='assets/gallery/'+this.photos[s.photo];image.alt='A favourite birthday memory';figure.append(image);screen.append(figure);
    }
    if(s.kind==='reel'){
      const reel=document.createElement('div');reel.className='film-reel';reel.setAttribute('aria-label','A continuous strip of favourite photos');
      const track=document.createElement('div');track.className='film-reel-track';
      for(let repeat=0;repeat<2;repeat++){
        const set=document.createElement('div');set.className='film-reel-set';if(repeat)set.setAttribute('aria-hidden','true');
        this.photos.forEach((name,i)=>{const fig=document.createElement('figure');const img=document.createElement('img');img.src='assets/gallery/'+name;img.alt=repeat?'':`Favourite moment ${i+1}`;fig.append(img);set.append(fig);});track.append(set);
      }
      reel.append(track);screen.append(reel);
    }
    if(s.kind==='cake'){this.cake=new CakePage(this.app);screen.append(this.cake.render());}
    this.root.querySelector('.film-counter').textContent=`${String(this.index+1).padStart(2,'0')} / ${this.scenes.length}`;
    this.syncPlayback();
  }
  syncPlayback(){
    const stopped=this.paused||document.hidden;
    this.root.classList.toggle('film-paused',stopped);
    this.root.querySelector('#film-play').textContent=this.paused?'PLAY ▷':'PAUSE Ⅱ';
    this.root.querySelector('#film-play').setAttribute('aria-label',this.paused?'Play birthday film':'Pause birthday film');
    this.root.getAnimations({subtree:true}).forEach(animation=>stopped?animation.pause():animation.play());
    this.last=performance.now();
  }
  cleanup(){this.disposed=true;cancelAnimationFrame(this.frame);this.cake?.cleanup();document.removeEventListener('visibilitychange',this.visibility);document.body.classList.remove('film-mode');}
}
