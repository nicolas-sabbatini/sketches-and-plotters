// TODO add camera
let button;
let sel;
let tex;

// Default Binary tree
let start = 'A';
let len = 300;
let angle = 45;
let rules = [
  {in: 'A', out: 'F[-A]+A'},
  {in: 'F', out: 'FF'}
];

/* Dictionary
  A, F = Draw foward
  + = Turn right
  - = Turn left
  X, Y = Do nothing
  B = Blank space
*/

function switchRules(){
  if (sel.value() == 'Binary tree') {
    start = 'A';
    len = 300;
    angle = 45;
    rules = [
      {in: 'A', out: 'F[-A]+A'},
      {in: 'F', out: 'FF'}
    ];
  } else if (sel.value() == 'Cantor set') {
    start = 'A';
    len = 300;
    rules = [
      {in: 'A', out: 'ABA'},
      {in: 'B', out: 'BBB'},
    ];
  } else if (sel.value() == 'Koch curve') {
    start = 'F';
    len = 300;
    angle = 90;
    rules = [
      {in: 'F', out: 'F+F-F-F+F'},
    ];
  } else if (sel.value() == 'Sierpinski triangle 1') {
    start = 'F-A-A';
    len = 300;
    angle = 120;
    rules = [
      {in: 'F', out: 'F-A+F+A-F'},
      {in: 'A', out: 'AA'},
    ];
  } else if (sel.value() == 'Sierpinski triangle 2') {
    start = 'A';
    len = 300;
    angle = 60;
    rules = [
      {in: 'A', out: 'F-A-F'},
      {in: 'F', out: 'A+F+A'},
    ];
  } else if (sel.value() == 'Dragon curve') {
    start = 'FX';
    len = 300;
    angle = 90;
    rules = [
      {in: 'X', out: 'X+YF+'},
      {in: 'Y', out: '-FX-Y'},
    ];
  } else if (sel.value() == 'Fractal plant') {
    start = 'X';
    len = 300;
    angle = 25;
    rules = [
      {in: 'X', out: 'F+[[X]-X]-F[-FX]+X'},
      {in: 'F', out: 'FF'},
    ];
  } else if (sel.value() == 'Fractal tree') {
    start = 'F';
    len = 300;
    angle = 25;
    rules = [
      {in: 'F', out: 'FF+[+F-F-F]-[-F+F+F]'},
    ];
  }
  tex.remove();
  tex = createP(start);
  turtle();
}

function turtle(){
  background(40);
  resetMatrix();
  translate(width / 2, height);
  stroke(255, 125);
  len *= 0.5;
  for(let letter of start){
    if (letter == 'A' || letter == 'F') {
      line(0, 0, 0, -len);
      translate(0, -len);
    } else if (letter == 'B') {
      translate(0, -len);
    } else if (letter == '+') {
      rotate(angle);
    } else if (letter == '-') {
      rotate(-angle)
    } else if (letter == '[') {
      push();
    } else if (letter == ']') {
      pop();
    }
  }
}

function nextWord(){
  let newWord = '';
  for(let letter of start){
    let find = false
    for(let rule of rules){
      if(letter == rule.in){
        newWord += rule.out;
        find = true;
        break;
      }
    }
    if(!find){
      newWord += letter; 
    }
  }
  start = newWord;
  tex.remove();
  tex = createP(start);
  turtle();
}

function setup() {
  createCanvas(500, 500);
  background(40);
  angleMode(DEGREES);
  sel = createSelect();  
  sel.position(510, 10);
  sel.option('Binary tree');
  sel.option('Cantor set');
  sel.option('Koch curve');
  sel.option('Sierpinski triangle 1');
  sel.option('Sierpinski triangle 2');
  sel.option('Dragon curve');
  sel.option('Fractal plant');
  sel.option('Fractal tree');
  sel.changed(switchRules); 
  tex = createP(start);
  turtle();
  button = createButton('Next Word');
  button.position(510, 50);
  button.mousePressed(nextWord);
}
