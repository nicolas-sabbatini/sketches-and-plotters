let slider;

function setup() {
  createCanvas(800, 600);
  background(96, 75, 112);
  slider  = createSlider(0, 126, 126, 2);
  slider.position(0, 0);
}

function draw() {
  let x = randomGaussian(400, 90);
  let y = randomGaussian(300, 90);
  let c = randomGaussian(127, slider.value());
  let s = randomGaussian(10, slider.value()/10*2);
  fill(c);
  noStroke();
  ellipse(x, y, s);
}