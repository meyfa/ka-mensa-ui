<template>
  <div class="panel">
    <label v-for="(label, themeId) in themes" :key="themeId" class="theme">
      <input v-model="theme" type="radio" :value="themeId" /> {{ label }}
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
      theme: settings.theme
    }
  },

  watch: {
    theme (to) {
      settings.theme = to
    }
  }
}
</script>

<style scoped>
.theme {
  display: block;
  margin: 4px 0;
}
</style>
