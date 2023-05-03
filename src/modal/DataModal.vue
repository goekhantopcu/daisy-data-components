<template>
  <input type="checkbox" :id="id" class="modal-toggle" :checked="false" />
  <div class="modal modal-middle" :class="styling?.modal">
    <div class="modal-box" :class="styling?.box">
      <slot name="content"></slot>
      <div v-if="$slots.hasOwnProperty('action')" class="modal-action" :class="styling?.action">
        <slot name="action"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onBeforeUnmount, onMounted} from "vue";
import DataModalControl from "./data-modal-control";

const props = defineProps<{
  id: string;
  options?: ModalOptions;
  styling?: Styling;
}>();

export type ModalOptions = {
  closeOnEscape: boolean;
  closeOnOutside: boolean;
}

export type Styling = {
  modal?: string;
  box?: string;
  action?: string;
}

function closeOnEscape(event: any) {
  if (DataModalControl.isHidden(props.id)) {
    return;
  }
  if (event.keyCode === 27) {
    DataModalControl.close(props.id);
  }
}

function closeOnOutside(event: any) {
  if (DataModalControl.isHidden(props.id)) {
    return;
  }
  if (event.target.classList.contains('modal')) {
    DataModalControl.close(props.id);
  }
}

onMounted(() => {
  if (props.options?.closeOnEscape) {
    window.addEventListener('keydown', closeOnEscape);
  }
  if (props.options?.closeOnOutside) {
    window.addEventListener('click', closeOnOutside);
  }
});

onBeforeUnmount(() => {
  if (props.options?.closeOnEscape) {
    window.removeEventListener('keydown', closeOnEscape);
  }
  if (props.options?.closeOnOutside) {
    window.removeEventListener('click', closeOnOutside);
  }
});
</script>

<style scoped></style>
