<template>
  <div class="lines">
    <div v-for="line in lines" :key="line.id" class="line">
      <h3 class="line-title">{{ line.name }}</h3>

      <meal-item v-for="(meal, index) in line.meals"
          :key="index" :meal="meal"></meal-item>
    </div>
  </div>
</template>

<script>
import MealItem from '~/components/MealItem'

export default {
  components: {
    MealItem
  },

  props: {
    lines: {
      type: Array,
      required: true
    }
  }
}
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
  margin: 0 4px 8px 4px;
  padding: 16px 8px;
  background: var(--color-card-background);
  border-radius: 4px;
}

.line-title {
  margin: 0 4px 12px;
  font-size: 20px;
  font-weight: bold;
}

@media (max-width: 500px) {
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
