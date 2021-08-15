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

  data () {
    return {
      planSummaries: []
    }
  },

  computed: {
    calendarDates () {
      return this.planSummaries.map(({ date }) => date)
    }
  },

  created () {
    this.fetchData()
  },

  methods: {
    async fetchData () {
      let data
      try {
        data = await api.getPlans()
      } catch (e) {
        this.planSummaries = null
        return
      }
      this.planSummaries = data
    },

    close (result) {
      if (result) {
        this.$emit('select', result)
      }
      this.$emit('update:visible', false)
    }
  }
}
</script>
