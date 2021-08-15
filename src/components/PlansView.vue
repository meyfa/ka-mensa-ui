<template>
  <div class="container">
    <div v-for="plan in filteredPlans" :key="plan.canteen.id" class="plan">
      <div class="canteen-name">{{ plan.canteen.name }}</div>

      <canteen-lines v-if="plan.lines" :lines="plan.lines"
          @details="detailsDialogMeal = $event"></canteen-lines>
    </div>
    <div v-if="!filteredPlans.length" class="no-data">
      (keine Daten)
    </div>

    <meal-details-dialog :meal="detailsDialogMeal" @update:meal="detailsDialogMeal = $event"></meal-details-dialog>
  </div>
</template>

<script>
import api from '~/api'
import settings from '~/settings'

import CanteenLines from '~/components/CanteenLines'
import MealDetailsDialog from '~/components/MealDetailsDialog'

export default {
  components: {
    CanteenLines,
    MealDetailsDialog
  },

  props: {
    date: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      canteens: settings.canteens,
      plans: [],
      detailsDialogMeal: null
    }
  },

  computed: {
    filteredPlans () {
      return this.plans.filter((item) => {
        return this.canteens.includes(item.canteen.id)
      })
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

    settings.on('update', this.updateSettings)
  },

  unmounted () {
    settings.removeListener('update', this.updateSettings)
  },

  methods: {
    updateSettings () {
      this.canteens = settings.canteens
    },

    async fetchData () {
      try {
        this.plans = await api.getPlan(this.date)
      } catch (e) {
        this.plans = []
      }
    }
  }
}
</script>

<style scoped>
.plan {
  margin: 32px 0 64px;
}

.canteen-name {
  margin: 0 0 32px;
  font-size: 24px;
  text-align: center;
}

.no-data {
  margin: 48px 0;
  font-size: 24px;
  color: var(--color-text-lighter);
  text-align: center;
}

@media (max-width: 500px) {
  .plan {
    margin: 24px 0 32px;
  }

  .canteen-name {
    margin: 0 0 24px;
  }
}
</style>
