<template>
  <div class="panel">
    <div v-if="canteens.length && !selected.length" class="warning">
      Wähle mindestens eine Mensa aus
    </div>

    <select-control :items="selectControlItems" :selection="selected" @update:selection="selected = $event"></select-control>
  </div>
</template>

<script>
import settings from '~/settings'
import api from '~/api'

import SelectControl from '~/components/controls/SelectControl'

export default {
  components: {
    SelectControl
  },

  data () {
    return {
      canteens: [],
      selected: settings.canteens
    }
  },

  computed: {
    selectControlItems () {
      const items = {}
      for (const canteen of this.canteens) {
        items[canteen.id] = {
          label: canteen.name,
          description: this.formatLines(canteen.lines)
        }
      }
      return items
    }
  },

  watch: {
    selected (to) {
      if (to.length > 0) {
        settings.canteens = to
      }
    }
  },

  created () {
    this.fetchData()
  },

  methods: {
    async fetchData () {
      this.canteens = await api.getCanteens()
    },

    formatLines (lines) {
      return lines.map((item) => item.name).join(', ')
    }
  }
}
</script>

<style scoped>
.warning {
  position: relative;
  margin: 16px 0;
  padding: 8px;
  font-weight: bold;
  color: var(--color-warn-text);
  background: var(--color-warn-background);
}
</style>
