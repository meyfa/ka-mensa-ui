<template>
  <div class="panel">
    Diese Gerichte anzeigen:

    <ChoiceControl v-model="eatingHabits" :options="eatingHabitsOptions" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

import settings from '../../settings'

import ChoiceControl from '../controls/ChoiceControl.vue'

export default defineComponent({
  components: {
    ChoiceControl
  },

  setup () {
    const eatingHabits = ref(settings.eatingHabits)

    watch(eatingHabits, (value) => {
      settings.eatingHabits = value
    })

    return {
      eatingHabitsOptions: {
        all: 'alles',
        vegetarian: 'vegetarisch/vegan'
      },
      eatingHabits
    }
  }
})
</script>
