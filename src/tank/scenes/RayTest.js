import Phaser from 'phaser';


export default class RayTest extends Phaser.Scene {
  constructor() {
    super('rayTest');
  }

  preload() {
    this.load.image('blue_bomber', 'tank/images/blue_bomber.png');
  }

  create() {
    window.scene = this;
    // Create "bomber"
    const { width, height } = this.sys.scale;
    this.bomber = this.physics.add.image(200, height/2, 'blue_bomber')
    this.bomber.body.setAllowGravity(false).setImmovable(true);

    // Create ray
    this.raycaster = this.raycasterPlugin.createRaycaster();
    this.raycaster.mapGameObjects(this.bomber, true);
    this.ray = this.raycaster.createRay();
    this.rayGraphic = this.add.graphics();
    this.rayGraphic.lineStyle(2, 0x00ffff, 1);

    this.ray.setOrigin(width - 200, height/2);
    this.pVector = new Phaser.Math.Vector2();
    this.ray.setAngle(Math.PI);
    this.intersection = this.ray.cast();
    console.log(this.intersection);

    // Create tween
    this.tweens.add({
      targets: this.bomber,
      y: { start: height/2, from: 600, to: 100 },
      ease: 'Sine.easeInOut',
      duration: 5000,
      repeat: -1,
      yoyo: true
    });
  }

  update() {
    this.rayGraphic.clear();
    this.rayGraphic.lineStyle(2, 0x00ffff, 1);
    const { x: px, y: py } = this.input.activePointer;
    const { x: ox, y: oy } = this.ray.origin;
    this.pVector.set(px - ox, py - oy);
    this.ray.setAngle(this.pVector.angle());
    this.intersection = this.ray.cast();
    const { x: ix, y: iy } = this.intersection;
    this.rayGraphic.lineBetween(ox, oy, ix, iy);
  }
}
