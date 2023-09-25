import Vector2D from './common/objects/Vector2D';
import Registry from './core/Registry';

const rg = new Registry();

const e1 = rg.createEntity();
const e2 = rg.createEntity();
const e3 = rg.createEntity();
const e4 = rg.createEntity();

rg.addEntityComponent(e1, 'transform', { position: new Vector2D(1, 2) });
rg.addEntityComponent(e1, 'sprite', { width: 23, height: 44 });
rg.addEntityComponent(e2, 'shape', { color: 'asdsa', vertices: 3 });
rg.addEntityComponent(e4, 'movement', { velocity: new Vector2D(33, 33) });

// TODO: Add fn to create systems
const renderSystem = rg.addSystem('render');
rg.update();
console.log(renderSystem.systemComponentSignature.get(0));

// TODO: Add (correct) entities to system.
// TODO: Remove entity from system.
// TODO: Re-use freed entity ids
//
