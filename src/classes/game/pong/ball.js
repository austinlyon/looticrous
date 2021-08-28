const BALLSTATE = {
  STICKING: 0,
  BOUNCING: 1,
};

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
    this.velocity = {
      x: 300,
      y: -200,
    };
    this.speed = 360;

    this.state = BALLSTATE.STICKING;
  }

  launch() {
    this.state = BALLSTATE.BOUNCING;
  }

  stickToPaddle(dt) {
    this.pos.x = this.game.paddle.pos.x + this.game.paddle.width/2;
    this.pos.y = this.game.paddle.pos.y - this.size - 1;
  }

  bounceAround(dt) {
    this.prev.x = this.pos.x;
    this.prev.y = this.pos.y;
    this.pos.x += this.velocity.x * dt;
    this.pos.y += this.velocity.y * dt;

    // handle collision with left or right walls
    if (this.pos.x > this.game.width - this.size)
      this.velocity.x = -Math.abs(this.velocity.x);
    else if (this.pos.x < this.size)
      this.velocity.x = Math.abs(this.velocity.x);

    // handle collision with top or bottom walls
    if (this.pos.y > this.game.height - this.size + 200)
      this.velocity.y = -Math.abs(this.velocity.y);
    else if (this.pos.y < this.size) {
      this.velocity.y = Math.abs(this.velocity.y);
    }
  }

  update(dt) {
    if (this.state === BALLSTATE.STICKING) {
      this.stickToPaddle(dt);
    }
    else if (this.state === BALLSTATE.BOUNCING) {
      this.bounceAround(dt);
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
