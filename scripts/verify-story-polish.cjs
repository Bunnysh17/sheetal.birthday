const {chromium}=require('C:/Users/mahip/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage({viewport:{width:390,height:844}}); const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const route of ['choice','gifts-hub','letter','gift1-game','gift2-game','gift3-game','special-things']) {
 await page.goto('http://localhost:8080/#'+route,{waitUntil:'domcontentloaded'});
 await page.waitForTimeout(1200);
 if(['choice','gifts-hub','letter'].includes(route)) await page.screenshot({path:`scripts/polish-${route}-mobile.png`,fullPage:true});
 console.log(route,await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,title:document.querySelector('h1')?.textContent.trim()})));
 if(route.endsWith('-game')) {await page.locator('.story-skip').click();await page.waitForTimeout(450);console.log('Skip →',await page.evaluate(()=>window.birthdayApp.currentPageId));}
 if(route==='special-things') {await page.locator('.special-card-wrap').first().focus();await page.keyboard.press('Enter');console.log('Keyboard reveal:',await page.locator('.special-card-wrap').first().getAttribute('aria-pressed'));}
}
console.log('Errors:',errors);await browser.close();if(errors.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
