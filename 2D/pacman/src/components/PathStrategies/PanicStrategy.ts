import Grid from "../../systems/Grid";
import Vector from "../../lib/Vector";

class PanicStrategy implements PathGenerationStrategy {

    private previous: Vector;

    constructor() {
        this.previous = new Vector(0, 0);
    }

    generate(entity: Entity, world: Grid) {
        const playerPos = world.entities[0].position;
        const neighbours = world
            .getNeighbors(entity.position)
            .filter(n => n.toString() !== this.previous.toString());

        if (neighbours.length < 1) return this.previous;

        this.previous = entity.targetPosition;

        return neighbours.reduce((acc, curr) => {
            return curr.distance(playerPos) > acc.distance(playerPos)
                ? curr
                : acc;
        });
    }
}

export default PanicStrategy;
