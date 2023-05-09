import {EventBus} from "./eventbus";

export const DEFAULT_GENERAL_EVENT_BUS_KEY = 'daisy_data_general_event_bus';

class EventBusService {
    private static instance: EventBusService;
    private instances: Map<string, EventBus<any>> = new Map();

    private constructor() {}

    public static getInstance(): EventBusService {
        if (!EventBusService.instance) {
            EventBusService.instance = new EventBusService();
        }
        return EventBusService.instance;
    }

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

export const eventbusService = EventBusService.getInstance();
