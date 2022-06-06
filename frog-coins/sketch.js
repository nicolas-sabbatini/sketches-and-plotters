let board = [2, 2, 2, 0, 1, 1, 1];
let selected = null;
const OFFSET_X = 225;
const OFFSET_Y = 250;

function setup() {
  createCanvas(800, 600);
  background(96, 75, 112);
}

function swap(x, y) {
  let temp = board[x];
  board[x] = board[y];
  board[y] = temp;
}

function draw() {
  background(96, 75, 112);
  translate(OFFSET_X, OFFSET_Y);
  for (let i = 0; i < board.length; i++) {
    if (i === selected) {
      fill(100, 100, 200);
    } else {
      fill(51);
    }
    square(i * 50, 0, 50);
    if (board[i] === 1) {
      fill(255, 204, 0);
      circle(i * 50 + 25, 25, 40);
    } else if (board[i] === 2) {
      fill(204);
      circle(i * 50 + 25, 25, 40);
    }
  }
}

function click_on_board(x, y) {
  for (let i = 0; i < board.length; i++) {
    if (x > i * 50 && x < i * 50 + 50 && y > 0 && y < 50) {
      return i;
    }
  }
}

function mouseClicked(event) {
  const mx = mouseX - OFFSET_X;
  const my = mouseY - OFFSET_Y;
  let i = click_on_board(mx, my);
  if (selected === null) {
    selected = i;
  } else {
    swap(selected, i);
    selected = null;
  }
}