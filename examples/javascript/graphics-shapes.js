// The page already has <canvas id="screen" width="400" height="300">.
const canvas = document.getElementById("screen");
// getContext("2d") returns the object that does all the drawing.
const ctx = canvas.getContext("2d");

// Fill the whole canvas first to set the background color.
ctx.fillStyle = "lightblue";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// (0, 0) is the top-left corner, and y goes down.
// fillRect(x, y, width, height) starts at the top-left corner of the shape.
ctx.fillStyle = "green";
ctx.fillRect(0, 240, 400, 60); // grass
ctx.fillStyle = "firebrick";
ctx.fillRect(120, 140, 160, 100); // school building
ctx.fillStyle = "saddlebrown";
ctx.fillRect(180, 190, 40, 50); // door

// A circle is a path: arc(centerX, centerY, radius, startAngle, endAngle).
// Angles are in radians, so a full circle ends at Math.PI * 2.
ctx.beginPath();
ctx.arc(330, 60, 30, 0, Math.PI * 2);
ctx.fillStyle = "gold";
ctx.fill();
ctx.strokeStyle = "orange";
ctx.lineWidth = 2;
ctx.stroke(); // outline the same path

// fillText's y is the baseline of the text. textAlign centers it on x.
ctx.fillStyle = "black";
ctx.font = "bold 16px Arial";
ctx.textAlign = "center";
ctx.fillText("Vista Ridge", 200, 120);
