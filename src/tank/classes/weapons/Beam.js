import Phaser from 'phaser';
// Import beam muzzle muzzle flash and impact burst here

const beamTexture = 'blue-beam';  // 49 x 13 px
const COOLDOWN = 125;
const DAMAGE = 20;

export default class Beam {
  constructor (scene, raycaster, enemies, tank) {
    this.type = 'beam';
    this.scene = scene;
    this.raycaster = raycaster;
    this.enemies = enemies;
    this.tank = tank;
    this.ray = raycaster.createRay();
    this.beamSprite = scene.add.tileSprite(0, 0, 49, 13, beamTexture)
      .setOrigin(0, 0.5)
      .setVisible(false);
    this.cooldown = 0;
  }

  fire (x, y, rotation) {
    const { scene, raycaster, ray, rayGraphic } = this;
    const enemies = scene.enemies;

    // Map any new enemies added to the scene to the raycaster
    for (const enemyGroup of enemies) {
      raycaster.mapGameObjects(enemyGroup.getChildren(), true);
      if (enemyGroup.bombs) {
        raycaster.mapGameObjects(enemyGroup.bombs.getChildren(), true);
      }
    }

    // Check for ray collisions
    ray.setOrigin(x, y);
    ray.setAngle(rotation);
    const intersection = ray.cast();

    // Draw beam
    this.beamSprite.setPosition(x, y).setRotation(rotation).setVisible(true);
    const beamLine = new Phaser.Geom.Line(x, y, intersection.x, intersection.y);
    this.beamSprite.setSize(Phaser.Geom.Line.Length(beamLine), this.beamSprite.height);

    // Handle collision with enemy
    if (this.cooldown <= 0) {
      if (intersection.object) {
        intersection.object.takeDamage(DAMAGE);
        this.cooldown = COOLDOWN;
      }

    }
  }
}
