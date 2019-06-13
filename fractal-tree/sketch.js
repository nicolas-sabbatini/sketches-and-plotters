function setup() {
  createCanvas(800, 600);
  angle = createSlider(0, PI, PI/4, 0.01);
  angle.position(10, 10);
  deep = createInput(10, 'number');
  deep.position(10, 40);
  angleMode(RADIANS);
}

function tree(x, y, a, l, d){
  if (d > 0){
    const x2 = 0 * cos(a) + l * sin(a) + x;
    const y2 = 0 * sin(a) - l * cos(a) + y; 
    stroke(155 * d, 255 / d, 100);
    line(x, y, x2, y2);
    tree(x2, y2, a + angle.value(), l*0.75, d-1);
    tree(x2, y2, a - angle.value(), l*0.75, d-1);
  }
}

function draw() {
  background(0);
  translate(400, 600);  
  stroke(255);
  strokeWeight(5);
  line(0, 0, 0, -100);
  stroke(255,0,0);
  tree(0, 0, 0, 100, deep.value());
}