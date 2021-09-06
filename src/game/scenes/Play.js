import Phaser from 'phaser';
import Paddle from 'game/classes/objects/Paddle.js';
import Ball from 'game/classes/objects/Ball.js';
import Paused from 'game/scenes/Paused.js';
import Menu from 'game/scenes/Menu.js';

const HUES = {
  red:       0 / 360,
  orange:   30 / 360,
  yellow:   60 / 360,
  lime:     90 / 360,
  green:   120 / 360,
  seafoam: 150 / 360,
  cyan:    180 / 360,
  azure:   210 / 360,
  blue:    240 / 360,
  purple:  270 / 360,
  pink:    300 / 360,
};

const BALL_STATE = {
  ON_PADDLE: 0,
  BOUNCING: 1,
};

const STATE = {
  PAUSED: 0,
  PLAYING: 1,
}

export default class Play extends Phaser.Scene {
  constructor() {
    super('play');
    this.state = STATE.PLAYING;
  }

  preload() {
    this.initializeBrickGraphics();
    this.initializeFireballGraphics('fireTrail');
  }

  create() {
    // Create Pause scene
    this.scene.add('paused', Paused);
    this.scene.add('menu', Menu);

    // Include Instructions Text
    this.createInstructions();

    // Set bounds for the arena
    this.physics.world.setBounds(240, 40, 800, 680);
    this.add.graphics()
      .lineStyle(1, 0x00ffff, 0.5)
      .strokeRectShape(this.physics.world.bounds);

    // Create GameObjects
    this.paddle = new Paddle(this, 640, 690, 100, 20, 0x6666ff);
    const ballYOffset = this.paddle.y - this.paddle.height/2 - 15;
    this.ball = new Ball(this, 440, ballYOffset, 15, 0xff0000);
    this.ball.state = BALL_STATE.ON_PADDLE;
    this.physics.add.collider(this.paddle, this.ball, this.handlePaddleCollision);
    this.createBricks();

    // Create Particle Emitter
    const fireTrail = this.add.particles('fireTrail');
    fireTrail.createEmitter({
      quantity: 1,
      speedY: { min: 20, max: 50 },
      speedX: { min: 20, max: 50 },
      scale: { start: 1, end: 0.01 },
      lifespan: { min: 100, max: 300 },
      // alpha: { start: 1, end: 0.5 },
      blendMode: 'ADD',
      follow: this.ball,
      // followOffset: { y: this.ball.height / 2 },
    });

    // Create Controls
    this.paddleControls = {
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      launch: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K),
      space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      backtick: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKTICK),
    };
    this.cursors = this.input.keyboard.createCursorKeys();

    this.aRandomNumber = Math.random(); // DEBUG
  }

  update(t, dt) {
    // console.log(this.aRandomNumber); // DEBUG
    // const { paddle, ball, paddleControls:{left}, paddleControls:{right} } = this;
    const { paddle, ball, paddleControls:{left, right, launch, space, backtick} } = this;

    // Handle Paddle Movement
    if (left.isDown) {
      if (right.isDown && right.timeDown > left.timeDown)
        paddle.body.velocity.x = 400;
      else
        paddle.body.velocity.x = -400;
    }
    else if (right.isDown)
      paddle.body.velocity.x = 400;
    else
      paddle.body.velocity.x = 0;

    // Handle Ball Movement when ON_PADDLE
    if (this.ball.state === BALL_STATE.ON_PADDLE)
      ball.x = this.paddle.x + paddle.body.velocity.x * dt/1000;

    // Handle launch
    if (ball.state === BALL_STATE.ON_PADDLE && Phaser.Input.Keyboard.JustDown(launch)) {
      this.ball.body.setVelocity(-75, -300);
      this.ball.state = BALL_STATE.BOUNCING;
    }

    // Handle pause
    if (Phaser.Input.Keyboard.JustDown(space)) {
      this.scene.launch('menu');
      this.scene.pause();
    }

    // Handle Fullscreen
    if (Phaser.Input.Keyboard.JustDown(backtick)) {
      if (this.scale.isFullscreen)
        this.scale.stopFullscreen();
      else
        this.scale.startFullscreen();
    }

    // Handle Ball maxSpeed // TODO
  }

  handlePaddleCollision(paddle, ball) {
    const dist = ball.x - paddle.x;
    ball.body.setVelocityX(10 * dist);
  }

  initializeFireballGraphics(key) {
    const g = this.add.graphics();
    g.fillStyle(0xff0000);
    g.fillCircle(15, 15, 15);
    g.generateTexture(key, 30, 30);
    g.destroy();
  }

  initializeBrickGraphics() {
    for (const hue in HUES) {
      this.createBrickTexture(hue);
    }
  }

  createInstructions() {
    const textStyle = {
      fontSize: '32px',
      color: '#fff',
      align: 'center',
    };

    this.add.text(120, 100, 'Movement', textStyle).setOrigin(0.5);
    this.add.text(120, 150, '<-A D->', textStyle).setOrigin(0.5);
    this.add.text(120, 250, 'Launch', textStyle).setOrigin(0.5);
    this.add.text(120, 300, 'K', textStyle).setOrigin(0.5);
    this.add.text(120, 400, 'Powers', textStyle).setOrigin(0.5);
    this.add.text(120, 450, 'J K', textStyle).setOrigin(0.5);
    this.add.text(120, 550, 'Pause/Menu', textStyle).setOrigin(0.5);
    this.add.text(120, 600, 'SPACE', textStyle).setOrigin(0.5);
  }

  createBrickTexture(hue) {
    // Shape Dimensions
    const w = 80;    // Width
    const h = 40;    // Height
    const off = 10;  // Offset

    // Greate GraphicsObject
    const Color = Phaser.Display.Color;
    const g = this.add.graphics();
    let color = Color.HSLToColor(HUES[hue], 1, .5).color;   // middle
    g.fillStyle(color);
    g.fillRect(0, 0, w, h);
    color = Color.HSLToColor(HUES[hue], 1, .65).color;      // top
    this.fillQuad(g, color, 0, 0, w, 0, w-off, off, off, off);
    color = Color.HSLToColor(HUES[hue], 1, .4).color;       // left
    this.fillQuad(g, color, 0, 0, off, off, off, h-off, 0, h);
    color = Color.HSLToColor(HUES[hue], 1, .4).color;       // right
    this.fillQuad(g, color, w-off, off, w, 0, w, h, w-off, h-off);
    color = Color.HSLToColor(HUES[hue], 1, .3).color;       // bottom
    this.fillQuad(g, color, off, h-off, w-off, h-off, w, h, 0, h);
    const lw = 2; // lineWidth                                // border
    color = Color.HSLToColor(HUES[hue], 1, .2).color
    g.lineStyle(lw, color);
    g.strokeRoundedRect(0+lw/2, 0+lw/2, w-lw, h-lw, 2);

    // Generate Texture
    g.generateTexture(hue+'Brick', w, h);
    g.destroy();
  }

  fillQuad(g, color, tlX, tlY, trX, trY, brX, brY, blX, blY) {
    g.fillStyle(color);
    g.moveTo(tlX, tlY);
    g.beginPath();
    g.lineTo(trX, trY);
    g.lineTo(brX, brY);
    g.lineTo(blX, blY);
    g.lineTo(tlX, tlY);
    g.closePath();
    g.fillPath();
  }

  createBricks() {
    // const Color = Phaser.Display.Color;
    let texture;
    const chosenHues = [
      null, 'orange', 'purple', 'blue', 'green',
    ];


    function destroyBrick(ball, brick) {
      brick.destroy();
    }

    // Look into adding a physics group for this (this.physics.add.group) // TODO
    for (let row = 1; row < 5; row++) {
      for (let col = 1; col < 9; col++) {
        texture = chosenHues[row] + 'Brick';
        const brick = this.physics.add.staticImage(280 + 80*col, 100 + 40*row, texture);
        this.physics.add.collider(this.ball, brick, destroyBrick);
      }
    }
  }
}
