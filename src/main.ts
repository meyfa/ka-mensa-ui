import { createApp } from 'vue'
import { registerSW } from 'virtual:pwa-register'
import moment from 'moment'
import 'moment/dist/locale/de.js'
import App from './App.vue'

moment.locale('de')

createApp(App).mount('#app')

registerSW()
