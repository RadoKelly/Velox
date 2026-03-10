<template>
  <section class="flotte-page">

    <div class="page-header">
      <div class="page-eyebrow">NOS VÉHICULES</div>
      <h1 class="page-title">TOUTE LA FLOTTE</h1>
      <p class="page-sub">{{ filteredCars.length }} véhicules disponibles</p>
    </div>

    <v-container>
      <div class="page-filters">
        <button
          v-for="f in filters"
          :key="f.value"
          class="filter-btn"
          :class="{ active: activeFilter === f.value }"
          @click="activeFilter = f.value"
        >
          {{ f.label }}
        </button>
      </div>

      <TransitionGroup name="cards" tag="div" class="page-grid">
        <CarCard
          v-for="(car, i) in filteredCars"
          :key="car.name"
          :car="car"
          :index="i"
          :in-view="true"
        />
      </TransitionGroup>
    </v-container>

  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import CarCard from '../components/CarCard.vue'

const activeFilter = ref('ALL')

const filters = [
  { label: 'TOUS',       value: 'ALL'        },
  { label: 'BERLINE',    value: 'BERLINE'    },
  { label: 'SUV',        value: 'SUV'        },
  { label: 'ÉLECTRIQUE', value: 'ÉLECTRIQUE' },
  { label: 'LUXE',       value: 'LUXE'       },
]

const cars = [
  { name: 'Tesla Model 3',     category: 'ÉLECTRIQUE', price: 89,  icon: 'mdi-car-electric',   color: '#E8C547', accent: 'rgba(232,197,71,0.12)',  features: ['AUTOPILOT','WIFI','GPS','5 PLACES'],   badge: 'POPULAIRE' },
  { name: 'BMW Série 5',       category: 'BERLINE',    price: 120, icon: 'mdi-car',             color: '#A0C4FF', accent: 'rgba(160,196,255,0.10)', features: ['CUIR','CLIM','GPS','5 PLACES'],        badge: null        },
  { name: 'Range Rover',       category: 'SUV',        price: 180, icon: 'mdi-car-suv',         color: '#C8B8A2', accent: 'rgba(200,184,162,0.10)', features: ['4X4','PANORAMA','GPS','7 PLACES'],     badge: 'PREMIUM'   },
  { name: 'Mercedes Classe S', category: 'LUXE',       price: 240, icon: 'mdi-car-convertible', color: '#d4af7a', accent: 'rgba(212,175,122,0.10)', features: ['MASSAGES','CLIM 4Z','GPS','5 PLACES'], badge: 'EXCLUSIF'  },
  { name: 'Toyota RAV4',       category: 'SUV',        price: 95,  icon: 'mdi-car-suv',         color: '#88c999', accent: 'rgba(136,201,153,0.10)', features: ['4X4','CLIM','GPS','5 PLACES'],         badge: null        },
  { name: 'Audi A6',           category: 'BERLINE',    price: 150, icon: 'mdi-car-sports',      color: '#b0b8d0', accent: 'rgba(176,184,208,0.10)', features: ['MATRIX','CUIR','GPS','5 PLACES'],      badge: null        },
]

const filteredCars = computed(() =>
  activeFilter.value === 'ALL'
    ? cars
    : cars.filter(c => c.category === activeFilter.value)
)
</script>

<style scoped>
.flotte-page {
  min-height: 100vh;
  background: #0D0D0D;
  padding-top: 100px;
}
.page-header {
  text-align: center;
  padding: 60px 0 48px;
}
.page-eyebrow {
  font-size: 10px; letter-spacing: 5px;
  color: rgba(255,255,255,0.25); margin-bottom: 12px;
}
.page-title {
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 900; letter-spacing: -3px;
  color: white; margin: 0 0 12px;
}
.page-sub {
  font-size: 13px;
  color: rgba(255,255,255,0.3);
}
.page-filters {
  display: flex; gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 48px;
}
.filter-btn {
  background: none;
  border: 1px solid rgba(255,255,255,0.07);
  color: rgba(255,255,255,0.3);
  font-size: 9px; letter-spacing: 3px;
  padding: 7px 16px; cursor: pointer;
  transition: all 0.25s ease; font-weight: 600;
}
.filter-btn:hover {
  border-color: rgba(232,197,71,0.3);
  color: rgba(255,255,255,0.7);
}
.filter-btn.active {
  background: rgba(232,197,71,0.1);
  border-color: rgba(232,197,71,0.5);
  color: #E8C547;
}
.page-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.04);
  margin-bottom: 80px;
  position: relative;
}
@media (max-width: 960px) { .page-grid { grid-template-columns: repeat(2,1fr); } }
@media (max-width: 600px) { .page-grid { grid-template-columns: 1fr; } }

.cards-move,
.cards-enter-active,
.cards-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.cards-enter-from { opacity: 0; transform: translateY(20px) scale(0.95); }
.cards-leave-to   { opacity: 0; transform: translateY(-20px) scale(0.95); }
.cards-leave-active { position: absolute; }
</style>