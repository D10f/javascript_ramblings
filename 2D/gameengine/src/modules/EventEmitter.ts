import { CollisionEvent, EventTypes, MouseEvent } from '../common/events';
import Vector2D from '../common/objects/Vector2D';
import Entity from '../core/Entity';

type EventCallback<T extends EventTypes> = (data: Omit<T, 'type'>) => void;

type EventStore = Map<EventTypes['type'], Function[]>;

export default class EventEmitter {
  private eventStore: EventStore;

  constructor() {
    this.eventStore = new Map();
  }

  // subscribe(eventType: EventTypes['type'], callback: EventCallback) {
  subscribe<T extends EventTypes>(
    eventType: T['type'],
    callback: EventCallback<T>,
  ) {
    if (this.eventStore.has(eventType)) {
      this.eventStore.set(eventType, []);
    }

    this.eventStore.get(eventType)!.push(callback);
  }

  // emit(event: EventTypes['type'], data?: unknown) {
  emit<T extends EventTypes>(eventType: T['type'], data?: Omit<T, 'type'>) {
    if (!this.eventStore.has(eventType)) return;
    this.eventStore.get(eventType)!.forEach((cb) => cb(data));
  }
}
