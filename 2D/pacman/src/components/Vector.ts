class Vector {

    // private magnitude: number;
    // private direction: number;

    constructor(public x: number, public y: number) {}

    distance(v: Vector) {
        return Math.sqrt(
            (v.x - this.x) * (v.x - this.x) +
            (v.y - this.y) * (v.y - this.y)
        );
    }

    set(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(v: Vector) {
        this.x += v.x;
        this.y += v.y;
    }

    subtract(v: Vector) {
        return new Vector(
            this.x - v.x,
            this.y - v.y,
        );
    }
}

export default Vector;
