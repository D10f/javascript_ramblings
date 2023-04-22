import EventEmitter from './EventEmitter';
import Grid from './Grid';
import Renderer from './Renderer';
import Scheduler from './Scheduler';
import { CELL_SIZE } from './defs';

export default class Canvas {

    private emitter: EventEmitter;
    private scheduler: Scheduler;
    private renderer: Renderer;
    private grid: Grid;

    constructor(private canvas: HTMLCanvasElement) {
        this.emitter = new EventEmitter();
        this.scheduler = new Scheduler(this.emitter);
        this.renderer = new Renderer(canvas);
        this.grid = new Grid(canvas);
        this.registerEvents();
    }

    private registerEvents() {
        this.emitter.subscribe('tick', () => {
            this.renderer.clear();
            // this.grid.update();
            this.grid.render();
        });
    }

    init() {
        this.scheduler.loop();
    }
}
