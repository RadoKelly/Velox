<template>
  <section class="search-section">

    <!-- Ligne décorative top -->
    <div class="deco-line"></div>

    <v-container class="search-container">

      <!-- Label section -->
      <div class="search-label" :class="{ visible: mounted }">
        <span class="label-dash"></span>
        TROUVEZ VOTRE VÉHICULE
        <span class="label-dash"></span>
      </div>

      <!-- Card principale -->
      <div class="search-card" :class="{ visible: mounted }">

        <!-- Champs -->
        <div class="fields-wrap">

          <!-- Lieu -->
          <div
            class="field-item"
            :class="{ focused: focus.lieu }"
            style="transition-delay: 0.1s"
          >
            <div class="field-icon">
              <v-icon icon="mdi-map-marker" size="16" color="primary"></v-icon>
            </div>
            <div class="field-body">
              <label class="field-label">LIEU DE PRISE EN CHARGE</label>
              <input
                v-model="form.lieu"
                class="field-input"
                placeholder="Ex : Aéroport Ivato, Tana..."
                @focus="focus.lieu = true"
                @blur="focus.lieu = false"
              />
            </div>
            <!-- Suggestions -->
            <div class="suggestions" v-if="focus.lieu && suggestions.length">
              <div
                v-for="s in suggestions"
                :key="s"
                class="suggestion-item"
                @mousedown.prevent="form.lieu = s; focus.lieu = false"
              >
                <v-icon icon="mdi-map-marker-outline" size="13" style="margin-right:8px; opacity:0.4;"></v-icon>
                {{ s }}
              </div>
            </div>
          </div>

          <div class="field-sep"></div>

          <!-- Date départ -->
          <div
            class="field-item"
            :class="{ focused: focus.depart }"
            style="transition-delay: 0.2s"
          >
            <div class="field-icon">
              <v-icon icon="mdi-calendar-arrow-right" size="16" color="primary"></v-icon>
            </div>
            <div class="field-body">
              <label class="field-label">DATE DE DÉPART</label>
              <input
                v-model="form.depart"
                class="field-input"
                type="date"
                @focus="focus.depart = true"
                @blur="focus.depart = false"
              />
            </div>
          </div>

          <div class="field-sep"></div>

          <!-- Date retour -->
          <div
            class="field-item"
            :class="{ focused: focus.retour }"
            style="transition-delay: 0.3s"
          >
            <div class="field-icon">
              <v-icon icon="mdi-calendar-check" size="16" color="primary"></v-icon>
            </div>
            <div class="field-body">
              <label class="field-label">DATE DE RETOUR</label>
              <input
                v-model="form.retour"
                class="field-input"
                type="date"
                @focus="focus.retour = true"
                @blur="focus.retour = false"
              />
            </div>
            <!-- Durée calculée -->
            <div class="duration-badge" v-if="duration > 0">
              {{ duration }} jour{{ duration > 1 ? 's' : '' }}
            </div>
          </div>

          <div class="field-sep d-none d-md-block"></div>

          <!-- Bouton -->
          <div class="field-item btn-item" style="transition-delay: 0.4s">
            <button
              class="search-btn"
              :class="{ ready: isReady }"
              @click="handleSearch"
              @mouseenter="btnHover = true"
              @mouseleave="btnHover = false"
            >
              <span class="btn-content" v-if="!searching">
                <v-icon icon="mdi-magnify" size="18"></v-icon>
                <span>RECHERCHER</span>
              </span>
              <span class="btn-content" v-else>
                <span class="spinner"></span>
                <span>RECHERCHE...</span>
              </span>
              <span class="btn-glow" :class="{ active: btnHover && isReady }"></span>
            </button>
          </div>

        </div>

        <!-- Progress bar sous la card quand ready -->
        <div class="readiness-bar">
          <div class="readiness-fill" :style="{ width: readinessWidth }"></div>
        </div>

      </div>

      <!-- Tags rapides -->
      <div class="quick-tags" :class="{ visible: mounted }">
        <span class="tags-label">Populaires :</span>
        <button
          v-for="tag in quickTags"
          :key="tag"
          class="qtag"
          @click="form.lieu = tag"
          :class="{ active: form.lieu === tag }"
        >
          {{ tag }}
        </button>
      </div>

    </v-container>

    <div class="deco-line"></div>
  </section>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

const mounted   = ref(false)
const btnHover  = ref(false)
const searching = ref(false)

const form = reactive({ lieu: '', depart: '', retour: '' })
const focus = reactive({ lieu: false, depart: false, retour: false })

const suggestions = [
  'Aéroport Ivato, Antananarivo',
  'Analakely, Antananarivo',
  'Antsirabe',
  'Toamasina',
  'Nosy Be',
]

const quickTags = [
  'Aéroport Ivato',
  'Analakely',
  'Antsirabe',
  'Toamasina',
]

// Durée en jours
const duration = computed(() => {
  if (!form.depart || !form.retour) return 0
  const diff = new Date(form.retour) - new Date(form.depart)
  return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)))
})

// Formulaire complet ?
const isReady = computed(() =>
  form.lieu.trim() !== '' && form.depart !== '' && form.retour !== '' && duration.value > 0
)

// Barre de progression (1 champ = 33%)
const readinessWidth = computed(() => {
  let count = 0
  if (form.lieu.trim())  count++
  if (form.depart)       count++
  if (form.retour && duration.value > 0) count++
  return `${Math.round((count / 3) * 100)}%`
})

function handleSearch() {
  if (!isReady.value) return
  searching.value = true
  setTimeout(() => { searching.value = false }, 2000)
}

onMounted(() => setTimeout(() => { mounted.value = true }, 100))
</script>

<style scoped>

/* ══════════════════════════════
   SECTION
══════════════════════════════ */
.search-section {
  background: #0f0f0f;
  padding: 48px 0;
  position: relative;
}

.deco-line {
  height: 1px;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(232,197,71,0.15) 30%,
    rgba(232,197,71,0.3) 50%,
    rgba(232,197,71,0.15) 70%,
    transparent 100%
  );
}

/* ══════════════════════════════
   LABEL
══════════════════════════════ */
.search-label {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  font-size: 10px;
  letter-spacing: 5px;
  color: rgba(255,255,255,0.2);
  margin-bottom: 24px;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.search-label.visible { opacity: 1; transform: translateY(0); }

.label-dash {
  flex: 1;
  max-width: 80px;
  height: 1px;
  background: rgba(255,255,255,0.08);
}

/* ══════════════════════════════
   CARD
══════════════════════════════ */
.search-card {
  background: #161616;
  border: 1px solid rgba(255,255,255,0.06);
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s;
}
.search-card.visible { opacity: 1; transform: translateY(0); }

/* ══════════════════════════════
   FIELDS
══════════════════════════════ */
.fields-wrap {
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
}

.field-sep {
  width: 1px;
  background: rgba(255,255,255,0.05);
  align-self: stretch;
  margin: 16px 0;
}

.field-item {
  flex: 1;
  min-width: 200px;
  padding: 22px 24px;
  position: relative;
  transition: background 0.25s ease;
  cursor: text;
}
.field-item:hover,
.field-item.focused {
  background: rgba(232,197,71,0.03);
}

/* Barre de focus en bas du champ */
.field-item::after {
  content: '';
  position: absolute;
  bottom: 0; left: 24px; right: 24px;
  height: 1px;
  background: #E8C547;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}
.field-item.focused::after {
  transform: scaleX(1);
}

.field-icon {
  margin-bottom: 8px;
  opacity: 0.7;
}

.field-label {
  display: block;
  font-size: 9px;
  letter-spacing: 3px;
  color: rgba(255,255,255,0.3);
  margin-bottom: 6px;
  cursor: default;
}

.field-input {
  background: none;
  border: none;
  outline: none;
  color: white;
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  letter-spacing: 0.3px;
}
.field-input::placeholder { color: rgba(255,255,255,0.18); }

/* Date input — masquer l'icône native */
input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(0.3);
  cursor: pointer;
  opacity: 0.4;
}
input[type="date"]::-webkit-calendar-picker-indicator:hover {
  opacity: 0.8;
}

/* Badge durée */
.duration-badge {
  position: absolute;
  top: 18px; right: 18px;
  background: rgba(232,197,71,0.12);
  border: 1px solid rgba(232,197,71,0.25);
  color: #E8C547;
  font-size: 10px;
  letter-spacing: 2px;
  padding: 3px 10px;
  font-weight: 700;
  animation: fadeIn 0.3s ease;
}
@keyframes fadeIn {
  from { opacity:0; transform:scale(0.9); }
  to   { opacity:1; transform:scale(1); }
}

/* Suggestions dropdown */
.suggestions {
  position: absolute;
  top: 100%; left: 0; right: 0;
  background: #1a1a1a;
  border: 1px solid rgba(232,197,71,0.15);
  border-top: none;
  z-index: 10;
  overflow: hidden;
  animation: slideDown 0.2s ease;
}
@keyframes slideDown {
  from { opacity:0; transform:translateY(-8px); }
  to   { opacity:1; transform:translateY(0); }
}

.suggestion-item {
  display: flex;
  align-items: center;
  padding: 11px 20px;
  font-size: 12px;
  color: rgba(255,255,255,0.55);
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  letter-spacing: 0.3px;
}
.suggestion-item:hover {
  background: rgba(232,197,71,0.05);
  color: white;
}

/* ══════════════════════════════
   BOUTON RECHERCHER
══════════════════════════════ */
.btn-item {
  flex: 0 0 auto;
  min-width: 180px;
  display: flex;
  align-items: center;
  padding: 16px 20px;
  cursor: default;
}

.search-btn {
  position: relative;
  width: 100%;
  height: 52px;
  background: rgba(232,197,71,0.08);
  border: 1px solid rgba(232,197,71,0.2);
  color: rgba(255,255,255,0.3);
  font-size: 11px;
  letter-spacing: 3px;
  font-weight: 700;
  cursor: not-allowed;
  transition: all 0.3s ease;
  overflow: hidden;
}

.search-btn.ready {
  background: #E8C547;
  border-color: #E8C547;
  color: #0D0D0D;
  cursor: pointer;
}
.search-btn.ready:hover {
  background: #f0d060;
  transform: translateY(-1px);
}
.search-btn.ready:active {
  transform: translateY(0);
}

.btn-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15), transparent 70%);
  opacity: 0;
  transition: opacity 0.3s;
}
.btn-glow.active { opacity: 1; }

/* Spinner */
.spinner {
  width: 14px; height: 14px;
  border: 2px solid rgba(13,13,13,0.3);
  border-top-color: #0D0D0D;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  display: inline-block;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ══════════════════════════════
   READINESS BAR
══════════════════════════════ */
.readiness-bar {
  height: 2px;
  background: rgba(255,255,255,0.04);
  overflow: hidden;
}

.readiness-fill {
  height: 100%;
  background: linear-gradient(90deg, rgba(232,197,71,0.4), #E8C547);
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ══════════════════════════════
   QUICK TAGS
══════════════════════════════ */
.quick-tags {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 18px;
  flex-wrap: wrap;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.5s ease 0.4s, transform 0.5s ease 0.4s;
}
.quick-tags.visible { opacity: 1; transform: translateY(0); }

.tags-label {
  font-size: 10px;
  letter-spacing: 2px;
  color: rgba(255,255,255,0.2);
}

.qtag {
  background: none;
  border: 1px solid rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.35);
  font-size: 10px;
  letter-spacing: 1.5px;
  padding: 5px 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.qtag:hover {
  border-color: rgba(232,197,71,0.3);
  color: rgba(255,255,255,0.7);
  background: rgba(232,197,71,0.04);
}
.qtag.active {
  border-color: rgba(232,197,71,0.5);
  color: #E8C547;
  background: rgba(232,197,71,0.06);
}

/* ══════════════════════════════
   RESPONSIVE
══════════════════════════════ */
@media (max-width: 768px) {
  .field-sep { display: none; }
  .field-item { min-width: 100%; border-bottom: 1px solid rgba(255,255,255,0.05); }
  .field-item::after { left: 0; right: 0; }
  .btn-item { min-width: 100%; }
}
</style>