<template>
  <DialogBase title="Menü-Informationen" :visible="meal != null" @close="$emit('update:meal', null)">
    <template v-if="meal != null">
      <div class="name">
        {{ meal.name }}
      </div>
      <div v-if="meal.price" class="price">
        Preis: {{ meal.price }}
      </div>
      <div class="classifiers">
        <div v-for="classifier in classifiersAndAdditives" :key="classifier" class="classifiers-item">
          ({{ classifier }}) {{ legend.get(classifier) ?? '' }}
        </div>
      </div>
    </template>
  </DialogBase>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue'
import type { PropType } from 'vue'

import type { CanteenMeal } from '../types/canteen-plan.js'
import api from '../api.js'

import DialogBase from './DialogBase.vue'

export default defineComponent({
  components: {
    DialogBase
  },

  props: {
    meal: {
      type: Object as PropType<CanteenMeal | undefined | null>,
      default: null
    }
  },

  emits: ['update:meal'],

  setup (props) {
    const legend = ref(new Map<string, string>())

    watchEffect(async () => {
      let data
      try {
        data = await api.getLegend()
      } catch (e) {
        legend.value = new Map()
        return
      }
      const map = new Map<string, string>()
      for (const { short, label } of data) {
        map.set(short, label)
      }
      legend.value = map
    })

    const classifiersAndAdditives = computed(() => {
      return props.meal != null
        ? Array.from(new Set([...props.meal.classifiers, ...props.meal.additives]))
        : []
    })

    return {
      legend,
      classifiersAndAdditives
    }
  }
})
</script>

<style scoped>
.name {
  font-weight: bold;
}

.price {
  margin: 8px 0;
  font-weight: bold;
}

.classifiers {
  margin: 16px 0 0;
}

.classifiers-item {
  margin: 4px 0;
}
</style>
