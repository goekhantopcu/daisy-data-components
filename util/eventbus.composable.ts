import {v4} from 'uuid';

export type EventCallback<T> = (data: T) => void;

export class EventBus<T> {
    private readonly key: string;
    private readonly listeners: Map<string, EventCallback<T>>;

    constructor(key: string) {
        this.key = key;
        this.listeners = new Map<string, EventCallback<T>>();
    }

    public subscribe(callback: EventCallback<T>): string {
        const id = v4();
        this.listeners.set(id, callback);
        console.log(`Eventbus(action='subscribe', key='${this.key}', id='${id}', size='${Array(this.listeners.keys()).length}')`);
        return id;
    }

    public unsubscribe(id: string) {
        this.listeners.delete(id);
        console.log(`Eventbus(action='unsubscribe', key='${this.key}', id='${id}', size='${Array(this.listeners.keys()).length}')`);
    }

    public publish(data: T) {
        this.listeners.forEach(value => value(data));
        console.log(`Eventbus(action='publish', key='${this.key}', data='${data}', size='${Array(this.listeners.keys()).length}')`);
    }

    public destroy() {
        this.listeners.clear();
        EVENT_BUS_INSTANCES.delete(this.key);
        console.log(`Eventbus(action='destroy', key='${this.key}', size='${Array(this.listeners.keys()).length}')`);
    }
}

export const DEFAULT_GENERAL_EVENT_BUS_KEY = 'daisy_data_general_event_bus';
export const EVENT_BUS_INSTANCES = new Map<string, EventBus<any>>;

export function useEventBus<T>(key?: string): EventBus<T> {
    if (key === undefined) {
        return useEventBus(DEFAULT_GENERAL_EVENT_BUS_KEY);
    }
    const cached = EVENT_BUS_INSTANCES.get(key);
    if (cached) {
        console.log(`Eventbus(action='cached', key='${key}', size='${Array(EVENT_BUS_INSTANCES.keys()).length}')`);
        return cached;
    }
    const bus = new EventBus<T>(key);
    console.log(`Eventbus(action='register', key='${key}', size='${Array(EVENT_BUS_INSTANCES.keys()).length}')`);
    EVENT_BUS_INSTANCES.set(key, bus);
    return bus;
}
