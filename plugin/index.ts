import type {App} from "vue";
import DataToast from "../toast/DataToast.vue";
import DataModal from "../modal/DataModal.vue";
import DataTable from "../table/DataTable.vue";
import {EventEmitterPlugin} from "../emitter/plugin";
import DataCheckbox from "../checkbox/DataCheckbox.vue";
import DataDateTimePicker from "../datepicker/DataDateTimePicker.vue";
import DataSelect from "../select/DataSelect.vue";

export const DaisyDataComponentsPlugin = (app: App) => {
    app.use(EventEmitterPlugin)
        .component('DataCheckbox', DataCheckbox)
        .component('DataDateTimePicker', DataDateTimePicker)
        .component('DataToast', DataToast)
        .component('DataModal', DataModal)
        .component('DataSelect', DataSelect)
        .component('DataTable', DataTable);
}
