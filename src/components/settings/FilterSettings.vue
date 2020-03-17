<template>
  <div class="panel">
    Diese Gerichte anzeigen:

    <choice-control v-model="eatingHabits" :options="eatingHabitsOptions"></choice-control>
  </div>
</template>

<script>
import settings from '~/settings'

import ChoiceControl from '~/components/controls/ChoiceControl'

export default {
  components: {
    ChoiceControl
  },

  data () {
    return {
      eatingHabitsOptions: {
        all: 'alles',
        vegetarian: 'vegetarisch und vegan',
        vegan: 'nur vegan'
      },
      eatingHabits: settings.eatingHabits
    }
  },

  watch: {
    eatingHabits (to) {
      settings.eatingHabits = to
    }
  }
}
</script>
