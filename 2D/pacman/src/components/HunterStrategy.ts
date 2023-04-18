import Vector from "../lib/Vector";
import Grid from "./Grid";

class HunterStrategy {

    private currentPath: Vector[];

    constructor() {
        this.currentPath = [];
    }

    generate(entity: Entity, world: Grid) {
        if (this.currentPath.length === 0) {
            this.currentPath = world.getShortestPath(
                entity.position,
                world.entities[0].targetPosition
            );
        }

        return this.currentPath.pop() ?? world.getRandomNeighbour(entity.position);
    }
}

export default HunterStrategy;
