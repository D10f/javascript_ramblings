import EventEmitter from './EventEmitter';
import Grid from './Grid';
import Renderer from './Renderer';
import Scheduler from './Scheduler';
import { CELL_SIZE } from './main';

export default class Canvas {

    private emitter: EventEmitter;
    private scheduler: Scheduler;
    private renderer: Renderer;
    private grid: Grid;

    constructor(private canvas: HTMLCanvasElement) {
        this.emitter = new EventEmitter();
        this.scheduler = new Scheduler(this.emitter);
        this.renderer = new Renderer(canvas);
        this.grid = new Grid(canvas, this.emitter, this.renderer);
        this.registerEvents();
    }

    private registerEvents() {
        this.emitter.subscribe('tick', () => {
            this.renderer.clear();
            this.grid.update();
            this.grid.render();
        });

        this.canvas.addEventListener('click', (e: MouseEvent) => {
            const c = this.canvas.getBoundingClientRect();
            // console.log(`x: ${e.x - c.x}, y: ${e.y - c.y}`);
            this.emitter.emit('click', { x: e.x - c.x, y: e.y - c.y });
        });
    }

    init() {
        this.grid.createGrid(
            Math.floor(this.canvas.width / CELL_SIZE),
            Math.floor(this.canvas.height / CELL_SIZE),
        );
        this.scheduler.loop();
    }
}
