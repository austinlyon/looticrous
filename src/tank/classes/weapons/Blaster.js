import Phaser from 'phaser';
import MuzzleFlash from 'tank/classes/MuzzleFlash.js';

const projectileTexture = 'green-bullet';
const SPEED = 700;
const COOLDOWN = 200;
const DAMAGE = 20;

export default class Blaster {
  constructor (scene, tank) {
    this.type = 'projectile';
    this.scene = scene;
    this.tank = tank;
    this.bullets = new BlasterBullets(scene);
    this.cooldown = 0;
  }

  fire (x, y, rotation) {
    const { scene, bullets, tank } = this;

    // Enable bullet from pool and fire it
    const bullet = bullets.get();
    bullet.enableBody(true, x, y, true, true);
    bullet.rotation = rotation;
    scene.physics.velocityFromRotation(rotation, SPEED, bullet.body.velocity);
    this.cooldown = COOLDOWN;

    // Animate muzzle flash along with bullet
    if (tank) {
      const muzzlePos = tank.getMuzzlePositionRelative();
      const mf = new MuzzleFlash(scene, muzzlePos.x, muzzlePos.y, rotation);
      tank.add(mf);
    }

    return bullet;
  }

  hit (enemy, bullet) {
    bullet.recycle();
    enemy.takeDamage(DAMAGE);
  }

  hitProjectile (projectile, bullet) {
    bullet.recycle();
    projectile.explode('bullet');
  }

  addCollider(enemy) {
    this.scene.physics.add.overlap(enemy, this.bullets, this.hit, null, this);
    this.scene.physics.add.overlap(enemy.bombs, this.bullets, this.hitProjectile, null, this);
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
      key: projectileTexture,
      classType: BlasterBullet,
      quantity: 10,
      active: false,
      visible: false,
      setScale: { x: 1.5, y: 1.5 },
    });
  }
}

class BlasterBullet extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y) {
    super(scene, x, y, projectileTexture);
    this.setScale(4);
    this.maxDimension = Math.max(this.width, this.height);
  }

  recycle () {
    this.disableBody(true, true);
    this.body.reset(-this.maxDimension, -this.maxDimension);
  }

  preUpdate (time, dt) {
    super.preUpdate(time, dt);
    if (
      this.y <= -this.maxDimension ||
      this.x <= -this.maxDimension ||
      this.x >= this.scene.width  + this.maxDimension ||
      this.y >= this.scene.height + this.maxDimension
    ) {
      this.recycle();
    }
  }
}
