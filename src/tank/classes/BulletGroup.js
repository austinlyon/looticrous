import Phaser from 'phaser';

const SPEED = 700;

class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'green-bullet');
    this.scene = scene;
    this.maxDimension = Math.max(this.width, this.height);
  }

  fire(x, y, angle) {
    this.enableBody(true, x, y, true, true);
    this.scene.physics.velocityFromRotation(angle, SPEED, this.body.velocity);
  }

  recycle() {
    this.disableBody(true, true);
    this.body.reset(-10, -10);
  }

  preUpdate (time, delta){
    super.preUpdate(time, delta);

    if (
      this.y <= -this.maxDimension ||
      this.x <= -this.maxDimension ||
      this.x >= this.scene.width + this.maxDimension
    ) {
      this.recycle();
    }
  }
}

export default class BulletGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene, { allowGravity: false });
    // this.scene = scene;

    this.createMultiple({
      frameQuantity: 50,
      key: 'bullet',
      active: false,
      visible: false,
      classType: Bullet,
      setScale: { x: 1.5, y: 1.5 },
    });
  }

  fireBullet (x, y) {
    const bullet = this.getFirstDead(false);
    if (bullet) {
      bullet.rotation = this.scene.tank.cannon.rotation;
      bullet.fire(x, y, this.scene.tank.cannon.rotation)
    }
  }
}
