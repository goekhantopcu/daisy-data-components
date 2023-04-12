<template>
  <div class="dd-table-parent">
    <table class="dd-table">
      <thead class="dd-table-head">
      <tr class="dd-table-head-row">
        <th v-for="(column, index) in tableOptions.columns"
            :key="index"
            class="dd-table-head-column"
            :class="generateClass('dd-table-head-column', index)"
            @click="sortColumn(column)">
          <slot name="column" :column="column" :index="index" :pageChange="pageChange"/>
        </th>
      </tr>
      </thead>

      <tbody v-if="tableOptions.isDataLoading" class="dd-table-body-loading">
      <tr class="dd-table-body-loading-row">
        <td :colspan="tableOptions.columns.length" class="dd-table-body-loading-column">
          <slot name="loading"/>
        </td>
      </tr>
      </tbody>

      <tbody v-else-if="filteredItems.length === 0" class="dd-table-body-no-data">
      <tr class="dd-table-body-no-data-row">
        <td :colspan="tableOptions.columns.length" class="dd-table-body-no-data-column">
          <slot name="no-data"/>
        </td>
      </tr>
      </tbody>

      <tbody v-else class="dd-table-body">
      <tr v-for="(item, index) in page.data"
          :key="index"
          class="dd-table-body-row"
          :class="generateClass('dd-table-body-row', index)">
        <td v-for="(column, index) in tableOptions.columns"
            :key="index"
            class="dd-table-body-column"
            :class="generateClass('dd-table-body-column', index)">
          <slot :name="column.slot" :item="item" :index="index" :column="column" :pageChange="pageChange" />
        </td>
      </tr>
      </tbody>

      <tfoot class="dd-table-foot">
      <tr class="dd-table-foot-row">
        <td :colspan="tableOptions.columns.length" class="dd-table-foot-column">
          <slot name="foot" :pages="pages" :page="page" :pageChange="pageChange"/>
        </td>
      </tr>
      </tfoot>
    </table>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, watch} from "vue";
import {paginate, search, sort} from "./data-table";
import type {DataTableColumn, DataTableOptions} from "./data-table";

const props = defineProps<{ options: DataTableOptions<any> }>()

const tableOptions = ref<DataTableOptions<any>>(props.options)

const filteredItems = ref<any[]>(tableOptions.value.items)

const sortColumn = (column: DataTableColumn<any>) => {
  filteredItems.value = sort(filteredItems.value, column)
}

const pages = computed(() => paginate(filteredItems.value, tableOptions.value))
const page = computed(() => pages.value[tableOptions.value.pageCurrentId ?? 0])

interface PageChangeResult {
  fromPageId: number;
  toPageId: number;
  offset: number;
}

const pageChange = (offset: number): PageChangeResult => {
  const fromPageId = tableOptions.value.pageCurrentId ?? 0
  let toPageId = fromPageId + offset
  if (toPageId >= pages.value.length) {
    toPageId = pages.value.length - 1;
  }
  if (toPageId <= 0) {
    toPageId = 0;
  }
  tableOptions.value.pageCurrentId = toPageId
  return {
    fromPageId: fromPageId,
    toPageId: toPageId,
    offset: offset
  }
}

const generateClass = (base: string, index: number): string => `${base}-${index}`

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

.dd-table-head {}
.dd-table-head-row {}
.dd-table-head-column {}

.dd-table-body {}
.dd-table-body-row {}
.dd-table-body-column {}

.dd-table-body-loading {}
.dd-table-body-loading-column {}
.dd-table-body-loading-row {}

.dd-table-body-no-data {}
.dd-table-body-no-data-row {}
.dd-table-body-no-data-column {}

.dd-table-foot {}
.dd-table-foot-row {}
.dd-table-foot-column {}
</style>
