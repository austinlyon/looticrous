export default class Animation {
  constructor(maxFPS, simRate) {
    this.maxFPS = maxFPS;
    this.simRate = simRate;
    this.timestep = 1000 / simRate;
    this.maxUpdatesBeforePanic = 240;
    this.lastTime = 0;
    this.dt = 0;
  }

  loop(timestamp) {
    if (timestamp < this.lastTime + (1000 / this.maxFPS)) {
      
    }
  }
}
