import { detectCollision } from './collisionDetection.js';

export default class Brick {
  constructor(game, position) {
    this.game = game;
    this.position = position;
    this.width =96;
    this.height = 20;
    this.destroyed = false;
  }

  update(dt) {
    if (detectCollision(this.game.ball, this)) {
      this.game.ball.speed.y = -this.game.ball.speed.y;
      this.destroyed = true;
    }
  }

  draw(ctx) {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
