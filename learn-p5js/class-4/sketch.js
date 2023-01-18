// Canvas size variables
let canvasWidth
let canvasHeight

// When the screen resized update canvas size
function windowResized() {
  resizeCanvas(max(windowWidth, 400), max(windowHeight, 400))
  // Update size variables
  canvasWidth = max(windowWidth, 400)
  canvasHeight = max(windowHeight, 400)
  // Redraw background
  background(0, 0, 20)
  restartDrawVariables()
}

// Draw variables
let rotation, x, y, staticX, staticY, velX, velY, drawColor, previousKey, dt

function setup() {
  // Create canvas
  createCanvas(windowWidth, windowHeight)
  // Set upp canvas size variables
  canvasWidth = windowWidth
  canvasHeight = windowHeight
  // Set color mode
  colorMode('hsl')
  // Set angle mode
  angleMode('degrees')
  // Draw background
  background(0, 0, 20)
  // Randomize variables
  restartDrawVariables()
  // Set an arbitrary step time
  dt = 0.75
}

function draw() {
  // Update variables
  rotation += dt * 5;
  x += velX * dt
  y += velY * dt
  // If x or y is outside of the canvas
  if (x < 0) {
    x = 0
    velX *= -1
    velY += random(-10, 10)
  } if (x > canvasWidth) {
    x = canvasWidth
    velX *= -1
    velY += random(-10, 10)
  } if (y < 0) {
    y = 0
    velY *= -1
    velX += random(-10, 10)
  } if (y > canvasHeight) {
    y = canvasHeight
    velY *= -1
    velX += random(-10, 10)
  }


  // Check key presses
  if (keyIsPressed) {
    // Space to restart
    if (key === ' ') {
      background(0, 0, 20)
      restartDrawVariables()
    } else if (keyCode % 5 === 0) {
      drawCircles(x, y, drawColor)
    } else if (keyCode % 5 === 1) {
      drawSpiralLines(x, y, rotation, drawColor)
    } else if (keyCode % 5 === 2) {
      drawFlower(staticX, staticY, rotation, drawColor)
    } else if (keyCode % 5 === 3 && key !== previousKey) {
      drawStaticRect(x, y, rotation, drawColor)
    }
    previousKey = key
  }
}

// When key is released variables are randomized
function keyReleased() {
  previousKey = ''
  restartDrawVariables()
}


// Restart variables
function restartDrawVariables() {
  drawColor = random(0, 361);
  x = random(0, canvasWidth)
  y = random(0, canvasHeight)
  staticX = random(0, canvasWidth)
  staticY = random(0, canvasHeight)
  velX = random(-10, 10)
  velY = random(-10, 10)
  rotation = random(0, 360)
}