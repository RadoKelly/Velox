<template>
  <footer class="footer" ref="footerRef">

    <!-- Canvas étoiles -->
    <canvas ref="canvasRef" class="footer-canvas"></canvas>

    <!-- Ligne top lumineuse -->
    <div class="top-beam"></div>

    <v-container class="footer-container">

      <!-- ══ BLOC PRINCIPAL ══ -->
      <div class="footer-main" :class="{ visible: inView }">

        <!-- Logo + tagline -->
        <div class="footer-brand">
          <div class="brand-logo">
            <span class="logo-vel">VEL</span><span class="logo-ox">OX</span>
          </div>
          <p class="brand-tagline">
            L'excellence automobile<br>à portée de main.
          </p>
          <!-- Réseaux -->
          <div class="social-row">
            <a
              v-for="s in socials"
              :key="s.icon"
              class="social-btn"
              :href="s.href"
              target="_blank"
            >
              <v-icon :icon="s.icon" size="15"></v-icon>
              <span class="social-tooltip">{{ s.label }}</span>
            </a>
          </div>
        </div>

        <!-- Liens nav -->
        <div
          v-for="group in linkGroups"
          :key="group.title"
          class="footer-group"
        >
          <div class="group-title">{{ group.title }}</div>
          <ul class="group-links">
            <li v-for="link in group.links" :key="link">
              <a class="footer-link" href="#">
                <span class="link-dot"></span>
                {{ link }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="footer-contact">
          <div class="group-title">CONTACT</div>
          <div class="contact-items">
            <a
              v-for="c in contacts"
              :key="c.label"
              class="contact-item"
              :href="c.href"
            >
              <div class="contact-icon">
                <v-icon :icon="c.icon" size="13" color="primary"></v-icon>
              </div>
              <div>
                <div class="contact-label">{{ c.label }}</div>
                <div class="contact-val">{{ c.value }}</div>
              </div>
            </a>
          </div>

          <!-- Badge dispo -->
          <div class="avail-badge">
            <span class="avail-dot"></span>
            <span>Disponible 7j/7 · 24h/24</span>
          </div>
        </div>

      </div>

      <!-- ══ SÉPARATEUR ANIMÉ ══ -->
      <div class="footer-sep" :class="{ visible: inView }">
        <div class="sep-line"></div>
        <div class="sep-diamond">
          <v-icon icon="mdi-car-sports" size="14" color="primary"></v-icon>
        </div>
        <div class="sep-line"></div>
      </div>

      <!-- ══ BOTTOM BAR ══ -->
      <div class="footer-bottom" :class="{ visible: inView }">

        <div class="bottom-copy">
          © 2026 VELOX
          <span class="copy-sep">·</span>
          TOUS DROITS RÉSERVÉS
        </div>

        <div class="bottom-center">
          <div class="ticker-wrap">
            <div class="ticker">
              <span v-for="t in tickerItems" :key="t" class="ticker-item">
                <v-icon icon="mdi-circle-small" size="10" color="primary"></v-icon>
                {{ t }}
              </span>
              <!-- Duplicate pour boucle infinie -->
              <span v-for="t in tickerItems" :key="'d'+t" class="ticker-item">
                <v-icon icon="mdi-circle-small" size="10" color="primary"></v-icon>
                {{ t }}
              </span>
            </div>
          </div>
        </div>

        <div class="bottom-right">
          <span
            v-for="tag in legalLinks"
            :key="tag"
            class="legal-link"
          >{{ tag }}</span>
        </div>

      </div>

    </v-container>

  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useIntersection } from '../composables/useIntersection'

// ── Intersection ──
const { targetRef: footerRef, inView } = useIntersection({ threshold: 0.05 })

// ── Données ──
const socials = [
  { icon: 'mdi-facebook',  label: 'Facebook',  href: '#' },
  { icon: 'mdi-instagram', label: 'Instagram', href: '#' },
  { icon: 'mdi-whatsapp',  label: 'WhatsApp',  href: '#' },
  { icon: 'mdi-linkedin',  label: 'LinkedIn',  href: '#' },
]

const linkGroups = [
  {
    title: 'SERVICES',
    links: ['Notre Flotte', 'Réservation', 'Livraison', 'Assurance', 'Chauffeur privé'],
  },
  {
    title: 'SOCIÉTÉ',
    links: ['À propos', 'Carrières', 'Partenaires', 'Presse', 'Contact'],
  },
]

const contacts = [
  { icon: 'mdi-phone',         label: 'TÉLÉPHONE', value: '+261 34 00 000 00', href: 'tel:+261340000000'       },
  { icon: 'mdi-email-outline', label: 'EMAIL',     value: 'contact@velox.mg',  href: 'mailto:contact@velox.mg' },
  { icon: 'mdi-map-marker',    label: 'ADRESSE',   value: 'Antananarivo, MG',  href: '#'                       },
]

const tickerItems = [
  'RÉSERVATION EXPRESS',
  'LIVRAISON À DOMICILE',
  'ASSURANCE INCLUSE',
  'SUPPORT 24/7',
  'FLOTTE PREMIUM',
  'SATISFACTION 99%',
]

const legalLinks = ['CGU', 'CONFIDENTIALITÉ', 'COOKIES']

// ── Canvas starfield ──
const canvasRef = ref(null)
let animFrame   = null

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

  const stars = Array.from({ length: 80 }, () => ({
    x:     Math.random() * canvas.width,
    y:     Math.random() * canvas.height,
    r:     Math.random() * 0.8 + 0.2,
    o:     Math.random() * 0.4 + 0.05,
    speed: Math.random() * 0.003 + 0.001,
    phase: Math.random() * Math.PI * 2,
  }))

  let t = 0
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    t += 0.01

    stars.forEach(s => {
      const opacity = s.o * (0.5 + 0.5 * Math.sin(t * s.speed * 100 + s.phase))
      ctx.beginPath()
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
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
   FOOTER BASE
══════════════════════════════ */
.footer {
  position: relative;
  background: #070707;
  overflow: hidden;
}

.footer-canvas {
  position: absolute;
  inset: 0;
  width: 100%; height: 100%;
  pointer-events: none;
  opacity: 0.6;
}

/* Beam lumineux top */
.top-beam {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(232,197,71,0.0) 15%,
    rgba(232,197,71,0.5) 50%,
    rgba(232,197,71,0.0) 85%,
    transparent 100%
  );
}

/* Glow sous le beam */
.footer::before {
  content: '';
  position: absolute;
  top: 0; left: 20%; right: 20%;
  height: 120px;
  background: radial-gradient(ellipse, rgba(232,197,71,0.04) 0%, transparent 70%);
  pointer-events: none;
}

.footer-container {
  position: relative;
  z-index: 2;
  padding-top: 72px;
  padding-bottom: 32px;
}

/* ══════════════════════════════
   MAIN GRID
══════════════════════════════ */
.footer-main {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 48px;
  margin-bottom: 56px;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.footer-main.visible { opacity: 1; transform: translateY(0); }

@media (max-width: 960px) {
  .footer-main { grid-template-columns: 1fr 1fr; gap: 36px; }
}
@media (max-width: 600px) {
  .footer-main { grid-template-columns: 1fr; gap: 32px; }
}

/* ── Brand ── */
.brand-logo {
  margin-bottom: 14px;
  line-height: 1;
}
.logo-vel {
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: 4px;
  color: #E8C547;
}
.logo-ox {
  font-size: 2rem;
  font-weight: 200;
  letter-spacing: 4px;
  color: rgba(255,255,255,0.4);
}

.brand-tagline {
  font-size: 12px;
  color: rgba(255,255,255,0.3);
  line-height: 1.9;
  margin: 0 0 24px;
}

/* Réseaux */
.social-row {
  display: flex;
  gap: 8px;
}

.social-btn {
  position: relative;
  width: 36px; height: 36px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,0.35);
  cursor: pointer;
  transition: all 0.25s ease;
  text-decoration: none;
}
.social-btn:hover {
  background: rgba(232,197,71,0.08);
  border-color: rgba(232,197,71,0.3);
  color: #E8C547;
  transform: translateY(-2px);
}

/* Tooltip */
.social-tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: #1a1a1a;
  border: 1px solid rgba(232,197,71,0.2);
  color: rgba(255,255,255,0.6);
  font-size: 9px;
  letter-spacing: 2px;
  padding: 4px 8px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}
.social-btn:hover .social-tooltip { opacity: 1; }

/* ── Nav groups ── */
.group-title {
  font-size: 9px;
  letter-spacing: 4px;
  color: rgba(255,255,255,0.2);
  margin-bottom: 20px;
  font-weight: 700;
}

.group-links {
  list-style: none;
  padding: 0; margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-link {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: rgba(255,255,255,0.3);
  text-decoration: none;
  letter-spacing: 0.5px;
  transition: color 0.2s ease, gap 0.2s ease;
}
.footer-link:hover {
  color: rgba(255,255,255,0.7);
  gap: 12px;
}

.link-dot {
  width: 3px; height: 3px;
  border-radius: 50%;
  background: rgba(232,197,71,0.4);
  flex-shrink: 0;
  transition: background 0.2s, transform 0.2s;
}
.footer-link:hover .link-dot {
  background: #E8C547;
  transform: scale(1.5);
}

/* ── Contact ── */
.contact-items {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 20px;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  text-decoration: none;
  transition: opacity 0.2s;
}
.contact-item:hover { opacity: 0.8; }

.contact-icon {
  width: 26px; height: 26px;
  background: rgba(232,197,71,0.06);
  border: 1px solid rgba(232,197,71,0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
}

.contact-label {
  font-size: 8px;
  letter-spacing: 3px;
  color: rgba(255,255,255,0.2);
  margin-bottom: 2px;
}
.contact-val {
  font-size: 11px;
  color: rgba(255,255,255,0.5);
  letter-spacing: 0.3px;
}

/* Badge dispo */
.avail-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: rgba(74,222,128,0.05);
  border: 1px solid rgba(74,222,128,0.15);
  padding: 6px 12px;
  font-size: 9px;
  letter-spacing: 2px;
  color: rgba(255,255,255,0.35);
}

.avail-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: #4ade80;
  box-shadow: 0 0 6px rgba(74,222,128,0.8);
  animation: blink 2s infinite;
}
@keyframes blink {
  0%,100% { opacity:1; } 50% { opacity:0.2; }
}

/* ══════════════════════════════
   SÉPARATEUR
══════════════════════════════ */
.footer-sep {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
  opacity: 0;
  transition: opacity 0.8s ease 0.3s;
}
.footer-sep.visible { opacity: 1; }

.sep-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06));
}
.sep-line:last-child {
  background: linear-gradient(90deg, rgba(255,255,255,0.06), transparent);
}

.sep-diamond {
  width: 32px; height: 32px;
  border: 1px solid rgba(232,197,71,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(45deg);
  flex-shrink: 0;
}
.sep-diamond .v-icon {
  transform: rotate(-45deg);
}

/* ══════════════════════════════
   BOTTOM BAR
══════════════════════════════ */
.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s;
}
.footer-bottom.visible { opacity: 1; transform: translateY(0); }

.bottom-copy {
  font-size: 9px;
  letter-spacing: 3px;
  color: rgba(255,255,255,0.15);
  flex-shrink: 0;
}
.copy-sep { margin: 0 8px; opacity: 0.4; }

/* ── Ticker ── */
.bottom-center { flex: 1; overflow: hidden; max-width: 340px; }

.ticker-wrap {
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, black 15%, black 85%, transparent);
}

.ticker {
  display: flex;
  width: max-content;
  animation: tickerScroll 20s linear infinite;
}
@keyframes tickerScroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.ticker-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 9px;
  letter-spacing: 2px;
  color: rgba(255,255,255,0.15);
  padding: 0 16px;
  white-space: nowrap;
}

/* ── Legal ── */
.bottom-right {
  display: flex;
  gap: 16px;
  flex-shrink: 0;
}

.legal-link {
  font-size: 9px;
  letter-spacing: 2px;
  color: rgba(255,255,255,0.15);
  cursor: pointer;
  transition: color 0.2s;
}
.legal-link:hover { color: rgba(255,255,255,0.5); }
</style>