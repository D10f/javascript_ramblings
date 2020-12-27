class Tetrimino {
  constructor() {
    this.pos = createVector(140, -80);
    this.angle = 0;
    this.shape = undefined;
    this.color = undefined;
    this.getRandomShapeAndColor();
    this.blocks = this.getBlockCoordinates();
    this.done = false;
  }

  getRandomShapeAndColor() {
    const idx = floor(random(shapesAndColors.length));
    this.color = shapesAndColors[idx].color;
    this.shape = shapesAndColors[idx].shape;
  }

  getBlockCoordinates(position = this.pos) {
    const blocks = [];
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        if (this.shape[this.angle][4 * y + x] === 1) {
          blocks.push({
            x: position.x + BLOCK_SIZE * x,
            y: position.y + BLOCK_SIZE * y
          });
        }
      }
    }
    return blocks;
  }

  move(x, y) {
    const nextPosition = this.pos.copy();
    nextPosition.add(x, y);

    const nextBlocks = this.getBlockCoordinates(nextPosition);

    for (let i = 0; i < nextBlocks.length; i++) {

      // Check if block is offscreen on the sides
      if (nextBlocks[i].x < 0 || nextBlocks[i].x >= width) {
        return false;
      }

      // Check if block has reached bottom
      if (nextBlocks[i].y >= height) {
        this.done = true;
        return false;
      }

      // Check if block hits another block. If y is < 0, the default,
      // then use 0 to avoid errors retrieving non-existing cell
      const cell = grid.getCell(
        nextBlocks[i].x,
        max(nextBlocks[i].y, 0)
      );

      if (cell.occupied) {

        // Falling on top of another block means this one is done
        if (y > 0) {
          this.done = true;
        }

        return false;
      }
    }

    this.pos = nextPosition;
    this.blocks = nextBlocks;
  }

  turn() {
    this.angle = (this.angle + 1) % 4;
    this.blocks = this.getBlockCoordinates();
  }

  render() {
    fill(this.color);
    this.blocks.forEach(block => {
      rect(block.x, block.y, BLOCK_SIZE);
    });
  }
}

class Grid {
  constructor() {
    this.cols = width / BLOCK_SIZE;
    this.rows = height / BLOCK_SIZE;
    this.cells = this.createGrid();
  }

  createGrid() {
    const grid = [];
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        const cell = {
          x: x * BLOCK_SIZE,
          y: y * BLOCK_SIZE,
          occupied: false,
          color: undefined
        };

        grid.push(cell);
      }
    }
    return grid;
  }

  checkFinishedRows() {
    const finishedRows = [];

    for (let i = 0; i < this.rows; i++) {
      const row = this.cells.slice(this.cols * i, this.cols * i + this.cols);

      const rowFinished = row.every(cell => cell.occupied);

      if (rowFinished) {
        finishedRows.push(BLOCK_SIZE * i);
        row.forEach(cell => cell.occupied = false);
      }
    }

    if (finishedRows.length > 0) {
      for (let i = this.cells.length - 1; i > 0; i--) {
        if (this.cells[i].occupied && this.cells[i].y < max(finishedRows)) {
          this.cells[i].occupied = false;
          this.occupyCell(
            this.cells[i].x,
            this.cells[i].y + BLOCK_SIZE * finishedRows.length,
            this.cells[i].color
          );
        }
      }
    }
  }

  getCell(x, y) {
    const xIdx = x / BLOCK_SIZE;
    const yIdx = y / BLOCK_SIZE;
    return this.cells[this.cols * yIdx + xIdx];
  }

  occupyCell(x, y, c) {
    const cell = this.getCell(x, y);
    cell.color = c;
    cell.occupied = true;
  }

  freeCell(x, y) {
    const cell = this.getCell(x, y);
    cell.occupied = false;
  }

  render() {
    this.cells.forEach(cell => {
      if (cell.occupied) {
        fill(cell.color);
      } else {
        fill(255);
      }
      rect(cell.x, cell.y, BLOCK_SIZE);
    });
  }
}

const BLOCK_SIZE = 20;

let grid, current, next, previous = [];

function setup() {
  createCanvas(300, 400);
  grid = new Grid();
  current = new Tetrimino();
  next = new Tetrimino();
}

function draw() {

  if (frameCount % 60 === 0) {
    current.move(0, BLOCK_SIZE);
  }

  if (current.done) {
    current.blocks.forEach(block => {
      grid.occupyCell(block.x, block.y, current.color);
    });

    previous.push(current);

    current = next;
    next = new Tetrimino();

    grid.checkFinishedRows();
  }

  grid.render();
  // previous.forEach(t => t.render());
  current.render();
}

function keyPressed() {
  switch (keyCode) {
    case UP_ARROW:
      current.turn();
      break;
    case LEFT_ARROW:
      current.move(-BLOCK_SIZE, 0);
      break;
    case RIGHT_ARROW:
      current.move(BLOCK_SIZE, 0);
      break;
    case DOWN_ARROW:
      current.move(0, BLOCK_SIZE);
      break;
    case 32:
      current.move(0, BLOCK_SIZE * 5);
      break;
  }
}

// Tetris shapes actually have different names. Find more about it here:
// https://www.joe.co.uk/gaming/tetris-block-names-221127

const smashboy = {
  0: [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 1, 1, 0,
    0, 1, 1, 0
  ],
  1: [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 1, 1, 0,
    0, 1, 1, 0
  ],
  2: [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 1, 1, 0,
    0, 1, 1, 0
  ],
  3: [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 1, 1, 0,
    0, 1, 1, 0
  ]
};

const hero = {
  0: [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    1, 1, 1, 1
  ],
  1: [
    0, 1, 0, 0,
    0, 1, 0, 0,
    0, 1, 0, 0,
    0, 1, 0, 0
  ],
  2: [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    1, 1, 1, 1
  ],
  3: [
    0, 1, 0, 0,
    0, 1, 0, 0,
    0, 1, 0, 0,
    0, 1, 0, 0
  ]
};

const rhodeIslandZ = {
  0: [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 1, 1, 0,
    1, 1, 0, 0
  ],
  1: [
    0, 0, 0, 0,
    0, 1, 0, 0,
    0, 1, 1, 0,
    0, 0, 1, 0
  ],
  2: [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 1, 1, 0,
    1, 1, 0, 0
  ],
  3: [
    0, 0, 0, 0,
    0, 1, 0, 0,
    0, 1, 1, 0,
    0, 0, 1, 0
  ]
};

const clevelandZ = {
  0: [
    0, 0, 0, 0,
    0, 0, 0, 0,
    1, 1, 0, 0,
    0, 1, 1, 0
  ],
  1: [
    0, 0, 0, 0,
    0, 0, 1, 0,
    0, 1, 1, 0,
    0, 1, 0, 0
  ],
  2: [
    0, 0, 0, 0,
    0, 0, 0, 0,
    1, 1, 0, 0,
    0, 1, 1, 0
  ],
  3: [
    0, 0, 0, 0,
    0, 0, 1, 0,
    0, 1, 1, 0,
    0, 1, 0, 0
  ]
};

const teewee = {
  0: [
    0, 0, 0, 0,
    0, 1, 0, 0,
    1, 1, 1, 0,
    0, 0, 0, 0
  ],
  1: [
    0, 0, 0, 0,
    0, 1, 0, 0,
    0, 1, 1, 0,
    0, 1, 0, 0
  ],
  2: [
    0, 0, 0, 0,
    0, 0, 0, 0,
    1, 1, 1, 0,
    0, 1, 0, 0
  ],
  3: [
    0, 0, 0, 0,
    0, 1, 0, 0,
    1, 1, 0, 0,
    0, 1, 0, 0
  ]
};

const orangeRicky = {
  0: [
    0, 0, 0, 0,
    0, 1, 0, 0,
    0, 1, 0, 0,
    0, 1, 1, 0
  ],
  1: [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 1, 1, 1,
    0, 1, 0, 0
  ],
  2: [
    0, 0, 0, 0,
    0, 1, 1, 0,
    0, 0, 1, 0,
    0, 0, 1, 0
  ],
  3: [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 1, 0,
    1, 1, 1, 0
  ]
};

const blueRicky = {
  0: [
    0, 0, 0, 0,
    0, 0, 1, 0,
    0, 0, 1, 0,
    0, 1, 1, 0
  ],
  1: [
    0, 0, 0, 0,
    0, 0, 0, 0,
    1, 0, 0, 0,
    1, 1, 1, 0
  ],
  2: [
    0, 0, 0, 0,
    0, 1, 1, 0,
    0, 1, 0, 0,
    0, 1, 0, 0
  ],
  3: [
    0, 0, 0, 0,
    0, 0, 0, 0,
    1, 1, 1, 0,
    0, 0, 1, 0
  ]
};

const shapesAndColors = [{
      color: [225, 225, 0],
      shape: smashboy
    },
    {
      color: [100, 175, 225],
      shape: hero
    },
    {
      color: [180, 50, 170],
      shape: rhodeIslandZ
    },
    {
      color: [100, 50, 125],
      shape: clevelandZ
    },
    {
      color: [80, 205, 125],
      shape: teewee
    },
    {
      color: [225, 125, 0],
      shape: orangeRicky
    },
    {
      color: [0, 125, 225],
      shape: blueRicky
    }
  ];
