import EventEmitter from "./EventEmitter";

class Renderer {
    private ctx: CanvasRenderingContext2D;

    constructor(
        private canvas: HTMLCanvasElement
    ) {
        this.ctx = canvas.getContext('2d')!;
    }

    render(entities: Entity[]) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = entities.length - 1; i >= 0; i--) {
            entities[i].draw(this.ctx);
        }
    }
}

export default Renderer;
