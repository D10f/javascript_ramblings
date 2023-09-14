import ComponentFactory from './common/components/Factory';

import {
  TransformComponent,
  ShapeComponent,
  MovementComponent,
  SpriteComponent,
} from './common/components';

import Vector2D from './common/objects/Vector2D';

const componentFactory = new ComponentFactory();

const transformComponent = componentFactory.createComponent<TransformComponent>(
  {
    type: 'Transform',
    position: new Vector2D(10, 20),
  },
);

const c1 = componentFactory.createComponent<TransformComponent>({
  position: new Vector2D(10, 20),
  type: 'Transform',
});

const c2 = componentFactory.createComponent<ShapeComponent>({
  vertices: 0,
  color: '2',
  type: 'Shape',
});

const c3 = componentFactory.createComponent<MovementComponent>({
  velocity: new Vector2D(12, 33),
  type: 'Movement',
});

const c4 = componentFactory.createComponent<SpriteComponent>({
  width: 23,
  height: 11,
  type: 'Sprite',
});

console.log(c1.id);
console.log(c2.id);
console.log(c3.id);
console.log(c4.id);
console.log(transformComponent.id);
