<template>
  <div id="app">
    <app-header @settings-open="showSettings = true"></app-header>

    <date-header :date="date" @next="nextDate" @previous="previousDate"
        @select="selectDate"></date-header>
    <plans-view :date="date"></plans-view>

    <settings-dialog :visible.sync="showSettings"></settings-dialog>

    <app-footer class="footer"></app-footer>
  </div>
</template>

<script>
import 'typeface-nunito'

import settings from '~/settings'
import { getCurrentDate, isWeekday, getPreviousWeekday, getNextWeekday } from '~/util/date'

import AppHeader from '~/components/AppHeader'
import AppFooter from '~/components/AppFooter'
import DateHeader from '~/components/DateHeader'
import PlansView from '~/components/PlansView'
import SettingsDialog from '~/components/SettingsDialog'

const prefersDarkScheme = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null

export default {
  name: 'App',

  components: {
    AppHeader,
    AppFooter,
    DateHeader,
    PlansView,
    SettingsDialog
  },

  data () {
    return {
      showSettings: false,
      date: null
    }
  },

  created () {
    this.updateSettings()
    settings.on('update', this.updateSettings)

    if (prefersDarkScheme) {
      prefersDarkScheme.addEventListener('change', this.updateSettings)
    }

    let date = getCurrentDate()
    if (!isWeekday(date)) {
      date = getNextWeekday(date)
    }
    this.date = date
  },

  destroyed () {
    settings.removeListener('update', this.updateSettings)

    if (prefersDarkScheme) {
      prefersDarkScheme.removeEventListener('change', this.updateSettings)
    }
  },

  methods: {
    updateSettings () {
      let darkTheme = settings.theme === 'dark'
      if (settings.theme === 'auto') {
        darkTheme = prefersDarkScheme && prefersDarkScheme.matches
      }
      document.documentElement.classList.toggle('theme-dark', darkTheme)
    },

    nextDate () {
      if (!this.date) return
      this.date = getNextWeekday(this.date)
    },

    previousDate () {
      if (!this.date) return
      this.date = getPreviousWeekday(this.date)
    },

    selectDate (date) {
      if (!date) return
      this.date = date
    }
  }
}
</script>

<style>
:root {
  --font: 'Nunito', sans-serif;
  --color-page-background: #dedddc;
  --color-header-background: #fff;
  --color-footer-background: #333;
  --color-footer-text: #bbb;
  --color-footer-link: #6af;
  --color-dialog-veil: rgba(30, 30, 30, 0.8);
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
  --header-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.3);
  --color-meal-vegetarian: #fff4cc;
  --color-meal-vegan: #cfc;
  --meal-item-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.25);
}

:root.theme-dark {
  --color-page-background: #000;
  --color-header-background: #222;
  --color-footer-background: #101010;
  --color-footer-text: #888;
  --color-footer-link: #48d;
  --color-dialog-veil: rgba(4, 4, 4, 0.8);
  --color-dialog-background: #222;
  --color-card-background: #1a1a1a;
  --color-text: #fff;
  --color-text-lighter: #999;
  --color-button-background: #1a1b1c;
  --color-button-border: #444;
  --color-divider: #000;
  --color-warn-background: #422;
  --color-warn-text: #fab;
  --color-date-available: #248;
  --color-date-current: #8cf;
  --color-date-current-text: #000;
  --header-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.75);
  --color-meal-vegetarian: #504028;
  --color-meal-vegan: #084824;
  --meal-item-shadow: 0 0 8px 0 rgba(0, 0, 0, 1);
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
