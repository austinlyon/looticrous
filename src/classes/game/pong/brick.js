import { detectCollisionNew } from './collisionDetection.js';

export default class Brick {
  constructor(game, position) {
    this.game = game;
    this.pos = position;
    this.width =96;
    this.height = 20;
    this.destroyed = false;
  }

  resolveCollision(collision) {
    const remainingTime = 1 - collision.time;
    const dist = {
      x: collision.dist.x * remainingTime,
      y: collision.dist.y * remainingTime,
    };

    // Update new position
    if (collision.normal.x) dist.x = Math.abs(dist.x) * collision.normal.x;
    if (collision.normal.y) dist.y = Math.abs(dist.y) * collision.normal.y;
    this.game.ball.pos = {
      x: collision.point.x + dist.x,
      y: collision.point.y + dist.y,
    };

    // Update velocity
    if (collision.normal.x)
      this.game.ball.velocity.x = Math.abs(this.game.ball.velocity.x) * collision.normal.x;
    if (collision.normal.y)
      this.game.ball.velocity.y = Math.abs(this.game.ball.velocity.y) * collision.normal.y;
  }

  update(dt) {
    const collision = detectCollisionNew(this.game.ball, this);
    if (collision) {
      this.resolveCollision(collision);
      this.destroyed = true;
    }
  }

  draw(ctx) {
    ctx.fillStyle = 'blue';
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);

    // draw extended collision rect
    // ctx.lineWidth = 1;
    // ctx.strokeStyle = 'gray';
    // // x1
    // ctx.beginPath();
    // ctx.moveTo(this.pos.x - this.game.ball.size, 0);
    // ctx.lineTo(this.pos.x - this.game.ball.size, this.game.height);
    // ctx.stroke();
    // // x2
    // ctx.beginPath();
    // ctx.moveTo(this.pos.x + this.width + this.game.ball.size, 0);
    // ctx.lineTo(this.pos.x + this.width + this.game.ball.size, this.game.height);
    // ctx.stroke();
    // // y1
    // ctx.beginPath();
    // ctx.moveTo(0, this.pos.y - this.game.ball.size);
    // ctx.lineTo(this.game.width, this.pos.y - this.game.ball.size);
    // ctx.stroke();
    // // y2
    // ctx.beginPath();
    // ctx.moveTo(0, this.pos.y + this.height + this.game.ball.size);
    // ctx.lineTo(this.game.width, this.pos.y + this.height + this.game.ball.size);
    // ctx.stroke();

    // draw
  }
}
