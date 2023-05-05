import EventEmitter from "./EventEmitter";
import Hexagon from "./Hexagon";
import { HEX_OFFSET_X, HEX_OFFSET_Y, HEX_SIZE, HEX_WIDTH, TERRAIN_TYPES, TERRAIN_TYPE_IMG_TABLE } from "./defs";
import { pixelToHex } from "./utils";

export default class Cursor {

    private cursor: Hexagon;
    private selectedTile: TerrainType | FlagType | null;
    private eventType:  'drawTerrain' | 'moveEndpoint';
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
        this.eventType = 'moveEndpoint';
        this.mouseEvents();
    }

    private mouseEvents() {
        this.canvas.addEventListener('mousedown', () => {
            this.isPressed = true;
        });

        this.canvas.addEventListener('mouseup', () => {
            this.isPressed = false;
        });

        this.canvas.addEventListener('click', () => {

            if (!this.selectedTile) return;

            this.emitter.emit(this.eventType, {
                cursor: this.cursor,
                tile: this.selectedTile
            });
        });

        this.canvas.addEventListener('mousemove', (event: MouseEvent) => {

            const canvasPos = this.canvas.getBoundingClientRect();
            const mouseX = event.x - canvasPos.x;
            const mouseY = event.y - canvasPos.y;
            const [col, row] = pixelToHex(mouseX, mouseY, HEX_SIZE);

            const x = Math.round(col * HEX_OFFSET_X + (HEX_WIDTH / 2) * (row % 2));
            const y = Math.round(row * HEX_OFFSET_Y);

            this.cursor.x = x;
            this.cursor.y = y;
            this.cursor.col = col;
            this.cursor.row = row;

            if (!this.isPressed || !this.selectedTile) return;

            this.emitter.emit(this.eventType, {
                cursor: this.cursor,
                tile: this.selectedTile
            });
        });
    }

    setTile(tile: TerrainType | FlagType) {

        if (this.selectedTile && Object.keys(TERRAIN_TYPE_IMG_TABLE).includes(this.selectedTile)) {
            this.eventType = 'drawTerrain';
        } else {
            this.eventType = 'moveEndpoint';
        }

        this.selectedTile = tile;
    }

    render(ctx: CanvasRenderingContext2D) {
        this.cursor.render(ctx);
    }
}
