export default class TitleInputHandler {
  constructor(titleScene) {
    this.handleKeydown = e => {
      titleScene.exitTitleScreen();
    };
  }

  initializeInputHandlers() {
    document.addEventListener("keydown", this.handleKeydown);
  }

  unsubscribeToInputHandlers() {
    document.removeEventListener('keydown', this.handleKeydown);
  }
}
