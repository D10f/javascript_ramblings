import { COLS, HEX_OFFSET_X, HEX_OFFSET_Y, HEX_SIZE, HEX_WIDTH, ROWS } from "./defs";

import Renderer from "./Renderer";
import PriorityQueue from "./PriorityQueue";
import Brush from "./Brush";
import Hexagon from "./Hexagon";
import terrains, { Terrain } from "./Terrain";

export default class HexGrid {

    private _entities: Hexagon[][];
    private start: Hexagon | null;
    private end: Hexagon | null;
    private assignStart: boolean;
    private mousePressed: boolean;

    private brush: Brush;
    private renderer: Renderer
    // private path: Line[];
    private path: Hexagon[];
    private tentatives: Hexagon[];

    private lookup: HexagonLookupTable;

    constructor(private canvas: HTMLCanvasElement) {
        this._entities = [];
        this.start = null;
        this.end = null;
        this.assignStart = true;
        this.mousePressed = false;

        this.brush = new Brush(canvas);
        this.renderer = new Renderer(canvas);
        this.path = [];
        this.tentatives = [];

        this.lookup = {
            // even rows (0) odd rows (1)
            RIGHT: [[+1,  0], [+1,  0]],
            TOP_RIGHT: [[ 0, -1],  [+1, -1]],
            TOP_LEFT: [[-1, -1], [ 0, -1]],
            LEFT: [[-1,  0], [-1,  0]],
            BOTTOM_LEFT: [[-1, +1], [ 0, +1]],
            BOTTOM_RIGHT: [[ 0, +1], [+1, +1]],
        };

        this.createGrid(COLS, ROWS);
        this.handleMouseInput();
    }

    get entities() {
        const e = [];
        for (let i = 0; i < this._entities.length; i++) {
            for (let j = 0; j < this._entities.length; j++) {
                e.push(this._entities[i][j]);
            }
        }
        return e;
    }

    private forEachHex(fn: (hex: Hexagon) => void) {
        this.entities.forEach(fn);
    }

    private setStartOrEndPositions(hex: Hexagon) {
        if (this.assignStart) {

            if (this.start && this.end) {
                // this.start.flag.src = '';
                // this.end.flag.src = '';
                this.forEachHex((hex) => hex.flag.src = '');
                this.path = [];
                this.tentatives = [];
                this.start = null;
                this.end = null;
            }

            this.start = hex;
            this.start.flag.src = './startHex.png';
        } else {
            this.end = hex;
            this.end.flag.src = './endHex.png';
        }

        this.assignStart = !this.assignStart;

        if (this.start && this.end) {
            const map = this.getShortestPath(this.start, this.end);
            if (!map) return;
            const path = this.reconstructPath(map, this.end);

            this.path = path.map(hex => {
                return new Hexagon(hex.x, hex.y, HEX_SIZE, new Terrain('WATER', 'rgba(255,127,80,0.5)', Infinity, ''));
            });

            this.path[0].flag.src = './endHex.png';
            this.path[this.path.length - 1].flag.src = './startHex.png';


            // path.reduce((acc, curr) => {
            //     this.path.push(
            //         new Line(acc.x, acc.y, curr.x, curr.y)
            //     );
            //     return curr;
            // });
        }
    }

    private reconstructPath(cameFrom: Map<Hexagon, Hexagon>, current: Hexagon) {
        const shortestPath = [current];
        while(cameFrom.has(current)) {
            current = cameFrom.get(current) as Hexagon;
            shortestPath.push(current);
        }
        return shortestPath;
    }

    private getHex(pixelX: number, pixelY: number) {
        const c = this.canvas.getBoundingClientRect();
        const mouseX = pixelX - c.x;
        const mouseY = pixelY - c.y;
        const [x, y] = this.pixelToHex(mouseX, mouseY);
        return this._entities[x][y];
    }

    private handleMouseInput() {
        this.canvas.addEventListener('click', (e: MouseEvent) => {
            const hex = this.getHex(e.x, e.y);
            if (e.shiftKey) {
                this.setStartOrEndPositions(hex);
            } else {
                this.brush.stroke(hex);
            }
        });

        this.canvas.addEventListener('mousedown', () => {
            this.mousePressed = true;
        });

        this.canvas.addEventListener('mouseup', () => {
            this.mousePressed = false;
        });

        this.canvas.addEventListener('mousemove', (e: MouseEvent) => {
            const hex = this.getHex(e.x, e.y);
            this.brush.hover(hex);
            if (!this.mousePressed || e.shiftKey) return;
            this.brush.stroke(hex);
        });
    }

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

    private getHexagonAt(col: number, row: number, direction: HexagonRelativePosition) {

        const [colModifier, rowModifier] = this.lookup[direction][row % 2] as number[];

        if (
            col + colModifier < 0 || col + colModifier >= ROWS ||
                row + rowModifier < 0 || row + rowModifier >= COLS
        ){
            return null;
        }

        return this._entities[col + colModifier][row + rowModifier];
    }

    // private paintTile(hex: Hexagon) {
    //     // const c = this.canvas.getBoundingClientRect();
    //     // const mouseX = e.x - c.x;
    //     // const mouseY = e.y - c.y;
    //     // const hex = this.getHex(mouseX, mouseY);
    //     this.brush.stroke(hex);
    // }

    // private hoverTile(hex: Hexagon) {
    //     this.brush.tint(hex);
    // }


    createGrid(cols: number, rows: number) {
        for (let i = 0; i < rows; i++) {
            const row: Hexagon[] = [];

            for (let j = 0; j < cols; j++) {
                const x = Math.round(i * HEX_OFFSET_X + (HEX_WIDTH / 2) * (j % 2));
                const y = Math.round(j * HEX_OFFSET_Y);
                // row.push(new Hexagon(x, y, HEX_SIZE, i, j, terrains.GRASS));
                row.push(new Hexagon(x, y, HEX_SIZE, terrains.GRASS, i, j));
            }

            this._entities.push(row);
        }
    }

    getDistance(c1: Hexagon, c2: Hexagon) {
        return Math.abs(c1.x - c2.x) + Math.abs(c1.y - c2.y);
    }

    getShortestPath(start: Hexagon, end: Hexagon) {

        const openSet = new PriorityQueue<Hexagon>();
        openSet.enqueue({ value: start, priority: 0 });

        const cameFrom = new Map<Hexagon, Hexagon>();

        const gScore = new Map<string, number>();
        gScore.set(start.id, 0);

        const fScore = new Map<string, number>();
        fScore.set(start.id, this.getDistance(start, end));

        while (!openSet.isEmpty) {

            const current = openSet.dequeue() as Hexagon;

            if (current === end) {
                return cameFrom;
            }

            for (const neighbor of this.getNeighbors(current)) {

                const currentGScore = gScore.get(neighbor.id) ?? Infinity;
                const tentativeGScore = (
                    gScore.get(current.id) as number
                    + neighbor.terrain.difficulty * HEX_SIZE
                    + this.getDistance(current, neighbor)
                );

                if (tentativeGScore < currentGScore) {
                    const neighborFScore = tentativeGScore + this.getDistance(neighbor, end);
                    cameFrom.set(neighbor, current);
                    gScore.set(neighbor.id, tentativeGScore);
                    fScore.set(neighbor.id, neighborFScore);

                    if (!openSet.contains(neighbor)) {
                        openSet.enqueue({ value: neighbor, priority: neighborFScore });

                        this.tentatives.push(
                            new Hexagon(neighbor.x, neighbor.y, HEX_SIZE, new Terrain('WATER', 'rgba(255,255,255,0.25)', Infinity, ''))
                        );
                    }
                }
            }
        }

        return false;
    }

    // update() {
    //     for (let i = 0, l = this.entities.length; i < l; i++) {
    //         this.entities[i].update(this);
    //     }
    // }

    render() {
        this.renderer.render(this.entities);
        this.renderer.render(this.tentatives);
        this.renderer.render(this.path);
        this.renderer.render([this.brush.overlay]);
    }
}

