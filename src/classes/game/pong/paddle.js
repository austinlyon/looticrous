export default class Paddle {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 20;
    this.pos = {
      x: game.width/2 - this.width/2,
      y: game.height - 40,
    };
    this.maxSpeed = 500;
    this.speed = 0;
  }

  moveLeft() {
    this.speed = -this.maxSpeed;
  }

  moveRight() {
    this.speed = this.maxSpeed;
  }

  stop() {
    this.speed = 0;
  }

  update(dt) {
    this.pos.x += this.speed * dt;
    if (this.pos.x < 0)
      this.pos.x = 0;
    else if (this.pos.x > this.game.width - this.width)
      this.pos.x = this.game.width - this.width;
  }

  draw(ctx) {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }
}
