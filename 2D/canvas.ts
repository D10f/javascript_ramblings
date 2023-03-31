interface Sketch {
  render(): void;
  destroy(): null;
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
  }

  pause() {
    this.paused = true;
  }

  destroy() {
    this.paused = true;
    this.sketch = this.sketch.destroy();
    cancelAnimationFrame(this.animationFrameId)
  }

  play() {
    this.paused = false;
    this.animate(this.lastAnimationTick);

    // this.animationFrameId = requestAnimationFrame((timestamp: number) => {
    //   if (this.paused) return;

    //   const deltaTime = timestamp - this.lastAnimationTick;
    //   this.lastAnimationTick = timestamp;

    //   if (this.timer < this.fps) {
    //     this.timer += deltaTime;
    //     return;
    //   }

    //   this.timer = 0;
    //   this.sketch.render(timestamp);
    // });
  }

  animate(timestamp: number) {

    if (!this.paused) {
      const deltaTime = timestamp - this.lastAnimationTick;
      this.lastAnimationTick = timestamp;

      if (this.timer < this.fps) {
        this.timer += deltaTime;
      } else {
        this.timer = 0;
        this.sketch.render();
      }
    }

    this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
  }
}

class Flowfield implements Sketch {

  private x: number;
  private y: number;

  constructor(
    private canvasEl: HTMLCanvasElement,
    private canvasCtx: CanvasRenderingContext2D,
  ) {
    this.x = 100;
    this.y = 100;
    this.mouseCoordinates = this.mouseCoordinates.bind(this);
    this.events();
  }

  private events() {
    window.addEventListener('mousemove', this.mouseCoordinates);
  }

  private mouseCoordinates({ x, y }) {
    this.x = x;
    this.y = y;
  }

  destroy() {
    window.removeEventListener('mousemove', this.mouseCoordinates);
    return null;
  }

  render() {
    this.canvasCtx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
  }
}
