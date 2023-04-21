import Canvas from './Canvas';
import './style.css';
import { clamp } from './utils';

const WIDTH = 800;
const HEIGHT = 600;

const canvasElement = document.getElementById('canvas') as HTMLCanvasElement;
// canvasElement.width = clamp(canvasElement.width, 560, 1280);
// canvasElement.height = clamp(canvasElement.height, 360, 800);
canvasElement.width = clamp(canvasElement.width, WIDTH, 1280);
canvasElement.height = clamp(canvasElement.height, HEIGHT, 800);

export const CELL_SIZE = 20;
export const COLS = Math.floor(canvasElement.width / CELL_SIZE);
export const ROWS = Math.floor(canvasElement.height / CELL_SIZE);

const canvas = new Canvas(canvasElement);

canvas.init();

