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
export default {
  props: {
    meal: {
      type: Object,
      required: true
    }
  },

  computed: {
    classifiersAndAdditives () {
      return [...new Set([...this.meal.classifiers, ...this.meal.additives])]
    },

    mealClasses () {
      return {
        vegetarian: this.meal.classifiers.includes('VEG'),
        vegan: this.meal.classifiers.includes('VG')
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

.meal.vegetarian {
  background: var(--color-meal-vegetarian);
}

.meal.vegan {
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
