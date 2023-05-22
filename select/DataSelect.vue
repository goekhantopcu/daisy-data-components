<template>
  <div class="form-control w-full max-w-xs" :class="wrapperClasses">
    <slot v-if="hasLabel"></slot>
    <label v-else-if="label !== undefined" :for="id" class="label" :class="labelClasses" aria-label="Checkbox - Label">
      <span class="label-text cursor-pointer">{{ label }}</span>
    </label>
    <select :id="id" class="select select-bordered" :class="selectClasses" v-model="modelValue">
      <option v-for="(option, index) in options" :key="index" :class="optionClasses" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import type {DataSelectOptions} from "./data-select";
import {useSlots} from "vue";
import {defineModel} from "../util/component.composable";

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
const hasLabel = slots.hasOwnProperty('default');

const emits = defineEmits(['update:modelValue']);
const modelValue = defineModel<any>(props, emits);
</script>

<style scoped></style>
