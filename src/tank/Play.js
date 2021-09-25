import Phaser from 'phaser';
import BulletGroup from 'tank/classes/BulletGroup.js';
import MuzzleFlash from 'tank/classes/MuzzleFlash.js';
import Enemy from 'tank/classes/Enemy.js';

const STATE = {
  PAUSED: 0,
  PLAYING: 1,
};

// const C = {  // PENDING DELETION
//   TANK_WIDTH: 82,
//   TANK_HEIGHT: 60,
//   CANNON_X_OFFSET: 10,
//   CANNON_Y_OFFSET: -18,
//   WHEEL_Y_OFFSET: 18,
// };

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
    this.load.image('muzzle-flash', 'tank/images/m_11_ghost.png');
    this.load.image('red-missile', 'tank/images/red_missile.png');
  }

  create() {
    // Set the physics world bottom bound to the light-colored floor
    this.physics.world.setBounds(0, 0, 1280, 640);
    this.physics.world.drawDebug = false;

    // Add repeating background trees and ground
    this.bg = this.add
      .tileSprite(0, 0, 1280, 625, 'tree-background')
      .setOrigin(0, 0);
    this.floor = this.add
      .tileSprite(0, 620, 1280, 100, 'shitty-ground')
      .setOrigin(0, 0);

    // Add the tank
    this.tank = this.add.tank(-60, 0);
    this.tank.setPosition(200, 636 - this.tank.height/2);
    this.tank.controls = {
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      jump: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
    };

    // Add enemies that drop in on timers
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

    // Create debug controls
    this.toggleDebug = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
  }

  update(t, dt) {
    // Parallax the background and floor
    this.bg.tilePositionX -= -1.3;
    this.floor.tilePositionX -= -2.6;

    // Call GameObject Updates
    if (this.tank) this.tank.update();
    if (this.enemy) this.enemy.update();

    // Make cannon fire bullet
    if (this.input.activePointer.isDown) {
      if (this.cooldown <= 0) {
        const bulletFirePos = new Phaser.Math.Vector2()
          .setToPolar(this.tank.cannon.rotation, this.tank.cannon.width)
          .add(this.tank).add(this.tank.cannon);

        this.bullets.fireBullet(bulletFirePos.x, bulletFirePos.y);
        new MuzzleFlash(this, bulletFirePos.x, bulletFirePos.y, this.tank);
        this.cooldown = 200;
      }
    }

    // Handle bullet cooldown
    if (this.cooldown > 0) {
      this.cooldown -= dt;
      if (this.cooldown < 0) this.cooldown = 0;
    }

    // Handle toggle debug
    if (Phaser.Input.Keyboard.JustDown(this.toggleDebug)) {
      if (this.physics.world.drawDebug) {
        this.physics.world.drawDebug = false;
        this.physics.world.debugGraphic.clear();
      }
      else {
        this.physics.world.drawDebug = true;
      }
    }
  }
}
