import './style.css';
import { CELL_SIZE } from './defs';
import Grid from './components/Grid';
import { makeEnemyFactory, makePlayer } from './utils/factory';

const canvas = document.getElementById('canvas1') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let points = 0;

function increasePoints(amount: number) {
    points += amount;
}

const grid = new Grid(increasePoints);
// const player = new Player(CELL_SIZE * 3, CELL_SIZE * 3, grid);
// const enemy = new Enemy(CELL_SIZE * 6, CELL_SIZE * 8, player, grid);

const makeEnemy = makeEnemyFactory();
const entities: Entity[] = [
    makePlayer(CELL_SIZE * 3, CELL_SIZE * 3),
    makeEnemy(),
    makeEnemy(),
    makeEnemy(),
    makeEnemy(),
];

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    grid.draw(ctx);

    for (let i = 0, length = entities.length; i < length; i++) {
        entities[i].update(grid);
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
