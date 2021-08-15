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
import { ref, watch } from 'vue'

import settings from '~/settings'

import ChoiceControl from '~/components/controls/ChoiceControl'
import CheckControl from '~/components/controls/CheckControl'

export default {
  components: {
    ChoiceControl,
    CheckControl
  },

  setup () {
    const theme = ref(settings.theme)
    const hideEmptyLines = ref(settings.hideEmptyLines)
    const enableHighlights = ref(settings.enableHighlights)

    watch(theme, (value) => {
      settings.theme = value
    })

    watch(hideEmptyLines, (value) => {
      settings.hideEmptyLines = value
    })

    watch(enableHighlights, (value) => {
      settings.enableHighlights = value
    })

    return {
      themes: {
        light: 'hell',
        dark: 'dunkel',
        auto: 'an Systemeinstellungen anpassen'
      },
      theme,
      hideEmptyLines,
      enableHighlights
    }
  }
}
</script>
