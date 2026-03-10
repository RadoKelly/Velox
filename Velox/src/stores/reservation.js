import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useReservationStore = defineStore('reservation', () => {

  // ── État ──
  const cart        = ref([])
  const isOpen      = ref(false)
  const selectedCar = ref(null)

  // ── Getters ──
  const cartCount = computed(() => cart.value.length)

  const cartTotal = computed(() =>
    cart.value.reduce((sum, item) => sum + item.totalPrice, 0)
  )

  // ── Actions ──
  function openModal(car) {
    selectedCar.value = car
    isOpen.value      = true
  }

  function closeModal() {
    isOpen.value      = false
    selectedCar.value = null
  }

  function addToCart(reservation) {
    const existing = cart.value.findIndex(
      i => i.car.name === reservation.car.name
    )
    if (existing >= 0) {
      cart.value[existing] = reservation
    } else {
      cart.value.push(reservation)
    }
  }

  function removeFromCart(carName) {
    cart.value = cart.value.filter(i => i.car.name !== carName)
  }

  function clearCart() {
    cart.value = []
  }

  return {
    cart, isOpen, selectedCar,
    cartCount, cartTotal,
    openModal, closeModal,
    addToCart, removeFromCart, clearCart,
  }
})