import {App} from "vue";
import DataToast from "../toast/DataToast.vue";
import DataModal from "../modal/DataModal.vue";
import DataTable from "../table/DataTable.vue";
import {EventEmitterPlugin} from "../emitter/plugin";

export const DaisyDataComponentsPlugin = (app: App) => {
    app.use(EventEmitterPlugin)
        .component('DataToast', DataToast)
        .component('DataModal', DataModal)
        .component('DataTable', DataTable);
}
