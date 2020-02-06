<template>
  <div id="app">
    <app-header></app-header>

    <app-footer class="footer"></app-footer>
  </div>
</template>

<script>
import 'typeface-nunito'

import AppHeader from '~/components/AppHeader'
import AppFooter from '~/components/AppFooter'

export default {
  name: 'App',

  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style>
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

body {
  background: #dedddc;
  font-family: 'Nunito', sans-serif;
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
