<template>
  <div role="dialog" aria-modal="true">
    <input type="checkbox"
           :id="id"
           class="modal-toggle"
           :checked="false"
           :data-disable-outside-scroll="disableOutsideScroll"
           aria-label="Modal-Trigger"/>
    <section class="modal modal-middle" :class="wrapperClasses">
      <article class="modal-box" :class="outerClasses">
        <slot name="content" aria-label="Modal-Content"></slot>
        <div v-if="$slots.hasOwnProperty('action')" class="modal-action" :class="actionClasses">
          <slot name="action" aria-label="Modal-Actions"></slot>
        </div>
      </article>
    </section>
  </div>
</template>

<script setup lang="ts">
import {onBeforeUnmount, onMounted} from "vue";
import DataModalControl from "./data-modal-control";

type DataModalProperties = {
  id: string;

  closeOnEscape?: boolean;
  closeOnOutside?: boolean;
  disableOutsideScroll?: boolean;

  wrapperClasses?: string;
  outerClasses?: string;
  actionClasses?: string;
}

const props = defineProps<DataModalProperties>();

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
  if (props.closeOnEscape) {
    window.addEventListener('keydown', closeOnEscape);
  }
  if (props.closeOnOutside) {
    window.addEventListener('click', closeOnOutside);
  }
});

onBeforeUnmount(() => {
  if (props.closeOnEscape) {
    window.removeEventListener('keydown', closeOnEscape);
  }
  if (props.closeOnOutside) {
    window.removeEventListener('click', closeOnOutside);
  }
});
</script>

<style scoped></style>
