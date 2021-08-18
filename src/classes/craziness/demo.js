import { Particle, SingleParticle, Trail } from './particle.js';
import InputHandler from './input.js';

export default class Demo {
  constructor(demoWidth, demoHeight, canvasRef) {
    this.width = demoWidth;
    this.height = demoHeight;
    this.canvasRef = canvasRef;
    this.mouse = {
      x: undefined,
      y: undefined,
    }
    this.particles = [];
    this.trails = [];
  }

  init() {
    for (let i = 0; i < 100; i++) {
      this.particles.push(new Particle(this));
    }
  }

  particleBurst() {
    for (let i = 0; i < 4; i++) {
      this.particles.push(new Particle(this));
    }
  }

  trailBurst() {
    for (let i = 0; i < 4; i++) {
      this.trails.push(new Trail(this));
    }
  }

  handleParticles(ctx) {
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
      this.particles[i].draw(ctx);
      if (this.particles[i].size < 0.2) {
        this.particles.splice(i, 1);
        i--;
      }
    }
  }

  handleTrails(ctx) {
    for (let i = 0; i < this.trails.length; i++) {
      this.trails[i].update();
      this.trails[i].draw(ctx);
      if (this.trails[i].particles.length === 0) {
        this.trails.splice(i, 1);
        i--;
      }
    }
  }

  start() {
    this.inputHandler = new InputHandler(this);
    this.inputHandler.initializeInputHandlers();

    // this.init();
  }

  update(dt) {

  }

  draw(ctx) {
    this.handleParticles(ctx);
    this.handleTrails(ctx);
    // ctx.fillStyle = 'white';
    // ctx.fillRect(this.mouse.x, this.mouse.y, 200, 100);
  }
}
