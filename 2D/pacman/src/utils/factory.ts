import { CELL_SIZE, CHAR_LIST, TILE_TYPE } from '../defs';
import CollisionComponent from '../components/CollisionComponent';
import GraphicComponent from '../components/GraphicComponent';
import InputComponent from '../components/InputComponent';
import MovementComponent from '../components/MovementComponent';
import PathGeneratorComponent from '../components/PathComponent';
import RandomPathStrategy from '../components/RandomPathStrategy';
import Enemy2 from "../entities/Enemy2";
import Player2 from '../entities/Player2';

export const makeEnemyFactory = () => {

    let charIdx = 0;
    let posXIdx = 0;
    let enemy: Character;

    return () => {

        do {
            enemy = CHAR_LIST[charIdx];
            charIdx = (charIdx + 1) % CHAR_LIST.length;
        } while (enemy.name === 'JAVASCRIPT' || enemy.name === 'TYPESCRIPT');

        const x = CELL_SIZE * 6 + (posXIdx * CELL_SIZE);
        const y = CELL_SIZE * 8;

        posXIdx = (posXIdx + 1) % 4;

        return new Enemy2(
            x,
            y,
            new PathGeneratorComponent(new RandomPathStrategy()),
            new MovementComponent(),
            new GraphicComponent(enemy.image, enemy.color)
        );
    };
};

export const makePlayer = (x: number, y: number) => {
    const character = CHAR_LIST.find(c => c.name === 'JAVASCRIPT') as Character;
    return new Player2(
        x,
        y,
        new InputComponent(),
        new GraphicComponent(character.image, character.color),
        new MovementComponent(),
        new CollisionComponent([TILE_TYPE.FOOD])
    );
};
