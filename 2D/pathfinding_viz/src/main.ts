import Canvas from './Canvas';
import './style.css';
import { clamp } from './utils';

export const CELL_SIZE = 20;

// const text = `
//     <p>Device width: ${window.outerWidth}</p>
//     <p>Device height: ${window.outerHeight}</p>
// `;
// document.getElementById('app')!.innerHTML = text;

const canvasElement = document.getElementById('canvas') as HTMLCanvasElement;

canvasElement.width = clamp(canvasElement.width, 560, 1280);
canvasElement.height = clamp(canvasElement.height, 360, 800);

const canvas = new Canvas(canvasElement);

canvas.init();

