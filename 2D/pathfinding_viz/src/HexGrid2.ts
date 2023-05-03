import Brush from "./Brush2";
import Hexagon from "./Hexagon2";
import PriorityQueue from "./PriorityQueue";
import Renderer from "./Renderer";
import Terrain from "./Terrain2";
import { ROWS, COLS, HEX_OFFSET_X, HEX_WIDTH, HEX_OFFSET_Y, HEX_SIZE, HEXAGON_RELATIVE_POSITION_MODIFIER, ENDPOINT_TOKEN_IMG_TABLE, TERRAIN_TYPE_IMG_TABLE } from "./defs";
import { angleBetweenPoints, taxicabDistance } from "./utils";

export default class HexGrid {

    private terrainLayer: Hexagon[][];
    private middleLayer: Hexagon[];
    private topLayer: Hexagon[];
    private brush: Brush;

    constructor(private canvas: HTMLCanvasElement, private renderer: Renderer, map?: number[][]) {
        this.middleLayer = this.generateOverlayToken();
        this.topLayer = this.generateEndpointTokens();
        this.terrainLayer = this.generateTerrain(map);

        // this.brush = new Brush(canvas, this.middleLayer, this.topLayer);
        this.brush = new Brush(this, canvas, [this.middleLayer, this.topLayer]);

        this.handleKeyboardInput();
    }

    private printTerrainGrid() {
        (this.terrainLayer as Terrain[][]).forEach(col => {
            const rowIdx: number[] = [];
            col.forEach(row => {
                const terrainTypes = Object.keys(TERRAIN_TYPE_IMG_TABLE);
                rowIdx.push(terrainTypes.findIndex(t => t === row.type));
            });
            console.log(rowIdx.toString());
        });
    }

    private handleKeyboardInput() {
        window.addEventListener('keyup', (e: KeyboardEvent) => {
            if (e.key === 'p') {
                this.printTerrainGrid();
            }
            if (e.key !== ' ') return;

            const start = this.getHex(this.topLayer[0].x, this.topLayer[0].y);
            const end = this.getHex(this.topLayer[1].x, this.topLayer[1].y);
            const map = this.getShortestPath(start, end);
            const path = this.reconstructPath(map, end);

            this.middleLayer.splice(1);
            this.topLayer = [this.topLayer[0], this.topLayer[1]];

            path.forEach((hex, idx, arr) => {
                if (hex === start || hex === end) return;

                this.topLayer.push(new Hexagon({
                    x: hex.x,
                    y: hex.y,
                    image: 'arrow.png',
                    imageAngle: angleBetweenPoints(hex.x, hex.y, arr[idx - 1].x, arr[idx - 1].y)
                }));
            });
        });
    }

    static getDistance(h1: Hexagon, h2: Hexagon) {
        return taxicabDistance(h1.x, h1.y, h2.x, h2.y);
    }

    getHex(x: number, y: number) {
        const c = this.canvas.getBoundingClientRect();
        const mouseX = x - c.x;
        const mouseY = y - c.y;
        const [row, col] = this.pixelToHex(mouseX, mouseY);
        return this.terrainLayer[row][col];
    }

    private reconstructPath(cameFrom: Map<Hexagon, Hexagon>, current: Hexagon) {
        const shortestPath = [current];
        while (cameFrom.has(current)) {
            current = cameFrom.get(current) as Hexagon;
            shortestPath.push(current);
        }
        return shortestPath;
    }

    private getShortestPath(start: Hexagon, end: Hexagon) {

        const openSet = new PriorityQueue<Hexagon>();
        openSet.enqueue({ value: start, priority: 0 });

        const cameFrom = new Map<Hexagon, Hexagon>();

        const gScore = new Map<string, number>();
        gScore.set(start.id, 0);

        const fScore = new Map<string, number>();
        fScore.set(start.id, HexGrid.getDistance(start, end));

        while (!openSet.isEmpty) {

            const current = openSet.dequeue() as Hexagon;

            if (current === end) {
                return cameFrom;
            }

            for (const neighbor of this.getNeighbors(current)) {

                const currentGScore = gScore.get(neighbor.id) ?? Infinity;
                const tentativeGScore = (
                    gScore.get(current.id) as number
                    // + neighbor.terrain.difficulty * HEX_SIZE
                    + (neighbor as Terrain).difficulty * HEX_SIZE
                    + HexGrid.getDistance(current, neighbor)
                );

                if (tentativeGScore < currentGScore) {
                    const neighborFScore = tentativeGScore + HexGrid.getDistance(neighbor, end);
                    cameFrom.set(neighbor, current);
                    gScore.set(neighbor.id, tentativeGScore);
                    fScore.set(neighbor.id, neighborFScore);

                    if (!openSet.contains(neighbor)) {
                        openSet.enqueue({ value: neighbor, priority: neighborFScore });
                    }
                }
            }
        }

        return cameFrom;
    }

    private generateTerrain(map: number[][] | undefined) {
        const col: Hexagon[][] = [];
        for (let i = 0; i < ROWS; i++) {

            const row: Hexagon[] = [];

            for (let j = 0; j < COLS; j++) {

                const x = Math.round(i * HEX_OFFSET_X + (HEX_WIDTH / 2) * (j % 2));
                const y = Math.round(j * HEX_OFFSET_Y);

                const isOutside = (
                    x - HEX_SIZE <= 0 ||
                    y - HEX_SIZE <= 0 ||
                    x + HEX_SIZE > this.canvas.width ||
                    y + HEX_SIZE > this.canvas.height + HEX_SIZE
                );

                let terrainType: TerrainType;

                if (map) {
                    let idx = map[i][j];

                    if (idx > 20) {
                        this.topLayer[1].x = x;
                        this.topLayer[1].y = y;
                        idx -= 20;
                    } else if (idx > 10) {
                        this.topLayer[0].x = x;
                        this.topLayer[0].y = y;
                        idx -= 10;
                    }

                    terrainType = Object.keys(TERRAIN_TYPE_IMG_TABLE)[idx] as TerrainType;
                } else {
                    terrainType = isOutside ? 'WATER' : 'GRASS';
                }

                const hex = new Terrain({
                    x,
                    y,
                    terrainType,
                    col: i,
                    row: j
                });

                row.push(hex);
            }

            // this.terrainLayer.push(row);
            col.push(row);
        }
        return col;
    }

    private generateOverlayToken() {
        const token = new Hexagon({
            x: -100,
            y: -100,
            color: 'rgba(255,255,255,0.25)'
        });

        return [token];
    }

    private generateEndpointTokens() {
        const res = [];
        for (const [k, v] of Object.entries(ENDPOINT_TOKEN_IMG_TABLE)) {
            const token = new Hexagon({
                x: -100,
                y: -100,
                id: k,
                image: v
            });
            res.push(token);
        }
        return res;
    }

    // TODO: Figure a way to calculate col and row based on x, y coordinates
    private getNeighbors(hex: Hexagon) {
        const { col, row } = hex;

        return [
            this.getHexagonAt(col, row, 'RIGHT'),
            this.getHexagonAt(col, row, 'TOP_RIGHT'),
            this.getHexagonAt(col, row, 'TOP_LEFT'),
            this.getHexagonAt(col, row, 'LEFT'),
            this.getHexagonAt(col, row, 'BOTTOM_LEFT'),
            this.getHexagonAt(col, row, 'BOTTOM_RIGHT')
        ].filter((hex): hex is Hexagon => Boolean(hex));
    }

    private getHexagonAt(col: number, row: number, direction: HexagonRelativePosition) {

        const [colModifier, rowModifier] =
            HEXAGON_RELATIVE_POSITION_MODIFIER[direction][row % 2];

        col = col + colModifier
        row = row + rowModifier;

        if (col < 0 || col >= ROWS || row < 0 || row >= COLS) return null;

        return this.terrainLayer[col][row];
    }

    // TODO: Make these into utility functions
    private pixelToHex(x: number, y: number) {
        const q = ((Math.sqrt(3) / 3) * x - (1 / 3 * y)) / HEX_SIZE;
        const r = (2 / 3 * y) / HEX_SIZE;
        return this.axialToOffset(this.axialRound(q, r));
    }

    private axialToOffset([q, r]: number[]) {
        const col = q + (r - (r % 2)) / 2;
        const row = r;
        return [ col, row ];
    }

    private axialRound(x: number, y: number) {
        const xgrid = Math.round(x);
        const ygrid = Math.round(y);
        x -= xgrid;
        y -= ygrid; // remainder
        const dx = Math.round(x + 0.5*y) * (x*x >= y*y ? 1 : 0);
        const dy = Math.round(y + 0.5*x) * (x*x < y*y ? 1 : 0);
        return [xgrid + dx, ygrid + dy];
    }

    render() {
        this.renderer.render(this.terrainLayer.flat());
        this.renderer.render(this.middleLayer);
        this.renderer.render(this.topLayer);
    }
}
