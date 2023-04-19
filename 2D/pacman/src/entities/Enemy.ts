import Grid from "../systems/Grid";
import PanicStrategy from "../components/PathStrategies/PanicStrategy";
import PathGeneratorComponent from "../components/PathComponent";
import { CELL_SIZE } from "../defs";
import Vector from "../lib/Vector";

class Enemy implements Entity {

    public position: Vector;
    public velocity: Vector;
    public targetPosition: Vector;
    public isMoving: boolean;
    public radius: number;

    constructor(
        x: number,
        y: number,
        private pathGeneratorComponent: PathGeneratorComponent,
        private movementComponent: any,
        private graphicComponent: any,
        public readonly eventEmitter: any,
    ) {
        this.position = new Vector(x, y);
        this.velocity = new Vector(0, 0);
        this.targetPosition = new Vector(x, y);
        this.isMoving = false;
        this.radius = CELL_SIZE / 3;
        this.eventEmitter.eventEmitter.subscribe('powerUp', this.panic.bind(this));
    }

    private panic() {
        this.pathGeneratorComponent.changeBehavior(new PanicStrategy());
    }

    update(world: Grid) {
        this.pathGeneratorComponent.update(this, world);
        this.movementComponent.update(this, world);
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.graphicComponent.draw(this, ctx);
    }
}

export default Enemy;
