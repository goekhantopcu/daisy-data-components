/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "modal/modal.ts",
        "modal/DataModal.vue",
        "table/DataTable.vue",
        "table/data-table.ts",
        "table/data-table-types.ts",
        "toast/DataToast.vue",
        "toast/toast.ts",
        "util/comparison.composable.ts",
        "util/eventbus.composable.ts",
        "util/pagination.composable.ts",
        "util/wildcard.composable.ts",
    ],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
}
