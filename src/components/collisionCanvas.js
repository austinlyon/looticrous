import { useRef, useEffect } from 'react';
import Game from './../classes/collision/game.js';

export default function CollisionCanvas() {
  // Constants
  const MAX_FPS = 60;  // Set frame rate cap
  const SIMULATION_RATE = 60;  // Updates game state X times per second
  const MAX_UPDATES_BEFORE_PANIC = 30;
  const CANVAS_WIDTH = 1000;
  const CANVAS_HEIGHT = 700;

  // References
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const animationRunning = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    const ctx = canvas.getContext('2d');

    const game = new Game(canvas);
    gameRef.current = game;
    game.start();

    const TIMESTEP = 1000 / SIMULATION_RATE;
    let lastTime = 0;
    let dt = 0;
    function animationLoop(timestamp) {
      // Throttle frame rate to maxFPS
      if (timestamp < lastTime + (1000 / MAX_FPS)) return requestAnimationFrame(animationLoop);

      // Update according to how many timesteps have elapsed
      dt += timestamp - lastTime;
      lastTime = timestamp;
      let numUpdates = 0;
      while (dt >= TIMESTEP) {
        game.update(TIMESTEP / 1000);
        dt -= TIMESTEP;
        if (++numUpdates >= MAX_UPDATES_BEFORE_PANIC) { panic(); break; }
      }

      // Draw
      game.draw(ctx);

      if (animationRunning.current) requestAnimationFrame(animationLoop);
    }
    animationRunning.current = true;
    requestAnimationFrame(animationLoop);

    // Function to discard updates if update times go out of control
    function panic() { dt = 0 }  // TODO Don't fully understand this...

    return function cleanup() {
      animationRunning.current = false;
      game.inputHandler.unsubscribeToInputHandlers();
    }
  }, []);

  return (
    <div className="collisionTest" id="collisionTest">
      <canvas
        id="collisionTestCanvas"
        ref={canvasRef}
      />
    </div>
  );
}
