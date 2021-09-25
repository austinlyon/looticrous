import { useRef, useEffect } from 'react';
import Phaser from 'phaser';
import Play from 'tank/Play.js';
import TankBuilder from 'tank/TankBuilder.js';

const GAME_WIDTH = 1280;
const GAME_HEIGHT = 720;

const config = {
  type: Phaser.AUTO,
  parent: 'phaserGame',
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 600 },
      debug: true,
    }
  },
  scene: Play,
};

export default function Tanks() {
  const gameRef = useRef(null);

  useEffect(() => {
    const canvas = document.querySelector('#phaserGame canvas');
    if (canvas) canvas.remove();
    gameRef.current = new Phaser.Game(config);

    return function cleanup() {
      gameRef.current?.destroy();
    }
  }, []);

  return (
    <div className="phaserContent">
      <div className="phaserContainer">
        <div id="phaserGame" className="phaserGame">
        </div>
      </div>
    </div>
  );
}
