<template>
  <div class="select">
    <check-control v-for="(item, itemKey) in items" :key="itemKey" class="select-item"
        :model-value="isSelected(itemKey)" @update:model-value="setSelected(itemKey, $event)">
      {{ item.label }}
      <div class="select-description">
        {{ item.description }}
      </div>
    </check-control>
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

  methods: {
    isSelected (value) {
      return this.selection.includes(value)
    },

    setSelected (value, select) {
      const currentlySelected = this.isSelected(value)
      // only allow toggling
      if (select === currentlySelected) {
        return
      }
      const newSelection = [...this.selection]
      if (currentlySelected) {
        newSelection.splice(newSelection.indexOf(value), 1)
      } else {
        newSelection.push(value)
      }
      this.$emit('update:selection', newSelection)
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
