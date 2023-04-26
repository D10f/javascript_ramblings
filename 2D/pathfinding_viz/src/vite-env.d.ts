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

type TerrainType =
    'FLOOR'
    | 'GRASS'
    | 'MOUNTAIN'
    | 'ORE'
    | 'WATER'
    | 'WHEAT'
    | 'WOOD';
