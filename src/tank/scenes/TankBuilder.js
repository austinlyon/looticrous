import Phaser from 'phaser';
import TankFactory from 'tank/classes/Tank.js';

export default class TankBuilder extends Phaser.Scene {
  constructor() {
    super('tankBuilder');
  }

  preload() {
    TankFactory.register();

    this.load.atlasXML(
      'tanks',
      'tank/images/tanks_spritesheetDefault.png',
      'tank/images/tanks_spritesheetDefault.xml'
    );
  }

  create() {
    const tankImage = this.add.image(200, 100, 'tanks', 'tanks_tankGrey2.png');
    this.physics.add.existing(tankImage);
    tankImage.body.setCollideWorldBounds(true);
    console.dir(tankImage);
    
    const tankContainer = this.add.tank(300, 100);
    console.dir(tankContainer);
  }
}
