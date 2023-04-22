import { ALLOW_DIAGONAL, CELL_SIZE, COLS } from "./defs";
import Cell from "./Cell";
import Renderer from "./Renderer";
import PriorityQueue from "./PriorityQueue";
import Floor from "./terrains/Floor";
import Brush from "./Brush";

export default class World {

    private entities: Cell[];
    private start: Cell | null;
    private end: Cell | null;
    private assignStart: boolean;

    private brush: Brush;
    private mousePressed: boolean;
    private renderer: Renderer

    constructor(private canvas: HTMLCanvasElement) {
        this.entities = [];
        this.start = null;
        this.end = null;
        this.assignStart = true;
        this.mousePressed = false;
        this.brush = new Brush(canvas);

        this.renderer = new Renderer(canvas);

        this.createGrid(
            Math.floor(this.canvas.width / CELL_SIZE),
            Math.floor(this.canvas.height / CELL_SIZE),
        );

        this.handleMouseInput();
    }

    private setStartOrEndPositions(cell: Cell) {
        if (this.assignStart) {
            this.start = cell;
        } else {
            this.end = cell;
        }

        this.assignStart = !this.assignStart;

        if (this.start && this.end) {
            const map = this.getShortestPath(this.start, this.end);
            if (!map) return;
            const path = this.reconstructPath(map, this.end);
            path.forEach(c => c.terrain.color = 'yellow');
            this.start = null;
            this.end = null;
        }
    }

    private handleMouseInput() {
        this.canvas.addEventListener('click', (e: MouseEvent) => {
            if (e.shiftKey) {
                const c = this.canvas.getBoundingClientRect();
                const mouseX = e.x - c.x;
                const mouseY = e.y - c.y;
                const cell = this.getCell(mouseX, mouseY) as Cell;
                this.setStartOrEndPositions(cell);
            } else {
                this.paintTile(e);
            }
        });

        this.canvas.addEventListener('mousedown', () => {
            this.mousePressed = true;
        });

        this.canvas.addEventListener('mouseup', () => {
            this.mousePressed = false;
        });

        this.canvas.addEventListener('mousemove', (e: MouseEvent) => {
            if (!this.mousePressed || e.shiftKey) return;
            this.paintTile(e);
        });
    }

    private paintTile(e: MouseEvent) {
        const c = this.canvas.getBoundingClientRect();
        const mouseX = e.x - c.x;
        const mouseY = e.y - c.y;
        const cell = this.getCell(mouseX, mouseY) as Cell;
        this.brush.stroke(cell);
    }

    private reconstructPath(cameFrom: Map<Cell, Cell>, current: Cell) {
        const shortestPath = [current];
        while(cameFrom.has(current)) {
            current = cameFrom.get(current) as Cell;
            shortestPath.push(current);
        }
        return shortestPath;
    }

    createGrid(cols: number, rows: number) {
        const entities = [];
        for (let j = 0; j < rows; j++) {
            for (let i = 0; i < cols; i++) {
                const cell = new Cell(i * CELL_SIZE, j * CELL_SIZE, new Floor());
                entities.push(cell);
            }
        }
        this.entities = entities;
    }

    getCell(x: number, y: number) {
        if (x < 0 || x + CELL_SIZE >= this.canvas.width || y < 0 || y >= this.canvas.height) {
            return null;
        };
        x = Math.floor(x / CELL_SIZE);
        y = Math.floor(y / CELL_SIZE);
        return this.entities[x + y * COLS];
    }

    getNeighbours(cell: Cell) {
        // top, right, bottom, left
        const neighbours = [
            this.getCell(cell.x, cell.y - CELL_SIZE),
            this.getCell(cell.x + CELL_SIZE, cell.y),
            this.getCell(cell.x, cell.y + CELL_SIZE),
            this.getCell(cell.x - CELL_SIZE, cell.y),
        ];

        if (ALLOW_DIAGONAL) {
            // top right, top left, bottom right, bottom left
            neighbours.push(
                this.getCell(cell.x - CELL_SIZE, cell.y - CELL_SIZE),
                this.getCell(cell.x + CELL_SIZE, cell.y - CELL_SIZE),
                this.getCell(cell.x - CELL_SIZE, cell.y + CELL_SIZE),
                this.getCell(cell.x + CELL_SIZE, cell.y + CELL_SIZE),
            );
        }

        return neighbours.filter((cell) => (
            cell && cell.terrain.difficulty !== Infinity
        )) as Cell[];
    }

    getDistance(c1: Cell, c2: Cell) {
        return Math.abs(c1.x - c2.x) + Math.abs(c1.y - c2.y);
    }

    getShortestPath(start: Cell, end: Cell) {

        const openSet = new PriorityQueue<Cell>();
        openSet.enqueue({ value: start, priority: 0 });

        const cameFrom = new Map<Cell, Cell>();

        const gScore = new Map<string, number>();
        gScore.set(start.id, 0);

        const fScore = new Map<string, number>();
        fScore.set(start.id, this.getDistance(start, end));

        while (!openSet.isEmpty) {

            const current = openSet.dequeue() as Cell;

            if (current === end) {
                return cameFrom;
            }

            for (const neighbour of this.getNeighbours(current)) {

                const currentGScore = gScore.get(neighbour.id) ?? Infinity;
                const tentativeGScore = (
                    gScore.get(current.id) as number
                    + neighbour.terrain.difficulty * CELL_SIZE
                    + this.getDistance(current, neighbour)
                );

                if (tentativeGScore < currentGScore) {
                    const neighbourFScore = tentativeGScore + this.getDistance(neighbour, end);
                    cameFrom.set(neighbour, current);
                    gScore.set(neighbour.id, tentativeGScore);
                    fScore.set(neighbour.id, neighbourFScore);

                    if (!openSet.contains(neighbour)) {
                        openSet.enqueue({ value: neighbour, priority: neighbourFScore });
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
    }
}

