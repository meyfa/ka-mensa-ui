import Vue from 'vue'
import App from './App.vue'

import moment from 'moment'
import 'moment/locale/de'

import { getCurrentDate, formatDate } from './util/date'

moment.locale('de')

Vue.filter('date', (value: any) => {
  if (value) {
    return formatDate(value)
  }
})

Vue.filter('daysAgo', (value: any) => {
  if (value) {
    const mnt = moment(value)
    const calStr = mnt.calendar(null, {
      sameDay: '[heute] (dddd)',
      nextDay: '[morgen] (dddd)',
      nextWeek: '[nächster] dddd',
      lastDay: '[gestern] (dddd)',
      lastWeek: '[letzter] dddd',
      sameElse: '[magic_replace_ago] (dddd)'
    }).toLowerCase()
    if (calStr.indexOf('magic_replace_ago') !== -1) {
      const diffDays = mnt.diff(moment(getCurrentDate()), 'd')
      const diffStr = diffDays < 0
        ? 'vor ' + (-diffDays) + ' Tagen'
        : 'in ' + diffDays + ' Tagen'
      return calStr.replace('magic_replace_ago', diffStr)
    }
    return calStr
  }
})

const vm = new Vue({
  render: h => h(App)
})
vm.$mount('#app')

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
  })
}
