import { useRef, useEffect, useState } from 'react';
import Demo from './../classes/craziness/demo.js';

export default function CrazinessCanvas(props) {
  // props
  const { options } = props;

  // Canvas & AnimationState references
  const canvasRef = useRef(null);
  const animationRunning = useRef(true);

  // State
  const [FPS, setFPS] = useState(60);
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Crab canvas reference
    const canvas = canvasRef.current;
    canvas.width = canvasDimensions.width;
    canvas.height = canvasDimensions.height;
    const ctx = canvas.getContext('2d');

    // Create and initialize demo
    const demo = new Demo(canvas.width, canvas.height, canvas, options);
    demo.start();

    const handleResize = debounce(function handleResize() {
      setCanvasDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      // demo.width = window.innerWidth;
      // demo.height = window.innerHeight;
    }, 500);

    window.addEventListener('resize', handleResize);

    // Set frame rate cap and update speed
    const maxFPS = 60;
    const simulationRate = 60;  // updates game state X times per second
    const timestep = 1000 / simulationRate;

    // Create animation loop function
    let lastTime = 0;  // in milliseconds
    let dt = 0;  // in milliseconds
    // FPS check
    let fps = 60;
    let framesThisSecond = 0;
    let lastFpsUpdate = 0;
    const random = Math.random();  // DEBUG

    function animationLoop(timestamp) {
      // Throttle frame rate to maxFPS
      if (timestamp < lastTime + (1000 / maxFPS)) {
        requestAnimationFrame(animationLoop);
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

      // Update according to how many timesteps have elapsed
      dt += timestamp - lastTime;
      lastTime = timestamp;
      let numUpdates = 0;
      while (dt >= timestep) {
        demo.update(timestep / 1000);
        dt -= timestep;
        if (numUpdates >= 240) {
          panic();
          break;
        }
      }

      console.log(random);  // DEBUG
      demo.clearCanvas(ctx, canvas, options.clear); // can include alpha value as third option
      demo.draw(ctx);

      if (animationRunning.current) requestAnimationFrame(animationLoop);
    }
    animationRunning.current = true;
    requestAnimationFrame(animationLoop);

    // Discard updates if update times go out of control
    function panic() {
      dt = 0;
      console.log('panic!');
    }

    return function cleanup() {
      animationRunning.current = false;
      demo.inputHandler.unsubscribeToInputHandlers();
      window.removeEventListener('resize', handleResize);
    }
  }, [canvasDimensions.width, canvasDimensions.height, options]);

  return (
    <div className="demo" id="demo">
      <div id="fpsCheck">FPS: {FPS}</div>
      <canvas
        className="crazinessCanvas"
        id="crazinessCanvas"
        ref={canvasRef}
      />
    </div>
  );
}

function debounce(fn, ms) {
  let timer;
  return () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}
