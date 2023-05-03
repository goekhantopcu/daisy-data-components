import type {ToastEvent} from "./toast-types";
import {publish} from "./eventbus.composable";

export const TOAST_EVENT_KEY = 'toast-notification';

export function showToast(event: ToastEvent | string) {
    if (typeof event === 'string') {
        return publish(TOAST_EVENT_KEY, {message: event});
    }
    publish(TOAST_EVENT_KEY, event);
}
