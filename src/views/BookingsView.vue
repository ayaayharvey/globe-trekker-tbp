<script setup>
import axios from 'axios'
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BookingDialog from '@/components/BookingDialog.vue'
import { useDestinationsStore } from '@/stores/destinations'

const storeDestination = useDestinationsStore()
// const destinations = ref([])
const filterDestination = ref('all')
const loading = ref(false)
const error = ref('')
const selected = ref(null)
const showDetail = ref(false)
const bookingDialog = ref(false)

const route = useRoute()
const router = useRouter()

onMounted(async () => {
  loading.value = true
  try {
    const res = await axios.get('/src/data/destinations.json', {
      headers: { 'Cache-Control': 'no-cache' },
    })
    await new Promise((resolve) => setTimeout(resolve, 1500))
    storeDestination.destinations = Array.isArray(res.data) ? res.data : []
    const idParam = route.params.id
    if (idParam) {
      const match = storeDestination.destinations.find((d) => String(d.id) === String(idParam))
      if (match) {
        selected.value = match
        showDetail.value = true
      } else {
        router.replace({ name: 'destinations' })
      }
    }
  } catch (e) {
    error.value = 'Failed to load destinations.'
    console.log(e)
  } finally {
    loading.value = false
  }
})

watch(
  () => route.params.id,
  (newId) => {
    if (!storeDestination.destinations.length) return
    if (newId) {
      const match = storeDestination.destinations.find((d) => String(d.id) === String(newId))
      if (match) {
        selected.value = match
        showDetail.value = true
      }
    } else {
      showDetail.value = false
      selected.value = null
    }
  },
)

const myItems = computed(() => {
  let items =
    filterDestination.value == 'all'
      ? storeDestination?.getDestination
      : storeDestination?.getFavorites
  return items
})
</script>

<template>
  <section class="px-10 py-25 bg-background">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex justify-between items-center mb-10">
        <h1 class="text-3xl font-bold text-primary">All Bookings</h1>
        <button
          @click="bookingDialog = true"
          class="h-10 px-5 bg-secondary text-white font-semibold inline-block rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Create New Booking
        </button>
      </div>
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">Loading</div>
      <div v-else-if="myItems.length < 1">
        <div class="px-3 py-10">No items found.</div>
      </div>
      <div v-else class="">
        <div
          v-for="booking in myItems"
          :key="booking.id"
          class="bg-white rounded-xl border border-white shadow-md overflow-hidden flex flex-col p-6 mb-4"
        >
          <h3 class="text-xl font-semibold text-primary mb-2 flex items-center gap-2">
            {{ booking.destinationName || booking.name }}
          </h3>
          <div class="grid gap-2">
            <div class="text-sm text-body" v-if="booking.location">
              <span class="font-semibold">Location:</span> {{ booking.location }}
            </div>
            <div class="text-sm text-body" v-if="booking.pricePerNight">
              <span class="font-semibold">Price/Night:</span> ${{ booking.pricePerNight }}
            </div>
            <div class="text-sm text-body" v-if="booking.rating">
              <span class="font-semibold">Rating:</span> {{ booking.rating }}
            </div>
            <div class="text-sm text-body" v-if="booking.stayDays && booking.stayNights">
              <span class="font-semibold">Duration:</span> {{ booking.stayDays }} days /
              {{ booking.stayNights }} nights
            </div>
          </div>
          <div class="text-body text-sm mb-2" v-if="booking.status">
            <span class="font-semibold">Status:</span>
            <span
              :class="{
                'text-green-600 font-bold': booking.status === 'Confirmed',
                'text-yellow-600 font-bold': booking.status === 'Pending',
                'text-red-600 font-bold': booking.status === 'Cancelled',
              }"
            >
              {{ booking.status }}
            </span>
          </div>
          <div class="flex justify-end mt-4 gap-2">
            <button
              class="px-4 py-2 rounded bg-secondary text-white text-sm font-semibold hover:bg-primary transition"
            >
              View Details
            </button>
            <button
              class="px-4 py-2 rounded bg-gray-200 text-body text-sm font-semibold hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <BookingDialog :open="bookingDialog" @close="bookingDialog = false" />
</template>

<style scoped></style>
