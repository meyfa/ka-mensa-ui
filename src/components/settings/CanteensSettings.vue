<template>
  <div class="panel">
    <div v-if="canteens.length && !selected.length" class="warning">
      Select at least one canteen
    </div>

    <label v-for="canteen in canteens" :key="canteen.id" class="canteen"
        :class="{ selected: isSelected(canteen.id) }">
      <input type="checkbox"
          :checked="isSelected(canteen.id)"
          @change="toggleSelection(canteen.id)" />
      {{ canteen.name }}
      <div class="canteen-lines">{{ formatLines(canteen.lines) }}</div>
    </label>
  </div>
</template>

<script>
import settings from '~/settings'
import api from '~/api'

export default {
  data () {
    return {
      canteens: [],
      selected: []
    }
  },

  created () {
    this.fetchData()
  },

  methods: {
    async fetchData () {
      this.canteens = await api.getCanteens()
      this.selected = settings.canteens
    },

    isSelected (canteenId) {
      return this.selected.includes(canteenId)
    },

    setSelection (canteenId, select) {
      if (select) {
        this.selected.push(canteenId)
      } else {
        this.selected = this.selected.filter((id) => id !== canteenId)
      }
      // save only if anything is selected
      if (this.selected.length > 0) {
        settings.canteens = this.selected
      }
    },

    toggleSelection (canteenId) {
      this.setSelection(canteenId, !this.isSelected(canteenId))
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
  color: #d14;
  background: #fdb;
}

.canteen {
  display: block;
  margin: 0 0 4px;
  padding: 4px;
  cursor: pointer;
  border: 2px solid transparent;
}

.canteen.selected {
  background: rgba(0, 100, 255, 0.2);
}

.canteen:hover {
  border-color: #444;
}

.canteen-lines {
  font-size: 14px;
  color: #888;
}
</style>
