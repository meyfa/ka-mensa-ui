<template>
  <div id="app">
    <AppHeader @settings-open="showSettings = true" />

    <DateHeader :date="date" @next="nextDate" @previous="previousDate" @select="selectDate" />
    <PlansView :date="date" />

    <SettingsDialog :visible="showSettings" @update:visible="showSettings = $event" />

    <AppFooter class="footer" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'

import 'typeface-nunito'

import type { DateSpec } from './types/date-spec'
import settings from './settings'
import { getCurrentDate, isWeekday, getPreviousWeekday, getNextWeekday } from './util/date'

import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import DateHeader from './components/DateHeader.vue'
import PlansView from './components/PlansView.vue'
import SettingsDialog from './components/SettingsDialog.vue'

const prefersDarkScheme = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : undefined

export default defineComponent({
  name: 'App',

  components: {
    AppHeader,
    AppFooter,
    DateHeader,
    PlansView,
    SettingsDialog
  },

  setup () {
    let currentDate = getCurrentDate()
    if (!isWeekday(currentDate)) {
      currentDate = getNextWeekday(currentDate)
    }

    const showSettings = ref(false)
    const date = ref(currentDate)

    const updateSettings = () => {
      let darkTheme = settings.theme === 'dark'
      if (settings.theme === 'auto') {
        darkTheme = prefersDarkScheme?.matches ?? false
      }
      document.documentElement.classList.toggle('theme-dark', darkTheme)
    }

    onMounted(() => {
      updateSettings()
      settings.on('update', updateSettings)
      prefersDarkScheme?.addEventListener('change', updateSettings)
    })

    onUnmounted(() => {
      settings.off('update', updateSettings)
      prefersDarkScheme?.removeEventListener('change', updateSettings)
    })

    const nextDate = () => {
      date.value = getNextWeekday(date.value)
    }

    const previousDate = () => {
      date.value = getPreviousWeekday(date.value)
    }

    const selectDate = (selected: DateSpec) => {
      if (selected != null) {
        date.value = selected
      }
    }

    return {
      showSettings,
      date,
      nextDate,
      previousDate,
      selectDate
    }
  }
})
</script>

<style>
:root {
  --font: 'Nunito', sans-serif;
  --color-page-background: #dedddc;
  --color-header-background: #fff;
  --color-footer-background: #333;
  --color-footer-text: #bbb;
  --color-footer-link: #6af;
  --color-dialog-veil: rgb(30 30 30 / 80%);
  --color-dialog-background: #fff;
  --color-card-background: #fff;
  --color-text: #000;
  --color-text-lighter: #777;
  --color-button-background: #ddd;
  --color-button-border: #aaa;
  --color-divider: #bbb;
  --color-warn-background: #fcc;
  --color-warn-text: #d14;
  --color-date-available: #bdf;
  --color-date-current: #26f;
  --color-date-current-text: #fff;
  --header-shadow: 0 0 12px 0 rgb(0 0 0 / 30%);
  --color-meal-vegetarian: #fff4cc;
  --color-meal-vegan: #cfc;
  --meal-item-shadow: 0 0 8px 0 rgb(0 0 0 / 25%);
}

:root.theme-dark {
  --color-page-background: #141416;
  --color-header-background: #292928;
  --color-footer-background: #060809;
  --color-footer-text: #888;
  --color-footer-link: #48d;
  --color-dialog-veil: rgb(4 4 4 / 80%);
  --color-dialog-background: #222;
  --color-card-background: #282828;
  --color-text: #fff;
  --color-text-lighter: #999;
  --color-button-background: #1a1b1c;
  --color-button-border: #666;
  --color-divider: #000;
  --color-warn-background: #422;
  --color-warn-text: #fab;
  --color-date-available: #248;
  --color-date-current: #8cf;
  --color-date-current-text: #000;
  --header-shadow: 0 0 12px 0 rgb(0 0 0 / 75%);
  --color-meal-vegetarian: #574730;
  --color-meal-vegan: #0f4f2b;
  --meal-item-shadow: 0 0 8px 0 rgb(0 0 0 / 75%);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body,
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
}

html {
  overflow-y: scroll;
}

body {
  background: var(--color-page-background);
  font-family: var(--font);
  color: var(--color-text);
}

#app {
  position: relative;
  padding-bottom: 50px;
}

.footer {
  position: absolute;
  top: calc(100% - 50px);
  width: 100%;
}
</style>
