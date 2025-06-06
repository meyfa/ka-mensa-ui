<template>
  <div class="container">
    <div v-if="filteredPlans.length === 0" class="no-data">
      (keine Daten)
    </div>

    <div v-for="plan in filteredPlans" :key="plan.canteen.id" class="plan">
      <div class="canteen-name">{{ plan.canteen.name }}</div>
      <CanteenLines v-if="plan.lines" :lines="plan.lines" @details="detailsDialogMeal = $event" />
    </div>

    <MealDetailsDialog :meal="detailsDialogMeal" @update:meal="detailsDialogMeal = $event" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref, watch } from 'vue'
import type { PropType } from 'vue'

import type { DateSpec } from '../types/date-spec.js'
import type { CanteenMeal, CanteenPlan } from '../types/canteen-plan.js'
import api from '../api.js'
import settings from '../settings.js'

import CanteenLines from './CanteenLines.vue'
import MealDetailsDialog from './MealDetailsDialog.vue'

export default defineComponent({
  components: {
    CanteenLines,
    MealDetailsDialog
  },

  props: {
    date: {
      type: Object as PropType<DateSpec>,
      required: true
    }
  },

  setup (props) {
    const canteens = ref(settings.canteens)
    const plans = ref<CanteenPlan[]>([])
    const detailsDialogMeal = ref<CanteenMeal | undefined>()

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
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (props.date != null) {
        void fetchData()
      }
      settings.addEventListener('update', updateSettings)
    })

    onUnmounted(() => {
      settings.removeEventListener('update', updateSettings)
    })

    return {
      filteredPlans,
      detailsDialogMeal
    }
  }
})
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

@media (width <= 500px) {
  .plan {
    margin: 24px 0 32px;
  }

  .canteen-name {
    margin: 0 0 24px;
  }
}
</style>
