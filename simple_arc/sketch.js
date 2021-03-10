let amplitude_input, amplitude, func_input;

function setup() {
    // Create amplitude input
    amplitude = 50;
    amplitude_input = createInput('50', 'number');
    amplitude_input.input(changeAmplitude);
    amplitude_input.position(810, 40);
    // Legend
    let amplitude_legend = createElement('p', 'Amplitude:');
    amplitude_legend.position(810, 0);

    // Function to draw
    func_input = createRadio();
    func_input.option('sin');
    func_input.option('cos');
    func_input.position(810, 120);
    func_input.selected('sin');

    // Legend
    let func_legend = createElement('p', 'Function:');
    func_legend.position(810, 80);


    // Create canvas
    createCanvas(800, 800);
    background(200);
}

function changeAmplitude() {
  if (parseFloat(this.value())) {
    amplitude = parseFloat(this.value());
  }
}


function draw() {
    let delta_time= frameCount % 800;

    translate(0, 400);
    fill(0);
    if (func_input.value() === 'sin') {
        ellipse(delta_time, sin(radians(delta_time)) * amplitude, 5);
    } else if (func_input.value() === 'cos') {
        ellipse(delta_time, cos(radians(delta_time)) * amplitude, 5);
    }
}