<template>
  <section class="features-section" ref="sectionRef">

    <!-- Orbes animées en arrière-plan -->
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>

    <!-- Ligne scanline qui descend en boucle -->
    <div class="scanline"></div>

    <v-container style="position:relative; z-index:2;">

      <!-- Header -->
      <div class="feat-header" :class="{ visible: inView }">
        <span class="eyebrow">
          <span class="eyebrow-line"></span>
          POURQUOI NOUS CHOISIR
          <span class="eyebrow-line"></span>
        </span>
        <h2 class="feat-title">
          L'EXCELLENCE<br>
          <span class="title-dim">À CHAQUE ÉTAPE</span>
        </h2>
      </div>

      <!-- Cards -->
      <div class="feat-grid">
        <div
          v-for="(feat, i) in features"
          :key="feat.title"
          class="feat-card"
          :class="{ visible: inView, hovered: hoveredIndex === i }"
          :style="{ transitionDelay: `${0.1 + i * 0.12}s` }"
          @mouseenter="hoveredIndex = i"
          @mouseleave="hoveredIndex = null"
        >
          <!-- Fond particules propre à la card -->
          <div class="card-particles">
            <span
              v-for="p in 5"
              :key="p"
              class="particle"
              :style="{
                left: `${10 + p * 18}%`,
                animationDelay: `${p * 0.4 + i * 0.2}s`,
                animationDuration: `${2.5 + p * 0.5}s`
              }"
            ></span>
          </div>

          <!-- Numéro index -->
          <div class="card-index">0{{ i + 1 }}</div>

          <!-- Icône avec ring -->
          <div class="icon-ring" :style="{ '--accent': feat.color }">
            <div class="ring-rotate"></div>
            <div class="icon-inner">
              <v-icon
                :icon="feat.icon"
                class="feat-icon"
                :style="{ color: feat.color }"
              ></v-icon>
            </div>
          </div>

          <!-- Texte -->
          <div class="card-text">
            <div class="feat-title-card">{{ feat.title }}</div>
            <div class="feat-desc">{{ feat.desc }}</div>
          </div>

          <!-- Barre de progression animée permanente -->
          <div class="progress-bar">
            <div
              class="progress-fill"
              :style="{
                '--color': feat.color,
                animationDelay: `${i * 0.8}s`
              }"
            ></div>
          </div>

          <!-- Bordure glow hover -->
          <div class="card-glow" :style="{ '--color': feat.color }"></div>

        </div>
      </div>

      <!-- Stats row -->
      <div class="feat-stats" :class="{ visible: inView }">
        <div v-for="stat in stats" :key="stat.label" class="fstat">
          <div class="fstat-icon">
            <v-icon :icon="stat.icon" size="14" color="primary"></v-icon>
          </div>
          <div class="fstat-val">{{ stat.value }}</div>
          <div class="fstat-label">{{ stat.label }}</div>
        </div>
      </div>

    </v-container>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useIntersection } from '../composables/useIntersection'

const { targetRef: sectionRef, inView } = useIntersection({ threshold: 0.1 })

const hoveredIndex = ref(null)

const features = [
  {
    icon:  'mdi-clock-fast',
    title: 'RÉSERVATION EXPRESS',
    desc:  "Réservez en moins de 2 minutes, depuis n'importe quel appareil.",
    color: '#E8C547',
  },
  {
    icon:  'mdi-shield-check',
    title: 'ASSURANCE INCLUSE',
    desc:  "Couverture complète tous risques, sans frais cachés.",
    color: '#A0C4FF',
  },
  {
    icon:  'mdi-map-marker-radius',
    title: 'LIVRAISON',
    desc:  "Livraison à domicile, à l'hôtel ou à l'aéroport.",
    color: '#88c999',
  },
  {
    icon:  'mdi-headset',
    title: 'SUPPORT 24/7',
    desc:  "Une équipe disponible à toute heure pour vous assister.",
    color: '#d4af7a',
  },
]

const stats = [
  { icon: 'mdi-car-check',     value: '500+',   label: 'Véhicules vérifiés'  },
  { icon: 'mdi-account-group', value: '12 000+', label: 'Clients satisfaits' },
  { icon: 'mdi-star',          value: '4.9/5',  label: 'Note moyenne'        },
  { icon: 'mdi-map-marker',    value: '8',      label: 'Villes couvertes'    },
]
</script>

<style scoped>

/* ══════════════════════════════
   SECTION
══════════════════════════════ */
.features-section {
  padding: 110px 0 80px;
  background: #0a0a0a;
  position: relative;
  overflow: hidden;
  border-top: 1px solid rgba(232,197,71,0.08);
}

/* ══════════════════════════════
   ORBES DE FOND — animation permanente
══════════════════════════════ */
.orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(80px);
}

.orb-1 {
  width: 500px; height: 500px;
  top: -150px; left: -100px;
  background: radial-gradient(circle, rgba(232,197,71,0.05) 0%, transparent 70%);
  animation: orbFloat1 12s ease-in-out infinite;
}
.orb-2 {
  width: 400px; height: 400px;
  bottom: -100px; right: -80px;
  background: radial-gradient(circle, rgba(160,196,255,0.05) 0%, transparent 70%);
  animation: orbFloat2 15s ease-in-out infinite;
}
.orb-3 {
  width: 300px; height: 300px;
  top: 40%; left: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(136,201,153,0.03) 0%, transparent 70%);
  animation: orbFloat3 10s ease-in-out infinite;
}

@keyframes orbFloat1 {
  0%,100% { transform: translate(0, 0) scale(1);     }
  33%     { transform: translate(60px, 40px) scale(1.1); }
  66%     { transform: translate(-30px, 60px) scale(0.95); }
}
@keyframes orbFloat2 {
  0%,100% { transform: translate(0, 0) scale(1);      }
  50%     { transform: translate(-50px, -40px) scale(1.15); }
}
@keyframes orbFloat3 {
  0%,100% { transform: translate(-50%, -50%) scale(1);   }
  50%     { transform: translate(-50%, -50%) scale(1.3); opacity: 0.5; }
}

/* ══════════════════════════════
   SCANLINE
══════════════════════════════ */
.scanline {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(232,197,71,0.0) 20%,
    rgba(232,197,71,0.15) 50%,
    rgba(232,197,71,0.0) 80%,
    transparent 100%
  );
  animation: scanDown 8s ease-in-out infinite;
  pointer-events: none;
  z-index: 1;
}
@keyframes scanDown {
  0%   { top: 0%;   opacity: 0; }
  5%   { opacity: 1; }
  95%  { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}

/* ══════════════════════════════
   HEADER
══════════════════════════════ */
.feat-header {
  text-align: center;
  margin-bottom: 64px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.feat-header.visible { opacity: 1; transform: translateY(0); }

.eyebrow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  font-size: 10px;
  letter-spacing: 5px;
  color: rgba(255,255,255,0.25);
  margin-bottom: 18px;
}
.eyebrow-line {
  flex: 1;
  max-width: 60px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(232,197,71,0.3));
}
.eyebrow-line:last-child {
  background: linear-gradient(90deg, rgba(232,197,71,0.3), transparent);
}

.feat-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  letter-spacing: -2px;
  line-height: 1.05;
  color: white;
  margin: 0;
}
.title-dim {
  font-weight: 200;
  color: rgba(255,255,255,0.2);
  letter-spacing: 4px;
  font-size: 0.7em;
}

/* ══════════════════════════════
   GRID
══════════════════════════════ */
.feat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: rgba(255,255,255,0.04);
  margin-bottom: 1px;
}

@media (max-width: 960px) { .feat-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px) { .feat-grid { grid-template-columns: 1fr; } }

/* ══════════════════════════════
   CARD
══════════════════════════════ */
.feat-card {
  background: #0f0f0f;
  padding: 40px 28px 32px;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease,
    background 0.3s ease;
}
.feat-card.visible  { opacity: 1; transform: translateY(0); }
.feat-card.hovered  { background: #131313; }

/* ── Particules flottantes ── */
.card-particles { position: absolute; inset: 0; pointer-events: none; }

.particle {
  position: absolute;
  bottom: -4px;
  width: 2px;
  height: 2px;
  background: rgba(232,197,71,0.4);
  border-radius: 50%;
  animation: particleRise linear infinite;
}
@keyframes particleRise {
  0%   { transform: translateY(0) scale(1);   opacity: 0.6; }
  100% { transform: translateY(-120px) scale(0); opacity: 0; }
}

/* ── Index ── */
.card-index {
  position: absolute;
  top: 20px; right: 20px;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 2px;
  color: rgba(255,255,255,0.06);
  font-variant-numeric: tabular-nums;
}

/* ── Icône ring ── */
.icon-ring {
  position: relative;
  width: 64px; height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.ring-rotate {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px dashed rgba(232,197,71,0.15);
  animation: ringRotate 10s linear infinite;
}
.feat-card.hovered .ring-rotate {
  border-color: color-mix(in srgb, var(--accent) 30%, transparent);
  animation-duration: 4s;
}

@keyframes ringRotate {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.icon-inner {
  width: 52px; height: 52px;
  border-radius: 50%;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease, border-color 0.3s ease;
  position: relative;
  z-index: 1;
}
.feat-card.hovered .icon-inner {
  background: color-mix(in srgb, var(--accent) 10%, transparent);
  border-color: color-mix(in srgb, var(--accent) 30%, transparent);
}

.feat-icon {
  font-size: 24px !important;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.feat-card.hovered .feat-icon {
  transform: scale(1.2) rotate(-5deg);
}

/* ── Texte ── */
.card-text { margin-bottom: 24px; }

.feat-title-card {
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 2.5px;
  color: white;
  margin-bottom: 10px;
}

.feat-desc {
  font-size: 12px;
  color: rgba(255,255,255,0.35);
  line-height: 1.8;
  transition: color 0.3s ease;
}
.feat-card.hovered .feat-desc { color: rgba(255,255,255,0.55); }

/* ── Barre de progression permanente ── */
.progress-bar {
  height: 2px;
  background: rgba(255,255,255,0.04);
  overflow: hidden;
  position: relative;
}

.progress-fill {
  position: absolute;
  top: 0; left: -100%;
  width: 60%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    color-mix(in srgb, var(--color) 60%, transparent),
    var(--color),
    color-mix(in srgb, var(--color) 60%, transparent),
    transparent
  );
  animation: progressSlide 3s ease-in-out infinite;
}
@keyframes progressSlide {
  0%   { left: -60%; }
  100% { left: 110%; }
}

/* ── Glow hover ── */
.card-glow {
  position: absolute;
  inset: 0;
  border: 1px solid transparent;
  pointer-events: none;
  transition: border-color 0.35s ease;
}
.feat-card.hovered .card-glow {
  border-color: color-mix(in srgb, var(--color) 20%, transparent);
}

/* ══════════════════════════════
   STATS ROW
══════════════════════════════ */
.feat-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.04);
  margin-top: 1px;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.7s ease 0.6s, transform 0.7s ease 0.6s;
}
.feat-stats.visible { opacity: 1; transform: translateY(0); }

@media (max-width: 600px) { .feat-stats { grid-template-columns: repeat(2, 1fr); } }

.fstat {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 28px 16px;
  gap: 6px;
  border-right: 1px solid rgba(255,255,255,0.04);
  transition: background 0.3s ease;
}
.fstat:last-child { border-right: none; }
.fstat:hover { background: rgba(232,197,71,0.02); }

.fstat-icon {
  width: 28px; height: 28px;
  border-radius: 50%;
  background: rgba(232,197,71,0.06);
  border: 1px solid rgba(232,197,71,0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
}

.fstat-val {
  font-size: 1.3rem;
  font-weight: 900;
  color: white;
  letter-spacing: -1px;
}

.fstat-label {
  font-size: 9px;
  letter-spacing: 2px;
  color: rgba(255,255,255,0.25);
  text-align: center;
}
</style>