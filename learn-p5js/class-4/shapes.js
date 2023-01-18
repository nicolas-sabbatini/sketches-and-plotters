function drawCircles(x, y, drawColor) {
    push()
    translate(x, y)
    let s = map(x, 0, canvasWidth, 35, 100)
    let l = map(y, 0, canvasHeight, 45, 75)
    let size = map(x + y, 0, canvasWidth + canvasHeight, 5, 200)
    noStroke()
    fill(drawColor, s, l, 0.4)
    circle(0, 0, size)
    pop()
}

function drawSpiralLines(x, y, rotation, drawColor) {
    push()
    translate(x, y)
    rotate(rotation)
    let s = map(x, 0, canvasWidth, 35, 100)
    let l = map(y, 0, canvasHeight, 45, 75)
    let weight = map(x + y, canvasWidth + canvasHeight, 0, 1, 5)
    let length = map(x + y, canvasWidth + canvasHeight, 0, 30, 150)
    stroke(drawColor, s, l, 0.4)
    strokeWeight(weight)
    line(-length / 2, -length / 2, length / 2, length / 2)
    pop()
}

function drawFlower(x, y, rotation, drawColor) {
    push()
    translate(x, y)
    rotate(rotation)
    let s = map(x, 0, canvasWidth, 35, 100)
    let l = map(y, 0, canvasHeight, 45, 75)
    let length = random(35, 70)
    stroke(drawColor, s, l, 0.4)
    line(0, 0, 0, length)
    noStroke()
    fill(drawColor, s, l, 0.4)
    circle(0, length, length / 5 )
    pop()
}

function drawStaticRect(x, y, rotation, drawColor) {
    push()
    translate(x, y)
    rotate(rotation)
    rectMode(CENTER);
    let s = map(x, 0, canvasWidth, 35, 100)
    let l = map(y, 0, canvasHeight, 45, 75)
    let sizeX = random(10, map(x, 0, canvasWidth, 50, 150))
    let sizeY = random(10, map(y, canvasHeight, 0, 50, 100))
    noStroke()
    fill(drawColor, s, l, 0.4)
    rect(0, 0, sizeX, sizeY, 50, 50, 50, 50)
    pop()
}

function drawStaticStar(x, y, rotation, drawColor) {
    push()
    translate(x, y)
    rotate(rotation)
    let s = map(x, 0, canvasWidth, 35, 100)
    let l = map(y, 0, canvasHeight, 45, 75)
    
}