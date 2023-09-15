class Ball {
  constructor() {
    this.size = random(10, 60)
    this.x = random(0 + this.size, canvasWidth - this.size)
    this.y = random(0 + this.size, canvasHeight - this.size)
    this.color = [random(0, 360), random(50, 100), random(30, 55), 0.65]
    this.vel = [random(-200, 200), random(-200, 200)]
  }
}

// Canvas size
let canvasWidth
let canvasHeight

// Balls array
let balls = []

// Amount of balls
const amountBalls = 100

// Function to update balls
function ballUpdate(ball, dt) {
  ball.x += ball.vel[0] * dt
  ball.y += ball.vel[1] * dt
  if (ball.x - ball.size < 0) {
    ball.vel[0] *= -1
    ball.vel[1] += random(-10, 10)
    ball.x = ball.size
  }
  if (ball.y - ball.size < 0) {
    ball.vel[1] *= -1
    ball.vel[0] += random(-10, 10)
    ball.y = ball.size
  }
  if (ball.x + ball.size > canvasWidth) {
    ball.vel[0] *= -1
    ball.vel[1] += random(-10, 10)
    ball.x = canvasWidth - ball.size
  }
  if (ball.y + ball.size > canvasHeight) {
    ball.vel[1] *= -1
    ball.vel[0] += random(-10, 10)
    ball.y = canvasHeight - ball.size
  }
  
}

function ballDraw(ball) {
  noStroke();
  fill(ball.color[0], ball.color[1], ball.color[2], ball.color[3])
  circle(ball.x, ball.y, ball.size * 2)
}


// When the screen resized update canvas size
function windowResized() {
  resizeCanvas(max(windowWidth, 400), max(windowHeight, 400))
  canvasWidth = max(windowWidth, 400)
  canvasHeight = max(windowHeight, 400)
}

function setup() {
  // Create full screen canvas
  createCanvas(windowWidth, windowHeight)
  canvasWidth = windowWidth
  canvasHeight = windowHeight
  for (let i = 0; i < amountBalls; i ++) {
    balls.push(new Ball());
  }
  colorMode('hsl');
}

function draw() {
  background(0, 0, 86, 0.004)
  for (let i = 0; i < amountBalls; i++) {
    ballUpdate(balls[i], deltaTime / 450)
    ballDraw(balls[i])
  }
}
