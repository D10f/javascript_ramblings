import Brush from "./Brush2";
import Hexagon from "./Hexagon2";
import Renderer from "./Renderer";
import Terrain from "./Terrain2";
import { ROWS, COLS, HEX_OFFSET_X, HEX_WIDTH, HEX_OFFSET_Y, HEX_SIZE, HEXAGON_RELATIVE_POSITION_MODIFIER, ENDPOINT_TOKEN_IMG_TABLE } from "./defs";
import { taxicabDistance } from "./utils";

export default class HexGrid {

    private terrainLayer: Hexagon[][];
    private middleLayer: Hexagon[];
    private topLayer: Hexagon[];
    private brush: Brush;

    constructor(private canvas: HTMLCanvasElement, private renderer: Renderer) {
        this.terrainLayer = this.generateTerrain();
        this.middleLayer = this.generateOverlayToken();
        this.topLayer = this.generateEndpointTokens();

        this.brush = new Brush(this.middleLayer, this.topLayer);

        this.handleMouseInput();
    }

    private handleMouseInput() {

        this.canvas.addEventListener('mousemove', (e: MouseEvent) => {
            const hex = this.getHex(e.x, e.y);
            this.brush.update(hex);
        });

        this.canvas.addEventListener('click', (e: MouseEvent) => {
            const hex = this.getHex(e.x, e.y) as Terrain;
            this.brush.stroke(hex);
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

    private generateTerrain() {
        const col: Hexagon[][] = [];
        for (let i = 0; i < ROWS; i++) {

            const row: Hexagon[] = [];

            for (let j = 0; j < COLS; j++) {

                const x = Math.round(i * HEX_OFFSET_X + (HEX_WIDTH / 2) * (j % 2));
                const y = Math.round(j * HEX_OFFSET_Y);
                row.push(new Terrain({
                    x,
                    y,
                    terrainType: 'GRASS',
                    col: i,
                    row: j
                }));
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
