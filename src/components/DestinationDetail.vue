<script setup>
import { computed, watch } from 'vue'
import { format } from 'date-fns'
import { useDestinationsStore } from '@/stores/destinations'

const storeDestination = useDestinationsStore()
const props = defineProps({
  destination: {
    type: Object,
    required: true,
  },
  open: {
    type: Boolean,
    default: false,
  },
})
defineEmits(['close'])

const hasImage = computed(() => !!props.destination && !!props.destination.image)

watch(
  () => props.destination,
  (newDest) => {
    storeDestination.selected = newDest
  },
  { immediate: true },
)
</script>

<template>
  <div
    v-if="open"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="bg-white rounded-2xl shadow-xl max-w-2xl w-full overflow-hidden flex flex-col"
      style="max-height: 90vh"
    >
      <div class="relative shrink-0 min-h-40 flex items-center justify-center bg-gray-100">
        <template v-if="hasImage">
          <img
            :src="`../${destination.image}`"
            :alt="destination.name"
            class="w-full h-40 object-cover"
          />
        </template>
        <template v-else>
          <div class="w-full h-40 flex items-center justify-center text-gray-400 text-lg">
            Loading image...
          </div>
        </template>
        <button
          class="absolute top-3 right-3 px-3 py-1 rounded bg-secondary text-white text-sm"
          @click="$emit('close')"
          aria-label="Close"
        >
          X
        </button>
      </div>
      <div class="p-6 space-y-4 overflow-y-auto" style="max-height: calc(90vh - 16rem)">
        <h2 class="text-xl font-bold text-body">{{ destination.name }}</h2>
        <p class="text-body text-sm">{{ destination.description }}</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div class="text-sm text-body" v-if="destination.location">
            <span class="font-semibold">Location:</span> {{ destination.location }}
          </div>
          <div class="text-sm text-body" v-if="destination.pricePerNight">
            <span class="font-semibold">Price/Night:</span> ${{ destination.pricePerNight }}
          </div>
          <div class="text-sm text-body" v-if="destination.rating">
            <span class="font-semibold">Rating:</span> {{ destination.rating }}
          </div>
          <div class="text-sm text-body" v-if="destination.stayDays && destination.stayNights">
            <span class="font-semibold">Duration:</span> {{ destination.stayDays }} days /
            {{ destination.stayNights }} nights
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div v-if="destination.amenities && destination.amenities.length" class="mt-4">
            <h3 class="text-lg font-semibold text-primary mb-2">Amenities</h3>
            <ul class="list-disc list-inside text-body text-sm space-y-1">
              <li v-for="(amenity, idx) in destination.amenities" :key="idx">{{ amenity }}</li>
            </ul>
          </div>
          <div v-if="destination.highlights && destination.highlights.length" class="mt-4">
            <h3 class="text-lg font-semibold text-primary mb-2">Highlights</h3>
            <ul class="list-disc list-inside text-body text-sm space-y-1">
              <li v-for="(highlight, idx) in destination.highlights" :key="idx">{{ highlight }}</li>
            </ul>
          </div>
        </div>
        <div v-if="destination.availableDates && destination.availableDates.length" class="mt-4">
          <h3 class="text-lg font-semibold text-primary mb-2">Available Dates</h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(date, idx) in destination.availableDates"
              :key="idx"
              class="inline-block border border-primary bg-white text-primary text-xs px-3 py-1 rounded-full"
            >
              {{ format(new Date(date), 'MMMM dd, yyyy') }}
            </span>
          </div>
        </div>
      </div>

      <div class="relative shrink-0 min-h-15 flex items-center justify-center bg-gray-100">
        <router-link
          to="/bookings"
          class="hover:text-primary font-medium transition-colors"
          :class="{
            'text-primary underline decoration-secondary underline-offset-4':
              $route.path === '/bookings',
          }"
        >
          <button class="px-3 py-1 rounded bg-secondary text-white text-sm">
            Proceed to Booking
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
