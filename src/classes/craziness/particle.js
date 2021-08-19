export default class Particle {
  constructor(demo) {
    this.x = demo.mouse.x;
    this.y = demo.mouse.y;
    this.size = this.getRandomArbitrary(1, 16);
    this.speed = {
      x: (this.getRandomArbitrary(-150, 150)),
      y: (this.getRandomArbitrary(-150, 150)),
    }
  }

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  update(dt) {
    this.x += this.speed.x * dt;
    this.y += this.speed.y * dt;
    if (this.size > .2) this.size -= 10 * dt;
  }

  draw(ctx) {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}
