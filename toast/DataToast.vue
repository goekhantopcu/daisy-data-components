<template>
  <section class="toast toast-end dd-toast-notification" role="alert">
    <article v-for="toast in toasts" :key="toast.id" class="alert" :class="toast.classes">
      <div v-if="$slots.hasOwnProperty('content')">
        <slot name="content"
              :toast="toast"
              :toasts="toasts"
              :removeToast="removeToast"
              :hide="hide"
              aria-label="Toast-Content"/>
      </div>
      <p v-else aria-label="Toast-Message">{{ toast.message }}</p>
    </article>
  </section>
</template>

<script setup lang="ts">
import type {ToastEvent, Toast} from "./toast";
import {ref} from "vue";
import {v4} from "uuid";
import {useEmitter} from "../emitter";

const props = defineProps<{ id?: string; }>();

const toasts = ref<Toast[]>([]);

function removeToast(data: Toast) {
  toasts.value = toasts.value.filter(toast => toast.id !== data.id);
}

function hide(toast: Toast) {
  removeToast(toast);
}

const emitter = useEmitter();

emitter.subscribe<ToastEvent>('toast-notifications', (event: ToastEvent) => {
  if (event.id !== undefined && event.id !== props.id) {
    return;
  }
  const id = v4();
  const toast: Toast = {
    id: id,
    message: event.message,
    classes: `alert-${event.type ?? 'info'} ${event.styling}`
  };
  toasts.value.push(toast);
  const timeout = event.duration ?? 3000;
  if (event.duration === -1) {
    return;
  }
  setTimeout(() => removeToast(toast), timeout);
});
</script>

<style scoped></style>
