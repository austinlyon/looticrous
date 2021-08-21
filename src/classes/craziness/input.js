export default class InputHandler {
  constructor(demo) {
    this.demo = demo;

    this.handleMousemove = e => {
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
    };

    // this.debouncedMousemove = this.debounce(e => {
    //   const rect = e.target.getBoundingClientRect();
    //   demo.mouse.x = e.x - rect.left;
    //   demo.mouse.y = e.y - rect.top;
    //   demo.particleBurst();
    // }, (demo.burstRate === 'unlimited' ? 1000 : 1000/demo.burstRate));

    this.handleResize = this.debounce(e => {
      demo.width = window.innerWidth;
      demo.canvas.width = window.innerWidth;
      demo.height = window.innerHeight;
      demo.canvas.height = window.innerHeight;
      // console.log('resizing!'); // DEBUG
    }, 500);
  }

  initializeInputHandlers() {
    this.demo.canvas.addEventListener('click', this.handleClick);
    this.demo.canvas.addEventListener('mousemove', this.handleMousemove);
    // this.demo.canvas.addEventListener('mousemove', this.debouncedMousemove);
    window.addEventListener('resize', this.handleResize);
    // console.log('initializing handlers with burstRate: ' + this.demo.burstRate); // DEBUG
  }

  unsubscribeToInputHandlers() {
    this.demo.canvas.removeEventListener('click', this.handleClick);
    this.demo.canvas.removeEventListener('mousemove', this.handleMousemove);
    // this.demo.canvas.removeEventListener('mousemove', this.debouncedMousemove);
    window.removeEventListener('resize', this.handleResize);
  }

  debounce(fn, ms) {
    let timer;
    return () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        timer = null;
        fn.apply(this, arguments);
      }, ms);
    };
  }
}
