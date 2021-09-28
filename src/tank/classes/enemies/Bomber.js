import Phaser from 'phaser';
import BombGroup from 'tank/classes/Bomb.js';

export default class Bombers extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    const config = {
      classType: Bomber,
      maxSize: 10,
      allowGravity: false,
      immovable: true,
      velocityX: -200,
    };
    super(scene.physics.world, scene, config);

    // Create bombs - this enemy's weapon type
    this.bombs = new BombGroup(this.scene);
  }

  deploy() {
    const bomber = this.get(0, 0);

    // Randomize start position
    const startPos = {
      x: this.scene.game.scale.width + bomber.width/2,
      y: Phaser.Math.Between(60, 300),
    };
    bomber.setPosition(startPos.x, startPos.y);
    bomber.setActive(true);
    bomber.setVisible(true);
    bomber.body.setEnable();
    bomber.body.reset(startPos.x, startPos.y)
    bomber.setVelocityX(-200);
    bomber.startBombTimer();

    bomber.bombs = this.bombs;
    bomber.health = 100;
  }
}

class Bomber extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, 0, 0, 'blue_bomber');
    this.setFlipX(true);
  }

  dropBomb() {
    this.bombs.drop(this.x, this.y, this);
  }

  startBombTimer() {
    this.bombTimer = this.scene.time.addEvent({
      delay: 2500,                // ms
      callback: this.dropBomb,
      callbackScope: this,
      loop: false,
    });
  }

  takeDamage(dmg) {
    this.health -= dmg;
    if (this.health <= 0) {
      // this.bombTimer.remove();
      this.recycle();
    }
    else {
      this.tint = 0xff0000;
      this.scene.time.delayedCall(100, this.resetTint, [], this);
    }
  }

  resetTint() {
    this.tint = 0xffffff;
  }

  recycle() {
    this.disableBody(true, true);
    this.body.reset(-this.width, -this.height);
  }

  preUpdate (time, delta){
    super.preUpdate(time, delta);

    if (
      this.y <= -this.height ||
      this.x <= -this.width ||
      this.x >= this.scene.width + this.width
    ) {
      this.recycle();
    }
  }
}
