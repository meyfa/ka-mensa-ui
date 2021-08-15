import { createApp } from 'vue'
import App from './App.vue'

import moment from 'moment'
import 'moment/locale/de'

moment.locale('de')

createApp(App as any).mount('#app')

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    navigator.serviceWorker.register('/service-worker.js')
  })
}
