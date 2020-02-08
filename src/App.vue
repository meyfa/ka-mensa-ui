<template>
  <div id="app">
    <app-header></app-header>

    <date-header :date="date" @next="nextDate" @previous="previousDate"></date-header>
    <plans-view :date="date"></plans-view>

    <app-footer class="footer"></app-footer>
  </div>
</template>

<script>
import 'typeface-nunito'

import { getCurrentDate, isWeekday, getPreviousWeekday, getNextWeekday } from '~/util/date'

import AppHeader from '~/components/AppHeader'
import AppFooter from '~/components/AppFooter'
import DateHeader from '~/components/DateHeader'
import PlansView from '~/components/PlansView'

export default {
  name: 'App',

  components: {
    AppHeader,
    AppFooter,
    DateHeader,
    PlansView
  },

  data () {
    return {
      date: null
    }
  },

  created () {
    let date = getCurrentDate()
    if (!isWeekday(date)) {
      date = getNextWeekday(date)
    }
    this.date = date
  },

  methods: {
    nextDate () {
      if (!this.date) return
      this.date = getNextWeekday(this.date)
    },

    previousDate () {
      if (!this.date) return
      this.date = getPreviousWeekday(this.date)
    }
  }
}
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  overflow-y: scroll;
}

html,
body,
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
}

body {
  background: #dedddc;
  font-family: 'Nunito', sans-serif;
}

#app {
  position: relative;
  padding-bottom: 100px;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
