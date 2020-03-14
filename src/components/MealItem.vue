<template>
  <div class="meal" :class="mealClasses">
    <div class="meal-classifiers">
      <span v-for="cls in classifiersAndAdditives" :key="cls"
          class="meal-classifier">
        {{ cls }}
      </span>
    </div>

    <div class="meal-name">{{ meal.name }}</div>
    <div class="meal-price">{{ meal.price }}</div>
  </div>
</template>

<script>
import { isVegetarian, isVegan } from '~/util/meals'

export default {
  props: {
    meal: {
      type: Object,
      required: true
    },
    highlight: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    classifiersAndAdditives () {
      return [...new Set([...this.meal.classifiers, ...this.meal.additives])]
    },

    mealClasses () {
      return {
        highlight: this.highlight,
        vegetarian: isVegetarian(this.meal),
        vegan: isVegan(this.meal)
      }
    }
  }
}
</script>

<style scoped>
.meal {
  position: relative;
  padding: 4px 60px 4px 4px;
  border-bottom: 1px solid var(--color-divider);
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
