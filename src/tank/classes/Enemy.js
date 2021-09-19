import Phaser from 'phaser';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene) {
    // Randomize start position
    const startX = Phaser.Math.Between(500, 1100);
    super(scene, startX, -50, 'ships', 'spaceShips_001.png');

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.scene = scene;
    this.maxDimension = Math.max(this.width, this.height);
    this.setImmovable(true);
    this.body.allowGravity = false;

    // Create slightly randomized movement path
    const endY = Phaser.Math.Between(150, 350);
    this.createPath(startX, endY);

    this.health = 100;
  }

  resetTint() {
    this.tint = 0xffffff;
  }

  takeDamage(dmg) {
    this.health -= dmg;
    if (this.health <= 0) {
      this.destroy();
    }
    else {
      this.tint = 0xff0000;
      this.scene.time.delayedCall(100, this.resetTint, [], this);
    }
  }

  createPath(startX, endY) {
    this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
    this.path = new Phaser.Curves.Path(startX, -50)
      .lineTo(startX, endY - 100)
      .ellipseTo(100, 100, 0, 90, false)
      .lineTo(-200, endY);
    this.scene.tweens.add({
        targets: this.follower,
        t: 1,
        ease: 'Sine.easeInOut',
        duration: 6000,
        yoyo: false,
        repeat: 0,
    });
  }

  update() {
    this.path.getPoint(this.follower.t, this.follower.vec);
    this.setPosition(this.follower.vec.x, this.follower.vec.y);
    if (this.x <= -50) {
      this.destroy();
    }
  }

  // recycle() {
  //   this.disableBody(true, true);
  //   this.body.reset(-this.width/2, -this.height/2);
  // }

  preUpdate (time, delta){
    super.preUpdate(time, delta);

    // if (
    //   this.y <= -this.maxDimension ||
    //   this.x <= -this.maxDimension ||
    //   this.x >= this.scene.width + this.maxDimension
    // ) {
    //   this.recycle();
    // }
  }
}
