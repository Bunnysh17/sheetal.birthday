/**
 * 🎨 Mobile & Desktop Live Photo Adjuster Modal
 * Allows interactive Zoom (scale), Pan X/Y (up/down/left/right), and Fit (cover/contain) adjustments
 * with live real-time preview and direct saving to localStorage and server.
 */

import { soundManager } from '../audio.js';

export const CARD_ITEMS = [
  { key: 'sofa_pose', name: 'Graceful 👑', defaultImage: 'assets/gallery/upload_1790536309773.png' },
  { key: 'birthday_hat', name: 'Cutie 💖', defaultImage: 'assets/gallery/upload_1790536176961.png' },
  { key: 'jhumka_smile', name: 'Traditional ✨', defaultImage: 'assets/gallery/upload_1790536263785.png' },
  { key: 'cool_shades', name: 'Chic 😎', defaultImage: 'assets/gallery/upload_1790536205575.png' },
  { key: 'peace_sign', name: 'Dreamer 🌸', defaultImage: 'assets/gallery/upload_1790279965330.png' },
  { key: 'vintage_cam', name: 'Joyful 🥰', defaultImage: 'assets/gallery/photo_birthday_hat.jpg' }
];

export class PhotoAdjusterModal {
  constructor(options = {}) {
    this.onSave = options.onSave || null;
    this.onChange = options.onChange || null;
    this.adjustments = {};
    this.dom = null;
    this.isDragging = false;
    this.dragKey = null;
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.initialX = 0;
    this.initialY = 0;
  }

  async loadInitialData() {
    // 1. Defaults
    CARD_ITEMS.forEach(item => {
      this.adjustments[item.key] = {
        image: item.defaultImage,
        fit: 'cover',
        x: 0,
        y: 0,
        scale: 1.0
      };
    });

    // 2. Fetch from photo_adjustments.json
    try {
      const res = await fetch('photo_adjustments.json?t=' + Date.now());
      if (res.ok) {
        const data = await res.json();
        Object.keys(data).forEach(k => {
          if (this.adjustments[k]) {
            this.adjustments[k] = { ...this.adjustments[k], ...data[k] };
          }
        });
      }
    } catch (e) {}

    // 3. Merge from localStorage
    try {
      const stored = localStorage.getItem('birthday_photo_adjustments');
      if (stored) {
        const parsed = JSON.parse(stored);
        Object.keys(parsed).forEach(k => {
          if (this.adjustments[k]) {
            this.adjustments[k] = { ...this.adjustments[k], ...parsed[k] };
          }
        });
      }
    } catch (e) {}
  }

  getStyle(key) {
    const adj = this.adjustments[key] || { x: 0, y: 0, scale: 1.0, fit: 'cover' };
    const fit = adj.fit || 'cover';
    const x = adj.x || 0;
    const y = adj.y || 0;
    const scale = adj.scale || 1.0;
    return `object-fit: ${fit}; transform: translate(${x}px, ${y}px) scale(${scale});`;
  }

  async open() {
    await this.loadInitialData();

    // Create modal DOM
    const modal = document.createElement('div');
    modal.className = 'photo-adjust-modal active';
    modal.id = 'photo-adjust-modal-dialog';

    modal.innerHTML = `
      <div class="photo-adjust-sheet">
        <!-- Header -->
        <div class="photo-adjust-header">
          <div>
            <h2 class="adjust-title">🎨 Photo Position & Zoom Adjuster</h2>
            <p class="adjust-desc">Zoom, up/down aur left/right adjust karein. Changes live update honge!</p>
          </div>
          <div class="adjust-header-actions">
            <button class="save-adjustments-btn" id="adjust-header-save-btn">
              💾 Save All
            </button>
            <button class="adjust-close-btn" id="adjust-close-dialog-btn" title="Close">✕</button>
          </div>
        </div>

        <!-- Body with all cards -->
        <div class="photo-adjust-body">
          <div class="photo-adjust-grid">
            ${CARD_ITEMS.map(item => this.renderCardEditor(item)).join('')}
          </div>
        </div>

        <!-- Footer -->
        <div class="photo-adjust-footer">
          <span class="adjust-save-status" id="adjust-save-status-msg"></span>
          <div class="adjust-footer-btns">
            <button class="adjust-btn-secondary" id="adjust-reset-all-btn">
              🔄 Reset All Defaults
            </button>
            <button class="save-adjustments-btn big-save-btn" id="adjust-footer-save-btn">
              💾 Save & Apply Now ✨
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    this.dom = modal;

    this.bindEvents();
  }

  renderCardEditor(item) {
    const adj = this.adjustments[item.key] || { fit: 'cover', x: 0, y: 0, scale: 1.0 };
    const imgSrc = adj.image || item.defaultImage;
    const fit = adj.fit || 'cover';
    const scale = (adj.scale !== undefined) ? Number(adj.scale).toFixed(2) : '1.00';
    const x = adj.x || 0;
    const y = adj.y || 0;

    return `
      <div class="adjust-card-item" data-key="${item.key}">
        <!-- Preview Box -->
        <div class="adjust-card-preview-box">
          <div class="adjust-preview-frame">
            <div class="adjust-preview-viewport" data-viewport="${item.key}">
              <img src="${imgSrc}" class="adjust-preview-img" data-img="${item.key}" style="${this.getStyle(item.key)}" alt="${item.name}" />
              <div class="adjust-drag-overlay">
                <span class="drag-hint">👆 Drag to move</span>
              </div>
            </div>
            <div class="adjust-preview-label">${item.name}</div>
          </div>
        </div>

        <!-- Controls Box -->
        <div class="adjust-controls-box">
          <!-- Fit Mode Toggle -->
          <div class="adjust-control-group">
            <div class="adjust-group-header">
              <span>Photo Fit Mode</span>
            </div>
            <div style="display: flex; gap: 8px;">
              <button type="button" class="adjust-step-btn fit-btn ${fit === 'cover' ? 'active-fit' : ''}" data-key="${item.key}" data-fit="cover" style="flex: 1; ${fit === 'cover' ? 'background: #8C4A1E; color: white;' : ''}">
                Cover (Fill)
              </button>
              <button type="button" class="adjust-step-btn fit-btn ${fit === 'contain' ? 'active-fit' : ''}" data-key="${item.key}" data-fit="contain" style="flex: 1; ${fit === 'contain' ? 'background: #8C4A1E; color: white;' : ''}">
                Contain (Full)
              </button>
            </div>
          </div>

          <!-- Zoom Slider -->
          <div class="adjust-control-group">
            <div class="adjust-group-header">
              <span>🔍 Zoom / Scale</span>
              <span class="adjust-val-badge" data-badge-scale="${item.key}">${scale}x</span>
            </div>
            <div class="adjust-slider-row">
              <button type="button" class="adjust-step-btn" data-step-scale="${item.key}" data-val="-0.05">-</button>
              <input type="range" class="adjust-range-slider" data-range-scale="${item.key}" min="0.6" max="2.5" step="0.05" value="${scale}" />
              <button type="button" class="adjust-step-btn" data-step-scale="${item.key}" data-val="0.05">+</button>
            </div>
          </div>

          <!-- Position Y (Up / Down) -->
          <div class="adjust-control-group">
            <div class="adjust-group-header">
              <span>↕️ Up / Down (Pan Y)</span>
              <span class="adjust-val-badge" data-badge-y="${item.key}">${y}px</span>
            </div>
            <div class="adjust-slider-row">
              <button type="button" class="adjust-step-btn" data-step-y="${item.key}" data-val="-2">⬆ Up</button>
              <input type="range" class="adjust-range-slider" data-range-y="${item.key}" min="-60" max="60" step="1" value="${y}" />
              <button type="button" class="adjust-step-btn" data-step-y="${item.key}" data-val="2">⬇ Down</button>
            </div>
          </div>

          <!-- Position X (Left / Right) -->
          <div class="adjust-control-group">
            <div class="adjust-group-header">
              <span>↔️ Left / Right (Pan X)</span>
              <span class="adjust-val-badge" data-badge-x="${item.key}">${x}px</span>
            </div>
            <div class="adjust-slider-row">
              <button type="button" class="adjust-step-btn" data-step-x="${item.key}" data-val="-2">⬅ Left</button>
              <input type="range" class="adjust-range-slider" data-range-x="${item.key}" min="-60" max="60" step="1" value="${x}" />
              <button type="button" class="adjust-step-btn" data-step-x="${item.key}" data-val="2">Right ➡</button>
            </div>
          </div>

          <div class="adjust-item-actions">
            <button type="button" class="adjust-item-reset" data-reset-item="${item.key}">↺ Reset</button>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const modal = this.dom;
    if (!modal) return;

    // Close buttons
    modal.querySelector('#adjust-close-dialog-btn')?.addEventListener('click', () => this.close());
    modal.addEventListener('click', (e) => {
      if (e.target === modal) this.close();
    });

    // Save buttons
    const saveHandler = () => this.saveAdjustments();
    modal.querySelector('#adjust-header-save-btn')?.addEventListener('click', saveHandler);
    modal.querySelector('#adjust-footer-save-btn')?.addEventListener('click', saveHandler);

    // Reset All
    modal.querySelector('#adjust-reset-all-btn')?.addEventListener('click', () => {
      CARD_ITEMS.forEach(item => {
        this.adjustments[item.key] = {
          image: item.defaultImage,
          fit: 'cover',
          x: 0,
          y: 0,
          scale: 1.0
        };
        this.updateCardUI(item.key);
      });
      this.notifyChange();
    });

    // Fit Mode buttons
    modal.querySelectorAll('.fit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const key = btn.getAttribute('data-key');
        const fit = btn.getAttribute('data-fit');
        if (this.adjustments[key]) {
          this.adjustments[key].fit = fit;
          this.updateCardUI(key);
          this.notifyChange();
        }
      });
    });

    // Range Sliders
    modal.querySelectorAll('[data-range-scale]').forEach(input => {
      const key = input.getAttribute('data-range-scale');
      input.addEventListener('input', () => {
        this.adjustments[key].scale = parseFloat(input.value);
        this.updateCardUI(key);
        this.notifyChange();
      });
    });

    modal.querySelectorAll('[data-range-y]').forEach(input => {
      const key = input.getAttribute('data-range-y');
      input.addEventListener('input', () => {
        this.adjustments[key].y = parseInt(input.value, 10);
        this.updateCardUI(key);
        this.notifyChange();
      });
    });

    modal.querySelectorAll('[data-range-x]').forEach(input => {
      const key = input.getAttribute('data-range-x');
      input.addEventListener('input', () => {
        this.adjustments[key].x = parseInt(input.value, 10);
        this.updateCardUI(key);
        this.notifyChange();
      });
    });

    // Step Buttons (+ / -)
    modal.querySelectorAll('[data-step-scale]').forEach(btn => {
      const key = btn.getAttribute('data-step-scale');
      const val = parseFloat(btn.getAttribute('data-val'));
      btn.addEventListener('click', () => {
        let cur = parseFloat(this.adjustments[key].scale || 1.0);
        cur = Math.min(2.5, Math.max(0.6, cur + val));
        this.adjustments[key].scale = parseFloat(cur.toFixed(2));
        this.updateCardUI(key);
        this.notifyChange();
      });
    });

    modal.querySelectorAll('[data-step-y]').forEach(btn => {
      const key = btn.getAttribute('data-step-y');
      const val = parseInt(btn.getAttribute('data-val'), 10);
      btn.addEventListener('click', () => {
        let cur = parseInt(this.adjustments[key].y || 0, 10);
        cur = Math.min(60, Math.max(-60, cur + val));
        this.adjustments[key].y = cur;
        this.updateCardUI(key);
        this.notifyChange();
      });
    });

    modal.querySelectorAll('[data-step-x]').forEach(btn => {
      const key = btn.getAttribute('data-step-x');
      const val = parseInt(btn.getAttribute('data-val'), 10);
      btn.addEventListener('click', () => {
        let cur = parseInt(this.adjustments[key].x || 0, 10);
        cur = Math.min(60, Math.max(-60, cur + val));
        this.adjustments[key].x = cur;
        this.updateCardUI(key);
        this.notifyChange();
      });
    });

    // Reset Item
    modal.querySelectorAll('[data-reset-item]').forEach(btn => {
      const key = btn.getAttribute('data-reset-item');
      btn.addEventListener('click', () => {
        const item = CARD_ITEMS.find(c => c.key === key);
        this.adjustments[key] = {
          image: item ? item.defaultImage : this.adjustments[key].image,
          fit: 'cover',
          x: 0,
          y: 0,
          scale: 1.0
        };
        this.updateCardUI(key);
        this.notifyChange();
      });
    });

    // Touch & Mouse Drag to Move
    modal.querySelectorAll('[data-viewport]').forEach(vp => {
      const key = vp.getAttribute('data-viewport');

      const onStart = (clientX, clientY) => {
        this.isDragging = true;
        this.dragKey = key;
        this.dragStartX = clientX;
        this.dragStartY = clientY;
        this.initialX = parseInt(this.adjustments[key].x || 0, 10);
        this.initialY = parseInt(this.adjustments[key].y || 0, 10);
      };

      const onMove = (clientX, clientY) => {
        if (!this.isDragging || this.dragKey !== key) return;
        const dx = clientX - this.dragStartX;
        const dy = clientY - this.dragStartY;
        const newX = Math.min(60, Math.max(-60, Math.round(this.initialX + dx)));
        const newY = Math.min(60, Math.max(-60, Math.round(this.initialY + dy)));
        this.adjustments[key].x = newX;
        this.adjustments[key].y = newY;
        this.updateCardUI(key);
        this.notifyChange();
      };

      const onEnd = () => {
        this.isDragging = false;
        this.dragKey = null;
      };

      // Mouse
      vp.addEventListener('mousedown', (e) => {
        e.preventDefault();
        onStart(e.clientX, e.clientY);
        const handleMouseMove = (me) => onMove(me.clientX, me.clientY);
        const handleMouseUp = () => {
          onEnd();
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('mouseup', handleMouseUp);
        };
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
      });

      // Touch
      vp.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          onStart(e.touches[0].clientX, e.touches[0].clientY);
        }
      }, { passive: true });

      vp.addEventListener('touchmove', (e) => {
        if (e.touches.length === 1) {
          onMove(e.touches[0].clientX, e.touches[0].clientY);
        }
      }, { passive: true });

      vp.addEventListener('touchend', onEnd);
    });
  }

  updateCardUI(key) {
    const modal = this.dom;
    if (!modal) return;

    const adj = this.adjustments[key] || { fit: 'cover', x: 0, y: 0, scale: 1.0 };
    const img = modal.querySelector(`[data-img="${key}"]`);
    if (img) {
      img.style.cssText = this.getStyle(key);
    }

    // Update range inputs & badges
    const scaleRange = modal.querySelector(`[data-range-scale="${key}"]`);
    const scaleBadge = modal.querySelector(`[data-badge-scale="${key}"]`);
    if (scaleRange) scaleRange.value = adj.scale;
    if (scaleBadge) scaleBadge.textContent = Number(adj.scale).toFixed(2) + 'x';

    const yRange = modal.querySelector(`[data-range-y="${key}"]`);
    const yBadge = modal.querySelector(`[data-badge-y="${key}"]`);
    if (yRange) yRange.value = adj.y;
    if (yBadge) yBadge.textContent = adj.y + 'px';

    const xRange = modal.querySelector(`[data-range-x="${key}"]`);
    const xBadge = modal.querySelector(`[data-badge-x="${key}"]`);
    if (xRange) xRange.value = adj.x;
    if (xBadge) xBadge.textContent = adj.x + 'px';

    // Update fit button active state
    modal.querySelectorAll(`.fit-btn[data-key="${key}"]`).forEach(btn => {
      const isCur = btn.getAttribute('data-fit') === adj.fit;
      btn.style.background = isCur ? '#8C4A1E' : '#F7EFE4';
      btn.style.color = isCur ? '#FFFFFF' : '#5C3A21';
    });
  }

  notifyChange() {
    if (this.onChange) {
      this.onChange(this.adjustments);
    }
  }

  async saveAdjustments() {
    soundManager.playSuccessSound();
    const statusEl = this.dom?.querySelector('#adjust-save-status-msg');
    if (statusEl) {
      statusEl.textContent = '💾 Saving adjustments...';
      statusEl.style.color = '#2E7D32';
    }

    // 1. Save to localStorage
    try {
      localStorage.setItem('birthday_photo_adjustments', JSON.stringify(this.adjustments));
    } catch (e) {}

    // 2. Save to server if available
    try {
      let existingSettings = {};
      try {
        const fetchRes = await fetch('photo_adjustments.json?t=' + Date.now());
        if (fetchRes.ok) existingSettings = await fetchRes.json();
      } catch (e) {}

      const updated = { ...existingSettings, ...this.adjustments };
      await fetch('/api/save-adjustments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
    } catch (e) {}

    if (statusEl) {
      statusEl.textContent = '✨ Saved successfully!';
      setTimeout(() => {
        if (statusEl) statusEl.textContent = '';
      }, 3000);
    }

    if (this.onSave) {
      this.onSave(this.adjustments);
    }
  }

  close() {
    if (!this.dom) return;
    this.dom.classList.remove('active');
    setTimeout(() => {
      this.dom?.remove();
      this.dom = null;
    }, 250);
  }
}

export function openPhotoAdjuster(options = {}) {
  const modal = new PhotoAdjusterModal(options);
  modal.open();
  return modal;
}
