import './style.css';

import { CELL_SIZE } from './defs';
import Grid from './components/Grid';
import Player from './components/Player';

const canvas = document.getElementById('canvas1') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const grid = new Grid();
const player = new Player({ x: CELL_SIZE * 3, y: CELL_SIZE * 3 });

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  grid.draw(ctx);
  player.update();
  player.draw(ctx);
  window.requestAnimationFrame(animate);
}

animate();
