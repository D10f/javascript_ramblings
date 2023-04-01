const CELL_SIZE = 15;

interface Sketch {
  render(): void;
  destroy(): void;
}

function drawLine(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: CanvasGradient | string = 'white',
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

// class Cell {

// }

// class Particle {

// }

// class Grid {

//   private cols: number;
//   private rows: number;
//   private grid: number;

//   constructor(width: number, height: number) {
//     this.createGrid();
//   }

//   private createGrid() {
//     for (let i = 0; i < this.cols; i++) {
//       for (let j = 0; j < this.rows; j++) {

//       }
//     }
//   }

//   forEachCell(callback: Function) {
//     for (let i = 0; i < this.cols; i++) {
//       for (let j = 0; j < this.rows; j++) {
//         callback(this.grid[i + j * this.cols]);
//       }
//     }
//   }
// }

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
    this.eventListeners();
    this.createGradient();
    this.createGrid();
  }

  private eventListeners() {
    window.addEventListener('mousemove', this.updateMouseCoordinates);
  }

  private updateMouseCoordinates({ x, y }: MouseEvent) {
    this.x = x;
    this.y = y;
  }

  private createGrid() {
    for (let y = 0; y < this.canvasEl.height; y += CELL_SIZE) {
      for (let x = 0; x < this.canvasEl.width; x += CELL_SIZE) {
        drawLine(this.canvasCtx, x, y, x + 5, y + 5, this.gradient, 2);
      }
    }
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
    window.removeEventListener('mousemove', this.updateMouseCoordinates);
  }

  render() {
    // this.canvasCtx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
    // drawLine(this.canvasCtx, this.canvasEl.width / 2, this.canvasEl.height / 2, this.x, this.y);
  }
}
