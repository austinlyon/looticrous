import Phaser from 'phaser';

const HUES = {
  red:       0 / 360,
  orange:   30 / 360,
  yellow:   60 / 360,
  lime:     90 / 360,
  green:   120 / 360,
  seafoam: 150 / 360,
  cyan:    180 / 360,
  azure:   210 / 360,
  blue:    240 / 360,
  purple:  270 / 360,
  pink:    300 / 360,
};

export default class GraphicsTest extends Phaser.Scene {
  constructor() {
    super('GraphicsTest')
  }

  preload() {
    this.createBlockGraphic('purple');
  }

  create() {
    console.log('GraphicsTest create called');

    this.physics.add.image(100, 100, 'purpleBrick');
  }

  update() {

  }

  createBlockGraphic(color) {
    // Shape Dimensions
    const w = 80;    // Width
    const h = 40;    // Height
    const off = 10;  // Offset

    // Greate Graphics
    const Color = Phaser.Display.Color;
    const g = this.add.graphics();
    console.log(Color.HSLToColor(HUES[color], 1, .5).color);
    // Rect middle (fill)
    g.fillStyle(Color.HSLToColor(HUES[color], 1, .5).color);
    g.fillRect(0, 0, w, h);
    // Rect top
    g.fillStyle(Color.HSLToColor(HUES[color], 1, .65).color);
    g.moveTo(0, 0);
    g.beginPath();
    g.lineTo(off, off);
    g.lineTo(w-off, off);
    g.lineTo(w, 0);
    g.lineTo(0, 0);
    g.closePath();
    g.fillPath();
    // Rect left
    g.fillStyle(Color.HSLToColor(HUES[color], 1, .4).color);
    g.moveTo(0, 0);
    g.beginPath();
    g.lineTo(0, h);
    g.lineTo(off, h-off);
    g.lineTo(off, off);
    g.lineTo(0, 0);
    g.closePath();
    g.fillPath();
    // Rect right
    g.fillStyle(Color.HSLToColor(HUES[color], 1, .4).color);
    g.moveTo(w, 0);
    g.beginPath();
    g.lineTo(w-off, off);
    g.lineTo(w-off, h-off);
    g.lineTo(w, h);
    g.lineTo(w, 0);
    g.closePath();
    g.fillPath();
    // Rect bottom
    g.fillStyle(Color.HSLToColor(HUES[color], 1, .3).color);
    g.moveTo(0, h);
    g.beginPath();
    g.lineTo(off, h-off);
    g.lineTo(w-off, h-off);
    g.lineTo(w, h);
    g.lineTo(0, h);
    g.closePath();
    g.fillPath();
    // Rect Border
    const lineWidth = 2;
    g.lineStyle(lineWidth, Color.HSLToColor(HUES[color], 1, .2).color);
    g.strokeRoundedRect(0+lineWidth/2, 0+lineWidth/2, w-lineWidth, h-lineWidth, 2);
    // Generate Texture
    g.generateTexture(color+'Brick', w, h);
    g.destroy();
    console.dir(g);

    // function fillQuad(g, tl, tr, br, bl) {
    //   g.fillStyle(Color.HSLToColor(HUES[color], 1, .65).color);
    //   g.moveTo(tl.x, tl.y);
    //   g.beginPath();
    //   g.lineTo(tr.x, tr.y);
    //   g.lineTo(br.x, br.y);
    //   g.lineTo(bl.x, bl.y);
    //   g.lineTo(tl.x, tl.y);
    //   g.closePath();
    //   g.fillPath();
    // }
  }
}
