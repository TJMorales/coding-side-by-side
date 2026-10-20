const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");
// Resize the canvas to match the 600 x 400 window in the Python and Java versions.
canvas.width = 600;
canvas.height = 400;

const ball = { x: 290, y: 190, size: 20, dx: 4, dy: 3 }; // dx, dy: pixels per frame
const paddle = { x: 250, y: canvas.height - 40, width: 100, height: 20 };
const PADDLE_SPEED = 6;

// Remember which keys are held down. The loop moves the paddle every frame.
const keysDown = new Set();
window.addEventListener("keydown", (event) => keysDown.add(event.key));
window.addEventListener("keyup", (event) => keysDown.delete(event.key));

// Rectangle check: true when the two boxes overlap.
function overlaps(a, b) {
  return a.x < b.x + b.width && a.x + a.size > b.x && a.y < b.y + b.height && a.y + a.size > b.y;
}

function gameLoop() {
  // 1. Update: move the paddle and the ball.
  if (keysDown.has("ArrowLeft")) paddle.x = Math.max(0, paddle.x - PADDLE_SPEED);
  if (keysDown.has("ArrowRight")) paddle.x = Math.min(canvas.width - paddle.width, paddle.x + PADDLE_SPEED);
  ball.x += ball.dx;
  ball.y += ball.dy;

  // 2. Collide: flip direction at a wall, the top, or the paddle while moving down.
  if (ball.x < 0 || ball.x + ball.size > canvas.width) ball.dx = -ball.dx;
  if (ball.y < 0 || (ball.dy > 0 && overlaps(ball, paddle))) ball.dy = -ball.dy;
  // Edge case: the ball got past the paddle. Reset it to the center.
  if (ball.y > canvas.height) {
    ball.x = 290;
    ball.y = 190;
  }

  // 3. Draw: clear the last frame, then draw this one.
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.beginPath();
  const r = ball.size / 2;
  ctx.arc(ball.x + r, ball.y + r, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

  // Ask the browser to run gameLoop again before the next screen refresh.
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
