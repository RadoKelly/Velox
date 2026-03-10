<template>

  <!-- ══ APP BAR ══ -->
  <v-app-bar :elevation="0" color="transparent" height="80" style="position:fixed;">
    <!-- Fond dynamique -->
    <div class="bar-bg" :class="{ scrolled }"></div>
    <!-- Beam bas -->
    <div class="bar-beam" :class="{ scrolled }"></div>

    <v-container class="bar-inner">

      <!-- ── LOGO ── -->
      <div class="nav-logo" @click="active = 'FLOTTE'">
        <span class="logo-vel">VEL</span><span class="logo-ox">OX</span>
        <div class="logo-line"></div>
      </div>

      <!-- ── LIENS desktop ── -->
      <nav class="nav-links d-none d-md-flex">
        <button v-for="link in links" :key="link.label" class="nav-item" :class="{ active: active === link.label }"
          @click="active = link.label">
          <span class="nav-label">{{ link.label }}</span>
          <span class="nav-bar"></span>
        </button>
      </nav>

      <!-- ── DROITE ── -->
      <div class="nav-right">

        <!-- Téléphone -->
        <div class="nav-phone d-none d-lg-flex">
          <div class="phone-icon">
            <v-icon icon="mdi-phone" size="12" color="primary"></v-icon>
          </div>
          <div class="phone-info">
            <span class="phone-label">APPELEZ-NOUS</span>
            <span class="phone-num">+261 34 00 000 00</span>
          </div>
        </div>

        <!-- Séparateur -->
        <div class="nav-sep d-none d-md-block"></div>

        <!-- Bouton panier -->
        <button class="cart-btn d-none d-md-flex" @click="cartDrawerRef.isOpen = true">
          <v-icon icon="mdi-shopping-outline" size="16"></v-icon>
          <span v-if="store.cartCount > 0" class="cart-count">
            {{ store.cartCount }}
          </span>
        </button>

        <!-- CartDrawer -->
        <CartDrawer ref="cartDrawerRef" />

        <!-- CTA -->
        <button class="nav-cta d-none d-md-flex" :class="{ hovered: ctaHover }" @mouseenter="ctaHover = true"
          @mouseleave="ctaHover = false">
          <span class="cta-bg"></span>
          <span class="cta-label">RÉSERVER</span>
          <span class="cta-arrow">
            <v-icon icon="mdi-arrow-right" size="13"></v-icon>
          </span>
        </button>

        <!-- Burger mobile -->
        <button class="burger d-flex d-md-none" :class="{ open: drawer }" @click="drawer = !drawer">
          <span class="bline b1"></span>
          <span class="bline b2"></span>
          <span class="bline b3"></span>
        </button>

      </div>
    </v-container>
  </v-app-bar>

  <!-- ══ DRAWER MOBILE ══ -->
  <Teleport to="body">
    <Transition name="drawer-fade">
      <div v-if="drawer" class="drawer-overlay" @click.self="drawer = false">

        <Transition name="drawer-slide">
          <div v-if="drawer" class="drawer-panel">

            <!-- Fond canvas drawer -->
            <canvas ref="drawerCanvas" class="drawer-canvas"></canvas>

            <!-- Top -->
            <div class="drawer-top">
              <div class="drawer-logo">
                <span class="logo-vel">VEL</span><span class="logo-ox">OX</span>
              </div>
              <button class="drawer-close" @click="drawer = false">
                <v-icon icon="mdi-close" size="18" color="white"></v-icon>
              </button>
            </div>

            <!-- Links -->
            <nav class="drawer-nav">
              <button v-for="(link, i) in links" :key="link.label" class="drawer-item"
                :class="{ active: active === link.label }" :style="{ animationDelay: `${i * 0.07}s` }"
                @click="active = link.label; drawer = false">
                <div class="di-icon">
                  <v-icon :icon="link.icon" size="15" color="primary"></v-icon>
                </div>
                <span class="di-label">{{ link.label }}</span>
                <v-icon icon="mdi-arrow-right" size="13" class="di-arrow"></v-icon>
              </button>
            </nav>

            <!-- Séparateur -->
            <div class="drawer-sep"></div>

            <!-- Contact -->
            <div class="drawer-contact">
              <div class="dc-icon">
                <v-icon icon="mdi-phone" size="13" color="primary"></v-icon>
              </div>
              <div>
                <div class="dc-label">TÉLÉPHONE</div>
                <div class="dc-val">+261 34 00 000 00</div>
              </div>
            </div>

            <!-- CTA drawer -->
            <button class="drawer-cta">
              DÉMARRER LA RÉSERVATION
              <v-icon icon="mdi-arrow-right" size="14" style="margin-left:8px;"></v-icon>
            </button>

            <!-- Badge dispo -->
            <div class="drawer-badge">
              <span class="db-dot"></span>
              Disponible maintenant
            </div>

          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>

</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useReservationStore } from '../stores/reservation'
import CartDrawer from './CartDrawer.vue'

const store         = useReservationStore()
const cartDrawerRef = ref(null)
const router        = useRouter()

// ... reste du code existant

const drawer = ref(false)
const scrolled = ref(false)
const active = ref('FLOTTE')
const ctaHover = ref(false)
const drawerCanvas = ref(null)

const links = [
  { label: 'FLOTTE', icon: 'mdi-car-multiple' },
  { label: 'SERVICES', icon: 'mdi-shield-check' },
  { label: 'À PROPOS', icon: 'mdi-information-outline' },
  { label: 'CONTACT', icon: 'mdi-phone-outline' },
]

// ── Scroll ──
function onScroll() { scrolled.value = window.scrollY > 50 }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

// ── Lock scroll quand drawer ouvert ──
watch(drawer, v => {
  document.body.style.overflow = v ? 'hidden' : ''
})

// ── Canvas drawer (particules) ──
let animFrame = null

watch(drawer, (v) => {
  if (!v) { cancelAnimationFrame(animFrame); return }
  setTimeout(() => {
    const canvas = drawerCanvas.value
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const pts = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 0.8 + 0.2,
      o: Math.random() * 0.3 + 0.05,
      speed: Math.random() * 0.002 + 0.001,
      phase: Math.random() * Math.PI * 2,
    }))

    let t = 0
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t += 0.01
      pts.forEach(p => {
        const op = p.o * (0.5 + 0.5 * Math.sin(t * p.speed * 80 + p.phase))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(232,197,71,${op})`
        ctx.fill()
      })
      animFrame = requestAnimationFrame(draw)
    }
    draw()
  }, 50)
})
onUnmounted(() => cancelAnimationFrame(animFrame))
</script>

<style scoped>
/* ══════════════════════════════
   APP BAR
══════════════════════════════ */
.bar-bg {
  position: absolute;
  inset: 0;
  background: transparent;
  backdrop-filter: blur(0px);
  transition: background 0.5s ease, backdrop-filter 0.5s ease;
}

.bar-bg.scrolled {
  background: rgba(7, 7, 7, 0.92);
  backdrop-filter: blur(16px);
}

.bar-beam {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: transparent;
  transition: background 0.5s ease;
}

.bar-beam.scrolled {
  background: linear-gradient(90deg,
      transparent 0%,
      rgba(232, 197, 71, 0.2) 30%,
      rgba(232, 197, 71, 0.4) 50%,
      rgba(232, 197, 71, 0.2) 70%,
      transparent 100%);
}

.bar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  position: relative;
  z-index: 1;
  padding: 0 16px;
}

/* ══════════════════════════════
   LOGO
══════════════════════════════ */
.nav-logo {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: baseline;
  gap: 0;
  padding-bottom: 4px;
}

.logo-vel {
  font-size: 1.55rem;
  font-weight: 900;
  letter-spacing: 4px;
  color: #E8C547;
  line-height: 1;
}

.logo-ox {
  font-size: 1.55rem;
  font-weight: 200;
  letter-spacing: 4px;
  color: rgba(255, 255, 255, 0.35);
  line-height: 1;
}

.logo-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background: linear-gradient(90deg, #E8C547, transparent);
  transition: width 0.4s ease;
}

.nav-logo:hover .logo-line {
  width: 100%;
}

/* ══════════════════════════════
   NAV LINKS
══════════════════════════════ */
.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
  height: 80px;
}

.nav-item {
  position: relative;
  background: none;
  border: none;
  height: 80px;
  padding: 0 18px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
  overflow: visible;
}

.nav-label {
  font-size: 10px;
  letter-spacing: 3px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.4);
  transition: color 0.25s ease;
  position: relative;
  z-index: 1;
}

.nav-item:hover .nav-label {
  color: rgba(255, 255, 255, 0.85);
}

.nav-item.active .nav-label {
  color: white;
}

/* Barre animée bas */
.nav-bar {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #E8C547, transparent);
  transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-item:hover .nav-bar,
.nav-item.active .nav-bar {
  width: 70%;
}

/* ══════════════════════════════
   DROITE
══════════════════════════════ */
.nav-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

/* Téléphone */
.nav-phone {
  display: flex;
  align-items: center;
  gap: 10px;
}

.phone-icon {
  width: 28px;
  height: 28px;
  border: 1px solid rgba(232, 197, 71, 0.15);
  background: rgba(232, 197, 71, 0.04);
  display: flex;
  align-items: center;
  justify-content: center;
}

.phone-info {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.phone-label {
  font-size: 7px;
  letter-spacing: 3px;
  color: rgba(255, 255, 255, 0.2);
}

.phone-num {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: 0.5px;
  font-weight: 500;
}

/* Séparateur vertical */
.nav-sep {
  width: 1px;
  height: 22px;
  background: rgba(255, 255, 255, 0.08);
}

/* ── CTA ── */
.nav-cta {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 40px;
  padding: 0 20px 0 22px;
  background: none;
  border: 1px solid rgba(232, 197, 71, 0.3);
  cursor: pointer;
  overflow: hidden;
  transition: border-color 0.3s ease, transform 0.2s ease;
}

.nav-cta:hover {
  border-color: rgba(232, 197, 71, 0.7);
  transform: translateY(-1px);
}

.cta-bg {
  position: absolute;
  inset: 0;
  background: #E8C547;
  transform: translateX(-101%);
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-cta.hovered .cta-bg {
  transform: translateX(0);
}

.cta-label {
  position: relative;
  z-index: 1;
  font-size: 10px;
  letter-spacing: 3px;
  font-weight: 800;
  color: #E8C547;
  transition: color 0.2s ease;
}

.nav-cta.hovered .cta-label {
  color: #0D0D0D;
}

.cta-arrow {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  color: #E8C547;
  transition: color 0.2s ease, transform 0.3s ease;
}

.nav-cta.hovered .cta-arrow {
  color: #0D0D0D;
  transform: translateX(3px);
}

/* ══════════════════════════════
   BURGER
══════════════════════════════ */
.burger {
  background: none;
  border: none;
  cursor: pointer;
  width: 36px;
  height: 36px;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 5px;
  padding: 0;
}

.bline {
  display: block;
  height: 1.5px;
  background: rgba(255, 255, 255, 0.6);
  transition: all 0.3s ease;
  border-radius: 2px;
}

.b1 {
  width: 24px;
}

.b2 {
  width: 16px;
}

.b3 {
  width: 20px;
}

.burger.open .b1 {
  transform: translateY(6.5px) rotate(45deg);
  width: 22px;
  background: #E8C547;
}

.burger.open .b2 {
  opacity: 0;
  transform: translateX(8px);
}

.burger.open .b3 {
  transform: translateY(-6.5px) rotate(-45deg);
  width: 22px;
  background: #E8C547;
}

/* ══════════════════════════════
   DRAWER OVERLAY
══════════════════════════════ */
.drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 9998;
}

/* ══════════════════════════════
   DRAWER PANEL
══════════════════════════════ */
.drawer-panel {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 300px;
  background: #080808;
  border-left: 1px solid rgba(232, 197, 71, 0.12);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  padding: 28px 28px 40px;
  overflow: hidden;
}

.drawer-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0.5;
}

/* Top drawer */
.drawer-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 48px;
  position: relative;
  z-index: 1;
}

.drawer-logo {
  display: flex;
  align-items: baseline;
}

.drawer-close {
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.drawer-close:hover {
  background: rgba(232, 197, 71, 0.08);
  border-color: rgba(232, 197, 71, 0.2);
}

/* Nav drawer */
.drawer-nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  position: relative;
  z-index: 1;
}

.drawer-item {
  display: flex;
  align-items: center;
  gap: 14px;
  height: 52px;
  padding: 0 12px;
  background: none;
  border: none;
  cursor: pointer;
  border-left: 2px solid transparent;
  transition: all 0.25s ease;
  animation: slideInRight 0.4s ease both;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.drawer-item:hover {
  background: rgba(255, 255, 255, 0.03);
  border-left-color: rgba(232, 197, 71, 0.3);
}

.drawer-item.active {
  background: rgba(232, 197, 71, 0.05);
  border-left-color: #E8C547;
}

.di-icon {
  width: 30px;
  height: 30px;
  background: rgba(232, 197, 71, 0.06);
  border: 1px solid rgba(232, 197, 71, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.2s;
}

.drawer-item.active .di-icon,
.drawer-item:hover .di-icon {
  background: rgba(232, 197, 71, 0.1);
  border-color: rgba(232, 197, 71, 0.25);
}

.di-label {
  flex: 1;
  font-size: 10px;
  letter-spacing: 3px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.4);
  text-align: left;
  transition: color 0.2s;
}

.drawer-item:hover .di-label {
  color: rgba(255, 255, 255, 0.8);
}

.drawer-item.active .di-label {
  color: white;
}

.di-arrow {
  color: rgba(255, 255, 255, 0.1) !important;
  transition: color 0.2s, transform 0.2s !important;
}

.drawer-item:hover .di-arrow {
  color: rgba(232, 197, 71, 0.5) !important;
  transform: translateX(3px);
}

/* Séparateur */
.drawer-sep {
  height: 1px;
  background: rgba(255, 255, 255, 0.05);
  margin: 20px 0;
  position: relative;
  z-index: 1;
}

/* Contact */
.drawer-contact {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
}

.dc-icon {
  width: 30px;
  height: 30px;
  background: rgba(232, 197, 71, 0.06);
  border: 1px solid rgba(232, 197, 71, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.dc-label {
  font-size: 8px;
  letter-spacing: 3px;
  color: rgba(255, 255, 255, 0.2);
  margin-bottom: 3px;
}

.dc-val {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.5px;
}

/* CTA drawer */
.drawer-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: #E8C547;
  border: none;
  color: #0D0D0D;
  font-size: 10px;
  letter-spacing: 3px;
  font-weight: 900;
  cursor: pointer;
  margin-bottom: 16px;
  position: relative;
  z-index: 1;
  transition: background 0.2s, transform 0.2s;
}

.drawer-cta:hover {
  background: #f0d060;
  transform: translateY(-1px);
}

/* Badge dispo */
.drawer-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 9px;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.2);
  justify-content: center;
  position: relative;
  z-index: 1;
}

.db-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #4ade80;
  box-shadow: 0 0 6px rgba(74, 222, 128, 0.7);
  animation: blink 2s infinite;
}

@keyframes blink {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.2;
  }
}

/* ══════════════════════════════
   TRANSITIONS DRAWER
══════════════════════════════ */
.drawer-fade-enter-active,
.drawer-fade-leave-active {
  transition: opacity 0.3s ease;
}

.drawer-fade-enter-from,
.drawer-fade-leave-to {
  opacity: 0;
}

.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.drawer-slide-enter-from,
.drawer-slide-leave-to {
  transform: translateX(100%);
}

/* Bouton panier */
.cart-btn {
  position: relative;
  width: 36px; height: 36px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  color: rgba(255,255,255,0.4);
  align-items: center; justify-content: center;
  cursor: pointer;
  transition: all 0.25s ease;
}
.cart-btn:hover {
  background: rgba(232,197,71,0.08);
  border-color: rgba(232,197,71,0.25);
  color: #E8C547;
}

.cart-count {
  position: absolute;
  top: -6px; right: -6px;
  width: 16px; height: 16px;
  background: #E8C547;
  border-radius: 50%;
  font-size: 9px; font-weight: 900;
  color: #0D0D0D;
  display: flex; align-items: center; justify-content: center;
  animation: popIn 0.3s cubic-bezier(0.34,1.56,0.64,1);
}
@keyframes popIn {
  from { transform: scale(0); }
  to   { transform: scale(1); }
}
</style>