import EventEmitter from "./EventEmitter";
import Hexagon from "./Hexagon";

export default class Cursor {

    private cursor: Hexagon;
    private selectedTile: TerrainType | FlagType | null;
    private isPressed: boolean;

    constructor(
        private canvas: HTMLCanvasElement,
        private emitter: EventEmitter,
    ) {
        this.cursor = new Hexagon({
            x: -100,
            y: -100,
            col: -1,
            row: -1,
            color: 'rgba(255,255,255,0.25)'
        });
        this.selectedTile = null;
        this.isPressed = false;
        this.mouseEvents();
    }

    private mouseEvents() {
        this.canvas.addEventListener('click', (event: MouseEvent) => {
            this.emitter.emit('click', {
                event,
                cursor: this.cursor,
                tile: this.selectedTile
            });
        });

        this.canvas.addEventListener('mousedown', () => {
            this.isPressed = true;
            this.emitter.emit('mousedown');
        });

        this.canvas.addEventListener('mouseup', () => {
            this.isPressed = false;
            this.emitter.emit('mouseup');
        });

        this.canvas.addEventListener('mousemove', (event: MouseEvent) => {

            const canvasPos = this.canvas.getBoundingClientRect();
            const mouseX = event.x - canvasPos.x;
            const mouseY = event.y - canvasPos.y;
            const [col, row] = pixelToHex(mouseX, mouseY);

            if (!this.isPressed) return;

            this.emitter.emit('mousemove', {
                event,
                cursor: this.cursor,
                tile: this.selectedTile
            });
        });
    }

    setTile(tile: TerrainType | FlagType) {
        this.selectedTile = tile;
    }

    render(ctx: CanvasRenderingContext2D) {
        this.cursor.render(ctx);
    }
}
