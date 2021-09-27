import Phaser from 'phaser';

// const SPEED = 700;

class Bomb extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'red-missile');
    this.scene = scene;
    // this.setAngle(90);
    this.maxDimension = Math.max(this.width, this.height);
  }

  drop(x, y, velocityX) {
    this.enableBody(true, x, y, true, true);
    this.setVelocity(velocityX, 10);
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

export default class BombGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene, { allowGravity: true });
    this.scene = scene;

    this.createMultiple({
      frameQuantity: 5,
      key: 'bomb',
      active: false,
      visible: false,
      classType: Bomb,
      setScale: { x: 0.2, y: 0.2 },
      setRotation: { value: -Math.PI/2 },
    });
  }

  dropBomb (x, y, enemy) {
    let bomb = this.getFirstDead(false);
    if (bomb) {
      // bomb.rotation = this.scene.tank.cannon.rotation;
      const velocityX = (enemy.body.x - enemy.body.prev.x)*60;
      bomb.drop(x, y, velocityX)
    }
  }
}
