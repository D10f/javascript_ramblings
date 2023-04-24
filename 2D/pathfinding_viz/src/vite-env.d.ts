/// <reference types="vite/client" />

type HexagonRelativePosition =
    'RIGHT'
    | 'TOP_RIGHT'
    | 'TOP_LEFT'
    | 'LEFT'
    | 'BOTTOM_LEFT'
    | 'BOTTOM_RIGHT';

type HexagonLookupTable = {
    [key in HexagonRelativePosition]: number[][]
}

type EventCallback = (data?: any) => void;

type Terrain = {
    type: 'FLOOR' | 'GRASS' | 'MOUNTAIN' | 'WATER';
    color: string;
    difficulty: number;
};
