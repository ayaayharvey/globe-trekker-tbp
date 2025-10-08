<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import DestinationCard from '@/components/DestinationCard.vue'
import DestinationCardSkeleton from '@/components/DestinationCardSkeleton.vue'
import DestinationDetail from '@/components/DestinationDetail.vue'
import BookingForm from '@/components/BookingForm.vue'

import { useDestinationsStore } from '@/stores/destinations'

const storeDestination = useDestinationsStore()

// const destinations = ref([])
const loading = ref(false)
const error = ref('')

// const departureAirports = ref([
//   {
//     code: 'MNL',
//     name: 'Ninoy Aquino International Airport (MNL) - Manila',
//   },
//   {
//     code: 'CEB',
//     name: 'Mactan-Cebu International Airport (CEB) - Cebu',
//   },
//   {
//     code: 'DVO',
//     name: 'Francisco Bangoy International Airport (DVO) - Davao',
//   },
//   {
//     code: 'CRK',
//     name: 'Clark International Airport (CRK) - Pampanga',
//   },
//   {
//     code: 'ILO',
//     name: 'Iloilo International Airport (ILO) - Iloilo',
//   },
//   {
//     code: 'KLO',
//     name: 'Kalibo International Airport (KLO) - Kalibo',
//   },
//   {
//     code: 'TAG',
//     name: 'Bohol–Panglao International Airport (TAG) - Bohol',
//   },
//   {
//     code: 'PPS',
//     name: 'Puerto Princesa International Airport (PPS) - Palawan',
//   },
//   {
//     code: 'ZAM',
//     name: 'Zamboanga International Airport (ZAM) - Zamboanga',
//   },
//   {
//     code: 'CGY',
//     name: 'Laguindingan Airport (CGY) - Cagayan de Oro',
//   },
// ])

const current = ref(null)

onMounted(async () => {
  loading.value = true
  try {
    const res = await axios.get('/src/data/destinations.json', {
      headers: { 'Cache-Control': 'no-cache' },
    })
    await new Promise((resolve) => setTimeout(resolve, 200))
    storeDestination.destinations = Array.isArray(res.data) ? res.data : []

    current.value = storeDestination.destinations[0] || null
    let i = 0
    setInterval(() => {
      if (!storeDestination.destinations.length) return
      current.value = storeDestination.destinations[++i % storeDestination.destinations.length]
    }, 2000)

    storeDestination.setFeatured()
  } catch (e) {
    error.value = 'Failed to load destinations.'
    console.log(e)
  } finally {
    loading.value = false
  }
})

const selected = ref(null)
const showDetail = ref(false)

const toggleFavorite = (dest) => {
  storeDestination.toggleFavorite(dest.id)
}
</script>

<template>
  <section
    id="hero"
    class="min-h-screen pt-15 px-10 flex items-center justify-center"
    aria-label="Hero"
  >
    <div class="max-w-6xl mx-auto px-4 flex flex-wrap gap-10 items-center justify-between">
      <div class="flex-1 flex flex-col justify-center gap-8">
        <h1
          class="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4 drop-shadow-sm"
        >
          Explore the world
          <span class="text-primary"> with ease</span>
        </h1>
        <p class="text-lg md:text-xl text-body mb-2">
          Discover curated getaways and seamless bookings.<br class="hidden md:inline" />
          <span class="text-body font-medium">Your next adventure starts here.</span>
        </p>
        <nav aria-label="Hero quick links">
          <ul class="flex flex-wrap gap-4 mt-4">
            <li>
              <a
                href="#destinations"
                class="inline-block px-6 py-3 rounded-lg bg-secondary text-white font-semibold shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              >
                Browse Destinations
              </a>
            </li>
            <li>
              <a
                href="#booking"
                class="inline-block px-6 py-3 rounded-lg bg-white border border-secondary text-secondary font-semibold shadow hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              >
                Quick Book
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div class="flex-1 min-w-[300px] h-70 flex items-center justify-center">
        <img
          :src="current?.image"
          alt="Travel collage"
          class="w-150 h-130 object-cover rounded-xl shadow-lg border border-black/10"
        />
      </div>
    </div>
  </section>

  <section id="destinations" class="px-10 py-25 bg-background">
    <div class="max-w-6xl mx-auto px-4">
      <h2 class="text-3xl font-bold text-primary mb-6">Featured Destinations</h2>

      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <DestinationCardSkeleton v-for="n in 3" :key="n" />
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <DestinationCard
          v-for="d in storeDestination.getFeatured"
          :key="d.id"
          :destination="d"
          @view="
            (dest) => {
              selected = dest
              showDetail = true
            }
          "
          @favorite="toggleFavorite"
        />
      </div>
      <div class="flex justify-center mt-10">
        <router-link
          to="/destinations"
          class="inline-block px-6 py-3 rounded-lg bg-white border border-secondary text-secondary font-semibold shadow hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          View All Destinations
        </router-link>
      </div>
    </div>
    <DestinationDetail
      :destination="selected || {}"
      :open="showDetail"
      @close="showDetail = false"
    />
  </section>

  <section id="booking" class="py-25 bg-primary">
    <BookingForm />
  </section>
</template>
