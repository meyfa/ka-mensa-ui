<template>
  <div class="panel">
    Seiten-Stil

    <ChoiceControl v-model="theme" :options="themes" />
    <br>

    <CheckControl v-model="hideEmptyLines">
      Leere Linien verstecken
    </CheckControl>

    <CheckControl v-model="enableHighlights">
      Vegetarische/Vegane Gerichte hervorheben
    </CheckControl>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

import settings from '../../settings'

import ChoiceControl from '../controls/ChoiceControl.vue'
import CheckControl from '../controls/CheckControl.vue'

export default defineComponent({
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
})
</script>
