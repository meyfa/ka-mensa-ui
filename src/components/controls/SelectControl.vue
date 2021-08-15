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

<script>
import CheckControl from '~/components/controls/CheckControl'

export default {
  components: {
    CheckControl
  },

  props: {
    items: {
      type: Object,
      required: true
    },
    selection: {
      type: Array,
      required: true
    }
  },

  emits: ['update:selection'],

  setup (props, { emit }) {
    const isSelected = (value) => props.selection.includes(value)

    const setSelected = (value, select) => {
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
}
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
