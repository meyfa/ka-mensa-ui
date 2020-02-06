<template>
  <div id="app">
    <app-header></app-header>

    <canteen-plan v-for="plan in filteredLinesByDate"
        :key="plan.date | date" :plan="plan"></canteen-plan>

    <app-footer class="footer"></app-footer>
  </div>
</template>

<script>
import 'typeface-nunito'

import api from '~/api'
import { getCurrentDate } from '~/util/date'

import AppHeader from '~/components/AppHeader'
import AppFooter from '~/components/AppFooter'
import CanteenPlan from '~/components/CanteenPlan'

export default {
  name: 'App',

  components: {
    AppHeader,
    AppFooter,
    CanteenPlan
  },

  data () {
    return {
      canteen: 'adenauerring',
      plans: []
    }
  },

  computed: {
    filteredLinesByDate () {
      return this.plans.map(({ date, plan }) => {
        const canteenPlan = plan.find((item) => {
          return item.canteen.id === this.canteen
        })
        return { date, lines: canteenPlan ? canteenPlan.lines : [] }
      })
    }
  },

  created () {
    this.fetchData()
  },

  methods: {
    async fetchData () {
      this.clearPlans()
      this.loadPlan(getCurrentDate())
    },

    clearPlans () {
      this.plans = []
    },

    async loadPlan (date) {
      const plan = await api.getPlan(date)
      this.plans.push({ date, plan })
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
