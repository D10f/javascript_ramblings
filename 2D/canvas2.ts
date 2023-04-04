class Entity {}
// class Pacman extends Entity {}
// class Ghost extends Entity {}
// class Food extends Entity {}

type EventCallback = <K>(data: K) => void;

type EventStore = {
  [event: string]: EventCallback;
}

class EventEmitter {
  private eventStore: EventStore[];

  subscribe(event: string, callback: EventCallback) {
    this.eventStore[event].push(callback);
  }

  trigger<K>(event: string, data?: K) {
    this.eventStore[event].forEach((cb: EventCallback) => cb(data));
  }
}

class Environment extends EventEmitter {

  private entities: Entity[];

  constructor() {
    super();
  }
}

class Scheduler {
  private animationFrameId: number;
  private lastTick: number;
  private timer: number;
  private updateInterval: number;

  public paused: boolean;

  constructor(private environment: Environment) {
    window.requestAnimationFrame(this.loop.bind(this));
  }

  pause() {
    this.paused = true;
  }

  play() {
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
        this.environment.trigger('tick');
      }
    }

    this.animationFrameId = window.requestAnimationFrame(this.loop);
  }
}

class Experience {
  private canvasCtx: CanvasRenderingContext2D;
  private environment: Environment;
  private scheduler: Scheduler;

  constructor(private canvasEl: HTMLCanvasElement) {
    this.canvasCtx = canvasEl.getContext('2d');
    this.environment = new Environment();
    this.scheduler = new Scheduler(this.environment);
    this.windowEvents();
    this.mouseEvents();
    this.schedulerEvents();
  }

  private windowEvents() {
    window.addEventListener('resize', (ev: UIEvent) => {
      this.environment.trigger('resize', ev);
    });
  }

  private mouseEvents() {
    this.canvasEl.addEventListener('click', (ev: MouseEvent) => {
      this.environment.trigger('click', ev);
    });

    this.canvasEl.addEventListener('mousemove', (ev: MouseEvent) => {
      this.environment.trigger('mousemove', ev);
    });
  }

  private schedulerEvents() {
    this.environment.subscribe('tick', console.log);
  }
}
