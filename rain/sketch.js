class Drop{
  constructor(){
    this.x = random(0, width);
    this.y = random(-10, height);
    this.z = random(2, 6);
    this.speed = random(3, 10);
  }

  move(){
    this.y += this.speed;
    if(this.y > height){
      this.x = random(0, width);
      this.y = -10;
      this.z = random(2, 6);
      this.speed = random(2, 5) * this.z;
    }
  }

  draw(){
    strokeWeight(this.z);
    line(this.x, this.y, this.x, this.y + 5 + this.z);
  }
}

let rain = new Array(225);

function setup() {
  createCanvas(800,600);
  stroke(255);
  for(let i = 0; i < rain.length; i++){
    rain[i] = new Drop;
  }
  console.log(rain);
}

function draw() {
  background(109, 119, 156);
  rain.forEach((gota) => gota.move());
  rain.forEach((gota) => gota.draw());  
  //rain.move();
  //rain.draw();
}