<script setup>
// import { useDestinationsStore } from '@/stores/destinations'

// const storeDestination = useDestinationsStore()
// import { BookmarkIcon } from '@heroicons/vue/16/solid'
const props = defineProps({
  destination: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['view', 'favorite'])
</script>

<template>
  <article
    class="bg-white rounded-xl border border-white shadow-md overflow-hidden flex flex-col transition-transform hover:scale-105"
  >
    <img
      :src="`../${props.destination.image}`"
      :alt="props.destination.name"
      class="w-full h-80 object-cover"
    />
    <div class="p-6 flex flex-col flex-1">
      <h3 class="text-body text-xl font-semibold mb-2 flex items-center gap-2">
        {{ props.destination.name }}
      </h3>
      <p class="text-body text-sm mb-4 flex-1">{{ props.destination.description }}</p>

      <div class="flex justify-between items-center">
        <button
          class="h-10 text-secondary font-semibold inline-block rounded-lg bg-white hover:underline transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <router-link :to="`/destinations/${props.destination.id}`"> View Details </router-link>
        </button>
        <button
          @click="emit('favorite', props.destination)"
          class="w-10 h-10 inline-block rounded-full bg-white hover:text-white transition-colors duration-200"
        >
          <span class="inline-block align-middle">
            <span class="w-6 h-6">
              <svg
                v-if="destination?.favorite"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-secondary"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17 3H7a2 2 0 00-2 2v16l7-5 7 5V5a2 2 0 00-2-2z"
                  class="text-secondary"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-secondary"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17 3H7a2 2 0 00-2 2v16l7-5 7 5V5a2 2 0 00-2-2z"
                />
              </svg>
            </span>
          </span>
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped></style>
