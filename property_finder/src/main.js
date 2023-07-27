import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import pinia  from './stores/store'
import App from './App.vue'
import router from './router'

const app = createApp(App)
// const pinia = createPinia();

app.use(pinia)
app.use(router)

// const store = useHousesStore();

    // createApp(App).use(pinia).use(router).mount('#app')

app.mount('#app')
