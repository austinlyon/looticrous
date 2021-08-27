export default class InputHandler {
  constructor() {
    this.handlers = {};
    // this.handleKeydown = e => {
    //   switch (e.keyCode) {
    //     default:
    //       break;
    //     case 65:
    //       paddle.moveLeft();
    //       break;
    //     case 68:
    //       paddle.moveRight();
    //       break;
    //     case 32:
    //       game.togglePause();
    //       break;
    //     case 70:
    //       if (game.frameByFrameMode) game.getNextFrame(true);
    //       break;
    //     case 81:
    //       game.frameByFrameMode = !game.frameByFrameMode;
    //       if (!game.frameByFrameMode) game.getNextFrame(true);
    //       break;
    //   }
    // };

    // this.handleKeyup = e => {
    //   switch (e.keyCode) {
    //     default:
    //       break;
    //     case 65:
    //       if (paddle.speed < 0) paddle.stop();
    //       break;
    //     case 68:
    //       if (paddle.speed > 0) paddle.stop();
    //       break;
    //   }
    // };
  }

  registerInputHandlers(handlers) {
    // Add new handlers to object containing all handlers
    this.handlers = {...this.handlers, ...handlers};

    // Register new handlers with the browser
    for (const name in handlers) {
      document.addEventListener(handlers[name].input, this.handlers[name].func);
    }
  }

  unregisterInputHandlers(handlers) {
    for (const name of handlers) {
      // Unregister select handlers with the browser
      document.removeEventListener(this.handlers[name].input, this.handlers[name].func);

      // Remove select handlers from object containing all handlers
      delete this.handlers[name];
    }
  }

  unregisterAllInputHandlers() {
    this.unregisterInputHandlers(Object.keys(this.handlers));
  }
}
