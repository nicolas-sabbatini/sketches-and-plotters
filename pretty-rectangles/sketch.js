const CANVAS_WIDTH = 1080;
const CANVAS_HEIGHT = 1080;

const PALLETE = [
  {
    name: "reeses-puffs-1-bit",
    background: "#6f4d3d",
    stroke: "#cb9867",
  },
  {
    name: "reeses-puffs-1-bit-negative",
    background: "#cb9867",
    stroke: "#6f4d3d",
  },
  {
    name: "runes-spells",
    background: "#000412",
    stroke: "#d9b982",
  },
  {
    name: "runes-spells-negative",
    background: "#d9b982",
    stroke: "#000412",
  },
  {
    name: "peachy-keen",
    background: "#facab8",
    stroke: "#242234",
  },
  {
    name: "peachy-keen-negative",
    background: "#242234",
    stroke: "#facab8",
  },
  {
    name: "ys-funky-jam",
    background: "#920244",
    stroke: "#fec28c",
  },
  {
    name: "ys-funky-jam-negative",
    background: "#fec28c",
    stroke: "#920244",
  },
  {
    name: "mac-paint",
    background: "#8bc8fe",
    stroke: "#051b2c",
  },
  {
    name: "mac-paint-negative",
    background: "#051b2c",
    stroke: "#8bc8fe",
  },
  {
    name: "bitbee",
    background: "#292b30",
    stroke: "#cfab4a",
  },
  {
    name: "bitbee-negative",
    background: "#cfab4a",
    stroke: "#292b30",
  },
  {
    name: "black-and-white",
    background: "#ffffff",
    stroke: "#000000",
  },
  {
    name: "black-and-white-negative",
    background: "#000000",
    stroke: "#ffffff",
  },
  {
    name: "knockia3310",
    background: "#212c28",
    stroke: "#72a488",
  },
  {
    name: "knockia3310-negative",
    background: "#72a488",
    stroke: "#212c28",
  },
  {
    name: "1-bit-pepper",
    background: "#100101",
    stroke: "#ebb5b5",
  },
  {
    name: "1-bit-pepper-negative",
    background: "#ebb5b5",
    stroke: "#100101",
  },
  {
    name: "obra-dinn-commodore-1084",
    background: "#40318e",
    stroke: "#88d7de",
  },
  {
    name: "obra-dinn-commodore-1084-negative",
    background: "#88d7de",
    stroke: "#40318e",
  },
];

let div, pallete_selector, generate_button, generate_shadow_button, save_button;
let background_color = "#ffffff";
let stroke_color = "#000000";

/**
 * Changes the background color of the canvas
 * @param {string} new_color - new background color on hex format (#ffffff)
 * @returns {void} - nothing
 * */
function change_background_color(new_color) {
  background_color = new_color;
}

/**
 * Changes the stroke color of the canvas
 * @param {number} new_color - new stroke color on hex format (#ffffff)
 * @returns {void} - nothing
 * */
function change_stroke_color(new_color) {
  stroke_color = new_color;
}

/**
 * Changes the background and stroke color of the canvas
 * @param {string} background - new background color on hex format (#ffffff)
 * @param {string} stroke - new stroke color on hex format (#ffffff)
 * @returns {void} - nothing
 * */
function change_color_palette(background, stroke) {
  change_background_color(background);
  change_stroke_color(stroke);
}

/**
 * Fills the canvas with a grid of rectangles with a gap between them
 * @param {number} rectangle_size - size of the rectangle in percentage of the canvas
 * @param {number} gap_size - size of the gap between rectangles in percentage of the canvas
 * @param {number} margin_size - size of the margin between the canvas and the grid in percentage of the canvas
 * @param {boolean} clear_canvas - if true, clears the canvas before drawing the grid
 * @param {boolean} center - if true, overides margin and centers the grid in the canvas
 * @param {number} margin_offset - offset of the margin in units (px) if the `center` param is true
 * @param {number} prob - probability of drawing a rectangle inside a rectangle
 * @returns {void} - nothing
 * */
function generate_grid(
  rectangle_size = 0.1,
  gap_size = 0.03,
  margin_size = 0.17,
  clear_canvas = true,
  center = true,
  margin_offset = 0.0,
  prob = 0.5
) {
  console.log(rectangle_size, gap_size, margin_size);
  const RECTANGLE_WIDTH = CANVAS_WIDTH * rectangle_size;
  const RECTANGLE_HEIGHT = CANVAS_HEIGHT * rectangle_size;

  const RECTANGLE_GAP = CANVAS_WIDTH * gap_size;

  let GRID_MARGIN_X = CANVAS_WIDTH * margin_size;
  let GRID_MARGIN_Y = CANVAS_HEIGHT * margin_size;
  console.log(GRID_MARGIN_X, GRID_MARGIN_Y);

  const INER_OFFSET = CANVAS_WIDTH * 0.02;

  const STROKE_SIZE = CANVAS_WIDTH * 0.01;

  const ROWS = floor(
    (CANVAS_WIDTH - GRID_MARGIN_X * 2) / (RECTANGLE_WIDTH + RECTANGLE_GAP)
  );
  const COLS = floor(
    (CANVAS_HEIGHT - GRID_MARGIN_Y * 2) / (RECTANGLE_HEIGHT + RECTANGLE_GAP)
  );
  console.log(ROWS, COLS);

  if (clear_canvas) {
    background(background_color);
  }

  if (center) {
    GRID_MARGIN_X =
      (CANVAS_WIDTH - RECTANGLE_WIDTH * ROWS - RECTANGLE_GAP * (ROWS - 1)) / 2 +
      margin_offset;
    GRID_MARGIN_Y =
      (CANVAS_HEIGHT - RECTANGLE_HEIGHT * COLS - RECTANGLE_GAP * (COLS - 1)) /
        2 +
      margin_offset;
    console.log(GRID_MARGIN_X, GRID_MARGIN_Y);
  }

  stroke(stroke_color);
  fill(background_color);
  strokeWeight(STROKE_SIZE);
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      const x = GRID_MARGIN_X + (RECTANGLE_WIDTH + RECTANGLE_GAP) * i;
      const y = GRID_MARGIN_Y + (RECTANGLE_HEIGHT + RECTANGLE_GAP) * j;
      rect(x, y, RECTANGLE_WIDTH, RECTANGLE_HEIGHT);

      if (random() < prob) {
        strokeWeight(STROKE_SIZE * 2);
        rect(
          x + INER_OFFSET / 2,
          y + INER_OFFSET / 2,
          RECTANGLE_WIDTH - INER_OFFSET,
          RECTANGLE_HEIGHT - INER_OFFSET
        );
        strokeWeight(STROKE_SIZE);
      }
    }
  }
}

/**
 * Fills the canvas with a grid of rectangles with a gap between them and a shadow
 * @param {number} prob - probability of drawing a rectangle inside a rectangle
 * @returns {void} - nothing
 * */
function generate_grid_with_shadow() {
  generate_grid(0.1, 0.03, 0.17, true, true, 5.5, 1);
  generate_grid(0.1, 0.03, 0.17, false, true, -5.5, 0.5);
}

/**
 * Changes the color palette of the canvas
 * @returns {void} - nothing
 * */
function change_pallete() {
  const pallete_name = pallete_selector.value();
  for (const pallete of PALLETE) {
    if (pallete.name === pallete_name) {
      change_color_palette(pallete.background, pallete.stroke);
      break;
    }
  }
}

/**
 * Saves the canvas as a png file
 * @returns {void} - nothing
 * */
function save_image() {
  saveCanvas(`pretty-rectangles-${pallete_selector.value()}`, "png");
}

function setup() {
  div = select("#controls");

  pallete_selector = createSelect();
  for (const pallete of PALLETE) {
    pallete_selector.option(pallete.name);
  }
  pallete_selector.selected("black-and-white");
  pallete_selector.changed(change_pallete);
  pallete_selector.parent(div);

  generate_button = createButton("Generate new image");
  generate_button.mousePressed(() => generate_grid());
  generate_button.parent(div);

  generate_shadow_button = createButton("Generate new image with shadow");
  generate_shadow_button.mousePressed(generate_grid_with_shadow);
  generate_shadow_button.parent(div);

  save_button = createButton("Save");
  save_button.mousePressed(save_image);
  save_button.parent(div);

  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  background(background_color);
  generate_grid();
}
