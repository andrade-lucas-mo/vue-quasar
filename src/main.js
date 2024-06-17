import { createApp } from 'vue'
import './style.css'
import './axios'
import { Quasar } from 'quasar';
import quasarUserOptions from './quasar-user-options';
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.use(Quasar, quasarUserOptions)
app.mount('#app')
