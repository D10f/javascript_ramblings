import EventEmitter from './EventEmitter.ts';

type TimerProps = {
  emitter: EventEmitter;
  fps?: number;
  updateInterval: number;
};

export default class Timer {
  private lastTick: number;
  private timer: number;
  private updateInterval: number;
  private animationFrameId: number;
  private paused: boolean;
  private _fps: number;

  constructor(props: TimerProps) {
    this.lastTick = 0;
    this.timer = 0;
    this.paused = false;
    this.animationFrameId = 0;
    this.updateInterval = props.updateInterval ?? 1000;
    this._fps = props.fps ?? 30;
  }

  get interval() {
    return this.updateInterval / this.fps;
  }

  get fps() {
    return this._fps;
  }

  loop(timestamp = 0) {
    const delta = timestamp - this.lastTick;
    this.lastTick = timestamp;

    if (!this.paused) {
      if (this.timer < this.interval) {
        this.timer += delta;
      } else {
        this.timer = 0;
      }
    }

    this.animationFrameId = window.requestAnimationFrame(this.loop.bind(this));
  }
}
