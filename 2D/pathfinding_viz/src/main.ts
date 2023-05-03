import Canvas from './Canvas';
import './style.css';

const app = document.getElementById('app') as HTMLDivElement;
const canvasEl = document.createElement('canvas') as HTMLCanvasElement;

canvasEl.width = 800;
canvasEl.height = 600;

app.insertAdjacentElement('beforeend', canvasEl);

const canvas = new Canvas(canvasEl);

canvas.init();

