<template>
  <div class="panel">
    Show these meals:

    <label v-for="(label, habits) in eatingHabitsOptions" :key="habits" class="habits">
      <input v-model="eatingHabits" type="radio" :value="habits" /> {{ label }}
    </label>
  </div>
</template>

<script>
import settings from '~/settings'

export default {
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

<style scoped>
.habits {
  display: block;
  margin: 4px 0;
}
</style>
