import { drawCircle, drawImage } from "../../utils/geometry";

class ImageDrawingStrategy implements GraphicDrawingStrategy {

    constructor(
        private image: Path2D,
        private color: string,
    ) {}

    draw(entity: Entity, ctx: CanvasRenderingContext2D) {

        drawCircle({
            ctx,
            x: entity.position.x,
            y: entity.position.y,
            radius: entity.radius,
            color: '#303446'
        });

        drawImage({
            ctx,
            x: entity.position.x,
            y: entity.position.y,
            image: this.image,
            color: this.color
        });
    }
}

export default ImageDrawingStrategy;
