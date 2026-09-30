/**
 * 🎊 Confetti Celebration Engine
 * Explosions of pastel hearts, stars, ribbons & sparkles on celebration milestones.
 */

export class ConfettiEngine {
  constructor(canvasId = 'confetti-canvas') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.confettiPieces = [];
    this.animationFrame = null;
    this.colors = ['#FF4D6D', '#FF8FA3', '#FFCCD5', '#FFAFCC', '#FFB703', '#80CED7', '#FFF0F5', '#A0C4FF'];

    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  burst(options = {}) {
    const count = options.count || 80;
    const originX = options.x !== undefined ? options.x : this.width / 2;
    const originY = options.y !== undefined ? options.y : this.height / 2;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 12 + 6;
      const type = Math.random() > 0.45 ? 'heart' : Math.random() > 0.5 ? 'star' : 'ribbon';

      this.confettiPieces.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 4, // initial upward kick
        size: Math.random() * 10 + 8,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.2,
        opacity: 1,
        gravity: 0.28,
        decay: Math.random() * 0.008 + 0.006,
        type: type
      });
    }

    if (!this.animationFrame) {
      this.animate();
    }
  }

  fireCannons() {
    // Burst left side
    this.burst({ x: this.width * 0.15, y: this.height * 0.8, count: 60 });
    // Burst right side
    setTimeout(() => {
      this.burst({ x: this.width * 0.85, y: this.height * 0.8, count: 60 });
    }, 200);
    // Burst center
    setTimeout(() => {
      this.burst({ x: this.width * 0.5, y: this.height * 0.4, count: 90 });
    }, 400);
  }

  drawHeart(ctx, x, y, size, color, opacity, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.beginPath();
    const d = size;
    ctx.moveTo(0, d / 4);
    ctx.bezierCurveTo(0, 0, -d / 2, 0, -d / 2, d / 4);
    ctx.bezierCurveTo(-d / 2, d / 2, 0, d * 0.75, 0, d);
    ctx.bezierCurveTo(0, d * 0.75, d / 2, d / 2, d / 2, d / 4);
    ctx.bezierCurveTo(d / 2, 0, 0, 0, 0, d / 4);
    ctx.fill();
    ctx.restore();
  }

  drawStar(ctx, x, y, size, color, opacity, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      ctx.lineTo(Math.cos((i * Math.PI * 2) / 5) * size, Math.sin((i * Math.PI * 2) / 5) * size);
      ctx.lineTo(Math.cos(((i + 0.5) * Math.PI * 2) / 5) * (size * 0.4), Math.sin(((i + 0.5) * Math.PI * 2) / 5) * (size * 0.4));
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  drawRibbon(ctx, x, y, size, color, opacity, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.fillRect(-size / 2, -size / 4, size, size / 2);
    ctx.restore();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = this.confettiPieces.length - 1; i >= 0; i--) {
      const p = this.confettiPieces[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.98;
      p.rotation += p.rotSpeed;
      p.opacity -= p.decay;

      if (p.type === 'heart') {
        this.drawHeart(this.ctx, p.x, p.y, p.size, p.color, p.opacity, p.rotation);
      } else if (p.type === 'star') {
        this.drawStar(this.ctx, p.x, p.y, p.size, p.color, p.opacity, p.rotation);
      } else {
        this.drawRibbon(this.ctx, p.x, p.y, p.size, p.color, p.opacity, p.rotation);
      }

      if (p.opacity <= 0 || p.y > this.height + 40) {
        this.confettiPieces.splice(i, 1);
      }
    }

    if (this.confettiPieces.length > 0) {
      this.animationFrame = requestAnimationFrame(() => this.animate());
    } else {
      this.animationFrame = null;
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
  }
}

export const confettiEngine = new ConfettiEngine();
