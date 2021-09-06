import Phaser from 'phaser';

export default class Paddle extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y, width, height, color) {
    super(scene, x, y, width, height, color);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body
      .setImmovable(true)
      .setCollideWorldBounds(true);
    this.scene = scene;
  }
}
