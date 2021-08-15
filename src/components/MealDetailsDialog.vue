<template>
  <dialog-base title="Menü-Informationen"
      :visible="meal != null" @close="$emit('update:meal', null)">
    <template v-if="meal">
      <div class="name">
        {{ meal.name }}
      </div>
      <div v-if="meal.price" class="price">
        Preis: {{ meal.price }}
      </div>
      <div class="classifiers">
        <div v-for="classifier in classifiersAndAdditives" :key="classifier"
            class="classifiers-item">
          ({{ classifier }}) {{ legend ? legend[classifier] : '' }}
        </div>
      </div>
    </template>
  </dialog-base>
</template>

<script>
import api from '~/api'

import DialogBase from '~/components/DialogBase'

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

  data () {
    return {
      legend: null
    }
  },

  computed: {
    classifiersAndAdditives () {
      if (!this.meal) {
        return []
      }
      return [...new Set([...this.meal.classifiers, ...this.meal.additives])]
    }
  },

  created () {
    this.fetchData()
  },

  methods: {
    async fetchData () {
      let data
      try {
        data = await api.getLegend()
      } catch (e) {
        this.legend = null
        return
      }
      this.legend = {}
      for (const { short, label } of data) {
        this.legend[short] = label
      }
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
