// imports

export default class TitleBall {
  constructor(game) {
    this.game = game;
    this.size = 15;
    this.prev = {
      x: -60,
      y: -60,
    }
    this.pos = { ...this.prev };
    this.speed = {
      x: 300,
      y: 400,
    };
    this.radius = 50;
  }

  update(dt) {
    this.prev.x = this.pos.x;
    this.prev.y = this.pos.y;
    this.pos.x += this.speed.x * dt;
    this.pos.y += this.speed.y * dt;

    // handle collisions with walls
    if (this.pos.x < this.size && this.speed.x < 0)
      this.speed.x = -this.speed.x;
    else if (this.pos.x > this.game.width - this.size && this.speed.x > 0)
      this.speed.x = -this.speed.x;
    else if (this.pos.y < this.size && this.speed.y < 0)
      this.speed.y = -this.speed.y;
    else if (this.pos.y > this.game.height - this.size && this.speed.y > 0)
      this.speed.y = -this.speed.y;
  }

  draw(ctx) {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}
