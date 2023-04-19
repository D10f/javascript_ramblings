import { CELL_SIZE, CHAR_LIST } from "../defs";
import Grid from "../systems/Grid";
import Vector from "../lib/Vector";
import GraphicComponent from "../components/GraphicComponent";
import ImageDrawingStrategy from "../components/GraphicStrategies/ImageDrawingStrategy";

class Player implements Entity {

    public position: Vector;
    public velocity: Vector;
    public targetPosition: Vector;
    public isMoving: boolean;
    public radius: number;

    public _powerUp: boolean;
    private powerUpTimeout: ReturnType<typeof setTimeout>;

    constructor(
        x: number,
        y: number,
        private inputComponent: any,
        private graphicComponent: GraphicComponent,
        private movementComponent: any,
        private collisionComponent: any,
        private eventComponent: any,
    ) {
        this.position = new Vector(x, y);
        this.velocity = new Vector(0, 0);
        this.targetPosition = new Vector(x, y);
        this.isMoving = false;
        this.radius = CELL_SIZE / 3;
        this._powerUp = false;
        this.powerUpTimeout = 0;
        this.eventComponent.eventEmitter.subscribe('powerUp', this.powerUp.bind(this));
    }

    private powerUp() {
        clearTimeout(this.powerUpTimeout);
        const character = this.getChar('TYPESCRIPT');
        this.graphicComponent = new GraphicComponent(
            new ImageDrawingStrategy(character.image, character.color)
        ),
        this._powerUp = true;
        this.powerUpTimeout = setTimeout(() => this.restore(), 6000);
    }

    private getChar(char: CharacterType) {
        return CHAR_LIST.find(c => c.name === char) as Character;
    }

    private restore() {
        const character = this.getChar('JAVASCRIPT');
        this.graphicComponent = new GraphicComponent(
            new ImageDrawingStrategy(character.image, character.color)
        );
    }

    update(world: Grid) {
        this.inputComponent.update(this);
        this.collisionComponent.update(this, world);
        this.movementComponent.update(this);
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.graphicComponent.draw(this, ctx);
    }
}

export default Player;
