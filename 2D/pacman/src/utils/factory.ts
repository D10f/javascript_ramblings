import { CELL_SIZE, CHAR_LIST } from '../defs';
import CollisionComponent from '../components/CollisionComponent';
import GraphicComponent from '../components/GraphicComponent';
import InputComponent from '../components/InputComponent';
import MovementComponent from '../components/MovementComponent';
import PathGeneratorComponent from '../components/PathComponent';
import RandomPathStrategy from '../components/PathStrategies/RandomPathStrategy';
import { TopLeftWanderer, TopRightWanderer, BottomLeftWanderer, BottomRightWanderer } from '../components/PathStrategies/WanderStrategy';
import HunterStrategy from '../components/PathStrategies/HunterStrategy';
import EventComponent from '../components/EventComponent';
import EventEmitter from '../systems/EventEmitter';
import Enemy from "../entities/Enemy";
import Player from '../entities/Player';
import ImageDrawingStrategy from '../components/GraphicStrategies/ImageDrawingStrategy';

export const makeEnemyFactory = (eventEmitter: EventEmitter) => {

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

        const strats = [
            [HunterStrategy, TopLeftWanderer, RandomPathStrategy],
            [RandomPathStrategy, HunterStrategy, TopRightWanderer],
            [BottomLeftWanderer, RandomPathStrategy, HunterStrategy],
            [RandomPathStrategy, BottomRightWanderer, HunterStrategy]
        ];

        return new Enemy(
            x,
            y,
            new PathGeneratorComponent({ strategies: strats[posXIdx] }),
            new MovementComponent(),
            new GraphicComponent(new ImageDrawingStrategy(enemy.image, enemy.color)),
            new EventComponent(eventEmitter),
        );
    };
};

export const makePlayerFactory = (eventEmitter: EventEmitter) => {

    return (x = CELL_SIZE * 3, y = CELL_SIZE * 3) => {
        const character = CHAR_LIST.find(c => c.name === 'JAVASCRIPT') as Character;
        return new Player(
            x,
            y,
            new InputComponent(eventEmitter),
            new GraphicComponent(new ImageDrawingStrategy(character.image, character.color)),
            new MovementComponent(),
            new CollisionComponent(eventEmitter),
            new EventComponent(eventEmitter),
        );
    };
};
