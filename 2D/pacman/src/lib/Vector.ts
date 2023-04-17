import { taxicabDistance } from "../utils/math";

class Vector {

    constructor(public x: number, public y: number) {}

    static add(v1: Vector, v2: Vector) {
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    }

    static sub(v1: Vector, v2: Vector) {
        return new Vector(v1.x - v2.x, v1.y - v2.y);
    }

    distance(v: Vector) {
        if (v === null || v === null) return Infinity;
        return taxicabDistance(this.x, this.y, v.x, v.y);
        // return Math.abs(this.x - v.x) + Math.abs(this.y - v.y);
    }

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

    toString() {
        return `${this.x},${this.y}`;
    }
}

export default Vector;
