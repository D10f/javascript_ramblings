import Grid from "../components/Grid";
import { CELL_SIZE } from "../defs";
import Vector from "../lib/Vector";

class Enemy2 {

    public position: Vector;
    public velocity: Vector;
    public targetPosition: Vector;
    public radius: number;

    constructor(
        x: number,
        y: number,
        private pathGeneratorComponent: any,
        private movementComponent: any,
        private graphicComponent: any
    ) {
        this.position = new Vector(x, y);
        this.velocity = new Vector(0, 0);
        this.targetPosition = new Vector(x, y);
        this.radius = CELL_SIZE / 3;
    }

    update(world: Grid) {
        this.pathGeneratorComponent.update(this, world);
        this.movementComponent.update(this, world);
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.graphicComponent.draw(this, ctx);
    }
}

export default Enemy2;
