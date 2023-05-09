import {useEventBus} from "../eventbus";

export interface Toast {
    id: string;
    message: string;
    classes: string;
}

export interface ToastEvent {
    id?: string;
    message: string;
    type?: 'error' | 'info' | 'success' | 'warning';
    duration?: number;
    styling?: string;
}

export function showToast(event: ToastEvent | string) {
    const bus = useEventBus<ToastEvent>('toast-notifications');
    if (typeof event === 'string') {
        event = {message: event};
    }
    bus.publish(event);
}
