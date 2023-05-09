import {EventBus} from "./eventbus";
import {eventbusService} from "./eventbus.service";

export function useEventBus<T>(key?: string): EventBus<T> {
    return eventbusService.getEventBus<T>(key);
}
