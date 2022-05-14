let amplitude_input, amplitude, frequency_input, frequency, func_input;
let redraw_button, draw_status, stop_button, canvas, screenshot_button;

function setup() {
  // Create amplitude input
  amplitude = 50;
  amplitude_input = createInput('50', 'number');
  amplitude_input.input(change_amplitude);
  amplitude_input.position(810, 40);
  // Legend
  let amplitude_legend = createElement('p', 'Amplitude:');
  amplitude_legend.position(810, 0);

  // Create frequency input
  frequency = 1;
  frequency_input = createInput('1', 'number');
  frequency_input.input(change_frequency);
  frequency_input.position(810, 120);
  // Legend
  let frequency_legend = createElement('p', 'Frequency:');
  frequency_legend.position(810, 80);


  // Function to draw
  func_input = createRadio();
  func_input.option('sin');
  func_input.option('cos');
  func_input.position(810, 200);
  func_input.selected('sin');
  // Legend
  let func_legend = createElement('p', 'Function:');
  func_legend.position(810, 160);

  redraw_button = createButton('Clear');
  redraw_button.position(810, 240);
  redraw_button.mousePressed(clear_bg);

  stop_button = createButton('I/O Draw');
  stop_button.position(910, 240);
  stop_button.mousePressed(stop_draw);
  draw_status = true;

  screenshot_button = createButton('Screenshot');
  screenshot_button.position(810, 280);
  screenshot_button.mousePressed(screenshot);

  // Create canvas
  canvas = createCanvas(800, 800);
  background(200);
}

function change_amplitude() {
  if (parseFloat(this.value())) {
    amplitude = parseFloat(this.value());
  }
}

function change_frequency() {
  if (parseFloat(this.value())) {
    frequency = (parseFloat(this.value()) > frequency) ? (parseFloat(frequency) + 0.1).toFixed(1) : (parseFloat(frequency) - 0.1).toFixed(1);
    this.value(frequency);
  }
}

function clear_bg() {
  background(200);
}

function stop_draw() {
  draw_status = !draw_status;
}

function screenshot() {
  saveCanvas(canvas, "Simple_Arc_" + Date.now().toString(), "png");
}

function draw() {
  if (!draw_status) {
    return;
  }
  translate(0, 400);
  fill(0);
  // Draw 100 frames in one
  for (let i = 0; i < 25; i++) {
    let x_position = (((frameCount - 1) * 25) + i);
    if (func_input.value() === 'sin') {
      ellipse(x_position % 800, sin(radians(x_position) * frequency) * amplitude, 5);
    } else if (func_input.value() === 'cos') {
      ellipse(x_position % 800, cos(radians(x_position) * frequency) * amplitude, 5);
    }
  }
}
