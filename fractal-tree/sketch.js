function setup() {
  createCanvas(800, 600);
  background(0);
  angleMode(RADIANS)
}

function tree(x, y, a, l, d){
  if (d > 0){
    const x2 = 0 * cos(a) + l * sin(a) + x;
    const y2 = 0 * sin(a) - l * cos(a) + y; 
    stroke(155 * d, 255 / d, 100);
    line(x, y, x2, y2);
    tree(x2, y2, a + 0.5, l*0.75, d-1)
    tree(x2, y2, a - 0.5, l*0.75, d-1)
  }
}

function draw() {
  translate(400, 600);  
  stroke(255);
  strokeWeight(5);
  line(0, 0, 0, -100);
  stroke(255,0,0);
  tree(0, 0, 0, 100, 10);
}