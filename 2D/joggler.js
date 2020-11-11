let gravity;
let particles = [];

function setup() {
  createCanvas(400, 400);
  noStroke();

  gravity = createVector(0, 0.125);
}

function mousePressed() {
  particles.push(new Particle(mouseX, mouseY));
}

function draw() {
  background(220);

  particles = particles.reduce((acc, particle) => {
    particle.applyForce(gravity);
    particle.update();
    particle.show();
    return (
      particle.vel.y > 0 && particle.pos.y > height
      ? acc
      : [...acc, particle]
    );
  }, []);
}
