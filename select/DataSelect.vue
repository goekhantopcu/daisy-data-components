<template>
  <div class="form-control w-full max-w-xs" :class="wrapperClasses">
    <slot v-if="hasLabel" name="label"></slot>
    <label v-else-if="label !== undefined"
           :for="id"
           class="label"
           :class="labelClasses"
           aria-label="Checkbox - Label">
      <span class="label-text cursor-pointer">{{ label }}</span>
    </label>
    <select :id="id"
            class="select select-bordered"
            :class="selectClasses" v-model="selected">
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
import type {DataSelectOptions} from "./data-select";
import {onMounted, ref, useSlots, watch} from "vue";

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
const selected = ref<number>();
const emits = defineEmits(['update:modelValue']);
const hasLabel = slots.hasOwnProperty('label');

watch(() => props.options, (value, oldValue) => {
  if (oldValue.length === 0 && value.length > 0) {
    let optionSelected = props.options.find(option => option.selected);
    if (!optionSelected) {
      optionSelected = props.options[0];
    }
    selected.value = props.options.indexOf(optionSelected);
  }
});

watch(() => props.modelValue, (value: any) => {
  if (props.options.length === 0) {
    return;
  }
  const optionIndex = props.options.findIndex(option => option.value === value);
  if (optionIndex === -1) {
    return;
  }
  selected.value = optionIndex;
});

watch(selected, (value: number | undefined) => {
  if (!value) {
    return;
  }
  if (props.options.length === 0) {
    return;
  }
  if (value < 0 || value >= props.options.length) {
    return;
  }
  const option = props.options[value];
  emits('update:modelValue', option.value);
});

onMounted(() => {
  if (props.options.length === 0) {
    return;
  }
  let optionSelected = props.options.find(option => option.selected);
  if (!optionSelected) {
    optionSelected = props.options[0];
  }
  selected.value = props.options.indexOf(optionSelected);
});
</script>

<style scoped>

</style>
