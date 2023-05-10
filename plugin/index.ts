import {App} from "vue";
import DataToast from "../toast/DataToast.vue";
import DataModal from "../modal/DataModal.vue";
import DataTable from "../table/DataTable.vue";

export const DaisyDataComponentsPlugin = (app: App) => {
    app.component('DataToast', DataToast);
    app.component('DataModal', DataModal);
    app.component('DataTable', DataTable);
}
