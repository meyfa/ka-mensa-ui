<template>
  <div class="panel">
    Diese Gerichte anzeigen:

    <choice-control v-model="eatingHabits" :options="eatingHabitsOptions"></choice-control>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

import settings from '~/settings'

import ChoiceControl from '~/components/controls/ChoiceControl'

export default {
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
}
</script>
