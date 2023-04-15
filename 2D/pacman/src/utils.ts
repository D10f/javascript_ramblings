import { CELL_SIZE } from './defs';

type DrawCircleProps = {
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    color: string
};

export const drawCircle = ({ ctx, x, y, radius, color }: DrawCircleProps) => {
    ctx.beginPath();
    ctx.save();
    ctx.translate(x, y);
    ctx.arc(CELL_SIZE / 2, CELL_SIZE / 2, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
    ctx.closePath();
};

// https://github.com/processing/p5.js/blob/v1.6.0/src/math/calculation.js#L71
export const constrain = (n: number, high: number, low: number) => {
    return Math.max(Math.min(n, high), low);
};

