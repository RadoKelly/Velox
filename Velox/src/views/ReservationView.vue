<template>
  <section class="resa-page">
    <v-container>

      <!-- Header -->
      <div class="resa-header">
        <div class="resa-eyebrow">ÉTAPE {{ step }} / 3</div>
        <h1 class="resa-title">{{ stepTitles[step - 1] }}</h1>

        <!-- Barre de progression -->
        <div class="steps-bar">
          <div class="steps-line">
            <div class="steps-fill" :style="{ width: `${((step-1)/2)*100}%` }"></div>
          </div>
          <div
            v-for="s in 3"
            :key="s"
            class="step-item"
            :class="{ done: step > s, active: step === s }"
          >
            <div class="step-circle">
              <v-icon v-if="step > s" icon="mdi-check" size="12"></v-icon>
              <span v-else>{{ s }}</span>
            </div>
            <div class="step-label">{{ stepLabels[s - 1] }}</div>
          </div>
        </div>
      </div>

      <!-- ── ÉTAPE 1 — Choisir voiture ── -->
      <Transition name="step" mode="out-in">
        <div v-if="step === 1" key="1" class="step-content">
          <div class="step-grid">
            <div
              v-for="car in cars"
              :key="car.name"
              class="mini-car-card"
              :class="{ selected: selected?.name === car.name }"
              @click="selected = car"
            >
              <div class="mcc-check" v-if="selected?.name === car.name">
                <v-icon icon="mdi-check-circle" size="16" color="primary"></v-icon>
              </div>
              <v-icon
                :icon="car.icon"
                :style="{ color: car.color }"
                style="font-size:52px;"
              ></v-icon>
              <div class="mcc-name">{{ car.name }}</div>
              <div class="mcc-cat">{{ car.category }}</div>
              <div class="mcc-price">{{ car.price }}€/j</div>
            </div>
          </div>
          <div class="step-actions">
            <button
              class="step-next"
              :class="{ ready: selected }"
              @click="selected && step++"
            >
              CONTINUER
              <v-icon icon="mdi-arrow-right" size="14" style="margin-left:8px;"></v-icon>
            </button>
          </div>
        </div>

        <!-- ── ÉTAPE 2 — Infos & dates ── -->
        <div v-else-if="step === 2" key="2" class="step-content">
          <div class="step-form">

            <div class="form-row">
              <div class="sff" :class="{ focused: focus.nom }">
                <label>NOM COMPLET</label>
                <input
                  v-model="form.nom"
                  placeholder="Jean Rakoto"
                  @focus="focus.nom = true"
                  @blur="focus.nom = false"
                />
              </div>
              <div class="sff" :class="{ focused: focus.tel }">
                <label>TÉLÉPHONE</label>
                <input
                  v-model="form.tel"
                  placeholder="+261 34 00 000 00"
                  @focus="focus.tel = true"
                  @blur="focus.tel = false"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="sff" :class="{ focused: focus.depart }">
                <label>DATE DE DÉPART</label>
                <input
                  v-model="form.depart"
                  type="date"
                  @focus="focus.depart = true"
                  @blur="focus.depart = false"
                />
              </div>
              <div class="sff" :class="{ focused: focus.retour }">
                <label>DATE DE RETOUR</label>
                <input
                  v-model="form.retour"
                  type="date"
                  @focus="focus.retour = true"
                  @blur="focus.retour = false"
                />
              </div>
            </div>

            <!-- Résumé dynamique -->
            <Transition name="fade">
              <div class="summary-box" v-if="duration > 0">
                <div class="sb-row">
                  <span>Véhicule</span>
                  <span>{{ selected?.name }}</span>
                </div>
                <div class="sb-row">
                  <span>Durée</span>
                  <span>{{ duration }} jour{{ duration > 1 ? 's' : '' }}</span>
                </div>
                <div class="sb-row total">
                  <span>TOTAL ESTIMÉ</span>
                  <span style="color:#E8C547;">
                    {{ duration * (selected?.price ?? 0) }}€
                  </span>
                </div>
              </div>
            </Transition>

          </div>

          <div class="step-actions">
            <button class="step-back" @click="step--">
              <v-icon icon="mdi-arrow-left" size="14" style="margin-right:6px;"></v-icon>
              RETOUR
            </button>
            <button
              class="step-next"
              :class="{ ready: stepTwoReady }"
              @click="stepTwoReady && step++"
            >
              CONTINUER
              <v-icon icon="mdi-arrow-right" size="14" style="margin-left:8px;"></v-icon>
            </button>
          </div>
        </div>

        <!-- ── ÉTAPE 3 — Confirmation ── -->
        <div v-else key="3" class="step-content">
          <div class="confirm-box">
            <div class="confirm-car">
              <v-icon
                :icon="selected?.icon"
                :style="{ color: selected?.color }"
                style="font-size:80px;"
              ></v-icon>
            </div>
            <div class="confirm-rows">
              <div class="cr" v-for="row in confirmRows" :key="row.label">
                <span class="cr-label">{{ row.label }}</span>
                <span class="cr-val" :style="row.gold ? { color: '#E8C547' } : {}">
                  {{ row.value }}
                </span>
              </div>
            </div>
          </div>

          <div class="step-actions">
            <button class="step-back" @click="step--">
              <v-icon icon="mdi-arrow-left" size="14" style="margin-right:6px;"></v-icon>
              RETOUR
            </button>
            <button
              class="step-next ready"
              :class="{ confirmed }"
              @click="handleConfirm"
            >
              <Transition name="swap" mode="out-in">
                <span v-if="!confirmed" key="a" style="display:flex;align-items:center;">
                  CONFIRMER
                  <v-icon icon="mdi-check" size="14" style="margin-left:8px;"></v-icon>
                </span>
                <span v-else key="b" style="display:flex;align-items:center;">
                  <v-icon icon="mdi-check-circle" size="14" style="margin-right:6px;"></v-icon>
                  CONFIRMÉ !
                </span>
              </Transition>
            </button>
          </div>
        </div>
      </Transition>

    </v-container>
  </section>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useReservationStore } from '../stores/reservation'

const store     = useReservationStore()
const step      = ref(1)
const selected  = ref(null)
const confirmed = ref(false)

const stepTitles = [
  'CHOISISSEZ VOTRE VÉHICULE',
  'VOS INFORMATIONS',
  'CONFIRMATION',
]
const stepLabels = ['VÉHICULE', 'INFOS', 'CONFIRMATION']

const cars = [
  { name: 'Tesla Model 3',     category: 'ÉLECTRIQUE', price: 89,  icon: 'mdi-car-electric',   color: '#E8C547' },
  { name: 'BMW Série 5',       category: 'BERLINE',    price: 120, icon: 'mdi-car',             color: '#A0C4FF' },
  { name: 'Range Rover',       category: 'SUV',        price: 180, icon: 'mdi-car-suv',         color: '#C8B8A2' },
  { name: 'Mercedes Classe S', category: 'LUXE',       price: 240, icon: 'mdi-car-convertible', color: '#d4af7a' },
  { name: 'Toyota RAV4',       category: 'SUV',        price: 95,  icon: 'mdi-car-suv',         color: '#88c999' },
  { name: 'Audi A6',           category: 'BERLINE',    price: 150, icon: 'mdi-car-sports',      color: '#b0b8d0' },
]

const form  = reactive({ nom: '', tel: '', depart: '', retour: '' })
const focus = reactive({ nom: false, tel: false, depart: false, retour: false })

const duration = computed(() => {
  if (!form.depart || !form.retour) return 0
  return Math.max(0, Math.round(
    (new Date(form.retour) - new Date(form.depart)) / 86400000
  ))
})

const stepTwoReady = computed(() =>
  form.nom.trim() !== '' &&
  form.tel.trim() !== '' &&
  form.depart     !== '' &&
  form.retour     !== '' &&
  duration.value   > 0
)

const confirmRows = computed(() => [
  { label: 'VÉHICULE',  value: selected.value?.name  ?? '',   gold: false },
  { label: 'CATÉGORIE', value: selected.value?.category ?? '', gold: false },
  { label: 'CLIENT',    value: form.nom,                       gold: false },
  { label: 'TÉLÉPHONE', value: form.tel,                       gold: false },
  { label: 'DÉPART',    value: form.depart,                    gold: false },
  { label: 'RETOUR',    value: form.retour,                    gold: false },
  { label: 'DURÉE',     value: `${duration.value} jour${duration.value > 1 ? 's' : ''}`, gold: false },
  { label: 'TOTAL',     value: `${duration.value * (selected.value?.price ?? 0)}€`,      gold: true  },
])

function handleConfirm() {
  store.addToCart({
    car:        selected.value,
    nom:        form.nom,
    tel:        form.tel,
    depart:     form.depart,
    retour:     form.retour,
    duration:   duration.value,
    totalPrice: duration.value * (selected.value?.price ?? 0),
  })
  confirmed.value = true
  setTimeout(() => {
    step.value      = 1
    selected.value  = null
    confirmed.value = false
    Object.assign(form, { nom:'', tel:'', depart:'', retour:'' })
  }, 2500)
}
</script>

<style scoped>
.resa-page {
  min-height: 100vh;
  background: #0D0D0D;
  padding: 120px 0 80px;
}
.resa-header { text-align: center; margin-bottom: 56px; }
.resa-eyebrow {
  font-size: 10px; letter-spacing: 5px;
  color: rgba(255,255,255,0.25); margin-bottom: 12px;
}
.resa-title {
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 900; letter-spacing: -2px;
  color: white; margin: 0 0 40px;
}

/* Steps */
.steps-bar {
  display: flex; align-items: center;
  justify-content: center;
  position: relative;
  max-width: 400px; margin: 0 auto;
  gap: 0;
}
.steps-line {
  position: absolute;
  top: 16px; left: 16%; right: 16%;
  height: 1px;
  background: rgba(255,255,255,0.07);
  z-index: 0;
}
.steps-fill {
  height: 100%;
  background: linear-gradient(90deg, #E8C547, rgba(232,197,71,0.4));
  transition: width 0.5s cubic-bezier(0.4,0,0.2,1);
}
.step-item {
  display: flex; flex-direction: column;
  align-items: center; gap: 8px;
  flex: 1; position: relative; z-index: 1;
}
.step-circle {
  width: 32px; height: 32px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.1);
  background: #0D0D0D;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 700;
  color: rgba(255,255,255,0.3);
  transition: all 0.3s ease;
}
.step-item.active .step-circle {
  border-color: #E8C547; color: #E8C547;
  box-shadow: 0 0 16px rgba(232,197,71,0.3);
}
.step-item.done .step-circle {
  background: #E8C547; border-color: #E8C547; color: #0D0D0D;
}
.step-label {
  font-size: 8px; letter-spacing: 2px;
  color: rgba(255,255,255,0.2);
}
.step-item.active .step-label { color: rgba(255,255,255,0.6); }

/* Step content */
.step-content { max-width: 680px; margin: 0 auto; }

/* Grid voitures */
.step-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: rgba(255,255,255,0.04);
  margin-bottom: 32px;
}
@media (max-width: 600px) { .step-grid { grid-template-columns: repeat(2,1fr); } }

.mini-car-card {
  background: #111; padding: 24px 16px;
  display: flex; flex-direction: column;
  align-items: center; gap: 8px;
  cursor: pointer; position: relative;
  border: 1px solid transparent;
  transition: all 0.2s;
}
.mini-car-card:hover { background: #141414; }
.mini-car-card.selected {
  background: rgba(232,197,71,0.05);
  border-color: rgba(232,197,71,0.3);
}
.mcc-check { position: absolute; top: 8px; right: 8px; }
.mcc-name  { font-size: 11px; font-weight: 700; color: white; text-align: center; }
.mcc-cat   { font-size: 9px; letter-spacing: 2px; color: rgba(255,255,255,0.25); }
.mcc-price { font-size: 13px; font-weight: 900; color: #E8C547; }

/* Form */
.step-form { margin-bottom: 24px; }
.form-row {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 12px; margin-bottom: 12px;
}
@media (max-width: 500px) { .form-row { grid-template-columns: 1fr; } }

.sff {
  padding: 14px 16px; background: #161616;
  border: 1px solid rgba(255,255,255,0.05);
  position: relative; transition: all 0.2s;
}
.sff.focused {
  background: rgba(232,197,71,0.02);
  border-color: rgba(232,197,71,0.2);
}
.sff::after {
  content: ''; position: absolute;
  bottom:0; left:0; right:0; height:1px;
  background: #E8C547; transform: scaleX(0);
  transition: transform 0.3s ease;
}
.sff.focused::after { transform: scaleX(1); }
.sff label {
  display: block; font-size: 8px; letter-spacing: 3px;
  color: rgba(255,255,255,0.2); margin-bottom: 6px;
}
.sff input {
  background: none; border: none; outline: none;
  color: white; font-size: 13px; width: 100%;
}
.sff input::placeholder { color: rgba(255,255,255,0.15); }
input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(0.3); opacity:0.5; cursor:pointer;
}

/* Summary */
.summary-box {
  background: rgba(232,197,71,0.04);
  border: 1px solid rgba(232,197,71,0.12);
  padding: 16px 20px; margin-top: 12px;
}
.sb-row {
  display: flex; justify-content: space-between;
  font-size: 12px; color: rgba(255,255,255,0.4);
  padding: 6px 0;
  border-bottom: 1px solid rgba(255,255,255,0.04);
}
.sb-row:last-child { border-bottom: none; }
.sb-row.total { color: white; font-weight: 700; padding-top: 12px; }

/* Confirm */
.confirm-box {
  display: flex; gap: 32px;
  background: #111;
  border: 1px solid rgba(255,255,255,0.05);
  padding: 32px; margin-bottom: 32px;
}
@media (max-width: 500px) { .confirm-box { flex-direction: column; align-items: center; } }
.confirm-car {
  width: 120px; height: 100px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.04);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.confirm-rows { flex: 1; }
.cr {
  display: flex; justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255,255,255,0.04);
}
.cr:last-child { border-bottom: none; }
.cr-label {
  font-size: 8px; letter-spacing: 3px;
  color: rgba(255,255,255,0.2);
}
.cr-val { font-size: 12px; color: rgba(255,255,255,0.6); font-weight: 600; }

/* Actions */
.step-actions {
  display: flex; gap: 12px; justify-content: flex-end;
}
.step-back {
  display: flex; align-items: center;
  background: none;
  border: 1px solid rgba(255,255,255,0.07);
  color: rgba(255,255,255,0.3);
  font-size: 10px; letter-spacing: 3px; font-weight: 600;
  height: 48px; padding: 0 20px; cursor: pointer;
  transition: all 0.2s;
}
.step-back:hover {
  border-color: rgba(255,255,255,0.15);
  color: rgba(255,255,255,0.6);
}
.step-next {
  display: flex; align-items: center;
  height: 48px; padding: 0 28px;
  background: rgba(232,197,71,0.08);
  border: 1px solid rgba(232,197,71,0.2);
  color: rgba(255,255,255,0.3);
  font-size: 10px; letter-spacing: 3px; font-weight: 800;
  cursor: not-allowed; transition: all 0.3s;
}
.step-next.ready {
  background: #E8C547; border-color: #E8C547;
  color: #0D0D0D; cursor: pointer;
}
.step-next.ready:hover {
  background: #f0d060;
  transform: translateY(-1px);
}
.step-next.confirmed {
  background: #4ade80; border-color: #4ade80;
}

/* Transitions Vue */
.step-enter-active, .step-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.step-enter-from { opacity:0; transform: translateX(30px);  }
.step-leave-to   { opacity:0; transform: translateX(-30px); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s, transform 0.3s; }
.fade-enter-from, .fade-leave-to { opacity:0; transform: translateY(-6px); }

.swap-enter-active, .swap-leave-active { transition: opacity 0.2s, transform 0.2s; }
.swap-enter-from { opacity:0; transform: translateY(6px);  }
.swap-leave-to   { opacity:0; transform: translateY(-6px); }
</style>
```

---

## Récap de la structure finale
```
src/
├── main.js
├── App.vue
├── router/
│   └── index.js          ← NOUVEAU
├── stores/
│   └── reservation.js    ← NOUVEAU
├── composables/
│   ├── useApp.js
│   ├── useIntersection.js ← NOUVEAU
│   └── useMouseParallax.js ← NOUVEAU
├── views/
│   ├── HomeView.vue       ← NOUVEAU
│   ├── FlotteView.vue     ← NOUVEAU
│   └── ReservationView.vue ← NOUVEAU
└── components/
    ├── NavBar.vue
    ├── HeroSection.vue
    ├── SearchBar.vue
    ├── FleetSection.vue
    ├── CarCard.vue
    ├── FeaturesSection.vue
    ├── TestimonialsSection.vue
    ├── CtaSection.vue
    ├── FooterSection.vue
    ├── ReservationModal.vue ← NOUVEAU
    └── CartDrawer.vue       ← NOUVEAU