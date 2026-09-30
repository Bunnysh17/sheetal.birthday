const validPhotoPath = src => typeof src === 'string' && /^assets\/gallery\/[a-zA-Z0-9_./ ()-]+\.(png|jpe?g|webp|gif)$/i.test(src) && !src.includes('..');
const FRAMES = ['glass', 'classic', 'gold', 'rounded'];
const clamp = (v, lo, hi, fallback) => Number.isFinite(Number(v)) ? Math.min(hi, Math.max(lo, Number(v))) : fallback;
function normalize(p, saved = {}) {
  return {...p, zoom: clamp(saved.zoom, .8, 3, 1), positionX: clamp(saved.positionX, 0, 100, 50),
    positionY: clamp(saved.positionY, 0, 100, 25), fit: saved.fit === 'contain' ? 'contain' : 'cover',
    frameStyle: FRAMES.includes(saved.frameStyle) ? saved.frameStyle : 'glass'};
}
export function circlePhotoStyle(p) {
  return `object-fit:${p.fit};object-position:50% 25%;transform:translate(${(p.positionX - 50) * .6}%, ${(p.positionY - 25) * .6}%) scale(${p.zoom});`;
}
export async function loadCircleAdjustments(photos) {
  let saved = {};
  try {
    const r = await fetch('photo_adjustments.json?t=' + Date.now());
    if (r.ok) {
      const settings = await r.json();
      if (Array.isArray(settings.circle_gallery) && settings.circle_gallery.length >= 10 && settings.circle_gallery.length <= 12 && settings.circle_gallery.every(p => validPhotoPath(p.src))) {
        return settings.circle_gallery.map((p, i) => normalize({src:p.src, extra:i >= 10}, p));
      }
      saved = settings.circle_photos || {};
    }
  } catch {}
  return photos.map(p => normalize(p, saved[p.src]));
}
export function openCircleEditor(page, initialIndex) {
  let index = initialIndex, busy = false, closed = false;
  const draft = page.photos.map(p => ({...p}));
  const scene = page.container.querySelector('.carousel-scene');
  const focusBefore = document.activeElement;
  scene.style.animationPlayState = 'paused';
  const dialog = document.createElement('dialog');
  dialog.className = 'circle-editor';
  dialog.setAttribute('aria-labelledby', 'circle-editor-title');
  dialog.innerHTML = `
    <header><div><p class="circle-editor-eyebrow">MAKE IT YOURS</p><h2 id="circle-editor-title">Photos & frames</h2></div><button type="button" data-close aria-label="Close editor">&#215;</button></header>
    <div class="circle-editor-thumbnails" aria-label="Choose a photo"></div>
    <div class="circle-editor-upload-actions"><button type="button" data-replace>Change photo</button><button type="button" data-add>+ Add photo</button><button type="button" data-remove hidden>Remove extra frame</button><span>JPG, PNG, WebP or GIF · up to 8 MB</span></div>
    <input type="file" data-photo-file accept="image/jpeg,image/png,image/webp,image/gif" hidden>
    <div class="circle-editor-body">
      <div class="circle-editor-preview"><div class="circle-editor-frame"><div class="circle-editor-crop"><img alt="Selected photo preview"></div></div><p id="circle-selected-label"></p></div>
      <div class="circle-editor-controls">
        <label>Photo fit<select name="fit"><option value="cover">Fill the frame</option><option value="contain">Show the whole photo</option></select></label>
        <label>Zoom <output data-output="zoom"></output><input aria-label="Zoom" name="zoom" type="range" min="0.8" max="3" step="0.01"></label>
        <label>Left / right <output data-output="positionX"></output><input aria-label="Horizontal position" name="positionX" type="range" min="0" max="100" step="1"></label>
        <label>Up / down <output data-output="positionY"></output><input aria-label="Vertical position" name="positionY" type="range" min="0" max="100" step="1"></label>
        <label>Frame<select name="frameStyle"><option value="glass">Frosted glass</option><option value="classic">Classic cream</option><option value="gold">Gold edge glass</option><option value="rounded">Soft rounded glass</option></select></label>
        <div class="circle-editor-small-actions"><button type="button" data-all>Use this frame for all</button><button type="button" data-reset>Reset adjustment</button></div>
      </div>
    </div>
    <footer><p role="status" aria-live="polite">Adjust each photo, then save your changes.</p><div><button type="button" data-cancel>Cancel</button><button type="button" data-save>Save changes</button></div></footer>`;
  const strip = dialog.querySelector('.circle-editor-thumbnails');
  function buildThumbnails() {
    const scroll = strip.scrollLeft;
    strip.replaceChildren();
    draft.forEach((p, i) => {
      const button = document.createElement('button');
      button.type = 'button'; button.setAttribute('aria-label', `Edit photo ${i + 1}`);
      const img = document.createElement('img'); img.src = p.src; img.alt = '';
      button.append(img); button.addEventListener('click', () => { index = i; render(); });
      strip.append(button);
    });
    strip.scrollLeft = scroll;
  }
  buildThumbnails();
  const status = dialog.querySelector('[role=status]');
  const frame = dialog.querySelector('.circle-editor-frame');
  const preview = dialog.querySelector('.circle-editor-crop img');
  function render() {
    const p = draft[index];
    dialog.querySelector('[data-add]').disabled = busy || draft.length >= 12;
    dialog.querySelector('[data-add]').textContent = draft.length >= 12 ? '12 frames added' : '+ Add photo';
    dialog.querySelector('[data-remove]').hidden = index < 10;
    preview.src = p.src; preview.style.cssText = circlePhotoStyle(p);
    frame.className = 'circle-editor-frame ' + p.frameStyle;
    dialog.querySelector('#circle-selected-label').textContent = `Photo ${index + 1} of ${draft.length}`;
    strip.querySelectorAll('button').forEach((b, i) => b.setAttribute('aria-pressed', String(i === index)));
    for (const name of ['zoom', 'positionX', 'positionY', 'fit', 'frameStyle']) dialog.querySelector(`[name=${name}]`).value = p[name];
    dialog.querySelector('[data-output=zoom]').textContent = p.zoom.toFixed(2) + '×';
    for (const name of ['positionX','positionY']) dialog.querySelector(`[data-output=${name}]`).textContent = p[name] + '%';
  }
  dialog.querySelectorAll('input[type=range],select').forEach(control => control.addEventListener('input', () => {
    draft[index][control.name] = control.type === 'range' ? Number(control.value) : control.value;
    status.textContent = 'Preview updated. Save when you are happy with it.'; render();
  }));
  dialog.querySelector('[data-all]').onclick = () => {
    draft.forEach(p => p.frameStyle = draft[index].frameStyle);
    status.textContent = 'This frame is now selected for all photos. Save to keep it.';
  };
  dialog.querySelector('[data-reset]').onclick = () => {
    draft[index] = normalize(draft[index]); render(); status.textContent = 'Photo reset. Save to keep this adjustment.';
  };
  const fileInput = dialog.querySelector('[data-photo-file]');
  let uploadMode = 'replace';
  dialog.querySelector('[data-replace]').onclick = () => { uploadMode = 'replace'; fileInput.click(); };
  dialog.querySelector('[data-add]').onclick = () => { if (draft.length < 12) { uploadMode = 'add'; fileInput.click(); } };
  dialog.querySelector('[data-remove]').onclick = () => {
    if (index < 10) return;
    draft.splice(index, 1); index = Math.min(index, draft.length - 1);
    buildThumbnails(); render(); status.textContent = 'Extra frame removed from the preview. Save to keep this change.';
  };
  fileInput.addEventListener('change', async () => {
    const file = fileInput.files[0]; fileInput.value = '';
    if (!file || busy) return;
    if (!/\.(png|jpe?g|webp|gif)$/i.test(file.name) || !['image/jpeg','image/png','image/webp','image/gif'].includes(file.type) || file.size > 8 * 1024 * 1024) {
      status.textContent = 'Choose a JPG, PNG, WebP or GIF smaller than 8 MB.'; return;
    }
    busy = true; dialog.querySelectorAll('button,input,select').forEach(el => el.disabled = true);
    status.textContent = 'Adding your photo…';
    try {
      const data = await new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsDataURL(file); });
      await new Promise((resolve, reject) => { const image = new Image(); image.onload = resolve; image.onerror = reject; image.src = data; });
      if (closed) return;
      const response = await fetch('/api/upload-photo', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({name:file.name, data})});
      if (!response.ok) throw new Error('Upload failed');
      const result = await response.json();
      if (!validPhotoPath(result.filePath)) throw new Error('Invalid photo path');
      if (closed) return;
      if (uploadMode === 'add') { draft.push(normalize({src:result.filePath, extra:true})); index = draft.length - 1; }
      else draft[index] = normalize({...draft[index], src:result.filePath}, {frameStyle:draft[index].frameStyle});
      buildThumbnails(); render();
      status.textContent = 'Photo added. Adjust its framing, then save your changes.';
    } catch {
      if (!closed) status.textContent = 'Could not add this photo. Please try another image.';
    } finally {
      busy = false;
      if (!closed) { dialog.querySelectorAll('button,input,select').forEach(el => el.disabled = false); render(); }
    }
  });
  function close() {
    if (closed) return;
    closed = true; dialog.close(); dialog.remove(); scene.style.animationPlayState = '';
    if (focusBefore?.isConnected) focusBefore.focus();
  }
  for (const key of ['close', 'cancel']) dialog.querySelector(`[data-${key}]`).onclick = () => { if (!busy) close(); };
  dialog.addEventListener('cancel', e => { e.preventDefault(); if (!busy) close(); });
  dialog.querySelector('[data-save]').onclick = async () => {
    if (busy) return;
    busy = true;
    dialog.querySelectorAll('button,input,select').forEach(el => el.disabled = true);
    status.textContent = 'Saving your photos and frames…';
    try {
      // Read the latest shared settings so other pages' saved photos are preserved.
      const response = await fetch('photo_adjustments.json?t=' + Date.now());
      if (!response.ok) throw new Error('Cannot read current settings');
      const settings = await response.json();
      settings.circle_gallery = draft.map(({src, zoom, positionX, positionY, fit, frameStyle}) => ({src, zoom, positionX, positionY, fit, frameStyle}));
      settings.circle_photos = {...settings.circle_photos};
      draft.forEach(({src, zoom, positionX, positionY, fit, frameStyle}) => {
        settings.circle_photos[src] = {zoom, positionX, positionY, fit, frameStyle};
      });
      const saved = await fetch('/api/save-adjustments', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(settings)});
      if (!saved.ok || (await saved.json()).status !== 'ok') throw new Error('Save failed');
      if (closed) return;
      page.photos = draft; page.rebuildCircle(); close();
    } catch {
      if (!closed) status.textContent = 'Could not save yet. Your preview is still here—please try again.';
    } finally {
      busy = false;
      dialog.querySelectorAll('button,input,select').forEach(el => el.disabled = false);
    }
  };
  document.body.append(dialog); render(); dialog.showModal();
  return close;
}
