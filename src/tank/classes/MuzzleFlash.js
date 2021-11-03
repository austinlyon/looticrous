import Phaser from 'phaser';

export default class MuzzleFlash extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, rotation) {
  // constructor(scene, x, y, tank) {
    super(scene, x, y, 'muzzle-flash');
    // this.tank = tank;
    this.setOrigin(0.1, 0.5);
    this.setScale(0.4);
    this.setTint(0x99ff99);
    this.setRotation(rotation);
    // this.setRotation(tank.cannon.rotation);
    scene.add.existing(this);

    scene.tweens.add({
      targets: this,
      alpha: 0,
      scale: 0.1,
      ease: 'Power1',
      duration: 200,
      onComplete: function(tween, targets) { targets[0].destroy(); },
    });
  }

  // preUpdate (time, delta){
  //   super.preUpdate(time, delta);
  //   const bulletFirePos = new Phaser.Math.Vector2()
  //     .setToPolar(this.tank.cannon.rotation, this.tank.cannon.width)
  //     .add(this.tank).add(this.tank.cannon);
  //   this.setPosition(bulletFirePos.x, bulletFirePos.y);
  //   this.setRotation(this.tank.cannon.rotation);
  // }
}
