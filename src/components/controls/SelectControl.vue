<template>
  <div class="select">
    <CheckControl v-for="(item, itemKey) in items" :key="itemKey" class="select-item"
        :model-value="isSelected(itemKey)" @update:model-value="setSelected(itemKey, $event)">
      {{ item.label }}
      <div class="select-description">
        {{ item.description }}
      </div>
    </CheckControl>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import CheckControl from './CheckControl.vue'

export default defineComponent({
  components: {
    CheckControl
  },

  props: {
    items: {
      type: Object as PropType<Record<string, { label: string, description: string }>>,
      required: true
    },
    selection: {
      type: Array as PropType<string[]>,
      required: true
    }
  },

  emits: ['update:selection'],

  setup (props, { emit }) {
    const isSelected = (value: string) => props.selection.includes(value)

    const setSelected = (value: string, select: boolean) => {
      // only allow toggling
      if (select !== isSelected(value)) {
        const newSelection = [...props.selection]
        if (select) {
          newSelection.push(value)
        } else {
          newSelection.splice(newSelection.indexOf(value), 1)
        }
        emit('update:selection', newSelection)
      }
    }

    return {
      isSelected,
      setSelected
    }
  }
})
</script>

<style scoped>
.select-item {
  display: block;
  margin: 12px 0;
}

.select-description {
  margin: 2px 0 0;
  font-size: 14px;
  color: var(--color-text-lighter);
}
</style>
