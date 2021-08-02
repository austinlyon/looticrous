export default class InputHandler {
  constructor(game, paddle) {
    document.addEventListener("keydown", e => {
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
    });

    document.addEventListener("keyup", e => {
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
    });
  }
}
