import Vector from "../lib/Vector";
import { randomInt } from "../utils/math";
import Grid from "./Grid";

class RandomPathStrategy {

    private previous: Vector;

    constructor() {
        this.previous = new Vector(0, 0);
    }

    generate(entity: any, world: Grid) {
        let neighbours = world
            .getNeighbors(entity.position)
            .filter(n => n.toString() !== this.previous.toString());

        if (neighbours.length === 0) return this.previous;

        this.previous = entity.targetPosition;

        return neighbours[randomInt(0, neighbours.length)];
    }
}

export default RandomPathStrategy;
