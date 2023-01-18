let offset = 0;

function setup() {
  createCanvas(800, 800);
  background(200);
}

function draw() {

  // Some time offset
  offset += deltaTime / 30;

  // Clear background
  colorMode('rgb');
  background(200);

  // Top left quadrant
  colorMode('hsl');
  strokeWeight(10);
  for (let i = 20; i < width / 2; i += 25) {
    stroke(Math.abs(Math.floor(i - 10 - offset)) % 360, 45, 50);
    // stroke(Math.floor(i - 10 + offset) % 360, 45, 50); // Static color
    // line((i + offset) % (width / 2), 0, i, height / 2 - 10); // Trippy 
    line((i + offset) % (width / 2), 0, (i + offset) % (width / 2), height / 2 - 10);
  }

  // Top right quadrant
  colorMode('hsl');
  noStroke();
  for (let y = 15; y < height / 2 - 15; y += 17) {
    if (y % 2 === 0) {
      for (let x = width / 2; x < width; x += 55) {
        fill(Math.abs(Math.floor((- x + y) / 2 - offset)) % 360, 45, 50);
        circle(x, y, 20);
      }
    } else {
      for (let x = width / 2 + 27.5; x < width; x += 55) {
        fill(Math.abs(Math.floor((- x + y) / 2 - offset)) % 360, 45, 50);
        circle(x, y, 20);
      }
    }
  }

  // Bottom left quadrant
  colorMode('hsl');
  noStroke();
  for (let y = height / 2 + 10; y < height; y += 30) {
    for (let x = 0; x < width / 2 - 10; x += 30) {
      if (((y / 10) % 2 === 1) !== ((x / 10) % 2 === 1)) {
        fill(Math.abs(Math.floor((x - y) / 2 - offset)) % 360, 45, 50);
        push();
        translate(x + 15, y + 15)
        rotate((y / 10) % 2 === 1 ? offset / 10 : -offset / 10);
        square(-15, -15, 30)
        pop();
      }
    }
  }

  // Bottom right quadrant
  colorMode('hsl');
  strokeWeight(10);
  // Pythagorean theorem
  let hypotenuse = sqrt(Math.pow(height / 2, 2) + Math.pow(width / 2, 2))
  for (let i = 0; i < hypotenuse; i += 20) {
    stroke(Math.floor(i + offset) % 360, 45, 50);
    if (i === 0) { stroke(i % 360, 0, 50) }
    let x = Math.cos(PI / 4) * i
    let y = Math.sin(PI / 4) * i
    
    if (i < hypotenuse / 2 ) {
      elongate = i * 0.70
    } else { 
      elongate =  200 - (i - (hypotenuse / 2)) * 0.7
    }
    line((width / 2) + x - elongate, height - y - elongate, (width / 2) + x + elongate, height + elongate - y);
  }

  colorMode('rgb');
  strokeWeight(20);
  stroke(0);
  line(width / 2, 0, width / 2, height);
  line(0, height / 2, width, height / 2);
}
