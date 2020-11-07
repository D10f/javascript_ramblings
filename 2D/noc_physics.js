class Walker{
  constructor(x, y){
    this.pos = createVector(x, y)
    this.vel = createVector()
    this.acc = createVector()
  }
  
  update(){
    this.acc = p5.Vector.sub(
      createVector(mouseX, mouseY),
      this.pos
    )
    
    this.acc.setMag(0.1)
    this.vel.limit(5)
    
    this.vel.add(this.acc)
    this.pos.add(this.vel)
  }
  
  show(){
    ellipse(this.pos.x, this.pos.y, 10)
  }
}

let walker

function setup() {
  createCanvas(400, 400)
  background(225)
  noStroke()
  fill(100)
  walker = new Walker(width / 2, height / 2)
}

function draw() {
  walker.update()
  walker.show()
}
