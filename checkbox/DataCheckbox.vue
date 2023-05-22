<template>
  <div class="label cursor-pointer justify-start gap-3" :class="wrapperClasses">
    <slot v-if="hasLabel"></slot>
    <label v-else-if="label !== undefined"
           :for="id"
           class="label"
           :class="labelClasses"
           aria-label="Checkbox - Label">
      <span class="label-text cursor-pointer">{{ label }}</span>
    </label>
    <input :id="id"
           type="checkbox"
           class="checkbox"
           :class="inputClasses"
           v-model="modelValue"
           :aria-checked="modelValue"
           :disabled="disabled"
           :readonly="readonly"
           :aria-disabled="disabled"
           :aria-readonly="readonly"
           :tabindex="tabindex ?? 0" />
  </div>
</template>

<script setup lang="ts">
import {computed, useSlots} from "vue";
import {defineModel} from "../util/component.composable";

const props = defineProps<{
  id: string;
  label?: string;
  modelValue: boolean;
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
const modelValue = defineModel<boolean>(props, emits);
</script>

<style scoped></style>
