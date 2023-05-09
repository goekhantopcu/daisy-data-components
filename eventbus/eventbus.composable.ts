import {EventBus} from "./eventbus";
import {getCurrentInstance} from "vue";
import {EventBusService} from "./eventbus.service";

export function useEventBus<T>(key?: string): EventBus<T> {
    const app = getCurrentInstance();
    if (!app) {
        throw new Error('There is no current app instance');
    }
    const properties = app.appContext.app.config.globalProperties;
    const eventBusService = properties?.$eventBusService as EventBusService;
    if (!eventBusService) {
        throw new Error('There is no eventBusService available');
    }
    return eventBusService.getEventBus<T>(key);
}
