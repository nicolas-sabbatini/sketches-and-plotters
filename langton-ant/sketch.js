// General config
const WIDTH = 900;
const HEIGHT = 900;
const GRID_WIDTH = WIDTH / 3;
const GRID_HEIGHT = HEIGHT / 3;
// Actions
const CONTINUE = 0;
const TURN_LEFT = -1;
const TURN_RIGHT = 1;
const TURN_AROUND = 2;
// Directions
const MOVE_UP = 0;
const MOVE_RIGHT = 1;
const MOVE_DOWN = 2;
const MOVE_LEFT = 3;

function drawPixel(x, y, color) {
  noStroke();
  fill(color);
  rect(x * 3, y * 3, 3);
}

class Ant {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dir = 0;
  }

  move() {
    if (this.dir === MOVE_UP) {
      this.y = (this.y + GRID_HEIGHT - 1) % GRID_HEIGHT;
    } else if (this.dir === MOVE_RIGHT) {
      this.x = (this.x + GRID_WIDTH + 1) % GRID_WIDTH;
    } else if (this.dir === MOVE_DOWN) {
      this.y = (this.y + GRID_HEIGHT + 1) % GRID_HEIGHT;
    } else if (this.dir === MOVE_LEFT) {
      this.x = (this.x + GRID_WIDTH - 1) % GRID_WIDTH;
    }
  }

  draw() {
    drawPixel(this.x, this.y, "#000000");
  }
}

class Rule {
  constructor(from, to, action) {
    this.id = Math.floor(Math.random() * 1000000000000000);
    this.from = from;
    this.to = to;
    this.action = action;
  }
}

let grid, div, generate_button, ants;
let rules = [];
let speed = 1;
let backgroundColor = "#FFFFFF";
let numberOfAnts = 1;

const speedSlider = {
  slider: null,
  text: null,
};

const startAnts = {
  text: null,
  btnAdd: null,
  btnRemove: null,
  total: 1,
};

const backgroundColorInput = {
  text: null,
  input: null,
};

const newRules = {
  rules: [
    // RLR
    new Rule("#FFFFFF", "#5D69C2", TURN_RIGHT),
    new Rule("#5D69C2", "#F58142", TURN_LEFT),
    new Rule("#F58142", "#FFFFFF", TURN_RIGHT),
    // RL 2
    // new Rule("#FFFFFF", "#5D69C2", TURN_RIGHT),
    // new Rule("#5D69C2", "#FFFFFF", TURN_LEFT),
    // RRLL 4
    // new Rule("#FFFFFF", "#5D69C2", TURN_RIGHT),
    // new Rule("#5D69C2", "#F58142", TURN_RIGHT),
    // new Rule("#F58142", "#4FD19B", TURN_LEFT),
    // new Rule("#4FD19B", "#FFFFFF", TURN_LEFT),
  ],
  div: null,
};

// Recorder data
let recordButton = null;

function record() {
  // Clear chunks
  let chunks = [];
  // Create arecorder
  let stream = document.querySelector("canvas").captureStream(30),
    recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (e) => {
    if (e.data.size) {
      chunks.push(e.data);
    }
  };
  recorder.onstop = () => {
    // Transform chunks to blob
    let blob = new Blob(chunks);
    // Create a link to download the file
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = `langton-ant-${new Date().getTime()}.webm`;
    a.click();
    // Remove link
    window.URL.revokeObjectURL(url);
  };
  // Start recording
  recorder.start();
  // Change recorder button action
  recordButton.mousePressed(() => {
    recorder.stop();
    recordButton.html("Record");
    recordButton.mousePressed(() => {
      record();
    });
  });
  // Change recorder button text
  recordButton.html("Stop record");
}
// end recorder

function drawNewRules() {
  newRules.div.html("");

  const createRuleDiv = () => {
    const ruleDiv = createDiv();
    ruleDiv.addClass("rule");
    ruleDiv.parent(newRules.div);
    return ruleDiv;
  };

  const createRuleSelect = (div) => {
    const action = createSelect();
    action.parent(div);
    action.option("Turn left", TURN_LEFT);
    action.option("Turn right", TURN_RIGHT);
    action.option("Turn around", TURN_AROUND);
    action.option("Continue", CONTINUE);
    return action;
  };

  for (let rule of newRules.rules) {
    const ruleDiv = createRuleDiv();

    const from = createColorPicker(rule.from);
    from.parent(ruleDiv);
    from.attribute("disabled", "true");

    const action = createRuleSelect(ruleDiv);
    action.selected(rule.action);
    action.attribute("disabled", "true");

    const to = createColorPicker(rule.to);
    to.parent(ruleDiv);
    to.attribute("disabled", "true");

    const btnRemove = createButton("Remove");
    btnRemove.parent(ruleDiv);
    btnRemove.mousePressed(() => {
      newRules.rules = newRules.rules.filter((r) => r.id !== rule.id);
      drawNewRules();
    });
  }

  const hr = createDiv("<hr>");
  hr.parent(newRules.div);
  const addRuleDiv = createRuleDiv();
  const from = createColorPicker("#FFFFFF");
  from.parent(addRuleDiv);
  const action = createRuleSelect(addRuleDiv);
  action.parent(addRuleDiv);
  const to = createColorPicker("#000000");
  to.parent(addRuleDiv);
  const btnAdd = createButton("Add");
  btnAdd.parent(addRuleDiv);
  btnAdd.mousePressed(() => {
    newRules.rules.push(
      new Rule(
        from.value().toUpperCase(),
        to.value().toUpperCase(),
        parseInt(action.value())
      )
    );
    drawNewRules();
  });
}

function setupControls() {
  div = select("#controls");

  const createContainer = () => {
    const container = createDiv();
    container.addClass("container");
    container.parent(div);
    return container;
  };

  const saveButton = createButton("Save image");
  saveButton.parent(div);
  saveButton.mousePressed(() => {
    saveCanvas(`langton-ant-${new Date().getTime()}`, "png");
  });

  recordButton = createButton("Record");
  recordButton.parent(div);
  recordButton.mousePressed(() => {
    record();
  });

  const speedDiv = createContainer();
  speedSlider.text = createSpan("Speed controler: 1");
  speedSlider.text.parent(speedDiv);
  speedSlider.slider = createSlider(0, 1000, 10, 10);
  speedSlider.slider.parent(speedDiv);

  const p = createP("New Draw Oprions:");
  p.parent(div);

  const antsDiv = createContainer();
  startAnts.text = createSpan("Number of ants: 1");
  startAnts.text.parent(antsDiv);
  const btnDiv = createDiv();
  btnDiv.addClass("btnDiv");
  btnDiv.parent(antsDiv);
  startAnts.btnAdd = createButton("+ 1");
  startAnts.btnAdd.parent(btnDiv);
  startAnts.btnAdd.addClass("addRemoveBtn");
  startAnts.btnAdd.mousePressed(() => {
    startAnts.total++;
    startAnts.text.html(`Number of ants: ${startAnts.total}`);
  });
  startAnts.btnRemove = createButton("- 1");
  startAnts.btnRemove.parent(btnDiv);
  startAnts.btnRemove.addClass("addRemoveBtn");
  startAnts.btnRemove.mousePressed(() => {
    startAnts.total--;
    if (startAnts.total < 1) {
      startAnts.total = 1;
    }
    startAnts.text.html(`Number of ants: ${startAnts.total}`);
  });

  const backgroundColorDiv = createContainer();
  backgroundColorInput.text = createSpan("Background color: ");
  backgroundColorInput.text.parent(backgroundColorDiv);
  backgroundColorInput.input = createColorPicker(backgroundColor);
  backgroundColorInput.input.addClass("backgroundColorSelector");
  backgroundColorInput.input.parent(backgroundColorDiv);

  const rules = createP("Rules:");
  rules.parent(div);

  newRules.div = createContainer();
  drawNewRules();

  const resetButton = createButton("Reset");
  resetButton.parent(div);
  resetButton.mousePressed(() => {
    startSimulation();
  });
}

function startSimulation() {
  backgroundColor = backgroundColorInput.input.value().toUpperCase();

  background(backgroundColor);
  ants = [];
  for (let i = 0; i < startAnts.total; i++) {
    ants.push(new Ant(Math.floor(GRID_WIDTH / 2), Math.floor(GRID_HEIGHT / 2)));
  }
  grid = [];
  for (let i = 0; i < GRID_WIDTH; i++) {
    grid.push([]);
    for (let j = 0; j < GRID_HEIGHT; j++) {
      grid[i].push(backgroundColor);
    }
  }
  rules = [];
  for (let rule of newRules.rules) {
    rules.push(new Rule(rule.from, rule.to, rule.action));
  }
}

function setup() {
  createCanvas(WIDTH, HEIGHT);
  setupControls();
  startSimulation();
}

function handleUi() {
  if (speedSlider.slider.value() !== speed) {
    speed = speedSlider.slider.value();
    speedSlider.text.html("Speed controler: " + speed);
  }
}

function draw() {
  handleUi();
  for (let i = 0; i < speed; i++) {
    for (let ant of ants) {
      let pixelColor = grid[ant.x][ant.y];
      for (let rule of rules) {
        if (rule.from !== pixelColor) {
          continue;
        }
        grid[ant.x][ant.y] = rule.to;
        drawPixel(ant.x, ant.y, rule.to);
        let action = rule.action;
        ant.dir = (ant.dir + action + 4) % 4;
        ant.move();
        break;
      }
      ant.draw();
    }
  }
}
