import {App} from "vue";
import DataTable from "../table/DataTable.vue";
import DataModal from "../modal/DataModal.vue";
import DataToast from "../toast/DataToast.vue";
import {EventBus} from "../util";

export class DaisyDataComponentsPlugin {
    static EVENT_BUS_INSTANCES = new Map<string, EventBus<any>>();

    static install(app: App) {
        app.component('DataModal', DataModal);
        app.component('DataTable', DataTable);
        app.component('DataToast', DataToast);
    }
}
