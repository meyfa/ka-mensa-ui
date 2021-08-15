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
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

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

  setup (props) {
    const canteens = ref(settings.canteens)
    const plans = ref([])
    const detailsDialogMeal = ref(null)

    const filteredPlans = computed(() => plans.value.filter((item) => {
      return canteens.value.includes(item.canteen.id)
    }))

    const fetchData = async () => {
      try {
        plans.value = await api.getPlan(props.date)
      } catch (e) {
        plans.value = []
      }
    }

    // trigger a fetch on date change
    watch(() => props.date, () => fetchData())

    const updateSettings = () => {
      canteens.value = settings.canteens
    }

    onMounted(() => {
      if (props.date != null) {
        fetchData()
      }
      settings.on('update', updateSettings)
    })

    onUnmounted(() => {
      settings.off('update', updateSettings)
    })

    return {
      filteredPlans,
      detailsDialogMeal
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
