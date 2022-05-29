<template>
  <div ref="container" class="container">
    <div class="panel" :class="{ sticky }">
      <button type="button" class="dir-btn" @click="$emit('previous')">❮</button>
      <button class="date" @click="showDateSelection = true">
        <h2 class="date-title">{{ formattedDate }}</h2>
        <div class="date-subtitle">{{ formattedDateSubtitle }}</div>
      </button>
      <button type="button" class="dir-btn" @click="$emit('next')">❯</button>
    </div>

    <DateSelectionDialog
        :current="date" :visible="showDateSelection" @update:visible="showDateSelection = $event"
        @select="$emit('select', $event)" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue'
import type { PropType } from 'vue'

import type { DateSpec } from '../types/date-spec'
import { formatDate } from '../util/date'
import { filterDaysAgo } from '../filters/days-ago'

import DateSelectionDialog from './DateSelectionDialog.vue'

export default defineComponent({
  components: {
    DateSelectionDialog
  },

  props: {
    date: {
      type: Object as PropType<DateSpec>,
      required: true
    }
  },

  emits: ['next', 'previous', 'select'],

  setup (props) {
    const container = ref<Element>()
    const showDateSelection = ref(false)
    const sticky = ref(false)

    const recomputeSticky = () => {
      const element = container.value
      if (element == null) {
        sticky.value = false
        return
      }
      sticky.value = element.getBoundingClientRect().top < 0
    }

    onMounted(() => {
      recomputeSticky()
      window.addEventListener('scroll', recomputeSticky)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', recomputeSticky)
    })

    const formattedDate = computed(() => formatDate(props.date))
    const formattedDateSubtitle = computed(() => filterDaysAgo(props.date))

    return {
      container,
      showDateSelection,
      sticky,
      formattedDate,
      formattedDateSubtitle
    }
  }
})
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
