export default class Paddle {
  constructor(game) {
    this.game = game;
    this.gameWidth = game.width;
    this.gameHeight = game.height;
    this.width = 100;
    this.height = 20;
    this.position = {
      x: this.gameWidth/2 - this.width/2,
      y: this.gameHeight - 40,
    };
    this.maxSpeed = 100;
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
    this.position.x += this.speed / dt;
    if (this.position.x < 0)
      this.position.x = 0;
    else if (this.position.x > this.gameWidth - this.width)
      this.position.x = this.gameWidth - this.width;
  }

  draw(ctx) {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
