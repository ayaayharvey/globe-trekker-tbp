<script setup>
import { format } from 'date-fns'
const props = defineProps({
  booking: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div
    class="bg-white rounded-xl border border-white shadow-md overflow-hidden flex flex-col p-6 mb-4"
  >
    <h3 class="text-xl font-semibold text-primary mb-2 flex items-center gap-2">
      {{ props.booking.destination?.name }}
    </h3>
    <div class="grid grid-cols-2 gap-2">
      <div class="flex flex-col gap-y-2">
        <div class="text-sm text-body" v-if="props.booking.destination?.location">
          <span class="font-semibold">Location:</span> {{ props.booking.destination?.location }}
        </div>
        <div class="text-sm text-body" v-if="props.booking.destination?.pricePerNight">
          <span class="font-semibold">Price/Night:</span> ${{
            props.booking.destination?.pricePerNight
          }}
        </div>
        <div class="text-sm text-body" v-if="props.booking.destination?.rating">
          <span class="font-semibold">Rating:</span> {{ props.booking.destination?.rating }}
        </div>
        <div
          class="text-sm text-body"
          v-if="props.booking.destination?.stayDays && props.booking.destination?.stayNights"
        >
          <span class="font-semibold">Duration:</span>
          {{ props.booking.destination?.stayDays }} days / {{ props.booking.stayNights }} nights
        </div>
      </div>

      <div class="flex flex-col gap-y-2">
        <div class="text-sm text-body" v-if="props.booking.name">
          <span class="font-semibold">Guest Name:</span> {{ props.booking.name }}
        </div>
        <div class="text-sm text-body" v-if="props.booking.email">
          <span class="font-semibold">Guest Email:</span> {{ props.booking.email }}
        </div>
        <div class="text-sm text-body" v-if="props.booking.schedule">
          <span class="font-semibold">Selected Schedule:</span>
          {{ format(new Date(props.booking.schedule), 'MMMM dd, yyyy') }}
        </div>
        <div class="text-sm text-body" v-if="props.booking.guests">
          <span class="font-semibold">Number of Guests:</span> {{ props.booking.guests }}
        </div>
        <div class="text-sm text-body" v-if="props.booking.createdAt">
          <span class="font-semibold">Date Booked:</span> {{ props.booking.createdAt }}
        </div>
        <div class="text-body text-sm mb-2" v-if="props.booking.status">
          <span class="font-semibold">Status: </span>
          <span
            :class="{
              'text-green-600 font-bold': props.booking.status === 'confirmed',
              'text-yellow-600 font-bold': props.booking.status === 'pending',
              'text-red-600 font-bold': props.booking.status === 'cancelled',
            }"
          >
            {{ props.booking.status?.toUpperCase() }}
          </span>
        </div>
      </div>
    </div>
    <div class="flex justify-end mt-4 gap-2">
      <router-link :to="`/destinations/${props.booking.destination?.id}`">
        <button
          class="px-4 py-2 rounded bg-white border border-secondary text-secondary text-sm font-semibold hover:bg-background transition"
        >
          View Destination Details
        </button>
      </router-link>
      <!-- <button
        class="px-4 py-2 rounded bg-gray-200 text-body text-sm font-semibold hover:bg-gray-300 transition"
      >
        Cancel
      </button> -->
    </div>
  </div>
</template>

<style scoped></style>
