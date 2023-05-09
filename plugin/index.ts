import {App} from "vue";
import {EventBusService} from "../eventbus";

export class DaisyDataComponentsPlugin {
    static install(app: App) {
        app.config.globalProperties.$eventService = new EventBusService();
    }
}
