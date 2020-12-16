// Thanks to @Konsti from Coding Train Discord channel
// for helping out figuring out how to project shadows
// on moving bodies

const CANVAS_WALLS = true;
const RENDER_BODIES = false;

// Matter.js module aliases
const {
  Engine,
  World,
  Bodies,
  Constraint,
  Mouse,
  MouseConstraint,
  Events
} = Matter;

// Matter.js physics engine
const engine = Engine.create();
const world = engine.world;

// Created objects in the "world" are stored here
const bodies = [];

// Boxes are items that cast shadow. Their surfaces are
// tracked separately and calculated on every frame.
const boxes = [];
let surfaces = [];

function setup() {
  const canvas = createCanvas(600, 400);

  // create the ground
  const ground = new Box({
    x: width / 2,
    y: height,
    w: width * 2,
    h: 50,
    options: {
      isStatic: true,
      friction: 0.5,
      restitution: 0.9
    }
  });

  // create the ball
  const light = new Light({
    x: width / 2 + 100,
    y: 100,
    r: 10,
    options: {
      restitution: 0.4,
      friction: 0.3
    }
  });

  // create the pendulum
  const pendulum = new Pendulum({
    x: width / 2,
    y: 100,
    body: light.body,
    options: {
      stiffness: 1,
      length: 100
    }
  });

  // Create a few objects that project shadows...

  const ball1 = new Ball({
    x: 150,
    y: 50,
    r: 10,
    options: {
      noRender: !RENDER_BODIES,
      restitution: 0.55,
      friction: 0.1
    }
  });
  
  const box1 = new Box({
    x: 100,
    y: 100,
    w: 100,
    h: 100,
    options: {
      noRender: !RENDER_BODIES,
      isStatic: true,
      angle: 1
    }
  });
  
  const poly1 = new Polygon({
    x: 200,
    y: 270,
    s: 7,
    r: 40,
    options: {
      noRender: !RENDER_BODIES,
      isStatic: true,
      angle: PI + 0.2
    }
  });

  const poly2 = new Polygon({
    x: 400,
    y: 250,
    s: 6,
    r: 50,
    options: {
      noRender: !RENDER_BODIES,
      isStatic: true
    }
  });
  
  const box2 = new Box({
    x: 470,
    y: 100,
    w: 100,
    h: 100,
    options: {
      noRender: !RENDER_BODIES,
      isStatic: true,
      angle: 1.8
    }
  });
  
  
  // ...and add them to the world
  bodies.push(ball1, box1, box2, poly1, poly2);
  boxes.push(ball1, box1, box2, poly1, poly2);
  
  // create mouse object and constraint
  const mouse = Mouse.create(canvas.elt);
  const mouseconstraint = MouseConstraint.create(engine, {
    mouse
  });
  mouse.pixelRatio = pixelDensity();

  Events.on(mouseconstraint, 'mousedown', (e) => {

    if (e.source.body && e.source.body.id === 2) {
      return false;
    }

    light.c = color(
      random(100, 255),
      random(100, 255),
      random(100, 255)
    );
  });

  if (CANVAS_WALLS) {
    surfaces.push(new Surface(0, 0, width, 0));
    surfaces.push(new Surface(width, 0, width, height));
    surfaces.push(new Surface(width, height, 0, height));
    surfaces.push(new Surface(0, height, 0, 0));
  }

  World.add(world, mouseconstraint);
  bodies.push(ground, pendulum, light);
}

function draw() {
  background(50);

  // run the engine
  Engine.update(engine);

  boxes.forEach(box => {
    box.body.vertices.forEach((vertex, idx, arr) => {
      const nextVertex = (idx + 1) % arr.length;
      surfaces.push(new Surface(
        vertex.x, vertex.y,
        arr[nextVertex].x, arr[nextVertex].y
      ));
    });
  });

  bodies.forEach(body => body.render());

  if (CANVAS_WALLS) {
    surfaces.splice(4);
  } else {
    surfaces = [];
  }
}

class Light extends Ball {
  constructor(props) {
    super(props);
    this.rays = [];
    for (let i = 0; i <= 360; i += 1) {
      this.rays.push(new Ray(this.body.position, radians(i)));
    }
  }

  render() {
    push();
    fill(this.c);
    stroke(this.c);
    ellipse(
      this.body.position.x,
      this.body.position.y,
      this.r * 2
    );
    pop();

    this.rays.forEach(ray => {
      let shortestDist = Infinity;
      let closestPoint = null;

      // Check which surface or wall is closest
      surfaces.forEach(wall => {
        const ip = ray.cast(wall);
        if (!ip) return;

        const distance = dist(
          this.body.position.x, this.body.position.y,
          ip.x, ip.y
        );


        if (distance < shortestDist) {
          shortestDist = distance;
          closestPoint = ip;
        }
      });

      // If there is an intersection point, draw a line to it.
      if (closestPoint) {
        push();
        this.c.setAlpha(25);
        stroke(this.c);
        line(ray.pos.x, ray.pos.y, closestPoint.x, closestPoint.y);
        pop();
      }
    });
  }
}

class Pendulum {
  constructor({ x, y, body, options = {} }) {
    this.sling = Constraint.create({
      pointA: {
        x,
        y
      },
      bodyB: body,
      ...options
    });

    World.add(world, this.sling);
  }

  render() {
    line(
      this.sling.pointA.x,
      this.sling.pointA.y,
      this.sling.bodyB.position.x,
      this.sling.bodyB.position.y
    );
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

class Surface {
  constructor(x1, y1, x2, y2) {
    this.start = createVector(x1, y1);
    this.end = createVector(x2, y2);
  }
}

class Ball {
  constructor({ x, y, r, c = color(225), options = {} }) {
    this.body = Bodies.circle(x, y, r, options);
    this.r = r;
    this.c = c;
    World.add(world, this.body);
  }

  render() {
    push();
    ellipse(
      this.body.position.x,
      this.body.position.y,
      this.r * 2
    );
    pop();
  }
}

class Box {
  constructor({
    x,
    y,
    w,
    h,
    options = {}
  }) {
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    this.noRender = options.noRender || false;
    World.add(world, this.body);
  }

  render() {
    if (this.noRender) return;

    push();
    translate(
      this.body.position.x,
      this.body.position.y
    );

    rotate(this.body.angle);
    fill(225);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
  }
}
