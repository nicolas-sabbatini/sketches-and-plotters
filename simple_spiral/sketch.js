// Sin variables
let amplitude_sin = 1.1;
let frequency_sin = 4;
// Cos variables
let amplitude_cos = 1.1;
let frequency_cos = 4;

function setup() {
    // Create canvas
    createCanvas(900, 900);
    background(200);
}

function draw() {
    translate(450, 450);
    noFill();
    stroke(100, 20);
    // Draw 100 frames in one
    for (let i = 0; i < 50; i++) {
        let delta_time = (((frameCount - 1) * 5) + (i / 10));
        ellipse(sin(radians(delta_time) * frequency_sin) * (delta_time * amplitude_sin),
            cos(radians(delta_time) * frequency_cos) * (delta_time * amplitude_cos),
            (delta_time/2) < 50 ? delta_time/2 : 50);
    }1
}
