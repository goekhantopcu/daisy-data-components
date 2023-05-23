<template>
  <div class="form-control w-full max-w-xs" :class="wrapperClasses">
    <slot v-if="hasLabel"></slot>
    <label v-else-if="label !== undefined"
           :for="id"
           class="label"
           :class="labelClasses"
           :aria-label="label">
      <span class="label-text cursor-pointer">{{ label }}</span>
    </label>
    <input :id="id"
           :name="id"
           class="input input-bordered"
           :class="inputClasses"
           type="datetime-local"
           v-model="internalModelValue"
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
import {computed, ref, useSlots, watch} from "vue";
import {defineModel} from "../util/component.composable";

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
const hasLabel = computed(() => slots.hasOwnProperty('default'));

const emits = defineEmits(['update:modelValue']);
const externalModelValue = defineModel<Date>(props, emits);
const internalModelValue = ref<string>(externalModelValue.value.toISOString().slice(0, 16));

watch(internalModelValue, value => externalModelValue.value = new Date(value));

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
