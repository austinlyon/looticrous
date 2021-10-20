import Phaser from 'phaser';

export default class Pause extends Phaser.Scene {
  constructor() {
    super('pause');
  }

  create() {
    this.unpauseInput = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
  }

  update() {
    // Handle pause
    if (Phaser.Input.Keyboard.JustDown(this.unpauseInput)) {
      this.scene.resume('play');
      this.scene.stop();
    }
  }
}
