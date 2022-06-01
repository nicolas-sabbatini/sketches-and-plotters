// Points, the first point is duplicated at the end
const p = [[-50, -50], [-50, 50], [50, 50], [50, -50], [-50, -50]];
// Rotation matrix
let rm = [];
// To move rectangle
let offSetX = 0;
let offSetY = 0;
// Scale
let s = 1;
// Angle
let a = 0;

// Multiply matrix and a vector
function mtriXvec(ma, ve) {
  let r = new Array();
  for (let i in ma) {
    let sum = 0;
    for (let k in ma[i]) {
      sum += (ma[i][k] * ve[k]);
    }
    r[i] = sum;
  }
  return r;
}

function setup() {
  createCanvas(800, 600);
}

function draw() {
  // Get fps
  let fps = frameRate();
  // "Clear" screen
  background(145, 91, 91);
  // 0,0 to the center
  translate(400, 300);
  // Line colors
  stroke(255);
  // Line size
  strokeWeight(2 * s);
  // Calculate the new rotation matrix
  rm = [[cos(a), sin(a)],
  [-sin(a), cos(a)]];
  // For each pair of point do the math and draw
  for (let i = 0; i < 4; i++) {
    const p1 = mtriXvec(rm, p[i]);
    const p2 = mtriXvec(rm, p[i + 1]);
    line(p1[0] * s + offSetX, p1[1] * s + offSetY,
      p2[0] * s + offSetX, p2[1] * s + offSetY);
  }

  // Move Rectangle
  if (keyIsDown(87)) offSetY += (-300 / fps);
  if (keyIsDown(83)) offSetY += (300 / fps);
  if (keyIsDown(65)) offSetX += (-300 / fps);
  if (keyIsDown(68)) offSetX += (300 / fps);
  // Change scale
  if (keyIsDown(107)) s += (4 / fps);
  if (keyIsDown(109)) s += (-4 / fps);
  // Change Angle
  if (keyIsDown(81)) a += (1 / fps);
  if (keyIsDown(69)) a += (-1 / fps);

  // Text
  strokeWeight(1);
  stroke(0);
  fill(0);
  textSize(20);
  text('Controls: "WASD" move, "QE" rotate, "+-" zoom', -395, -280);
}
