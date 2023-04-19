import Vector from "../lib/Vector";

class Power implements Pick<Entity, 'position' | 'radius'> {

    public position: Vector;
    public radius: number;

    constructor(
        x: number,
        y: number,
        private graphicsComponent: any,
    ) {
        this.position = new Vector(x, y);
        this.radius = 8;
    }

    update() {}

    draw(ctx: CanvasRenderingContext2D) {
        this.graphicsComponent.draw(this, ctx);
    }
}

export default Power;
