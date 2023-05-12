<template>
  <div class="label cursor-pointer justify-start gap-3" :class="wrapperClasses">
    <slot v-if="hasLabel" name="label"></slot>
    <label v-else-if="label !== undefined"
           :for="id"
           class="label-text cursor-pointer"
           :class="labelClasses"
           aria-label="Checkbox - Label">{{ label }}</label>
    <input :id="id"
           type="checkbox"
           class="checkbox"
           :class="inputClasses"
           v-model="checked"
           :aria-checked="checked"
           :disabled="disabled"
           :readonly="readonly"
           :aria-disabled="disabled"
           :aria-readonly="readonly"
           :tabindex="tabindex ?? 0" />
  </div>
</template>

<script setup lang="ts">
import {computed, useSlots} from "vue";

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
const emits = defineEmits(['update:modelValue']);
const hasLabel = computed(() => slots.hasOwnProperty('label'));

const checked = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value)
});
</script>

<style scoped></style>
