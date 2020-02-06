import Vue from 'vue'
import App from './App'

import { formatDate } from '~/util/date'

Vue.filter('date', value => {
  if (value) {
    return formatDate(value)
  }
})

const vm = new Vue({
  render: h => h(App)
})
vm.$mount('#app')
