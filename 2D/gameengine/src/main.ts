import ComponentFactory from './core/ComponentFactory';

import Vector2D from './common/objects/Vector2D';

const componentFactory = new ComponentFactory();

const transformComponent = componentFactory.create('transform', {
  position: new Vector2D(10, 20),
});

const c1 = componentFactory.create('transform', {
  position: new Vector2D(10, 20),
});

const c2 = componentFactory.create('shape', {
  vertices: 0,
  color: '2',
});

const c3 = componentFactory.create('movement', {
  velocity: new Vector2D(12, 33),
});

const c4 = componentFactory.create('sprite', {
  width: 23,
  height: 11,
});

console.log(c1.id);
console.log(c2.id);
console.log(c3.id);
console.log(c4.id);
console.log(transformComponent.id);
