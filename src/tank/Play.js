import Phaser from 'phaser';
import TankFactory from 'tank/classes/Tank.js';
import BulletGroup from 'tank/classes/BulletGroup.js';
import MuzzleFlash from 'tank/classes/MuzzleFlash.js';
// import Enemy from 'tank/classes/Enemy.js';
import Bombers from 'tank/classes/enemies/Bomber.js';
import Stage_1 from 'tank/stages/Stage_1.js';

const STATE = {
  PAUSED: 0,
  PLAYING: 1,
};

export default class Play extends Phaser.Scene {
  constructor() {
    super('play');
    this.state = STATE.PLAYING;
    this.rotationDirection = -1;
    this.cooldown = 0;
  }

  preload() {
    // Register extended classes to GameObjectFacotry
    TankFactory.register();

    // Backgrounds
    this.load.image('desert_1', 'tank/images/bg/desert_1_720.png');
    this.load.image('desert_2', 'tank/images/bg/desert_2_720.png');
    this.load.image('desert_3', 'tank/images/bg/desert_3_720.png');
    this.load.image('desert_4', 'tank/images/bg/desert_4_720.png');
    this.load.image('desert_5', 'tank/images/bg/desert_5_720.png');
    this.load.image('tree-background', 'tank/images/bg/trees looped-0.5.png');
    this.load.image('shitty-ground', 'tank/images/bg/shitty-ground.png');

    // TankShip
    this.load.atlasXML(
      'tanks',
      'tank/images/tanks_spritesheetDefault.png',
      'tank/images/tanks_spritesheetDefault.xml'
    );

    // Enemies
    this.load.atlasXML(
      'ships',
      'tank/images/spaceShooter2_spritesheet.png',
      'tank/images/spaceShooter2_spritesheet.xml'
    );
    this.load.image('blue_bomber', 'tank/images/blue_bomber.png');

    // Weapons
    this.load.image('green-bullet', 'tank/images/Green_Bullet.png');
    this.load.image('muzzle-flash', 'tank/images/m_11_ghost.png');
    this.load.image('red-missile', 'tank/images/red_missile.png');
  }

  create() {
    // Set the physics world bottom bound to the light-colored floor
    this.physics.world.setBounds(0, 0, 1280, 640);
    this.physics.world.drawDebug = false;

    // Add parallax background and ground layer
    this.stage = new Stage_1(this);
    this.stage.createBackground();

    // Add the tank
    this.tank = this.add.tank(-60, 0);
    this.tank.setPosition(200, 636 - this.tank.height/2);
    this.tank.controls = {
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      jump: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
    };

    // Create bullet group
    this.bullets = new BulletGroup(this);

    // Add enemies that drop in on timers
    this.bombers = new Bombers(this);
    this.physics.add.collider(this.bombers, this.bullets, bulletHitsEnemy, null, this);
    this.physics.add.collider(this.tank, this.bombers.bombs, bombHitsTank, null, this);
    this.time.addEvent({
      delay: 2000,                // ms
      callback: this.bombers.deploy,
      callbackScope: this.bombers,
      loop: true,
    });

    function bulletHitsEnemy(enemy, bullet) {
      bullet.recycle();
      enemy.takeDamage(20);
    }

    function bombHitsTank(tank, bomb) {
      bomb.recycle();
    }

    // World Bounds collision handler
    this.physics.world.on('worldbounds', handleWorldBoundsCollision);
    function handleWorldBoundsCollision(body) {
      if (body.gameObject.constructor.name === 'Bomb') {
        body.onWorldBounds = false;
        body.gameObject.recycle();
      }
    }

    // Create debug controls
    this.togglePhysicsDebugInput = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    this.toggleDebugTextInput = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO);

    // Create debug text area
    this.debugGroup = this.bombers.bombs;
    this.debugGroupName = 'Bomber Bombs';
    this.debugText = this.add.text(10, 10, 'DebugInfo',
      { font: '16px Courier', fill: '#ffffff' })
      .setDepth(10);
    this.debugGraphic = this.add.rectangle(
      0, 0,
      100, 100,
      0x000000, 0.5
    )
      .setOrigin(0, 0)
      .setDepth(9);
  }

  update(t, dt) {
    // Parallax the background and ground
    this.stage.updateBackground();

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
    if (Phaser.Input.Keyboard.JustDown(this.togglePhysicsDebugInput)) {
      if (this.physics.world.drawDebug) {
        this.physics.world.drawDebug = false;
        this.physics.world.debugGraphic.clear();
      }
      else {
        this.physics.world.drawDebug = true;
      }
    }

    // Handle update to debug text
    this.debugText.setText([
      this.debugGroupName,
      'Total: ' + this.debugGroup.getLength(),
      'Max: ' + this.debugGroup.maxSize,
      'Active: ' + this.debugGroup.countActive(true),
      'Inactive: ' + this.debugGroup.countActive(false),
      'Used: ' + this.debugGroup.getTotalUsed(),
      'Free: ' + this.debugGroup.getTotalFree(),

      // 'enemy body x: ' + (this.enemy ? Math.ceil(this.enemy.body.x) : '-'),
      // 'enemy body y: ' + (this.enemy ? Math.ceil(this.enemy.body.y) : '-'),
    ]);
    this.debugGraphic.setSize(this.debugText.width+20, this.debugText.height+20);
    if (Phaser.Input.Keyboard.JustDown(this.toggleDebugTextInput)) {
      this.toggleDebugText();
    }
  }

  toggleDebugText() {
    if (this.debugText && this.debugGraphic) {
      this.debugText.setActive(!this.debugText.active);
      this.debugText.setVisible(!this.debugText.visible);
      this.debugGraphic.setActive(!this.debugGraphic.active);
      this.debugGraphic.setVisible(!this.debugGraphic.visible);
    }
  }
}
