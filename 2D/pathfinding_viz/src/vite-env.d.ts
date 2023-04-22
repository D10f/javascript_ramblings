/// <reference types="vite/client" />

type EventCallback = (data?: any) => void;

interface Terrain {
    type: 'FLOOR' | 'GRASS' | 'MOUNTAIN' | 'WATER';
    color: string;
    difficulty: number;
};
