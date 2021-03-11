// Sin variables
let amplitude_sin = 0.5;
let frequency_sin = 0.5;
// Cos variables
let amplitude_cos = 0.5;
let frequency_cos = 0.5;

function setup() {
    // Create canvas
    createCanvas(1000, 1000);
    background(0);
}

function draw() {
    translate(450, 450);
    noFill();
    stroke(255, 5);
    // Draw 100 frames in one
    for (let i = 0; i < 50; i++) {
        let delta_time = (((frameCount - 1) * 5) + (i / 10));
        ellipse(
            sin(radians(delta_time) * frequency_sin) * (delta_time * amplitude_sin) / 2,
            cos(radians(delta_time) * frequency_cos) * (delta_time * amplitude_cos) / 2,
            sin(radians(delta_time) * frequency_sin) * (delta_time * amplitude_sin),
            cos(radians(delta_time) * frequency_cos) * (delta_time * amplitude_cos));
        ellipse(
            sin(radians(delta_time) * frequency_sin) * (delta_time * amplitude_sin) / 2,
            cos(radians(delta_time) * frequency_cos) * (delta_time * amplitude_cos) / 2,
            cos(radians(delta_time) * frequency_cos) * (delta_time * amplitude_cos) / 2,
            sin(radians(delta_time) * frequency_sin) * (delta_time * amplitude_sin) / 2);
    }
}

