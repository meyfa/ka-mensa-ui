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
import settings from '~/settings'

export default {
  props: {
    meal: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      enableHighlights: settings.enableHighlights
    }
  },

  computed: {
    classifiersAndAdditives () {
      return [...new Set([...this.meal.classifiers, ...this.meal.additives])]
    },

    mealClasses () {
      return {
        highlight: this.enableHighlights,
        vegetarian: this.meal.classifiers.includes('VEG'),
        vegan: this.meal.classifiers.includes('VG')
      }
    }
  },

  created () {
    settings.on('update', this.updateSettings)
  },

  destroyed () {
    settings.removeListener('update', this.updateSettings)
  },

  methods: {
    updateSettings () {
      this.enableHighlights = settings.enableHighlights
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
