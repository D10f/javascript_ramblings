import EventEmitter from "./EventEmitter";

class Scheduler {
  private animationFrameId: number;
  private lastTick: number;
  private timer: number;
  private updateInterval: number;

  public paused: boolean;

  constructor(private eventEmitter: EventEmitter) {
    this.lastTick = 0;
    this.timer = 0;
    this.updateInterval = 2;
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

  loop(timestamp: number) {
    if (!this.paused) {
      const delta = timestamp - this.lastTick;
      this.lastTick = timestamp;

      if (this.timer < this.updateInterval) {
        this.timer += delta;
      } else {
        this.timer = 0;
        this.eventEmitter.emit("tick");
      }
    }

    this.animationFrameId = window.requestAnimationFrame(this.loop.bind(this));
  }
}

export default Scheduler;
