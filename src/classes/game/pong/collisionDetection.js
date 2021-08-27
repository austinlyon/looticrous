export function detectCollisionNew(collider, target) {
  // Position vectors of initial (P0), updated (P1), and distance (D)
  const P0 = collider.prev;
  const P1 = collider.pos;
  const D = {
    x: P1.x - P0.x,
    y: P1.y - P0.y,
  };

  // Individual axis-aligned distances (NOT vectors!) to each extended side of collision rect
  const near = {
    x: target.pos.x - collider.size,
    y: target.pos.y - collider.size,
  };
  const far = {
    x: target.pos.x + target.width + collider.size,
    y: target.pos.y + target.height + collider.size,
  };

  // Percentage of D vector where D intersects with each extended side of collision rect
  // We can think of this as time going from t=0 to t=1, so I've labeled this t
  const t = {
    near: {
      x: (near.x - P0.x) / D.x,
      y: (near.y - P0.y) / D.y,
    },
    far: {
      x: (far.x - P0.x) / D.x,
      y: (far.y - P0.y) / D.y,
    },
  }

  // Swap near and far values so that near is actually closer than far in all cases
  if (t.near.x > t.far.x) {
    const temp = t.near.x;
    t.near.x = t.far.x;
    t.far.x = temp;
  }
  if (t.near.y > t.far.y) {
    const temp = t.near.y;
    t.near.y = t.far.y;
    t.far.y = temp;
  }

  // Checks for collision
  // if (t.near.x > t.far.y || t.near.y > t.far.x) console.log('target missed'); // DEBUG
  if (t.near.x > t.far.y || t.near.y > t.far.x) return false;
  t.hit = {
    near: Math.max(t.near.x, t.near.y),
    far: Math.min(t.far.x, t.far.y),
  }
  // if (t.hit.far < 0) console.log('wrong direction'); // DEBUG
  // if (t.hit.near > 1) console.log('not there yet'); // DEBUG
  if (t.hit.far < 0 || t.hit.near > 1) return false;

  const contactPoint = {
    x: P0.x + D.x * t.hit.near,
    y: P0.y + D.y * t.hit.near,
  }

  let contactNormal;
  if (t.near.x > t.near.y) {
    if (D.x < 0) contactNormal = { x:  1, y: 0 };
    else         contactNormal = { x: -1, y: 0 };
  }
  else {
    if (D.y < 0) contactNormal = { x: 0, y:  1 };
    else         contactNormal = { x: 0, y: -1 };
  }

  // console.log('collision!'); // DEBUG
  console.log();
  return {
    point: { ...contactPoint },
    normal: { ...contactNormal },
    time: t.hit.near,
    dist: { ...D },
  };
}

export function detectCollision(ball, gameObject) {
  const ballTop = ball.pos.y;
  const ballBottom = ball.pos.y + ball.size;
  // const ballLeftSide = ball.pos.x;
  // const ballRightSide = ball.pos.x + ball.size;

  const objectTop = gameObject.pos.y;
  const objectBottom = gameObject.pos.y + gameObject.height;
  const objectLeftSide = gameObject.pos.x;
  const objectRightSide = gameObject.pos.x + gameObject.width;


  if (
    ballBottom >= objectTop
    && ballTop <= objectBottom
    && ball.pos.x >= objectLeftSide
    && ball.pos.x + ball.size <= objectRightSide
  ) {
    return true;
  }
  else {
    return false;
  }
}

export function resolveCollision(ball, gameObject) {
  const ballCenter = {
    x: ball.pos.x,
    y: ball.pos.y,
  }
  const ballPreviousCenter = {
    x: ball.previouspos.x + ball.size/2,
    y: ball.previouspos.y + ball.size/2,
  }
  const expandedObject = {
    xLeft: gameObject.pos.x - ball.size/2,
    xRight: gameObject.pos.x + gameObject.width + ball.size/2,
    yTop: gameObject.pos.y - ball.size/2,
    yBottom: gameObject.pos.y + gameObject.height + ball.size/2,
  }

  const xCheck = ball.speed.x > 0 ? expandedObject.xLeft : expandedObject.xRight;
  const yCheck = ball.speed.y > 0 ? expandedObject.yTop : expandedObject.yBottom;
  const xIntercept = {
    x: xCheck,
    y: (ballCenter.y - ballPreviousCenter.y)
      *(ballCenter.x - xCheck)
      /(ballCenter.x - ballPreviousCenter.x)
      + ballCenter.y,
  }
  const yIntercept = {
    x: (ballCenter.x - ballPreviousCenter.x)
      *(ballCenter.y - yCheck)
      /(ballCenter.y - ballPreviousCenter.y)
      + ballCenter.x,
    y: yCheck,
  }

  const xDistance = magnitude(ballCenter, xIntercept);
  const yDistance = magnitude(ballCenter, yIntercept);
  if (xDistance < yDistance) {
    return 'reflect x';
  }
  else {
    return 'reflect y';
  }

  function magnitude(pos, prev) {
    return Math.sqrt( Math.pow(pos.x - prev.x, 2) - Math.pow(pos.y - prev.y, 2) );
  }
}
