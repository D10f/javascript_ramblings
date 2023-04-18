import Grid from "../components/Grid";
import PathGeneratorComponent from "../components/PathComponent";
import { CELL_SIZE } from "../defs";
import Vector from "../lib/Vector";

class Enemy2 implements Entity {

    public position: Vector;
    public velocity: Vector;
    public targetPosition: Vector;
    public isMoving: boolean;
    public radius: number;
    private behaviorIdx: number;
    private behaviorInterval: ReturnType<typeof setInterval>;

    constructor(
        x: number,
        y: number,
        private pathGeneratorComponent: PathGeneratorComponent,
        private movementComponent: any,
        private graphicComponent: any,
    ) {
        this.position = new Vector(x, y);
        this.velocity = new Vector(0, 0);
        this.targetPosition = new Vector(x, y);
        this.isMoving = false;
        this.radius = CELL_SIZE / 3;
        this.behaviorIdx = 0;
        this.behaviorInterval = 0;
    }

    // private updateBehavior(newBehavior: PathGenerationStrategy) {
    //     this.pathGeneratorComponent.changeBehavior(newBehavior);
    // }

    // private panic() {
    //     this.pathGeneratorComponent.changeBehavior(newBehavior);
    // }

    update(world: Grid) {
        this.pathGeneratorComponent.update(this, world);
        this.movementComponent.update(this, world);
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.graphicComponent.draw(this, ctx);
    }
}

export default Enemy2;
