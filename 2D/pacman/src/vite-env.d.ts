/// <reference types="vite/client" />

interface Entity {
    position: Vector;
    targetPosition?: Vector;
    velocity?: Vector;
    isMoving?: boolean;
    radius: number;
    update: (world: Grid) => void;
    draw: (ctx: CanvasRenderingContext2D) => void;
};

interface PathGenerationStrategy {
    generate: (entity: Entity, world: Grid) => Vector;
}

interface GraphicDrawingStrategy {
    draw(entity: Entity, ctx: CanvasRenderingContext2D): void;
}

type EventCallback = (data?: unkown) => void;

type DrawCircleProps = {
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    color: string
};

type Character = {
    name: CharacterType;
    color: string;
    image: Path2D;
};

type CharacterType =
    'ALPINE'
    | 'ANGULAR'
    | 'EMBER'
    | 'JAVASCRIPT'
    | 'JQUERY'
    | 'REACT'
    | 'REDWOOD'
    | 'TYPESCRIPT'
    | 'SVELTE'
    | 'VUE';

