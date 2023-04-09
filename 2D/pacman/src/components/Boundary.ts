// type BoundaryProps = {
//     x: number;
//     y: number;
//     w: number;
//     h?: number;
// }

class Boundary {
    public width: number;
    public height: number;
    public x: number;
    public y: number;

    // constructor({ x, y, w, h }: BoundaryProps) {
    constructor(x: number, y: number, w: number, h?: number) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h ?? w;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'coral';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

export default Boundary;
