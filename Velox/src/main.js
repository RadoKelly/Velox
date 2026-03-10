import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Router
import router from './router/index.js'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          primary:    '#E8C547',
          secondary:  '#1A1A2E',
          background: '#0D0D0D',
          surface:    '#1A1A1A',
        }
      }
    }
  }
})

// ── L'ordre est IMPORTANT ──
const app   = createApp(App)
const pinia = createPinia()

app.use(pinia)    // 1. Pinia EN PREMIER
app.use(router)   // 2. Router
app.use(vuetify)  // 3. Vuetify
app.mount('#app') // 4. Mount EN DERNIER