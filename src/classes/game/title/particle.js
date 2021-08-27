export default class Particle {
  constructor(scene, x, y, color='white') {
    this.scene = scene;
    this.color = color;
    this.pos = {
      x: x,
      y: y,
    };
    this.base = { ...this.pos };
    this.size = 10;
    this.density = 20 * Math.random() + 1;
  }

  update(dt) {
    const dx = this.scene.ball.pos.x - this.pos.x;
    const dy = this.scene.ball.pos.y - this.pos.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    const maxDist = this.scene.ball.radius;
    const force = (maxDist - dist) / maxDist;
    const forceDirection = {
      x: dx / dist,
      y: dy / dist,
    };
    const direction = {
      x: forceDirection.x * force * this.density,
      y: forceDirection.y * force * this.density,
    };


    if (dist < maxDist) {
      this.pos.x -= direction.x;
      this.pos.y -= direction.y;
    }
    else {
      if (this.pos.x !== this.base.x) {
        const dx = this.pos.x - this.base.x;
        this.pos.x -= dx/10;
      }
      if (this.pos.y !== this.base.y) {
        const dy = this.pos.y - this.base.y;
        this.pos.y -= dy/10;
      }
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos.x-this.size/2, this.pos.y-this.size/2, this.size, this.size)

    // ctx.beginPath();
    // ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
    // ctx.closePath();
    // ctx.fill();
  }
}
