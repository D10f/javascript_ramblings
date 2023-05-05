import Cursor from "./Cursor";
import EventEmitter from "./EventEmitter";
import HexGrid from "./HexGrid2";
import Hexagon from "./Hexagon";
import Renderer from "./Renderer";
import Terrain from "./Terrain";
import { map } from "./defs";

export default class World {

    private grid: HexGrid;
    private terrainLayer: Hexagon[];
    private middleLayer: Hexagon[];
    private topLayer: Hexagon[];
    private cursor: Cursor;

    constructor(
        private canvas: HTMLCanvasElement,
        private renderer: Renderer,
        private emitter: EventEmitter
    ) {
        this.grid = new HexGrid(map);
        this.terrainLayer = this.grid.generateTerrain();
        this.middleLayer = [];
        this.topLayer = this.grid.generateEndpoints();
        this.cursor = new Cursor(canvas, emitter);
        this.cursorEvents();
    }

    private cursorEvents() {
        this.emitter.subscribe('drawTerrain', ({ cursor, tile }: CursorEvent) => {
            const hex = this.terrainLayer.find(hex => (
                hex.col === cursor.col && hex.row === cursor.row
            )) as Terrain;

            hex.setType(tile as TerrainType);
        });

        this.emitter.subscribe('moveEndpoint', ({ cursor, tile }: CursorEvent) => {
            const hex = this.topLayer.find(hex => hex.id === tile) as Hexagon;
            hex.x = cursor.x;
            hex.y = cursor.y;
        });
    }

    render() {
        this.renderer.render(this.terrainLayer);
        this.renderer.render(this.middleLayer);
        this.renderer.render(this.topLayer);
        this.renderer.render(this.cursor);
    }
}
