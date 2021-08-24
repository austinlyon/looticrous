export default class InputHandler {
  constructor(game) {
    this.game = game;
    this.target = null;
    this.component = null;
    this.offset = null;

    this.handleMousedown = e => {
      const rect = e.target.getBoundingClientRect();
      const x = e.x - rect.left;
      const y = e.y - rect.top;

      if (game.collider.bounds(x, y)) {
        this.target = game.collider;
        this.component = 'pos';
      }
      else if  (game.collider.prevBounds(x, y)) {
        this.target = game.collider;
        this.component = 'prev';
      }
      else if (game.target.bounds(x, y)) {
        this.target = game.target;
        this.component = 'pos';
      }
      else {
        this.target = false;
        this.component = false;
      }

      if (this.target) {
        this.target.dragging = true;
        this.offset = {
          x: x - this.target[this.component].x,
          y: y - this.target[this.component].y,
        }
      }
    };

    this.handleMouseup = e => {
      if (this.target) {
        this.target = false;
      }
    };

    this.handleMousemove = e => {
      const rect = e.target.getBoundingClientRect();
      const x = e.x - rect.left;
      const y = e.y - rect.top;
      if (this.target) {
        this.target[this.component] = {
          x: x - this.offset.x,
          y: y - this.offset.y,
        };
        const collision = game.detectCollision(game.collider, game.target);
        game.collider.contactPoint = collision?.point || false;
        if (collision) {
          game.collider.normal = collision.normal;
          const reflectedTime = (1 - collision.time);
          const reflectedDistance = {
            x: collision.dist.x * reflectedTime,
            y: collision.dist.y * reflectedTime,
          };
          if (collision.normal.x)
            reflectedDistance.x = Math.abs(reflectedDistance.x) * collision.normal.x;
          else if (collision.normal.y)
            reflectedDistance.y = Math.abs(reflectedDistance.y) * collision.normal.y;
          game.collider.pro = {
            x: collision.point.x + reflectedDistance.x,
            y: collision.point.y + reflectedDistance.y,
          };
        }
        else {
          game.collider.pro = false;
          game.collider.normal = false;
        }
      }
    };
  }

  initializeInputHandlers() {
    this.game.canvas.addEventListener('mousedown', this.handleMousedown);
    this.game.canvas.addEventListener('mouseup', this.handleMouseup);
    this.game.canvas.addEventListener('mousemove', this.handleMousemove);
  }

  unsubscribeToInputHandlers() {
    this.game.canvas.removeEventListener('mousedown', this.handleMousedown);
    this.game.canvas.removeEventListener('mouseup', this.handleMouseup);
    this.game.canvas.removeEventListener('mousemove', this.handleMousemove);
  }
}
