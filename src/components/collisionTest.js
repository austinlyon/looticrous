import CollisionCanvas from './collisionCanvas';

export default function Home() {
  return (
    <div className="content">
      <div className="collisionControls">
        <div className="collisionInstructions">
          <p style={{fontWeight: 'bold', textAlign: 'center'}}>~ Drag the labeled rectangles around the canvas ~</p>
          <ul>
            <li>
              <p><span style={{fontWeight: 'bold'}}>Target</span> is the stationary object that we'll be testing collision against.</p>
            </li>
            <li>
              <p><span style={{color: 'red', fontWeight: 'bold'}}>Pos 0</span> is the position of a moving object before the simulation/frame update.</p>
            </li>
            <li>
              <p><span style={{color: 'yellow', fontWeight: 'bold'}}>Pos 1</span> is its projected position after the simulation update based on the object's trajectory, but before any collision detection takes place.</p>
            </li>
            <li>
              <p>The <span style={{color: 'lawngreen', fontWeight: 'bold'}}>GREEN</span> rectangle is the object's point of contact, and the green line is a vector normal to the collision surface.</p>
            </li>
            <li>
              <p>The <span style={{color: 'darkviolet', fontWeight: 'bold'}}>PURPLE</span> rectangle is the projected position after update, taking collision resolution into account. The remaining distance the object would have traveled THROUGH the object is now reflected in the direction normal to the contact surface!</p>
            </li>




        </ul>
        </div>
        <div>
          Controls...
        </div>
      </div>
      <div className="gameContainer">
        <CollisionCanvas />
      </div>
    </div>
  );
}
