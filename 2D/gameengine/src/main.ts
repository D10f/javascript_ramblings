import { componentFactory } from './core/ecs/Component';

import {
  TransformComponent,
  ShapeComponent,
  MovementComponent,
  SpriteComponent,
} from './common/components';

import Vector2D from './common/objects/Vector2D';

const createComponent = componentFactory();

const transformComponent = createComponent<TransformComponent>({
  type: 'Transform',
  position: { x: 12, y: 12 },
});

const c1 = createComponent<TransformComponent>({
  position: { x: 0, y: 0 },
  type: 'Transform',
});

const c2 = createComponent<ShapeComponent>({
  vertices: 0,
  color: '2',
  type: 'Shape',
});

const c3 = createComponent<MovementComponent>({
  velocity: new Vector2D(12, 33),
  type: 'Movement',
});

const c4 = createComponent<SpriteComponent>({
  width: 23,
  height: 11,
  type: 'Sprite',
});

console.log(c1.id);
console.log(c2.id);
console.log(c3.id);
console.log(c4.id);
console.log(transformComponent.id);
