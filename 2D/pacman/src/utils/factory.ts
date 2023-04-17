import GraphicComponent from '../components/GraphicComponent';
import MovementComponent from '../components/MovementComponent';
import PathGeneratorComponent from '../components/PathComponent';
import RandomPathStrategy from '../components/RandomPathStrategy';
import { ENEMY_LIST } from '../defs';
import Enemy2 from "../entities/Enemy2";

export const makeEnemy = (name: keyof typeof ENEMY_LIST, x: number, y: number) => {
    const type = ENEMY_LIST[name];
    return new Enemy2(
        x,
        y,
        new PathGeneratorComponent(new RandomPathStrategy()),
        new MovementComponent(),
        new GraphicComponent(new Path2D(type.image), type.color)
    );
};
