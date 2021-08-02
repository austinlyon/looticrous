export function detectCollision(ball, gameObject) {
  const ballTop = ball.position.y;
  const ballBottom = ball.position.y + ball.size;
  const ballLeftSide = ball.position.x;
  const ballRightSide = ball.position.x + ball.size;

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
    return true;
  }
  else {
    return false;
  }
}
