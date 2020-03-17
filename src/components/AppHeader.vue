<template>
  <header class="header">
    <h1 class="title">KA Mensa</h1>

    <div class="settings">
      <button type="button" class="settings-btn" @click="$emit('settingsOpen')">Optionen</button>
    </div>
  </header>
</template>

<script>
export default {
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  height: 64px;
  line-height: 64px;
  margin: 0 0 24px;
  padding: 0 24px;
  background: var(--color-header-background);
}

.title {
  display: inline-block;
  font-size: 32px;
  font-weight: 400;
  line-height: inherit;
  margin: 0;
}

.settings {
  display: inline-block;
}

.settings-btn {
  display: inline-block;
  margin: 0;
  padding: 10px;
  font: inherit;
  font-size: 20px;
  line-height: 1;
  background: none;
  color: inherit;
  border: 1px solid transparent;
  border-radius: 2px;
  outline: none;
  cursor: pointer;
}

.settings-btn:focus,
.settings-btn:hover {
  background: var(--color-button-background);
  border-color: var(--color-button-border);
}
</style>
