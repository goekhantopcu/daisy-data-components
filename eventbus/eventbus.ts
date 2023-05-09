import {v4} from "uuid";

export type EventCallback<T> = (data: T) => void;

export class EventBus<T> {
    active: boolean;
    readonly key: string;
    private readonly listeners: Map<string, EventCallback<T>>;

    constructor(key: string) {
        this.key = key;
        this.active = true;
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
        this.active = false;
        this.listeners.clear();
        console.log(`Eventbus(action='destroy', key='${this.key}', size='${Array(this.listeners.keys()).length}')`);
    }
}
