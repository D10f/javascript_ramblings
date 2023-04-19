import { drawCircle } from "../../utils/geometry";

class CircleDrawingStrategy implements GraphicDrawingStrategy {
    constructor(private color: string) {}

    draw(entity: Entity, ctx: CanvasRenderingContext2D) {
        drawCircle({
            ctx,
            x: entity.position.x,
            y: entity.position.y,
            radius: entity.radius,
            color: this.color
        });
    }
}

export default CircleDrawingStrategy;
