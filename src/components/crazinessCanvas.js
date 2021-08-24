import { useRef, useEffect, useState } from 'react';
import Demo from './../classes/craziness/demo.js';

export default function CrazinessCanvas(props) {
  // Constants
  const MAX_FPS = 60;  // Set frame rate cap
  const SIMULATION_RATE = 60;  // Updates game state X times per second
  const TIMESTEP = 1000 / SIMULATION_RATE;  // time between updates, in ms
  const MAX_UPDATES_BEFORE_PANIC = 30;

  // Props
  const { options } = props;

  // References
  const canvasRef = useRef(null);
  const demoRef = useRef(null);
  const animationRunning = useRef(true);
  // const demo = useRef(new Demo(canvas.width, canvas.height, canvas, options));

  // State
  const [FPS, setFPS] = useState(60);
  const [particlesTracked, setParticlesTracked] = useState(0)

  useEffect(() => {
    // Grab canvas reference
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    // Create and initialize demo
    const demo = new Demo(canvas);  // DEBUG How do I initialize options here?
    demoRef.current = demo;
    demo.start();

    // FPS check
    let fps = 60;
    let framesThisSecond = 0;
    let lastFpsUpdate = 0;

    // const random = Math.random();  // DEBUG

    // Create animation loop function
    let lastTime = 0;  // in milliseconds
    let dt = 0;  // in milliseconds
    function animationLoop(timestamp) {
      // Throttle frame rate to maxFPS
      if (timestamp < lastTime + (1000 / MAX_FPS)) {
        requestAnimationFrame(animationLoop);  // TODO try returning on this line? Or not?
        return;
      }

      // FPS check
      if (timestamp > lastFpsUpdate + 1000) {
        fps = 0.25 * framesThisSecond + (1 - 0.25) * fps;
        setFPS(Math.ceil(fps));
        lastFpsUpdate = timestamp;
        framesThisSecond = 0;
      }
      framesThisSecond++;

      // Particles Tracked check
      setParticlesTracked(demo.particles.length);

      // Update according to how many timesteps have elapsed
      dt += timestamp - lastTime;
      lastTime = timestamp;
      let numUpdates = 0;
      while (dt >= TIMESTEP) {
        demo.update(TIMESTEP / 1000);
        dt -= TIMESTEP;
        if (++numUpdates >= MAX_UPDATES_BEFORE_PANIC) { panic(); break; }
      }

      // Draw
      // console.log(random);  // DEBUG
      demo.clearCanvas(ctx, canvas);
      demo.draw(ctx);

      if (animationRunning.current) requestAnimationFrame(animationLoop);
    }
    animationRunning.current = true;
    requestAnimationFrame(animationLoop);

    // Function to discard updates if update times go out of control
    function panic() { dt = 0 }  // TODO Don't fully understand this...

    return function cleanup() {
      animationRunning.current = false;
      demo.inputHandler.unsubscribeToInputHandlers();
    }
  }, [TIMESTEP]);  // DEBUG Technically this should never change... it's a computed constant?
  // DEBUG Differing from MAX_UPDATES_BEFORE_PANIC, which is set to a basic type (num)

  useEffect(() => {
    demoRef.current.updateOptions(options);
  }, [options]);

  return (
    <div className="demo" id="demo">
      <div id="fpsCheck">FPS: {FPS}</div>
      <div id='particlesTracked'>{particlesTracked} Particles</div>
      <canvas
        id="crazinessCanvas"
        ref={canvasRef}
      />
    </div>
  );
}
