<template>
  <v-app>
    <NavBar />
    <v-main style="background:#0D0D0D;">
      <RouterView />
    </v-main>
    <FooterSection />
    <ReservationModal />
  </v-app>
</template>

<script setup>
// ← Plus rien ici, Pinia est disponible dans les composants enfants
import NavBar           from './components/NavBar.vue'
import FooterSection    from './components/FooterSection.vue'
import ReservationModal from './components/ReservationModal.vue'
</script>
```


```
main.js
  createApp(App)      ← App.vue s'exécute ICI
    ↓
  App.vue script      ← useReservationStore() appelé ICI
    ↓
  .use(pinia)         ← Pinia installé ICI — TROP TARD !
```

Avec le fix :
```
main.js
  createApp(App)      ← App créée
  .use(pinia)         ← Pinia installé EN PREMIER
  .use(router)
  .use(vuetify)
  .mount('#app')      ← App.vue s'exécute ICI — Pinia déjà dispo ✅