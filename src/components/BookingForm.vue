<script setup>
import { ref } from 'vue'
import { useDestinationsStore } from '@/stores/destinations'

const storeDestination = useDestinationsStore()

const props = defineProps({
  inDialog: {
    type: Boolean,
  },
})

const form = ref({
  from: '',
  to: '',
  date: '',
  guests: 1,
})

const emit = defineEmits(['close'])
const closeDialog = () => {
  emit('close')
}

const submitBooking = () => {
  console.log('Booking submitted:', { ...form.value })
}
</script>

<template>
  <div class="relative max-w-lg mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
    <!-- Close Button -->
    <button
      v-if="props.inDialog"
      class="absolute top-3 right-3 px-3 py-1 rounded bg-secondary text-white text-sm"
      @click="closeDialog"
      aria-label="Close"
      type="button"
    >
      ×
    </button>
    <h2 class="text-3xl font-bold text-primary mb-8 text-center">Book Now</h2>
    <form @submit.prevent="submitBooking" class="space-y-6">
      <div>
        <label for="name" class="block text-sm font-medium text-body mb-1">Name</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition text-body bg-background"
          placeholder="Enter your name"
          required
        />
      </div>
      <!-- <div>
          <label for="from" class="block text-sm font-medium text-body mb-1">From</label>
          <select
            id="from"
            v-model="form.from"
            class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition text-body bg-background"
            required
          >
            <option value="" disabled selected>Select departure airport</option>
            <option v-for="airport in departureAirports" :key="airport.code" :value="airport.code">
              {{ airport.name }}
            </option>
          </select>
        </div> -->
      <div>
        <label for="destination" class="block text-sm font-medium text-body mb-1">
          Destination
        </label>
        <select
          id="destination"
          v-model="form.destination"
          class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition text-body bg-background"
          required
        >
          <option value="" disabled selected>Select destination</option>
          <option v-for="d in storeDestination.getDestination" :key="d.id" :value="d">
            {{ d.name }}
          </option>
        </select>
      </div>
      <div>
        <label for="schedule" class="block text-sm font-medium text-body mb-1"> Schedule </label>
        <select
          id="schedule"
          v-model="form.schedule"
          class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition text-body bg-background"
          required
        >
          <option value="" disabled selected>Select schedule</option>
          <option v-for="d in form.destination?.availableDates" :key="d" :value="d">
            {{
              new Date(d).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            }}
          </option>
        </select>
      </div>
      <!-- <div>
          <label for="date" class="block text-sm font-medium text-body mb-1">Date</label>
          <input
            id="date"
            v-model="form.date"
            type="date"
            :min="minBookingDate"
            class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition text-body bg-background"
            required
          />
        </div> -->
      <div>
        <label for="guests" class="block text-sm font-medium text-body mb-1">Guests</label>
        <select
          id="guests"
          v-model.number="form.guests"
          class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition text-body bg-background"
          required
        >
          <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
        </select>
      </div>
      <div class="pt-2">
        <button
          type="submit"
          class="w-full py-3 px-6 rounded-lg bg-secondary text-white font-semibold text-lg shadow hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Book Now
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
