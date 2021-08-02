import React, { useRef, useEffect } from 'react';
import Game from './../classes/game.js';
import demonBall from './../assets/images/demonBall.png';

export default function GameCanvas() {
  // Constants
  const CANVAS_WIDTH = 1000;
  const CANVAS_HEIGHT = 700;

  // Canvas references
  const canvasRef = useRef(null);

  // Image references
  const ballImageRef = useRef(null);

  useEffect(() => {
    // Crab canvas reference
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
    const game = new Game(CANVAS_WIDTH, CANVAS_HEIGHT, images);
    game.start();

    // Create game loop function
    let lastTime = 0;
    function gameLoop(timestamp) {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      let dt = timestamp - lastTime;
      lastTime = timestamp;

      game.update(dt);
      game.draw(ctx);

      requestAnimationFrame(gameLoop);
    }
    requestAnimationFrame(gameLoop);
  }, []);


  return (
    <div className="game" id="game">
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
