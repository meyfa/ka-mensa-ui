<template>
  <section class="plan">
    <h2 class="date">{{ plan.date | date }}</h2>

    <div class="lines">
      <div v-for="line in plan.lines" :key="line.id" class="line">
        <h3 class="line-title">{{ line.name }}</h3>

        <meal-item v-for="(meal, index) in line.meals"
            :key="index" :meal="meal"></meal-item>
      </div>
    </div>
  </section>
</template>

<script>
import MealItem from '~/components/MealItem'

export default {
  components: {
    MealItem
  },

  props: {
    plan: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.plan {
  margin: 48px 24px;
}

.date {
  margin: 32px 0;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.lines {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.line {
  display: inline-block;
  width: 320px;
  margin: 0 6px 6px 0;
  padding: 16px 8px;
  background: #fff;
  border-radius: 4px;
}

.line-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: bold;
}
</style>
