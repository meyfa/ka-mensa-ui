<template>
  <div class="container">
    <div v-for="plan in plans" :key="plan.canteen.id" class="plan">
      <div class="canteen-name">{{ plan.canteen.name }}</div>

      <canteen-lines v-if="plan.lines" :lines="plan.lines"></canteen-lines>
    </div>
    <div v-if="!plans || !plans.length" class="no-data">
      —— no data ——
    </div>
  </div>
</template>

<script>
import api from '~/api'
import settings from '~/settings'

import CanteenLines from '~/components/CanteenLines'

export default {
  components: {
    CanteenLines
  },

  props: {
    date: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      plans: null
    }
  },

  watch: {
    date () {
      this.fetchData()
    }
  },

  created () {
    if (this.date) {
      this.fetchData()
    }

    settings.on('update', this.fetchData)
  },

  destroyed () {
    settings.removeListener('update', this.fetchData)
  },

  methods: {
    async fetchData () {
      let rawData
      try {
        rawData = await api.getPlan(this.date)
      } catch (e) {
        this.plans = null
        return
      }
      this.plans = rawData.filter((item) => {
        return settings.canteens.includes(item.canteen.id)
      })
    }
  }
}
</script>

<style scoped>
.canteen-name {
  margin: 32px 0;
  font-size: 24px;
  text-align: center;
}

.plan {
  margin: 32px 0 64px;
}

.no-data {
  margin: 48px 0;
  font-size: 32px;
  color: #999;
  text-align: center;
}
</style>
