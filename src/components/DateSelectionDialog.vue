<template>
  <DialogBase title="Datumsauswahl" size="grow" :visible="visible" @close="close()">
    <template v-if="visible">
      <CalendarView :dates="calendarDates" :current="current" @select="close($event)" />
    </template>
  </DialogBase>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import type { PropType } from 'vue'

import type { DateSpec } from '../types/date-spec.js'
import type { CanteenPlanSummary } from '../types/canteen-plan.js'
import api from '../api.js'

import DialogBase from './DialogBase.vue'
import CalendarView from './CalendarView.vue'

export default defineComponent({
  components: {
    DialogBase,
    CalendarView
  },

  props: {
    visible: {
      type: Boolean
    },
    current: {
      type: Object as PropType<DateSpec | undefined | null>,
      default: null
    }
  },

  emits: ['select', 'update:visible'],

  setup (props, { emit }) {
    const planSummaries = ref<CanteenPlanSummary[] | undefined>([])

    const close = (result?: DateSpec) => {
      if (result != null) {
        emit('select', result)
      }
      emit('update:visible', false)
    }

    const fetchData = async () => {
      let data
      try {
        data = await api.getPlans()
      } catch (e) {
        planSummaries.value = undefined
        return
      }
      planSummaries.value = data
    }

    onMounted(() => fetchData())

    const calendarDates = computed(() => (planSummaries.value ?? []).map(({ date }) => date))

    return {
      calendarDates,
      close
    }
  }
})
</script>
