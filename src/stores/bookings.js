import { defineStore } from 'pinia'

export const useBookingsStore = defineStore('bookings', {
  state: () => ({
    bookings: [],
  }),
  getters: {},
  actions: {
    addBooking(booking) {
      if (!booking.id) {
        booking.id = Date.now().toString()
      }
      if (!booking.status) {
        booking.status = 'pending'
      }
      booking.createdAt = JSON.stringify(new Date())
      this.bookings.push(booking)
    },
  },
})
