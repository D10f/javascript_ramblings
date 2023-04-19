import { CELL_SIZE } from "../../defs";

class RectDrawingStrategy implements GraphicDrawingStrategy {

    constructor(private color: string) {}

    draw(entity: Entity, ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.fillRect(
            entity.position.x,
            entity.position.y,
            CELL_SIZE,
            CELL_SIZE
        );
    }
}

export default RectDrawingStrategy;
