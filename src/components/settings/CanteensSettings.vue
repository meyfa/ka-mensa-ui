<template>
  <div class="panel">
    <div v-if="canteens.length > 0 && selected.length === 0" class="warning">
      Wähle mindestens eine Mensa aus
    </div>

    <SelectControl :items="selectControlItems" :selection="selected" @update:selection="selected = $event" />
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue'

import settings from '../../settings'
import api from '../../api'

import SelectControl from '../controls/SelectControl'

export default {
  components: {
    SelectControl
  },

  setup () {
    const canteens = ref([])
    const selected = ref(settings.canteens)

    watch(selected, (value) => {
      if (value.length > 0) {
        settings.canteens = value
      }
    })

    onMounted(async () => {
      canteens.value = await api.getCanteens()
    })

    const selectControlItems = computed(() => canteens.value.reduce((map, canteen) => {
      map[canteen.id] = {
        label: canteen.name,
        description: canteen.lines.map((item) => item.name).join(', ')
      }
      return map
    }, {}))

    return {
      canteens,
      selected,
      selectControlItems
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
