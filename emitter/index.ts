import {v4} from 'uuid';
import {inject} from "vue";

export type EventEmitterIdentifier = string;
export type EventListenerCallback<P> = (payload: P) => void;

export type EventListenerId = string;

export type EventListener<T> = {
    listenerId: EventListenerId;
    callback: EventListenerCallback<T>;
}

export class EventEmitter {
    private emitters = new Map<EventEmitterIdentifier, Set<EventListener<any>>>();

    private listeners(identifier: EventEmitterIdentifier): Set<EventListener<any>> {
        let listeners = this.emitters.get(identifier);
        if (!listeners) {
            listeners = new Set<EventListener<any>>();
            this.emitters.set(identifier, listeners);
        }
        return listeners;
    }

    public subscribe<T>(identifier: EventEmitterIdentifier, callback: EventListenerCallback<T>): EventListenerId {
        const listenerId: EventListenerId = v4();
        const listener: EventListener<T> = {
            listenerId: listenerId,
            callback: callback
        };
        this.listeners(identifier).add(listener);
        return listenerId;
    }

    public unsubscribe(identifier: EventEmitterIdentifier, listenerId: EventListenerId): boolean {
        let wasDeleted = false;
        let listeners = this.listeners(identifier);
        listeners.forEach(listener => {
            if (listener.listenerId === listenerId) {
                wasDeleted = listeners.delete(listener) ?? false;
            }
        });
        return wasDeleted;
    }

    public publish(identifier: EventEmitterIdentifier, data: any) {
        this.listeners(identifier)?.forEach(listener => listener.callback(data));
    }
}

export function useEmitter(): EventEmitter {
    const emitter = inject<EventEmitter>('emitter');
    if (!emitter) {
        throw new Error('There is no emitter available, make sure you use the useEmitter function inside the setup scope');
    }
    return emitter;
}
