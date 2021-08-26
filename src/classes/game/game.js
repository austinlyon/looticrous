import Paddle from './paddle.js';
import Ball from './ball.js';
import { buildStage, stage1 } from './stages.js';
import InputHandler from './input.js';

const GAMESTATE = {
  TITLE: 0,
  CHARACTER_SELECT: 1,
  STAGE_SELECT: 2,
  PLAYING_STAGE: 3,
  PAUSED: 7,
  RUNNING: 8,
  PAUSE_MENU: 4,
  GAMEOVER: 5,
  BEAT_STAGE: 6,
};

export default class Game {
  constructor(width, height, images, getNextFrame) {
    this.width = width;
    this.height = height;
    this.images = images;
    this.getNextFrame = getNextFrame;
    this.frameByFrameMode = false;
  }

  togglePause() {
    if (this.gamestate === GAMESTATE.RUNNING) {
      this.gamestate = GAMESTATE.PAUSED;
    } else {
      this.gamestate = GAMESTATE.RUNNING;
    }
  }

  start() {
    this.gamestate = GAMESTATE.RUNNING;
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.bricks = buildStage(this, stage1);

    this.gameObjects = [this.paddle, this.ball, ...this.bricks];
    this.inputHandler = new InputHandler(this, this.paddle);
    this.inputHandler.initializeInputHandlers();
  }

  update(dt) {
    if (this.gamestate === GAMESTATE.PAUSED) return;

    this.gameObjects.forEach(object => object.update(dt));
    this.gameObjects = this.gameObjects.filter(object => !object.destroyed);
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.width, this.height);

    this.gameObjects.forEach(object => object.draw(ctx));

    if (this.gamestate === GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.width, this.height);
      ctx.fillStyle = 'rgba(0, 0, 0, .5)';
      ctx.fill();

      ctx.font = '60px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText("Paused", this.width/2, this.height/2);
    }

    if (this.frameByFrameMode) this.getNextFrame(false);
  }
}
