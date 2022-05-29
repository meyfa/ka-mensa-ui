<template>
  <button type="button" class="meal" :class="mealClasses" @click="$emit('click')">
    <div class="meal-classifiers">
      <span v-for="cls in classifiersAndAdditives" :key="cls">
        {{ cls }}{{ ' ' }}
      </span>
    </div>

    <div class="meal-name">{{ meal.name }}</div>
    <div class="meal-price">{{ meal.price }}</div>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import type { PropType } from 'vue'

import type { CanteenMeal } from '../types/canteen-plan'
import { isVegetarian, isVegan } from '../util/meals'

export default defineComponent({
  props: {
    meal: {
      type: Object as PropType<CanteenMeal>,
      required: true
    },
    highlight: {
      type: Boolean,
      default: false
    }
  },

  emits: ['click'],

  setup (props) {
    const classifiersAndAdditives = computed(() => Array.from(new Set([
      ...props.meal.classifiers,
      ...props.meal.additives
    ])))

    const mealClasses = computed(() => ({
      highlight: props.highlight,
      vegetarian: isVegetarian(props.meal),
      vegan: isVegan(props.meal)
    }))

    return {
      classifiersAndAdditives,
      mealClasses
    }
  }
})
</script>

<style scoped>
.meal {
  display: block;
  position: relative;
  width: 100%;
  padding: 4px 60px 4px 4px;
  font: inherit;
  color: inherit;
  text-align: inherit;
  background: none;
  border: none;
  outline: none;
  border-bottom: 1px solid var(--color-divider);
  cursor: pointer;
}

.meal::-moz-focus-inner {
  border: none;
}

.meal:focus,
.meal:hover {
  z-index: 1;
  transform: scale(1.01);
  box-shadow: var(--meal-item-shadow);
}

.meal:focus {
  outline: 1px dotted #000;
}

.meal.highlight.vegetarian {
  background: var(--color-meal-vegetarian);
}

.meal.highlight.vegan {
  background: var(--color-meal-vegan);
}

.meal:last-child {
  border-bottom: none;
}

.meal-classifiers {
  font-size: 14px;
  font-weight: 700;
}

.meal-price {
  position: absolute;
  top: 4px;
  right: 4px;
  font-weight: 700;
}
</style>
