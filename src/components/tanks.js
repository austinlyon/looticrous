import { useRef, useEffect, useState } from 'react';
import Phaser from 'phaser';
import PhaserRaycaster from 'phaser-raycaster';
import sceneMap from 'tank/SceneMap.js';

// Constants
const GAME_WIDTH = 1280;
const GAME_HEIGHT = 720;

export default function Tanks() {
  const scenes = createOrderedSceneArray(sceneMap);
  const config = createConfig(scenes);
  const gameRef = useRef(null);

  // Set up scene auto-start UI
  const localSelectedScene = localStorage.getItem('selectedScene') || 'mainGame';
  const [selectedScene, setSelectedScene] = useState(localSelectedScene);
  function selectScene(id) {
    setSelectedScene(id);
    localStorage.setItem('selectedScene', id)
  }

  // Create list items for scene auto-start UI
  const listItems = sceneMap.map(scene => {
    return <ListItem
      id = {scene.key}
      key = {scene.key}
      text = {scene.text}
      selectScene = {selectScene}
      selected = {selectedScene === scene.key  ? "active" : null}
    />
  });

  useEffect(() => {
    const canvas = document.querySelector('#phaserGame canvas');
    if (canvas) canvas.remove();
    if (gameRef.current) gameRef.current.destroy();
    gameRef.current = new Phaser.Game(config);

    return function cleanup() {
      gameRef.current?.plugins.removeScenePlugin('PhaserRaycaster');
      gameRef.current?.destroy(true);
    }
  }, [config]);

  return (
    <div className="phaserContent">
      <div className="tankshipSceneSelector">
        <p>Select a scene. This scene will also load automatically on page refresh.</p>
        <ul>{listItems}</ul>
      </div>
      <div className="phaserContainer">
        <div id="phaserGame" className="phaserGame">
        </div>
      </div>
    </div>
  );
}

function ListItem(props) {
  return (
    <li className={props.selected} onClick={() => props.selectScene(props.id)}>
      {props.text}
    </li>
  );
}

// Re-order scenes based on local storage
function createOrderedSceneArray(sceneMap) {
  const startingSceneKey = localStorage.getItem('selectedScene') || 'sceneSelector';
  const startingSceneIndex = sceneMap.reduce((agg, cur, i) => {
    return (cur.key === startingSceneKey) ? i : agg;
  }, 0);
  const sceneMapEdited = sceneMap.slice();
  const startingScene = sceneMapEdited.splice(startingSceneIndex, 1);
  return startingScene.concat(sceneMapEdited).map(obj => obj.scene);
}

function createConfig(scenes) {
  return {
    type: Phaser.AUTO,
    parent: 'phaserGame',
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    pixelArt: false,
    input: {
      gamepad: true,
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 600 },
        debug: true,
      },
    },
    plugins: {
      scene: [
        { key: 'PhaserRaycaster', plugin: PhaserRaycaster, mapping: 'raycasterPlugin' },
      ],
    },
    scene: scenes,
  };
}
