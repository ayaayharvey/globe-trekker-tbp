<script setup>
import BookingForm from './BookingForm.vue'

defineProps({
  open: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['close'])
</script>

<template>
  <div
    v-if="open"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
    role="dialog"
    aria-modal="true"
  >
    <BookingForm inDialog @close="emit('close')" />
  </div>
</template>

<style scoped></style>
