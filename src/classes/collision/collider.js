export default class Collider {
  constructor(dimensions, previous, position, game) {
    this.game = game;
    this.width = dimensions.width;
    this.height = dimensions.height;
    this.pos = {
      x: position.x,
      y: position.y,
    };
    this.prev = {
      x: previous.x,
      y: previous.y,
    }
    this.pro = false;  // Projected position after collision resolution
    this.contactPoint = false;
    this.normal = false;
  }

  getCenter(pos) {
    return {
      x: pos.x + this.width / 2,
      y: pos.y + this.height / 2,
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

  prevBounds(x, y) {
    if ( x > this.prev.x
      && x < this.prev.x + this.width
      && y > this.prev.y
      && y < this.prev.y + this.height
    ) return true;
    return false;
  }

  draw(ctx) {
    const posCenter = this.getCenter(this.pos);
    const prevCenter = this.getCenter(this.prev);
    ctx.lineWidth = 3;
    ctx.font = '20px Arial';

    // Draw previous rect
    ctx.fillStyle = 'red';
    ctx.fillRect(this.prev.x, this.prev.y, this.width, this.height);
    ctx.fillStyle = 'orange';
    ctx.fillText('Pos 0', this.prev.x + 4, this.prev.y + 23);
    ctx.beginPath();
    ctx.arc(prevCenter.x, prevCenter.y, 8, 0, Math.PI * 2);
    ctx.fill();

    // Draw vector connecting two rects
    ctx.strokeStyle = 'orange';
    ctx.beginPath();
    ctx.moveTo(prevCenter.x, prevCenter.y);
    ctx.lineTo(posCenter.x, posCenter.y);
    ctx.stroke();

    // Draw pos rect
    ctx.strokeStyle = 'yellow';
    ctx.strokeRect(this.pos.x, this.pos.y, this.width, this.height);
    ctx.fillStyle = 'yellow';
    ctx.fillText('Pos 1', this.pos.x + 4, this.pos.y + 23);
    if (this.contactPoint)
      ctx.strokeStyle = 'limegreen';
      ctx.strokeRect(
        this.contactPoint.x - this.width / 2,
        this.contactPoint.y - this.height / 2,
        this.width,
        this.height);
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(posCenter.x, posCenter.y, 8, 0, Math.PI * 2);
    ctx.fill();

    // Draw projected position (stopped at contact point)
    // if (this.contactPoint) {
    //   ctx.fillStyle = 'orange';
    //   ctx.fillRect(
    //     this.contactPoint.x - this.width / 2,
    //     this.contactPoint.y - this.height / 2,
    //     this.width,
    //     this.height,
    //   );
    // }

    // Draw contact point, if applicable
    if (this.contactPoint) {
      ctx.fillStyle = 'lawngreen';
      ctx.beginPath();
      ctx.arc(this.contactPoint.x, this.contactPoint.y, 8, 0, Math.PI * 2);
      ctx.fill();

      // draw normal
      ctx.strokeStyle = 'lawngreen';
      ctx.beginPath();
      ctx.moveTo(this.contactPoint.x, this.contactPoint.y);
      ctx.lineTo(
        this.contactPoint.x + this.normal.x * this.width * 3/8,
        this.contactPoint.y + this.normal.y * this.height * 3/8,
      );
      ctx.stroke();
    }

    // Draw projected position, if applicable
    if (this.pro) {
      ctx.strokeStyle = 'cyan';
      ctx.beginPath();
      ctx.moveTo(this.contactPoint.x, this.contactPoint.y);
      ctx.lineTo(this.pro.x, this.pro.y);
      ctx.stroke();

      ctx.strokeStyle = 'darkviolet';
      ctx.strokeRect(
        this.pro.x - this.width / 2,
        this.pro.y - this.height / 2,
        this.width,
        this.height);

      ctx.fillStyle = 'cyan';
      ctx.beginPath();
      ctx.arc(
        this.pro.x,
        this.pro.y,
        8, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
