import { useRef, useEffect, useState } from 'react';
import Game from './../classes/game/game.js';
import demonBall from './../assets/images/demonBall.png';

export default function OldGameCanvas() {
  // Constants
  const MAX_FPS = 60;  // Set frame rate cap
  const SIMULATION_RATE = 60;  // Updates game state X times per second
  const TIMESTEP = 1000 / SIMULATION_RATE;  // time between updates, in ms
  const MAX_UPDATES_BEFORE_PANIC = 30;
  const CANVAS_WIDTH = 1280;
  const CANVAS_HEIGHT = 720;

  // References
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const animationRef = useRef(null);
  const gameRunning = useRef(true);
  const ballImageRef = useRef(null);

  // State
  const [FPS, setFPS] = useState(60);
  const [nextFrame, setNextFrame] = useState(false);

  useEffect(() => {
    // Grab canvas reference
    const canvas = canvasRef.current;
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    const ctx = canvas.getContext('2d');

    // Grab image references
    const ballImage = ballImageRef.current;
    const images = {
      ball: ballImage,
    };

    // Create and initialize game
    const getNextFrame = (val) => { setNextFrame(val) };
    const game = new Game(canvas, CANVAS_WIDTH, CANVAS_HEIGHT, images, getNextFrame);
    gameRef.current = game;
    game.start();

    // FPS check
    let fps = 60;
    let framesThisSecond = 0;
    let lastFpsUpdate = 0;

    // Create game loop function
    let lastTime = window.performance.now();  // in milliseconds
    let dt = 0;                               // in milliseconds
    function gameLoop(timestamp) {
      // Throttle frame rate to maxFPS
      if (timestamp < lastTime + (1000 / MAX_FPS)) return requestAnimationFrame(gameLoop);

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
      if (game.frameByFrameMode) dt = TIMESTEP;
      lastTime = timestamp;
      let numUpdates = 0;
      while (dt >= TIMESTEP) {
        // if (numUpdates > 0) console.log('Frame Drop!'); // DEBUG
        game.update(TIMESTEP / 1000);
        dt -= TIMESTEP;
        if (++numUpdates >= MAX_UPDATES_BEFORE_PANIC) { panic(); break; }
      }

      // Draw
      game.draw(ctx);

      if (gameRunning.current && !game.frameByFrameMode) requestAnimationFrame(gameLoop);
    }
    animationRef.current = gameLoop;
    gameRunning.current = true;
    requestAnimationFrame(gameLoop);

    // Function to discard updates if update times go out of control
    function panic() { dt = 0; }

    return function cleanup() {
      gameRunning.current = false;
      game.music.src = '';
      game.inputHandler.unregisterAllInputHandlers();
    }
  }, [TIMESTEP]);

  useEffect(() => {
    if (nextFrame || !gameRef.current.frameByFrameMode) {
      requestAnimationFrame(animationRef.current);
    }
  }, [nextFrame]);

  return (
    <div className="game" id="game">
      <div id="fpsCheck">FPS: {FPS}</div>
      <canvas
        className="gameCanvas"
        id="gameCanvas"
        ref={canvasRef}
      />
      <div className="imageContainer" id="imageContainer" style={{display: 'none'}}>
        <img
          src={demonBall}
          alt="demon_ball"
          ref={ballImageRef}
        />
      </div>
    </div>
  );
}
