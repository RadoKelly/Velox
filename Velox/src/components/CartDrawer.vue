<template>
  <Teleport to="body">
    <Transition name="cart-fade">
      <div v-if="isOpen" class="cart-overlay" @click.self="isOpen = false">
        <Transition name="cart-slide">
          <div v-if="isOpen" class="cart-panel">

            <!-- Header -->
            <div class="cart-header">
              <div>
                <div class="cart-eyebrow">PANIER</div>
                <div class="cart-title">
                  {{ store.cartCount }} réservation{{ store.cartCount > 1 ? 's' : '' }}
                </div>
              </div>
              <button class="cart-close" @click="isOpen = false">
                <v-icon icon="mdi-close" size="16"></v-icon>
              </button>
            </div>

            <div class="cart-sep"></div>

            <!-- Vide -->
            <Transition name="fade">
              <div v-if="store.cartCount === 0" class="cart-empty">
                <v-icon icon="mdi-car-off" size="48" style="color:rgba(255,255,255,0.1); margin-bottom:16px;"></v-icon>
                <p>Aucune réservation</p>
              </div>
            </Transition>

            <!-- Items -->
            <TransitionGroup name="item" tag="div" class="cart-items">
              <div
                v-for="item in store.cart"
                :key="item.car.name"
                class="cart-item"
              >
                <!-- Icône voiture -->
                <div class="ci-icon">
                  <v-icon
                    :icon="item.car.icon"
                    :style="{ color: item.car.color }"
                    style="font-size:36px;"
                  ></v-icon>
                </div>

                <!-- Infos -->
                <div class="ci-info">
                  <div class="ci-name">{{ item.car.name }}</div>
                  <div class="ci-dates">
                    {{ item.depart }} → {{ item.retour }}
                  </div>
                  <div class="ci-client">{{ item.nom }}</div>
                </div>

                <!-- Prix + supprimer -->
                <div class="ci-right">
                  <div class="ci-price">{{ item.totalPrice }}€</div>
                  <button
                    class="ci-remove"
                    @click="store.removeFromCart(item.car.name)"
                  >
                    <v-icon icon="mdi-trash-can-outline" size="13"></v-icon>
                  </button>
                </div>

              </div>
            </TransitionGroup>

            <!-- Footer total -->
            <div class="cart-footer" v-if="store.cartCount > 0">
              <div class="cart-sep"></div>

              <div class="cart-total">
                <span class="ct-label">TOTAL</span>
                <span class="ct-val">{{ store.cartTotal }}€</span>
              </div>

              <button class="cart-confirm">
                CONFIRMER TOUT
                <v-icon icon="mdi-check" size="14" style="margin-left:8px;"></v-icon>
              </button>

              <button class="cart-clear" @click="store.clearCart()">
                Vider le panier
              </button>
            </div>

          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import { useReservationStore } from '../stores/reservation'

const store  = useReservationStore()
const isOpen = ref(false)

// Exposer pour que NavBar puisse ouvrir le panier
defineExpose({ isOpen })
</script>

<style scoped>
.cart-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(6px);
  z-index: 9998;
}

.cart-panel {
  position: fixed;
  top: 0; right: 0; bottom: 0;
  width: 380px;
  background: #080808;
  border-left: 1px solid rgba(232,197,71,0.12);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  padding: 32px 28px;
  overflow: hidden;
}

/* Header */
.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}
.cart-eyebrow {
  font-size: 9px; letter-spacing: 4px;
  color: rgba(255,255,255,0.25); margin-bottom: 6px;
}
.cart-title {
  font-size: 1.2rem; font-weight: 900;
  color: white; letter-spacing: -0.5px;
}
.cart-close {
  width: 32px; height: 32px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.4);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all 0.2s;
}
.cart-close:hover {
  background: rgba(232,197,71,0.08);
  border-color: rgba(232,197,71,0.2);
  color: #E8C547;
}

.cart-sep {
  height: 1px;
  background: rgba(255,255,255,0.05);
  margin-bottom: 20px;
}

/* Vide */
.cart-empty {
  flex: 1; display: flex;
  flex-direction: column;
  align-items: center; justify-content: center;
  color: rgba(255,255,255,0.2);
  font-size: 12px; letter-spacing: 2px;
}

/* Items */
.cart-items {
  flex: 1; overflow-y: auto;
  display: flex; flex-direction: column; gap: 1px;
  background: rgba(255,255,255,0.03);
}
.cart-items::-webkit-scrollbar { width: 2px; }
.cart-items::-webkit-scrollbar-track { background: transparent; }
.cart-items::-webkit-scrollbar-thumb { background: rgba(232,197,71,0.2); }

.cart-item {
  display: flex; align-items: center;
  gap: 14px; padding: 16px;
  background: #0f0f0f;
  transition: background 0.2s;
}
.cart-item:hover { background: #131313; }

.ci-icon {
  width: 52px; height: 44px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.04);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}

.ci-info { flex: 1; min-width: 0; }
.ci-name {
  font-size: 12px; font-weight: 700;
  color: white; margin-bottom: 3px;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.ci-dates {
  font-size: 10px; color: rgba(255,255,255,0.3);
  letter-spacing: 0.5px; margin-bottom: 2px;
}
.ci-client {
  font-size: 10px; color: rgba(255,255,255,0.2);
  letter-spacing: 0.3px;
}

.ci-right {
  display: flex; flex-direction: column;
  align-items: flex-end; gap: 6px;
  flex-shrink: 0;
}
.ci-price {
  font-size: 14px; font-weight: 900;
  color: #E8C547; letter-spacing: -0.5px;
}
.ci-remove {
  background: none; border: none;
  color: rgba(255,255,255,0.2);
  cursor: pointer; transition: color 0.2s;
  padding: 0;
}
.ci-remove:hover { color: #ff6b6b; }

/* Footer */
.cart-footer { margin-top: auto; padding-top: 8px; }

.cart-total {
  display: flex; justify-content: space-between;
  align-items: center; margin-bottom: 16px;
  padding: 0 4px;
}
.ct-label {
  font-size: 9px; letter-spacing: 4px;
  color: rgba(255,255,255,0.3);
}
.ct-val {
  font-size: 1.5rem; font-weight: 900;
  color: #E8C547; letter-spacing: -1px;
}

.cart-confirm {
  width: 100%; height: 50px;
  background: #E8C547; border: none;
  color: #0D0D0D;
  font-size: 10px; letter-spacing: 3px; font-weight: 900;
  cursor: pointer; margin-bottom: 10px;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s, transform 0.2s;
}
.cart-confirm:hover {
  background: #f0d060;
  transform: translateY(-1px);
}

.cart-clear {
  width: 100%; background: none; border: none;
  color: rgba(255,255,255,0.2);
  font-size: 10px; letter-spacing: 2px;
  cursor: pointer; padding: 8px 0;
  transition: color 0.2s;
}
.cart-clear:hover { color: rgba(255,255,255,0.5); }

/* Transitions */
.cart-fade-enter-active, .cart-fade-leave-active { transition: opacity 0.3s; }
.cart-fade-enter-from,   .cart-fade-leave-to     { opacity: 0; }

.cart-slide-enter-active,
.cart-slide-leave-active { transition: transform 0.4s cubic-bezier(0.4,0,0.2,1); }
.cart-slide-enter-from,
.cart-slide-leave-to     { transform: translateX(100%); }

.item-enter-active, .item-leave-active { transition: all 0.35s ease; }
.item-enter-from { opacity:0; transform: translateX(20px); }
.item-leave-to   { opacity:0; transform: translateX(-20px); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>