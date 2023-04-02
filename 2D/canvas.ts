interface Sketch {
  render(): void;
  destroy(): void;
}

interface GridCanvasComponent {
  forEachCell(callback: Function);
}

function drawLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) {
  ctx.beginPath();
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

  registerEvent<K extends keyof WindowEventMap>(type: K, listener: (this: Window, ev: WindowEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void {
    window.addEventListener(type, listener);
    this.events.push({ [type]: listener });
  }

  createSketch(sketch: Sketch) {
    this.registerEvent('blur', console.log);

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
        this.sketch.render();
      }
    }

    this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
  }
}

class Cell {

}

class Particle {

}

class Grid implements GridCanvasComponent {

  private cols: number;
  private rows: number;
  private grid: number;

  constructor(width: number, height: number) {
    this.createGrid();
  }

  private createGrid() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {

      }
    }
  }

  forEachCell(callback: Function) {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        callback(this.grid[i + j * this.cols]);
      }
    }
  }
}

class Flowfield implements Sketch {

  private x: number;
  private y: number;
  private grid: Grid;

  constructor(
    private canvasEl: HTMLCanvasElement,
    private canvasCtx: CanvasRenderingContext2D,
  ) {
    this.x = 100;
    this.y = 100;
    this.mouseCoordinates = this.mouseCoordinates.bind(this);
    window.addEventListener('mousemove', this.mouseCoordinates);
  }

  private mouseCoordinates({ x, y }: MouseEvent) {
    this.x = x;
    this.y = y;
  }

  destroy() {
    window.removeEventListener('mousemove', this.mouseCoordinates);
  }

  render() {
    // this.canvasCtx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
    drawLine(this.canvasCtx, this.canvasEl.width / 2, this.canvasEl.height / 2, this.x, this.y);
  }
}
