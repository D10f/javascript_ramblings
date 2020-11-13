class Circle {
  constructor() {
    this.set();
  }

  isOverlapping(circles) {
    return circles.some(c => c.pos.dist(this.pos) < c.r + this.r);
  }

  set(){
    this.pos = createVector(random(width), random(height));
    this.r = random(2, 40);
  }

  show() {
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}

const totalCircles = 300;
const totalTries = 100;
const circles = [];

function setup() {
  createCanvas(400, 400);
  noStroke();
  fill(20, 80, 100, 100);

  for (let i = 0; i < totalCircles; i++) {
    const newCircle = new Circle();
    let tries = 0;

    while (newCircle.isOverlapping(circles)) {
      if (tries >= totalTries) break;
      newCircle.set();
      tries++;
    }

    if (tries < totalTries) {
      circles.push(newCircle);
    }
  }
}

function draw() {
  background(220);
  circles.forEach(c => {
    c.show();
  });
}
