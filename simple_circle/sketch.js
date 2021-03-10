let amplitude_input_cos, amplitude_cos, amplitude_input_sin, amplitude_sin;

function setup() {
    // Create amplitude input
    amplitude_sin = 50;
    amplitude_input_sin = createInput('50', 'number');
    amplitude_input_sin.input(change_amplitude_sin);
    amplitude_input_sin.position(810, 40);
    // Legend
    let amplitude_legend_sin = createElement('p', 'Amplitude sin:');
    amplitude_legend_sin.position(810, 0);

    // Create amplitude input
    amplitude_cos = 50;
    amplitude_input_cos = createInput('50', 'number');
    amplitude_input_cos.input(change_amplitude_cos);
    amplitude_input_cos.position(810, 120);
    // Legend
    let amplitude_legend_cos = createElement('p', 'Amplitude cos:');
    amplitude_legend_cos.position(810, 80);
    
    // Create canvas
    createCanvas(800, 800);
    background(200);
}

function change_amplitude_sin() {
    if (parseFloat(this.value())) {
        amplitude_sin = parseFloat(this.value());
    }
}

function change_amplitude_cos() {
    if (parseFloat(this.value())) {
        amplitude_cos = parseFloat(this.value());
    }
}


function draw() {
    let delta_time = (frameCount % 800);

    translate(400, 400);
    fill(0);
    ellipse(sin(radians(delta_time)) * amplitude_sin, cos(radians(delta_time)) * amplitude_cos, 5);
}