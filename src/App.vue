<template>
  <div id="app">
    <app-header @settingsOpen="showSettings = true"></app-header>

    <date-header :date="date" @next="nextDate" @previous="previousDate"></date-header>
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

  watch: {
    showSettings (to) {
      const width = document.body.offsetWidth
      document.documentElement.classList.toggle('noscroll', to)
      // adjust body padding to remove 'jumping' because of hidden scrollbar
      if (to) {
        const scrollbarWidth = document.body.offsetWidth - width
        document.body.style.paddingRight = scrollbarWidth + 'px'
        return
      }
      document.body.style.paddingRight = ''
    }
  },

  created () {
    this.settingsUpdate()
    settings.on('update', this.settingsUpdate)

    let date = getCurrentDate()
    if (!isWeekday(date)) {
      date = getNextWeekday(date)
    }
    this.date = date
  },

  destroyed () {
    settings.removeListener('update', this.settingsUpdate)
  },

  methods: {
    settingsUpdate () {
      document.documentElement.classList.toggle('theme-dark', settings.theme === 'dark')
    },

    nextDate () {
      if (!this.date) return
      this.date = getNextWeekday(this.date)
    },

    previousDate () {
      if (!this.date) return
      this.date = getPreviousWeekday(this.date)
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
  --color-footer-text: #aaa;
  --color-footer-link: #6af;
  --color-dialog-background: #fff;
  --color-card-background: #fff;
  --color-text: #000;
  --color-text-lighter: #666;
  --color-button-background: #ddd;
  --color-button-border: #aaa;
  --color-divider: #ccc;
  --color-warn-background: #fcc;
  --color-warn-text: #d14;
  --header-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.3);
}

:root.theme-dark {
  --color-page-background: #252424;
  --color-header-background: #1c1c1c;
  --color-footer-background: #101010;
  --color-footer-text: #555;
  --color-footer-link: #48d;
  --color-dialog-background: #222;
  --color-card-background: #1a1a1a;
  --color-text: #fff;
  --color-text-lighter: #666;
  --color-button-background: #1a1b1c;
  --color-button-border: #444;
  --color-divider: #666;
  --color-warn-background: #422;
  --color-warn-text: #fab;
  --header-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.75);
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

html.noscroll {
  overflow-y: hidden;
}

body {
  background: var(--color-page-background);
  font-family: var(--font);
  color: var(--color-text);
}

#app {
  position: relative;
  padding-bottom: 100px;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
