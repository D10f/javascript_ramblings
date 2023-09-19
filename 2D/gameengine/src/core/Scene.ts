import Camera from '../modules/Camera';
import EventBus from '../modules/EventBus';
import Renderer from '../modules/Renderer';
import Timer from '../modules/Timer';
import AssetManager from './AssetManager';
import EntityManager from './EntityManager';

export default class Scene {
  private entityManager: EntityManager;
  private assetManager: AssetManager;
  private eventEmitter: EventBus;
  private renderer: Renderer;
  private timer: Timer;
  private camera: Camera;

  private isRunning: boolean;
  private isDebugging: boolean;

  constructor(canvas: HTMLCanvasElement) {
    this.entityManager = new EntityManager();
    this.assetManager = new AssetManager();
    this.eventEmitter = new EventBus();
    this.renderer = new Renderer(canvas);
    this.timer = new Timer();
    this.camera = new Camera();

    this.isRunning = false;
    this.isDebugging = false;

    this.setup();
    this.run();
  }

  setup() {
    // Initialize events, load assets, parse map, level, etc.
    this.eventEmitter.subscribe('Tick', () => {
      this.renderer.clear();
    });
  }

  run() {
    this.timer.loop();
  }
}
