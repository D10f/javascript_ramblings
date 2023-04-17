import { drawCircle, drawImage } from "../utils/geometry";

class GraphicComponent {

    constructor(
        private img: Path2D,
        private color: string
    ) {}

    draw(entity: any, ctx: CanvasRenderingContext2D) {
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
            image: this.img,
            color: this.color
        });
    }
}

export default GraphicComponent;
