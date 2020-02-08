import Vue from 'vue'
import App from './App'

import moment from 'moment'
import { getCurrentDate, formatDate } from '~/util/date'

Vue.filter('date', value => {
  if (value) {
    return formatDate(value)
  }
})

Vue.filter('daysAgo', value => {
  if (value) {
    const mnt = moment(value)
    const calStr = mnt.calendar(null, {
      sameDay: '[today] (dddd)',
      nextDay: '[tomorrow] (dddd)',
      nextWeek: '[next] dddd',
      lastDay: '[yesterday] (dddd)',
      lastWeek: '[last] dddd',
      sameElse: '[magic_replace_ago] (dddd)'
    }).toLowerCase()
    if (calStr.indexOf('magic_replace_ago') !== -1) {
      const diffDays = mnt.diff(moment(getCurrentDate()), 'd')
      const diffStr = diffDays < 0
        ? -diffDays + ' days ago'
        : 'in ' + diffDays + ' days'
      return calStr.replace('magic_replace_ago', diffStr)
    }
    return calStr
  }
})

const vm = new Vue({
  render: h => h(App)
})
vm.$mount('#app')
