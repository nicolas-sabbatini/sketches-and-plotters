const POINTS_DENSITY = 200;

let points = [];

class Point {
  constructor() {
    this.x = random(800);
    this.y = random(600);
    this.x_offset = random(-1, 1);
    this.y_offset = random(-1, 1);
  }

  move() {
    this.x += this.x_offset;
    this.y += this.y_offset;
  }

  draw() {
    point(this.x, this.y);
  }
}

function calculate_index(x, y) {
  let i_x = floor(x / 50);
  let i_y = floor(y / 50);
  return i_x + i_y * 16;
}

function calculate_neighbor(c_i, canvas_index) {
  let neighbor_points = [];
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let n_i = c_i + i + j * 16;
      if (canvas_index[n_i]) {
        neighbor_points.push(canvas_index[n_i]);
      }
    }
  }
  return neighbor_points.flat();
}

function setup() {
  createCanvas(800, 600);
  let canvas_index = [];
  for (let i = 0; i < POINTS_DENSITY; i++) {
    points.push(new Point());
  }
}

function draw() {
  background(50, 50, 50);

  for (let i = 0; i < points.length; i++) {
    points[i].move();
    if (points[i].x > 800) {
      points[i].x = 0;
    }
    if (points[i].x < 0) {
      points[i].x = 800;
    }
    if (points[i].y > 600) {
      points[i].y = 0;
    }
    if (points[i].y < 0) {
      points[i].y = 600;
    }
  }

  let canvas_index = [];
  for (let i = 0; i < points.length; i++) {
    let c_i = calculate_index(points[i].x, points[i].y);
    if (!canvas_index[c_i]) {
      canvas_index[c_i] = [];
    }
    canvas_index[c_i].push(points[i]);
  }

  strokeWeight(3);
  for (let i = 0; i < (16 * 12); i++) {
    if (canvas_index[i]) {
      let neighbor_points = calculate_neighbor(i, canvas_index);
      for (let j = 0; j < canvas_index[i].length; j++) {
        let p1 = canvas_index[i][j];
        for (let k = 0; k < neighbor_points.length; k++) {
          let p2 = neighbor_points[k];
          const d = dist(p1.x, p1.y, p2.x, p2.y)
          if (d <= 75) {
            stroke(255, 255, 255, 155 - d);
            line(p1.x, p1.y, p2.x, p2.y);
          }
        }
      }
    }
  }

  strokeWeight(7);
  stroke(255);
  for (let i = 0; i < points.length; i++) {
    points[i].draw();
  }

  // strokeWeight(2);
  // stroke(255, 0, 0);
  // noFill();
  // for (let x = 0; x < 16; x++) {
  //   for (let y = 0; y < 12; y++) {
  //     square(x * 50, y * 50, 50);
  //   }
  // }
}
