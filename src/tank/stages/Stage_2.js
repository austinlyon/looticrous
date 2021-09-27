export default class Stage_2 {
  constructor(scene) {
    this.scene = scene;
  }

  createBackground() {
    const { scene } = this;
    scene.bg = scene.add.tileSprite(0, 0, 1280, 625, 'tree-background')
      .setOrigin(0, 0);
    scene.floor = scene.add.tileSprite(0, 620, 1280, 100, 'shitty-ground')
      .setOrigin(0, 0);
  }

  updateBackground() {
    const { scene } = this;
    scene.bg.tilePositionX += 1;
    scene.floor.tilePositionX += 2.6;
  }
}
