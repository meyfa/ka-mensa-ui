<template>
  <header class="header">
    <h1 class="title">KA Mensa</h1>

    <div class="settings">
      <button type="button" class="settings-btn" :class="{ pulse: unseenSettingsAvailable }"
          @click="openSettings()">
        Optionen
      </button>
    </div>
  </header>
</template>

<script>
import settingsPulse from '~/settings-pulse'

export default {
  data () {
    return {
      unseenSettingsAvailable: false
    }
  },

  created () {
    this.updateSettingsPulse()
    settingsPulse.on('mark', this.updateSettingsPulse)
  },

  destroyed () {
    settingsPulse.removeListener('mark', this.updateSettingsPulse)
  },

  methods: {
    openSettings () {
      this.$emit('settings-open')
      settingsPulse.markCurrent()
    },

    updateSettingsPulse () {
      this.unseenSettingsAvailable = !settingsPulse.isCurrent
    }
  }
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
  box-shadow: none;
  outline: none;
  cursor: pointer;
}

.settings-btn:focus,
.settings-btn:hover {
  background: var(--color-button-background);
  border-color: var(--color-button-border);
}

.settings-btn.pulse {
  animation-name: settings-pulse;
  animation-duration: 1.2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  box-shadow: 0 0 0 0 rgba(60, 120, 240, 0.75);
}

@keyframes settings-pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(60, 120, 240, 0.75);
  }

  40% {
    box-shadow: 0 0 2px 10px transparent;
  }

  100% {
    box-shadow: 0 0 2px 10px transparent;
  }
}
</style>
