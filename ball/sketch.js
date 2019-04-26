// Create the ball
var ball = {
  x: 100,
  y: 200,
  size: 25,
  velX: 0,
  velY: 0
};
// Gravity
var G = 90;
// Where the floor start
var pisoY = 400;
// Canvas size
var c = {
  wide: 640,
  height: 480
};

function setup() {
  // Create canvas
  createCanvas(c.wide, c.height);
  // Set random velocity to the ball
  ball.velY = random(100, 300);
  ball.velX = random(100, 300);
}

function draw() {
  var fps = frameRate();
  // If the canvas is not updating
  if(fps != 0){
    // Gravity effects
    ball.velY = ball.velY + (G/fps);
    // Move the ball
    ball.y = ball.y + (ball.velY/fps);
    ball.x = ball.x + (ball.velX/fps);
    // Check collisions
    /*
    // Sometimes the ball is going to clip through the limits if
    // we use this functions
    // Side collisions
    if((ball.x + ball.size) > c.wide ||
       (ball.x - ball.size) < 0){
      ball.velX = ball.velX * (-1) * random(0.5, 1.5);
      }
    // Top and bottom collisions
    if((ball.y + ball.size) > pisoY ||
       (ball.y - ball.size) < 0){
      ball.velY = ball.velY * (-1) * random(0.5, 1.5);
      }
    */
    // So we check the colitions and corect the position
    // Right
    if((ball.x + ball.size) > c.wide){
      ball.velX = ball.velX * (-1) * random(0.5, 1.5);
      ball.x = c.wide - ball.size;
    }
    // Lefth
    else if((ball.x - ball.size) < 0){
      ball.velX = ball.velX * (-1) * random(0.5, 1.5);
      ball.x = ball.size;
    }
    // Top
    if((ball.y + ball.size) > pisoY){
      ball.velY = ball.velY * (-1) * random(0.5, 1.5);
      ball.y = pisoY - ball.size;
    }
    // Bottom
    else if((ball.y - ball.size) < 0){
      ball.velY = ball.velY * (-1) * random(0.5, 1.5);
      ball.y = ball.size;
    }
  }

  print(random(0.5, 1.5));

  // Clear the screen
  clear();
  // Draw the background
  background(85, 73, 150, 205);
  // Draw the ball
  fill(173, 13, 67);
  ellipse(ball.x, ball.y, ball.size * 2);
  // Draw the floor
  fill(0);
  rect(0, pisoY, c.wide, c.height-pisoY)
}