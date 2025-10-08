<script setup>
import axios from 'axios'
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BookingDialog from '@/components/BookingDialog.vue'
import BookingCard from '@/components/BookingCard.vue'
import { useDestinationsStore } from '@/stores/destinations'
import { useBookingsStore } from '@/stores/bookings'

const storeDestination = useDestinationsStore()
const storeBooking = useBookingsStore()

// const destinations = ref([])
const loading = ref(false)
const error = ref('')
const selected = ref(null)
const showDetail = ref(false)
const bookingDialog = ref(false)

const route = useRoute()
const router = useRouter()

onMounted(async () => {
  loading.value = true

  if (storeDestination.selected?.id) {
    bookingDialog.value = true
  }
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

const bookingList = computed(() => {
  let items = storeBooking.bookings.slice().reverse()
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
      <div v-if="loading" class="grid gap-8">
        <div
          class="bg-white rounded-xl border border-white shadow-md overflow-hidden flex flex-col p-6 mb-4 animate-pulse"
        >
          <div class="h-6 bg-gray-200 rounded w-2/3 mb-4"></div>
          <div class="grid grid-cols-2 gap-2">
            <div class="flex flex-col gap-y-2">
              <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div class="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div class="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div class="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
            <div class="flex flex-col gap-y-2">
              <div class="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div class="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div class="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div class="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
          <div class="flex justify-end mt-4 gap-2">
            <div class="h-8 w-32 bg-gray-200 rounded"></div>
            <div class="h-8 w-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
      <div v-else-if="bookingList.length < 1">
        <div class="px-3 py-10">No items found.</div>
      </div>
      <div v-else class="">
        <div v-for="booking in bookingList" :key="booking.id">
          <BookingCard :booking="booking" />
        </div>
      </div>
    </div>
  </section>
  <BookingDialog :open="bookingDialog" @close="bookingDialog = false" />
</template>

<style scoped></style>
