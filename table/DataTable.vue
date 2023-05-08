<template>
  <div class="overflow-x-auto" :class="tableOptions.styling?.wrapper">
    <table class="table w-full" :class="tableOptions.styling?.table">
      <thead :class="tableOptions.styling?.head">
      <tr class="dd-table-head-row">
        <th v-for="(column, index) in tableOptions.columns" :key="index" class="dd-table-head-column" :class="column?.classes" @click="sortColumn(column)">
          <slot v-if="$slots.hasOwnProperty('column')" name="column" :column="column" :index="index" :pageChange="pageChange"/>
          <template v-else>
            <div v-if="column.sortable" class="flex gap-3 items-center">
              <span class="underline">{{ column.title }}</span>
              <svg class="h-3.5 fill-neutral-content" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z"/></svg>
            </div>
            <span v-else>{{ column.title }}</span>
          </template>
        </th>
      </tr>
      </thead>

      <tbody v-if="$slots.hasOwnProperty('loading') && tableOptions.loading" :class="tableOptions.styling?.bodyLoading">
      <tr class="dd-table-body-loading-row">
        <td :colspan="tableOptions.columns.length" class="dd-table-body-loading-column">
          <slot name="loading"/>
        </td>
      </tr>
      </tbody>

      <tbody v-else-if="$slots.hasOwnProperty('no-data') && filteredItems.length === 0" :class="tableOptions.styling?.bodyNoData">
      <tr class="dd-table-body-no-data-row">
        <td :colspan="tableOptions.columns.length" class="dd-table-body-no-data-column">
          <slot name="no-data"/>
        </td>
      </tr>
      </tbody>

      <tbody v-else :class="tableOptions.styling?.body">
      <tr v-for="(item, index) in page.data" :key="index" :class="generateClass('dd-table-body-row', index)">
        <td v-for="(column, index) in tableOptions.columns"
            :key="index"
            :class="column.classes">
          <slot v-if="$slots.hasOwnProperty(column.slot)"
                :name="column.slot"
                :item="item"
                :index="index"
                :column="column"
                :pageChange="pageChange" />
          <span v-else>{{ column[column.slot] ?? '-' }}</span>
        </td>
      </tr>
      </tbody>

      <tfoot v-if="$slots.hasOwnProperty('foot')" class="dd-table-foot">
      <tr>
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
import {tablePagination, tableSearch, tableSort} from "./data-table";
import type {DataTableColumn, DataTableOptions} from "./data-table-types";

const props = defineProps<{ options: DataTableOptions<any> }>()

const tableOptions = ref<DataTableOptions<any>>(props.options)

const filteredItems = ref<any[]>(tableOptions.value.items)

const sortColumn = (column: DataTableColumn<any>) => {
  filteredItems.value = tableSort(filteredItems.value, column)
}

const pages = computed(() => tablePagination(filteredItems.value, tableOptions.value))
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
      filteredItems.value = tableSearch(options)
    },
    {immediate: true, deep: true}
)

watch(
    () => props.options.pageSize,
    () => tableOptions.value.pageCurrentId = 0,
    {immediate: true, deep: true}
)
</script>
