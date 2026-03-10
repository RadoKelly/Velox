<template>
  <div class="car-card" :class="{ visible: inView, hovered: isHovered }"
    :style="{ transitionDelay: `${0.1 + index * 0.1}s` }" @mouseenter="isHovered = true"
    @mouseleave="isHovered = false">
    <!-- Badge -->
    <div v-if="car.badge" class="car-badge">{{ car.badge }}</div>

    <!-- Visual zone -->
    <div class="car-visual"
      :style="{ background: `radial-gradient(ellipse at 60% 50%, ${car.accent} 0%, transparent 70%)` }">
      <div class="visual-shine" :class="{ active: isHovered }"></div>

      <div class="icon-wrap">
        <v-icon :icon="car.icon" class="car-icon" :style="{ color: car.color }"></v-icon>
        <div class="icon-shadow"
          :style="{ background: `radial-gradient(ellipse, ${car.color}33 0%, transparent 70%)` }"></div>
      </div>

      <div class="ground" :style="{ background: `linear-gradient(90deg, transparent, ${car.color}22, transparent)` }">
      </div>
    </div>

    <!-- Info zone -->
    <div class="car-info">

      <div class="car-top">
        <div>
          <div class="car-category">{{ car.category }}</div>
          <div class="car-name">{{ car.name }}</div>
        </div>
        <div class="car-price">
          <span class="price-val">{{ car.price }}€</span>
          <span class="price-unit">/j</span>
        </div>
      </div>

      <div class="car-features">
        <span v-for="f in car.features" :key="f" class="feature-tag">{{ f }}</span>
      </div>

      <div class="info-sep" :class="{ active: isHovered }"></div>

      <div class="car-actions">
        <button class="action-detail">
          <v-icon icon="mdi-eye-outline" size="14"></v-icon>
          DÉTAILS
        </button>
        <button class="action-reserve" @click="store.openModal(car)">
          RÉSERVER
          <v-icon icon="mdi-arrow-right" size="13" style="margin-left:6px;"></v-icon>
        </button>
      </div>

    </div>

    <!-- Bordure colorée hover -->
    <div class="card-border" :class="{ active: isHovered }" :style="{ '--color': car.color }"></div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useReservationStore } from '../stores/reservation'

defineProps({
  car: {
    type: Object,
    required: true,
    default: () => ({
      name: '', category: '', price: 0,
      icon: 'mdi-car', color: '#E8C547',
      accent: 'rgba(232,197,71,0.12)',
      features: [], badge: null,
    })
  },
  index: { type: Number, default: 0 },
  inView: { type: Boolean, default: false },
})

const isHovered = ref(false)

// ── Pinia remplace useApp ──
const store = useReservationStore()
</script>

<style scoped>
/* ── Card base ── */
.car-card {
  background: #111;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease,
    background 0.3s ease;
}

.car-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.car-card.hovered {
  background: #141414;
}

/* ── Badge ── */
.car-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 3;
  background: #E8C547;
  color: #0D0D0D;
  font-size: 8px;
  letter-spacing: 3px;
  font-weight: 800;
  padding: 4px 10px;
}

/* ── Visual ── */
.car-visual {
  height: 200px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: height 0.4s ease;
}

.car-card.hovered .car-visual {
  height: 220px;
}

.visual-shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.visual-shine.active {
  opacity: 1;
}

.icon-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
}

.car-icon {
  font-size: 110px !important;
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.4s ease;
  filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.5));
}

.car-card.hovered .car-icon {
  transform: translateY(-6px) scale(1.05);
  filter: drop-shadow(0 12px 32px rgba(0, 0, 0, 0.6));
}

.icon-shadow {
  width: 80px;
  height: 12px;
  border-radius: 50%;
  margin-top: -6px;
  transition: transform 0.5s ease, opacity 0.4s ease;
}

.car-card.hovered .icon-shadow {
  transform: scaleX(0.7);
  opacity: 0.5;
}

.ground {
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  height: 1px;
}

/* ── Info ── */
.car-info {
  padding: 22px 24px 24px;
}

.car-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 14px;
}

.car-category {
  font-size: 9px;
  letter-spacing: 4px;
  color: rgba(255, 255, 255, 0.3);
  margin-bottom: 4px;
}

.car-name {
  font-size: 1.1rem;
  font-weight: 800;
  color: white;
  letter-spacing: -0.5px;
}

.car-price {
  display: flex;
  align-items: baseline;
  gap: 2px;
}

.price-val {
  font-size: 1.5rem;
  font-weight: 900;
  color: #E8C547;
  letter-spacing: -1px;
}

.price-unit {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 1px;
}

/* ── Features ── */
.car-features {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 18px;
}

.feature-tag {
  font-size: 8px;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.07);
  padding: 3px 9px;
  transition: all 0.2s ease;
}

.car-card.hovered .feature-tag {
  color: rgba(255, 255, 255, 0.55);
  border-color: rgba(255, 255, 255, 0.12);
}

/* ── Séparateur ── */
.info-sep {
  height: 1px;
  background: rgba(255, 255, 255, 0.05);
  margin-bottom: 18px;
  position: relative;
  overflow: hidden;
}

.info-sep::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(232, 197, 71, 0.5), transparent);
  transform: translateX(-100%);
  transition: transform 0.5s ease;
}

.info-sep.active::after {
  transform: translateX(100%);
}

/* ── Actions ── */
.car-actions {
  display: flex;
  gap: 10px;
}

.action-detail {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.07);
  color: rgba(255, 255, 255, 0.3);
  font-size: 9px;
  letter-spacing: 2px;
  font-weight: 600;
  height: 40px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-detail:hover {
  border-color: rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.7);
}

.action-reserve {
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(232, 197, 71, 0.1);
  border: 1px solid rgba(232, 197, 71, 0.25);
  color: #E8C547;
  font-size: 9px;
  letter-spacing: 2px;
  font-weight: 800;
  height: 40px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.action-reserve:hover {
  background: #E8C547;
  color: #0D0D0D;
  border-color: #E8C547;
}

/* ── Bordure hover ── */
.card-border {
  position: absolute;
  inset: 0;
  border: 1px solid transparent;
  pointer-events: none;
  transition: border-color 0.3s ease;
}

.card-border.active {
  border-color: color-mix(in srgb, var(--color) 30%, transparent);
}
</style>