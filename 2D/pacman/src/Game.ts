import Scheduler from "./systems/Scheduler";
import EventEmitter from "./systems/EventEmitter";
import Renderer from "./systems/Renderer";
import World from "./systems/World";
import ScoreSystem from "./systems/Score";

class Game {

    private world: World;
    private eventEmitter: EventEmitter;
    private scheduler: Scheduler;
    private renderer: Renderer;
    private score: ScoreSystem;

    constructor(private canvasEl: HTMLCanvasElement) {
        this.eventEmitter = new EventEmitter();
        this.scheduler = new Scheduler(this.eventEmitter);
        this.renderer = new Renderer(this.canvasEl);
        this.world = new World(this.eventEmitter);
        this.score = new ScoreSystem(this.eventEmitter);

        this.eventEmitter.subscribe('tick', () => {
            this.renderer.clear();
            this.world.update();
            this.renderer.add(this.score);
            this.renderer.add(this.world.entities);
            this.renderer.render();
        });

        this.keyboardEvents();
        this.gameEvents();
    }

    private keyboardEvents() {
        window.addEventListener('keydown', (ev: KeyboardEvent) => {
            const key = ev.key.toUpperCase();

            if (key === 'P') {
                this.scheduler.togglePause();
                return;
            }

            this.eventEmitter.emit('keydown', key);
        });
    }

    private gameEvents() {
        this.eventEmitter.subscribe('win', () => {
            this.scheduler.pause();
        });

        this.eventEmitter.subscribe('gameOver', () => {
            this.scheduler.pause();
        });
    }

    init() {
        this.scheduler.loop(0);
    }
}

export default Game;
