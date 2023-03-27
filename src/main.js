import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)

//laisser le .mount tout en bas
app.mount('#app')

