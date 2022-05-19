// Points
let p = [
  // Back points
  [-50, -50, -50], [-50, 50, -50],
  [50, 50, -50], [50, -50, -50], [-50, -50, -50],
  // Front points
  [-50, -50, 50], [-50, 50, 50],
  [50, 50, 50], [50, -50, 50], [-50, -50, 50]
];
// Rotation matrix
let rmX = [];
let rmY = [];
let rmZ = [];
// OffSets
let offSetX = 0;
let offSetY = 0;
let offSetZ = 1;
// Angle
let aX = 10;
let aY = 10;
let aZ = 10;

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
  var fps = frameRate();
  // "Clear" screen
  background(145, 91, 91);
  // 0,0 to the center
  translate(400, 300);
  // Line colors
  stroke(255);
  // Line size
  strokeWeight(2 * offSetZ);
  // Update rotation matrix
  rmX = [[1, 0, 0],
  [0, cos(aX), -sin(aX)],
  [0, sin(aX), cos(aX)]];
  rmY = [[cos(aY), 0, sin(aY)],
  [0, 1, 0],
  [-sin(aY), 0, cos(aY)]];
  rmZ = [[cos(aZ), -sin(aZ), 0],
  [sin(aZ), cos(aZ), 0],
  [0, 0, 1]];
  // For each pair of point do the math and draw
  for (let i = 0; i < 4; i++) {
    const p1 = mtriXvec(rmX, mtriXvec(rmY, mtriXvec(rmZ, p[i])));
    const p2 = mtriXvec(rmX, mtriXvec(rmY, mtriXvec(rmZ, p[i + 1])));
    const p3 = mtriXvec(rmX, mtriXvec(rmY, mtriXvec(rmZ, p[i + 5])));
    const p4 = mtriXvec(rmX, mtriXvec(rmY, mtriXvec(rmZ, p[i + 6])));
    line(p1[0] * offSetZ + offSetX, p1[1] * offSetZ + offSetY,
      p2[0] * offSetZ + offSetX, p2[1] * offSetZ + offSetY);
    line(p1[0] * offSetZ + offSetX, p1[1] * offSetZ + offSetY,
      p3[0] * offSetZ + offSetX, p3[1] * offSetZ + offSetY);
    line(p3[0] * offSetZ + offSetX, p3[1] * offSetZ + offSetY,
      p4[0] * offSetZ + offSetX, p4[1] * offSetZ + offSetY);
  }
  // Move Rectangle
  if (keyIsDown(87)) offSetY += (-300 / fps);
  if (keyIsDown(83)) offSetY += (300 / fps);
  if (keyIsDown(65)) offSetX += (-300 / fps);
  if (keyIsDown(68)) offSetX += (300 / fps);
  if (keyIsDown(109)) offSetZ += (-3 / fps);
  if (keyIsDown(107)) offSetZ += (3 / fps);
  // Change Angle
  if (keyIsDown(LEFT_ARROW)) aY += (1 / fps);
  if (keyIsDown(RIGHT_ARROW)) aY += (-1 / fps);
  if (keyIsDown(UP_ARROW)) aX += (1 / fps);
  if (keyIsDown(DOWN_ARROW)) aX += (-1 / fps);
  if (keyIsDown(81)) aZ += (1 / fps);
  if (keyIsDown(69)) aZ += (-1 / fps);
  // Text
  strokeWeight(1);
  stroke(0);
  fill(0);
  textSize(20);
  text('Controls: "WASD" move, "QE" and "Arrow key" rotate, "+-" zoom', -395, -280);
}
