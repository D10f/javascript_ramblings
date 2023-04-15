import { PLAYER_SPEED } from "../defs";

class Vector {

    // private magnitude: number;
    // private direction: number;

    constructor(public x: number, public y: number) {}

    // Taxicab or Manhattan distance
    distance(v: Vector) {
        return Math.abs(this.x - v.x) + Math.abs(this.y - v.y);
    }

    // Euclidian distance
    // distance(v: Vector) {
    //     return Math.sqrt(
    //         (v.x - this.x) * (v.x - this.x) +
    //         (v.y - this.y) * (v.y - this.y)
    //     );
    // }

    copy() {
        return new Vector(this.x, this.y);
    }

    compare(v: Vector) {
        return this.x === v.x && this.y === v.y;
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
        this.x - v.x;
        this.y - v.y;
    }

    toJSON() {
        return `${this.x},${this.y}`;
    }
    toString() {
        return `${this.x},${this.y}`;
    }
}

export default Vector;
