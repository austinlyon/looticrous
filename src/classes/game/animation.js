export default class Animation {
  constructor(
    gameObject,
    { maxFPS = 60, simulationRate = 60, updatesTilPanic = 30 } = {},
    subscribers
  ) {
    this.maxFPS = maxFPS;
    this.simRate = simulationRate;
    this.updatesTilPanic = updatesTilPanic;

    // Initialize FPS check
    this.fps = maxFPS;
    this.framesThisSecond = 0;
    this.lastFpsUpdate = 0;

    // Initialize animation loop variables
    this.lastTime = 0;  // in milliseconds
    this.dt = 0;        // in milliseconds
  }

  reportFPS(fps) {
    // report fps value
  }

  loop(timestamp) {
    // Throttle frame rate to maxFPS
    if (timestamp < this.lastTime + (1000 / this.maxFPS))
      return requestAnimationFrame(this.loop);

    // FPS check
    if (timestamp > this.lastFpsUpdate + 1000) {
      this.fps = 0.25 * this.framesThisSecond + (1 - 0.25) * this.fps;
      this.reportFPS(Math.ceil(this.fps));
      this.lastFpsUpdate = timestamp;
      this.framesThisSecond = 0;
    }
    this.framesThisSecond++;
  }
}
