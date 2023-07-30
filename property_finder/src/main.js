import { createApp } from 'vue'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import pinia from './stores/store'
import App from './App.vue'
import router from './router'

const app = createApp(App)

pinia.use(piniaPluginPersistedState)
app.use(pinia)
app.use(router)

app.mount('#app')
