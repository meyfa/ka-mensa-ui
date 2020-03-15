<template>
  <button type="button" class="meal" :class="mealClasses" @click="$emit('click')">
    <div class="meal-classifiers">
      <span v-for="cls in classifiersAndAdditives" :key="cls">
        {{ cls }}
      </span>
    </div>

    <div class="meal-name">{{ meal.name }}</div>
    <div class="meal-price">{{ meal.price }}</div>
  </button>
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
