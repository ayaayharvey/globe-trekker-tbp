import { defineStore } from 'pinia'

export const useDestinationsStore = defineStore('destinations', {
  state: () => ({
    destinations: [],
    favorites: [],
    featured: [],
  }),
  getters: {
    getDestination(state) {
      return state?.destinations.map((dest) => ({
        ...dest,
        favorite: state?.favorites.includes(dest.id),
      }))
    },
    getFeatured(state) {
      return state?.featured.map((dest) => ({
        ...dest,
        favorite: state?.favorites.includes(dest.id),
      }))
    },
    getFavorites(state) {
      return state?.destinations
        .filter((dest) => state?.favorites.includes(dest.id))
        .map((dest) => ({
          ...dest,
          favorite: true,
        }))
    },
  },
  actions: {
    toggleFavorite(id) {
      if (this.favorites.includes(id)) {
        this.favorites = this.favorites.filter((fav) => fav !== id)
      } else {
        this.favorites.push(id)
      }
    },
    setFeatured() {
      const copy = this.destinations.slice()
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = copy[i]
        copy[i] = copy[j]
        copy[j] = temp
      }
      this.featured = copy.slice(0, 3)
    },
  },
})
