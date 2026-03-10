import { ref, provide, inject } from 'vue'

const APP_KEY = Symbol('app')

export function provideApp() {
  const selectedCar     = ref(null)
  const reservationOpen = ref(false)

  function openReservation(car) {
    selectedCar.value     = car
    reservationOpen.value = true
  }

  function closeReservation() {
    reservationOpen.value = false
    selectedCar.value     = null
  }

  provide(APP_KEY, {
    selectedCar,
    reservationOpen,
    openReservation,
    closeReservation,
  })
}

export function useApp() {
  return inject(APP_KEY)
}