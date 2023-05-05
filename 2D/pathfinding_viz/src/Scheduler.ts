import EventEmitter from "./EventEmitter";
import { FPS } from "./defs";

type SchedulerProps = {
    emitter: EventEmitter,
    updateInterval?: number,
    fps?: number,
    tickEvent?: string
};

export default class Scheduler {
    private emitter: EventEmitter;
    private updateInterval: number;
    private fps: number;
    private lastTick: number;
    private timer: number;
    private animationFrameId: number;
    private tickEvent: string;
    public paused: boolean;


    // constructor(private eventEmitter: EventEmitter) {
    constructor(props: SchedulerProps) {
        this.emitter = props.emitter;
        this.lastTick = 0;
        this.timer = 0;
        // this.updateInterval = 1000 / FPS;
        this.fps = props.fps ?? FPS;
        this.updateInterval = props.updateInterval ?? 1000 / this.fps;
        this.tickEvent = props.tickEvent ?? 'tick';
        this.paused = false;
        this.animationFrameId = 0;
    }

    togglePause() {
        this.paused = !this.paused;
    }

    pause() {
        this.paused = true;
    }

    resume() {
        this.paused = false;
    }

    increaseCount(timeInMs: number) {
        this.timer += timeInMs;
    }

    loop(timestamp = 0) {
        if (!this.paused) {
            const delta = timestamp - this.lastTick;
            this.lastTick = timestamp;

            if (this.timer < this.updateInterval) {
                // this.timer += delta;
                this.increaseCount(delta);
            } else {
                this.emitter.emit(this.tickEvent, timestamp);
                this.timer = 0;
            }
        }

        this.animationFrameId = window.requestAnimationFrame(this.loop.bind(this));
    }
}
