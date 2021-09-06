import Phaser from 'phaser';
// import Demo from './scenes/Demo.js';
// import TitleScreen from './scenes/TitleScreen.js';
import Play from './scenes/Play.js';

const GAME_WIDTH = 1280;
const GAME_HEIGHT = 720;

export default class GameManager {
  constructor(targetParentElementId) {
    const config = {
      width: GAME_WIDTH,
      height: GAME_HEIGHT,
      type: Phaser.AUTO,
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
        }
      },
      scene: Play,
    };
    config.parent = targetParentElementId;
    this.game = new Phaser.Game(config);
  }

  start() {
    // this.game
  }

  destroy() {
    console.log('destroying game');
    this.game.destroy();
  }
}
