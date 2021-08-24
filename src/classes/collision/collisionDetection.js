export function detectCollision(collider, target) {
  // Position vectors of initial (P0), updated (P1), and distance (D)
  const P0 = collider.getCenter(collider.prev);
  const P1 = collider.getCenter(collider.pos);
  const D = {
    x: P1.x - P0.x,
    y: P1.y - P0.y,
  };

  // Individual distances (there are NOT vectors) to each side of target rect
  // Width of target rect is expanded by collider.side/2 to detect collision at CENTER of collider
  const near = {
    x: target.pos.x - collider.width / 2,
    y: target.pos.y - collider.height / 2,
  };
  const far = {
    x: target.pos.x + target.width + collider.width / 2,
    y: target.pos.y + target.height + collider.height / 2,
  };

  // These are the distances along D at which D collides with near and far sides of target
  const collision = { // TODO Rename this to distance? Dt? Something like that? THis is definitly a TIME vector, at t=1 (normalized by dividing by D component)
    near: {
      x: (near.x - P0.x) / D.x,
      y: (near.y - P0.y) / D.y,
    },
    far: {
      x: (far.x - P0.x) / D.x,
      y: (far.y - P0.y) / D.y,
    },
  };

  // Since we're not sure if the LEFT side of target is NEAR, we just switch them so it makes sense
  // This will essentially take our direction into account without having to worry about it
  if (collision.near.x > collision.far.x) {
    const temp = collision.near.x;
    collision.near.x = collision.far.x;
    collision.far.x = temp;
  }
  if (collision.near.y > collision.far.y) {
    const temp = collision.near.y;
    collision.near.y = collision.far.y;
    collision.far.y = temp;
  }

  // This nifty rule takes care of everything! This simply detects if a collition has occured
  //   regardless of direction
  if ( collision.near.x > collision.far.y || collision.near.y > collision.far.x) {
    return false;
  }

  // Gets the time value (0-1 from our normalized distance vector) of the collision
  collision.hit ={
    near: Math.max(collision.near.x, collision.near.y),
    far: Math.min(collision.far.x, collision.far.y),
  }
  if (collision.hit.far < 0) {
    return false;
  }  // collision in opposite direction
  if (collision.hit.near > 1) {
    return false;
  }


  const contactPoint = {
    x: P0.x + D.x * collision.hit.near,
    y: P0.y + D.y * collision.hit.near,
  };

  let contactNormal;
  if (collision.near.x > collision.near.y) {
    if (D.x < 0) contactNormal = { x:  1, y: 0 };
    else         contactNormal = { x: -1, y: 0 };
  }
  else {
    if (D.y < 0) contactNormal = { x: 0, y:  1 };
    else         contactNormal = { x: 0, y: -1 };
  }

  const collisionObj = {
    point: { ...contactPoint },
    normal: { ...contactNormal },
    time: collision.hit.near,
    dist: { ...D },
  }

  return collisionObj;
}
