import EventEmitter from "./EventEmitter";

class Renderer {
    private ctx: CanvasRenderingContext2D;
    private renderQueue: any[];

    constructor(
        private canvas: HTMLCanvasElement
    ) {
        this.ctx = canvas.getContext('2d')!;
        this.renderQueue = [];
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    add(item: any) {
        if (item instanceof Array) {
            item.forEach(i => this.renderQueue.push(i));
        } else {
            this.renderQueue.push(item);
        }
    }

    render() {

        let item = this.renderQueue.pop();

        do {
            item.draw(this.ctx);
        } while (item = this.renderQueue.pop());

        // for (let i = entities.length - 1; i >= 0; i--) {
        //     entities[i].draw(this.ctx);
        // }
    }
}

export default Renderer;
