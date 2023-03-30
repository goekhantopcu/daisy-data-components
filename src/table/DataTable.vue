<template>
  <slot v-if="tableOptions.enableSearch" name="dd-table-search"/>
  <div class="dd-table-parent">
    <table class="dd-table">

      <thead class="dd-table-head">
      <tr class="dd-table-head-row">
        <th v-for="(column, index) in tableOptions.columns"
            :key="index"
            class="dd-table-head-column"
            @click="sortColumn(column)">
          <slot name="column-title" :column="column" :index="index"/>
        </th>
      </tr>
      </thead>

      <tbody v-if="tableOptions.isDataLoading">
      <slot name="body-loading"/>
      </tbody>

      <tbody v-else-if="filteredItems.length === 0">
      <tr class="dd-table-body-row">
        <td :colspan="tableOptions.columns.length" class="dd-table-body-column">
          <slot name="body-no-data"/>
        </td>
      </tr>
      </tbody>

      <tbody v-else class="dd-table-body">
      <tr v-for="(item, index) in page.data" :key="index" class="dd-table-body-row">
        <td v-for="(column, index) in tableOptions.columns" :key="index" class="dd-table-body-column">
          <slot :name="column.slot" :item="item" :index="index" :column="column"/>
        </td>
      </tr>
      </tbody>

      <tfoot class="dd-table-foot">
      <tr class="dd-table-foot-row">
        <td :colspan="tableOptions.columns.length" class="dd-table-foot-column">
          <slot name="footer" :pages="pages" :page="page"/>
        </td>
      </tr>
      </tfoot>

    </table>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, watch} from "vue";
import {DataTableColumn, DataTableOptions, paginate, search, sort} from "./data-table";

const props = defineProps<{ options: DataTableOptions<any> }>()

const tableOptions = ref<DataTableOptions<any>>(props.options)

const filteredItems = ref<any[]>(tableOptions.value.items)

const sortColumn = (column: DataTableColumn<any>) => {
  filteredItems.value = sort(filteredItems.value, column)
}

const pages = computed(() => paginate(filteredItems.value, tableOptions.value))
const page = computed(() => pages.value[tableOptions.value.pageCurrentId])

watch(() => props.options,
    (options: DataTableOptions<any>) => {
      tableOptions.value = options
      filteredItems.value = search(options)
    },
    {immediate: true, deep: true}
)

watch(
    () => props.options.pageSize,
    () => tableOptions.value.pageCurrentId = 0,
    {immediate: true, deep: true}
)
</script>

<style lang="postcss">
.dd-table-parent {
  @apply overflow-x-auto
}

.dd-table {
  @apply table w-full
}

.dd-table-head {
}

.dd-table-head-row {
}

.dd-table-head-column {
}

.dd-table-body {
}

.dd-table-body-row {
}

.dd-table-body-column {
}

.dd-table-foot {
}

.dd-table-foot-row {
}

.dd-table-foot-column {
}
</style>
