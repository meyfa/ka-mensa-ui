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
          ({{ classifier }}) {{ legend ? legend[classifier] : '' }}
        </div>
      </div>
    </template>
  </DialogBase>
</template>

<script>
import { computed, ref, watchEffect } from 'vue'

import api from '../api'

import DialogBase from './DialogBase'

export default {
  components: {
    DialogBase
  },

  props: {
    meal: {
      type: Object,
      default: null
    }
  },

  emits: ['update:meal'],

  setup (props) {
    const legend = ref(null)

    watchEffect(async () => {
      let data
      try {
        data = await api.getLegend()
      } catch (e) {
        legend.value = null
        return
      }
      legend.value = {}
      for (const { short, label } of data) {
        legend.value[short] = label
      }
    })

    const classifiersAndAdditives = computed(() => {
      return props.meal != null
        ? [...new Set([...props.meal.classifiers, ...props.meal.additives])]
        : []
    })

    return {
      legend,
      classifiersAndAdditives
    }
  }
}
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
