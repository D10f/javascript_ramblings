import { CELL_SIZE } from "./main";
import Cell from "./Cell";
import EventEmitter from "./EventEmitter";
import Renderer from "./Renderer";

export default class World {

    private entities: any[];

    constructor(private emitter: EventEmitter, private renderer: Renderer) {
        this.entities = [];
    }

    createGrid(cols: number, rows: number) {
        const entities = [];
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                const cell = new Cell(i * CELL_SIZE, j * CELL_SIZE);
                entities.push(cell);
            }
        }
        this.entities = entities;
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

