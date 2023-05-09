import {App} from "vue";
import DataTable from "../table/DataTable.vue";
import DataModal from "../modal/DataModal.vue";
import DataToast from "../toast/DataToast.vue";
import {EventBusPlugin} from "../util";

export class DaisyDataComponents {
    static install(app: App) {
        EventBusPlugin.install(app);
        app.component('DataModal', DataModal);
        app.component('DataTable', DataTable);
        app.component('DataToast', DataToast);
    }
}
