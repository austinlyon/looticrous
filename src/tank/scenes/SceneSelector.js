import Phaser from 'phaser';
import sceneMap from 'tank/SceneMap.js';

export default class SceneSelector extends Phaser.Scene {
  constructor() {
    super('sceneSelector');
  }

  create() {
    window.scene = this;
    // Make text look less shitty
    this.cameras.main.setRoundPixels(true);

    // Create menu window
    const { width: gameWidth, height: gameHeight } = this.sys.scale;
    const menu = this.add.rectangle(
      gameWidth/2, gameHeight/2,
      gameWidth*0.8, gameHeight*0.8,
      0x333333
    );

    // Create menu title
    this.add.text(
      menu.x, menu.y - menu.height/2 + 20,
      'Select a Scene',
      {
        fontFamily: 'sans-serif',
        fontSize: '96px',
      }
    ).setOrigin(0.5, 0).setScale(0.5);

    for (let i = 0; i < sceneMap.length; i++) {
      this.add.text(
        menu.x - menu.width/2 + 20, menu.y - menu.height/2 + 120 + 50*i,
        sceneMap[i].text,
        {
          fontFamily: 'sans-serif',
          fontSize: '48px',
        }
      ).setScale(0.5);
    }
  }
}
