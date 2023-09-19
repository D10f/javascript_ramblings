import { EventArgs, EventType } from './types';

type EventCallback<T extends EventType> = (args: EventArgs<T>) => void;

type EventStore = Map<EventType, EventCallback<any>[]>;

export default class EventBus {
  private eventStore: EventStore;

  constructor() {
    this.eventStore = new Map();
  }

  subscribe<T extends EventType>(eventType: T, callback: EventCallback<T>) {
    if (!this.eventStore.has(eventType)) {
      this.eventStore.set(eventType, []);
    }
    this.eventStore.get(eventType)!.push(callback);
  }

  emit<T extends EventType>(eventType: T, data?: EventArgs<T>) {
    console.log(eventType, data);
  }
}
