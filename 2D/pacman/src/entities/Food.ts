import Vector from "../lib/Vector";

class Food implements Pick<Entity, 'position' | 'radius'> {

    public position: Vector;
    public radius: number;

    constructor(
        x: number,
        y: number,
        private graphicsComponent: any,
    ) {
        this.position = new Vector(x, y);
        this.radius = 3;
    }

    update() {}

    draw(ctx: CanvasRenderingContext2D) {
        this.graphicsComponent.draw(this, ctx);
    }
}

export default Food;
