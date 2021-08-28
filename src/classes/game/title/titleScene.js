import TitleText from  './titleText';
import TitleBall from './titleBall';

export default class TitleScene {
  constructor(game) {
    this.game = game;
    this.width = game.width;
    this.height = game.height;

    this.handleKeydown = this.handleKeydown.bind(this);
    this.exitTitleScreen = this.exitTitleScreen.bind(this);
    this.unregisterHandlers = this.unregisterHandlers.bind(this);
  }

  // Input Handlers
  handleKeydown(e) {
    if (e.keyCode === 32) {
      console.log('exit title screen');
      e.preventDefault();
      this.exitTitleScreen();
    }
  }

  registerHandlers() {
    const handlers = {
      titleKeydown: {
        input: 'keydown',
        func: this.handleKeydown,
      },
    };
    this.game.inputHandler.registerInputHandlers(handlers, this);
  }

  unregisterHandlers() {
    const handlers = ['titleKeydown'];
    this.game.inputHandler.unregisterInputHandlers(handlers);
  }

  start() {
    this.titleText = new TitleText(this);
    this.ball = new TitleBall(this);
    this.registerHandlers();
  }

  exitTitleScreen() {
    this.titleMusic.src = '';
    this.unregisterHandlers();
    this.game.loadScene('pong');
  }

  update(dt) {
    this.ball.update(dt);
    this.titleText.update(dt);
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.width, this.height);

    ctx.save();
    ctx.fillStyle = 'darkorange';
    ctx.font = '40px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Press Start... actually, Spacebar', this.width/2, this.height*7/8);
    ctx.restore();
    this.ball.draw(ctx);
    this.titleText.draw(ctx);
  }
}
