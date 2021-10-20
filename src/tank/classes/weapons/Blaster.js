import Phaser from 'phaser';

const projectileTexture = 'green-bullet';
const SPEED = 700;

class Blaster {
  constructor (scene) {
    this.scene = scene;
    this.bullets = new BlasterBullets(scene);
  }

  fire (x, y, angle) {
    const { scene, bullets } = this;
    const bullet = bullets.get(x, y);
    bullet.enableBody(true, x, y, true, true);
    scene.physics.velocityFromRotation(angle, SPEED, bullet.body.velocity);
  }
}

class BlasterBullets extends Phaser.Physics.Arcade.Group {
  constructor (scene) {
    const config = {
      classType: BlasterBullet,
      allowGravity: false,
      immovable: true,
    };
    super(scene.physics.world, scene, config);

    // Since this has a high RoF, instantiate a base pool of bullets
    this.createMultiple({
      frameQuantity: 10,
      key: 'blasterBullet',
      active: false,
      visible: false,
      classType: BlasterBullet,
      setScale: { x: 1.5, y: 1.5 },
    });
  }

  fire (x, y) {
    const bullet = this.getFirstDead(false);
    if (bullet) {
      bullet.rotation = this.scene.tank.cannon.rotation;

    }
  }
}

class BlasterBullet extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y) {
    super(scene, x, y, projectileTexture);
    this.maxDimension = Math.max(this.width, this.height);
  }

  recycle () {
    this.disableBody(true, true);
    this.body.reset(-this.MaxDimension, -this.maxDimension);
  }

  preUpdate (time, dt) {
    super.preUpdate(time, dt);
    if (
      this.y <= -this.maxDimension ||
      this.x <= -this.maxDimension ||
      this.x >= this.scene.width + this.maxDimension ||
      this.y >= this.scene.height + this.maxDimension
    ) {
      this.recycle();
    }
  }
}
