import { detectCollisionNew } from './collisionDetection.js';

const PADDLESTATE = {
  READYTOLAUNCH: 0,
  READYTOREFLECT: 1,
};

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

    this.arrowRotateDelay = 0.5;
    this.arrowTime = this.arrowRotateDelay;
    this.arrowRotateDirection = -1;
    this.arrowPosition = 2;
    this.arrowDirection = {};

    this.state = PADDLESTATE.READYTOLAUNCH;
  }

  launch() {
    this.state = PADDLESTATE.READYTOREFLECT;
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

  resolveCollision(collision) {
    const remainingTime = 1 - collision.time;
    const dist = {
      x: collision.dist.x * remainingTime,
      y: collision.dist.y * remainingTime,
    };

    // Reflect based on position on paddle
    // if (false) {}
    if (collision.normal.y === -1) {
      const paddleHalf = this.width/2 + this.game.ball.size;
      const paddleHit = collision.point.x - (this.pos.x + this.width/2);
      const percentageOfPaddle = paddleHit / paddleHalf;
      console.log(percentageOfPaddle * 100);

      const reflectionAngle = Math.PI * 5/12 * percentageOfPaddle;
      const distMag = Math.hypot(dist.x, dist.y);
      this.game.ball.pos = {
        x: collision.point.x + Math.sin(reflectionAngle) * distMag,
        y: collision.point.y - Math.cos(reflectionAngle) * distMag,
      }
      this.game.ball.velocity = {
        x: this.game.ball.speed * Math.sin(reflectionAngle),
        y: this.game.ball.speed * -Math.cos(reflectionAngle),
      }
    }
    // Reflect normally
    else {
      // Update ball position
      if (collision.normal.x) dist.x = Math.abs(dist.x) * collision.normal.x;
      if (collision.normal.y) dist.y = Math.abs(dist.y) * collision.normal.y;
      this.game.ball.pos = {
        x: collision.point.x + dist.x,
        y: collision.point.y + dist.y,
      };
      // Update ball velocity
      if (collision.normal.x)
        this.game.ball.velocity.x = Math.abs(this.game.ball.velocity.x) * collision.normal.x;
      if (collision.normal.y)
        this.game.ball.velocity.y = Math.abs(this.game.ball.velocity.y) * collision.normal.y;
    }
  }

  updateArrow(dt) {
    if (this.arrowTime >= this.arrowRotateDelay) {
      if      (this.arrowPosition === 5) this.arrowRotateDirection = -1;
      else if (this.arrowPosition === 1) this.arrowRotateDirection = 1;
      this.arrowPosition += this.arrowRotateDirection;
      this.arrowTime = 0;

      this.arrowDirection = {
        x: Math.cos( Math.PI * (6-this.arrowPosition)/6 ),
        y: -Math.sin( Math.PI * (6-this.arrowPosition)/6 ),
      };
      this.game.ball.velocity = {
        x: this.game.ball.speed * this.arrowDirection.x,
        y: this.game.ball.speed * this.arrowDirection.y,
      };
    }

    this.arrowTime += dt;
  }

  update(dt) {
    this.pos.x += this.speed * dt;
    if (this.pos.x < 0)
      this.pos.x = 0;
    else if (this.pos.x > this.game.width - this.width)
      this.pos.x = this.game.width - this.width;

    if (this.state === PADDLESTATE.READYTOLAUNCH) this.updateArrow(dt);
    else {
      const collision = detectCollisionNew(this.game.ball, this);
      if (collision) this.resolveCollision(collision);
    }
  }

  drawArrow(ctx) {
    ctx.save();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(
      this.game.ball.pos.x,
      this.game.ball.pos.y
    );
    ctx.lineTo(
      this.game.ball.pos.x + 50*this.arrowDirection.x,
      this.game.ball.pos.y + 50*this.arrowDirection.y,
    );
    ctx.stroke();
    ctx.restore();
  }

  draw(ctx) {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);

    if (this.state === PADDLESTATE.READYTOLAUNCH) this.drawArrow(ctx);
  }
}
