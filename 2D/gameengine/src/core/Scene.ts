import Camera from '../modules/Camera';
import EventBus from '../modules/Events/EventBus';
import Renderer from '../modules/Renderer';
import Timer from '../modules/Timer';
import AssetManager from './AssetManager';
import EntityManager from './Entities/EntityManager';

export default class Scene {
  private entityManager: EntityManager;
  private assetManager: AssetManager;
  private eventBus: EventBus;
  private renderer: Renderer;
  private timer: Timer;
  private camera: Camera;

  private isRunning: boolean;
  private isDebugging: boolean;

  constructor(canvas: HTMLCanvasElement) {
    this.entityManager = new EntityManager();
    this.assetManager = new AssetManager();
    this.eventBus = new EventBus();
    this.renderer = new Renderer(canvas);
    this.timer = new Timer();
    this.camera = new Camera();

    this.isRunning = false;
    this.isDebugging = false;

    this.setup();
  }

  setup() {
    // Initialize events, load assets, parse map, level, etc.
    this.timer.loop();
    this.eventBus.subscribe('tick', this.update);
  }

  update() {
    this.renderer.clear();
    this.renderer.render();
  }
}
