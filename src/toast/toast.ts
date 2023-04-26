import type {EventBusKey} from "@vueuse/core";
import {useEventBus} from "@vueuse/core";
import type {ToastEvent} from "./toast-types";

const toastNotificationKey: EventBusKey<ToastEvent> = Symbol('toast-key');

const useToastBus = () => useEventBus(toastNotificationKey);

const displayToast = (event: ToastEvent) => {
    const bus = useToastBus();
    bus.emit(event);
}

export {useToastBus, displayToast, toastNotificationKey}
