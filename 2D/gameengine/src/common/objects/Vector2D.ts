export default class Vector2D {
  constructor(
    public x: number,
    public y: number,
  ) {}

  print() {
    console.log(this.x, this.y);
  }
}
