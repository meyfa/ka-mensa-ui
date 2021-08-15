<template>
  <div class="panel">
    Seiten-Stil

    <choice-control v-model="theme" :options="themes"></choice-control>

    <br />

    <check-control v-model="hideEmptyLines">
      Leere Linien verstecken
    </check-control>

    <check-control v-model="enableHighlights">
      Vegetarische/Vegane Gerichte hervorheben
    </check-control>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import settings from '~/settings'

import ChoiceControl from '~/components/controls/ChoiceControl'
import CheckControl from '~/components/controls/CheckControl'

export default defineComponent({
  components: {
    ChoiceControl,
    CheckControl
  },

  data () {
    return {
      themes: {
        light: 'hell',
        dark: 'dunkel',
        auto: 'an Systemeinstellungen anpassen'
      },
      theme: settings.theme,
      hideEmptyLines: settings.hideEmptyLines,
      enableHighlights: settings.enableHighlights
    }
  },

  watch: {
    theme (to) {
      settings.theme = to
    },

    hideEmptyLines (to) {
      settings.hideEmptyLines = to
    },

    enableHighlights (to) {
      settings.enableHighlights = to
    }
  }
})
</script>
