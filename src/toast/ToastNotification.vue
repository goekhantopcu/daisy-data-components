<template>
  <div class="toast toast-end dd-toast-notification">
    <div v-for="toast in toasts" :key="toast.id" class="alert" :class="toast.classes">
      <div v-if="$slots.hasOwnProperty('content')">
        <slot name="content"
              :toast="toast"
              :toasts="toasts"
              :removeToast="removeToast"
              :hide="hide"/>
      </div>
      <span v-else>{{ toast.message }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {ToastEvent, ToastNotification} from "./toast-types";
import {useToastBus} from "./index";
import {onUnmounted, ref} from "vue";
import {v4} from "uuid";

const toasts = ref<ToastNotification[]>([]);

function removeToast(data: ToastNotification) {
  toasts.value = toasts.value.filter(toast => toast.id !== data.id);
}

function hide(toast: ToastNotification) {
  removeToast(toast);
}

const unsubscribe = useToastBus().on((event: ToastEvent) => {
  const id = v4();
  const toast: ToastNotification = {
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

onUnmounted(unsubscribe);
</script>

<style scoped></style>
