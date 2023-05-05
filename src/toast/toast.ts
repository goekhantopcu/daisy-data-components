import {publish} from "../util";

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

export const TOAST_EVENT_KEY = 'toast-notification';

export function showToast(event: ToastEvent | string) {
    if (typeof event === 'string') {
        return publish(TOAST_EVENT_KEY, {message: event});
    }
    publish(TOAST_EVENT_KEY, event);
}
