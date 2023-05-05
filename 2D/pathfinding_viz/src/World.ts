import EventEmitter from "./EventEmitter";
import HexGrid from "./HexGrid2";
import Hexagon from "./Hexagon";
import Renderer from "./Renderer";
import Terrain from "./Terrain";
import { map } from "./defs";

export default class World {

    private terrainLayer: HexGrid;
    private middleLayer: HexGrid;
    private topLayer: HexGrid;

    constructor(
        private renderer: Renderer,
        private emitter: EventEmitter
    ) {
        this.terrainLayer = new HexGrid({ map, topography: 'TERRAIN' });
        this.middleLayer = new HexGrid();
        this.topLayer = new HexGrid({ map, topography: 'FLAGS' });
        this.cursorEvents();
    }

    private cursorEvents() {
        this.emitter.subscribe('click', ({ cursor }: CursorEvent) => {
            this.middleLayer.grid = [];

            const n = this.terrainLayer.getNeighbors(cursor);

            this.middleLayer.grid = n.map(hex => new Hexagon({
                x: hex.x,
                y: hex.y,
                color: 'rgba(100, 255, 100, 0.6)'
            }));
        });

        this.emitter.subscribe('drawTerrain', ({ cursor, tile }: CursorEvent) => {
            const hex = this.terrainLayer.grid.find(hex => (
                hex.col === cursor.col && hex.row === cursor.row
            )) as Terrain;

            hex.setType(tile as TerrainType);
        });

        this.emitter.subscribe('moveEndpoint', ({ cursor, tile }: CursorEvent) => {
            const hex = this.topLayer.grid.find(hex => hex.id === tile) as Hexagon;
            hex.x = cursor.x;
            hex.y = cursor.y;
        });
    }

    render() {
        this.renderer.render(this.terrainLayer);
        this.renderer.render(this.middleLayer);
        this.renderer.render(this.topLayer);
    }
}
