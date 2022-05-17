class Butterfly {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.angle = PI / 2;
  }

  update() {
    let mouse = createVector(mouseX, mouseY);
    let acceleration = p5.Vector.sub(mouse, this.position);
    acceleration.setMag(0.2);
    this.velocity.add(acceleration);
    this.position.add(this.velocity);
    this.angle = atan2(this.velocity.y, this.velocity.x) + PI / 2;
  }

  draw() {
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    // Wings
    fill(52, 171, 235);
    quad(0, 0, 0, 10, -30, 35, -30, -20);
    quad(0, 0, 0, 10, 30, 35, 30, -20);
    // Body
    fill(155);
    ellipse(0, 10, 10, 30);
    // Head
    fill(255);
    ellipse(0, 0, 15);
  }
}

let butterfly;
function setup() {
  createCanvas(800, 600);
  angleMode(RADIANS);
  noStroke();
  butterfly = new Butterfly(width / 2, height / 2);
}

function draw() {
  background(50);
  butterfly.update();
  butterfly.draw();
}
