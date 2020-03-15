<template>
  <div class="panel">
    Page theme

    <choice-control v-model="theme" :options="themes"></choice-control>

    <br />

    <check-control v-model="hideEmptyLines">
      Hide empty lines
    </check-control>

    <check-control v-model="enableHighlights">
      Highlight vegetarian/vegan menus
    </check-control>
  </div>
</template>

<script>
import settings from '~/settings'

import ChoiceControl from '~/components/controls/ChoiceControl'
import CheckControl from '~/components/controls/CheckControl'

export default {
  components: {
    ChoiceControl,
    CheckControl
  },

  data () {
    return {
      themes: {
        light: 'Light',
        dark: 'Dark'
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
}
</script>

<style scoped>
.toggle {
  display: block;
  margin: 8px 0;
}
</style>
