import {v4} from 'uuid';
import {emitters} from "./internal";

export type EventEmitterIdentifier = string;
export type EventListenerCallback<P> = (payload: P) => void;

export type EventListenerId = string;

export type EventListener<T> = {
    listenerId: EventListenerId;
    callback: EventListenerCallback<T>;
}

export function useEmitter(key: EventEmitterIdentifier) {
    let listeners = emitters.get(key);
    if (!listeners) {
        listeners = new Set<EventListener<any>>();
        emitters.set(key, listeners);
    }

    function subscribe<T>(callback: EventListenerCallback<T>): EventListenerId {
        const listenerId: EventListenerId = v4();
        const listener: EventListener<T> = {
            listenerId: listenerId,
            callback: callback
        };
        listeners?.add(listener);
        return listenerId;
    }

    function unsubscribe(listenerId: EventListenerId): boolean {
        let wasDeleted = false;
        listeners?.forEach(listener => {
            if (listener.listenerId === listenerId) {
                wasDeleted = listeners?.delete(listener) ?? false;
            }
        });
        return wasDeleted;
    }

    function publish(data: any) {
        listeners?.forEach(listener => listener.callback(data));
    }

    return {
        listeners,
        subscribe,
        unsubscribe,
        publish
    }
}
