<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="reservationOpen" class="modal-overlay" @click.self="store.closeModal()">
        <div class="modal-panel">

          <div class="corner c-tl"></div>
          <div class="corner c-tr"></div>
          <div class="corner c-bl"></div>
          <div class="corner c-br"></div>

          <!-- Header -->
          <div class="modal-header">
            <div>
              <div class="modal-eyebrow">RÉSERVATION</div>
              <div class="modal-title">{{ selectedCar?.name }}</div>
            </div>
            <button class="modal-close" @click="store.closeModal()">
              <v-icon icon="mdi-close" size="16"></v-icon>
            </button>
          </div>

          <!-- Résumé voiture -->
          <div class="modal-car" v-if="selectedCar">
            <div class="modal-car-icon">
              <v-icon
                :icon="selectedCar.icon"
                :style="{ color: selectedCar.color }"
                style="font-size:64px;"
              ></v-icon>
            </div>
            <div class="modal-car-info">
              <div class="mci-category">{{ selectedCar.category }}</div>
              <div class="mci-name">{{ selectedCar.name }}</div>
              <div class="mci-price">
                <span style="font-size:1.4rem; font-weight:900; color:#E8C547;">
                  {{ selectedCar.price }}€
                </span>
                <span style="font-size:11px; color:rgba(255,255,255,0.3);">/jour</span>
              </div>
            </div>
          </div>

          <div class="modal-sep"></div>

          <!-- Formulaire -->
          <div class="modal-form">
            <div class="form-row">
              <div class="form-field" :class="{ focused: focus.nom }">
                <label class="field-label">NOM COMPLET</label>
                <input
                  v-model="form.nom"
                  class="field-input"
                  placeholder="Ex : Jean Rakoto"
                  @focus="focus.nom = true"
                  @blur="focus.nom = false"
                />
              </div>
              <div class="form-field" :class="{ focused: focus.tel }">
                <label class="field-label">TÉLÉPHONE</label>
                <input
                  v-model="form.tel"
                  class="field-input"
                  placeholder="+261 34 00 000 00"
                  @focus="focus.tel = true"
                  @blur="focus.tel = false"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-field" :class="{ focused: focus.depart }">
                <label class="field-label">DATE DE DÉPART</label>
                <input
                  v-model="form.depart"
                  class="field-input"
                  type="date"
                  @focus="focus.depart = true"
                  @blur="focus.depart = false"
                />
              </div>
              <div class="form-field" :class="{ focused: focus.retour }">
                <label class="field-label">DATE DE RETOUR</label>
                <input
                  v-model="form.retour"
                  class="field-input"
                  type="date"
                  @focus="focus.retour = true"
                  @blur="focus.retour = false"
                />
              </div>
            </div>

            <!-- Durée calculée -->
            <Transition name="fade">
              <div class="duration-display" v-if="duration > 0">
                <v-icon icon="mdi-calendar-range" size="14" color="primary"></v-icon>
                <span>{{ duration }} jour{{ duration > 1 ? 's' : '' }} de location</span>
                <span class="duration-price">
                  = {{ duration * (selectedCar?.price ?? 0) }}€ total
                </span>
              </div>
            </Transition>

            <!-- Barre progression -->
            <div class="form-progress">
              <div class="form-progress-fill" :style="{ width: progressWidth }"></div>
            </div>
          </div>

          <!-- CTA -->
          <button
            class="modal-cta"
            :class="{ ready: isReady }"
            :disabled="!isReady"
            @click="handleSubmit"
          >
            <Transition name="swap" mode="out-in">
              <span v-if="!submitted" key="a" class="cta-inner">
                CONFIRMER LA RÉSERVATION
                <v-icon icon="mdi-arrow-right" size="14" style="margin-left:8px;"></v-icon>
              </span>
              <span v-else key="b" class="cta-inner">
                <v-icon icon="mdi-check-circle" size="16" style="margin-right:8px;"></v-icon>
                RÉSERVATION CONFIRMÉE !
              </span>
            </Transition>
          </button>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useReservationStore } from '../stores/reservation'

// ── Pinia ──
const store = useReservationStore()

// Raccourcis lisibles
const selectedCar     = computed(() => store.selectedCar)
const reservationOpen = computed(() => store.isOpen)

const submitted = ref(false)
const form      = reactive({ nom: '', tel: '', depart: '', retour: '' })
const focus     = reactive({ nom: false, tel: false, depart: false, retour: false })

// Reset à chaque ouverture
watch(() => store.isOpen, v => {
  if (v) {
    submitted.value = false
    Object.assign(form, { nom: '', tel: '', depart: '', retour: '' })
  }
})

const duration = computed(() => {
  if (!form.depart || !form.retour) return 0
  const diff = new Date(form.retour) - new Date(form.depart)
  return Math.max(0, Math.round(diff / 86400000))
})

const isReady = computed(() =>
  form.nom.trim() !== '' &&
  form.tel.trim() !== '' &&
  form.depart     !== '' &&
  form.retour     !== '' &&
  duration.value   > 0
)

const progressWidth = computed(() => {
  const filled = [form.nom, form.tel, form.depart, form.retour]
    .filter(f => f !== '').length
  return `${(filled / 4) * 100}%`
})

function handleSubmit() {
  if (!isReady.value) return

  // ── Ajouter au panier Pinia ──
  store.addToCart({
    car:        selectedCar.value,
    nom:        form.nom,
    tel:        form.tel,
    depart:     form.depart,
    retour:     form.retour,
    duration:   duration.value,
    totalPrice: duration.value * (selectedCar.value?.price ?? 0),
  })

  submitted.value = true
  setTimeout(() => store.closeModal(), 2200)
}
</script>

<style scoped>
.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.8);
  backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-panel {
  background: #0f0f0f;
  border: 1px solid rgba(255,255,255,0.06);
  width: 100%;
  max-width: 580px;
  padding: 40px;
  position: relative;
}

.corner {
  position: absolute;
  width: 20px; height: 20px;
  border-color: rgba(232,197,71,0.3);
  border-style: solid;
}
.c-tl { top:0; left:0;   border-width: 1px 0 0 1px; }
.c-tr { top:0; right:0;  border-width: 1px 1px 0 0; }
.c-bl { bottom:0; left:0;  border-width: 0 0 1px 1px; }
.c-br { bottom:0; right:0; border-width: 0 1px 1px 0; }

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 28px;
}
.modal-eyebrow {
  font-size: 9px; letter-spacing: 4px;
  color: rgba(255,255,255,0.25); margin-bottom: 6px;
}
.modal-title {
  font-size: 1.4rem; font-weight: 900;
  color: white; letter-spacing: -0.5px;
}
.modal-close {
  width: 32px; height: 32px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.07);
  color: rgba(255,255,255,0.4);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all 0.2s;
}
.modal-close:hover {
  background: rgba(232,197,71,0.08);
  border-color: rgba(232,197,71,0.25);
  color: #E8C547;
}

.modal-car {
  display: flex; align-items: center;
  gap: 20px; margin-bottom: 24px;
}
.modal-car-icon {
  width: 90px; height: 70px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.05);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.mci-category {
  font-size: 8px; letter-spacing: 3px;
  color: rgba(255,255,255,0.25); margin-bottom: 4px;
}
.mci-name {
  font-size: 1rem; font-weight: 800;
  color: white; margin-bottom: 6px;
}

.modal-sep {
  height: 1px;
  background: rgba(255,255,255,0.05);
  margin-bottom: 24px;
}

.modal-form { margin-bottom: 24px; }

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px; margin-bottom: 12px;
}
@media (max-width: 500px) { .form-row { grid-template-columns: 1fr; } }

.form-field {
  padding: 14px 16px;
  background: #161616;
  border: 1px solid rgba(255,255,255,0.05);
  position: relative;
  transition: background 0.2s, border-color 0.2s;
}
.form-field.focused {
  background: rgba(232,197,71,0.02);
  border-color: rgba(232,197,71,0.2);
}
.form-field::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0; height: 1px;
  background: #E8C547;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}
.form-field.focused::after { transform: scaleX(1); }

.field-label {
  display: block;
  font-size: 8px; letter-spacing: 3px;
  color: rgba(255,255,255,0.2); margin-bottom: 6px;
}
.field-input {
  background: none; border: none; outline: none;
  color: white; font-size: 13px; font-weight: 500; width: 100%;
}
.field-input::placeholder { color: rgba(255,255,255,0.15); }
input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(0.3); opacity: 0.5; cursor: pointer;
}

.duration-display {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 14px;
  background: rgba(232,197,71,0.05);
  border: 1px solid rgba(232,197,71,0.15);
  font-size: 11px; color: rgba(255,255,255,0.5);
  margin-bottom: 14px; letter-spacing: 0.5px;
}
.duration-price {
  margin-left: auto;
  font-weight: 800; color: #E8C547; font-size: 13px;
}

.form-progress {
  height: 1px;
  background: rgba(255,255,255,0.04); overflow: hidden;
}
.form-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, rgba(232,197,71,0.4), #E8C547);
  transition: width 0.4s cubic-bezier(0.4,0,0.2,1);
}

.modal-cta {
  width: 100%; height: 54px;
  background: rgba(232,197,71,0.08);
  border: 1px solid rgba(232,197,71,0.2);
  color: rgba(255,255,255,0.3);
  font-size: 10px; letter-spacing: 3px; font-weight: 800;
  cursor: not-allowed;
  transition: all 0.3s ease;
}
.modal-cta.ready {
  background: #E8C547;
  border-color: #E8C547;
  color: #0D0D0D;
  cursor: pointer;
}
.modal-cta.ready:hover {
  background: #f0d060;
  transform: translateY(-1px);
  box-shadow: 0 8px 30px rgba(232,197,71,0.25);
}
.cta-inner {
  display: flex; align-items: center; justify-content: center;
}

/* Transitions */
.modal-enter-active, .modal-leave-active { transition: opacity 0.3s ease; }
.modal-enter-from,  .modal-leave-to      { opacity: 0; }
.modal-enter-active .modal-panel { transition: transform 0.4s cubic-bezier(0.4,0,0.2,1); }
.modal-enter-from   .modal-panel { transform: translateY(30px) scale(0.97); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s, transform 0.3s; }
.fade-enter-from,   .fade-leave-to     { opacity: 0; transform: translateY(-6px); }

.swap-enter-active, .swap-leave-active { transition: opacity 0.2s, transform 0.2s; }
.swap-enter-from { opacity: 0; transform: translateY(8px);  }
.swap-leave-to   { opacity: 0; transform: translateY(-8px); }
</style>