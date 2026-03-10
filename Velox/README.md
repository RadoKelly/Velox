# VELOX — Location de Véhicules Premium

<div align="center">

![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Vuetify](https://img.shields.io/badge/Vuetify-3.x-1867C0?style=for-the-badge&logo=vuetify&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-2.x-F7B233?style=for-the-badge&logo=pinia&logoColor=white)
![Vue Router](https://img.shields.io/badge/Vue_Router-4.x-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)

**Site vitrine moderne pour une agence de location de véhicules premium.**  
Construit avec Vue 3, Vuetify 3, Pinia et Vue Router.

</div>

---

## Aperçu

VELOX est une landing page professionnelle et interactive pour une agence de location de voitures premium basée à Antananarivo, Madagascar. Le projet met en avant les meilleures pratiques de Vue 3 avec une interface utilisateur moderne, minimaliste et animée.

---

## Stack technique

| Technologie | Version | Rôle |
|---|---|---|
| [Vue 3](https://vuejs.org/) | `^3.4` | Framework principal |
| [Vite](https://vitejs.dev/) | `^5.0` | Bundler & dev server |
| [Vuetify 3](https://vuetifyjs.com/) | `^3.0` | UI component library |
| [Pinia](https://pinia.vuejs.org/) | `^2.0` | State management |
| [Vue Router 4](https://router.vuejs.org/) | `^4.0` | Navigation SPA |
| [@mdi/font](https://pictogrammers.com/library/mdi/) | `latest` | Icônes Material Design |

---

## Fonctionnalités

### Interface utilisateur
- **Navbar** dynamique avec effet scroll, menu mobile drawer animé et burger CSS
- **Hero Section** avec compteurs animés (easeOutExpo), icône flottante et rings rotatifs
- **SearchBar** intelligente avec barre de progression, suggestions dropdown et calcul de durée automatique
- **Fleet Section** avec filtres par catégorie et animations `TransitionGroup`
- **Features Section** avec scanline animée, particules flottantes et orbes en fond
- **Testimonials** en carrousel autoplay avec barre de progression temporelle
- **CTA Section** avec canvas particles (WebAPI) et mega bouton liquide
- **Footer** avec starfield canvas, ticker défilant et grid 4 colonnes

### Architecture Vue 3
- **Composition API** avec `<script setup>` sur tous les composants
- **Pinia Store** pour la gestion du panier de réservations
- **Vue Router** avec lazy loading et scroll behavior
- **Composables réutilisables** (`useIntersection`, `useMouseParallax`)
- **`<Transition>` / `<TransitionGroup>`** pour toutes les animations de state
- **`<Teleport>`** pour les modals et drawers hors hiérarchie DOM
- **`provide` / `inject`** pour le partage d'état global
- **`defineEmits` / `defineProps`** pour la communication inter-composants
- **`watch` / `computed`** pour la réactivité avancée

### UX & Interactions
- Formulaire de réservation multi-étapes (3 steps) avec validation réactive
- Modal de réservation avec calcul de prix en temps réel
- Panier de réservations persistant avec `CartDrawer`
- Animations d'entrée au scroll via `IntersectionObserver`
- Canvas WebAPI pour les animations de particules et étoiles

---

## Structure du projet
```
location-voiture/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── NavBar.vue
│   │   ├── HeroSection.vue
│   │   ├── SearchBar.vue
│   │   ├── FleetSection.vue
│   │   ├── CarCard.vue
│   │   ├── FeaturesSection.vue
│   │   ├── TestimonialsSection.vue
│   │   ├── CtaSection.vue
│   │   ├── FooterSection.vue
│   │   ├── ReservationModal.vue
│   │   └── CartDrawer.vue
│   ├── composables/
│   │   ├── useIntersection.js
│   │   ├── useMouseParallax.js
│   │   └── useApp.js
│   ├── stores/
│   │   └── reservation.js
│   ├── router/
│   │   └── index.js
│   ├── views/
│   │   ├── HomeView.vue
│   │   ├── FlotteView.vue
│   │   └── ReservationView.vue
│   ├── App.vue
│   └── main.js
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## Installation

### Prérequis

- [Node.js](https://nodejs.org/) `>= 18.0`
- [npm](https://www.npmjs.com/) `>= 9.0`

### Étapes
```bash
# 1. Cloner le projet
git clone https://github.com/votre-username/location-voiture.git

# 2. Se placer dans le dossier
cd location-voiture

# 3. Installer les dépendances
npm install

# 4. Lancer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:5173](http://localhost:5173) dans votre navigateur.

---

## Scripts disponibles
```bash
# Développement avec hot-reload
npm run dev

# Build de production
npm run build

# Prévisualisation du build
npm run preview
```

---

## Pages & Navigation

| Route | Vue | Description |
|---|---|---|
| `/` | `HomeView.vue` | Landing page complète |
| `/flotte` | `FlotteView.vue` | Catalogue complet des véhicules |
| `/reservation` | `ReservationView.vue` | Formulaire multi-étapes |

---

## Composables

### `useIntersection(options)`
Détecte quand un élément entre dans le viewport pour déclencher les animations.
```js
import { useIntersection } from '@/composables/useIntersection'

const { targetRef, inView } = useIntersection({ threshold: 0.1 })
```

### `useMouseParallax(strength)`
Suit la position de la souris pour créer un effet de parallaxe.
```js
import { useMouseParallax } from '@/composables/useMouseParallax'

const { x, y } = useMouseParallax(12)
```

---

## Store Pinia

### `useReservationStore`
```js
import { useReservationStore } from '@/stores/reservation'

const store = useReservationStore()

// Ouvrir le modal avec une voiture
store.openModal(car)

// Ajouter au panier
store.addToCart(reservation)

// Getters réactifs
store.cartCount  // nombre de réservations
store.cartTotal  // total en euros
```

---

## Palette de couleurs

| Nom | Valeur | Usage |
|---|---|---|
| Gold Primary | `#E8C547` | Couleur principale, accents |
| Background | `#0D0D0D` | Fond général |
| Surface | `#111111` | Fond des cards |
| Surface Light | `#161616` | Fond des inputs |
| Text Primary | `#FFFFFF` | Texte principal |
| Text Muted | `rgba(255,255,255,0.4)` | Texte secondaire |
| Success | `#4ade80` | Badges de disponibilité |

---

## Choix de design

- **Thème** : Dark luxury — noir profond, or, typographie serrée
- **Typographie** : Letter-spacing large pour les labels, font-weight 900 pour les titres
- **Animations** : `easeOutExpo` pour les compteurs, `cubic-bezier(0.34, 1.56, 0.64, 1)` pour les rebonds
- **Canvas API** : Utilisé dans `CtaSection` et `FooterSection` pour les animations de particules
- **Grid CSS** : Gouttières `1px` avec fond `rgba(255,255,255,0.04)` pour un effet éditorial

---

## Auteur

**Radonirina**  
Développeur Frontend — Madagascar  

---

## Licence

Ce projet est sous licence [MIT](LICENSE).

---

<div align="center">
  Fait avec ❤️ et Vue 3
</div>
