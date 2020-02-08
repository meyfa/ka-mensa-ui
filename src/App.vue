<template>
  <div id="app">
    <app-header></app-header>

    <date-header :date="date" @next="nextDate" @previous="previousDate"></date-header>
    <div v-if="!lines" class="no-lines">
      —— no data ——
    </div>
    <canteen-plan v-if="lines" :lines="lines"></canteen-plan>

    <app-footer class="footer"></app-footer>
  </div>
</template>

<script>
import 'typeface-nunito'

import api from '~/api'
import { getCurrentDate, isWeekday, getPreviousWeekday, getNextWeekday } from '~/util/date'

import AppHeader from '~/components/AppHeader'
import AppFooter from '~/components/AppFooter'
import DateHeader from '~/components/DateHeader'
import CanteenPlan from '~/components/CanteenPlan'

export default {
  name: 'App',

  components: {
    AppHeader,
    AppFooter,
    DateHeader,
    CanteenPlan
  },

  data () {
    return {
      canteen: 'adenauerring',
      date: null,
      lines: null
    }
  },

  created () {
    let toLoad = getCurrentDate()
    if (!isWeekday(toLoad)) {
      toLoad = getNextWeekday(toLoad)
    }
    this.date = toLoad
    this.loadPlan(toLoad)
  },

  methods: {
    async loadPlan (date) {
      let rawData
      try {
        rawData = await api.getPlan(date)
      } catch (e) {
        this.date = date
        this.lines = null
        return false
      }
      const canteenPlan = rawData.find((item) => {
        return item.canteen.id === this.canteen
      })
      this.date = date
      this.lines = canteenPlan ? canteenPlan.lines : null
      return true
    },

    async nextDate () {
      if (!this.date) return
      await this.loadPlan(getNextWeekday(this.date))
    },

    async previousDate () {
      if (!this.date) return
      await this.loadPlan(getPreviousWeekday(this.date))
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

.no-lines {
  margin: 48px 0;
  font-size: 32px;
  color: #999;
  text-align: center;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
