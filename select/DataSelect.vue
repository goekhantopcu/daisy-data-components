<template>
  <div class="form-control w-full max-w-xs" :class="wrapperClasses">
    <slot v-if="hasLabel" name="label"></slot>
    <label v-else-if="label !== undefined"
           :for="id"
           class="label-text cursor-pointer"
           :class="labelClasses"
           aria-label="Checkbox - Label">{{ label }}</label>
    <select :id="id"
            class="select select-bordered"
            :class="selectClasses" @change="onSelectChange">
      <option v-for="(option, index) in options"
              :key="index"
              :class="optionClasses"
              :value="index">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import type {DataSelectOption, DataSelectOptions} from "./data-select";
import {computed, onMounted, useSlots} from "vue";

const props = defineProps<{
  id: string;
  label?: string;
  modelValue: any;
  options: DataSelectOptions<any>;
  tabindex?: number;
  disabled?: boolean;
  readonly?: boolean;
  wrapperClasses?: string;
  selectClasses?: string;
  optionClasses?: string;
  labelClasses?: string;
}>();

const slots = useSlots();
const emits = defineEmits(['update:modelValue']);
const hasLabel = computed(() => slots.hasOwnProperty('label'));

function onSelectChange(event: any) {
  const target = event.target as HTMLSelectElement;
  if (!target) {
    return;
  }
  const index = parseInt(target.value);
  if (index < 0 || index >= props.options.length) {
    return;
  }
  updateModelValue(props.options[index]);
}

function updateModelValue(option: DataSelectOption<any>) {
  emits('update:modelValue', option.value);
}

onMounted(() => {
  if (props.options.length === 0) {
    return;
  }
  updateModelValue(props.options[0]);
});
</script>

<style scoped>

</style>
