const SEPARATION = 4;
const ROTATION_SPEED = 0.5;
const ANGLE = 137.5;
let n = 0;
let start = 0;

function setup () {
  createCanvas(400, 400);
  angleMode(DEGREES);
  colorMode(HSB);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  rotate(n * ROTATION_SPEED);
  for (let i = 0; i < n; i++) {
    const a = i * ANGLE;
    const r = SEPARATION * sqrt(i);
    const x = r * cos(a);
    const y = r * sin(a);
    let hu = sin(start + i * 0.5);
    hu = map(hu, -1, 1, 0, 360);
    fill(hu, 255, 255);
    noStroke();
    ellipse(x, y, 4, 4);
  }
  n += 4;
  start += 4;
}
