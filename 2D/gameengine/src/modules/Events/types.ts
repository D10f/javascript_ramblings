import Vector2D from '../../common/objects/Vector2D';
import { IEntity } from '../../core/Entities/Entity';

export type CollisionEvent = {
  entityA: IEntity;
  entityB: IEntity;
};

export type MouseEvent = {
  position: Vector2D;
  data: IEntity;
};

export type TickEvent = {
  currentTick: number;
  lastTick: number;
};

type EventMap = {
  rectCollision: CollisionEvent;
  circularCollision: CollisionEvent;
  click: MouseEvent;
  hover: MouseEvent;
  tick: TickEvent;
};

export type EventType = keyof EventMap;

export type EventArgs<T extends EventType> = EventMap[T];

export type Event<T extends EventType> = T & IEvent;

export type IEvent = {
  type: string;
};
