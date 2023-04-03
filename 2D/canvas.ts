const CELL_SIZE = 15;

interface Sketch {
  destroy(): void;
  update(): void;
  render(): void;
}

function drawLine(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string | CanvasGradient | CanvasPattern = 'white',
  weight = 3
) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = weight;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

type SketchEvent = {
  [K in keyof WindowEventMap]?: (this: Window, ev: WindowEventMap[keyof WindowEventMap]) => void;
}

class Canvas {
  public el: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;

  private sketch: Sketch;
  private paused: boolean;
  private updateInterval: number;
  private timer: number;
  private animationFrameId: number;
  private lastAnimationTick: number;
  private events: SketchEvent[];

  constructor(selector: string, fps = 60) {
    this.el = document.querySelector(selector);
    this.el.width = window.innerWidth;
    this.el.height = window.innerHeight;
    this.ctx = this.el.getContext('2d');
    this.updateInterval = Math.floor(1000/fps);
    this.timer = 0;
    this.lastAnimationTick = 0;

    window.addEventListener('resize', () => {
      this.el.width = window.innerWidth;
      this.el.height = window.innerHeight;
    });
  }

  addEventListener<K extends keyof WindowEventMap>(type: K, listener: (this: Window, ev: WindowEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void {
    window.addEventListener(type, listener);
    this.events.push({ [type]: listener });
  }

  createSketch(sketch: Sketch) {
    if (this.sketch) {
      this.destroy();
    }

    this.sketch = sketch;
  }

  play() {
    this.paused = false;
    this.animate(this.lastAnimationTick);
  }

  pause() {
    this.paused = true;
  }

  destroy() {
    this.paused = true;
    cancelAnimationFrame(this.animationFrameId)
    this.sketch.destroy();
    this.sketch = null;
  }

  animate(timestamp: number) {

    if (!this.paused) {
      const deltaTime = timestamp - this.lastAnimationTick;
      this.lastAnimationTick = timestamp;

      if (this.timer < this.updateInterval) {
        this.timer += deltaTime;
      } else {
        this.timer = 0;
        this.sketch.update();
        this.sketch.render();
      }
    }

    this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
  }
}

class Flowfield implements Sketch {

  private x: number;
  private y: number;
  private gradient: CanvasGradient;

  constructor(
    private canvasEl: HTMLCanvasElement,
    private canvasCtx: CanvasRenderingContext2D,
  ) {
    this.x = 100;
    this.y = 100;
    this.updateMouseCoordinates = this.updateMouseCoordinates.bind(this);
    this.setup();
  }

  private eventListeners() {
    this.canvasEl.addEventListener('mousemove', this.updateMouseCoordinates);
  }

  private updateMouseCoordinates({ x, y }: MouseEvent) {
    this.x = x;
    this.y = y;
  }

  private createGradient() {
    this.gradient = this.canvasCtx.createLinearGradient(0, 0, this.canvasEl.width, this.canvasEl.height);
    this.gradient.addColorStop(0.1, '#ff5c33');
    this.gradient.addColorStop(0.2, '#ff66b3');
    this.gradient.addColorStop(0.4, '#cccc33');
    this.gradient.addColorStop(0.6, '#b3ffff');
    this.gradient.addColorStop(0.8, '#80ff80');
    this.gradient.addColorStop(0.9, '#ffff33');
    this.canvasCtx.strokeStyle = this.gradient;
  }

  destroy() {
    this.canvasEl.removeEventListener('mousemove', this.updateMouseCoordinates);
  }

  setup() {
    this.eventListeners();
    this.createGradient();
  }

  update() {}

  render() {}
}
