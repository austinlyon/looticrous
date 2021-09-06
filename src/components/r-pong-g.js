import { useRef, useEffect } from 'react';
import Phaser from 'phaser';
import Play from 'game/scenes/Play.js';
// import GraphicsTest from 'game/scenes/GraphicsTest.js';

const GAME_WIDTH = 1280;
const GAME_HEIGHT = 720;

// An attempt at scaling and fullscreen...
// const config = {
//   type: Phaser.AUTO,
//   scale: {
//     mode: Phaser.Scale.FIT,
//     parent: 'phaserGame',
//     autoCenter: Phaser.Scale.CENTER_BOTH,
//     width: GAME_WIDTH,
//     height: GAME_HEIGHT,
//     },
//   physics: {
//     default: 'arcade',
//     arcade: {
//       debug: false,
//     }
//   },
//   scene: Play,
// };

const config = {
  type: Phaser.AUTO,
  parent: 'phaserGame',
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    }
  },
  scene: Play,
};

export default function RPongG() {
  // console.log('RPongG component is rendering');
  // const targetParentElementId = 'game';
  const gameRef = useRef(null);
  // const canvasRef = useRef(document.getElementByID(''));


  useEffect(() => {
    // console.log('RPongG useEffect has been called');
    const canvas = document.querySelector('#phaserGame canvas');
    if (canvas) canvas.remove();
    // gameRef.current = new GameManager(targetParentElementId);
    // gameRef.current.start();
    gameRef.current = new Phaser.Game(config);
    // canvasRef.current = game.canvas;

    return function cleanup() {
      // console.log('RPongG useEffect is cleaning up');
      gameRef.current?.destroy();
    }
  }, []);

  // When I know more, try using IohPhaser component here
  return (
    <div className="phaserContent">
      <div className="phaserContainer">
        <div id="phaserGame" className="phaserGame">
        </div>
      </div>
    </div>
  );
}
