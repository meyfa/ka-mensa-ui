<template>
  <dialog-base title="Datumsauswahl" size="grow"
      :visible="visible" @close="close()">
    <template v-if="visible">
      <calendar-view :dates="calendarDates" :current="current"
          @select="close($event)"></calendar-view>
    </template>
  </dialog-base>
</template>

<script>
import { computed, onMounted, ref } from 'vue'

import api from '~/api'

import DialogBase from '~/components/DialogBase'
import CalendarView from '~/components/CalendarView'

export default {
  components: {
    DialogBase,
    CalendarView
  },

  props: {
    visible: {
      type: Boolean
    },
    current: {
      type: Object,
      default: null
    }
  },

  emits: ['select', 'update:visible'],

  setup (props, { emit }) {
    const planSummaries = ref([])

    const close = (result) => {
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
        planSummaries.value = null
        return
      }
      planSummaries.value = data
    }

    onMounted(() => fetchData())

    const calendarDates = computed(() => planSummaries.value.map(({ date }) => date))

    return {
      calendarDates,
      close
    }
  }
}
</script>
