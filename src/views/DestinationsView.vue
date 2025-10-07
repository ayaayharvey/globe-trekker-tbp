<script setup>
import axios from 'axios'
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DestinationCard from '@/components/DestinationCard.vue'
import DestinationCardSkeleton from '@/components/DestinationCardSkeleton.vue'
import DestinationDetail from '@/components/DestinationDetail.vue'
import { useDestinationsStore } from '@/stores/destinations'

const storeDestination = useDestinationsStore()
// const destinations = ref([])
const filterDestination = ref('all')
const loading = ref(false)
const error = ref('')
const selected = ref(null)
const showDetail = ref(false)
const route = useRoute()
const router = useRouter()

const toggleFavorite = (dest) => {
  storeDestination.toggleFavorite(dest.id)
}

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
      <h1 class="text-3xl font-bold text-primary mb-6">All Destinations</h1>
      <div class="mb-6 flex justify-start">
        <div class="inline-flex rounded-lg shadow-sm overflow-hidden border border-primary">
          <button
            type="button"
            :class="[
              'px-4 py-2 font-medium focus:outline-none transition-colors',
              filterDestination === 'all'
                ? 'bg-primary text-white'
                : 'bg-background text-body hover:bg-gray-100',
            ]"
            @click="filterDestination = 'all'"
          >
            All
          </button>
          <button
            type="button"
            :class="[
              'px-4 py-2 font-medium focus:outline-none transition-colors',
              filterDestination === 'favorites'
                ? 'bg-primary text-white'
                : 'bg-background text-body hover:bg-gray-100',
            ]"
            @click="filterDestination = 'favorites'"
          >
            Favorites
          </button>
        </div>
      </div>

      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <DestinationCardSkeleton v-for="n in 3" :key="n" />
      </div>
      <div v-else-if="myItems.length < 1">
        <div class="px-3 py-10">No items found.</div>
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <DestinationCard
          v-for="d in myItems"
          :key="d.id"
          :destination="d"
          @view="(dest) => router.push({ name: 'destinations', params: { id: dest.id } })"
          @favorite="toggleFavorite"
        />
      </div>
    </div>
  </section>
  <DestinationDetail
    :destination="selected || {}"
    :open="showDetail"
    @close="router.push({ name: 'destinations' })"
  />
</template>

<style scoped></style>
