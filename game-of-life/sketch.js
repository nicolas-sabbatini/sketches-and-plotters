class Grid {
  constructor(width, height) {
    this.height = height;
    this.width = width;
    this.prev = [];
    this.next = [];
    for(let x = 0; x < width; x++ ) {
      this.prev[x] = [];
      this.next[x] = [];
      for(let y = 0; y < height; y++) {
        const r = random() > 0.80 ? 1 : 0;
        this.prev[x][y] = r;
        this.next[x][y] = r;
      };
    };
  }

  draw(){
    for(let x = 0; x < this.width; x++ ) {
      for(let y = 0; y < this.height; y++) {
        const flat = (x + y * this.width) * 4;
        let c = this.next[x][y] ? color(90, 163, 92) : color(94, 79, 78);
        pixels[flat + 0] = red(c);
        pixels[flat + 1] = green(c);
        pixels[flat + 2] = blue(c);
        pixels[flat + 3] = 255;
      }
    }
    updatePixels();
  }

  update(){
    const help = this.prev;
    this.prev  = this.next;
    this.next  = help;
    for(let x = 0; x < this.width; x++ ) {
      for(let y = 0; y < this.height; y++) {
        let neighbours = -this.prev[x][y];
        for(let x_offset = -1; x_offset < 2; x_offset++){
          for(let y_offset = -1; y_offset < 2; y_offset++){
            if (x + x_offset >= 0 && x + x_offset < this.width && 
                y + y_offset >= 0 && y + y_offset < this.height) {
              neighbours += this.prev[x + x_offset][y + y_offset];
            } 
          }
        }
        if(this.prev[x][y] == 0 && neighbours == 3) {
          this.next[x][y] = 1;
        } else if (this.prev[x][y] == 1 && (neighbours < 2 || neighbours > 3)) {
          this.next[x][y] = 0;
        } else {
          this.next[x][y] = this.prev[x][y];
        }
      }
    }
    this.draw();
  }

  setCel(x, y) {
    if (x > -1 && x < this.width && y > -1 && y < this.height){
      this.next[x][y] = 1;
    }
  }
}

let grid, time;
function setup() {
  createCanvas(800, 600);
  pixelDensity(0.25)
  loadPixels();
  grid = new Grid(200, 150);
  grid.draw();
  time = 30;
}

function draw() {
  time -= 1;
  if (time < 0){
    grid.update();
    time = 30;
  }
  if (mouseIsPressed === true) {
    grid.setCel(floor(mouseX/4), floor(mouseY/4));
    grid.draw();
  }
}
