import Phaser from 'phaser';

// Constants & Calculated Values
const HULL =   { x:  0, y:    0, width: 82, height: 48 };  // body2
const TRACKS = { x:  0, y: 18.5, width: 74, height: 35 };  // tracks2
const CANNON = { x: 10, y:  -18, width: 48, height: 15 };  // turret2
const TANK = getBoundingBoxDimensions([HULL, TRACKS]);
HULL.offset = getComponentOffset(HULL, TANK);
TRACKS.offset = getComponentOffset(TRACKS, TANK);
CANNON.offset = getComponentOffset(CANNON, TANK);

const TankFactory = {
  register: function() {
    // Make 'tank' available through GameObject Factory (scene.add.tank(x, y))
    Phaser.GameObjects.GameObjectFactory.register('tank', function (x, y) {
      return this.displayList.add(new Tank(this.scene, x, y));
    });
  }
};
export default TankFactory;

class Tank extends Phaser.GameObjects.Container {
  constructor(scene, x, y = TANK.height/2) {
    super(scene, x, y);
    this.scene = scene;

    // Add tank components
    this.cannon = scene.add
      .image(CANNON.offset.x, CANNON.offset.y, 'tanks', 'tanks_turret2.png')
      .setOrigin(0, 0.5);
    this.tracks = scene.add
      .image(TRACKS.offset.x, TRACKS.offset.y, 'tanks', 'tanks_tankTracks2.png');
    this.hull = scene.add
      .image(HULL.offset.x, HULL.offset.y, 'tanks', 'tanks_tankGrey_body2.png');
    this.add([this.cannon, this.tracks, this.hull]);
    this.setSize(TANK.width, TANK.height);

    // Enable the container as a physics body
    scene.physics.world.enable(this);
    this.body
      .setImmovable(true)
      .setCollideWorldBounds(true);

    // Initialize cannon trajectory
    this.projectileVector = new Phaser.Math.Vector2(
      scene.input.activePointer.x - (this.x + this.cannon.x),
      scene.input.activePointer.y - (this.y + this.cannon.y)
    );
  }

  update(t, dt) {
    this.handleMovement();
    this.handleCannonRotation();
  }

  // Expects config object with properties left, right, jump
  handleMovement() {
    const { left, right, jump } = this.controls;

    // Left / Right movement
    if (left.isDown) {
      if (right.isDown && right.timeDown > left.timeDown)
        this.body.velocity.x = 400;
      else
        this.body.velocity.x = -400;
    }
    else if (right.isDown)
      this.body.velocity.x = 400;
    else
      this.body.velocity.x = 0;

    // Jumping
    if (Phaser.Input.Keyboard.JustDown(jump) && this.body.blocked.down)
      this.body.velocity.y = -400;
  }

  handleCannonRotation() {
    this.projectileVector.set(
      this.scene.input.activePointer.x - (this.x + this.cannon.x),
      this.scene.input.activePointer.y - (this.y + this.cannon.y)
    );
    const cannonAngle = this.projectileVector.angle();
    if      (cannonAngle <= Math.PI/2) this.cannon.rotation = 0;
    else if (cannonAngle <= Math.PI)   this.cannon.rotation = Math.PI;
    else                               this.cannon.rotation = cannonAngle;
  }
}

function getBoundingBoxDimensions(components) {
  const b = components.reduce( (acc, cur) => {
    const xMin = -cur.width/2 + cur.x;
    const xMax =  cur.width/2 + cur.x;
    const yMin = -cur.height/2 + cur.y;
    const yMax =  cur.height/2 + cur.y;
    if (xMin < acc.xMin) acc.xMin = xMin;
    if (xMax > acc.xMax) acc.xMax = xMax;
    if (yMin < acc.yMin) acc.yMin = yMin;
    if (yMax > acc.yMax) acc.yMax = yMax;
    return acc;
  }, { xMin: 0, xMax: 0, yMin: 0, yMax: 0 });

  const width = b.xMax - b.xMin;
  const height = b.yMax - b.yMin;
  const offset = {
    x: width/2  - b.xMax,
    y: height/2 - b.yMax,
  };

  return { width, height, offset };
}

function getComponentOffset(component, container) {
  return {
    x: component.x + container.offset.x,
    y: component.y + container.offset.y,
  };
}
