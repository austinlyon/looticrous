import Phaser from 'phaser';

export default class Menu extends Phaser.Scene {
  constructor() {
    super('menu');
  }

  preload() {
    // const flameImg = this.load.image('flame', 'images/flame.png');
    this.createMenuItemTexture();
    const flameImg = this.load.image('flame', 'images/flame.png');
    console.dir(flameImg);
  }

  create() {
    const { width, height } = this.scale;
    const modal = this.add.graphics();
    modal.fillStyle(0x000000, .4);
    modal.fillRect(0, 0, width, height);

    // Menu window
    this.container = this.add.container(200, 100);
    const g = this.add.graphics();
    g.fillStyle(0x444444, .5);
    g.lineStyle(4, 0xdddddd);
    g.fillRoundedRect(0, 0, width-400, height-200, 20);
    g.strokeRoundedRect(0, 0, width-400, height-200, 20);
    g.lineStyle(4, 0x333333);
    g.strokeRoundedRect(2, 2, width-400-4, height-200-4, 20);
    this.container.add(g);

    // Menu Item
    const flameMenuItem = this.add.image(0, 0, 'menuItem');
    this.container.add(flameMenuItem);
    flameMenuItem.x = 80;
    flameMenuItem.y = 80;

    // Fireball
    const flame = this.add.image(0, 0, 'flame');
    this.container.add(flame);
    flame.setScale(3);
    flame.x = 80;
    flame.y = 80;
    // const debugFlame = this.add.graphics()
    // const bounds = flame.getBounds();
    // debugFlame.lineStyle(1, 0xffff37);
    // debugFlame.strokeRectShape(bounds);

    this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.space)) {
      this.scene.resume('play');
      this.scene.stop();
    }
  }

  createMenuItemTexture() {
    const g = this.add.graphics();
    g.fillStyle(0x222222);
    g.lineStyle(2, 0xdddddd)
    g.fillRoundedRect(0, 0, 64, 64);
    g.strokeRoundedRect(0, 0, 64, 64)
    g.generateTexture('menuItem', 64, 64);
    g.destroy();
  }
}
