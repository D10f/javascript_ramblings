import EventEmitter from './EventEmitter';
// import World from './World';
import HexGrid from './HexGrid';
import Renderer from './Renderer';
import Scheduler from './Scheduler';
import { map } from './defs';

export default class Canvas {

    private emitter: EventEmitter;
    private scheduler: Scheduler;
    private renderer: Renderer;
    // private world: World;
    private world: HexGrid;

    constructor(canvas: HTMLCanvasElement) {
        this.emitter = new EventEmitter();
        this.scheduler = new Scheduler({ emitter: this.emitter });
        this.renderer = new Renderer(canvas);
        // this.world = new World(canvas);
        this.world = new HexGrid(canvas, this.renderer, map);
        this.registerEvents();
    }

    private registerEvents() {
        this.emitter.subscribe('tick', () => {
            this.renderer.clear();
            // this.grid.update();
            this.world.render();
        });
    }

    init() {
        this.scheduler.loop();
    }
}
