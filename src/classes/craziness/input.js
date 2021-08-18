export default class InputHandler {
  constructor(demo) {
    this.demo = demo;

    this.handleMousemove = e => {
      // const rect = demo.canvasRef.getBoundingClientRect();
      const rect = e.target.getBoundingClientRect();
      demo.mouse.x = e.x - rect.left;
      demo.mouse.y = e.y - rect.top;
      demo.particleBurst();
    };

    this.handleClick = e => {
      const rect = e.target.getBoundingClientRect();
      demo.mouse.x = e.x - rect.left;
      demo.mouse.y = e.y - rect.top;
      demo.particleBurst();
    }
  }

  initializeInputHandlers() {
    this.demo.canvasRef.addEventListener('click', this.handleClick);
    // window.addEventListener('mousemove', this.handleMousemove);
    this.demo.canvasRef.addEventListener('mousemove', this.handleMousemove);
  }

  unsubscribeToInputHandlers() {
    this.demo.canvasRef.removeEventListener('click', this.handleClick);
    // window.removeEventListener('mousemove', this.handleMousemove);
    this.demo.canvasRef.removeEventListener('mousemove', this.handleMousemove);
  }
}
