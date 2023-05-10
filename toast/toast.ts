import {EventEmitter} from "../emitter";

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

export const TOAST_NOTIFICATION_KEY = 'toast-notifications';

export function displayToast(emitter: EventEmitter, event: ToastEvent | string) {
    let data: ToastEvent;
    if (typeof event === 'string') {
        data = {message: event}
    } else {
        data = event;
    }
    emitter.publish(TOAST_NOTIFICATION_KEY, data);
}
