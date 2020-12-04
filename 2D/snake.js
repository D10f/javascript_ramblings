class Snake {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.dir = createVector(10, 0);
    this.history = [];
    this.tail = 0;
  }

  edgeDetection() {
    if (
      this.pos.x == width ||
      this.pos.x < 0 ||
      this.pos.y == height ||
      this.pos.y < 0
    ) {
      noLoop();
    }
  }

  turn(x, y) {
    this.dir.x = x;
    this.dir.y = y;
  }

  grow() {
    this.tail++;

    // increase speed every 3 foods eaten
    if (this.tail % 3 === 0) {
      frameRate(gameSpeed++);
    }
  }

  renderTail() {
    this.history.forEach(position => {
      fill(100, 225, 100);
      rect(position.x, position.y, 10);

      // Collision detection
      if (p5.Vector.dist(position, this.pos) === 0) {
        noLoop();
      }
    });
  }

  update() {
    this.history.push(this.pos.copy());
    if (this.history.length > this.tail) {
      this.history.shift();
    }

    this.pos.add(this.dir);
    this.edgeDetection();

    if (p5.Vector.dist(this.pos, food.pos) < 10) {
      food.setup();
      this.grow();
    }
  }

  render() {
    fill(120, 200, 70);
    rect(this.pos.x, this.pos.y, 10);
    this.renderTail();
  }
}

let gameSpeed = 12;
let snake, food, cols, rows;

function setup() {
  createCanvas(400, 400);
  frameRate(gameSpeed);
  cols = width / 10;
  rows = height / 10;
  snake = new Snake();
  food = new Food();
}

function draw() {
  background(220);
  snake.update();
  snake.render();
  food.render();
}

function keyPressed() {
  switch (keyCode) {
    case UP_ARROW:
      snake.turn(0, -10);
      break;
    case RIGHT_ARROW:
      snake.turn(10, 0);
      break;
    case DOWN_ARROW:
      snake.turn(0, 10);
      break;
    case LEFT_ARROW:
      snake.turn(-10, 0);
      break;
  }
}

class Food {
  constructor() {
    this.setup();
  }

  setup() {
    this.pos = createVector(
      floor(random(cols)) * 10,
      floor(random(rows)) * 10
    );
  }

  render() {
    fill(255, 100, 100);
    rect(this.pos.x, this.pos.y, 10);
  }
}
