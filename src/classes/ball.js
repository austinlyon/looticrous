import { detectCollision } from './collisionDetection.js';

export default class Ball {
  constructor(game) {
    this.game = game;
    this.gameWidth = game.width;
    this.gameHeight = game.height;
    this.image = game.images.ball;
    this.size = 30;
    this.previousPosition ={
      x: 250,
      y: 400,
    }
    this.position = {
      x: 250,
      y: 400,
    };
    this.speed = {
      x: 60,
      y: 40,
    };
  }

  update(dt) {
    this.previousPosition.x = this.position.x;
    this.previousPosition.y = this.position.y;
    this.position.x += this.speed.x/dt;
    this.position.y += this.speed.y/dt;

    // handle collision with left or right walls
    if (this.position.x > this.gameWidth - this.size || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }

    // handle collision with top or bottom walls
    if (this.position.y > this.gameHeight - this.size || this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }

    // handle collision with paddle
    if (detectCollision(this, this.game.paddle)) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size;
    }
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
  }
}
