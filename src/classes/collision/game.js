import Target from './target.js';
import Collider from './collider.js';
import { detectCollision } from './collisionDetection.js';
import InputHandler from './input.js';

export default class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.mouse = {
      x: undefined,
      y: undefined,
    }
    this.detectCollision = detectCollision;
  }

  bounds(x, y) {
    if ( x > this.x
      && x < this.x + this.width
      && y > this.y
      && y < this.y + this.height
    ) return true;
    return false;
  }

  start() {
    this.target = new Target(
      { width: 100, height: 100 },
      { x: 450, y: 200 },
      this
    );
    this.collider = new Collider(
      { width: 100, height: 100 },
      { x: 50, y: 50 },
      { x: 100, y: 100 },
      this
    );
    this.inputHandler = new InputHandler(this);
    this.inputHandler.initializeInputHandlers();
  }

  update(dt) {

  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.width, this.height);
    this.target.draw(ctx);
    this.collider.draw(ctx);
  }
}
