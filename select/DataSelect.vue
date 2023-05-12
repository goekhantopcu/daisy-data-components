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
            :class="selectClasses" @change="updateValue">
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
import {DataSelectOptions} from "./data-select";
import {computed, useSlots} from "vue";

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

function updateValue(event: any) {
  const target = event.target as HTMLSelectElement;
  if (!target) {
    return;
  }
  const index = parseInt(target.value);
  emits('update:modelValue', props.options[index]);
}
</script>

<style scoped>

</style>
