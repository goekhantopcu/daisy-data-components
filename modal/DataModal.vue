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
        <section v-if="hasHeader || hasHeaderClose || addHeaderClose" class="flex flex-row justify-between items-center" aria-label="Modal-Header" :class="headerClasses">
          <slot v-if="hasHeader" name="header" :modal="modal"></slot>
          <div v-if="addHeaderClose || hasHeaderClose" class="ml-auto" tabindex="0">
            <slot v-if="hasHeaderClose" name="header-close" :modal="modal"></slot>
            <button v-else class="h-5 p-1" aria-label="Modal-Close" @click="modal.close()" :class="headerCloseClasses">
              <svg class="h-5 fill-neutral-content" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>
            </button>
          </div>
        </section>

        <slot v-if="hasContent" name="content" aria-label="Modal-Content" :modal="modal"></slot>

        <section v-if="hasAction" class="modal-action" :class="actionClasses">
          <slot name="action" aria-label="Modal-Actions" :modal="modal"></slot>
        </section>
      </article>
    </section>
  </div>
</template>

<script setup lang="ts">
import {computed, onBeforeUnmount, onMounted, onUnmounted, ref, useSlots} from "vue";
import {useModal} from "./modal";
import {useEmitter} from "../emitter";

const props = defineProps<{
  id: string;
  addHeaderClose?: boolean;
  wrapperClasses?: string;
  outerClasses?: string;
  headerClasses?: string;
  actionClasses?: string;
  headerCloseClasses?: string;
}>();

const emitter = useEmitter();
const modal = useModal(props.id);
const checkbox = ref<HTMLInputElement>();
const emits = defineEmits(['modal:close', 'modal:open']);

const slots = useSlots();

const hasAction = computed(() => slots.hasOwnProperty('action'));
const hasHeader = computed(() => slots.hasOwnProperty("header"));
const hasContent = computed(() => slots.hasOwnProperty('content'));
const hasHeaderClose = computed(() => slots.hasOwnProperty("header-close"));

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

<style scoped>
</style>
