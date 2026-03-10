<template>
  <section class="hero">

    <!-- ── Background ── -->
    <div class="bg-noise"></div>
    <div class="bg-grid"></div>
    <div class="bg-glow-left"></div>
    <div class="bg-glow-right"></div>

    <!-- ── Top line décorative ── -->
    <div class="top-line"></div>

    <v-container class="hero-container">
      <v-row align="center" style="min-height:100vh; padding: 100px 0 60px;">

        <!-- ════════════ LEFT ════════════ -->
        <v-col cols="12" md="6" class="left-col">

          <!-- Badge live -->
          <div class="live-badge" :class="{ visible: mounted }">
            <span class="live-dot"></span>
            <span>DISPONIBLE MAINTENANT</span>
            <span class="live-sep">|</span>
            <span style="color:#E8C547;">ANTANANARIVO</span>
          </div>

          <!-- Titre -->
          <div class="title-wrap" :class="{ visible: mounted }">
            <p class="eyebrow">LOCATION PREMIUM</p>
            <h1 class="hero-title">
              CONDUISEZ<br>
              <span class="title-gold">
                L'EXCELLENCE
                <svg class="underline-svg" viewBox="0 0 400 12" preserveAspectRatio="none">
                  <path d="M0,8 Q100,2 200,8 Q300,14 400,8" stroke="#E8C547" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                </svg>
              </span><br>
              <span class="title-thin">AU QUOTIDIEN</span>
            </h1>
          </div>

          <!-- Sous-titre -->
          <p class="hero-sub" :class="{ visible: mounted }">
            Des véhicules d'exception livrés où vous voulez.<br>
            Réservation en 2 minutes — 7j/7, 24h/24.
          </p>

          <!-- CTA -->
          <div class="cta-row" :class="{ visible: mounted }">
            <v-btn
              color="primary"
              rounded="0"
              variant="elevated"
              class="cta-main"
              @mouseenter="btnHover = true"
              @mouseleave="btnHover = false"
            >
              <span>VOIR LA FLOTTE</span>
              <span class="cta-arrow" :class="{ shift: btnHover }">
                <v-icon icon="mdi-arrow-right" size="16"></v-icon>
              </span>
            </v-btn>

            <button class="cta-ghost">
              <span class="play-ring">
                <v-icon icon="mdi-play" size="12" style="color:#E8C547;margin-left:1px;"></v-icon>
              </span>
              Comment ça marche
           </button>
          </div>

          <!-- Stats -->
          <div class="stats-row" :class="{ visible: mounted }">
            <div v-for="(s, i) in statsConfig" :key="i" class="stat">
              <span class="stat-val">
                {{ stats[i] }}{{ s.suffix }}
              </span>
              <span class="stat-lbl">{{ s.label }}</span>
            </div>
            <div class="stat-line"></div>
            <div class="stat-line"></div>
          </div>

        </v-col>

        <!-- ════════════ RIGHT ════════════ -->
        <v-col cols="12" md="6" class="d-none d-md-flex justify-center align-center">
          <div class="stage" :class="{ visible: mounted }">

            <!-- Cadre élégant -->
            <div class="frame-corner fc-tl"></div>
            <div class="frame-corner fc-tr"></div>
            <div class="frame-corner fc-bl"></div>
            <div class="frame-corner fc-br"></div>

            <!-- Anneaux -->
            <div class="ring r1"></div>
            <div class="ring r2"></div>

            <!-- Glow central -->
            <div class="center-glow"></div>

            <!-- Voiture -->
            <div class="car-wrap">
              <v-icon icon="mdi-car-sports" class="car-icon"></v-icon>
              <div class="car-shadow"></div>
            </div>

            <!-- Ligne de sol -->
            <div class="ground-line"></div>

            <!-- Badges flottants -->
            <div class="fbadge fb-1">
              <v-icon icon="mdi-shield-check" size="13" color="primary"></v-icon>
              <span>Assurance incluse</span>
            </div>
            <div class="fbadge fb-2">
              <v-icon icon="mdi-clock-fast" size="13" color="primary"></v-icon>
              <span>Livraison sous 2h</span>
            </div>
            <div class="fbadge fb-3">
              <v-icon icon="mdi-star" size="13" color="primary"></v-icon>
              <span>4.9 / 5 — 2 400 avis</span>
            </div>

            <!-- Tag prix -->
            <div class="price-tag">
              <span class="price-from">À PARTIR DE</span>
              <span class="price-val">89€</span>
              <span class="price-unit">/jour</span>
            </div>

          </div>
        </v-col>

      </v-row>
    </v-container>

    <!-- Scroll indicator -->
    <div class="scroll-hint" :class="{ visible: mounted }">
      <div class="scroll-track"><div class="scroll-thumb"></div></div>
      <span>DÉFILER</span>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const mounted = ref(false)
const btnHover = ref(false)

// ── Valeurs cibles ──
const statsConfig = [
  { target: 500, suffix: '+', label: 'Véhicules' },
  { target: 12,  suffix: 'K+', label: 'Clients'   },
  { target: 99,  suffix: '%',  label: 'Satisfaction' },
]

// ── Valeurs animées (affichées) ──
const stats = ref(statsConfig.map(() => 0))

function animateCounter(index, target, duration = 1800) {
  const startTime = performance.now()

  function tick(now) {
    const elapsed  = now - startTime
    const progress = Math.min(elapsed / duration, 1)

    // Easing : easeOutExpo — rapide au début, ralentit à la fin
    const eased = progress === 1
      ? 1
      : 1 - Math.pow(2, -10 * progress)

    stats.value[index] = Math.floor(eased * target)

    if (progress < 1) {
      requestAnimationFrame(tick)
    } else {
      stats.value[index] = target
    }
  }

  requestAnimationFrame(tick)
}

onMounted(() => {
  setTimeout(() => {
    mounted.value = true

    // Délai avant de lancer les compteurs (le temps que les stats soient visibles)
    setTimeout(() => {
      statsConfig.forEach((s, i) => {
        // Chaque compteur démarre avec un léger décalage
        setTimeout(() => {
          animateCounter(i, s.target, 1800)
        }, i * 150)
      })
    }, 700)

  }, 100)
})
</script>

<style scoped>

/* ══════════════════════════════
   BASE
══════════════════════════════ */
.hero {
  position: relative;
  min-height: 100vh;
  background: #0D0D0D;
  overflow: hidden;
}

/* ══════════════════════════════
   BACKGROUNDS
══════════════════════════════ */
.bg-noise {
  position: absolute; inset: 0;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 180px;
  pointer-events: none;
}

.bg-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
  background-size: 56px 56px;
  pointer-events: none;
  mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 0%, transparent 100%);
}

.bg-glow-left {
  position: absolute;
  left: -200px; top: 20%;
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(232,197,71,0.04) 0%, transparent 70%);
  pointer-events: none;
}

.bg-glow-right {
  position: absolute;
  right: -100px; top: 10%;
  width: 700px; height: 700px;
  background: radial-gradient(circle, rgba(232,197,71,0.06) 0%, transparent 65%);
  pointer-events: none;
}

.top-line {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(232,197,71,0.4) 50%, transparent 100%);
}

/* ══════════════════════════════
   HERO CONTAINER
══════════════════════════════ */
.hero-container { position: relative; z-index: 2; }

/* ══════════════════════════════
   LEFT COL — animations entrée
══════════════════════════════ */
.live-badge,
.title-wrap,
.hero-sub,
.cta-row,
.stats-row {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.live-badge.visible  { opacity:1; transform:translateY(0); transition-delay: 0.05s; }
.title-wrap.visible  { opacity:1; transform:translateY(0); transition-delay: 0.2s;  }
.hero-sub.visible    { opacity:1; transform:translateY(0); transition-delay: 0.35s; }
.cta-row.visible     { opacity:1; transform:translateY(0); transition-delay: 0.5s;  }
.stats-row.visible   { opacity:1; transform:translateY(0); transition-delay: 0.65s; }

/* ── Live badge ── */
.live-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid rgba(232,197,71,0.2);
  background: rgba(232,197,71,0.04);
  padding: 7px 16px;
  font-size: 10px;
  letter-spacing: 3px;
  color: rgba(255,255,255,0.5);
  margin-bottom: 28px;
}

.live-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #4ade80;
  box-shadow: 0 0 8px rgba(74,222,128,0.8);
  animation: blink 2s infinite;
}
@keyframes blink {
  0%,100% { opacity:1; } 50% { opacity:0.3; }
}

.live-sep { color: rgba(255,255,255,0.15); }

/* ── Eyebrow ── */
.eyebrow {
  font-size: 10px;
  letter-spacing: 6px;
  color: rgba(255,255,255,0.3);
  margin: 0 0 12px;
  text-transform: uppercase;
}

/* ── Title ── */
.hero-title {
  font-size: clamp(2.8rem, 5.5vw, 5rem);
  font-weight: 900;
  line-height: 1.0;
  letter-spacing: -2px;
  color: white;
  margin: 0;
}

.title-gold {
  color: #E8C547;
  position: relative;
  display: inline-block;
}

.underline-svg {
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 100%;
  height: 12px;
  overflow: visible;
}

.underline-svg path {
  stroke-dasharray: 420;
  stroke-dashoffset: 420;
  animation: drawLine 1.2s ease 0.8s forwards;
}
@keyframes drawLine {
  to { stroke-dashoffset: 0; }
}

.title-thin {
  font-weight: 200;
  font-size: 0.7em;
  color: rgba(255,255,255,0.3);
  letter-spacing: 6px;
}

/* ── Subtitle ── */
.hero-sub {
  color: rgba(255,255,255,0.4);
  font-size: 14px;
  line-height: 2;
  margin: 24px 0 0;
  max-width: 400px;
}

/* ── CTA ── */
.cta-row {
  display: flex;
  align-items: center;
  gap: 28px;
  margin-top: 40px;
  flex-wrap: wrap;
}

.cta-main {
  letter-spacing: 3px !important;
  font-size: 11px !important;
  font-weight: 800 !important;
  height: 52px !important;
  padding: 0 32px !important;
  display: flex !important;
  align-items: center !important;
  gap: 10px !important;
  transition: box-shadow 0.3s ease, transform 0.2s ease !important;
}
.cta-main:hover {
  box-shadow: 0 0 40px rgba(232,197,71,0.3) !important;
  transform: translateY(-2px);
}

.cta-arrow {
  display: inline-flex;
  transition: transform 0.25s ease;
}
.cta-arrow.shift { transform: translateX(5px); }

.cta-ghost {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: none;
  border: none;
  color: rgba(255,255,255,0.4);
  font-size: 12px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: color 0.2s;
  padding: 0;
}
.cta-ghost:hover { color: white; }

.play-ring {
  width: 32px; height: 32px;
  border-radius: 50%;
  border: 1px solid rgba(232,197,71,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s, background 0.2s;
}
.cta-ghost:hover .play-ring {
  border-color: rgba(232,197,71,0.7);
  background: rgba(232,197,71,0.06);
}

/* ── Stats ── */
.stats-row {
  display: flex;
  align-items: center;
  gap: 0;
  margin-top: 52px;
  border-top: 1px solid rgba(255,255,255,0.06);
  padding-top: 28px;
  position: relative;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
  padding: 0 24px;
}
.stat:first-child { padding-left: 0; }

.stat-val {
  font-size: 1.9rem;
  font-weight: 900;
  color: #E8C547;
  letter-spacing: -1px;
  line-height: 1;
}

.stat-lbl {
  font-size: 9px;
  letter-spacing: 3px;
  color: rgba(255,255,255,0.3);
  text-transform: uppercase;
}

.stat-line {
  position: absolute;
  top: 28px; bottom: 0;
  width: 1px;
  background: rgba(255,255,255,0.07);
}
.stat-line:nth-child(4) { left: calc(33.33%); }
.stat-line:nth-child(5) { left: calc(66.66%); }

/* ══════════════════════════════
   STAGE (right)
══════════════════════════════ */
.stage {
  position: relative;
  width: 440px; height: 440px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateX(30px);
  transition: opacity 0.9s ease 0.4s, transform 0.9s ease 0.4s;
}
.stage.visible { opacity:1; transform:translateX(0); }

/* Cadre coins élégants */
.frame-corner {
  position: absolute;
  width: 24px; height: 24px;
  border-color: rgba(232,197,71,0.4);
  border-style: solid;
}
.fc-tl { top:0; left:0;  border-width: 1px 0 0 1px; }
.fc-tr { top:0; right:0; border-width: 1px 1px 0 0; }
.fc-bl { bottom:0; left:0;  border-width: 0 0 1px 1px; }
.fc-br { bottom:0; right:0; border-width: 0 1px 1px 0; }

/* Anneaux rotatifs */
.ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(232,197,71,0.07);
}
.r1 { width:380px; height:380px; animation: spin 25s linear infinite; }
.r2 { width:280px; height:280px; animation: spin 18s linear infinite reverse; border-color: rgba(232,197,71,0.11); }

@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* Glow central */
.center-glow {
  position: absolute;
  width: 200px; height: 200px;
  background: radial-gradient(circle, rgba(232,197,71,0.12) 0%, transparent 70%);
  border-radius: 50%;
  animation: breathe 4s ease-in-out infinite;
}
@keyframes breathe {
  0%,100% { transform: scale(1);   opacity: 1; }
  50%      { transform: scale(1.3); opacity: 0.6; }
}

/* Voiture */
.car-wrap {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.car-icon {
  font-size: 200px !important;
  color: #E8C547 !important;
  filter: drop-shadow(0 4px 40px rgba(232,197,71,0.3));
  animation: float 5s ease-in-out infinite;
}
@keyframes float {
  0%,100% { transform: translateY(0); }
  50%      { transform: translateY(-14px); }
}

.car-shadow {
  width: 160px; height: 16px;
  background: radial-gradient(ellipse, rgba(232,197,71,0.25) 0%, transparent 70%);
  border-radius: 50%;
  margin-top: -8px;
  animation: shadowPulse 5s ease-in-out infinite;
}
@keyframes shadowPulse {
  0%,100% { transform: scaleX(1);   opacity:0.8; }
  50%      { transform: scaleX(0.6); opacity:0.3; }
}

/* Ligne de sol */
.ground-line {
  position: absolute;
  bottom: 64px;
  left: 40px; right: 40px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(232,197,71,0.2), transparent);
}

/* Badges flottants */
.fbadge {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 7px;
  background: rgba(13,13,13,0.85);
  border: 1px solid rgba(232,197,71,0.18);
  padding: 9px 14px;
  font-size: 11px;
  color: rgba(255,255,255,0.65);
  letter-spacing: 0.3px;
  backdrop-filter: blur(10px);
  white-space: nowrap;
  z-index: 4;
}

.fb-1 { top: 50px;  right: -10px; animation: fbFloat 5s ease-in-out infinite; }
.fb-2 { bottom: 90px; left: -10px; animation: fbFloat 5s ease-in-out infinite 1.8s; }
.fb-3 { top: 50%;  left: -30px; transform: translateY(-50%); animation: fbFloat 5s ease-in-out infinite 0.9s; }

@keyframes fbFloat {
  0%,100% { transform: translateY(0); }
  50%      { transform: translateY(-7px); }
}
.fb-3 {
  animation: fb3Float 5s ease-in-out infinite 0.9s;
}
@keyframes fb3Float {
  0%,100% { transform: translateY(-50%); }
  50%      { transform: translateY(calc(-50% - 7px)); }
}

/* Tag prix */
.price-tag {
  position: absolute;
  bottom: 30px;
  right: 0px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 4;
}
.price-from {
  font-size: 8px;
  letter-spacing: 3px;
  color: rgba(255,255,255,0.3);
}
.price-val {
  font-size: 2.4rem;
  font-weight: 900;
  color: #E8C547;
  letter-spacing: -2px;
  line-height: 1;
}
.price-unit {
  font-size: 10px;
  color: rgba(255,255,255,0.35);
  letter-spacing: 1px;
}

/* ══════════════════════════════
   SCROLL HINT
══════════════════════════════ */
.scroll-hint {
  position: absolute;
  bottom: 28px; left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 2;
  opacity: 0;
  transition: opacity 0.8s ease 1.2s;
}
.scroll-hint.visible { opacity: 1; }

.scroll-hint span {
  font-size: 8px;
  letter-spacing: 5px;
  color: rgba(255,255,255,0.15);
}

.scroll-track {
  width: 1px; height: 48px;
  background: rgba(255,255,255,0.08);
  position: relative;
  overflow: hidden;
}

.scroll-thumb {
  position: absolute;
  top: 0; left: 0;
  width: 1px; height: 50%;
  background: linear-gradient(to bottom, rgba(232,197,71,0.8), transparent);
  animation: scrollAnim 2s ease-in-out infinite;
}
@keyframes scrollAnim {
  0%   { top: -50%; }
  100% { top: 130%; }
}

</style>