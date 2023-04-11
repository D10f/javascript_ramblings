import { CELL_SIZE } from '../defs';

type DrawCircleProps = {
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    color: string
}

export default ({ ctx, x, y, radius, color }: DrawCircleProps) => {
    ctx.beginPath();
    ctx.save();
    ctx.translate(x, y);
    ctx.arc(CELL_SIZE / 2, CELL_SIZE / 2, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
    ctx.closePath();
};
