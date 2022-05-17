let ball = {
  x: 100,
  y: 200,
  size: 25,
  vel_x: 0,
  vel_y: 0
};
let GRAVITY = 90;
let FLOOR_Y = 400;
let BOX = {
  wide: 640,
  height: 480
};

function setup() {
  // Create canvas
  createCanvas(BOX.wide, BOX.height);
  // Set random velocity to the ball
  ball.vel_y = random(100, 300);
  ball.vel_x = random(100, 300);
}

function draw() {
  let fps = frameRate();
  // If the canvas is not updating
  if (fps != 0) {
    ball.vel_y = ball.vel_y + (GRAVITY / fps);
    ball.y = ball.y + (ball.vel_y / fps);
    ball.x = ball.x + (ball.vel_x / fps);
    // Resolve collisions
    // Right
    if ((ball.x + ball.size) > BOX.wide) {
      ball.vel_x = ball.vel_x * (-1) * random(0.5, 1.5);
      ball.x = BOX.wide - ball.size;
    }
    // Left
    else if ((ball.x - ball.size) < 0) {
      ball.vel_x = ball.vel_x * (-1) * random(0.5, 1.5);
      ball.x = ball.size;
    }
    // Top
    if ((ball.y + ball.size) > FLOOR_Y) {
      ball.vel_y = ball.vel_y * (-1);
      ball.y = FLOOR_Y - ball.size;
    }
    // Bottom
    else if ((ball.y - ball.size) < 0) {
      ball.vel_y = ball.vel_y * (-1) * random(0.5, 1.5);
      ball.y = ball.size;
    }
    ball.vel_x = constrain(ball.vel_x, -300, 300);
    ball.vel_y = constrain(ball.vel_y, -750, 750);
  }

  clear();
  background(85, 73, 150, 205);
  fill(173, 13, 67);
  ellipse(ball.x, ball.y, ball.size * 2);
  fill(0);
  rect(0, FLOOR_Y, BOX.wide, BOX.height - FLOOR_Y)
}
