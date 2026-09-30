/**
 * ✨ Ambient Background Particle System
 * Gently floating pastel hearts, stars, and micro-sparkles.
 */

export class AmbientParticles {
  constructor(canvasId = 'particle-canvas') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.maxParticles = window.innerWidth < 768 ? 26 : 46;
    this.animationFrame = null;

    this.colors = ['#C9908F', '#E8C4C4', '#C9A86C', '#B8956A', '#B5C5A3', '#C4B7D4', '#EDE4D8', '#EAD4D4', '#D4AF37'];

    this.resize();
    this.init();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  init() {
    this.particles = [];
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push(this.createParticle(Math.random() * this.height));
    }
    this.animate();
  }

  createParticle(y = this.height + 20) {
    const rand = Math.random();
    let type = 'heart';
    if (rand < 0.4) type = 'heart';
    else if (rand < 0.75) type = 'star';
    else type = 'sparkle';

    return {
      x: Math.random() * this.width,
      y: y,
      size: type === 'heart' ? Math.random() * 8 + 8 : (type === 'star' ? Math.random() * 7 + 4 : Math.random() * 4 + 2),
      speedY: Math.random() * 0.35 + 0.2,
      speedX: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.65 + 0.25,
      pulse: Math.random() * Math.PI,
      pulseSpeed: Math.random() * 0.04 + 0.02,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02,
      color: this.colors[Math.floor(Math.random() * this.colors.length)],
      type: type
    };
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
    for (let i = 0; i < 4; i++) {
      ctx.lineTo(Math.cos((i * Math.PI) / 2) * size, Math.sin((i * Math.PI) / 2) * size);
      ctx.lineTo(Math.cos((i * Math.PI) / 2 + Math.PI / 4) * (size * 0.35), Math.sin((i * Math.PI) / 2 + Math.PI / 4) * (size * 0.35));
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  drawSparkle(ctx, x, y, size, color, opacity, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = opacity;
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    // Diamond sparkle cross
    ctx.moveTo(0, -size * 1.5);
    ctx.lineTo(0, size * 1.5);
    ctx.moveTo(-size * 1.5, 0);
    ctx.lineTo(size * 1.5, 0);
    ctx.stroke();
    // Tiny center dot
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.y -= p.speedY;
      p.x += p.speedX;
      p.rotation += p.rotSpeed;
      p.pulse += p.pulseSpeed;
      const currentOpacity = Math.max(0.1, p.opacity + Math.sin(p.pulse) * 0.2);

      if (p.type === 'heart') {
        this.drawHeart(this.ctx, p.x, p.y, p.size, p.color, currentOpacity, p.rotation);
      } else if (p.type === 'star') {
        this.drawStar(this.ctx, p.x, p.y, p.size, p.color, currentOpacity, p.rotation);
      } else {
        this.drawSparkle(this.ctx, p.x, p.y, p.size, p.color, currentOpacity, p.rotation);
      }

      // Reset particle if it drifts above screen
      if (p.y < -30 || p.x < -30 || p.x > this.width + 30) {
        this.particles[i] = this.createParticle();
      }
    }

    this.animationFrame = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }
}
