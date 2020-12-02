const CANVAS_WALLS = true;

let boundaries = [];
let light;

function setup() {
  createCanvas(400, 400);
  stroke(255);

  for (let i = 0; i < 5; i++) {
    const randx = randomGaussian(width / 2, 50);
    const randy = randomGaussian(height / 2, 50);
    const b = new Boundary(
      randx,
      randy,
      randx + random(-125, 125),
      randy + random(-125, 125)
    );
    boundaries.push(b);
  }

  light = new Light(width / 2, height / 2);

  if (CANVAS_WALLS) {
    boundaries.push(new Boundary(0, 0, width, 0));
    boundaries.push(new Boundary(width, 0, width, height));
    boundaries.push(new Boundary(width, height, 0, height));
    boundaries.push(new Boundary(0, height, 0, 0));
  }
}

function draw() {
  background(50);
  stroke(255);
  strokeWeight(1);

  boundaries.forEach(b => b.render());
  light.update();
  light.render();
}

function mousePressed() {
  light.color = color(
    random(100, 255),
    random(100, 255),
    random(100, 255),
    100
  );
}

class Light {
  constructor(x, y, c = color(255, 100)) {
    this.pos = createVector(x, y);
    this.xOff = random(25);
    this.yOff = random(25);
    this.rays = [];
    this.color = c;

    for (let i = 0; i <= 360; i += 1) {
      this.rays.push(new Ray(this.pos, radians(i)));
    }
  }

  update(x, y) {
    this.pos.set(noise(this.xOff) * width, noise(this.yOff) * height);

    this.xOff += 0.0045;
    this.yOff += 0.0045;

    // reset position to center if light leaves canvas
    if (this.pos.x < 0 ||
      this.pos.x > width ||
      this.pos.y < 0 ||
      this.pos.y > height
    ) {
      this.pos.x = width / 2;
      this.pos.y = height / 2;
    }
  }

  render() {
    fill(this.color);
    stroke(this.color);
    ellipse(this.pos.x, this.pos.y, 20);

    this.rays.forEach(ray => {
      let shortestDist = Infinity;
      let closestPoint = null;

      // Check which wall is closest
      boundaries.forEach(wall => {
        const ip = ray.cast(wall);
        if (!ip) return;

        const distance = p5.Vector.dist(this.pos, ip);
        if (distance < shortestDist) {
          shortestDist = distance;
          closestPoint = ip;
        }

      });

      // If there is an intersection point, draw a line to it.
      if (closestPoint) {
        line(ray.pos.x, ray.pos.y, closestPoint.x, closestPoint.y);
      }
    });
  }
}

class Ray {
  constructor(pos, angle) {
    this.pos = pos;
    this.dir = p5.Vector.fromAngle(angle);
  }

  cast(wall) {

    // Start and end points of the wall
    const x1 = wall.start.x;
    const y1 = wall.start.y;
    const x2 = wall.end.x;
    const y2 = wall.end.y;

    // Ray's current position and direction
    const x3 = this.pos.x;
    const y3 = this.pos.y;
    const x4 = this.pos.x + this.dir.x;
    const y4 = this.pos.y + this.dir.y;

    // Denominator used to calcualte intersection point between
    // two lines. If it's 0 lines are perfectly parallel.
    const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (denominator === 0) {
      return false;
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator;

    // Check if these two lines intersect at any point, and return that point.
    if (t > 0 && t < 1 && u > 0) {
      const ip = createVector(
        x1 + t * (x2 - x1),
        y1 + t * (y2 - y1)
      );

      return ip;
    }
  }
}

class Boundary {
  constructor(x1, y1, x2, y2) {
    this.start = createVector(x1, y1);
    this.end = createVector(x2, y2);
  }

  render() {
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }
}
