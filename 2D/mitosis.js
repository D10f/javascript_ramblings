class Cell {
  constructor(x, y, size = 20, col = undefined) {
    this.pos = createVector(x, y);
    this.size = size;
    this.color = col ? col : color(
      random(100, 255),
      random(100, 200),
      random(100, 255),
      random(150, 200)
    );
  }

  mitosis() {
    return new Cell(this.pos.x, this.pos.y, this.size / 2, this.color);
  }

  clicked(x, y) {
    return dist(this.pos.x, this.pos.y, x, y) < this.size;
  }

  update() {
    this.size = this.size < 20 ? this.size + 0.05 : this.size;
    this.vel = p5.Vector.random2D();
    this.pos.add(this.vel);
  }

  show() {
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size * 2);
  }
}

let cells = [];

function setup() {
  createCanvas(400, 400);
  noStroke();
  for (let i = 0; i < 5; i++) {
    cells.push(new Cell(random(width), random(height)));
  }
}

function draw() {
  background(220);
  cells.forEach(cell => {
    cell.update();
    cell.show();
  });
}

function mousePressed() {
  cells.forEach((cell, idx, arr) => {
    if (cell.clicked(mouseX, mouseY)) {
      arr.splice(idx, 1);

      // avoid "phantom clicks"
      setTimeout(() => {
        cells.push(cell.mitosis());
        cells.push(cell.mitosis());
      }, 0);
    }
  });
}
