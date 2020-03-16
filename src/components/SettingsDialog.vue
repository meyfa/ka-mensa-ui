<template>
  <transition name="fadein">
    <div v-if="visible" class="outer" @click.self="close()">
      <div class="inner">
        <h2 class="title">Settings</h2>
        <button type="button" class="close-btn" @click="close()">✖</button>

        <div class="content">
          <div class="content-section">
            <div class="label">Canteens</div>
            <canteens-settings></canteens-settings>
          </div>

          <div class="content-section">
            <div class="label">Filter</div>
            <filter-settings></filter-settings>
          </div>

          <div class="content-section">
            <div class="label">Appearance</div>
            <appearance-settings></appearance-settings>
          </div>

          <div class="content-trailer"></div>
        </div>
      </div>

      <prevent-global-scrolling></prevent-global-scrolling>
      <keydown-listener :keys="closeKeys" @triggered="close()"></keydown-listener>
    </div>
  </transition>
</template>

<script>
import CanteensSettings from '~/components/settings/CanteensSettings'
import FilterSettings from '~/components/settings/FilterSettings'
import AppearanceSettings from '~/components/settings/AppearanceSettings'

import PreventGlobalScrolling from '~/components/functional/PreventGlobalScrolling'
import KeydownListener from '~/components/functional/KeydownListener'

const ESCAPE_KEY = 27

export default {
  components: {
    CanteensSettings,
    FilterSettings,
    AppearanceSettings,
    PreventGlobalScrolling,
    KeydownListener
  },

  props: {
    visible: {
      type: Boolean
    }
  },

  data () {
    return {
      closeKeys: [ESCAPE_KEY]
    }
  },

  methods: {
    close () {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped>
.fadein-enter-active,
.fadein-leave-active {
  transition: all 0.3s;
}

.fadein-enter,
.fadein-leave-to {
  opacity: 0;
}

.outer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  padding: 24px;
  background: var(--color-dialog-veil);
}

.inner {
  background: var(--color-dialog-background);
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80vw;
  height: 90vh;
  min-width: 320px;
  min-height: 320px;
  max-width: 1600px;
  max-height: 1600px;
  border: 1px solid var(--color-divider);
  border-radius: 4px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.4);
  transform: translate(-50%, -50%);
}

.fadein-enter-active > .inner,
.fadein-leave-active > .inner {
  transition: all 0.2s 0.1s;
}

.fadein-enter > .inner,
.fadein-leave-to > .inner {
  transform: translate(-50%, -50%) scale(0.5);
  opacity: 0;
}

.title {
  height: 53px;
  font-size: 24px;
  line-height: 50px;
  margin: 0;
  padding: 0 24px;
  border-bottom: 3px solid var(--color-divider);
}

.close-btn {
  display: inline-block;
  position: absolute;
  top: 5px;
  right: 16px;
  margin: 0;
  padding: 8px 12px;
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

.close-btn:focus,
.close-btn:hover {
  background: var(--color-button-background);
  border-color: var(--color-button-border);
}

.content {
  display: flex;
  flex-wrap: wrap;
  height: calc(100% - 50px - 4px);
  padding: 16px 24px 0;
  overflow-y: scroll;
}

.content-section {
  display: inline-block;
  width: 320px;
  max-width: 480px;
  flex-grow: 1;
  margin: 0 32px 32px 0;
}

.label {
  margin: 16px 0;
  font-size: 20px;
  font-weight: bold;
}

.content-trailer {
  display: block;
  width: 100%;
  height: 16px;
}

@media (max-width: 720px) {
  .inner {
    width: calc(100% - 32px);
  }

  .title {
    padding: 0 16px;
  }

  .close-btn {
    right: 8px;
  }

  .content {
    display: block;
    padding: 8px 16px 0;
  }

  .content-section {
    display: block;
    width: 100%;
    max-width: 100%;
    margin: 0 0 32px;
  }
}
</style>
