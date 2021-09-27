export default class Stage_1 {
  constructor(scene) {
    this.scene = scene;
  }

  createBackground() {
    const { scene } = this;
    scene.bg1 = scene.add.tileSprite(0, 0, 1280, 720, 'desert_1').setOrigin(0, 0);
    scene.bg2 = scene.add.tileSprite(0, 0, 1280, 720, 'desert_2').setOrigin(0, 0);
    scene.bg3 = scene.add.tileSprite(0, 0, 1280, 720, 'desert_3').setOrigin(0, 0);
    scene.bg4 = scene.add.tileSprite(0, 0, 1280, 720, 'desert_4').setOrigin(0, 0);
    scene.bg5 = scene.add.tileSprite(0, 0, 1280, 720, 'desert_5').setOrigin(0, 0);
    scene.floor = scene.add.tileSprite(0, 620, 1280, 100, 'shitty-ground').setOrigin(0, 0);
  }

  updateBackground() {
    const { scene } = this;
    scene.bg1.tilePositionX += 0.1;
    scene.bg2.tilePositionX += 0.4;
    scene.bg3.tilePositionX += 0.9;
    scene.bg4.tilePositionX += 1.3;
    scene.floor.tilePositionX += 2.6;
  }
}
