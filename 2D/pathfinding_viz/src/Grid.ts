import { CELL_SIZE, COLS } from "./main";
import Cell from "./Cell";
import EventEmitter from "./EventEmitter";
import Renderer from "./Renderer";

export default class World {

    private entities: any[];

    constructor(
        private canvas: HTMLCanvasElement,
        private emitter: EventEmitter,
        private renderer: Renderer
    ) {
        this.entities = [];

        this.emitter.subscribe('click', (e: MouseEvent) => {
            const cell = this.getCell(e.x, e.y);
            // cell.color = 'green';
            // this.getNeighbours(cell).forEach(c => c.color = 'green');
        });
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

    update() {
        for (let i = 0, l = this.entities.length; i < l; i++) {
            this.entities[i].update(this);
        }
    }

    render() {
        this.renderer.render(this.entities);
    }
}

