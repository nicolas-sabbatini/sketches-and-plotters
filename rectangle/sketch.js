// Points, the first point is duplicated at the end
var p = [[-50, -50], [-50, 50], [50, 50], [50, -50], [-50, -50]];
var offSetX = 0;
var offSetY = 0;
// Scale
var s = 1;
// Angle
var a = 0;
// Pivots
var pX = 0;
var pY = 0;

function setup() {
  createCanvas(1420, 700);
}

function draw() {
  // Get fps
  var fps = frameRate();
  // "Clear" screen
  background(145, 91, 91);
  // 0,0 to the center
  translate(710, 360);
  // Line colors
  stroke(255);
  // Line size
  strokeWeight(2 * s);
  // For each pair of point do the math and draw
  for (let i = 0; i < 4; i++) {
     const x1 = ((p[i][0] + pX) * cos(a) - (p[i][1] + pY) * sin(a) + pX) * s + offSetX;
     const y1 = ((p[i][0] + pX) * sin(a) + (p[i][1] + pY) * cos(a) + pY) * s + offSetY;
     const x2 = ((p[i+1][0] + pX) * cos(a) - (p[i+1][1] + pY) * sin(a) + pX) * s + offSetX;
     const y2 = ((p[i+1][0] + pX) * sin(a) + (p[i+1][1] + pY) * cos(a) + pY) * s + offSetY;
     line(x1, y1, x2, y2); 
  }

  stroke(41, 114, 137);
  fill(41, 114, 137);
  // Pivot of rotation
  circle((pX *s) + offSetX, (pY * s) + offSetY, 5 * s);

  // Move Rectangle
  if (keyIsDown( 87)) offSetY += (-300 / fps);
  if (keyIsDown( 83)) offSetY += ( 300 / fps);
  if (keyIsDown( 65)) offSetX += (-300 / fps);
  if (keyIsDown( 68)) offSetX += ( 300 / fps);
  // Change scale
  if (keyIsDown(107)) s += ( 4 / fps);
  if (keyIsDown(109)) s += (-4 / fps);
  // Change pivots
  if (keyIsDown(   UP_ARROW)) pY += (-100 / fps);
  if (keyIsDown( DOWN_ARROW)) pY += ( 100 / fps);
  if (keyIsDown(RIGHT_ARROW)) pX += ( 100 / fps);
  if (keyIsDown( LEFT_ARROW)) pX += (-100 / fps);
  // Change Angle
  if (keyIsDown( 81)) a += ( 1 / fps);
  if (keyIsDown( 69)) a += (-1 / fps);

  // Text
  strokeWeight(1);
  stroke(0);
  fill(0);
  textSize(20);
  text('Controls: "WASD" move, "QE" rotate, "Arrow key" rotation point, "+-" zoom', -710, -340);
}
