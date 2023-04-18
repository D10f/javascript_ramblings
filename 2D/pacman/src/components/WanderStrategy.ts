import { CELL_SIZE } from "../defs";
import Vector from "../lib/Vector";
import Grid from "./Grid";

class WanderStrategy implements PathGenerationStrategy {
    private positions: Vector[];
    private nextPosition: Vector;
    private nextPositionIdx: number;
    private currentPath: Vector[];

    constructor(...positions: Vector[]) {
        this.positions = positions;
        this.nextPositionIdx = 0;
        this.nextPosition = this.positions[this.nextPositionIdx];
        this.currentPath = [];
    }

    generate(entity: Entity, world: Grid) {

        if (this.currentPath.length === 0) {
            this.currentPath = world.getShortestPath(
                entity.position,
                this.nextPosition
            );
            this.nextPositionIdx = (this.nextPositionIdx + 1) % this.positions.length;
            this.nextPosition = this.positions[this.nextPositionIdx];
        }

        return this.currentPath.pop();
    }
};

export class TopLeftWanderer extends WanderStrategy {
    constructor() {
        super(
            new Vector(CELL_SIZE, CELL_SIZE),
            new Vector(CELL_SIZE, CELL_SIZE * 6),
            new Vector(CELL_SIZE * 6, CELL_SIZE * 6),
            new Vector(CELL_SIZE * 4, CELL_SIZE * 3)
        );
    }
}

export class TopRightWanderer extends WanderStrategy {
    constructor() {
        super(
            new Vector(CELL_SIZE * 14, CELL_SIZE),
            new Vector(CELL_SIZE * 14, CELL_SIZE * 6),
            new Vector(CELL_SIZE * 9, CELL_SIZE * 6),
            new Vector(CELL_SIZE * 10, CELL_SIZE * 3)
        );
    }
}

export class BottomLeftWanderer extends WanderStrategy {
    constructor() {
        super(
            new Vector(CELL_SIZE, CELL_SIZE * 15),
            new Vector(CELL_SIZE * 4, CELL_SIZE * 13),
            new Vector(CELL_SIZE * 6, CELL_SIZE * 10),
            new Vector(CELL_SIZE, CELL_SIZE * 10)
        );
    }
}

export class BottomRightWanderer extends WanderStrategy {
    constructor() {
        super(
            new Vector(CELL_SIZE * 14, CELL_SIZE * 15),
            new Vector(CELL_SIZE * 10, CELL_SIZE * 13),
            new Vector(CELL_SIZE * 11, CELL_SIZE * 10),
            new Vector(CELL_SIZE * 14, CELL_SIZE * 12)
        );
    }
}

export default WanderStrategy;
