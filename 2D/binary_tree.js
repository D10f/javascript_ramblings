class Tree {
  constructor({
    root,
    init
  }) {
    this.root = new Node({
      value: root,
      x: init.x,
      y: init.y,
      origin: init,
      parent: null
    });
    this.pos = init;
    this.nodes = [this.root];
  }

  addNode(value, x, y) {
    let newNode = this.root.addNode(value, x, y);
    while (!newNode) {
      newNode = this.root.addNode(floor(random(value + 100)), x, y);
    }
    this.nodes.push(newNode);
  }
}

class Node {
  constructor(options) {
    this.pos = createVector(options.x, options.y);
    this.vel = createVector();
    this.acc = createVector();
    this.value = options.value;
    this.parent = options.parent;
    this.origin = options.origin;
    this.maxSpeed = 10;
    this.steeringForce = 0.5;
    this.left = null;
    this.right = null;
  }

  /*
   * addNode(value [,x, y])
   *
   * Creates a new node in a position based on the tree's existing nodes.
   * The parameters x, y are coordinates that refer to an "origin" point
   * that the node will be pulled towards. This origin is based on it's
   * parent's own x, y values plus a fixed offset. The only case x, y
   * will be passed in is when the mouse is clicked to create a new node
   * at that position.
   *
   * Returns the new node created.
   **/

  addNode(value, x, y) {
    // Determine if the node should go left or right
    if (value < this.value && this.left) {
      return this.left.addNode(value, x, y);
    }

    // Determine if new node should be created or recursively call existing
    // node's "addNode" method.
    if (value < this.value && !this.left) {
      const origin = createVector(
        this.pos.x - X_OFFSET,
        this.pos.y + Y_OFFSET
      );
      const newNode = new Node({
        value,
        x: x || origin.x,
        y: y || origin.y,
        origin,
        parent: this
      });
      this.left = newNode;
      return newNode;
    }

    if (value > this.value && this.right) {
      return this.right.addNode(value, x, y);
    }

    if (value > this.value && !this.right) {
      const origin = createVector(
        this.pos.x + X_OFFSET,
        this.pos.y + Y_OFFSET
      );
      const newNode = new Node({
        value,
        x: x || origin.x,
        y: y || origin.y,
        origin,
        parent: this
      });
      this.right = newNode;
      return newNode;
    }
  }

  search(number) {
    if (this.value === number) {
      return this.value;
    }
    if (this.value > number && this.left) {
      return this.left.search(number);
    }
    if (this.value < number && this.right) {
      return this.right.search(number);
    }
  }

  calculateSpeed() {
    this.originDistance = p5.Vector.dist(this.origin, this.pos);
    return map(this.originDistance, 0, 200, 0, this.maxSpeed);
  }

  approachOrigin() {
    const originDirection = p5.Vector.sub(this.origin, this.pos);
    originDirection.setMag(this.calculateSpeed());

    const steer = p5.Vector.sub(originDirection, this.vel);
    steer.limit(this.steeringForce);

    this.applyForce(steer);
  }

  avoidNodes() {
    BinaryTree.nodes.forEach(node => {
      if (node === this) return;
      if (dist(node.pos.x, node.pos.y, this.pos.x, this.pos.y) < 5) {
        this.vel.add(p5.Vector.random2D());
        return;
      }
      if (dist(node.pos.x, node.pos.y, this.pos.x, this.pos.y) < 25) {
        const force = p5.Vector.sub(node.pos, this.pos);
        force.mult(-1);
        force.setMag(0.5);
        this.applyForce(force);
      }
    });
  }

  applyFriction() {
    // Get vector of opposite direction, set mag to friction constant.
    let friction = this.vel.copy();
    friction.normalize();
    friction.mult(-1);
    friction.setMag(FRICTION);

    this.applyForce(friction);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.avoidNodes();
    this.approachOrigin();
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.applyFriction();
  }

  show() {
    if (this.parent) {
      line(
        this.pos.x,
        this.pos.y,
        this.parent.pos.x,
        this.parent.pos.y
      );
    }

    push();
    const b = map(this.pos.y, 255, 0, 0, 465);
    fill(120, 200, b);
    ellipse(this.pos.x, this.pos.y, NODE_SIZE, NODE_SIZE);
    pop();
    stroke(100);
    text(this.value, this.pos.x, this.pos.y);
  }
}

const X_OFFSET = 50;
const Y_OFFSET = 50;
const NODE_SIZE = 30;
const FRICTION = 0.05;
const INIT_NODES = 10;

let BinaryTree;

function setup() {
  createCanvas(600, 465);
  stroke(100);

  const options = {
    root: floor(random(10, 60)),
    init: createVector(width / 2, 25)
  };

  BinaryTree = new Tree(options);

  for (let i = 0; i < INIT_NODES; i++) {
    const randomValue = floor(random(1, 25));
    BinaryTree.addNode(randomValue);
  }
}

function mousePressed() {
  const randomValue = floor(random(1, 100));
  BinaryTree.addNode(randomValue, mouseX, mouseY);
}

function draw() {
  background(225);
  BinaryTree.nodes.forEach(node => {
    node.update();
    node.show();
  });
}
