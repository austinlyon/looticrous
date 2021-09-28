import Phaser from 'phaser';

export default class BombGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    const config = {
      classType: Bomb,
      name: 'Bombs',
      collideWorldBounds: true,
    };
    super(scene.physics.world, scene, config);
  }

  drop(x, y, enemy) {
    const bomb = this.get();
    bomb.enableBody(true, x, y, true, true);
    bomb.setVelocity(enemy.body.velocity.x, 10);
    bomb.setAngle(90);
    bomb.body.onWorldBounds = true;
  }
}

class Bomb extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'red-missile');
    this.setScale(0.2, 0.2);
    this.maxDimension = Math.max(this.width, this.height);
  }

  recycle() {
    this.disableBody(true, true);
    this.body.reset(-10, -10);
  }

  preUpdate(time, delta){
    super.preUpdate(time, delta);

    if (
      this.y <= -this.maxDimension ||
      this.y >= this.scene.height + this.maxDimension ||
      this.x <= -this.maxDimension ||
      this.x >= this.scene.width + this.maxDimension
    ) {
      this.recycle();
    }
  }
}
