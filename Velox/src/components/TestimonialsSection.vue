<template>
  <section class="testi-section" ref="sectionRef">

    <!-- Fond décoratif -->
    <div class="bg-orb"></div>
    <div class="bg-grid"></div>

    <v-container style="position:relative; z-index:2;">

      <!-- Header -->
      <div class="testi-header" :class="{ visible: inView }">
        <span class="eyebrow">
          <span class="eyebrow-line"></span>
          AVIS CLIENTS
          <span class="eyebrow-line right"></span>
        </span>
        <h2 class="testi-title">
          ILS NOUS FONT<br>
          <span class="title-gold">CONFIANCE</span>
        </h2>
        <p class="testi-sub">Plus de 12 000 clients satisfaits à travers Madagascar</p>
      </div>

      <!-- Carrousel wrapper -->
      <div class="carousel-wrap" :class="{ visible: inView }">

        <!-- Track -->
        <div class="carousel-track" ref="trackRef">
          <div
            v-for="(t, i) in testimonials"
            :key="i"
            class="testi-card"
            :class="{ active: currentIndex === i, prev: isPrev(i), next: isNext(i) }"
          >
            <!-- Quote décorative -->
            <div class="quote-mark">"</div>

            <!-- Étoiles -->
            <div class="stars-row">
              <span
                v-for="s in 5"
                :key="s"
                class="star"
                :class="{ filled: s <= t.rating }"
                :style="{ animationDelay: `${s * 0.08}s` }"
              >★</span>
              <span class="rating-num">{{ t.rating }}.0</span>
            </div>

            <!-- Texte -->
            <p class="testi-text">"{{ t.text }}"</p>

            <!-- Séparateur -->
            <div class="card-sep"></div>

            <!-- Auteur -->
            <div class="testi-author">
              <div class="author-avatar" :style="{ background: t.gradient }">
                <span>{{ t.initials }}</span>
              </div>
              <div class="author-info">
                <div class="author-name">{{ t.name }}</div>
                <div class="author-role">{{ t.role }}</div>
              </div>
              <div class="author-verified">
                <v-icon icon="mdi-check-circle" size="14" color="primary"></v-icon>
                <span>Vérifié</span>
              </div>
            </div>

          </div>
        </div>

        <!-- Contrôles -->
        <div class="carousel-controls">

          <!-- Prev -->
          <button class="ctrl-btn" @click="prev" :disabled="isAnimating">
            <v-icon icon="mdi-arrow-left" size="18"></v-icon>
          </button>

          <!-- Dots -->
          <div class="dots">
            <button
              v-for="(_, i) in testimonials"
              :key="i"
              class="dot"
              :class="{ active: currentIndex === i }"
              @click="goTo(i)"
            ></button>
          </div>

          <!-- Next -->
          <button class="ctrl-btn" @click="next" :disabled="isAnimating">
            <v-icon icon="mdi-arrow-right" size="18"></v-icon>
          </button>

        </div>

        <!-- Progress bar autoplay -->
        <div class="autoplay-bar">
          <div
            class="autoplay-fill"
            :class="{ running: inView }"
            :style="{ animationDuration: `${autoplayDelay}ms` }"
            :key="currentIndex"
          ></div>
        </div>

      </div>

      <!-- Cards mini aperçu -->
      <div class="mini-cards" :class="{ visible: inView }">
        <div
          v-for="(t, i) in testimonials"
          :key="i"
          class="mini-card"
          :class="{ active: currentIndex === i }"
          @click="goTo(i)"
        >
          <div class="mini-avatar" :style="{ background: t.gradient }">{{ t.initials }}</div>
          <div class="mini-name">{{ t.name }}</div>
        </div>
      </div>

    </v-container>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useIntersection } from '../composables/useIntersection'

// ← Ces 2 lignes remplacent les 15 lignes d'avant
const { targetRef: sectionRef, inView } = useIntersection({ threshold: 0.1 })

const currentIndex  = ref(0)
const isAnimating   = ref(false)
const autoplayDelay = 5000

const testimonials = [
  {
    name:     'Rakoto Jean',
    role:     "Chef d'entreprise",
    initials: 'RJ',
    rating:   5,
    gradient: 'linear-gradient(135deg, #E8C547, #b8952a)',
    text:     "Service impeccable, voiture propre et en parfait état. Je recommande vivement pour les déplacements professionnels. Une expérience vraiment premium.",
  },
  {
    name:     'Miora Rasoa',
    role:     'Directrice Marketing',
    initials: 'MR',
    rating:   5,
    gradient: 'linear-gradient(135deg, #A0C4FF, #5090e0)',
    text:     "La réservation en ligne est très simple. La livraison à l'hôtel était ponctuelle. Excellent rapport qualité/prix, je reviendrai sans hésiter.",
  },
  {
    name:     'Paul Andria',
    role:     'Touriste',
    initials: 'PA',
    rating:   5,
    gradient: 'linear-gradient(135deg, #88c999, #3a9a55)',
    text:     "Parfait pour découvrir Madagascar. Le véhicule était fiable et l'équipe très professionnelle. Je recommande à tous les voyageurs.",
  },
  {
    name:     'Hery Rakoton',
    role:     'Médecin',
    initials: 'HR',
    rating:   5,
    gradient: 'linear-gradient(135deg, #d4af7a, #a07830)',
    text:     "Disponibilité remarquable et véhicule impeccable. Le chauffeur était ponctuel et très courtois. Une prestation 5 étoiles de bout en bout.",
  },
  {
    name:     'Lalao Rabe',
    role:     'Architecte',
    initials: 'LR',
    rating:   5,
    gradient: 'linear-gradient(135deg, #f4a0a0, #c04040)',
    text:     "J'utilise leurs services chaque semaine pour mes chantiers. Fiabilité totale, confort excellent et prix très compétitifs. Vraiment au top.",
  },
]

function isPrev(i) {
  return i === (currentIndex.value - 1 + testimonials.length) % testimonials.length
}
function isNext(i) {
  return i === (currentIndex.value + 1) % testimonials.length
}
function goTo(i) {
  if (isAnimating.value || i === currentIndex.value) return
  isAnimating.value = true
  currentIndex.value = i
  setTimeout(() => { isAnimating.value = false }, 600)
}
function next() { goTo((currentIndex.value + 1) % testimonials.length) }
function prev() { goTo((currentIndex.value - 1 + testimonials.length) % testimonials.length) }

// Autoplay — démarre quand inView devient true
import { watch } from 'vue'
let autoplayTimer = null

watch(inView, (v) => {
  if (v) autoplayTimer = setInterval(next, autoplayDelay)
})

onUnmounted(() => clearInterval(autoplayTimer))
</script>

<style scoped>

/* ══════════════════════════════
   SECTION
══════════════════════════════ */
.testi-section {
  padding: 110px 0 80px;
  background: #0D0D0D;
  position: relative;
  overflow: hidden;
}

.bg-orb {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 800px; height: 800px;
  background: radial-gradient(circle, rgba(232,197,71,0.03) 0%, transparent 65%);
  pointer-events: none;
  animation: orbPulse 8s ease-in-out infinite;
}
@keyframes orbPulse {
  0%,100% { transform: translate(-50%,-50%) scale(1);   opacity: 1; }
  50%      { transform: translate(-50%,-50%) scale(1.2); opacity: 0.6; }
}

.bg-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
  background-size: 56px 56px;
  pointer-events: none;
  mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent);
}

/* ══════════════════════════════
   HEADER
══════════════════════════════ */
.testi-header {
  text-align: center;
  margin-bottom: 64px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.testi-header.visible { opacity: 1; transform: translateY(0); }

.eyebrow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  font-size: 10px;
  letter-spacing: 5px;
  color: rgba(255,255,255,0.25);
  margin-bottom: 16px;
}
.eyebrow-line {
  flex: 1; max-width: 60px; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(232,197,71,0.35));
}
.eyebrow-line.right {
  background: linear-gradient(90deg, rgba(232,197,71,0.35), transparent);
}

.testi-title {
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 900;
  letter-spacing: -2px;
  line-height: 1.05;
  color: white;
  margin: 0 0 12px;
}
.title-gold { color: #E8C547; }

.testi-sub {
  font-size: 13px;
  color: rgba(255,255,255,0.25);
  letter-spacing: 1px;
  margin: 0;
}

/* ══════════════════════════════
   CAROUSEL
══════════════════════════════ */
.carousel-wrap {
  max-width: 760px;
  margin: 0 auto 40px;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s;
}
.carousel-wrap.visible { opacity: 1; transform: translateY(0); }

.carousel-track {
  position: relative;
  height: 320px;
  perspective: 1200px;
}

/* ── Cards ── */
.testi-card {
  position: absolute;
  inset: 0;
  background: #141414;
  border: 1px solid rgba(255,255,255,0.06);
  padding: 40px 44px;
  opacity: 0;
  transform: translateX(60px) scale(0.95);
  transition:
    opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.testi-card.active {
  opacity: 1;
  transform: translateX(0) scale(1);
  pointer-events: auto;
  border-color: rgba(232,197,71,0.12);
  z-index: 2;
}
.testi-card.prev {
  opacity: 0;
  transform: translateX(-60px) scale(0.95);
}
.testi-card.next {
  opacity: 0;
  transform: translateX(60px) scale(0.95);
}

/* Quote mark */
.quote-mark {
  position: absolute;
  top: 16px; right: 28px;
  font-size: 80px;
  font-weight: 900;
  color: rgba(232,197,71,0.06);
  line-height: 1;
  font-family: Georgia, serif;
  pointer-events: none;
}

/* Étoiles */
.stars-row {
  display: flex;
  align-items: center;
  gap: 3px;
  margin-bottom: 20px;
}
.star {
  font-size: 14px;
  color: rgba(255,255,255,0.1);
  transition: color 0.3s ease;
}
.star.filled { color: #E8C547; }

.testi-card.active .star.filled {
  animation: starPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
@keyframes starPop {
  from { transform: scale(0); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}

.rating-num {
  font-size: 11px;
  font-weight: 700;
  color: rgba(255,255,255,0.3);
  margin-left: 6px;
  letter-spacing: 1px;
}

/* Texte */
.testi-text {
  font-size: 14px;
  line-height: 1.9;
  color: rgba(255,255,255,0.6);
  font-style: italic;
  margin: 0;
  flex: 1;
  display: flex;
  align-items: center;
}

/* Séparateur */
.card-sep {
  height: 1px;
  background: rgba(255,255,255,0.05);
  margin: 20px 0;
}

/* Auteur */
.testi-author {
  display: flex;
  align-items: center;
  gap: 12px;
}

.author-avatar {
  width: 40px; height: 40px;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 900;
  color: rgba(0,0,0,0.7);
  flex-shrink: 0;
}

.author-info { flex: 1; }

.author-name {
  font-size: 13px;
  font-weight: 700;
  color: white;
  letter-spacing: 0.5px;
}
.author-role {
  font-size: 10px;
  color: rgba(255,255,255,0.3);
  letter-spacing: 1px;
  margin-top: 2px;
}

.author-verified {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 9px;
  letter-spacing: 1px;
  color: rgba(255,255,255,0.3);
}

/* ══════════════════════════════
   CONTRÔLES
══════════════════════════════ */
.carousel-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 24px;
}

.ctrl-btn {
  width: 40px; height: 40px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s ease;
}
.ctrl-btn:hover:not(:disabled) {
  background: rgba(232,197,71,0.08);
  border-color: rgba(232,197,71,0.3);
  color: #E8C547;
}
.ctrl-btn:disabled { opacity: 0.3; cursor: not-allowed; }

/* Dots */
.dots {
  display: flex;
  gap: 8px;
  align-items: center;
}

.dot {
  width: 20px; height: 2px;
  background: rgba(255,255,255,0.1);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}
.dot.active {
  width: 36px;
  background: #E8C547;
}
.dot:hover:not(.active) { background: rgba(255,255,255,0.25); }

/* ══════════════════════════════
   AUTOPLAY BAR
══════════════════════════════ */
.autoplay-bar {
  height: 1px;
  background: rgba(255,255,255,0.05);
  margin-top: 12px;
  overflow: hidden;
}
.autoplay-fill {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, rgba(232,197,71,0.4), #E8C547);
}
.autoplay-fill.running {
  animation: autoplayProgress linear forwards;
}
@keyframes autoplayProgress {
  from { width: 0%; }
  to   { width: 100%; }
}

/* ══════════════════════════════
   MINI CARDS
══════════════════════════════ */
.mini-cards {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s;
}
.mini-cards.visible { opacity: 1; transform: translateY(0); }

.mini-card {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.05);
  cursor: pointer;
  transition: all 0.25s ease;
}
.mini-card:hover {
  background: rgba(232,197,71,0.04);
  border-color: rgba(232,197,71,0.15);
}
.mini-card.active {
  background: rgba(232,197,71,0.07);
  border-color: rgba(232,197,71,0.3);
}

.mini-avatar {
  width: 24px; height: 24px;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  font-weight: 900;
  color: rgba(0,0,0,0.7);
}

.mini-name {
  font-size: 10px;
  letter-spacing: 1px;
  color: rgba(255,255,255,0.35);
  font-weight: 600;
}
.mini-card.active .mini-name { color: rgba(255,255,255,0.7); }

/* ══════════════════════════════
   RESPONSIVE
══════════════════════════════ */
@media (max-width: 600px) {
  .carousel-track { height: 380px; }
  .testi-card { padding: 28px 24px; }
}
</style>