import { detectCollision, resolveCollision } from './collisionDetection.js';

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
      const direction = resolveCollision(this.game.ball, this);
      if (direction === 'reflect x') {
        this.game.ball.speed.x = -this.game.ball.speed.x;
      }
      else if (direction === 'reflect y') {
        this.game.ball.speed.y = -this.game.ball.speed.y;
      }
      else {
        console.log('something impossible happened!');
      }

      // this.game.ball.speed.y = -this.game.ball.speed.y;
      this.destroyed = true;
    }
  }

  draw(ctx) {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
