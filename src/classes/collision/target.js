export default class Target {
  constructor(dimensions, position, game) {
    this.game = game;
    this.width = dimensions.width;
    this.height = dimensions.height;
    this.pos = {
      x: position.x,
      y: position.y,
    }
  }

  bounds(x, y) {
    if ( x > this.pos.x
      && x < this.pos.x + this.width
      && y > this.pos.y
      && y < this.pos.y + this.height
    ) return true;
    return false;
  }

  draw(ctx) {
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'gray';
    ctx.font = '20px Arial';

    // x1
    ctx.beginPath();
    ctx.moveTo(this.pos.x - this.game.collider.width/2, 0);
    ctx.lineTo(this.pos.x - this.game.collider.width/2, this.game.height);
    ctx.stroke();

    // x2
    ctx.beginPath();
    ctx.moveTo(this.pos.x + this.width + this.game.collider.width/2, 0);
    ctx.lineTo(this.pos.x + this.width + this.game.collider.width/2, this.game.height);
    ctx.stroke();

    // y1
    ctx.beginPath();
    ctx.moveTo(0, this.pos.y - this.game.collider.height/2);
    ctx.lineTo(this.game.width, this.pos.y - this.game.collider.height/2);
    ctx.stroke();

    // y2
    ctx.beginPath();
    ctx.moveTo(0, this.pos.y + this.height + this.game.collider.height/2);
    ctx.lineTo(this.game.width, this.pos.y + this.height + this.game.collider.height/2);
    ctx.stroke();

    ctx.fillStyle = 'white';
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    ctx.fillStyle = 'black';
    ctx.fillText('Target', this.pos.x + 4, this.pos.y + 23);

    ctx.strokeStyle = 'white';
    ctx.setLineDash([3]);
    ctx.strokeRect(
      this.pos.x - this.game.collider.width / 2,
      this.pos.y - this.game.collider.height / 2,
      this.width + this.game.collider.width,
      this.height + this.game.collider.height,
    );
    ctx.setLineDash([]);
  }
}
