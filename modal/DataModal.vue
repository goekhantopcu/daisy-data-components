<template>
  <div role="dialog" aria-modal="true">
    <input type="checkbox"
           :id="id"
           class="modal-toggle"
           :checked="false"
           aria-label="Modal-Trigger"
           ref="checkbox"
           @change="trigger($event)" />
    <section class="modal modal-middle" :class="wrapperClasses">
      <article class="modal-box" :class="outerClasses">
        <slot name="content" aria-label="Modal-Content" :modal="modal"></slot>
        <div v-if="$slots.hasOwnProperty('action')" class="modal-action" :class="actionClasses">
          <slot name="action" aria-label="Modal-Actions" :modal="modal"></slot>
        </div>
      </article>
    </section>
  </div>
</template>

<script setup lang="ts">
import {onBeforeUnmount, onMounted, onUnmounted, ref} from "vue";
import {useModal} from "./modal";
import {useEmitter} from "../emitter";

const props = defineProps<{
  id: string;
  wrapperClasses?: string;
  outerClasses?: string;
  actionClasses?: string;
}>();

const emitter = useEmitter();
const modal = useModal(props.id);
const checkbox = ref<HTMLInputElement>();
const emits = defineEmits(['modal:close', 'modal:open']);

function trigger(event: any) {
  const target = event.target as HTMLInputElement;
  if (!target) {
    return;
  }
  if (target.checked) {
    emits('modal:open', modal);
    emitter.publish('modal:open', modal);
  } else {
    emits('modal:close', modal);
    emitter.publish('modal:close', modal);
  }
}

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

onUnmounted(() => modal.destroy());
</script>

<style scoped></style>
