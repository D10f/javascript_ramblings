import Animation from "./Animation";
import EventEmitter from "./EventEmitter";
import HexGrid from "./HexGrid2";
import Hexagon from "./Hexagon";
import Pathfinder from "./Pathfinder";
import Renderer from "./Renderer";
import Terrain from "./Terrain";
import { COLS, HEX_SIZE, map } from "./defs";
import { angleBetweenPoints } from "./utils";

export default class World {

    private terrainLayer: HexGrid;
    private middleLayer: HexGrid;
    private topLayer: HexGrid;
    private animation: Animation;

    constructor(
        private renderer: Renderer,
        private emitter: EventEmitter
    ) {
        this.terrainLayer = new HexGrid({ map, topography: 'TERRAIN' });
        this.middleLayer = new HexGrid();
        this.topLayer = new HexGrid({ map, topography: 'FLAGS' });

        this.animation = new Animation(
            emitter,
            new Pathfinder(
                this.terrainLayer,
                this.topLayer.grid[0],
                this.topLayer.grid[1],
            )
        );

        this.cursorEvents();
        this.animationEvents();
    }

    private animationEvents() {
        this.emitter.subscribe('play', () => {
            this.middleLayer.grid = [];
            this.topLayer.grid.splice(2);
        });

        this.emitter.subscribe('insertMiddleLayer', (hexagon: Hexagon) => {
            this.middleLayer.grid.push(hexagon);
        });

        this.emitter.subscribe('animationDone', (path: Hexagon[]) => {
            this.middleLayer.grid = [];

            path.forEach((hex, idx, arr) => {
                let imageAngle = idx === 0
                    ? 0
                    : angleBetweenPoints(hex.x, hex.y, arr[idx - 1].x, arr[idx - 1].y);

                const image = idx === 0 ? 'mark.png' : 'arrow.png';

                this.middleLayer.grid.push(new Hexagon({
                    x: hex.x,
                    y: hex.y,
                    color: 'rgba(0,0,0,0.2)'
                }));

                this.topLayer.grid.push(new Hexagon({
                    x: hex.x,
                    y: hex.y,
                    image,
                    imageAngle
                }));
            });
        });
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

            if (this.animation.playing) return;

            const hex = this.terrainLayer.grid.find(hex => (
                hex.col === cursor.col && hex.row === cursor.row
            )) as Terrain;

            hex.setType(tile as TerrainType);
        });

        this.emitter.subscribe('moveEndpoint', ({ cursor, tile }: CursorEvent) => {
            if (this.animation.playing) return;
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
