function setup() {
  createCanvas(800, 600);
  angle = createSlider(0, PI, PI / 4, 0.01);
  angle.position(10, 10);
  deep = createInput(10, 'number');
  deep.position(10, 40);
  angleMode(RADIANS);
}

function tree(x, y, a, l, d) {
  if (d > 0) {
    const x2 = l * sin(a) + x;
    const y2 = l * cos(a) * -1 + y;
    stroke(5 * sqrt(sq(x - x2) + sq(y - y2)), 255 / d, 100);
    line(x, y, x2, y2);
    tree(x2, y2, a + angle.value(), l * 0.75, d - 1);
    tree(x2, y2, a - angle.value(), l * 0.75, d - 1);
  }
}

function draw() {
  background(0);
  translate(400, 600);
  strokeWeight(5);
  tree(0, 0, 0, 100, deep.value());
}
