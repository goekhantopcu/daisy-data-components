<template>
  <div class="label cursor-pointer justify-start gap-3" :class="wrapperClasses">
    <slot v-if="hasLabel" name="label"></slot>
    <label v-else-if="label !== undefined"
           :for="id"
           class="label-text cursor-pointer"
           :class="labelClasses"
           aria-label="Checkbox - Label">{{ label }}</label>
    <input :id="id"
           :name="id"
           class="input"
           :class="inputClasses"
           type="datetime-local"
           :value="formattedDateValue"
           @input="updateValue($event)"
           :min="formattedMinDate"
           :max="formattedMaxDate"
           :disabled="disabled"
           :readonly="readonly"
           :aria-disabled="disabled"
           :aria-readonly="readonly"
           :tabindex="tabindex ?? 0"  />
  </div>
</template>
<script setup lang="ts">
import {computed, useSlots} from "vue";

const props = defineProps<{
  id: string;
  label?: string;
  modelValue: Date;
  minDate?: Date;
  maxDate?: Date;
  tabindex?: number;
  disabled?: boolean;
  readonly?: boolean;
  wrapperClasses?: string;
  inputClasses?: string;
  labelClasses?: string;
}>();

const slots = useSlots();
const emits = defineEmits(['update:modelValue']);
const hasLabel = computed(() => slots.hasOwnProperty('label'));

function updateValue(event: any) {
  const target = event.target as HTMLInputElement;
  if (!target) {
    return;
  }
  const date = new Date(target.value);
  emits('update:modelValue', date);
}

const formattedDateValue = computed(() => props.modelValue.toISOString().slice(0, 16));

const formattedMinDate = computed(() => {
  if (props.minDate) {
    return props.minDate.toISOString().slice(0, 16);
  }
  const date = new Date();
  date.setFullYear(date.getFullYear() - 10);
  return date.toISOString().slice(0, 16);
});

const formattedMaxDate = computed(() => {
  if (props.maxDate) {
    return props.maxDate.toISOString().slice(0, 16);
  }
  const date = new Date();
  date.setFullYear(date.getFullYear() + 10);
  return date.toISOString().slice(0, 16);
});
</script>
