export default class InputHandler {
  constructor(game, paddle) {
    this.handleKeydown = e => {
      console.log('keydown: ' + e.keyCode);
      switch(e.keyCode) {
        default:
          break;
        case 65:
          paddle.moveLeft();
          break;
        case 68:
          paddle.moveRight();
          break;
        case 32:
          game.togglePause();
          break;
      }
    };

    this.handleKeyup = e => {
      switch(e.keyCode) {
        default:
          break;
        case 65:
          if (paddle.speed < 0) paddle.stop();
          break;
        case 68:
          if (paddle.speed > 0) paddle.stop();
          break;
      }
    };
  }

  initializeInputHandlers() {
    document.addEventListener("keydown", this.handleKeydown);
    document.addEventListener("keyup",   this.handleKeyup);
  }

  unsubscribeToInputHandlers() {
    document.removeEventListener('keydown', this.handleKeydown);
    document.removeEventListener("keyup",   this.handleKeyup);
  }
}
