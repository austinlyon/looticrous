export function detectCollision(ball, gameObject) {
  const ballTop = ball.position.y;
  const ballBottom = ball.position.y + ball.size;
  // const ballLeftSide = ball.position.x;
  // const ballRightSide = ball.position.x + ball.size;

  const objectTop = gameObject.position.y;
  const objectBottom = gameObject.position.y + gameObject.height;
  const objectLeftSide = gameObject.position.x;
  const objectRightSide = gameObject.position.x + gameObject.width;


  if (
    ballBottom >= objectTop
    && ballTop <= objectBottom
    && ball.position.x >= objectLeftSide
    && ball.position.x + ball.size <= objectRightSide
  ) {
    console.log('collision detected!');
    return true;
  }
  else {
    return false;
  }
}

export function resolveCollision(ball, gameObject) {
  const ballCenter = {
    x: ball.position.x + ball.size/2,
    y: ball.position.y + ball.size/2,
  }
  const ballPreviousCenter = {
    x: ball.previousPosition.x + ball.size/2,
    y: ball.previousPosition.y + ball.size/2,
  }
  const expandedObject = {
    xLeft: gameObject.position.x - ball.size/2,
    xRight: gameObject.position.x + gameObject.width + ball.size/2,
    yTop: gameObject.position.y - ball.size/2,
    yBottom: gameObject.position.y + gameObject.height + ball.size/2,
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
