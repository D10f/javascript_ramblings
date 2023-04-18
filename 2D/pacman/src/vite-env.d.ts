/// <reference types="vite/client" />

type DrawCircleProps = {
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    color: string
};

type Entity = {};

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
