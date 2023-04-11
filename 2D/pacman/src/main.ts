import './style.css';

import { CELL_SIZE } from './defs';
import Grid from './components/Grid';
import Player from './components/Player';
import Enemy from './entities/Enemy';

const canvas = document.getElementById('canvas1') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const grid = new Grid();
// const player = new Player({ x: CELL_SIZE * 3, y: CELL_SIZE * 3 });
const player = new Player(CELL_SIZE * 3, CELL_SIZE * 3, grid);
const entities = [
  new Enemy(CELL_SIZE * 6, CELL_SIZE * 8, '#e78284'),
  new Enemy(CELL_SIZE * 7, CELL_SIZE * 8, '#f4b8e4'),
  new Enemy(CELL_SIZE * 8, CELL_SIZE * 8, '#81c8be'),
  new Enemy(CELL_SIZE * 9, CELL_SIZE * 8, '#ef9f76'),
];

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  grid.update();
  grid.draw(ctx);
  player.update();
  player.draw(ctx);
  entities.forEach(entity => entity.draw(ctx));
  window.requestAnimationFrame(animate);
}

animate();
