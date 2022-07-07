<template>
  <div class="panel">
    <div v-if="canteens.length > 0 && selected.length === 0" class="warning">
      Wähle mindestens eine Mensa aus
    </div>

    <SelectControl :items="selectControlItems" :selection="selected" @update:selection="selected = $event" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'

import type { Canteen } from '../../types/canteen.js'
import settings from '../../settings.js'
import api from '../../api.js'

import SelectControl from '../controls/SelectControl.vue'

export default defineComponent({
  components: {
    SelectControl
  },

  setup () {
    const canteens = ref<Canteen[]>([])
    const selected = ref(settings.canteens)

    watch(selected, (value) => {
      if (value.length > 0) {
        settings.canteens = value
      }
    })

    onMounted(async () => {
      canteens.value = await api.getCanteens()
    })

    const selectControlItems = computed(() => canteens.value.reduce((map: Record<string, any>, canteen: Canteen) => {
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
})
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
