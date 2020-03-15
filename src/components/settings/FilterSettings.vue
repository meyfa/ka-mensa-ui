<template>
  <div class="panel">
    Show these meals:

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
        all: 'Everything',
        vegetarian: 'Vegetarian and Vegan',
        vegan: 'Vegan only'
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
