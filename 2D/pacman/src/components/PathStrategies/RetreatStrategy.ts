import { CELL_SIZE } from "../../defs";
import Enemy from "../../entities/Enemy";
import Vector from "../../lib/Vector";
import Grid from "../../systems/Grid";

class RetreatStrategy {

    private currentPath: Vector[];

    constructor() {
        this.currentPath = [];
    }

    generate(entity: Entity, world: Grid) {
        if (this.currentPath.length === 0) {
            this.currentPath = world.getShortestPath(
                world.getNormalizedVector(entity.position),
                new Vector(CELL_SIZE * 6, CELL_SIZE * 8)
            );
        }

        if (entity.position.distance(new Vector(CELL_SIZE * 6, CELL_SIZE * 8)) < CELL_SIZE) {
            (entity as Enemy).eventEmitter.eventEmitter.emit('respawn', entity);
            return entity.position;
        }

        return this.currentPath.pop();
    }
}

export default RetreatStrategy;
