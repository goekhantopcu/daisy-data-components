import {EventBus} from "./eventbus";

export const DEFAULT_GENERAL_EVENT_BUS_KEY = 'daisy_data_general_event_bus';

export class EventBusService {
    private instances: Map<string, EventBus<any>> = new Map();

    public getEventBus<T>(key?: string): EventBus<T> {
        if (key === undefined) {
            key = DEFAULT_GENERAL_EVENT_BUS_KEY;
        }
        const cached = this.instances.get(key);
        if (cached) {
            if (!cached.active) {
                throw new Error('The requested event-bus was disabled');
            }
            console.log(`Eventbus(action='cached', key='${key}', size='${Array(this.instances.keys()).length}')`);
            return cached;
        }
        const bus = new EventBus<T>(key);
        console.log(`Eventbus(action='register', key='${key}', size='${Array(this.instances.keys()).length}')`);
        this.instances.set(key, bus);
        return bus;
    }
}
