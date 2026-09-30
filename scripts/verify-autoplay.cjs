const {chromium}=require('C:/Users/mahip/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
for(const width of [390,1280]){
 const p=await b.newPage({viewport:{width,height:900}});const errors=[];p.on('pageerror',e=>errors.push(e.message));await p.clock.install();
 await p.goto('http://localhost:8080/?v=62#gift1-memories',{waitUntil:'domcontentloaded'});await p.waitForSelector('#album-play');
 const index=()=>p.evaluate(()=>window.birthdayApp.currentPageInstance.index);
 await p.clock.fastForward(22000);if(await index()!==1)throw Error('Autoplay failed');
 await p.locator('#album-play').click();const held=await index();await p.clock.fastForward(60000);if(await index()!==held)throw Error('Pause failed');
 await p.locator('#album-play').click();await p.clock.fastForward(22000);if(await index()!==2)throw Error('Resume failed');
 await p.locator('[data-memory="7"]').click();await p.clock.fastForward(22000);if(await index()!==0)throw Error('Loop failed');
 await p.evaluate(()=>{window.oldAlbum=window.birthdayApp.currentPageInstance;window.birthdayApp.navigateTo('letter',false)});await p.clock.fastForward(60000);
 if(!await p.evaluate(()=>oldAlbum.disposed&&birthdayApp.currentPageId==='letter'))throw Error('Cleanup failed');
 console.log({width,autoplay:'passed',pauseResume:'passed',loop:'passed',cleanup:'passed',errors});await p.close();
}
const p=await b.newPage({reducedMotion:'reduce'});await p.goto('http://localhost:8080/?v=62#gift1-memories',{waitUntil:'domcontentloaded'});await p.waitForSelector('#album-play');console.log('Reduced motion starts paused:',await p.evaluate(()=>birthdayApp.currentPageInstance.paused));await b.close();
})().catch(e=>{console.error(e);process.exitCode=1});
