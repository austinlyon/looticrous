import Phaser from 'phaser';

export default class Paused extends Phaser.Scene {
  constructor() {
    super('paused');
  }

  create() {
    const {width, height} = this.sys.game.scale.gameSize;
    this.height = this.sys.game.scale.gameSize.height;
    this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    const modal = this.add.graphics();
    modal.fillStyle(0x000000, .5);
    modal.fillRect(0, 0, width, height);
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.space)) {
      this.scene.resume('play');
      this.scene.stop();
    }
  }
}
