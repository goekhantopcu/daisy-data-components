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
import type {ToastEvent, ToastNotification} from "./toast-types";
import {ref} from "vue";
import {v4} from "uuid";
import {subscribe} from "../util";
import {TOAST_EVENT_KEY} from "./toast";

const props = defineProps<{
  id?: string;
}>();

const toasts = ref<ToastNotification[]>([]);

function removeToast(data: ToastNotification) {
  toasts.value = toasts.value.filter(toast => toast.id !== data.id);
}

function hide(toast: ToastNotification) {
  removeToast(toast);
}

subscribe<ToastEvent>(TOAST_EVENT_KEY, (data: ToastEvent) => {
  if (data.id !== undefined && props.id !== undefined && props.id !== data.id) {
    return;
  }

  const id = v4();
  const toast: ToastNotification = {
    id: id,
    message: data.message,
    classes: `alert-${data.type ?? 'info'} ${data.styling}`
  };
  toasts.value.push(toast);
  const timeout = data.duration ?? 3000;
  if (data.duration === -1) {
    return;
  }
  setTimeout(() => removeToast(toast), timeout);
});
</script>

<style scoped></style>
