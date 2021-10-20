import SceneSelector from 'tank/scenes/SceneSelector.js';
import Play from 'tank/scenes/Play.js';
import TankBuilder from 'tank/scenes/TankBuilder.js';
import BombTest from 'tank/scenes/BombTest.js';
import RayTest from 'tank/scenes/RayTest.js';

const sceneMap = [
  { key: 'sceneSelector', scene: SceneSelector, text: 'Scene Selector' },
  { key: 'play',          scene: Play,          text: 'Main Game'      },
  { key: 'tankBuilder',   scene: TankBuilder,   text: 'Tank Test'      },
  { key: 'bombTest',      scene: BombTest,      text: 'Bomb Test'      },
  { key: 'rayTest',       scene: RayTest,       text: 'Ray Test'       },
];

export default sceneMap;
