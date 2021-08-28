import TitleScene from './title/titleScene.js';
import Pong from './pong/pongScene.js';
import InputHandler from './input.js';
import titleSong from 'assets/music/Jim_Hall-Heartache.mp3';

// const SCENES = {
//   TITLE: 0,
//   PONG: 1,
// }

const GAMESTATE = {
  TITLE: 0,
  CHARACTER_SELECT: 1,
  STAGE_SELECT: 2,
  PONG: 3,
  PAUSED: 7,
  RUNNING: 8,
  PAUSE_MENU: 4,
  GAMEOVER: 5,
  BEAT_STAGE: 6,
};

export default class Game {
  constructor(canvas, width, height, images, getNextFrame) {
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.images = images;
    this.getNextFrame = getNextFrame;
    this.frameByFrameMode = false;
    this.gamestate = GAMESTATE.TITLE;
    this.music = new Audio();
    this.music.src = titleSong;
    this.inputHandler = new InputHandler();

    this.handleKeydown = this.handleKeydown.bind(this);
    this.getNextFrame = this.getNextFrame.bind(this);
  }

  handleKeydown(e) {
    switch (e.keyCode) {
      case 70:
        if (this.frameByFrameMode) this.getNextFrame(true);
        break;
      case 81:
        this.frameByFrameMode = !this.frameByFrameMode;
        if (!this.frameByFrameMode) this.getNextFrame(true);
        break;
      default:
        break;
    }
  }

  registerHandlers() {
    const handlers = {
      gameKeydown: {
        input: 'keydown',
        func: this.handleKeydown,
      },
    };
    this.inputHandler.registerInputHandlers(handlers);
  }

  loadScene(scene) {
    switch (scene) {
      case 'title':
        this.music.volume = .5;
        this.music.play();
        this.scene = new TitleScene(this);
        break;
      case 'pong':
        this.scene = new Pong(this);
        break;
      default:
        break;
    }

    this.scene.start();
  }

  start() {
    this.registerHandlers();
    this.loadScene('title');
  }

  update(dt) {
    this.scene.update(dt);
  }

  draw(ctx) {
    this.scene.draw(ctx);
    if (this.frameByFrameMode) this.getNextFrame(false);
  }
}
