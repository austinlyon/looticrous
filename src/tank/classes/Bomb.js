import Phaser from 'phaser';

export default class BombGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    const config = {
      classType: Bomb,
      name: 'Bombs',
      collideWorldBounds: true,
      runChildUpdate: true,
    };
    super(scene.physics.world, scene, config);
    scene.add.existing(this);
  }

  drop(x, y, enemy) {
    const bomb = this.get();
    bomb.enableBody(true, x, y, true, true);
    bomb.setVelocity(enemy.body.velocity.x, 10);
    bomb.setAngle(180);
    bomb.body.setSize(bomb.height, bomb.height);
    bomb.setCircle(bomb.height/2);
    bomb.body.onWorldBounds = true;
    return bomb;
  }
}

class Bomb extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'red-missile');
    this.setScale(0.2, 0.2);
    this.maxDimension = Math.max(this.width, this.height);
  }

  explode(target) {
    const expl = this.scene.physics.add.sprite(this.x, this.y, 'small_explosion')
      .setScale(0.5)
      .play('small_explosion_Animation')
      .once('animationcomplete', () => { expl.destroy() });
    expl.body.setAllowGravity(false);
    if (target === 'ground') expl.setVelocity(-2.6*60, 0);
    else if (target === 'bullet') expl.setVelocity(this.body.velocity.x/3, this.body.velocity.y/3);
    this.recycle();
  }

  takeDamage() {
    this.explode('bullet');
  }

  recycle() {
    this.disableBody(true, true);
    this.body.reset(-this.maxDimension, -this.maxDimension);
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

  update(time, dt) {
    super.update(time, dt);

    this.setRotation(this.body.velocity.angle());
  }
}
