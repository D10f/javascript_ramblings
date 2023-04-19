import EventEmitter from "../systems/EventEmitter";

class EventComponent {
    constructor(public readonly eventEmitter: EventEmitter) {}
}

export default EventComponent;
