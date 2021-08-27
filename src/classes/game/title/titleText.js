import Particle from './particle.js';

export default class TitleText {
  constructor(scene) {
    this.scene = scene;

    // Set some variables to help shape our text
    this.font = 'Impact';
    this.fontSize = 37;
    this.color = 'white';
    this.yOffset = 30;
    this.textWidthEstimate = 123;
    this.fHeightX = 1.3; // font height estimate multiplier
    this.alphaThreshold = 180; // 128 is about halfway

    const ctx = scene.game.canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.font = `${this.fontSize}px ${this.font}`;
    ctx.fillText('RPongG', 0, this.fontSize + this.yOffset);
    const textPixels = ctx.getImageData(0, this.yOffset, 118, this.fontSize*this.fHeightX);

    this.particleArray = [];
    for (let y = 0, yMax = textPixels.height; y < yMax; y++) {
      for (let x = 0, xMax = textPixels.width; x < xMax; x++) {
        if (textPixels.data[y*4*xMax + x*4 + 3] > this.alphaThreshold) {
          this.particleArray.push(new Particle(scene, x*11, y*11+100, this.color));
        }
        else {
          // this.particleArray.push(new Particle(scene, x*11, y*11, 'blue'));
        }
      }
    }
  }

  update(dt) {
    this.particleArray.forEach((p) => { p.update(dt) });
  }

  draw(ctx) {
    // Test box for text
    // ctx.fillStyle = this.color;
    // ctx.font = `${this.fontSize}px ${this.font}`;
    // ctx.fillText('RPongG', 0, this.fontSize + this.yOffset);
    // ctx.strokeStyle = 'cyan';
    // ctx.strokeRect(0, this.yOffset, this.textWidthEstimate, this.fontSize*this.fHeightX);

    this.particleArray.forEach((p) => { p.draw(ctx) });
  }
}
