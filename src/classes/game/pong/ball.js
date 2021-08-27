import { detectCollision } from './collisionDetection.js';

export default class Ball {
  constructor(game) {
    this.game = game;
    this.size = 15;
    this.prev = {
      x: 250,
      y: 400,
    }
    this.pos = {
      x: 250,
      y: 400,
    };
    this.speed = {
      x: 300,
      y: 200,
    };
  }

  update(dt) {
    this.prev.x = this.pos.x;
    this.prev.y = this.pos.y;
    this.pos.x += this.speed.x * dt;
    this.pos.y += this.speed.y * dt;

    // handle collision with left or right walls
    if (this.pos.x > this.game.width - this.size || this.pos.x < this.size) {
      this.speed.x = -this.speed.x;
    }

    // handle collision with top or bottom walls
    if (this.pos.y > this.game.height - this.size || this.pos.y < this.size) {
      this.speed.y = -this.speed.y;
    }

    // handle collision with paddle
    if (detectCollision(this, this.game.paddle)) {
      this.speed.y = -this.speed.y;
      this.pos.y = this.game.paddle.pos.y - this.size;
    }
  }

  draw(ctx) {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    // ctx.drawImage(
    //   this.image,
    //   this.pos.x-this.size,
    //   this.pos.y-this.size,
    //   this.size*2,
    //   this.size*2);

    // projection line
    // ctx.strokeStyle = 'cyan';
    // ctx.beginPath();
    // ctx.moveTo(this.pos.x, this.pos.y);
    // ctx.lineTo(
    //   this.pos.x + (this.pos.x - this.prev.x) * 30,
    //   this.pos.y + (this.pos.y - this.prev.y) * 30
    // );
    // ctx.stroke();
  }
}
