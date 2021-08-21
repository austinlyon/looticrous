export default class Particle {
  constructor(demo) {
    this.demo = demo;
    this.x = demo.mouse.x;
    this.y = demo.mouse.y;
    this.size = this.getRandomArbitrary(demo.particleMinSize, demo.particleMaxSize);
    this.speed = {
      x: (this.getRandomArbitrary(demo.speed*(-1), demo.speed)),
      y: (this.getRandomArbitrary(demo.speed*(-1), demo.speed)),
    }
    this.hue = demo.hue;
    this.lightness = demo.lightness;
  }

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  shrankToNothing() {
    if (this.size < 0.2) return true;
    return false;
  }

  isOutOfBounds() {
    if (this.x < -this.size || this.x > this.demo.width  + this.size
     || this.y < -this.size || this.y > this.demo.height + this.size) return true;
    return false;
  }

  update(dt) {
    this.x += this.speed.x * dt;
    this.y += this.speed.y * dt;
    if (this.size > .2) this.size -= this.demo.shrinkRate * dt;
  }

  draw(ctx) {
    ctx.fillStyle = `hsl(${this.hue}, 100%, ${this.lightness}%)`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}
