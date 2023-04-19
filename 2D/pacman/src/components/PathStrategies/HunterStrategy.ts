import Grid from "../../systems/Grid";
import Vector from "../../lib/Vector";

class HunterStrategy {

    private currentPath: Vector[];
    private previous: Vector;

    constructor() {
        this.currentPath = [];
        this.previous = new Vector(0, 0);
    }

    generate(entity: Entity, world: Grid) {
        if (this.currentPath.length === 0) {
            this.currentPath = world.getShortestPath(
                world.getNormalizedVector(entity.position),
                world.getNormalizedVector(world.entities[0].position)
            );
        }

        return this.currentPath.pop() ?? world.getRandomNeighbour(entity.position);
    }
}

export default HunterStrategy;
