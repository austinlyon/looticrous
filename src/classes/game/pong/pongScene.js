import Paddle from './paddle.js';
import Ball from './ball.js';
import { buildStage, stage1 } from './stages.js';

const RUNSTATE = {
  PAUSED: 0,
  RUNNING: 1,
}
const GAMESTATE = {
  LAUNCH: 0,
  BOUNCE: 1,
}

export default class Pong {
  constructor(game) {
    this.game = game;
    this.width = this.game.width;
    this.height = this.game.height;
    this.runState = RUNSTATE.RUNNING;
    this.gameState = GAMESTATE.LAUNCH;

    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleKeyup = this.handleKeyup.bind(this);
    this.togglePause = this.togglePause.bind(this);
    this.unregisterHandlers = this.unregisterHandlers.bind(this);
  }

  // Input Handlers
  handleKeydown(e) {
    switch (e.keyCode) {
      case 32:
        e.preventDefault();
        this.togglePause();
        break;
      case 65:
        this.paddle.moveLeft();
        break;
      case 68:
        this.paddle.moveRight();
        break;
      case 75:
        this.paddle.launch();
        this.ball.launch();
        break;
      default:
        break;
    }
  }

  handleKeyup(e) {
    switch (e.keyCode) {
      default:
        break;
      case 65:
        if (this.paddle.speed < 0) this.paddle.stop();
        break;
      case 68:
        if (this.paddle.speed > 0) this.paddle.stop();
        break;
    }
  }

  registerHandlers() {
    const handlers = {
      pongKeydown: {
        input: 'keydown',
        func: this.handleKeydown,
      },
      pongKeyup: {
        input: 'keyup',
        func: this.handleKeyup,
      },
    };
    this.game.inputHandler.registerInputHandlers(handlers);
  }

  unregisterHandlers() {
    const handlers = ['pongKeydown, pongKeyup'];
    this.game.inputHandler.unregisterHandlers(handlers);
  }

  togglePause() {
    if (this.runState === RUNSTATE.RUNNING) {
      this.runState = RUNSTATE.PAUSED;
    } else {
      this.runState = RUNSTATE.RUNNING;
    }
  }

  start() {
    this.ball = new Ball(this);
    this.paddle = new Paddle(this);
    this.bricks = buildStage(this, stage1);
    this.gameObjects = [this.ball, this.paddle, ...this.bricks];

    this.registerHandlers();
  }

  update(dt) {
    if (this.runState === RUNSTATE.PAUSED) return;

    this.gameObjects.forEach(object => object.update(dt));
    this.gameObjects = this.gameObjects.filter(object => !object.destroyed);
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.width, this.height);

    this.gameObjects.forEach(object => object.draw(ctx));

    if (this.runState === RUNSTATE.PAUSED) {
      ctx.rect(0, 0, this.width, this.height);
      ctx.fillStyle = 'rgba(0, 0, 0, .5)';
      ctx.fill();

      ctx.font = '60px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText("Paused", this.width/2, this.height/2);
    }
  }
}
