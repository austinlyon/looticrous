import Phaser from 'phaser';
import BulletGroup from 'tank/classes/BulletGroup.js';
import Enemy from 'tank/classes/Enemy.js';

const STATE = {
  PAUSED: 0,
  PLAYING: 1,
};

const C = {
  TANK_WIDTH: 82,
  TANK_HEIGHT: 60,
  CANNON_X_OFFSET: 10,
  CANNON_Y_OFFSET: -18,
  WHEEL_Y_OFFSET: 18,
};

export default class Play extends Phaser.Scene {
  constructor() {
    super('play');
    this.state = STATE.PLAYING;
    this.rotationDirection = -1;
    this.cooldown = 0;
  }

  preload() {
    this.load.atlasXML(
      'tanks',
      'tank/images/tanks_spritesheetDefault.png',
      'tank/images/tanks_spritesheetDefault.xml'
    );
    this.load.atlasXML(
      'ships',
      'tank/images/spaceShooter2_spritesheet.png',
      'tank/images/spaceShooter2_spritesheet.xml'
    );
    this.load.image('tree-background', 'tank/images/trees looped-0.5.png');
    this.load.image('shitty-ground', 'tank/images/shitty-ground.png');
    this.load.image('green-bullet', 'tank/images/Green_Bullet.png');
  }

  create() {
    // Set the physics world bottom bound to the light-colored floor
    this.physics.world.setBounds(0, 0, 1280, 640);

    // Add repeating background trees and ground
    this.bg = this.add
      .tileSprite(0, 0, 1280, 620, 'tree-background')
      .setOrigin(0, 0);
    this.floor = this.add
      .tileSprite(0, 620, 1280, 100, 'shitty-ground')
      .setOrigin(0, 0);

    // Add the tank
    const pos = {
      x: 200,
      y: 636 - C.TANK_HEIGHT/2,
    };
    this.tankCannon = this.add.image(
      pos.x + C.CANNON_X_OFFSET,
      pos.y + C.CANNON_Y_OFFSET,
      'tanks', 'tanks_turret2.png'
    );
    this.tankCannon.setOrigin(0, 0.5);
    this.tankTracks = this.add.image(
      pos.x,
      pos.y + C.WHEEL_Y_OFFSET,
      'tanks', 'tanks_tankTracks2.png'
    );
    this.tankBody = this.physics.add.image(
      pos.x,
      pos.y,
      'tanks', 'tanks_tankGrey_body2.png'
    );
    this.tankBody.body
      .setImmovable(true)
      .setCollideWorldBounds(true);
    this.tankBody.body.height = 60;

    // Add enemies that dro in on timers
    this.time.addEvent({
      delay: 2000,                // ms
      callback: spawnEnemy,
      //args: [],
      callbackScope: this,
      loop: true,
    });
    function spawnEnemy() {
      if (!this.enemy || !this.enemy.active) {
        this.enemy = new Enemy(this);
        // Create collider for bullets and enemy ships
        this.physics.add.collider(this.enemy, this.bullets, bulletHitsEnemy, null, this);
      }
    }


    // Create tank controls
    this.tankControls = {
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      jump: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
    };

    // Make cannon follow mouse
    this.projectileVector = new Phaser.Math.Vector2(
      this.input.activePointer.x - this.tankCannon.x,
      this.input.activePointer.y - this.tankCannon.y
    );

    // Create bullet group
    this.bullets = new BulletGroup(this);


    // function resetTint(enemy) {
    //   enemy.tint = 0xffffff;
    // }
    function bulletHitsEnemy(enemy, bullet) {
      bullet.recycle();
      // enemy.tint = 0xff0000;
      // this.time.delayedCall(100, resetTint, [this.enemy], this);
      enemy.takeDamage(20);
    }
  }

  update(t, dt) {
    // Parallax the background and floor
    this.bg.tilePositionX -= -1.3;
    this.floor.tilePositionX -= -2.6;

    // Call GameObject Updates
    if (this.enemy) this.enemy.update();

    // Handle inputs
    const { tankControls:{left, right, jump} } = this;
    if (left.isDown) {
      if (right.isDown && right.timeDown > left.timeDown)
        this.tankBody.body.velocity.x = 400;
      else
        this.tankBody.body.velocity.x = -400;
    }
    else if (right.isDown)
      this.tankBody.body.velocity.x = 400;
    else
      this.tankBody.body.velocity.x = 0;

    if (
      Phaser.Input.Keyboard.JustDown(jump) &&
      this.tankBody.body.blocked.down
    ) {
      this.tankBody.body.velocity.y = -400;
    }

    // Update positions of tracks and cannon
    this.tankTracks.x = this.tankBody.x;
    this.tankTracks.y = this.tankBody.y + C.WHEEL_Y_OFFSET;

    this.tankCannon.x = this.tankBody.x + C.CANNON_X_OFFSET;
    this.tankCannon.y = this.tankBody.y + C.CANNON_Y_OFFSET;

    // Make cannon follow mouse
    this.projectileVector.set(
      this.input.activePointer.x - this.tankCannon.x,
      this.input.activePointer.y - this.tankCannon.y
    );
    const cannonAngle = this.projectileVector.angle();
    if (cannonAngle <= Math.PI/2) {
      this.tankCannon.rotation = 0;
    }
    else if (cannonAngle <= Math.PI) {
      this.tankCannon.rotation = Math.PI;
    }
    else {
      this.tankCannon.rotation = cannonAngle;
    }

    // Make cannon fire bullet
    if (this.input.activePointer.isDown) {
      if (this.cooldown <= 0) {
        const bulletFirePos = new Phaser.Math.Vector2()
          .setToPolar(this.tankCannon.rotation, this.tankCannon.width)
          .add(this.tankCannon);

        this.bullets.fireBullet(bulletFirePos.x, bulletFirePos.y);
        this.cooldown = 200;
      }
    }

    // Handle bullet cooldown
    if (this.cooldown > 0) {
      this.cooldown -= dt;
      if (this.cooldown < 0) this.cooldown = 0;
    }
  }
}
