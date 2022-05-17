// Butterfly Class
// This Butterfly is going to follow the mouse
class Butterfly {
  constructor(x, y){
    this.position = createVector(x, y);
    // Start with 0 velocity and acceleration
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    // Initial angle
    this.angle = PI/2;
  }

  update(){
    // Vector at mouse location
    var mouse = createVector(mouseX, mouseY);
    // Calulate new acacceleration vector
    this.acceleration = p5.Vector.sub(mouse, this.position);
    // Setting the magnitude of that vector
    this.acceleration.setMag(0.4);
    // Calculate new velocity
    this.velocity.add(this.acceleration);
    // Calculate new position
    this.position.add(this.velocity);
    // Calculate the new angle
    this.angle = atan2(this.velocity.y,this.velocity.x) + PI/2;
  }

  draw(){
    // Move the drawing point
    translate(this.position.x, this.position.y);
    // Rotate the butterfly
    rotate(this.angle);
    // Draw a butterfly
    // Wings
    fill(52, 171, 235);
    quad( 0, 0, 0, 10, -30, 35, -30, -20);
    quad( 0, 0, 0, 10,  30, 35,  30, -20);
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
  // Create new Butterfly in center
  butterfly = new Butterfly(width/2, height/2);
}

function draw() {
  background(50);
  // Update and draw Butterfly
  butterfly.update();
  butterfly.draw();
}