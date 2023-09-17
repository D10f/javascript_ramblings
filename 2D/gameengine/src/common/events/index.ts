import { IEntity } from '../../core/Entity';
import Vector2D from '../objects/Vector2D';

export type CollisionEvent = {
  type: 'RectCollision' | 'CircularCollision';
  entityA: IEntity;
  entityB: IEntity;
};

export type MouseEvent = {
  type: 'Move' | 'Click' | 'DoubleClick';
  position: Vector2D;
};

export type EventTypes = CollisionEvent | MouseEvent;

export type Event<T extends EventTypes> = T & IEvent;

export type IEvent = {
  type: string;
};
