import Vector2D from './common/objects/Vector2D';
import Registry from './core/Registry';

const rg = new Registry();

const e1 = rg.createEntity();
const e2 = rg.createEntity();
const e3 = rg.createEntity();
const e4 = rg.createEntity();

rg.addEntityComponent(e1, 'transform', { position: new Vector2D(1, 2) });
rg.addEntityComponent(e2, 'shape', { color: 'asdsa', vertices: 3 });
rg.addEntityComponent(e3, 'sprite', { width: 23, height: 44 });
rg.addEntityComponent(e4, 'movement', { velocity: new Vector2D(33, 33) });

// TODO: Add fn to create systems
rg.addEntityToSystem;

// TODO: Add (correct) entities to system.
// TODO: Remove entity from system.
// TODO: Re-use freed entity ids
//
