import {v4} from 'uuid';
import {onMounted, onUnmounted} from "vue";

export type EventCallback<T> = (data: T) => void;

export type EventListener<T> = {
    id: string;
    key: string;
    callback: EventCallback<T>;
}

let listeners: EventListener<any>[] = [];

export function subscribe<T>(key: string, callback: EventCallback<T>) {
    const id = v4();
    onMounted(() => listeners.push({id: id, key: key, callback: callback}))
    onUnmounted(() => listeners = listeners.filter(listener => id !== listener.id));
}

export function publish(key: string, data: any) {
    listeners.filter(listener => listener.key === key).forEach(listener => listener.callback(data));
}
