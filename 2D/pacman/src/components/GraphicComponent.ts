class GraphicComponent {

    constructor(private strategy: GraphicDrawingStrategy) {}

    draw(entity: Entity, ctx: CanvasRenderingContext2D) {
        this.strategy.draw(entity, ctx);
    }
}

export default GraphicComponent;
