document.addEventListener("DOMContentLoaded", main);

function main() {
  const canvas = new Canvas('#canvas');
  canvas.createSketch(new Flowfield(canvas.el, canvas.ctx));
}

class Canvas {
  public el: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;

  private sketch: Sketch;
  private paused: boolean;
  private fps: number;
  private timer: number;
  private animationFrameId: number;
  private lastAnimationTick: number;

  constructor(selector: string, fps = 60) {
    this.el = document.querySelector(selector);
    this.el.width = window.innerWidth;
    this.el.height = window.innerHeight;
    this.ctx = this.el.getContext('2d');
    this.fps = fps;
    this.timer = 0;
    this.lastAnimationTick = 0;
    this.events();
  }

  private events() {
    window.addEventListener('resize', () => {
      this.el.width = window.innerWidth;
      this.el.height = window.innerHeight;
    });
  }

  createSketch(sketch: Sketch) {
    if (this.sketch) {
      this.destroy();
    }

    this.sketch = sketch;
    this.play();
  }

  play() {
    this.paused = false;
    this.animationFrameId = requestAnimationFrame((timestamp: number) => {
      if (this.paused) return;

      const deltaTime = timestamp - this.lastAnimationTick;
      this.lastAnimationTick = timestamp;

      if (this.timer < this.fps) {
        this.timer += deltaTime;
        return;
      }

      this.timer = 0;
      this.sketch.render(timestamp);
    });
  }

  pause() {
    this.paused = true;
  }

  destroy() {
    this.paused = true;
    this.sketch = null;
    cancelAnimationFrame(this.animationFrameId)
  }
}

interface Sketch {
  paused: boolean;
  render(timestamp: number): void;
}

class Flowfield implements Sketch {
  public paused: boolean;

  constructor(
    private canvasEl: HTMLCanvasElement,
    private canvasCtx: CanvasRenderingContext2D,
  ) {}

  render(timestamp: number) {
    this.canvasCtx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
  }

  // draw(x: number, y: number) {
  //   this.ctx.beginPath();
  //   this.ctx.moveTo(x, y);
  //   this.ctx.lineTo(x + 100, y + 100);
  //   this.ctx.stroke();
  // }

  // animate() {
  //   this.ctx.clearRect(0, 0, this.width, this.height);
  //   this.draw(100, 100);
  //   requestAnimationFrame(this.animate.bind(this));
  // }
}
