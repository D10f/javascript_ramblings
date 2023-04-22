import { CELL_SIZE, COLS } from "./main";
import Cell from "./Cell";
import EventEmitter from "./EventEmitter";
import Renderer from "./Renderer";
import PriorityQueue from "./PriorityQueue";

export default class World {

    private entities: Cell[];
    private start: Cell | null;
    private end: Cell | null;
    private assignStart: boolean;

    constructor(
        private canvas: HTMLCanvasElement,
        private emitter: EventEmitter,
        private renderer: Renderer
    ) {
        this.entities = [];
        this.start = null;
        this.end = null;
        this.assignStart = true;

        this.emitter.subscribe('click', (e: MouseEvent) => {
            const cell = this.getCell(e.x, e.y);

            if (this.assignStart) {
                this.start = this.getCell(e.x, e.y) as Cell;
                this.start.color = 'green';
            } else {
                this.end = this.getCell(e.x, e.y) as Cell;
                this.end.color = 'firebrick';
            }

            this.assignStart = !this.assignStart;

            if (this.start && this.end) {
                this.entities.forEach(c => c.color = 'coral');
                const map = this.getShortestPath(this.start, this.end);
                const path = this.reconstructPath(map, this.end);
                path.forEach(cell => cell.color = 'yellow')
                // path.forEach(c => c.color = 'yellow');
                // this.start.color = 'coral';
                // this.end.color = 'coral';
                this.start = null;
                this.end = null;
            }
        });
    }

    reconstructPath(cameFrom: any, current: any) {
        const shortestPath = [current];
        while(cameFrom.has(current)) {
            current = cameFrom.get(current);
            shortestPath.push(current);
        }
        return shortestPath;
    }

    createGrid(cols: number, rows: number) {
        const entities = [];
        for (let j = 0; j < rows; j++) {
            for (let i = 0; i < cols; i++) {
                const cell = new Cell(i * CELL_SIZE, j * CELL_SIZE);
                entities.push(cell);
            }
        }
        this.entities = entities;
    }

    getCell(x: number, y: number) {
        if (x < 0 || x >= this.canvas.width || y < 0 || y >= this.canvas.height) {
            return null;
        };
        x = Math.floor(x / CELL_SIZE);
        y = Math.floor(y / CELL_SIZE);
        return this.entities[x + y * COLS];
    }

    getNeighbours(cell: Cell) {
        const top = this.getCell(cell.x, cell.y - CELL_SIZE);
        const right = this.getCell(cell.x + CELL_SIZE, cell.y);
        const bottom = this.getCell(cell.x, cell.y + CELL_SIZE);
        const left = this.getCell(cell.x - CELL_SIZE, cell.y);
        return [top, right, bottom, left].filter(Boolean);
    }

    getDistance(c1: Cell, c2: Cell) {
        return Math.abs(c1.x - c2.x) + Math.abs(c1.y - c2.y);
    }

    getShortestPath(start: Cell, end: Cell) {

        // Set of discovered nodes
        const openSet = new PriorityQueue<Cell>();
        openSet.enqueue({ value: start, priority: 0 });

        // Used to reconstruct the shortest path
        const cameFrom = new Map();

        // Cost from start to node
        const gScore = new Map<string, number>();
        gScore.set(start.id, 0);

        // Current best guess to end
        const fScore = new Map<string, number>();
        fScore.set(start.id, this.getDistance(start, end));

        while (!openSet.isEmpty) {

            // Most promising known node (lowest fScore)
            const current = openSet.dequeue();

            if (this.getDistance(current!, end) === 0) {
                return cameFrom;
            }

            for (const neighbour of this.getNeighbours(current!)) {

                const tentativeGScore = (gScore.get(current!.id) ?? 0) + 1;

                if (!gScore.has(neighbour!.id) || tentativeGScore < gScore.get(neighbour!.id)!) {
                    const neighbourFScore = tentativeGScore + this.getDistance(neighbour!, end);
                    cameFrom.set(neighbour, current);
                    gScore.set(neighbour!.id, tentativeGScore);
                    fScore.set(neighbour!.id, neighbourFScore);

                    if (!openSet.contains(neighbour!)) {
                        openSet.enqueue({ value: neighbour!, priority: neighbourFScore });
                    }
                }
            }
        }

        // End node is unreachable
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

