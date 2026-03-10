<template>
  <section class="fleet-section" ref="sectionRef">
    <v-container>

      <!-- ── Header ── -->
      <div class="fleet-header" :class="{ visible: inView }">
        <div class="header-left">
          <span class="eyebrow">
            <span class="eyebrow-line"></span>
            NOTRE FLOTTE
          </span>
          <h2 class="fleet-title">
            CHOISISSEZ<br>
            <span class="title-outline">VOTRE VÉHICULE</span>
          </h2>
        </div>
        <div class="header-right">
          <p class="fleet-sub">
            Chaque véhicule est inspecté,<br>
            nettoyé et assuré avant chaque location.
          </p>
          <div class="filters">
            <button v-for="f in filters" :key="f.value" class="filter-btn" :class="{ active: activeFilter === f.value }"
              @click="activeFilter = f.value">
              {{ f.label }}
            </button>
          </div>
        </div>
      </div>

      <!-- ── Grid ── -->
      <TransitionGroup name="cards" tag="div" class="cars-grid">
        <CarCard v-for="(car, i) in filteredCars" :key="car.name" :car="car" :index="i" :in-view="inView" />
      </TransitionGroup>

      <!-- ── Footer ── -->
      <div class="fleet-footer" :class="{ visible: inView }">
        <span class="footer-count">
          {{ filteredCars.length }} véhicule{{ filteredCars.length > 1 ? 's' : '' }} disponible{{ filteredCars.length >
            1 ? 's' : '' }}
        </span>
        <button class="all-btn">
          VOIR TOUTE LA FLOTTE
          <v-icon icon="mdi-arrow-right" size="14" style="margin-left:8px;"></v-icon>
        </button>
      </div>

    </v-container>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import CarCard from './CarCard.vue'
import { useIntersection } from '../composables/useIntersection'

// ← Ces 2 lignes remplacent les 15 lignes d'avant
const { targetRef: sectionRef, inView } = useIntersection({ threshold: 0.1 })

const activeFilter = ref('ALL')

const filters = [
  { label: 'TOUS',       value: 'ALL'        },
  { label: 'BERLINE',    value: 'BERLINE'    },
  { label: 'SUV',        value: 'SUV'        },
  { label: 'ÉLECTRIQUE', value: 'ÉLECTRIQUE' },
  { label: 'LUXE',       value: 'LUXE'       },
]

const cars = [
  {
    name:     'Tesla Model 3',
    category: 'ÉLECTRIQUE',
    price:    89,
    icon:     'mdi-car-electric',
    color:    '#E8C547',
    accent:   'rgba(232,197,71,0.12)',
    features: ['AUTOPILOT', 'WIFI', 'GPS', '5 PLACES'],
    badge:    'POPULAIRE',
  },
  {
    name:     'BMW Série 5',
    category: 'BERLINE',
    price:    120,
    icon:     'mdi-car',
    color:    '#A0C4FF',
    accent:   'rgba(160,196,255,0.10)',
    features: ['CUIR', 'CLIM', 'GPS', '5 PLACES'],
    badge:    null,
  },
  {
    name:     'Range Rover',
    category: 'SUV',
    price:    180,
    icon:     'mdi-car-suv',
    color:    '#C8B8A2',
    accent:   'rgba(200,184,162,0.10)',
    features: ['4X4', 'PANORAMA', 'GPS', '7 PLACES'],
    badge:    'PREMIUM',
  },
  {
    name:     'Mercedes Classe S',
    category: 'LUXE',
    price:    240,
    icon:     'mdi-car-convertible',
    color:    '#d4af7a',
    accent:   'rgba(212,175,122,0.10)',
    features: ['MASSAGES', 'CLIM 4Z', 'GPS', '5 PLACES'],
    badge:    'EXCLUSIF',
  },
  {
    name:     'Toyota RAV4',
    category: 'SUV',
    price:    95,
    icon:     'mdi-car-suv',
    color:    '#88c999',
    accent:   'rgba(136,201,153,0.10)',
    features: ['4X4', 'CLIM', 'GPS', '5 PLACES'],
    badge:    null,
  },
  {
    name:     'Audi A6',
    category: 'BERLINE',
    price:    150,
    icon:     'mdi-car-sports',
    color:    '#b0b8d0',
    accent:   'rgba(176,184,208,0.10)',
    features: ['MATRIX', 'CUIR', 'GPS', '5 PLACES'],
    badge:    null,
  },
]

const filteredCars = computed(() =>
  activeFilter.value === 'ALL'
    ? cars
    : cars.filter(c => c.category === activeFilter.value)
)
</script>

<style scoped>
.fleet-section {
  padding: 110px 0 80px;
  background: #0D0D0D;
  position: relative;
  overflow: hidden;
}

.fleet-section::before {
  content: '';
  position: absolute;
  top: -200px;
  right: -200px;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(232, 197, 71, 0.03) 0%, transparent 70%);
  pointer-events: none;
}

/* ── Header ── */
.fleet-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 40px;
  margin-bottom: 56px;
  flex-wrap: wrap;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.fleet-header.visible {
  opacity: 1;
  transform: translateY(0);
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 10px;
  letter-spacing: 5px;
  color: rgba(255, 255, 255, 0.3);
  margin-bottom: 16px;
}

.eyebrow-line {
  display: inline-block;
  width: 28px;
  height: 1px;
  background: #E8C547;
}

.fleet-title {
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  font-weight: 900;
  letter-spacing: -2px;
  line-height: 1.0;
  color: white;
  margin: 0;
}

.title-outline {
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.25);
  color: transparent;
  letter-spacing: -1px;
}

.fleet-sub {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.3);
  line-height: 1.9;
  margin: 0 0 20px;
  text-align: right;
}

/* ── Filtres ── */
.filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.filter-btn {
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.07);
  color: rgba(255, 255, 255, 0.3);
  font-size: 9px;
  letter-spacing: 3px;
  padding: 7px 16px;
  cursor: pointer;
  transition: all 0.25s ease;
  font-weight: 600;
}

.filter-btn:hover {
  border-color: rgba(232, 197, 71, 0.3);
  color: rgba(255, 255, 255, 0.7);
}

.filter-btn.active {
  background: rgba(232, 197, 71, 0.1);
  border-color: rgba(232, 197, 71, 0.5);
  color: #E8C547;
}

/* ── Grid ── */
.cars-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.04);
}

@media (max-width: 960px) {
  .cars-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .cars-grid {
    grid-template-columns: 1fr;
  }
}

/* ── Footer ── */
.fleet-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s;
}

.fleet-footer.visible {
  opacity: 1;
  transform: translateY(0);
}

.footer-count {
  font-size: 10px;
  letter-spacing: 3px;
  color: rgba(255, 255, 255, 0.2);
}

.all-btn {
  display: inline-flex;
  align-items: center;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.4);
  font-size: 11px;
  letter-spacing: 3px;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s;
  padding: 0;
}

.all-btn:hover {
  color: #E8C547;
}

/* TransitionGroup filter animation */
.cards-move,
.cards-enter-active,
.cards-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.cards-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
.cards-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}
.cards-leave-active {
  position: absolute;
}
</style>