import Particle from './particle.js';
import InputHandler from './input.js';

export default class Demo {
  constructor(demoWidth, demoHeight, canvasRef, options) {
    this.width = demoWidth;
    this.height = demoHeight;
    this.canvasRef = canvasRef;
    this.mouse = {
      x: undefined,
      y: undefined,
    }
    this.particles = [];
    this.burstNumber = options.number;
    this.particleMinSize = options.sizeMin;
    this.particleMaxSize = options.sizeMax;
  }

  clearCanvas(ctx, canvas, clearStyle) {
    const alpha = (function() {
      if (clearStyle === 'clearCanvas') return false;
      else if (clearStyle === 'leaveTrails') return 0.98;
      else if (clearStyle === 'paint') return 1;
      return false;
    })();
    // console.log(clearStyle, alpha);

    if (alpha) {
      if (alpha === 1) return;
      ctx.save();
      ctx.globalCompositeOperation = 'copy';
      ctx.globalAlpha = alpha;
      // ctx.drawImage(canvas, 0, 0, this.width, this.height, 0, 0, this.width, this.height);
      ctx.drawImage(canvas, 0, 0);
      ctx.restore();
    }

    else {
      ctx.clearRect(0, 0, this.width, this.height);
    }
  }

  particleBurst() {
    for (let i = 0; i < this.burstNumber; i++) {
      this.particles.push(new Particle(this));
    }
  }

  updateParticles(dt) {
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update(dt);
      if (this.particles[i].size < 0.2) {
        this.particles.splice(i, 1);
        i--;
      }
    }
  }

  drawParticles(ctx) {
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].draw(ctx);
    }
  }

  start() {
    this.inputHandler = new InputHandler(this);
    this.inputHandler.initializeInputHandlers();
  }

  update(dt) {
    this.updateParticles(dt)
  }

  draw(ctx) {
    this.drawParticles(ctx);
  }
}
