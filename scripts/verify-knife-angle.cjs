const {chromium}=require('C:/Users/mahip/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
for(const width of [390,1280]) {
 const page=await browser.newPage({viewport:{width,height:900}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:8080/?v=60#cake',{waitUntil:'domcontentloaded'});
 await page.locator('#cake-action-btn').click();
 await page.locator('#cake-action-btn').click();
 const result=await page.evaluate(async()=>{
  const knife=document.querySelector('#real-3d-knife');const angles=[];
  while(window.birthdayApp.currentPageInstance.step!=='done') {
   const m=new DOMMatrix(getComputedStyle(knife).transform);
   if (!knife.hidden) angles.push(Math.atan2(m.b,m.a)*180/Math.PI);
   if(angles.length>160)throw Error('Cake did not finish');
   await new Promise(r=>setTimeout(r,50));
  }
  return {min:Math.min(...angles),max:Math.max(...angles),samples:angles.length};
 });
 console.log(JSON.stringify({width,...result,errors}));
 if(Math.abs(result.min+22)>.1||Math.abs(result.max+22)>.1||errors.length)throw Error('Knife angle changed');
 await page.close();
}
await browser.close();
})().catch(e=>{console.error(e);process.exitCode=1});
