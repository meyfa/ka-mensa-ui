<template>
  <div class="lines">
    <div v-for="line in filteredLines" :key="line.id" class="line">
      <h3 class="line-title">{{ line.name }}</h3>

      <MealItem
          v-for="(meal, index) in line.meals" :key="index"
          :meal="meal" :highlight="enableHighlights"
          @click="$emit('details', meal)" />

      <div v-if="line.meals.length === 0" class="meals-noentries">
        Keine passenden Menüs
      </div>
    </div>

    <div v-if="!filteredLines.length" class="lines-noentries">
      <template v-if="hasAnyMeal">
        Hier gibt es kein Menü, das zu den gewählten Filtern passt.
      </template>
      <template v-else>
        Hier wird an keiner Linie etwas angeboten.
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue'
import type { PropType } from 'vue'

import type { CanteenLine, CanteenMeal } from '../types/canteen-plan.js'
import settings from '../settings.js'
import { isVegetarian, isVegan, isInfo } from '../util/meals.js'

import MealItem from './MealItem.vue'

export default defineComponent({
  components: {
    MealItem
  },

  props: {
    lines: {
      type: Array as PropType<CanteenLine[]>,
      required: true
    }
  },

  emits: ['details'],

  setup (props) {
    const hideEmptyLines = ref(settings.hideEmptyLines)
    const eatingHabits = ref(settings.eatingHabits)
    const enableHighlights = ref(settings.enableHighlights)

    const updateSettings = () => {
      hideEmptyLines.value = settings.hideEmptyLines
      eatingHabits.value = settings.eatingHabits
      enableHighlights.value = settings.enableHighlights
    }

    onMounted(() => settings.addEventListener('update', updateSettings))
    onUnmounted(() => settings.removeEventListener('update', updateSettings))

    const isMealVisible = (meal: CanteenMeal) => {
      if (isInfo(meal)) {
        return true
      }
      // Many vegetarian meals can be vegan with a different choice of dessert,
      // or by kindly asking canteen staff to exclude certain ingredients
      // (e.g. grated cheese).
      // Hence, filtering for strictly vegan meals is too restrictive.
      if (eatingHabits.value === 'vegetarian' || eatingHabits.value === 'vegan') {
        return isVegan(meal) || isVegetarian(meal)
      }
      return true
    }

    const hasAnyMeal = computed(() => props.lines.some((line) => line.meals.length > 0))

    const filteredLines = computed(() => props.lines.map((line) => {
      return {
        ...line,
        meals: line.meals.filter(isMealVisible)
      }
    }).filter((line) => !hideEmptyLines.value || line.meals.length))

    return {
      enableHighlights,
      hasAnyMeal,
      filteredLines
    }
  }
})
</script>

<style scoped>
.lines {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0;
}

.line {
  display: inline-block;
  width: 320px;
  margin: 0 4px 8px;
  padding: 16px 8px;
  background: var(--color-card-background);
  border-radius: 4px;
}

.line-title {
  margin: 0 4px 12px;
  font-size: 20px;
  font-weight: bold;
}

.meals-noentries {
  margin: 0 4px;
  font-size: 14px;
  color: var(--color-text-lighter);
}

.lines-noentries {
  margin: 0 8px 16px;
  padding: 16px;
  text-align: center;
  color: var(--color-text-lighter);
  border: 1px solid var(--color-text-lighter);
  border-radius: 2px;
}

@media (width <= 500px) {
  .lines {
    display: block;
  }

  .line {
    display: block;
    width: 100%;
    margin: 8px 0;
    border-radius: 0;
  }
}
</style>
