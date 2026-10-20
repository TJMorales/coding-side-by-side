const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");

const SIZE = 20;
const STEP = 20;
let x = 190; // top-left corner of the square, starting in the center
let y = 140;

function draw() {
  // Clear the old frame, then draw the square at its new spot.
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "royalblue";
  ctx.fillRect(x, y, SIZE, SIZE);
}

function moveTo(newX, newY) {
  // Edge case: clamp keeps the square inside the canvas.
  x = Math.max(0, Math.min(canvas.width - SIZE, newX));
  y = Math.max(0, Math.min(canvas.height - SIZE, newY));
  // The canvas does not redraw by itself, so call draw() after every change.
  draw();
}

// A listener is a plain function. The browser calls it with an event object.
// offsetX and offsetY are the click position inside the canvas.
canvas.addEventListener("click", (event) => {
  moveTo(event.offsetX - SIZE / 2, event.offsetY - SIZE / 2);
});

// A canvas does not get key events by default, so listen on the whole window.
window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") moveTo(x - STEP, y);
  else if (event.key === "ArrowRight") moveTo(x + STEP, y);
  else if (event.key === "ArrowUp") moveTo(x, y - STEP); // y goes down
  else if (event.key === "ArrowDown") moveTo(x, y + STEP);
  else return;
  // Stop the arrow key from also scrolling the page.
  event.preventDefault();
});

draw();
