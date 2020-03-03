<template>
  <div class="panel">
    Page theme

    <label v-for="(label, themeId) in themes" :key="themeId" class="theme">
      <input v-model="theme" type="radio" :value="themeId" /> {{ label }}
    </label>

    <br />

    <label class="toggle">
      <input type="checkbox"
          :checked="hideEmptyLines"
          @change="hideEmptyLines = !hideEmptyLines" />
      Hide empty lines
    </label>

    <label class="toggle">
      <input type="checkbox"
          :checked="enableHighlights"
          @change="enableHighlights = !enableHighlights" />
      Highlight vegetarian/vegan menus
    </label>
  </div>
</template>

<script>
import settings from '~/settings'

export default {
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
.theme {
  display: block;
  margin: 4px 0;
}

.toggle {
  display: block;
  margin: 8px 0;
}
</style>
