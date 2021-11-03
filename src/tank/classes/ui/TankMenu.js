// import Phaser from 'phaser';

export default class TankMenu {
  constructor(scene) {
    this.scene = scene;
    this.window = this.createRoundedWindow();
  }

  createRoundedWindow() {
    // const { Color } = Phaser.Display;
    const menuBackground = 0x333333;
    const menuCornerRadius = 32;
    const menuWidth = 400;
    const menuHeight = 300;

    const menuWindow = this.scene.add.graphics();
    menuWindow.fillStyle(menuBackground, .8);
    menuWindow.fillRoundedRect(100, 100, menuWidth, menuHeight, menuCornerRadius);
    return menuWindow;
  }
}
