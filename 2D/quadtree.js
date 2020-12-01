// Toggle these global options for different visualizations
const SHOW_SECTIONS = true;
const RANGE_SEETHROUGH = false;
const PARTICLE_PERCEPTION = false;

const CAPACITY = 4;

let particles = [];
let rootTree, rootTile;

function setup() {
  createCanvas(400, 400);

  rootTile = new Tile(200, 200, width / 2, height / 2);

  for (let i = 0; i < 80; i++) {
    particles.push(new Particle(random(width), random(height)
      // randomGaussian(width / 2, 80),
      // randomGaussian(height / 2, 80)
    ));
  }
}

function draw() {
  background(220);

  // Re-create quadtree every frame (accounts for particle movement)
  rootTree = new QuadTree(rootTile);
  particles.forEach(p => {
    rootTree.insert(p);
  });

  particles.forEach(p => {
    p.update();

    if (!RANGE_SEETHROUGH) {
      p.render();
    }
  });

  if (SHOW_SECTIONS) {
    rootTree.render();
  }

  if (RANGE_SEETHROUGH) {
    range = new Tile(mouseX, mouseY, 85, 60);
    noFill();
    stroke(175);
    strokeWeight(1);
    rectMode(CENTER);
    rect(range.x, range.y, range.w * 2, range.h * 2);

    rootTree.query(range).forEach(p => p.render());
  }
}

class QuadTree {
  constructor(tile, capacity = CAPACITY) {
    this.boundary = tile;
    this.capacity = capacity;
    this.points = [];
    this.subsections = [];
    this.divided = false;
  }

  insert(p) {
    if (this.points.length < this.capacity) {
      // Insert at current quadtree
      this.points.push(p);
      p.quadTree = this;

    } else if (this.divided) {
      // Determine which quadtree to insert to
      this.subsectionInsert(p);

    } else {
      // Create new set of quadtrees, then insert in one of them
      this.divide();
      this.subsectionInsert(p);
    }
  }

  divide() {
    const { x, y, w, h } = this.boundary;

    // Create 4 new tiles based off current quadtree
    const northwest = new Tile(x - w / 2, y - h / 2, w / 2, h / 2);
    const northeast = new Tile(x + w / 2, y - h / 2, w / 2, h / 2);
    const southwest = new Tile(x - w / 2, y + h / 2, w / 2, h / 2);
    const southeast = new Tile(x + w / 2, y + h / 2, w / 2, h / 2);

    // Create separate quadtrees per tile and append to current one
    this.subsections = [
      new QuadTree(northwest),
      new QuadTree(northeast),
      new QuadTree(southwest),
      new QuadTree(southeast)
    ];

    // Set current quadtree as divided
    this.divided = true;
  }

  subsectionInsert(p) {
    const { x, y, w, h } = this.boundary;

    if (p.x < x && p.y < y) {
      this.subsections[0].insert(p); // add to northwest section

    } else if (p.x > x && p.y < y) {
      this.subsections[1].insert(p); // add to northeast section

    } else if (p.x < x && p.y > y) {
      this.subsections[2].insert(p); // add to southwest section

    } else if (p.x > x && p.y > y) {
      this.subsections[3].insert(p); // add to southeast section
    }
  }

  query(range) {

    if (!this.boundary.intersects(range)) {
      return [];
    }

    let points = this.points.filter(p => range.contains(p));

    if (this.divided) {
      points = [
        ...points,
        ...this.subsections.map(qt => qt.query(range)).flat()
      ];
    }

    return points;
  }

  render() {
    this.boundary.render();

    if (this.divided) {
      this.subsections.forEach(qt => qt.render());
    }
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 5;
    this.highlighted = false;
    this.quadTree = null;
  }

  highlight() {
    this.highlighted = true;
  }

  intersects(p) {
    return dist(this.x, this.y, p.x, p.y) < this.r + p.r;
  }

  update() {
    this.highlighted = false;
    const perception = new Tile(this.x, this.y, 50, 50);

    if (PARTICLE_PERCEPTION) {
      perception.render();
    }

    this.x += random(-1, 1);
    this.y += random(-1, 1);

    const neighbors = rootTree.query(perception);
    neighbors.forEach(p => {
      if (p !== this && p.intersects(this)) {
        this.highlight();
      }
    });
  }

  render() {
    noStroke();
    fill(this.highlighted ? color(255, 100, 0) : color(50, 50, 50));
    ellipse(this.x, this.y, this.r * 2);
  }
}

class Tile {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  contains(p) {
    return (
      p.x > this.x - this.w &&
      p.x < this.x + this.w &&
      p.y > this.y - this.h &&
      p.y < this.y + this.h
    );
  }

  intersects(range) {
    return !(
      range.x - range.w > this.x + this.w ||
      range.x + range.w < this.x - this.w ||
      range.y - range.h > this.y + this.h ||
      range.y + range.h < this.y - this.h
    );
  }

  render() {
    stroke(50);
    strokeWeight(1);
    noFill();
    rectMode(CENTER);
    rect(this.x, this.y, this.w * 2, this.h * 2);
  }
}
