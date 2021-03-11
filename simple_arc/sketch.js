let amplitude_input, amplitude, frequency_input, frequency, func_input;

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

    // Create canvas
    createCanvas(800, 800);
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


function draw() {
    translate(0, 400);
    fill(0);
    // Draw 100 frames in one
    for (let i = 0; i < 100; i++) {
        let delta_time = (((frameCount - 1) * 100) + i);
        if (func_input.value() === 'sin') {
            ellipse(delta_time % 800, sin(radians(delta_time) * frequency) * amplitude, 5);
        } else if (func_input.value() === 'cos') {
            ellipse(delta_time % 800, cos(radians(delta_time) * frequency) * amplitude, 5);
        }
    }
}
