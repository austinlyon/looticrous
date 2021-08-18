export class Particle {
  constructor(demo) {
    this.x = demo.mouse.x;
    this.y = demo.mouse.y;
    this.size = Math.random() * 15 + 1;
    this.speed = {
      x: Math.random() * 3 - 1.5,
      y: Math.random() * 3 - 1.5,
    }
  }

  update(dt) {
    this.x += this.speed.x;
    this.y += this.speed.y;
    if (this.size > 0.2) this.size -= 0.1;
  }

  draw(ctx) {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

export class SingleParticle {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.opacity = 1;
  }

  update(dt) {
    if (this.opacity > 0) this.opacity -= .02;
  }

  draw(ctx) {
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

export class Trail {
  constructor(demo) {
    this.x = demo.mouse.x;
    this.y = demo.mouse.y;
    this.size = Math.random() * 15 + 1;
    this.speed = {
      x: Math.random() * 3 - 1.5,
      y: Math.random() * 3 - 1.5,
    }
    this.particles = [];
  }

  update(dt) {
    // update opacity of existing trail
    for (let i = 0; i <this.particles.length; i++) {
      this.particles[i].update();
      if (this.particles.opacity < 0.01) {
        this.particles.splice(i, 1);
        i--;
      }
    }
    // add new particle at end of trail (until trail ends)
    if (this.size >= 0.2) {
      this.particles.push(new SingleParticle(this.x, this.y, this.size));
      this.x += this.speed.x;
      this.y += this.speed.y;
      if (this.size > 0.2) this.size -= 0.1;
    }
  }

  draw(ctx) {
    this.particles.forEach((particle, i) => {
      particle.draw(ctx);
    });
  }
}
