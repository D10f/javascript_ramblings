import './style.css';
import { CELL_SIZE } from './defs';
import Grid from './components/Grid';
import Player from './components/Player';
// import Enemy from './entities/Enemy';
import ReactGhost from './entities/ReactGhost';
import SvelteGhost from './entities/SvelteGhost';
import AngularGhost from './entities/AngularGhost';
import VueGhost from './entities/VueGhost';

const canvas = document.getElementById('canvas1') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let points = 0;

function increasePoints(amount: number) {
  points += amount;
}

const grid = new Grid(increasePoints);
const player = new Player(CELL_SIZE * 3, CELL_SIZE * 3, grid);
const entities = [
  player,
  new ReactGhost(CELL_SIZE * 6, CELL_SIZE * 8, player, grid),
  new SvelteGhost(CELL_SIZE * 7, CELL_SIZE * 8, player, grid),
  new AngularGhost(CELL_SIZE * 8, CELL_SIZE * 8, player, grid),
  new VueGhost(CELL_SIZE * 9, CELL_SIZE * 8, player, grid),
];

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  grid.draw(ctx);

  for (let i = 0, length = entities.length; i < length; i++) {
    entities[i].update();
    entities[i].draw(ctx);
  }

  ctx.strokeStyle = '#303466';
  ctx.strokeText(
    `Points: ${points}`,
    CELL_SIZE,
    CELL_SIZE - 16
  );

  window.requestAnimationFrame(animate);
}

animate();
