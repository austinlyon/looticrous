import Particle from './particle.js';
import InputHandler from './input.js';

export default class Demo {
  constructor(canvas) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.canvas = canvas;
    this.mouse = {
      x: undefined,
      y: undefined,
    }
    // TODO need to find a way to initialize these NOT manually...
    this.clearType = 'clearCanvas';
    this.particles = [];
    this.burstRate = 'unlimited';
    this.burstNumber = 4;
    this.particleMinSize = 1;
    this.particleMaxSize = 16;
    this.speed = 150;
    this.shrinkRate = 10;
    this.hue = 240;
    this.lightness = 50;
    this.cycleHue = false;
    this.cycleRate = 1;
  }

  updateOptions(options) {
    // TODO Can I do something like {...this, ...options}?
    this.clearType = options.clear;
    this.burstRate = options.burstRate;
    this.burstNumber = options.number;
    this.particleMinSize = options.sizeMin;
    this.particleMaxSize = options.sizeMax;
    this.speed = options.speed;
    this.shrinkRate = options.shrinkRate;
    this.hue = options.hue;
    this.lightness = options.lightness;
    this.cycleHue = options.cycleHue;
    this.cycleRate = options.cycleRate;
  }

  clearCanvas(ctx, canvas) {
    let alpha = false;
    if (this.clearType === 'leaveTrails') alpha = 0.98;
    else if (this.clearType === 'paint') alpha = 1;

    if (alpha) {
      if (alpha === 1) return;
      ctx.save();
      ctx.globalCompositeOperation = 'copy';
      ctx.globalAlpha = alpha;
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
      if (this.particles[i].shrankToNothing() || this.particles[i].isOutOfBounds()) {
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

  updateCyclingHue(cycleRate) {
    this.hue += cycleRate;
  }

  start() {
    this.inputHandler = new InputHandler(this);
    this.inputHandler.initializeInputHandlers();
  }

  update(dt) {
    if (this.cycleHue) this.updateCyclingHue(this.cycleRate);
    this.updateParticles(dt);
  }

  draw(ctx) {
    this.drawParticles(ctx);
  }
}
