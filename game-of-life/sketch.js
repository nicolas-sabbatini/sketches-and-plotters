let ALIVE_COLOR, DEAD_COLOR;

class Grid {
  constructor(width, height) {
    this.height = height;
    this.width = width;
    this.prev = [];
    this.next = [];
    for (let x = 0; x < width; x++) {
      this.prev[x] = [];
      this.next[x] = [];
      for (let y = 0; y < height; y++) {
        const r = random() > 0.8 ? 1 : 0;
        this.prev[x][y] = r;
        this.next[x][y] = r;
      }
    }
  }

  update() {
    const help = this.prev;
    this.prev = this.next;
    this.next = help;
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        let neighbours = -this.prev[x][y];
        for (let x_offset = -1; x_offset < 2; x_offset++) {
          for (let y_offset = -1; y_offset < 2; y_offset++) {
            if (
              x + x_offset >= 0 &&
              x + x_offset < this.width &&
              y + y_offset >= 0 &&
              y + y_offset < this.height
            ) {
              neighbours += this.prev[x + x_offset][y + y_offset];
            }
          }
        }
        if (this.prev[x][y] == 0 && neighbours == 3) {
          this.next[x][y] = 1;
        } else if (this.prev[x][y] == 1 && (neighbours < 2 || neighbours > 3)) {
          this.next[x][y] = 0;
        } else {
          this.next[x][y] = this.prev[x][y];
        }
        const flat = (x + y * this.width) * 4;
        const c = this.next[x][y] ? color(90, 163, 92) : color(94, 79, 78);
        pixels[flat + 0] = red(c);
        pixels[flat + 1] = green(c);
        pixels[flat + 2] = blue(c);
        pixels[flat + 3] = 255;
      }
    }
    updatePixels();
  }

  setCel(x, y) {
    if (x > -1 && x < this.width && y > -1 && y < this.height) {
      this.next[x][y] = 1;
      const flat = (x + y * this.width) * 4;
      let c = ALIVE_COLOR;
      pixels[flat + 0] = red(c);
      pixels[flat + 1] = green(c);
      pixels[flat + 2] = blue(c);
      pixels[flat + 3] = 255;
      updatePixels();
    }
  }
}

let grid;
function setup() {
  createCanvas(800, 600);
  pixelDensity(0.25);
  loadPixels();
  ALIVE_COLOR = color(90, 163, 92);
  DEAD_COLOR = color(94, 79, 78);
  grid = new Grid(200, 150);
}

function draw() {
  grid.update();
  if (mouseIsPressed === true) {
    for (let x_offset = -1; x_offset < 2; x_offset++) {
      for (let y_offset = -1; y_offset < 2; y_offset++) {
        grid.setCel(floor(mouseX / 4) + x_offset, floor(mouseY / 4) + y_offset);
      }
    }
  }
}
