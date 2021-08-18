import { useRef, useEffect } from 'react';
import Demo from './../classes/craziness/demo.js';

export default function GameCanvas() {
  // Constants
  const CANVAS_WIDTH = 1000;
  const CANVAS_HEIGHT = 700;

  // Canvas & AnimationState references
  const canvasRef = useRef(null);
  const animationRunning = useRef(true);

  useEffect(() => {
    // Crab canvas reference
    const canvas = canvasRef.current;
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    const ctx = canvas.getContext('2d');

    // Create and initialize demo
    const demo = new Demo(CANVAS_WIDTH, CANVAS_HEIGHT, canvas);
    demo.start();

    // Create animation loop function
    let lastTime = 0;

    function animationLoop(timestamp) {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      // ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
      // ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      let dt = timestamp - lastTime;
      lastTime = timestamp;

      demo.update(dt);
      demo.draw(ctx);

      if (animationRunning.current) requestAnimationFrame(animationLoop);
    }
    requestAnimationFrame(animationLoop);
    return function cleanup() {
      animationRunning.current = false;
      demo.inputHandler.unsubscribeToInputHandlers();
    }
  }, []);

  return (
    <div className="demo" id="demo">
      <canvas
        className="crazinessCanvas"
        id="crazinessCanvas"
        ref={canvasRef}
      />
    </div>
  );
}
