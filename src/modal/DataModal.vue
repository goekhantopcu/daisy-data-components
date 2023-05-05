<template>
  <div role="dialog" aria-modal="true">
    <input type="checkbox"
           :id="id"
           class="modal-toggle"
           :checked="false"
           aria-label="Modal-Trigger"/>
    <section class="modal modal-middle" :class="modal.options.wrapperClasses">
      <article class="modal-box" :class="modal.options.outerClasses">
        <slot name="content" aria-label="Modal-Content" :modal="modal"></slot>
        <div v-if="$slots.hasOwnProperty('action')" class="modal-action" :class="modal.options.actionClasses">
          <slot name="action" aria-label="Modal-Actions" :modal="modal"></slot>
        </div>
      </article>
    </section>
  </div>
</template>

<script setup lang="ts">
import {onBeforeUnmount, onMounted} from "vue";
import {useModal} from "./modal";

const props = defineProps<{id: string}>();

const modal = useModal(props.id);

function closeOnEscape(event: any) {
  if (modal.isHidden()) {
    return;
  }
  if (event.keyCode === 27) {
    modal.close();
  }
}

function closeOnOutside(event: any) {
  if (modal.isHidden()) {
    return;
  }
  if (event.target.classList.contains('modal')) {
    modal.close();
  }
}

onMounted(() => {
  if (modal.options?.closeOnEscape) {
    window.addEventListener('keydown', closeOnEscape);
  }
  if (modal.options?.closeOnOutside) {
    window.addEventListener('click', closeOnOutside);
  }
});

onBeforeUnmount(() => {
  if (modal.options?.closeOnEscape) {
    window.removeEventListener('keydown', closeOnEscape);
  }
  if (modal.options?.closeOnOutside) {
    window.removeEventListener('click', closeOnOutside);
  }
});
</script>

<style scoped></style>
