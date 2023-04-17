import { CELL_SIZE } from '../defs';

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

export const drawImage = ({ ctx, x, y, image, color }: any) => {
    ctx.fillStyle = color;
    ctx.save();
    ctx.translate(x + (CELL_SIZE * 0.22), y + (CELL_SIZE * 0.22));
    ctx.fill(image);
    ctx.restore();
}
