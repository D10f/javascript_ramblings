import './style.css';

import { CELL_SIZE, MAP_COLS, MAP_ROWS, MAP } from './defs';
import Boundary from './components/Boundary';

const canvas = document.getElementById('canvas1') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const boundaries: Boundary[] = [];

for (let x = 0; x < MAP_COLS; x++) {
  for (let y = 0; y < MAP_ROWS; y++) {
    if (MAP[x][y] === '1') {
      boundaries.push(
        new Boundary(ctx, { x: x * CELL_SIZE, y: y * CELL_SIZE })
      );
    }
  }
}

boundaries.forEach(b => b.draw());

// new Boundary(ctx, { x: 125, y: 200 }).draw();
