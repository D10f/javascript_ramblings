import Vector2D from './common/objects/Vector2D';
import ComponentFactory from './core/Components/ComponentFactory';
import { TransformComponent } from './core/Components/types';
import Registry from './core/Registry';

const rg = new Registry();

const e1 = rg.createEntity();
const e2 = rg.createEntity();
const e3 = rg.createEntity();

rg.addEntityComponent(e1, 'transform', { position: new Vector2D(1, 1) });
rg.addEntityComponent(e2, 'transform', { position: new Vector2D(2, 2) });
rg.addEntityComponent(e3, 'sprite', { width: 23, height: 0 });

const c1 = rg.getEntityComponent(e1, 'transform');
const c2 = rg.getEntityComponent(e2, 'transform');
const c3 = rg.getEntityComponent(e3, 'sprite');

// import ComponentFactory from './core/Components/ComponentFactory';

// import Vector2D from './common/objects/Vector2D';

// const componentFactory = new ComponentFactory();

// const transformComponent = componentFactory.create('transform', {
//   position: new Vector2D(10, 20),
// });

// const c1 = componentFactory.create('transform', {
//   position: new Vector2D(10, 20),
// });

// const c2 = componentFactory.create('shape', {
//   vertices: 0,
//   color: '2',
// });

// const c3 = componentFactory.create('movement', {
//   velocity: new Vector2D(12, 33),
// });

// const c4 = componentFactory.create('sprite', {
//   width: 23,
//   height: 11,
// });

// console.log(c1.id);
// console.log(c2.id);
// console.log(c3.id);
// console.log(c4.id);
// console.log(transformComponent.id);
