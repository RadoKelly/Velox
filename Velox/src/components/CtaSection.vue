<template>
  <section class="cta-section" ref="sectionRef">

    <!-- ══ Fond ══ -->
    <div class="bg-base"></div>
    <canvas ref="canvasRef" class="bg-canvas"></canvas>
    <div class="bg-vignette"></div>

    <!-- Lignes diagonales décoratives -->
    <div class="diag-lines">
      <div v-for="n in 8" :key="n" class="diag" :style="{ '--i': n }"></div>
    </div>

    <v-container class="cta-container" style="position:relative; z-index:3;">
      <div class="cta-inner" :class="{ visible: inView }">

        <!-- Coin décoratifs -->
        <div class="corner c-tl"></div>
        <div class="corner c-tr"></div>
        <div class="corner c-bl"></div>
        <div class="corner c-br"></div>

        <!-- Badge top -->
        <div class="cta-badge">
          <span class="badge-pulse"></span>
          DISPONIBLE MAINTENANT
        </div>

        <!-- Titre principal -->
        <div class="cta-title-wrap">
          <div class="cta-eyebrow">PRÊT À PARTIR ?</div>
          <h2 class="cta-title">
            <span class="word w1">RÉSERVEZ</span>
            <span class="word w2">
              <span class="word-outline">L'EXCEPTION</span>
            </span>
            <span class="word w3">MAINTENANT</span>
          </h2>
        </div>

        <!-- Sous-titre avec icônes inline -->
        <div class="cta-perks">
          <div v-for="perk in perks" :key="perk.label" class="perk">
            <v-icon :icon="perk.icon" size="13" color="primary"></v-icon>
            <span>{{ perk.label }}</span>
          </div>
        </div>

        <!-- Bouton principal — le vrai hero -->
        <div class="btn-wrap">

          <button
            class="mega-btn"
            :class="{ hovered: btnHover, clicked: btnClicked }"
            @mouseenter="btnHover = true"
            @mouseleave="btnHover = false"
            @mousedown="btnClicked = true"
            @mouseup="btnClicked = false"
          >
            <!-- Fond liquide animé -->
            <div class="btn-liquid">
              <div class="liquid-blob b1"></div>
              <div class="liquid-blob b2"></div>
              <div class="liquid-blob b3"></div>
            </div>

            <!-- Contenu -->
            <div class="btn-text-wrap">
              <div class="btn-top-line">DÉMARRER LA RÉSERVATION</div>
              <div class="btn-sub-line">
                <v-icon icon="mdi-clock-fast" size="11"></v-icon>
                Confirmation en 2 minutes
              </div>
            </div>

            <!-- Flèche animée -->
            <div class="btn-arrow-wrap">
              <v-icon icon="mdi-arrow-right" size="20" class="arrow-icon"></v-icon>
            </div>

            <!-- Glow externe -->
            <div class="btn-outer-glow"></div>

          </button>

          <!-- Texte sous le bouton -->
          <div class="btn-caption">
            <v-icon icon="mdi-lock-outline" size="11" style="opacity:0.3; margin-right:5px;"></v-icon>
            Paiement sécurisé · Sans engagement · Annulation gratuite
          </div>

        </div>

        <!-- Stats inline -->
        <div class="cta-stats">
          <div v-for="stat in stats" :key="stat.label" class="cstat">
            <span class="cstat-val">{{ stat.value }}</span>
            <span class="cstat-sep">—</span>
            <span class="cstat-label">{{ stat.label }}</span>
          </div>
        </div>

      </div>
    </v-container>

  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useIntersection } from '../composables/useIntersection'

// ── Intersection ──
const { targetRef: sectionRef, inView } = useIntersection({ threshold: 0.2 })

// ── Bouton ──
const btnHover   = ref(false)
const btnClicked = ref(false)

// ── Perks ──
const perks = [
  { icon: 'mdi-car-check',        label: '500+ véhicules'         },
  { icon: 'mdi-map-marker-check', label: 'Livraison Antananarivo' },
  { icon: 'mdi-shield-check',     label: 'Assurance incluse'      },
  { icon: 'mdi-star',             label: "4.9/5 — 2 400 avis"    },
]

// ── Stats ──
const stats = [
  { value: '< 2 min', label: 'Réservation'  },
  { value: '7j/7',    label: 'Disponible'   },
  { value: '0€',      label: "d'engagement" },
]

// ── Canvas particles ──
const canvasRef = ref(null)
let animFrame   = null
let particles   = []

function initCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')

  function resize() {
    canvas.width  = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
  }
  resize()
  window.addEventListener('resize', resize)

  particles = Array.from({ length: 60 }, () => ({
    x:    Math.random() * canvas.width,
    y:    Math.random() * canvas.height,
    r:    Math.random() * 1.2 + 0.3,
    vx:   (Math.random() - 0.5) * 0.3,
    vy:   -Math.random() * 0.4 - 0.1,
    o:    Math.random() * 0.4 + 0.05,
    life: Math.random(),
  }))

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach(p => {
      p.x    += p.vx
      p.y    += p.vy
      p.life += 0.003

      if (p.y < 0 || p.life > 1) {
        p.x    = Math.random() * canvas.width
        p.y    = canvas.height + 4
        p.life = 0
      }

      const opacity = Math.sin(p.life * Math.PI) * p.o
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(232, 197, 71, ${opacity})`
      ctx.fill()
    })

    animFrame = requestAnimationFrame(draw)
  }
  draw()
}

onMounted(()  => initCanvas())
onUnmounted(() => cancelAnimationFrame(animFrame))
</script>

<style scoped>

/* ══════════════════════════════
   SECTION
══════════════════════════════ */
.cta-section {
  position: relative;
  padding: 0;
  overflow: hidden;
  background: #080808;
  min-height: 560px;
  display: flex;
  align-items: center;
}

/* ══════════════════════════════
   FONDS
══════════════════════════════ */
.bg-base {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse 80% 60% at 50% 50%, rgba(232,197,71,0.06) 0%, transparent 65%),
    radial-gradient(ellipse 40% 80% at 10% 50%, rgba(232,197,71,0.03) 0%, transparent 60%),
    radial-gradient(ellipse 40% 80% at 90% 50%, rgba(232,197,71,0.03) 0%, transparent 60%);
}

.bg-canvas {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  pointer-events: none;
}

.bg-vignette {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.7) 100%);
  pointer-events: none;
}

/* ══════════════════════════════
   LIGNES DIAGONALES
══════════════════════════════ */
.diag-lines {
  position: absolute; inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.diag {
  position: absolute;
  top: -100%;
  left: calc(var(--i) * 12.5% - 2%);
  width: 1px;
  height: 300%;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(232,197,71,0.04) 40%,
    rgba(232,197,71,0.04) 60%,
    transparent
  );
  transform: rotate(15deg);
  transform-origin: top center;
  animation: diagShift 20s linear infinite;
  animation-delay: calc(var(--i) * -2.5s);
}
@keyframes diagShift {
  from { transform: rotate(15deg) translateY(0); }
  to   { transform: rotate(15deg) translateY(30%); }
}

/* ══════════════════════════════
   CTA CONTAINER
══════════════════════════════ */
.cta-container {
  padding: 80px 0;
}

.cta-inner {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  padding: 64px 48px;
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.cta-inner.visible { opacity: 1; transform: translateY(0); }

/* Coins décoratifs */
.corner {
  position: absolute;
  width: 28px; height: 28px;
  border-color: rgba(232,197,71,0.25);
  border-style: solid;
  transition: border-color 0.4s ease;
}
.cta-inner:hover .corner { border-color: rgba(232,197,71,0.5); }
.c-tl { top:0; left:0;  border-width: 1px 0 0 1px; }
.c-tr { top:0; right:0; border-width: 1px 1px 0 0; }
.c-bl { bottom:0; left:0;  border-width: 0 0 1px 1px; }
.c-br { bottom:0; right:0; border-width: 0 1px 1px 0; }

/* ══════════════════════════════
   BADGE
══════════════════════════════ */
.cta-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid rgba(232,197,71,0.2);
  background: rgba(232,197,71,0.04);
  padding: 6px 16px;
  font-size: 9px;
  letter-spacing: 4px;
  color: rgba(255,255,255,0.4);
  margin-bottom: 32px;
}

.badge-pulse {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #4ade80;
  box-shadow: 0 0 8px rgba(74,222,128,0.8);
  animation: blink 2s infinite;
}
@keyframes blink {
  0%,100% { opacity:1; } 50% { opacity:0.2; }
}

/* ══════════════════════════════
   TITRE
══════════════════════════════ */
.cta-eyebrow {
  font-size: 10px;
  letter-spacing: 6px;
  color: rgba(255,255,255,0.2);
  margin-bottom: 12px;
}

.cta-title {
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 900;
  line-height: 1.0;
  letter-spacing: -3px;
  color: white;
  margin: 0 0 28px;
}

.word { display: block; }

.w1 {
  animation: wordSlide 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.3s both;
}
.w2 {
  animation: wordSlide 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.45s both;
}
.w3 {
  animation: wordSlide 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.6s both;
  font-weight: 200;
  color: rgba(255,255,255,0.25);
  font-size: 0.6em;
  letter-spacing: 8px;
}

@keyframes wordSlide {
  from { opacity:0; transform: translateY(20px); }
  to   { opacity:1; transform: translateY(0); }
}

.word-outline {
  color: transparent;
  -webkit-text-stroke: 1.5px #E8C547;
  letter-spacing: -2px;
}

/* ══════════════════════════════
   PERKS
══════════════════════════════ */
.cta-perks {
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 48px;
}

.perk {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: rgba(255,255,255,0.3);
  letter-spacing: 0.5px;
  transition: color 0.2s;
}
.perk:hover { color: rgba(255,255,255,0.6); }

/* ══════════════════════════════
   MEGA BOUTON
══════════════════════════════ */
.btn-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  margin-bottom: 48px;
}

.mega-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 20px;
  background: #E8C547;
  border: none;
  padding: 0 48px 0 36px;
  height: 72px;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.3s ease;
}

.mega-btn.hovered {
  transform: translateY(-3px);
  box-shadow:
    0 20px 60px rgba(232,197,71,0.3),
    0 8px 20px rgba(232,197,71,0.2);
}
.mega-btn.clicked {
  transform: translateY(0) scale(0.98);
}

/* Fond liquide animé dans le bouton */
.btn-liquid {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.liquid-blob {
  position: absolute;
  border-radius: 50%;
  background: rgba(255,255,255,0.15);
  animation: blobFloat ease-in-out infinite;
}
.b1 { width:120px; height:120px; top:-30px; left:-20px; animation-duration:6s; animation-delay:0s; }
.b2 { width:80px;  height:80px;  top:10px;  left:50%;   animation-duration:8s; animation-delay:-2s; }
.b3 { width:100px; height:100px; top:-20px; right:-20px; animation-duration:7s; animation-delay:-4s; }

@keyframes blobFloat {
  0%,100% { transform: translate(0,0) scale(1); }
  33%     { transform: translate(10px,-8px) scale(1.1); }
  66%     { transform: translate(-8px,6px) scale(0.9); }
}

.mega-btn:not(.hovered) .btn-liquid { opacity: 0; }
.mega-btn.hovered .btn-liquid { opacity: 1; transition: opacity 0.3s; }

/* Texte bouton */
.btn-text-wrap {
  position: relative;
  z-index: 1;
  text-align: left;
}

.btn-top-line {
  font-size: 13px;
  font-weight: 900;
  letter-spacing: 3px;
  color: #0D0D0D;
  line-height: 1;
  margin-bottom: 4px;
}

.btn-sub-line {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  color: rgba(0,0,0,0.45);
  letter-spacing: 0.5px;
}

/* Flèche */
.btn-arrow-wrap {
  position: relative;
  z-index: 1;
  width: 36px; height: 36px;
  border-radius: 50%;
  background: rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.3s ease, background 0.3s ease;
}
.mega-btn.hovered .btn-arrow-wrap {
  transform: translateX(4px);
  background: rgba(0,0,0,0.15);
}

.arrow-icon {
  color: #0D0D0D !important;
}

/* Glow externe */
.btn-outer-glow {
  position: absolute;
  inset: -2px;
  background: transparent;
  border: 1px solid rgba(232,197,71,0.4);
  opacity: 0;
  transform: scale(1.05);
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: none;
}
.mega-btn.hovered .btn-outer-glow {
  opacity: 1;
  transform: scale(1.02);
}

/* Caption */
.btn-caption {
  display: flex;
  align-items: center;
  font-size: 10px;
  color: rgba(255,255,255,0.2);
  letter-spacing: 0.5px;
}

/* ══════════════════════════════
   STATS
══════════════════════════════ */
.cta-stats {
  display: flex;
  justify-content: center;
  gap: 32px;
  flex-wrap: wrap;
}

.cstat {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
}

.cstat-val {
  font-weight: 800;
  color: #E8C547;
  letter-spacing: -0.5px;
}
.cstat-sep {
  color: rgba(255,255,255,0.1);
}
.cstat-label {
  color: rgba(255,255,255,0.25);
  letter-spacing: 1px;
}

/* ══════════════════════════════
   RESPONSIVE
══════════════════════════════ */
@media (max-width: 600px) {
  .cta-inner { padding: 48px 24px; }
  .cta-perks { gap: 14px; }
  .mega-btn  { height: 64px; padding: 0 32px 0 24px; }
  .btn-top-line { font-size: 11px; letter-spacing: 2px; }
}
</style>