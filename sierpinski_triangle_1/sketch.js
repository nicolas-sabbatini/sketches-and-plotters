let top_pint = [500, 0];
let left_point = [0, 1000];
let right_point = [1000, 1000];
let current_point = [0, 0];

let palettes = [
    [[46, 52, 64], [216, 222, 233]],
    [[89, 110, 121], [228, 232, 209]],
    [[34, 35, 35], [240, 246, 240]],
    [[62, 35, 44], [237, 246, 214]],
    [[198, 186, 172], [30, 28, 50]],
    [[10, 46, 68], [252, 255, 204]],
]

let current_palette = 0;

function setup() {
    // Create canvas
    createCanvas(1000, 1000);
    new_draw(0);
}

function draw() {
    fill(palettes[current_palette][1]);
    noStroke();
    // Draw 100 frames in one
    for (let i = 0; i < 100; i++) {
        new_point();
        ellipse(current_point[0], current_point[1], 1);
    }
}

function new_draw(index_palette) {
    // If the palette dont exist
    if(!palettes[index_palette] || palettes[index_palette].length < 2 ||
        !palettes[index_palette][0] || palettes[index_palette][0].length < 1 ||
        !palettes[index_palette][1] || palettes[index_palette][1].length < 1) {
        return "Palette dont exist";
    }

    // Select new palet
    current_palette = index_palette;

    // Clear background
    background(palettes[current_palette][0]);
    // set draw mode
    fill(palettes[current_palette][1]);
    noStroke();
    // draw corners
    ellipse(top_pint[0], top_pint[1], 5);
    ellipse(left_point[0], left_point[1], 5);
    ellipse(right_point[0], right_point[1], 5);
    // New random start
    new_start();
    ellipse(current_point[0], current_point[1], 1);

    return `Using palette: ${current_palette}`;
}

function new_point() {
    let r = floor(random(0, 3));
    if (r === 0) {
        current_point[0] = floor((current_point[0] + top_pint[0]) / 2);
        current_point[1] = floor((current_point[1] + top_pint[1]) / 2);
    } else if (r === 1) {
        current_point[0] = floor((current_point[0] + left_point[0]) / 2);
        current_point[1] = floor((current_point[1] + left_point[1]) / 2);
    } else {
        current_point[0] = floor((current_point[0] + right_point[0]) / 2);
        current_point[1] = floor((current_point[1] + right_point[1]) / 2);
    }
}

function new_start() {
    let r = floor(random(0, 3));
    if (r === 0) {
        current_point[0] = floor((right_point[0] + top_pint[0]) / 2);
        current_point[1] = floor((right_point[1] + top_pint[1]) / 2);
    } else if (r === 1) {
        current_point[0] = floor((top_pint[0] + left_point[0]) / 2);
        current_point[1] = floor((top_pint[1] + left_point[1]) / 2);
    } else {
        current_point[0] = floor((left_point[0] + right_point[0]) / 2);
        current_point[1] = floor((left_point[1] + right_point[1]) / 2);
    }
}