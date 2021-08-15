<template>
  <div ref="container" class="container">
    <div class="panel" :class="{ sticky }">
      <button type="button" class="dir-btn" @click="$emit('previous')">❮</button>
      <button class="date" @click="showDateSelection = true">
        <h2 class="date-title">{{ formatDate(date) }}</h2>
        <div class="date-subtitle">{{ daysAgo(date) }}</div>
      </button>
      <button type="button" class="dir-btn" @click="$emit('next')">❯</button>
    </div>

    <date-selection-dialog :current="date" :visible="showDateSelection" @update:visible="showDateSelection = $event"
        @select="$emit('select', $event)"></date-selection-dialog>
  </div>
</template>

<script>
import DateSelectionDialog from '~/components/DateSelectionDialog'

import { formatDate } from '../util/date'
import { filterDaysAgo } from '../filters/days-ago'

export default {
  components: {
    DateSelectionDialog
  },

  props: {
    date: {
      type: Object,
      required: true
    }
  },

  emits: ['next', 'previous', 'select'],

  data () {
    return {
      showDateSelection: false,
      sticky: false,
      formatDate,
      daysAgo: filterDaysAgo
    }
  },

  mounted () {
    this.recomputeSticky()
    window.addEventListener('scroll', this.recomputeSticky)
  },

  unmounted () {
    window.removeEventListener('scroll', this.recomputeSticky)
  },

  methods: {
    recomputeSticky () {
      this.sticky = this.$refs.container.getBoundingClientRect().top < 0
    }
  }
}
</script>

<style scoped>
.container {
  height: 50px;
  line-height: 50px;
  margin: 0 0 24px;
}

.panel {
  width: 100%;
  text-align: center;
  transition: background 0.1s;
}

.panel.sticky {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background: var(--color-header-background);
  box-shadow: var(--header-shadow);
}

.date {
  display: inline-block;
  min-width: 150px;
  margin: 0 20px;
  padding: 4px;
  font: inherit;
  color: inherit;
  line-height: 1;
  vertical-align: middle;
  background: none;
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
}

.date:focus,
.date:hover {
  border-color: var(--color-text);
}

.date-title {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
}

.date-subtitle {
  margin: 2px 0 0;
  font-size: 12px;
  font-weight: bold;
}

.dir-btn {
  display: inline-block;
  width: 32px;
  height: 32px;
  margin: 0;
  padding: 0;
  vertical-align: middle;
  font: inherit;
  line-height: 30px;
  font-size: 20px;
  font-weight: bold;
  background: none;
  border: 2px solid transparent;
  border-radius: 50%;
  color: var(--color-text-lighter);
  outline: none;
  cursor: pointer;
}

.dir-btn:focus,
.dir-btn:hover {
  border-color: var(--color-text);
  color: var(--color-text);
}
</style>
