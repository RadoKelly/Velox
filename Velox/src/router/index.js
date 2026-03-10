import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/flotte',
    name: 'Flotte',
    component: () => import('../views/FlotteView.vue'),
  },
  {
    path: '/reservation',
    name: 'Reservation',
    component: () => import('../views/ReservationView.vue'),
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  },
})