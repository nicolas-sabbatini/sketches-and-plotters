let amplitude_input_cos, amplitude_cos, frequency_input_cos, frequency_cos;
let amplitude_input_sin, amplitude_sin, frequency_input_sin, frequency_sin;

function setup() {
    // Create amplitude input
    amplitude_sin = 50;
    amplitude_input_sin = createInput('50', 'number');
    amplitude_input_sin.input(change_amplitude_sin);
    amplitude_input_sin.position(810, 40);
    // Legend
    let amplitude_legend_sin = createElement('p', 'Amplitude sin:');
    amplitude_legend_sin.position(810, 0);

    // Create frequency input
    frequency_sin = 1;
    frequency_input_sin = createInput('1', 'number');
    frequency_input_sin.input(change_frequency_sin);
    frequency_input_sin.position(810, 120);
    // Legend
    let frequency_sin_legend = createElement('p', 'Frequency sin:');
    frequency_sin_legend.position(810, 80);

    // Create amplitude input
    amplitude_cos = 50;
    amplitude_input_cos = createInput('50', 'number');
    amplitude_input_cos.input(change_amplitude_cos);
    amplitude_input_cos.position(810, 200);
    // Legend
    let amplitude_legend_cos = createElement('p', 'Amplitude cos:');
    amplitude_legend_cos.position(810, 160);

    // Create frequency input
    frequency_cos = 1;
    frequency_input_cos = createInput('1', 'number');
    frequency_input_cos.input(change_frequency_cos);
    frequency_input_cos.position(810, 280);
    // Legend
    let frequency_cos_legend = createElement('p', 'Frequency cos:');
    frequency_cos_legend.position(810, 240);

    // Create canvas
    createCanvas(800, 800);
    background(200);
}

function change_amplitude_sin() {
    if (parseFloat(this.value())) {
        amplitude_sin = parseFloat(this.value());
    }
}

function change_frequency_sin() {
    if (parseFloat(this.value())) {
        frequency_sin = (parseFloat(this.value()) > frequency_sin) ? (parseFloat(frequency_sin) + 0.1).toFixed(1) : (parseFloat(frequency_sin) - 0.1).toFixed(1);
        this.value(frequency_sin);
    }
}

function change_amplitude_cos() {
    if (parseFloat(this.value())) {
        amplitude_cos = parseFloat(this.value());
    }
}

function change_frequency_cos() {
    if (parseFloat(this.value())) {
        frequency_cos = (parseFloat(this.value()) > frequency_cos) ? (parseFloat(frequency_cos) + 0.1).toFixed(1) : (parseFloat(frequency_cos) - 0.1).toFixed(1);
        this.value(frequency_cos);
    }
}


function draw() {
    translate(400, 400);
    fill(0);
    for (let i = 0; i < 100; i++) {
        let delta_time = (((frameCount - 1) * 10) + (i/10));
        ellipse(sin(radians(delta_time) * frequency_sin) * amplitude_sin, cos(radians(delta_time) * frequency_cos) * amplitude_cos, 5);
    }
}