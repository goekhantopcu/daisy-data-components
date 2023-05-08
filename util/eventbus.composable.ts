import {v4} from 'uuid';
import {onMounted, onUnmounted} from "vue";

export type EventCallback<T> = (data: T) => void;

export class EventBus<T> {
    static EVENT_BUS_INSTANCES = new Map<string, EventBus<any>>;

    private readonly key: string;
    private readonly listeners: Map<string, EventCallback<T>>;

    constructor(key: string) {
        this.key = key;
        this.listeners = new Map<string, EventCallback<T>>();
    }

    public subscribe(callback: EventCallback<T>) {
        const id = v4();
        onMounted(() => this.listeners.set(id, callback))
        onUnmounted(() => this.listeners.delete(id));
    }

    public publish(data: T) {
        this.listeners.forEach(value => value(data));
    }
}

export function useEventBus<T>(key?: string): EventBus<T> {
    if (key === undefined) {
        return useEventBus('daisy_data_general_event_bus');
    }
    const cached = EventBus.EVENT_BUS_INSTANCES.get(key);
    if (cached) {
        return cached;
    }
    const bus = new EventBus<T>(key);
    EventBus.EVENT_BUS_INSTANCES.set(key, bus);
    return bus;
}
