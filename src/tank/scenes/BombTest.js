import Phaser from 'phaser';
import BombGroup from 'tank/classes/Bomb.js';

export default class BombTest extends Phaser.Scene {
  constructor() {
    super('bombTest');
  }

  preload() {
    this.load.image('red-missile', 'tank/images/red_missile.png');
  }

  create() {
    const bombs = new BombGroup(this);
    const bomb = bombs.drop(100, 100, {body: {velocity: { x: 0, y: 0 }}});
    this.bomb = bomb;
    bomb.setVelocity(0, 0);
    // bomb.setSize(bomb.width/2, bomb.height/2);
    bomb.body.setAllowGravity(false);
    this.add.circle(bomb.x, bomb.y, 4, 0x0000ff);
    this.add.circle(bomb.body.center.x, bomb.body.center.y, 4, 0x00ff00);
    const bounds = this.add.rectangle(bomb.x, bomb.y, bomb.displayWidth, bomb.displayHeight);
    bounds.setStrokeStyle(1, 0xffffff);
    console.dir(bomb);
    this.add.rectangle(0, 0, 100, 100, 0xffffff).setOrigin(0, 0).setAlpha(.3);
  }

  update(t, dt) {
    this.bomb.setRotation(this.bomb.rotation + .01);
  }
}
