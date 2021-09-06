import Phaser from 'phaser';

export default class Ball extends Phaser.GameObjects.Arc {
  constructor(scene, x, y, radius, color) {
    super(scene, x, y, radius, 0, 360, false, color);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body
      .setCollideWorldBounds(true)
      .setBounce(1);
    this.scene = scene;
  }
}
